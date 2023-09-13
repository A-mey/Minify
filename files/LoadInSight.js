$(function () {
    if (clientConfig.MyInsightTabConfig.IsMyInsightTabDisplayed) {

        function _refreshMyInsights()
        {
            _toggleChannelAndSkillIntrBar($('#ddlIntrBar').val());
            _toggleLoginActivityStatus($('#ddlLoginActivityStatus').val());
            _getIntrstatusData();
            _getAHTData();
        }

        //#region Char JS on load
        function chartJsOnLoad() {
            _refreshMyInsights();
        }
        //#endregion

        //#region Refresh Insight
        $("#btnRefreshMyInsights").on("click", function () {
            _refreshMyInsights();
        });
        //#endregion

        //#region Generate Random Colors
        var _createRandomColorFactor = function () {
            return Math.round(Math.random() * 255);
        };
        var _getChartRandomColor = function (label) {
            switch (label) {
                case 'ACTIVE':
                    return 'rgba(30,144,255,1)';                    
                case 'READY':
                    return 'rgba(0,128,0,1)';                    
                case 'NOTREADY':
                    return 'rgba(255,0,0,1)';                    
                case 'STOPINTERACTION':
                    return 'rgba(255,69,0,1)';                    
                case 'LOGGEDOUT':
                    return 'rgba(139,0,0,1)';                    
                default:
                    return 'rgba(' + _createRandomColorFactor() + ',' + _createRandomColorFactor() + ',' + _createRandomColorFactor() + ',' +  '1' + ')';
            }
        };
        //#endregion

        //#region AHT
        function _fetchAHTData(oData) {
            var data = JSON.stringify(oData);
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: oAgentURL.MyInsightDataUrl,
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (data) {
                        reject(data);
                    },
                    failure: function (data) {
                        reject(data);
                    }
                })
            })
        }

        function _getAHTData() {            
            var oData = { "UID": $('#hdnAgentId').val(), "FLAG": "AgentAndGroupAHT" };

            _fetchAHTData(oData)
                .then((data) => {
                    if (data && data.Result)
                    {
                        var result = data.Result;
                        if ($('#ddlAHTInsight').val() == 'MyAHT') {
                            var arrMyAHT = result.filter(function (el) { return el.Type == 'Agent'; });
                            $('.uf-aht-count').html(arrMyAHT[0].AHT);                            
                        }
                        else
                        {
                            var arrMyGroupAHT = result.filter(function (el) { return el.Type == 'Group'; });
                            $('.uf-aht-count').html(arrMyGroupAHT[0].AHT);                            
                        }                        
                    }
                })
                .catch((error) => {
                    console.log('_getIntrstatus error', error);
                });
        }
        //#endregion

        //#region Login Activity Doughnut Chart
        $('#ddlLoginActivityStatus').change(function () {
            var selectedType = $(this).val();
            _toggleLoginActivityStatus(selectedType);
        });

        function _toggleLoginActivityStatus(selectedType) {
            _getLoginActivityData(selectedType);
        }

        function _setLoginActivityDoughnutChart(data) {
            var result = data.Result;

            var arrLoginActivityLabel = [], arrLoginActivityCnt = [], arrLoginActivityColors = [];
            for (var obj of result) {
                arrLoginActivityLabel.push(obj.AgentStatus);
                arrLoginActivityCnt.push(obj.TimeInMin);
                arrLoginActivityColors.push(_getChartRandomColor(obj.AgentStatus));
            }

            if (window.loginActivityStatusDoughnut) {
                window.loginActivityStatusDoughnut.destroy();
            }

            const loginActivityDoughnutData = {
                labels: arrLoginActivityLabel,
                datasets: [{
                    label: 'LoginActivity',
                    data: arrLoginActivityCnt,
                    backgroundColor: arrLoginActivityColors,
                    hoverOffset: 4
                }]
            };

            const loginActivityDoughnutConfig = {
                type: 'doughnut',
                data: loginActivityDoughnutData,
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    console.log(context)
                                    var total = context.dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                                        return previousValue + currentValue;
                                    });
                                    var percentage = Math.ceil((context.parsed * 100) / total).toFixed(2);
                                    return context.label + ' : ' + percentage + "%";
                                }
                            }
                        }
                    }
                }
            };

            window.loginActivityStatusDoughnut = new Chart(document.getElementById('loginActivityStatusChart'), loginActivityDoughnutConfig);
        }

        function _fetchLoginActivityData(oData) {
            var data = JSON.stringify(oData);
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: oAgentURL.MyInsightDataUrl,
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (data) {
                        reject(data);
                    },
                    failure: function (data) {
                        reject(data);
                    }
                })
            })
        }

        function _getLoginActivityData(selectedType) {
            var flag = (selectedType == 'AgentWiseActivity') ? 'RealtimeAgentLoginStatusDetails' : 'RealtimeGroupLoginStatusDetails';
            var oData = { "UID": $('#hdnAgentId').val(), "FLAG": flag };

            _fetchLoginActivityData(oData)
                .then((data) => {
                    if (data && data.Result) {
                        _setLoginActivityDoughnutChart(data);
                    }
                })
                .catch((error) => {
                    console.log('_getIntrstatus error', error);
                });
        }

        //#endregion

        //#region Interaction Status Doughnut Chart
        function _setIntrStatusDoughnutChart(data) {
            var result = data.Result;

            var arrIntrLabel = [], arrIntrCnt = [], arrIntrColor = [];
            for (var obj of result) {
                arrIntrLabel.push(obj.Type);
                arrIntrCnt.push(obj.Cnt);
                arrIntrColor.push(_getChartRandomColor(obj.Type));
            }

            if (window.interactionStatusDoughnut) {
                window.interactionStatusDoughnut.destroy();
            }

            const intrStatusDoughnutData = {
                labels: arrIntrLabel,
                datasets: [{
                    label: 'Interaction Status',
                    data: arrIntrCnt,
                    backgroundColor: arrIntrColor,
                    hoverOffset: 4
                }]
            };

            const intrStatusDoughnutConfig = {
                type: 'doughnut',
                data: intrStatusDoughnutData,
            };
            window.interactionStatusDoughnut = new Chart(document.getElementById('InteractionStatusChart'), intrStatusDoughnutConfig);
        }

        function _fetchIntrstatus(oData) {
            var data = JSON.stringify(oData);
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: oAgentURL.MyInsightDataUrl,
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (data) {
                        reject(data);
                    },
                    failure: function (data) {
                        reject(data);
                    }
                })
            })
        }

        function _getIntrstatusData() {
            var oData = { "UID": $('#hdnAgentId').val(), "FLAG": "RealtimeInteractionStatus" };

            _fetchIntrstatus(oData)
                .then((data) => {
                    if (data && data.Result) {
                        _setIntrStatusDoughnutChart(data);
                    }
                })
                .catch((error) => {
                    console.log('_getIntrstatus error', error);
                });
        }
        //#endregion        

        //#region Channel N Skill Wise Bar Chart
        $('#ddlIntrBar').change(function () {
            var selectedType = $(this).val();
            _toggleChannelAndSkillIntrBar(selectedType);
        });

        function _toggleChannelAndSkillIntrBar(selectedType) {
            _getChannelAndSkillWiseIntrData();
        }

        function _setIntrBarGraph(data) {
            var IntrBarType = $('#ddlIntrBar').val();
            var result = data.Result;
            var arrChannelWise = result.filter(function (el) { return el.Type == 'ChannelWise'; });
            var arrSkillWise = result.filter(function (el) { return el.Type == 'SkillWise'; });

            var arrChannelLabel = [], arrChannelCnt = [], arrChannelColor = [];
            var arrSkillLabel = [], arrSkillCnt = [], arrSkillColor = [];
            for (var obj of arrChannelWise) {
                arrChannelLabel.push(obj.channel);
                arrChannelCnt.push(obj.Cnt);
                arrChannelColor.push(_getChartRandomColor(obj.channel));
            }

            for (var obx of arrSkillWise) {
                arrSkillLabel.push(obx.channel);
                arrSkillCnt.push(obx.Cnt);
                arrSkillColor.push(_getChartRandomColor(obx.channel));
            }

            if (window.channelAndSkillWiseBar) {
                window.channelAndSkillWiseBar.destroy();
            }

            const bardata = {
                labels: (IntrBarType == 'ChannelWise') ? arrChannelLabel : arrSkillLabel,
                datasets: [{
                    label: (IntrBarType == 'ChannelWise') ? 'Channel Wise' : 'Skill Wise',
                    data: (IntrBarType == 'ChannelWise') ? arrChannelCnt : arrSkillCnt,
                    axis: 'y',
                    backgroundColor: (IntrBarType == 'ChannelWise') ? arrChannelColor : arrSkillColor,
                    hoverOffset: 4
                }]
            };

            const barconfig = { type: 'bar', data: bardata, options: { indexAxis: 'y', } };
            window.channelAndSkillWiseBar = new Chart(document.getElementById('closedIntrChannelSkillWiseBar'), barconfig);
        }

        function _getChannelAndSkillWiseIntrData() {
            var oData = { "UID": $('#hdnAgentId').val(), "FLAG": "RealtimeChannelAndSkillWiseIntrCnt" };

            _fetchChannelAndSkillWiseIntrCnt(oData)
                .then((data) => {
                    if (data && data.Result) {
                        _setIntrBarGraph(data);
                    }
                })
                .catch((error) => {
                    console.log('_fetchChannelAndSkillWiseIntrCnt error', error);
                });
        }

        function _fetchChannelAndSkillWiseIntrCnt(oData) {
            var data = JSON.stringify(oData);
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: oAgentURL.MyInsightDataUrl,
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (data) {
                        reject(data);
                    },
                    failure: function (data) {
                        reject(data);
                    }
                })
            })
        }

        function _loadChartJs(path) {
            let inSightScript = document.createElement("script");
            inSightScript.setAttribute("src", path);
            document.body.appendChild(inSightScript);
            return inSightScript;
        }
        //#endregion

        //#region Init Chat JS
        let InSightScript = _loadChartJs('js/chart.min.js');

        InSightScript.addEventListener("load", chartJsOnLoad, false);
        //#endregion
    }
});