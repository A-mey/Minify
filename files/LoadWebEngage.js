$(function () {
    if (clientConfig.IsCrawlBrowserDisplayed)
    {
        //#region Global Declarations
        var scope = angular.element($('#ChatArea')).scope();
        var socket = "";
        var arrWebEngagementData = [];
        var arrHistoryResponse = [];

        scope.WebEngagementData = [];
        scope.WEBarrHistoryResponse = [];
        //#endregion

        //#region Webengagement Button operations
        scope.WebEngagementRefreshList = function () {
            scope.WebEngagementData = [];
            arrWebEngagementData = [];
            socket.emit("agentWEDetails", { data: $('#hdnAgentId').val(), tenantid: $('#hdnAgentProcessId').val() });
        }

        scope.triggerPopUp = function (Records) {
            socket.emit("InitiatePopup", { Records }, { agentID: $('#hdnAgentId').val() });
        }

        scope.triggerChat = function (Records) {
            socket.emit("AgentInitiateChat", { Records }, { agentID: $('#hdnAgentId').val() }, { agentName: sessionStorage.getItem("agent") });
        }

        scope.GetHistory = function (x, control) {
            var flag = '';
            for (var i = 0; i <= scope.WebEngagementData.length - 1; i++)
            {
                if (document.getElementById("Parent" + i).className == 'myChatHistAccordionOB fa fa-plus-circle') {

                }
                else {
                    var child = "child" + i;
                    $("#" + child).toggle();
                    document.getElementById("Parent" + i).className = 'myChatHistAccordionOB fa fa-plus-circle';
                    flag = i;
                }
            }

            if (document.getElementById("Parent" + this.$index).className == 'myChatHistAccordionOB fa fa-plus-circle') {

                if (flag === this.$index) {

                }
                else {
                    document.getElementById("Parent" + this.$index).className = 'myChatHistAccordionOB fa fa-minus-circle';
                    var child = "child" + this.$index;
                    $("#" + child).toggle();
                }
            }
            else {
                document.getElementById("Parent" + this.$index).className = 'myChatHistAccordionOB fa fa-plus-circle';
            }
            arrHistoryResponse = [];
            scope.WEBarrHistoryResponse = [];
            var Records = x;
            socket.emit("RequestCustomerHistort", { Records }, { agentID: $('#hdnAgentId').val() }, { agentName: sessionStorage.getItem("agent") });
        }
        //#endregion

        //#region WE dependent function
        function getClientInfos() {
            let _agent = 'Agent';
            return {
                ClientUrl: _agent,
                IpAddress: _agent,
                publicIp: _agent,
                PageName: _agent,
                PageTitle: _agent,
                SessionID: _agent,
                Lattitude: _agent,
                Longitude: _agent,
                browserName: _agent,
                browserVersion: _agent
            };
        }

        function _getWebEngagementDetails(data) {
            if (data.BrowserId) {
                arrWebEngagementData.push(data);
                if (arrWebEngagementData.length > 1) {
                    for (var i = 0; i < arrWebEngagementData.length; i++) {
                        if (arrWebEngagementData[i].BrowserId === data.BrowserId) {
                            //remove the record from array and push this latest record.
                            arrWebEngagementData.splice(i);
                            arrWebEngagementData.push(data);
                        }
                    }
                }
            }
            return arrWebEngagementData;
        }

        function _getWebEngagementHistoryDetails(data) {
            if (data.BrowserId) {
                arrHistoryResponse.push(data);
            }
            return arrHistoryResponse;
        }
        //#endregion

        //#region Init SocketIO JS
        let WebEngageScript = _loadLibSocketIO('js/socket.io.js');
        function _loadLibSocketIO(path) {
            let LibSocketioScript = document.createElement("script");
            LibSocketioScript.setAttribute("src", path);
            document.body.appendChild(LibSocketioScript);
            return LibSocketioScript;
        }
        //#endregion

        //#region Connect SocketIO
        function WebEngageOnLoad() {
            socket = io.connect(oAgentURL.SocketURL);

            socket.on('connect', function () {
                let clientInfos = {};
                clientInfos = getClientInfos();
                socket.emit('CreateSession', { infos: clientInfos, room: $('#hdnAgentId').val() });
                socket.on('SendMessageToAgent', function (data) {                    
                    scope.smartTALKNotificationError(data);
                });
            });

            socket.emit("agentWEDetails", { data: $('#hdnAgentId').val(), tenantid: $('#hdnAgentProcessId').val() });

            socket.on('agentWEDetails', function (data) {
                scope.WebEngagementData = _getWebEngagementDetails(data);
            });

            socket.on('CustomerHistoryResponse', function (data, details) {
                scope.WEBarrHistoryResponse = _getWebEngagementHistoryDetails(data);
            });
        }

        WebEngageScript.addEventListener("load", WebEngageOnLoad, false);
        //#endregion
    }
});