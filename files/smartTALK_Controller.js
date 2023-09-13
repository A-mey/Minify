var varsmartTALK = angular.module("smartTALK", ['ui-notification', 'angularjs-datetime-picker', 'ngSanitize', 'ngFileUpload', 'ui.select', 'trumbowyg-ng', 'angucomplete-alt', 'angular.drag.resize']);
currentScript = document.currentScript.baseURI;
unfydURL = currentScript;
AgentURL = currentScript.substr(0, currentScript.lastIndexOf("/"));
AgentParentDomain = AgentURL.substr(0, AgentURL.lastIndexOf("/"));

window.onbeforeunload = function (event) {
    ActivehandletimeUpdatePageRefresh();
};
varsmartTALK.directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});
function getCurrentDateInMMDDYYY() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    return today = mm + '/' + dd + '/' + yyyy;
}

function convertDate(inputFormat) {
    //used in park interaction filter : will check and try to modify this complex logic : Kirti
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
}
function convertToLink(msgpart) {
    //converts a text with http:// to anchor link tag.
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var text1 = msgpart.replace(exp, "<a target='_blank' href='$1'>$1</a>");
    var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    return text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
}
angular.module('smartTALK').filter('newline', function ($sce) {
    return function (text) {
        if (text) {
            text = text.replace(/<br>/g, '\n');
            text = text.replace(/\&amp;/g, '&');
            text = text.replace(/\&lt;/g, '<');
            text = text.replace(/\&gt;/g, '>');
            text = text.replace(/\&quot;/g, '"');
            text = text.replace(/\&apos;/g, '\'');
            text = text.replace(/\&/g, '&amp;');
            text = text.replace(/\</g, '&lt;');
            text = text.replace(/\>/g, '&gt;');
            text = text.replace(/\"/g, '&quot;');
            text = text.replace(/\'/g, '&apos;');
            text = text.replace(/\n/g, '<br />');
            text = text.replace(/\<br \/\>/g, "\n");
            text = text.replace(/snglquot;/g, '&#39;');
            text = text.replace(/dblquot;/g, '&#34;');
            text = text.replace(/&lt;br \/&gt;/g, '\n');
            text = text.replace(/&lt;br\/&gt;/g, '\n');
            text = text.replace(/&lt; br\/ &gt;/g, '\n');
        }
        return $sce.trustAsHtml(text);
    }
});
angular.module('smartTALK').filter('EmailFilter', function ($sce) {
    return function (text) {
        if (text) {
			
            text = text.replace(/\\u0026/g, '&');
            text = text.replace(/\&amp;/g, '&');
			text = text.replace(/\&nbsp;/g, ' ');
            text = text.replace(/\&gt;/g, '>');
            text = text.replace(/\&lt;/g, '<');
            text = text.replace(/\&quot;/g, '"');
            text = text.replace(/\"/g, '');
            text = text.replace(/\&apos;/g, '\'');

            /* let regexStr = 'font-family\:.*\".*\"';
            let regex = new RegExp(regexStr);
            let getMatchStr = regex.test(text);
            if (getMatchStr) {
                let matchedStr = text.match(regexStr)[0];
                debugger;
                text = matchedStr.replace('"', '').replace('"', '');
                debugger;
            } */
			text = text.replace(/(\<)(([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4}))(\>)/gm, "<a href=mailto:$2>$2</a>");
        }
        return $sce.trustAsHtml(text);
    }
});

angular.module('smartTALK').filter('EmailFilterSpecialChar', function ($sce) {
    return function (text) {
        if (text) {
            text = text.replace(/\s/g, ' ');
			text = text.replace(/\&nbsp;/g, ' ');
			text = text.replace(/\\u0026/g, '&');
            text = text.replace(/\&amp;/g, '&');
            text = text.replace(/\&gt;/g, '>');
            text = text.replace(/\&lt;/g, '<');
            text = text.replace(/\&quot;/g, '"');
            text = text.replace(/\&apos;/g, '\'');
			text = text.replace(/(\<)(([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4}))(\>)/gm, "<a href=mailto:$2>$2</a>");
        }
        return $sce.trustAsHtml(text);
    }
});

angular.module('smartTALK').filter('sanatizeCustInfo', function ($sce) {
    return function (text, Maskingflag, MASKINGFRONT, MASKINGEND) {

        text = text.replace(/<br>/g, '\n');
        text = text.replace(/\&amp;/g, '&');
        text = text.replace(/\&lt;/g, '<');
        text = text.replace(/\&gt;/g, '>');
        text = text.replace(/\&quot;/g, '"');
        text = text.replace(/\&apos;/g, '\'');
        text = text.replace(/\&/g, '&amp;');
        text = text.replace(/\</g, '&lt;');
        text = text.replace(/\>/g, '&gt;');
        text = text.replace(/\"/g, '&quot;');
        text = text.replace(/\'/g, '&apos;');
        text = text.replace(/\n/g, '<br />');
        text = text.replace(/snglquot;/g, '&#39;');
        text = text.replace(/dblquot;/g, '&#34;');
        text = text.replace(/&amp;/g, '&');
        text = text.replace(/&lt;br&gt;/g, '\n');
        if (text.indexOf('~') >= 0) {
            text = '';
        }
        if (Maskingflag) {

            var regex = /^(\d{10})$/g; //for 10 digit
            var regex12 = /^(\d{12})$/g; // for 12 digit
            var emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm //email
            //------------------------------------------------masking from front
            if (MASKINGFRONT) {
                if (text.match(regex)) {
                    text = text.replace(/^[0-9]{6}/, '******'); //10 digit
                }
                if (text.match(regex12)) {
                    text = text.replace(/^[0-9]{8}/, '********'); //12 digit
                }
            }
            //------------------------------------------------masking from front end


            //------------------------------------------------masking from end
            if (MASKINGEND) {
                if (text.match(regex) || text.match(regex12)) {
                    text = text.replace(/\d{4}$/gm, '****'); //[10-12 digit]
                }
            }
            //------------------------------------------------masking from end

            if (text.match(emailregex)) {
                var str = '';
                var hide = text.split("@")[0].length - 2;//<-- number of characters to hide
                var r = new RegExp(".{" + hide + "}@", "g")
                for (var i = 0; i < hide; i++) {
                    str = str + '*';
                }
                text = text.replace(r, str + "@");
            }
        }
        return $sce.trustAsHtml(text);
    }
});
angular.module('smartTALK').filter('urlsanatizer', function ($sce) {
    return function (text) {
        if (text) {
            text = text.replace(/<br>/g, '\n');
            text = text.replace(/\&amp;/g, '&');
            text = text.replace(/\&lt;/g, '<');
            text = text.replace(/\&gt;/g, '>');
            text = text.replace(/\&quot;/g, '"');
            text = text.replace(/\&apos;/g, '\'');
        }
        return $sce.trustAsHtml(text);
    }
});
angular.module('smartTALK').filter('replaceDomainWithIPAddress', function () {
    //This filter is used to replace a domain with specefic IP Address
    //just add the filter name where you get image link , NOTE : its not for all clients.
    return function (ImgURL) {
        if (ImgURL !== '' && ImgURL.includes("")) {
            ImgURL = ImgURL.replace("", "localhost");
        }
        return ImgURL;
    }
});
angular.module('smartTALK').filter('CheckCoustomerName', function ($sce) {
    return function (text, Maskingflag, MASKINGFRONT, MASKINGEND) {
        if (text == '') {
            text = text.replace('', 'Customer');
        } else {
            text = text.replace(/\&apos;/g, '\'');
        }
        //setTimeout(function () { //need to be masked as value is getting undefined
        if (Maskingflag) {

            var regex = /^(\d{10})$/g; //for 10 digit
            var regex12 = /^(\d{12})$/g; // for 12 digit
            var emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm //email

            //------------------------------------------------masking from front
            if (MASKINGFRONT) {
                if (text.match(regex)) {
                    text = text.replace(/^[0-9]{6}/, '******'); //10 digit
                }
                if (text.match(regex12)) {
                    text = text.replace(/^[0-9]{8}/, '********'); //12 digit
                }
            }
            //------------------------------------------------masking from front end


            //------------------------------------------------masking from end
            if (MASKINGEND) {

                if (text.match(regex) || text.match(regex12)) {
                    text = text.replace(/\d{4}$/gm, '****'); //[10-12 digit]
                }
            }
            //------------------------------------------------masking from end

            if (text.match(emailregex)) {
                var str = '';
                var hide = text.split("@")[0].length - 2;//<-- number of characters to hide
                var r = new RegExp(".{" + hide + "}@", "g")
                for (var i = 0; i < hide; i++) {
                    str = str + '*';
                }
                text = text.replace(r, str + "@");
            }
        }
        //   }, 5000);


        //masking flag
        return text;
    }
});
angular.module('smartTALK').filter('SALIENTMONITORING', function ($sce) {
    return function (text) {
        //
        text = text.replace('SALIENTMONITORING', 'SILENT MONITORING');
        return text;
    }
});
angular.module('smartTALK').filter('capitalize', function ($sce) {
    return function (input) {
        try {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        } catch (e) {
            return input;
        }
    }
});
angular.module('smartTALK').filter('filtertime', function ($sce) {
    return function (text) {
        try {
            text = text.split(' ')[1]
        } catch (e) { }
        return text;
    }
});
angular.module('smartTALK').filter('filterNotReadymessage', function ($sce) {
    return function (text) {
        try {
            if (text == "notready") {
                text = "Not Ready"
            }
            if (text == "STOPINTERACTION") {
                text = "STOP INTERACTION";
            }
        } catch (e) { }
        return text;
    }
});
angular.module('smartTALK').filter('filtertimeHHMMSS', function ($sce) {
    return function (text) {
        try {
            text = text.split('.')[0]
        } catch (e) { }
        return text;
    }
});
angular.module('smartTALK').filter("parkdatefilter", function () {
    return function (items, from, to) {
        from = new Date(from);
        var df = from;
        df = new Date(from.getFullYear(), parseInt(from.getMonth()), from.getDate());
        to = new Date(to);
        var dt = to;
        dt = new Date(to.getFullYear(), parseInt(to.getMonth()), to.getDate());
        var arrayToReturn = [];
        for (var i = 0; i < items.length; i++) {
            var tf = new Date(items[i].ScheduledTime),
                tf = convertDate(tf);
            tf = tf.split("/");
            tf = new Date(tf[2], parseInt(tf[1]) - 1, tf[0]);
            if (tf >= df && tf <= dt) {
                arrayToReturn.push(items[i]);
            }
        }
        return arrayToReturn;
    };
});
angular.module('smartTALK').filter('filtertimeHHMM', function ($filter) {

    return function (time, format) {
        try {
            var parts = time.split(':');
            if (parts.length === 3) //its in hh:mm:ss
            {
                var date = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
                return $filter('date')(date, format || clientConfig.TimeFormatConfig.Enable24HourFormat);
            } else if (parts.length === 2) //its in hh:mm
            {
                var date = new Date(0, 0, 0, parts[0], parts[1], 00);
                return $filter('date')(date, format || clientConfig.TimeFormatConfig.Enable24HourFormat);
            }
        } catch (e) {
            console.log('filtertimeHHMM filter catch error');
        }
    };
});
angular.module('smartTALK').filter('dateRange', function ($filter) {

    return function (items, fromDate, toDate, selectedChannel) {
        var filtered = [];
        var datefilter = $filter('date')
        fromDate = datefilter(fromDate, 'MM/dd/yyyy');
        toDate = datefilter(toDate, 'MM/dd/yyyy');
        var from_date = Date.parse(fromDate);
        var to_date = Date.parse(toDate);
        angular.forEach(items, function (item) {
            //Note By Kirti: here date format is 'yyyy/MM/dd' becoz this comes from DB
            var varfilterdatetime = datefilter(item.SESSIONSTARTTIME, 'yyyy/MM/dd');
            var filterdatetime = Date.parse(varfilterdatetime);
            if (filterdatetime >= from_date && filterdatetime <= to_date) {
                if (selectedChannel.id === '') {
                    //this represents ALL category
                    filtered.push(item);
                }
                else {
                    if (item.Channel === selectedChannel.id) {
                        filtered.push(item);
                    }
                    //console.log('item pushed', item);
                }
            }
        });
        return filtered;
    };
});
angular.module('smartTALK').filter('MaskingMobileNo', function ($sce) {
    return function (text, Maskingflag, MASKINGFRONT, MASKINGEND) {
        if (text) {
            if (Maskingflag) {

                var regex = /^(\d{10})$/g; //for 10 digit
                var regex12 = /^(\d{12})$/g; // for 12 digit
                var emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm //email
                //------------------------------------------------masking from front
                if (MASKINGFRONT) {
                    if (text.match(regex)) {
                        text = text.replace(/^[0-9]{6}/, '******'); //10 digit
                    }
                    if (text.match(regex12)) {
                        text = text.replace(/^[0-9]{8}/, '********'); //12 digit
                    }
                }
                //------------------------------------------------masking from front end


                //------------------------------------------------masking from end
                if (MASKINGEND) {
                    if (text.match(regex) || text.match(regex12)) {
                        text = text.replace(/\d{4}$/gm, '****'); //[10-12 digit]
                    }
                }
                //------------------------------------------------masking from end

                if (text.match(emailregex)) {
                    var str = '';
                    var hide = text.split("@")[0].length - 2;//<-- number of characters to hide
                    var r = new RegExp(".{" + hide + "}@", "g")
                    for (var i = 0; i < hide; i++) {
                        str = str + '*';
                    }
                    text = text.replace(r, str + "@");
                }
            }
        }
        return $sce.trustAsHtml(text);
    }
});
angular.module('smartTALK').filter('MaskingEmailID', function ($sce) {
    return function (text, Maskingflag, MAKSINGFRONT, MAKSINGEND) {
        if (text) {
            if (Maskingflag) {

                var regex = /^(\d{10})$/g; //for 10 digit
                var regex12 = /^(\d{12})$/g; // for 12 digit
                var emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm //email

                //------------------------------------------------masking from front
                if (MAKSINGFRONT) {
                    if (text.match(regex)) {
                        text = text.replace(/^[0-9]{6}/, '******'); //10 digit
                    }
                    if (text.match(regex12)) {
                        text = text.replace(/^[0-9]{8}/, '********'); //12 digit
                    }
                }
                //------------------------------------------------masking from front end


                //------------------------------------------------masking from end
                if (MAKSINGEND) {
                    if (text.match(regex) || text.match(regex12)) {
                        text = text.replace(/\d{4}$/gm, '****'); //[10-12 digit]
                    }
                }
                //------------------------------------------------masking from end

                if (text.match(emailregex)) {
                    var str = '';
                    var hide = text.split("@")[0].length - 2;//<-- number of characters to hide
                    var r = new RegExp(".{" + hide + "}@", "g")
                    for (var i = 0; i < hide; i++) {
                        str = str + '*';
                    }
                    text = text.replace(r, str + "@");
                }
            }
        }
        return $sce.trustAsHtml(text);
    }
});
angular.module('smartTALK').filter('SplitMesgID', function ($filter) {
    return function (input) {
        var last = input.substring(input.lastIndexOf("_") + 1, input.length);
        return last;
    };
});
angular.module('smartTALK').filter('SplitMesgIDForIndication', function ($filter) {
    return function (input, UID) {
        var rest = input.substring(0, input.lastIndexOf("_"));
        var last = input.substring(input.lastIndexOf("_") + 1, input.length);
        if (UID === rest) {
            return true;
        }
        else {
            return false;
        }
    };
});
varsmartTALK.controller('smartTALKChat', function ($scope, $filter, $interval, Notification, $sce, Upload, $timeout) {
    $scope.startsWith = function () {
        var lowerStr = (actual + "").toLowerCase();
        return lowerStr.indexOf(expected.toLowerCase()) === 0;
    }
    var tenantid = $('#hdnAgentProcessId').val();
    $scope.EmailTrailDisplayed = false;
    //FSM configuration
    $scope.FSMTab = clientConfig.IsFSMTabDisplayed;
    $scope.FSMLoginURL = "";
    $scope.FSMDataURL = "";
    //KM configuration
    $scope.KMTab = clientConfig.IsKMTabDisplayed;
    $scope.KMLoginURL = "";
    $scope.KMDataURL = "";
    //Link configuration
    $scope.LINKTab = clientConfig.IsLINKTabDisplayed;
    $scope.LINKLoginURL = "";
    $scope.LINKDataURL = "";
    //CRM configuration
    $scope.CRMTabConfig = clientConfig.CRMTabConfig;

    $scope.CustInfoKeyValPair = clientConfig.CustInfoKeyValPair;
    $scope.availableTranslations = [];
    $scope.selectedTranslation = {};
    $scope.Translations = {};

    $scope.AgentPrerequisiteData = {};
    $scope.permittedOutBoundChannels =
    {
        IsPhoneOBAllowed: false,
        IsEmailOBAllowed: false,
        IsWhatsAppOBAllowed: false,
        IsVideoOBAllowed: false
    };
    var fileUploadResultForSnapshot = {};
    $scope.ASW = false;

    $scope.ASWIVRChannels =
    {
        ConnecctionId: "",
        phoneincomming: false,
        disconnect: false,
        call: false,
        reject: false,
        Mute: false,
        Unmute: false,
        Hold: false,
        resume: false,
        Merge: false,
        Transfer: false,
        AgentClose: false,
        InterCationType: "INBOUND",
        ContactMissed: false,
        Number: ''
    };
    $scope.DefaultAgentSignature = "";
    //#region Process Language Translation
    function fillAgentPreferredLanguages() {
        _fetchAgentPreferredLanguages()
            .then((data) => {
                if (data && data.d) {
                    $scope.availableTranslations = JSON.parse(data.d);
                    $scope.selectedTranslation = $scope.availableTranslations[0];

                    function _getagentPreferredTranslation() {
                        return sessionStorage.getItem('agentPreferredTranslation');
                    }
                    var agentPreferredTranslation = _getagentPreferredTranslation();
                    if (agentPreferredTranslation) {
                        $scope.selectedTranslation = JSON.parse(agentPreferredTranslation);
                    }
                    else {
                        $scope.selectedTranslation = $scope.availableTranslations[0];
                        sessionStorage.setItem('agentPreferredTranslation', JSON.stringify($scope.selectedTranslation));
                    }

                    $scope.OnTranslationChange = function (selectedTranslation) {
                        sessionStorage.setItem('agentPreferredTranslation', JSON.stringify(selectedTranslation));

                        var translationURL = './Translations/' + selectedTranslation.LanguageCode + '.json';

                        _fetchAgentPreferredTranslation(translationURL)
                            .then((data) => {
                                if (data) {
                                    //console.log('1 - Request Translation file');
                                    var parsedData = JSON.parse(data);
                                    
                                    //Load Agent Ready NotReady Dropdown
                                    //smartTALKAgentstasListGet(selectedTranslation.LanguageCode);
                                    //Load Supervisor Ready NotReady Dropdown
                                    //if ($scope.smartTALKAgentTYPE.toUpperCase() == 'SUPERVISOR') {
                                    //    _getNotReadyMasterSupervisor(selectedTranslation.LanguageCode);
                                    //}
                                    //Supervisor not ready dropdown has been shifted to LoadForm() function in services after checking for supervisor
                                    
                                    //Load PushURL Dropdown
                                    // _fetchPushURL(selectedTranslation.LanguageCode);
                                    //Load Disposition here.
                                    // smartTALKDisposition(selectedTranslation.LanguageCode);
                                    //Load Canned Message Master here.                          
                                    // bindCanMessage(selectedTranslation.LanguageCode, $('#hdnAgentProcessId').val());
                                    //Load Agent Canned Message Master here.
                                    // BindAgentCanmessage(selectedTranslation.LanguageCode);
                                    //Load Agent Abusive Words.
                                    funGetAbusiveWord(selectedTranslation.LanguageCode);
                                    //Load Channel Process Wise.
                                    funGetChannels(selectedTranslation.LanguageCode);
                                    //load Product dropdown
                                    // smartTALKProduct(selectedTranslation.LanguageCode);

                                    $scope.Translations = parsedData;
                                }
                            })
                            .catch((error) => {
                                console.log('_fetchAgentPreferredTranslation error', error)
                            })
                            .finally(() => {
                                _hideWaitModal();
                            });
                    };

                    $scope.OnTranslationChange($scope.selectedTranslation);
                }
            })
            .catch((error) => {
                console.log('_fetchAgentPreferredLanguages error', error)
            })
    }
    fillAgentPreferredLanguages();
    //#endregion

    //#region Fetch Agent Prerequisite Data    
    function _getAgentPrerequisiteData() {
        _fetchAgentPrerequisiteData()
            .then((data) => {
                if (data && data.d) {
                    $scope.AgentPrerequisiteData = JSON.parse(data.d);

                    // adde by vivek 23-08-2021 fro AWS 
                    try {
                        var _agentMappedChannels = $scope.AgentPrerequisiteData.AgentMappedChannels;
                        if (_agentMappedChannels.some(x => x.ChannelName === 'VOICE')) {
                            $scope.ASW = true;
                            LoadAWS();
                        }
                    } catch (e) {

                    }


                    $scope.EmailReplyIP.selectedFromEmailId = ($scope.AgentPrerequisiteData.VitalEmailInfo != null) ? $scope.AgentPrerequisiteData.VitalEmailInfo.MailboxInfo[0] : "";

                    _setPermittedOutBoundChannels();

                    if ($scope.permittedOutBoundChannels.IsEmailOBAllowed && $scope.IsEmailTemplateLoadBtnVisible) {
                        $scope.loadEmailTemplate();
                    }

                    //Set CRM Login Link here.
                    if ($scope.CRMTabConfig.IsCRMTabDisplayed == true) {
                        var agentEmail = $scope.AgentPrerequisiteData.AgentEmailId;
                        var linkLoginURL = $scope.CRMTabConfig.CRMLinkLoginURL;
                        linkLoginURL = linkLoginURL.replace('$user$', agentEmail);
                        linkLoginURL = linkLoginURL.replace('$$AGENTID$$', $scope.AGENTID);
                        setTimeout(function (linkLoginURL) { $('#iframecrm').prop('src', linkLoginURL); }, 1000, linkLoginURL);
                    }
                    if ($scope.LINKTab == true) {
                        _setLinkAutoLoginURL();
                    }

                    _setMappedChannelsIconAndCnt();
                    $scope.ddlAgentAssignedSkills = funBindAgentAssignedSkills($scope.AgentPrerequisiteData.AgentAssignedSkills);
                    $scope.ddlSelectedAgentAssignedSkills = $scope.ddlAgentAssignedSkills[0];

                    // _FetchAgentEmailSignature();
                    if (_agentMappedChannels.length && _agentMappedChannels.some(x => x.ChannelName === 'EMAIL')) {
                        _FetchAgentEmailSignature();
                    }
                    //var generalTabUrl = clientConfig.CRMTabConfig.CRMLinkLoginURL;
                    //var kAgentId = sessionStorage.getItem('kAgentId');
                    //generalTabUrl = generalTabUrl.replace('$$AGENTID$$', kAgentId);
                    //generalTabUrl = generalTabUrl.replace('$$USER$$', $scope.AgentPrerequisiteData.AgentEmailId);
                    //generalTabUrl = generalTabUrl.replace('$$AGENTLOGINID$$', $scope.AgentPrerequisiteData.AgentLoginId);
                    //generalTabUrl = generalTabUrl.replace('$$PROCESSID$$', $scope.AgentPrerequisiteData.AgentProcessId);
                    //$('#iframeGeneral').prop('src', generalTabUrl);
                }
            })
            .catch((error) => {
                console.log('_fetchAgentPrerequisiteData error', error)
            })
    }
    _getAgentPrerequisiteData();
    //#endregion

    function _setPermittedOutBoundChannels() {
        var _agentMappedChannels = $scope.AgentPrerequisiteData.AgentMappedChannels;
        $scope.permittedOutBoundChannels.IsPhoneOBAllowed = _agentMappedChannels.some(x => x.ChannelName === 'VOICE');
        $scope.permittedOutBoundChannels.IsEmailOBAllowed = _agentMappedChannels.some(x => x.ChannelName === 'EMAIL');
        $scope.permittedOutBoundChannels.IsWhatsAppOBAllowed = _agentMappedChannels.some(x => x.ChannelName === 'WHATSAPP');
        $scope.permittedOutBoundChannels.IsVideoOBAllowed = _agentMappedChannels.some(x => x.ChannelName === 'VIDEO');
    }

    function _setLinkAutoLoginURL() {
        var emailid = $scope.AgentPrerequisiteData.AgentEmailId;
        var iframe = clientConfig.LINKLinkLoginURL;
        iframe = iframe.replace("$$USER$$", emailid);
        setTimeout(function () { $('#iframeLINK').attr('src', iframe); }, 100);
    }

    //#region Load Agent ReadyNotReady Dropdown Start
    $scope.NotReadyReason = "";
    $scope.smartTALKAgentSTATUS = "";
    $scope.selectedItem = "";
    $scope.smartTALKAgentstasListGet = smartTALKAgentstasListGet;
    function smartTALKAgentstasListGet(selectedLangCode) {
        AgentstasList(selectedLangCode)
            .then((data) => {
                var _data = JSON.parse(data.d);
                $scope.smartTALKAgentstatList = _data;
                var _currentAgentStatus = $scope.smartTALKAgentSTATUS || '';
                var notReadyReason = ($scope.NotReadyReason.toUpperCase() == 'LOGIN') ? 'NotReady' : $scope.NotReadyReason;
                $scope.selectedItem = (_currentAgentStatus.toUpperCase() == "READY") ? "Ready" : notReadyReason;
            })
            .catch((error) => {
                smartTALKNotificationError("Unable to load Ready NotReady dropdown. Please try again.");
                console.log('AgentstasList error', error)
            })
    }
    //#endregion

    //#region Load Push URL
    function _fetchPushURL(selectedLangCode) {
        funGetpushurl(selectedLangCode)
            .then((data) => {
                if (data && data.d) {
                    var _data = JSON.parse(data.d);
                    if (_data && _data.Table.length > 0) {
                        $scope.smartTALKPushUrlsList = _data.Table;
                    }
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Unable to load Push Url. Please try again.");
                console.log('funGetpushurl error', error)
            })
    }
    //#endregion

    //#region Load Supervisor ReadNotReady Actions Dropdown Start
    //$scope.supervisorAgentActionListBind = supervisorAgentActionListBind;
    $scope.smartTALKSupervisoerActiveAgentAction = { availableOptions: [], };
    function _getNotReadyMasterSupervisor(selectedLangCode) {
        _fetchNotReadyMasterSupervisor(selectedLangCode)
            .then((data) => {
                if (data && data.d) {
                    var _data = JSON.parse(data.d);
                    $scope.smartTALKSupervisoerActiveAgentAction.availableOptions = _data;
                    //$scope.supervisorAgentActionListBind(_data);
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Unable to load Not Ready for Supervisor. Please try again.");
                console.log('funGetpushurl error', error)
            })
    }
    //function supervisorAgentActionListBind(data) {
    //    $scope.smartTALKSupervisoerActiveAgentAction.availableOptions = data;
    //}
    //#endregion

    //#region Load Disposition Dropdown Start
    $scope.dispoformDisposition = {};
    $scope.dispoformDispositionList = [];
    $scope.smartTALKDisposition = smartTALKDisposition;
    function smartTALKDisposition() {
        let stateMaintain = JSON.parse(sessionStorage.getItem("stateMaintain"));
        if (stateMaintain && stateMaintain.dispoformDispositionList) {
            $scope.dispoformDispositionList = stateMaintain.dispoformDispositionList
        }
        else {
            funDisposition($scope.selectedTranslation.LanguageCode);
        }
        if ($scope.DispoProduc) {
            if (!stateMaintain && !stateMaintain.productformProductList){
                $scope.productformProductList = stateMaintain.productformProductList;
            }
            else {
                funProduct($scope.selectedTranslation.LanguageCode);
            }
            
        }
    }
    //smartTALKDisposition(); //Call dispostion here
    //#endregion

    //#region Load Sub-Disposition Dropdown Start
    $scope.dispoformSubDisposition = {};
    $scope.dispoformSubDispositionList = [];
    $scope.SubSubdispoformSubDispositionList = [];
    $scope.smartTALKSubDisposition = smartTALKSubDisposition;
    //#endregion

    //#region Load Product Dropdown Start
    $scope.productformProduct = {};
    $scope.productformProductList = [];
    $scope.smartTALKProduct = smartTALKProduct;
    function smartTALKProduct(selectedLangCode) {
        funProduct(selectedLangCode);
    }
    //#endregion

    //#region Load Email Case Status Dropdown Start
    $scope.ddlEmailCaseStatus = {};
    $scope.lstEmailCaseStatus = [{ 'Id': '1', 'EmailCaseStatusName': 'OPEN' }, { 'Id': '2', 'EmailCaseStatusName': 'CLOSED' }, { 'Id': '2', 'EmailCaseStatusName': 'IN-PROGRESS' }];
    //#endregion

    //#region Maintain Disposition fields in sync with multiple interactions.
    $scope.dispositionDetailsWithInteraction = { disposition: '', subdisposition: '', dispositionRemark: '', subsubdisposition: '' };
    function smartTALKSubDisposition(data, selectedLangCode) {
        $scope.dispoformSubDisposition = {};
        $scope.SubSubdispoformSubDisposition = {};
        funSubDisposition(data.DispostionName, selectedLangCode);
        //_syncDispositionDetailsWithInteraction(data);
    }
    //----------------------------------------------// SUB DISPO CHANGE EVENT

    //----------------------------------------------//
    $scope.onSubDispositionChange = function (SubDispo, language) {

        //_syncDispositionDetailsWithInteraction(SubDispo.selected.SubdispositionName);
        funSubSubDisposition(SubDispo, $scope.dispoformDisposition.selected, language);

    }

    $scope.onSubSubDispositionChange = function (data) {
        $scope.dispositionDetailsWithInteraction.subsubdisposition = data;
        $scope.SubSubdispoformSubDisposition = data;
    }

    $scope.onPushURLChangeChange = function (data) {

        $scope.smartTALKPushUrlsText = data;
    }

    $scope.onDispositionRemarkChange = function (data) {
        //_syncDispositionDetailsWithInteraction(data);
		//var reg =/<(.|\n)*?>/g; 
		//var reg2 = /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/g;
		//var reg3 = /^[!@#\$%\^\&*\)\(+=._-]+$/
		//var reg = /[!@#$%^&*(),.?":{}|<>]/g

		//if (data.match(reg)) {
			//$scope.dispoformRemarks = "";
		//}
    }
    function _syncDispositionDetailsWithInteraction(data) {
        $scope.dispositionDetailsWithInteraction.disposition = $scope.dispoformDisposition;
        $scope.dispositionDetailsWithInteraction.subdisposition = $scope.dispoformSubDisposition;
        $scope.dispositionDetailsWithInteraction.dispositionRemark = $scope.dispoformRemarks;


        if (sessionStorage.getItem($scope.hdsessionId) !== null) {
            sessionStorage.setItem($scope.hdsessionId, JSON.stringify($scope.dispositionDetailsWithInteraction));
        }
    }
    //#endregion

    //#region Loop CustInfoKeyValPair Operations Start    function smartTALKFilterMyChatHistory(staus)

    function _setCustomCustomerHistorySearchParams() {
        $scope.CustomCustomerHistorySearchAttributes = [];
        for (var i = 0, len = $scope.CustInfoKeyValPair.length; i < len; i++) {
            if ($scope.CustInfoKeyValPair[i].ISDISPLAYEDINCUSTHISTORYSEARCH === true) {
                $scope.CustomCustomerHistorySearchAttributes.push($scope.CustInfoKeyValPair[i]);
            }
        }
    }
    _setCustomCustomerHistorySearchParams();
    //#endregion

    $scope.smartTALKActiveSessionList = [];
    $scope.SENEDIMAGES = true;
    $scope.notreadytimestatus = false;
    $scope.coutboundtab = clientConfig.IsOutboundCustomerDisplayed;
    $scope.csmsoutboundtab = clientConfig.OutboundTab.IsSMSOutboundDisplayed;
    $scope.cmissedinteractiontab = clientConfig.OutboundTab.IsMissedInteractionDisplayed;
    $scope.chsmtemplate = clientConfig.OutboundTab.IsHSMTemplateDisplayed;
    $scope.cmanualoutbound = clientConfig.OutboundTab.IsManualOutboundDisplayed;
    $scope.cvoiceoutbound = clientConfig.OutboundTab.IsVoiceOutboundDisplayed;
    $scope.DisableShortCodeForCannedMsg = clientConfig.DisableShortCodeForCannedMsg;
    $scope.cvoiceoutboundKnowlarity = clientConfig.OutboundTab.IsVoiceOutboundDisplayedKnowlarity;
    $scope.scenarioKey = clientConfig.OutboundTab.HSMSCENARIOKEY;
    $scope.HSMAllowedFiles = clientConfig.OutboundTab.FileAllowed;
    $scope.HSMAllowedFileSize = clientConfig.OutboundTab.MaxFileSizeAllowed;
    $scope.IsEmailTemplateLoadBtnVisible = clientConfig.IsEmailTemplateLoadBtnVisible;
    $scope.txtVoiceCustOutBoundPhoneNoCountryCode = '91';
    $scope.cdashboardtab = false;
    $scope.Templatevalue = {};
    //$scope.ccrmtab = false;
    //$scope.mergebtn = false;
    $scope.CloseChat = false;

    $scope.WRAPEFROM = '';
    $scope.WRAPEFROMURL = '';
    $scope.WRAPEFROMURLIFRAME = '';
    $scope.AGENTID = "";
    //$scope.TransferToSkills = true;
    //VideoChat and CoBrowse
    $scope.VIDEOCHATSTATUS = "";
    $scope.VIDEOCHATSESSIONID = "";
    $scope.COBROWSINGSTATUS = "";
    $scope.COBROWSINGSESSIONID = "";
    //$scope.SmartLink = false;
    //$scope.SmartLinkLogin = "";
    //$scope.SmartLinkTickeUrl = "";
    $scope.SmartTALKImageLoder = "images/loading.gif";
    $scope.MessageDispalyCountDefault = 10;
    $scope.ReplyScreen = false;
    $scope.EnableBlackListingOfCustomerContainer = false //initially false to hide the blacklist popup.
    $scope.EnableBlackListingOfCustomer = clientConfig.BlackListingCustomers.EnableBlackListingOfCustomer; // to be modified by bring data from api client config.
    $scope.ParkedInteractions = clientConfig.IsParkedInteractionsDisplayed;
    $scope.AutoParkInteraction = clientConfig.AutoParkInteraction;
    //masking configuration

    $scope.IBIsActiveInteractionDisplayed = clientConfig.InboundTab.IsActiveInteractionDisplayed;
    $scope.IBIsMissedInteractionDisplayed = clientConfig.InboundTab.IsMissedInteractionDisplayed;
    $scope.IBIsParkedInteractionDisplayed = clientConfig.InboundTab.IsParkedInteractionDisplayed;
    $scope.IBIsMyChatHistoryDisplayed = clientConfig.InboundTab.IsMyChatHistoryDisplayed;

    $scope.IsSendImgToUrlNetworkByPass = clientConfig.IsSendImgToUrlNetworkByPass;

    $scope.VoiceCustomerField = false;

    $scope.MASKINGFRONT = clientConfig.MaskingConfig.ISMASKINGFROMFRONT;
    $scope.MASKINGEND = clientConfig.MaskingConfig.ISMASKINGFROMEND;
    $scope.MaskingFlag = clientConfig.MaskingConfig.ISMaskingEnabled;

    //masking configuration

    //subsub dispo
    $scope.SubSubDispo = clientConfig.SubSubDispositionDisplayed.SubSubDispo;
    $scope.DispoProduct = clientConfig.SubSubDispositionDisplayed.DispoProduct;
    //subsub dispo end

    //short code cannded message
    $scope.ShortCodeCannedMsg = []; //text code
    if (!$scope.DisableShortCodeForCannedMsg) {
        $scope.BindShortCode = function (selected) {
            if (selected) {
                $scope.ShortCodeArray = selected.originalObject;
                $scope.txtmessage = $scope.txtmessage + " " + $scope.ShortCodeArray.text;
            } else {
                $scope.ShortCodeArray = null;
            }
        }
    }
    $scope.WorkFlowList = [];
    $scope.UpdatePassword = UpdatePassword;
    $scope.blockedcontents = "";
    //maxlenth configuration
    $scope.dispositionRemarkMaxLength = clientConfig.dispositionRemarkMaxLength;
    $scope.dispositionBotRemarkMaxLength = clientConfig.dispositionBotRemarkMaxLength;
    $scope.twitterPostTextMaxLength = clientConfig.twitterPostTextMaxLength;
    $scope.SMSOutBoundMaxLength = clientConfig.SMSOutBoundMaxLength;


    //$scope.SmartLink = clientConfig.CRMTabConfig.IsCRMTabDisplayed;
    //$scope.SmartLinkLogin = clientConfig.CRMTabConfig.CRMLinkLoginURL
    //$scope.SmartLinkTickeUrl = clientConfig.CRMTabConfig.CRMLinkDataURL;       
    //Cherry Picking $scope.CRMTabConfig = clientConfig.CRMTabConfig;
    $scope.CherryPickConfig = clientConfig.CherryPickConfig;
    //shadow browse session ID
    $scope.shadowBrowseSessionID = '';
    //Visual Character Count Show/Hide
    $scope.displayVisualCharCount = function (spnID) {
        $('#' + spnID).show();
    }
    $scope.hideVisualCharCount = function (spnID) {
        $('#' + spnID).show();
    }
    //CustomerHistory Tab Configuration
    $scope.CustomerHistoryConfig = clientConfig.CustomerHistoryConfig;
    //File Upload configuration
    $scope.FileUploadConfig = clientConfig.FileUploadConfig;
    //Foreign Language selection dropdown
    $scope.IsChangeLanguageSectionDisplayed = clientConfig.IsChangeLanguageSectionDisplayed;
    //ShadowBrowser Tab configuration
    $scope.ShadowBrowseTabConfig = clientConfig.ShadowBrowseTabConfig;
    //Holds Dyanamic data that generates Dyanamic textbox for Customer History
    $scope.DynamicCustomerHistorySearchParams = clientConfig.customerAttributeName;
    $scope.DynamicMyChatHistorySearchParams = clientConfig.DynamicMyChatHistorySearchParams;
    //PageUIConfig
    $scope.PageUIConfig = clientConfig.PageUIConfig;
    //AdminTab Config
    //$scope.AdminTabConfig = clientConfig.AdminTabConfig;
    //SocialPresence Tab Config
    $scope.SocialPresenceTabConfig = clientConfig.SocialPresenceTabConfig
    //MessageSentDeliveredReadConfig
    $scope.MessageSentDeliveredReadConfig = clientConfig.MessageSentDeliveredReadConfig;
    //Supervisor Tab Config
    $scope.SupervisorTabConfig = clientConfig.SupervisorTabConfig;
    //My Insight Tab Config
    $scope.MyInsightTabConfig = clientConfig.MyInsightTabConfig;
    //Manual Case Creation Config
    $scope.ManualCaseCreationConfig = clientConfig.ManualCaseCreationConfig;
    _extendManualCaseCreationConfig();
    //Page Security related Configuration
    try {
        if (clientConfig.PageSecurityConfig.PreventRightClick == true) {
            DisablePageRightClick();
        }
        if (clientConfig.PageSecurityConfig.PreventCopyPaste == true) {
            DisablePageCopyPaste();
        }
        if (clientConfig.PageSecurityConfig.PreventF12 == true) {
            DisablePageF12();
        }
        if (clientConfig.PageSecurityConfig.PreventViewSource == true) {
            DisablePageViewSource();
        }
        if (clientConfig.PageSecurityConfig.PreventCntrlSave == true) {
            DisablePageCntrlSave();
        }
    } catch (e) {
        console.log('catch error in section Page Security Configuration');
    }
    //Interaction Window Configuration
    $scope.InteractionWindowConfig = clientConfig.InteractionWindowConfig;
    //Video Calling Tab Config
    $scope.VideoCallingTabConfig = clientConfig.VideoCallingTabConfig;
    try {
        //Co Browsing Tab Config.
        $scope.CoBrowsingTabConfig = clientConfig.CoBrowsingTabConfig;
        if ($scope.CoBrowsingTabConfig.IsCoBrowsingTabDisplayed) {
            $('#iframeCoBrowsing').prop('src', '');
        }
    } catch (e) { }
    $scope.Selected_Recent_Chat = "";
    $scope.Selected_MyHistoery_Chat = "";
    $scope.TextboxSendMessageEnabled = "0";
    $scope.RequestOrigin = "";
    $scope.smartTALKAgentName = "";
    $scope.smartTALKAgentName_GroupChat = "";
    $scope.smartTALKAgentLOGINTIME = "";
    $scope.smartTALKAgentNOTREADYTIME = "";
    $scope.smartTALKAgentTYPE = "";

    $scope.smartTALKAgentACTIVETABE = "";
    $scope.smartTALKAgentACTIVECUSTOMERAGENT = "";
    $scope.AgentLoginID = "";

    $scope.AgentPreferredLanguage = "";
    $scope.smartTALKPushUrlsText = {};
    $scope.smartTALKPushUrlsList = [];
    $scope.txtmessage = "";
    $scope.txtmessage1 = "";
    $scope.Disposition = "";
    $scope.SubDisposition = "";
    $scope.Remarks = "";
    $scope.AgentChatHistoeryDisposition = "";
    $scope.AgentChatHistoerySubDisposition = "";
    $scope.AgentChatHistoeryRemarks = "";
    $scope.FromDate = getCurrentDateInMMDDYYY();
    $scope.ToDate = getCurrentDateInMMDDYYY();
    $scope.Chanel = "";
    $scope.ActiveChannel = "";
    $scope.CHANNELSOURCE = "";
    $scope.ActiveStatus = "";
    $scope.ActiveCustName = "";
    $scope.InteractionTime = "";
    $scope.ActiveHandleTime = "";
    $scope.ActiveTypingNotifaction = "";
    $scope.ActiveLastSeen = "";
    $scope.hdsessionId = "";
    $scope.hdPhoneNo = "";
    $scope.hdCutName = "";
    $scope.hdCHANNELID = "";
    $scope.ActiveSessions = "0";
    $scope.smartTALKAgentstatList = [];
    $scope.GroupChat = [];
    $scope.smartTALKSendMSGGroupChat = smartTALKSendMSGGroupChat;
    $scope.smartTALKGroupChatMsg = "";
    $scope.smartTALKChatGroup = "Select Group";
    $scope.smartTALKChatGroupList = [];
    $scope.AgentGroups = [];
    $scope.SelectedAgentGroup = {};
    $scope.SelectedAgentGroupSup = {};
    $scope.ddlCampaignList = {}; //web engage ddl 
    $scope.CampaignList = []; //web engage ddl 
    $scope.smartTALKCustomerDetailsList = [];
    $scope.OtherAgentDetailStats = {};
    $scope.otherAgentRequestCategoryType = "GROUPWISE";
    $scope.supRequestCategoryType = "GROUPWISE";
    $scope.otherAgentRequestDetail = "";
    $scope.supRequestDetail = "";
    $scope.ddlTransferToSkills = [];
    $scope.agentEmojis = [];
    $scope.myCheckboxSup = {};
    $scope.myCheckboxSup.chkFilter = false;
    $scope.SelDisposeTab = 'DispOutCome';

    //#region Voice Schedule Callback
    $scope.VoiceIP = {
        VoiceCampaignName: '',
        IsCallBackScheduled: false,
        IsVoiceCallBackPersonal: false,
        VoiceCallBackDtTm: '',
        VoiceCallBackTimestamp: '',
        VoiceCallBackFormattedMsg: 'Schedule Voice Callback',
        VoiceApplicationId: '',
        VoiceRecordHandleId: '',
        VoiceRecordId: ''
    };
    //#endregion

    function _clearDispositionForm() {
        $scope.dispoformLeadID = "";
        $scope.dispoformEmail = "";
        $scope.dispoformName = "";
        $scope.dispoformNumber = "";
        $scope.dispoformDisposition = {};
        $scope.dispoformSubDisposition = {};
        $scope.SubSubdispoformSubDisposition = {};
        $scope.ddlEmailCaseStatus = {};
        $scope.dispoformRemarks = "";

        $scope.dispoformDispositionValidate = false;
        $scope.dispoformRemarksValidate = false;
        $scope.dispoformSubDispositionValidate = false;
        $scope.dispoformEmailValidate = false;
        $scope.disposeFrmEmailCaseValid = false;

        $scope.oCustomerChatHistoryResponseMSG = [];
        setTimeout(function () { if ($scope.smartTALKActiveSessionList.length == 0) { LoadForm(); } }, 5000)
    }

    //#region Email With Link and Agent App
    $scope.EmailAttachments = [];
    $scope.UploadEmailAttachments = [];
    $scope.UploadEmailAttachmentsForForward = [];

    $scope.EmailInteractionTranscript = {
        IsAvailable: false,
        TranscriptDetails: [],
    }

    $scope.EmailReplyIP = {
        txtFrom: '',
        txtTo: '',
        txtCc: '',
        txtBcc: '',
        txtSubject: '',
        txtBody: '',
        selectedFromEmailId: '',
        IsDirectDispose: false,
        MailScreenAction: ''
    }

    $scope.EmailIP = {
        IsEmailResponseAllowed: true,
        IsEmailDispositionAllowed: true,
        ManualOutBoundEmailToAddress: '',
    }

    $scope.triggerAgentEmailOutBound = triggerAgentEmailOutBound;
    function triggerAgentEmailOutBound() {
        if ($scope.EmailIP.ManualOutBoundEmailToAddress == '') {
            smartTALKNotificationError("Enter valid emailID to initiate outbound");
            return true;
        }
        var _EmailIP = $scope.EmailIP;
        _triggerAgentEmailOutBound(_EmailIP)
            .then((data) => {
                if (data) {
                    var _msg = '';
                    if (data.d) {
                        _msg = 'Outbound email interaction initiated successfully.'
                        smartTALKNotificationSuccess(_msg);
                        $scope.filterSubMenu('ActiveInteractions');
                    }
                    else {
                        _msg = 'Unable to initiate the outbound email. Please try again.';
                        smartTALKNotificationError(_msg);
                    }
                }
                else {
                    smartTALKNotificationError("Unable to initiate the outbound email. Please try again.");
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Unable to initiate the outbound email. Please try again.");
                console.log('_triggerAgentEmailOutBound error', error)
            })
    }

    $scope.sendDisposeMail = sendDisposeMail;
    function sendDisposeMail(canValidate) {
        var retu = true;

        var _subject = (typeof $scope.EmailReplyIP.txtSubject === 'object') ? $scope.EmailReplyIP.txtSubject : $scope.EmailReplyIP.txtSubject;
        var _body = (typeof $scope.editorModel === 'object') ? $scope.editorModel : $scope.editorModel;

        if (canValidate) {
            if (!_subject) {
                smartTALKNotificationError("Email subject is mandatory.");
                retu = false;
            }
            if (!_body) {
                smartTALKNotificationError("You are not allowed to send an email without an email body.");
                retu = false;
            }
        }

        //will just dispose Email if canValidate flag is false.
        var _IsOnlyDispose = (!canValidate) ? true : false;

        //_IsOnlyDispose when true, we will always proceed with email disposal.
        //_IsOnlyDispose when false, we will check the validation status and proceed accordingly.
        var _CanProceed = (_IsOnlyDispose) ? true : retu;

        if (!oAgentDispositionSilder.IsDispositionSliderOpen) {
            //Open disposition slider when it is closed.
            _ToggleDispositionSlider();
        }

        //if (!_CanProceed) {
        //    //In case of error simply close the slider.
        //    _CloseDispositionSlider();
        //}

        var status = {
            IsOnlyDispose: _IsOnlyDispose,
            CanProceed: _CanProceed,
        }

        return status;
    };

    function triggerSendMail() {
        var _interactionId = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE13"; })[0].Value;

        if (_interactionId) {
            _sendEmailViaLinker(null);
        }
        else {
            _createCaseViaLINK();
        }
    }

    function _sendEmailDirectly() {
        var _attachments = { fileName: "", StringUrl: "" };
        var _sendMailRQ = {
            InboundMessage: {
                Sender: "",
                To: "",
                CC: "",
                BCC: "",
                Header: "",
                Subject: "",
                Body: "",
                ContentType: "HTML",
                HttpAttachment: "TRUE",
                Attachments: []
            },
            attachment: null
        };

        _sendMailRQ.InboundMessage.Sender = (typeof $scope.EmailReplyIP.txtFrom === 'object') ? $scope.EmailReplyIP.txtFrom : $scope.EmailReplyIP.txtFrom;
        _sendMailRQ.InboundMessage.To = (typeof $scope.EmailReplyIP.txtTo === 'object') ? $scope.EmailReplyIP.txtTo : $scope.EmailReplyIP.txtTo;
        _sendMailRQ.InboundMessage.CC = (typeof $scope.EmailReplyIP.txtCc === 'object') ? $scope.EmailReplyIP.txtCc : $scope.EmailReplyIP.txtCc;
        _sendMailRQ.InboundMessage.Header = 'OBEmail';
        _sendMailRQ.InboundMessage.Subject = (typeof $scope.EmailReplyIP.txtSubject === 'object') ? $scope.EmailReplyIP.txtSubject : $scope.EmailReplyIP.txtSubject;
        _sendMailRQ.InboundMessage.Body = (typeof $scope.editorModel === 'object') ? $scope.editorModel : $scope.editorModel;
        //_sendMailRQ.InboundMessage.Attachments.push(_attachments);

        _triggerSendMail(_sendMailRQ);
    }

    function toStringObject(arr) {
        var rv = [];
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i] !== undefined) {
                var _obj = arr[i];
                rv.push(JSON.stringify(_obj));
            }
        }
        return rv;
    }

    function _sendEmailViaLinker(oCaseId) {
        let _caseId = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE4"; })[0].Value;
        let _interactionId = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE13"; })[0].Value;

        if (oCaseId) {
            //we have a case ID, lets use this one.
            _caseId = oCaseId;
            _interactionId = "0";
        }

        let _senderEmail = $scope.EmailReplyIP.txtTo ? checkEmails($scope.EmailReplyIP.txtTo) : '';
		if(_senderEmail == ''){
			smartTALKNotificationError("Please enter To field value");
			return;
		}

        let arrCc = [];
        let _txtCc = (typeof $scope.EmailReplyIP.txtCc === 'object') ? $scope.EmailReplyIP.txtCc : $scope.EmailReplyIP.txtCc;
        if (_txtCc) {
            let _cc = $scope.EmailReplyIP.txtCc ? checkEmails($scope.EmailReplyIP.txtCc) : '';
            arrCc = _cc.replace(/ /g, '').split(",");
        }

        let _agentEmailAddress = $scope.AgentPrerequisiteData.VitalEmailInfo.AgentRequestorInfo.AgentEmail;
        //let _mailboxInbound = (typeof $scope.EmailReplyIP.txtFrom === 'object') ? $scope.EmailReplyIP.txtFrom : $scope.EmailReplyIP.txtFrom;
        let _mailboxInbound = $scope.EmailReplyIP.selectedFromEmailId.EmailMailbox;

        var oData = {
            "interactionDes": (typeof $scope.editorModel === 'object') ? $scope.editorModel : $scope.editorModel,
            "Subject": (typeof $scope.EmailReplyIP.txtSubject === 'object') ? $scope.EmailReplyIP.txtSubject : $scope.EmailReplyIP.txtSubject,
            "caseid": _caseId,
            "CCMail": arrCc,
            "channel": "1",
            "visibility": true,
            "contactId": "",
            "EmailContact": _senderEmail,
            "ChannelName": "Email",
            "userType": "agent",
            "UploadFileNames": [],
            "sessionId": $('#hdnAgentSessionId').val(),
            "saveFrom": "agent",
            "direction": "1",
            "subdisposition": "1",
            "subsubdisposition": null,
            "ReplyType": "Interaction",
            "ReplyID": _interactionId,
            "MailBox": _mailboxInbound,
            "AgentEmailAddress": _agentEmailAddress,
            "IntrRequestOrigin": "API",
            "SendTrailMailFlag": "false"
        };

        if ($scope.UploadEmailAttachments.length > 0) {
            let filteredEmailAttachments = $scope.UploadEmailAttachments.filter(function (_data) {
                return _data.CESessionId == $scope.hdsessionId;
            });

            let oUploadAttachment = toStringObject(filteredEmailAttachments);
            oData.UploadFileNames = oUploadAttachment;
        }

        _triggerEmailViaLinker(oData)
            .then((data) => {
                if (data) {
                    var _data = JSON.parse(data);

                    if (_data.Result == "Success") {
                        smartTALKNotificationSuccess('Mail Sent.');

                        let agentEmailAddress = $scope.AgentPrerequisiteData.VitalEmailInfo.AgentRequestorInfo.AgentEmail;
                        let caseId = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE4"; })[0].Value;
                        let emailCaseStatus = ($scope.ddlEmailCaseStatus.selected) ? $scope.ddlEmailCaseStatus.selected.EmailCaseStatusName : '';

                        /* Region : park interaction */
                        _processParkedInteractionData();
                        /* End Region */

                        // CASE close API via LINK
                        if (emailCaseStatus == 'CLOSED') _closeEmailCaseViaLINK(agentEmailAddress, caseId);

                        // CASE update API via LINK
                        if (emailCaseStatus == 'IN-PROGRESS') _updateEmailCaseViaLINK(_agentEmailAddress, _caseId);

                        $scope.smartTALKClosed();
                    } else {
						console.log('Errorr in _triggerEmailViaLinker()');
                        smartTALKNotificationError('Unable to send the email. Please try again.');
                    }
                }
            })
            .catch((error) => {
				console.log('Catch Error in _triggerEmailViaLinker()');
                smartTALKNotificationError("Unable to send the email. Please try again");
                console.log('_triggerEmailViaLinker error', error)
            }).finally(() => {
                //clean up
            });
    }

    function _createCaseViaLINK() {
        var arrCc = [];
        var _txtCc = (typeof $scope.EmailReplyIP.txtCc === 'object') ? $scope.EmailReplyIP.txtCc : $scope.EmailReplyIP.txtCc;
        if (_txtCc) {
            let _cc = $scope.EmailReplyIP.txtCc;
            arrCc = _cc.replace(/ /g, '').split(",");
        }

        var _agentEmailAddress = $scope.AgentPrerequisiteData.VitalEmailInfo.AgentRequestorInfo.AgentEmail;
        var _requestedAgentEmailId = $scope.AgentPrerequisiteData.VitalEmailInfo.AgentRequestorInfo.AgentEmailId;
        var _mailboxOutbound = (typeof $scope.EmailReplyIP.txtFrom === 'object') ? $scope.EmailReplyIP.txtFrom : $scope.EmailReplyIP.txtFrom;

        var odata = {
            "EmailCC": arrCc,
            "EmailSourceAccount": (typeof $scope.EmailReplyIP.txtFrom === 'object') ? $scope.EmailReplyIP.txtFrom : $scope.EmailReplyIP.txtFrom,
            "AccountID": "X57D6M",
            "ReplyEmailTo": _agentEmailAddress,
            "Description": (typeof $scope.editorModel === 'object') ? $scope.editorModel : $scope.editorModel,
            "Subject": (typeof $scope.EmailReplyIP.txtSubject === 'object') ? $scope.EmailReplyIP.txtSubject : $scope.EmailReplyIP.txtSubject,
            "Priority": "Low",
            "Status": "Open",
            "RequestType": "Query",
            "ContactID": "",
            "SourceChannel": "EMAIL",
            "Product": "",
            "FollowupDate": "",
            "UserType": "Agent",
            "Team": "",
            "DueDate": "",
            "Agent": "",
            "REFID": "",
            "InteractionID": "",
            "BusinessHours": "Online",
            "RequestedBy": _requestedAgentEmailId,
            "Source": "DIRECT",
            "SourceID": "MANUAL",
            "Escalation": "No",
            "CallbackReq": "No",
            "FlowID": "",
            "Facebook": "",
            "Twitter": "",
            "UploadFileNames": [],
            "ListAttributes": "",
            "WhatsApp": "",
            "ContactNo": "9999999999",
            "EmailTo": (typeof $scope.EmailReplyIP.txtTo === 'object') ? $scope.EmailReplyIP.txtTo : $scope.EmailReplyIP.txtTo,
            "Instagram": "",
            "Name": (typeof $scope.EmailReplyIP.txtTo === 'object') ? $scope.EmailReplyIP.txtTo : $scope.EmailReplyIP.txtTo,
            "AdditionalInfo": {},
            "AgentID": "",
            "TeamId": "",
            "saveFrom": "",
            "RequesterID": "",
            "ReqSrcChannelId": _mailboxOutbound
        };
        odata.Description = odata.Description.replace(/(\r\n|\n|\n)/g, '');
        _triggerCreateCaseViaLINK(odata)
            .then((data) => {
                console.log('_triggerCreateCaseViaLINK', data);
                if (data) {
                    var _data = JSON.parse(data);
                    if (_data["result"] == "Success") {
                        var _caseId = _data["caseid"];
                        if (_caseId) {
                            _sendEmailViaLinker(_caseId);
                        }
                        else {
                            var _message = _data["data"] || '';
                            _message = _message + ' Failed to send Email.';
                            smartTALKNotificationError(_message);
                        }
                    }
                    else {
                        var _message = _data["data"] || '';
                        _message = _message + ' Failed to send Email.';
                        smartTALKNotificationError(_message);
                    }
                }
            })
            .catch((error) => {
				console.log('Catch Error in _triggerCreateCaseViaLINK()');
                smartTALKNotificationError("Unable to send the email. Please try again");
                console.log('_triggerCreateCaseViaLINK error', error)
            })
    }

    function _closeEmailCaseViaLINK(agentEmailAddress, caseId) {

        var odata = {
            "caseId": [],
            "contactId": "",
            "userType": "agent",
            "disposition": "1",
            "subdisposition": "1",
            "subsubdisposition": "0",
            "Remarks": $scope.dispoformRemarks || "CLOSED",
            "IntrRequestOrigin": null,
            "AgentEmailAddress": agentEmailAddress
        };
        odata.caseId.push(caseId);

        _closeEmailCaseInteraction(odata)
            .then((data) => {
                if (data) {
                    var _data = JSON.parse(data);
                    if (_data.Result == "Success") {
                        smartTALKNotificationSuccess('The case is marked as closed.');
                    }
                    else {
                        smartTALKNotificationError('Unable to close the case.');
                    }
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Unable to close the case");
                console.log('_closeEmailCaseInteraction error', error)
            })
    }

    function _updateEmailCaseViaLINK(agentEmailAddress, caseId) {
        var odata = {
            "caseids": caseId,
            "Status": "In-Progress",
            "sessionRequired": "T",
            "eventPerformerID": "",
            "ownerEmailID": "",
            "asignAgentEmailID": "",
            "UserEmail": agentEmailAddress
        };
        _updateEmailCaseInteraction(odata)
            .then((data) => {
                if (data) {
                    var _data = JSON.parse(data);
                    if (_data.Result == "Success") {
                        smartTALKNotificationSuccess('The case is marked as In-Progress.');
                    }
                    else {
                        smartTALKNotificationError('Unable to update the case.');
                    }
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Unable to update the case");
                console.log('_UpdateEmailCaseInteraction error', error)
            })
    }

    function _updateTicketDetails() {
        var odata = {
            CustomerName: "",
            MobileNumber: "",
            Emailid: "",
            TicketNo: "",
            DispCode: "",
            SubDispCode: "",
            Status: ""
        };

        _updateTicketInfo(odata)
            .then((data) => {
                if (data) {
                    var _data = JSON.parse(data);
                    if (_data.Result == "Success") {
                        smartTALKNotificationSuccess('Ticket info pushed to CRM.');
                    }
                    else {
                        smartTALKNotificationError('Unable to push ticket info.');
                    }
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Unable to push ticket info.");
                console.log('_updateTicketDetails error', error)
            })
    }

    $scope.previewEmailAttachment = function (oAttachmentUrlInfo) {
        $('#EmailAttachmentModal').modal('show');
        var _url = '';
        var IsPreviewAllowed = false;
        var applicationBaseType = '';
        var applicationType = '';

        if (oAttachmentUrlInfo.oBlobURL) {
            applicationBaseType = oAttachmentUrlInfo.FileType.split('/')[0];
            applicationType = oAttachmentUrlInfo.FileType.split('/')[1];

            IsPreviewAllowed = IsEmailAttachmentPreviewAllowed(applicationBaseType, applicationType);
            _url = (IsPreviewAllowed) ? oAttachmentUrlInfo.oBlobURL : '';

            _ViewEmailAttachmentPreview(IsPreviewAllowed, _url);
        }
        else {
            _url = oAttachmentUrlInfo.link;

            fetch(_url).then(function (response) {
                return response.blob();
            }).then(function (myBlob) {
                if (myBlob && myBlob.type) {
                    applicationBaseType = myBlob.type.split('/')[0];
                    applicationType = myBlob.type.split('/')[1];

                    IsPreviewAllowed = IsEmailAttachmentPreviewAllowed(applicationBaseType, applicationType);
                    var objectURL = (IsPreviewAllowed) ? URL.createObjectURL(myBlob) : '';

                    _ViewEmailAttachmentPreview(IsPreviewAllowed, objectURL);
                }
            }).catch((error) => {
                smartTALKNotificationError("Unable to show the email preview.");
                _closeEmaillAttachmentPreviewModal();
            });
        }
    }

    $scope.MakeEmailAttachmentOutOfURL = function () {
        var oURLObj = [];
		let req = [];
        for (let [index, val] of $scope.EmailAttachments.entries()) {
            var _url = '';
            _url = $scope.EmailAttachments[index].link;

			$.when(requestToStoreEmailAttachmentOnServer(val)).done(function(data_1) {
				console.log('called: ', index);
				console.log(data_1);
				// $scope.UploadEmailAttachments = $scope.UploadEmailAttachmentsForForward;
			});
        }
    }

	function requestToStoreEmailAttachmentOnServer(data) {
		console.log(data);
		$.ajax({
			url: data.link,
			cache: false,
			xhrFields: {
				responseType: 'blob'
			},
			success: function (blob) {
				let objectURL = URL.createObjectURL(blob);
				//make unique name
				let UploadEmailAttachmentsCount = ($scope.UploadEmailAttachments.length == 0) ? 0 : $scope.UploadEmailAttachments.length - 1;
				let j = ($scope.UploadEmailAttachments.length == 0) ? 0 : parseInt($scope.UploadEmailAttachments[UploadEmailAttachmentsCount].AttachFileKey.split("|")[2]) + 1;
				let AttachFileKey = "Attachment" + "|" + "1" + "|" + j + "|" + $scope.hdsessionId;
				let IsDataDuplicate = $.grep($scope.UploadEmailAttachments, function (obj) { return obj.Url === data.link; });

				if (IsDataDuplicate.length == 0) {
					let oURLInfo = {
						"Url": data.link,
						"AttachFileKey": AttachFileKey,
						"AttachSaveName": $("#hdnAgentSessionId").val() + "1_" + data.filename + "." + data.ext,
						"CESessionId": $scope.hdsessionId,
						"CategoryID": "1",
						"FileName": data.filename + "." + data.ext,
						"FileType": blob.type,
						"oBlobURL": objectURL,
						"oFormattedFileSize": bytesToSize(blob.size),
						"Size": blob.size
					}

					let fileExtension = blob.type.split('/')[1];
					fileExtension = blob.type.split('/')[1] == 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' ?  'xlsx' : fileExtension;
					fileExtension = blob.type.split('/')[1] == 'vnd.openxmlformats-officedocument.wordprocessingml.document' ?  'docx' : fileExtension;
					fileExtension = blob.type.split('/')[1] == 'vnd.ms-excel' ?  'xls' : fileExtension;
					fileExtension = blob.type.split('/')[1] == 'vnd.ms-powerpoint' ?  'ppt' : fileExtension;
					fileExtension = blob.type.split('/')[1] == 'vnd.openxmlformats-officedocument.presentationml.presentation' ?  'pptx' : fileExtension;

					let objForwardAttachmentFiles = {
						Url: data.link,
						FileName: $("#hdnAgentSessionId").val() + "1_" + data.filename,
						Fileextn: data.ext == 'jpg' ? data.ext : fileExtension,
					};
					_ForwardEmailAttachToTemp(objForwardAttachmentFiles);
					$.when(forwardEmailAttachmentToNetwork(objForwardAttachmentFiles.Url, objForwardAttachmentFiles.FileName, objForwardAttachmentFiles.Fileextn, $("#hdnAgentSessionId").val())).done(function(d){
						oURLInfo.Url = d;
                        $scope.UploadEmailAttachmentsForForward.push(oURLInfo);
    					return $scope.UploadEmailAttachments = $scope.UploadEmailAttachmentsForForward;
                    })
				}
			},
			error: function (e) {
				return e;
			}
		});
	}

    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0)
            return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    };

    $scope.removeEmailAttachment = function (oAttachmentUrlInfo) {

        //#region to remove attachments from array
        arrTotalEmailAttachment = arrTotalEmailAttachment.filter(function (value, index, arr) {
            return value.FileName != oAttachmentUrlInfo.FileName;
        });
        TotalEmailAttachmentSize = funCalcTotalEmailSize(arrTotalEmailAttachment);
        TotalEmailAttachmentSize = TotalEmailAttachmentSize + ((new Blob([$scope.editorModel]).size == 0) ? 0 : new Blob([$scope.editorModel]).size);
        //#endregion

        //TODO : delete actual physical file from directory.
        console.log('removeEmailAttachment', oAttachmentUrlInfo)
        $scope.UploadEmailAttachments = removeArrayElementByAttr($scope.UploadEmailAttachments, 'AttachSaveName', oAttachmentUrlInfo.AttachSaveName);

        _broadcastDeleteDisposeEmailAttachment('delete', $scope.hdsessionId, null, oAttachmentUrlInfo);
    }

    function _ViewEmailAttachmentPreview(IsPreviewAllowed, url) {
        if (IsPreviewAllowed) {
            document.getElementById('iframeEmailAttachmentPreview').src = url;
        }
        else {
            smartTALKNotificationError('Email preview is not supported in this case.');
            _closeEmaillAttachmentPreviewModal();
        }
    }

    $scope.loadEmailTemplate = function () {
        var odata = {
            "AgentEmailAddress": $scope.AgentPrerequisiteData.AgentEmailId
        };

        _getEmailTemplate(odata)
            .then((data) => {
                if (data) {
                    var _data = JSON.parse(data);
                    if (_data.Result == "Success") {
                        $scope.smartTALKAgentEmailTemplateList = _data;
                        $scope.smartTALKAgentEmailTemplateList = $scope.smartTALKAgentEmailTemplateList.data;
                    }
                    else {
                        smartTALKNotificationError('Unable to load the email templates.');
                    }
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Unable to load the email templates");
                console.log('loadEmailTemplate error', error);
            })

        
        //$scope.smartTALKAgentEmailTemplateList = $scope.smartTALKAgentEmailTemplateList.data;
    }
    //#endregion    

    $scope.InteractionFilter = {
        ActiveChannel: 'ALL',
        ActiveFilterType: 'ActiveInteractions',
        FilterText: ''
    };

    //Fills Agent Login Info here for first time.
    $scope.replaceEmailContact = function (text) {
        if (text) {
            text = text.replace(/\&amp;/g, '&');
            text = text.replace(/\&gt;/g, '>');
            text = text.replace(/\&lt;/g, '<');
            text = text.replace(/\&quot;/g, '"');
            text = text.replace(/\&apos;/g, '\'');
        }
        return $sce.trustAsHtml(text);
    }

    //logic for parked interaction start and end date (jay)
    $scope.ParkedInteractionStartDate = formatParkedInteractionStartDate(new Date());
    $scope.ParkedInteractionEndDate = formatParkedInteractionEndDate($scope.ParkedInteractionStartDate);
    function formatParkedInteractionStartDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }

    function formatParkedInteractionEndDate(Enddate) {
        var tt = Enddate;
        var date = new Date(tt);
        var newdate = new Date(date);
        newdate.setDate(newdate.getDate() + 2);
        var dd = newdate.getDate();
        var mm = newdate.getMonth() + 1;
        var y = newdate.getFullYear();
        var someFormattedDate = y + '/' + mm + '/' + dd;
        return someFormattedDate;
    }

    function AddMinToDateWhileParkingInteraction() {
        let autoPark = $scope.AutoParkInteraction.filter(obj => obj.Key.toUpperCase() == $scope.ddlEmailCaseStatus.selected.EmailCaseStatusName.toUpperCase() && obj.IsDisplayed);
        let interval = (autoPark.length > 0) ? autoPark[0].ParkInterval : 30;

        var currentDate = new Date();
        var d = new Date(currentDate.getTime() + parseInt(interval) * 60000);
        month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        var futuredate = [year, month, day].join('-') + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        return futuredate;
    }
    // end

    LoadForm();

    //#region Agent Pre/Post Date Selection Validation Operation Start
    try {
        $scope.DatecheckErr = function (startDate, endDate) {
            $scope.DateerrMessage = '';
            $scope.smartTALKCustomerHistorydetailsList = [];
            $scope.oCustomerChatHistoryResponseMSG = [];

            var curDate = new Date();
            if (new Date(startDate) > curDate) {
                smartTALKNotificationError('From date can\'t be greater than today\'s date.');
                return false;
            }
            if (new Date(endDate) > curDate) {
                smartTALKNotificationError('To date can\'t be greater than today\'s date.');
                return false;
            }
            if (new Date(startDate) > new Date(endDate)) {
                smartTALKNotificationError('To date can\'t be smaller than from date.');
                return false;
            }
            return true;
        };
    } catch (e) {
        console.log('DatecheckErr() function catch error.');
    }
    //#endregion

    //#region Agent WrapForm URL Generation Operation Start    
    function getwrapformq(varkey) {
        var output = "";
        $.each($scope.smartTALKCustomerDetailsList, function (k, l) {
            if (l.Key == varkey) {
                output = l.Value;
                return false;
            }
        });
        return output;
    }
    $scope.smartTALKWRAPEFROMURL = function (url) {
        try {
            if (url != "") {
                if ($scope.CloseChat) {
                    $("#iframewrapform").hide();
                } else {
                    $("#iframewrapform").show();
                }
                url = url.replace("$AGENTID$", $scope.AGENTID + "&");
                url = url.replace("$SESSIONID$", $scope.hdsessionId + "&");
                url = url.replace("$PHONENO$", $scope.hdPhoneNo);
                if (PassTowrapform != "") {
                    $.each(PassTowrapform, function (key, value) {
                        $.each(value, function (key, value) {
                            var k = getwrapformq(key);
                            url = url + "&" + value + "=" + k + "";
                        });
                    });
                }
                $scope.WRAPEFROMURLIFRAME = $sce.trustAsResourceUrl(url);

                var iframe = document.getElementById('iframewrapform');
                iframe.src = url;
                $('#wrapFormLoadIndicator').hide();
            } else {
                console.log('WrapForm URL is empty');
            }
        } catch (e) {
            console.log('catch error while generating WrapForm URL', e);
        }
    }
    //#endregion

    //copy my chat history trasncript
    $scope.copytranscript = function () {

        var str = '';
        for (var key in $scope.smartTALKChatList) {
            if ($scope.smartTALKChatList[key].TYPE.toUpperCase() == 'SYSTEM' ||
                $scope.smartTALKChatList[key].TYPE.toUpperCase() == 'AGENT' ||
                $scope.smartTALKChatList[key].TYPE.toUpperCase() == 'CUSTOMER') {

                str = str + $scope.smartTALKChatList[key].TYPE.toUpperCase() + " : (" +
                    $scope.smartTALKChatList[key].TIME + ") : " +
                    $scope.smartTALKChatList[key].MSG.toUpperCase() + " <br/> ";
            }
        }

        str = str.replace(/<br\s*[\/]?>/gi, "\n");
        str = str.replace(/&GT;/g, "");
        str = str.replace(/&LT;/g, "");
        str = str.replace(/BR\//g, "");

        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = str;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = { position: 'absolute', left: '-9999px' };
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);
        smartTALKNotificationSuccess('Transcript copied to clipboard.');
    }
    //

    //#region Agent Tab Select/De-Select Operation Start

    //Set initial value for tab    
    $scope.activeTabID = 'newchattab';
    //$scope.activeTabID = 'cinfotab';
    //Check for tab selection
    $scope.IsTabSelected = function (tabID) {
        if ($scope.activeTabID === tabID) {
            $scope.ToggleFlag = $scope.activeTabID;
            if ($('#chatheader').attr('class') == 'col-sm-7 col-md-7 col-xs-12 scrollerright outerdiv no-padding') {
                $('#' + tabID).addClass('r-tabs-state-active');
            }
            else {
                $('#' + tabID).removeClass('r-tabs-state-active');
                $('#newchattab').addClass('r-tabs-state-active');
            }

            return true;
        }
        else {
            $('#' + tabID).removeClass('r-tabs-state-active');
            return false;
        }
    }
    //hover last seen
    $scope.hoverIn = function () {
        this.lastseen = true;
    };

    $scope.hoverOut = function () {
        this.lastseen = false;
    };
    //
    //set selected tab ID
   $scope.setSelectedTab = function (tabID) {
        $scope.activeTabID = tabID;
        if (tabID === 'newchattab') {
            $('#chatheader').attr('class', 'col-sm-12 col-md-12 col-xs-12 scrollerright outerdiv');
            $('#uf-right-container').hide();
            $scope.HideChatTab = false;
        }
        else if (tabID === 'CoBrowsingTab') {
            $('#chatheader').attr('class', 'col-sm-12 col-md-12 col-xs-12 scrollerright outerdiv');
            $('#uf-right-container').hide();
            $scope.HideChatTab = true;
        }
        else if (tabID === 'GeneralTab') {
            $('#chatheader').attr('class', 'col-sm-12 col-md-12 col-xs-12 scrollerright outerdiv');
            $('#uf-right-container').hide();
            $scope.HideChatTab = true;
        }
        else if (tabID === 'LINKTab') {
            $('#chatheader').attr('class', 'col-sm-12 col-md-12 col-xs-12 scrollerright outerdiv');
            $('#uf-right-container').hide();
            $scope.HideChatTab = true;
        }
        else if (tabID === 'ccrmtab') {
            $('#chatheader').attr('class', 'col-sm-12 col-md-12 col-xs-12 scrollerright outerdiv');
            $('#uf-right-container').hide();
            $scope.HideChatTab = true;
        }
        else if (tabID === 'FSMTab') {
            $('#chatheader').attr('class', 'col-sm-12 col-md-12 col-xs-12 scrollerright outerdiv');
            $('#uf-right-container').hide();
            $scope.HideChatTab = true;
        }
        else if (tabID === 'KMTab') {
            $('#chatheader').attr('class', 'col-sm-12 col-md-12 col-xs-12 scrollerright outerdiv');
            $('#uf-right-container').hide();
            $scope.HideChatTab = true;
        }
        else if (tabID === 'cdashboardtab') {
            $('#chatheader').attr('class', 'col-sm-12 col-md-12 col-xs-12 scrollerright outerdiv');
            $('#uf-right-container').hide();
            $scope.HideChatTab = true;
            var src = clientConfig.SupervisorTabConfig.IsDashBoardDataUrl;
            src = src.replace('$$agentid$$', $scope.AGENTID)
            $("#adminiframeDashBoard").attr('src', src)
        }
        
        else {
            //toggle effect 16th feb 2021
            if ($scope.ToggleFlag == tabID) {
                if ($('#chatheader').attr('class') == 'col-sm-7 col-md-7 col-xs-12 scrollerright outerdiv no-padding') {
                    $('#chatheader').attr('class', 'col-sm-12 col-md-12 col-xs-12 scrollerright outerdiv');
                    $('#uf-right-container').hide();
                }
                else {
                    $('#chatheader').attr('class', 'col-sm-7 col-md-7 col-xs-12 scrollerright outerdiv no-padding');
                    $('#uf-right-container').show();
                }
            }
            else {
                if (tabID == '') {

                }
                else {
                    $('#chatheader').attr('class', 'col-sm-7 col-md-7 col-xs-12 scrollerright outerdiv no-padding');
                    $('#uf-right-container').show();
                }
            }
            //
            // ("tabID").on
            // if (($('#uf-right-container').is(':visible')))
            // $('#uf-right-container').toggle();
            $scope.HideChatTab = false;
        }

        if (tabID === 'cgrouptab' || tabID === 'cgrouptabUnread') {
            $scope.activeTabID = 'cgrouptab';
            $("#cgrouptabUnread").hide();

            $scope.IsTabSelected('cgrouptab');
            $("#cgrouptabUnreadCount").html('0');
            $("#cgrouptab").show();
            $('#cgrouptab').addClass("r-tabs-state-active");

            createCookie("cgrouptabUnreadCount", 0, 360);
        }
        else {
            $('#cgrouptab').removeClass("r-tabs-state-active");
        }

        if (tabID === 'FSMTab' || tabID === 'KMTab' || tabID === 'LINKTab' || tabID === 'SocialPresenceTab' || tabID === 'ccrmtab') {
            if (tabID == 'ccrmtab' && $scope.ActiveSessions != 0) { //crm authentication
                var agentID = '';
                $.ajax({
                    type: "POST",
                    url: "SmartAgent.aspx/GetAgentID",
                    data: "",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (json) {
                        try {
                            if (json == null) { }
                            else {
                                agentID = json;
                                $scope.agent_ID = agentID.d;
                                var Custemail = ($scope.smartTALKCustomerDetailsList.length > 0) ? $scope.smartTALKCustomerDetailsList[3].Value : '';
                                Custemail = Custemail;
                                var mobileNo = ($scope.smartTALKCustomerDetailsList.length > 0) ? $scope.smartTALKCustomerDetailsList[2].Value : '';
                                var iframe = $("#iframecrm").attr("src", $(this).attr("href"));
                                iframe = $scope.CRMTabConfig.CRMLinkDataURL;
                                iframe = iframe.replace("$user$", Custemail);

                                if (tenantid == 46) { // specific to hutch    
                                    var pattern = /\d{9}$/gm
                                    var mobileNo = pattern.exec(mobileNo);
                                    mobileNo = 0 + mobileNo;
                                }

                                iframe = iframe.replace("$CustomerAttribute2$", mobileNo);
                                iframe = iframe.replace("$queuename$", agentID.d);
                                iframe = iframe.replace("$$AGENTID$$", agentID.d);
                                iframe = iframe.replace("$sessionid$", $scope.hdsessionId);
                                var res = $scope.hdsessionId.split("|");
                                iframe = iframe.replace("$UID$", res[0]);

                                $('#iframecrm').attr('src', iframe);
                            }
                        }
                        catch (e) {
                            //
                        }
                    }, error: function (xhr, ajaxOptions, thrownError) { console.log('GetAgentID() error', xhr); }
                });
            }
            if (tabID == 'LINKTab') {
                var iframe = $("#iframeLINK").attr("src", $(this).attr("href"));
                if (iframe != clientConfig.LINKLinkLoginURL) {

                }
                else {
                    if ($scope.LINKTab) {
                        //_setLinkAutoLoginURL();
                    }
                }
            }
        }
        if (tabID == 'coutboundtab') {

            //var table = $('#HSMTemplateTable').DataTable({
            //    //Number of rows
            //    fixedHeader: { header: true },
            //    "paging": true,
            //});

            //dTable = $('#HSMTemplateTable')
            //dTable.DataTable();


            //$scope.dataTableOpt = {
            //    //custom datatable options 
            //    // or load data through ajax call also
            //    "aLengthMenu": [[10, 50, 100, -1], [10, 50, 100, 'All']],
            //};

            $("#outboundContent").click();
        }

        if (tabID === 'chistorytab') {
            $("#tabs").find('a')[0].click();
        }
        if (tabID === 'cmessagestab') {
            bindCanMessage($scope.selectedTranslation.LanguageCode, $('#hdnAgentProcessId').val());
            BindAgentCanmessage($scope.selectedTranslation.LanguageCode);
            $("#CannedMsgSubTabs").find('a')[0].click();
        }
        if (tabID === 'csupervisortab') {
            setTimeout(function () {
                $("#supervisor_nav").click();
            }, 99);

        }
    }

    $scope.ToggleChatToCoBrowse = function () {
        $scope.ShowCoBrowseTab = true;
    }

    //Trigger the default tab here.    
    //$scope.setSelectedTab('cinfotab');
    $scope.setSelectedTab('newchattab');
    //#endregion

    //#region Agent Color Theme Operation Start
    $scope.CssThemes = [{ id: 'icici', name: 'Dark Blue' }, { id: 'lightgreen', name: 'Light Green' }, { id: 'gray', name: 'Gray' }, { id: 'lightblue', name: 'Light Blue' }, { id: 'blue', name: 'Blue' }, { id: 'green', name: 'Green' }, { id: 'orange', name: 'Orange' }, { id: 'purple', name: 'Purple' }, { id: 'red', name: 'Red' }];
    var agentCurrentTheme = _getAgentCurrentTheme();
    if (agentCurrentTheme) {
        $scope.SelectedCssTheme = JSON.parse(agentCurrentTheme);
    }
    else {
        $scope.SelectedCssTheme = $scope.CssThemes[0];
    }
    $scope.OnThemeChange = function (selectedCssTheme) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem('agentCurrentTheme', JSON.stringify(selectedCssTheme));
        }
        else {
            console.log('agentCurrentTheme local storage cannot applied');
        }
    };
    function _getAgentCurrentTheme() {
        if (typeof (Storage) !== "undefined") {
            return localStorage.getItem('agentCurrentTheme');
        }
        else {
            console.log('agentCurrentTheme local storage cannot read');
        }
    }
    //#endregion

    //#region Agent Parking Operation Start

    //-----parked interaction scope declaration.-----
    $scope.chkIsInteractionParked = false;
    $scope.parkFromDate = getCurrentDateInMMDDYYY();
    $scope.parkToDate = getCurrentDateInMMDDYYY();
    $scope.smartTALKCustomerParkHistoryList = [];
    $scope.smartTALKCustomerParkHistoryListForSupervisor = [];
    $scope.smartTALKCustomerParkChannels = [];
    $scope.smartTALKAgentList = [];
    $scope.funsmartTALKCustomerParkHistoryList = funsmartTALKCustomerParkHistoryList;
    $scope.funsmartTALKCustomerParkHistoryListForSupervisor = funsmartTALKCustomerParkHistoryListForSupervisor;
    $scope.funsmartTALKCustomerParkChannels = funsmartTALKCustomerParkChannels;
    $scope.funsmartTALKAgentList = funsmartTALKAgentList;
    $scope.GetParkInteraction = GetParkInteraction;
    $scope.funfillParkingHistoery = funfillParkingHistoery;
    $scope.funfillParkingHistoerySuperviser = funfillParkingHistoerySuperviser;
    $scope.funGetChannel = funGetChannel;
    $scope.funGetAgentList = funGetAgentList;
    //-----parked interaction disposition scope declaration start.-----
    $scope.dateParkedinteraction = '';
    $scope.dispoformParkedinteractionRemarks = '';
    $scope.ddlParkInteractionChannels = [{ id: '0', name: 'Select Park Channel' }, { id: 'WHATSAPP', name: 'Whatsapp' }, { id: 'TWITTERDM', name: 'Twitter DM' }, { id: 'FBCHAT', name: 'Facebook DM' }, { id: 'TELEGRAM', name: 'Telegram' }];
    $scope.ddlSelectedParkInteractionChannel = $scope.ddlParkInteractionChannels[0];
    $scope.parkInteractionChannelValue = '';
    $scope.smartTALKParkedinteractionDisposeCoustomer = smartTALKParkedinteractionDisposeCoustomer;
    //-----parked interaction disposition scope declaration end.-----//

    //ddl list for oubound in
    $scope.ddlmanualoutbound = [{ id: 'MISSEDINTERACTION', name: 'MISSEDINTERACTION' }, { id: '0', name: 'All' }, { id: 'OVERRULED', name: 'Overruled' }, { id: 'ABANDONED', name: 'Abandoned' }, { id: 'OFFLINE', name: 'Offline' }];
    $scope.ddlselectedmanualoutbound = $scope.ddlmanualoutbound[0];

    $scope.ddlHSMoutbound = [{ id: 'Self', name: 'Self' }, { id: 'All', name: 'All' }];
    $scope.ddlselectedHSMoutbound = $scope.ddlHSMoutbound[0];

    //-----park methods.-----
    var oParkingRQ = {
        PhoneNo: '',
        SessionId: '',
        Remark: '',
        ParkScheduleDtTm: '',
        ActiveCustName: '',
        parkedInteractionChannelType: '',
        parkedInteractionChannelValue: '',
        Disposition: '',
        SubDisposition: '',
        SubSubDisposition: ''
    };

    $scope.checkAll = function (chkStatus) {
        $scope.selectedAll = chkStatus;
        angular.forEach($scope.smartTALKCustomerParkHistoryListForSupervisor, function (smartTALKCustomerParkHistoryListForSupervisor) {
            smartTALKCustomerParkHistoryListForSupervisor.Selected = $scope.selectedAll;
        });
    };
    function funsmartTALKCustomerParkHistoryList(data) {
        $scope.smartTALKCustomerParkHistoryList = [];
        $scope.smartTALKCustomerParkHistoryList = data;
    }
    function funsmartTALKCustomerParkHistoryListForSupervisor(data) {
        $scope.smartTALKCustomerParkHistoryListForSupervisor = [];
        $scope.smartTALKCustomerParkHistoryListForSupervisor = data;
    }
    function funsmartTALKCustomerParkChannels(data) {
        $scope.smartTALKCustomerParkChannels = [];
        $scope.smartTALKCustomerParkChannels = data;
    }
    function funsmartTALKAgentList(data) {
        $scope.smartTALKAgentList = [];
        $scope.smartTALKAgentList = data;
    }
    function GetParkInteraction() {
        GetParkingHistoeryForSuperviser();
    }
    function funfillParkingHistoery() {
        GetParkingHistoery();
    }
    function funfillParkingHistoerySuperviser() {
        GetParkingHistoeryForSuperviser();
    }
    function funGetChannel() {
        GetChannel();
    }
    function funGetAgentList() {
        GetAgentList();
    }
    //#region to check HSM onlione hours 
    function _CheckOfflineHoursForParking(agentProcessId, dformat) {
        try {
            //#region
            //Number.prototype.padLeft = function (base, chr) { // method to get real time date in yyyy-MM-dd HH:MM:SS format
            //    var len = (String(base || 10).length - String(this).length) + 1;
            //    return len > 0 ? new Array(len).join(chr || '0') + this : this;
            //};
            //var d = new Date,
            //    dformat = [d.getFullYear().padLeft(),
            //    (d.getMonth() + 1).padLeft(),
            //    d.getDate().padLeft("0")].join('-') +
            //        ' ' +
            //        [d.getHours().padLeft(),
            //        d.getMinutes().padLeft(),
            //        d.getSeconds().padLeft()].join(':');
            //#endregion
            $.ajax({
                type: "POST",
                url: "SmartAgent.aspx/CheckOfflineHoursForParking",
                data: JSON.stringify({ processID: agentProcessId, dateTime: dformat, Channel: $scope.hdCHANNELID, languageCode: 'EN' }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (data) {
                    localStorage.setItem("OfflineHoursForParking", JSON.parse(data.d)[0].status);
                },
                error: function (xhr) {
                    console.log('_CheckOfflineHoursForParking() error xhr : ', xhr);
                },
                failure: function (response) {
                    console.log('_CheckOfflineHoursForParking() failure response : ', response);
                }
            });
        } catch (e) {
            console.log('_CheckOfflineHoursForParking() catch error');
        }
    }
    //#endregion
    //-----parked interaction disposition methods.-----
    function smartTALKParkedinteractionDisposeCoustomer() {
        //_CheckOfflineHoursForParking($('#hdnAgentProcessId').val(), $scope.dateParkedinteraction);

        //if (localStorage.getItem("OfflineHoursForParking") == 0) {  // 0 >> offline & 1 >> online
        //    smartTALKNotificationError("The parked time should not be exceeding online hours.");
        //    return;
        //}

        var selectedParkedInteractionDtTm = $scope.dateParkedinteraction;
        var selectedParkedInteractionChannelType = $scope.ddlSelectedParkInteractionChannel.id;
        var selectedParkedInteractionChannelValue = $scope.parkInteractionChannelValue;
        var selectedParkedInteractionRemarks = $scope.dispoformParkedinteractionRemarks;

        $scope.ddlWorkFlowValidate = false;
        $scope.dispoformBotRemarksValidate = false;

        // if (selectedParkedInteractionRemarks.trim() == "" || selectedParkedInteractionChannelValue == "" || selectedParkedInteractionChannelType == "" || selectedParkedInteractionDtTm == "") {
        if (selectedParkedInteractionRemarks.trim() == "" || selectedParkedInteractionDtTm == "") {
            $scope.dispoformBotRemarksValidate = true;
            smartTALKNotificationError("All fields are mandatory.");
            return;
        }

        var parkingRQ = _setParkingRQParams($scope.hdPhoneNo, $scope.hdsessionId, selectedParkedInteractionRemarks, selectedParkedInteractionDtTm, $scope.ActiveCustName, selectedParkedInteractionChannelType, selectedParkedInteractionChannelValue, '', '', '');
        ActivesmartParkedinteraction(parkingRQ);
        _clearParkedInteractionDispositionForm();
    }
    function _clearParkedInteractionDispositionForm() {
        $scope.dateParkedinteraction = "";
        $scope.parkInteractionChannelValue = "";
        $scope.dispoformParkedinteractionRemarks = "";
        $scope.ddlSelectedParkInteractionChannel = $scope.ddlParkInteractionChannels[0];
    }

    $scope.chkIsInteractionParkedChange = function () {
        if ($scope.chkIsInteractionParked) {
        }
        else {
            $scope.dateParkedinteraction = '';
        }
    }

    function _setParkingRQParams(phoneNo, sessionId, remark, parkScheduleDtTm, activeCustName, parkedChannelType, parkedChannelValue, disposition, subDisposition, subSubDisposition) {
        oParkingRQ.PhoneNo = phoneNo;
        oParkingRQ.SessionId = sessionId;
        oParkingRQ.Remark = remark;
        oParkingRQ.ParkScheduleDtTm = parkScheduleDtTm;
        oParkingRQ.ActiveCustName = activeCustName;
        oParkingRQ.parkedInteractionChannelType = parkedChannelType;
        oParkingRQ.parkedInteractionChannelValue = parkedChannelValue;
        oParkingRQ.Disposition = disposition;
        oParkingRQ.SubDisposition = subDisposition;
        oParkingRQ.SubSubDisposition = subSubDisposition;
        return oParkingRQ;
    }

    //----Parked interaction load data call.[Uncomment to fill dropdown and load data on page load]-----
    //GetParkingHistoery();
    //funGetChannel();
    //funGetAgentList();
    //GetParkingHistoeryForSuperviser();

    //#endregion

    //#region Agent Customer Chat History Operation Start
    $scope.CUSTOMERATTRIBUTE = "";
    $scope.CUSTOMERATTRIBUTEVALUE = "";
    $scope.smartTALKCustomerHistorydetailsList = [];
    $scope.RchatFromDate = getCurrentDateInMMDDYYY();
    $scope.RchatToDate = getCurrentDateInMMDDYYY();
    $scope.ParsedStartDate = $filter('date')(new Date(new Date(new Date().setDate(new Date().getDate() - 7))), 'MM/dd/yyyy');
    $scope.ParsedEndDate = $filter('date')(new Date(), 'MM/dd/yyyy');

    $scope.ddlCustomerHistoryChannels = [];
    $scope.ddlSelectedCustomerHistoryChannel = {};

    $scope.updateddlSelectedCustomerHistoryChannel = function myfunction(value) {
        $scope.ddlSelectedCustomerHistoryChannel = value;
        //set transcript to blank
        $scope.smartTALKCustomerHistorydetailsList = [];
        $scope.oCustomerChatHistoryResponseMSG = [];
    }

    $scope.smartTALKGetActiveCustRecentChat = smartTALKGetActiveCustRecentChat;
    function smartTALKGetActiveCustRecentChat() {
        var ddlchannel = $scope.ddlSelectedCustomerHistoryChannel;
        ddlchannel = ddlchannel.id;
        if ($scope.DatecheckErr($scope.RchatFromDate, $scope.RchatToDate)) {
            $scope.Selected_Recent_Chat = 0;
            if ($scope.hdCHANNELID === 'FB' || $scope.hdCHANNELID === 'TWITTER' || $scope.hdCHANNELID === 'FBCHAT' || $scope.hdCHANNELID === 'TWITTERDM'
                || $scope.hdCHANNELID === 'INSTAGRAMPOST' || $scope.hdCHANNELID === 'VOICE') {
                getCustomerJourney($scope.hdsessionId, $scope.CUSTOMERATTRIBUTE, $scope.CUSTOMERATTRIBUTEVALUE, ddlchannel);
            }
            else if ($scope.hdCHANNELID === 'CRAWL') {
                var obj = $.grep($scope.smartTALKCustomerDetailsList, function (obj) { return obj.Key === 'CUSTOMERATTRIBUTE7'; })[0];
                getCustomerJourney($scope.hdsessionId, obj.Key, obj.Value, ddlchannel);
            }
            else {
                if ($scope.DynamicCustomerHistorySearchParams) {
                    var arrCustomerAttributeName = [];
                    var arrCustomerAttributeVal = [];
                    $.each($scope.DynamicCustomerHistorySearchParams, function (index, value) {
                        arrCustomerAttributeName.push(value.CustomerAttributeKey);
                        arrCustomerAttributeVal.push(value.CustomerAttributeValue);
                    });
                    $scope.CUSTOMERATTRIBUTE = arrCustomerAttributeName.join("^");
                    $scope.CUSTOMERATTRIBUTEVALUE = arrCustomerAttributeVal.join("^");

                    var datefilter = $filter('date');
                    let fromDate = datefilter(new Date($scope.RchatFromDate), 'yyyy-MM-dd');
                    let toDate = datefilter(new Date($scope.RchatToDate), 'yyyy-MM-dd');

                    getCustomerJourney($scope.hdsessionId, $scope.CUSTOMERATTRIBUTE, $scope.CUSTOMERATTRIBUTEVALUE, ddlchannel, fromDate, toDate);
                }
            }
        }
    }

    function getCustomerJourney(hdsessionId, customerAttributeKey, customerAttributeValue, channel, fromDate, toDate) {
        GetActiveCustRecentChat(hdsessionId, customerAttributeKey, customerAttributeValue, channel, fromDate, toDate)
            .then((data) => {
                if (data && data.d) {
                    var _data = JSON.parse(data.d);
                    $scope.smartTALKCustomerHistory(_data);
                }
                else {
                    $scope.smartTALKCustomerHistoryList = [];
                    smartTALKNotificationError("There is no previous interaction found for the mentioned dates.");
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Unable to process your request to fetch the customer journey.");
                console.log('getCustomerJourney error', error)
            })
            .finally(() => {
                //clean up.
            });
    }

    $scope.smartTALKCustomerHistory = smartTALKCustomerHistory;
    function smartTALKCustomerHistory(data) {
        $scope.smartTALKCustomerHistoryList = [];
        $scope.smartTALKCustomerHistorydetailsList = [];
        $scope.oCustomerChatHistoryResponseMSG = [];
        $scope.smartTALKCustomerHistoryList = data;
        try {
            if (data.length != 0) {
                //--Kirti : This is commented to avoid showing transcript pre selected, when hidden by filters.--//
                //Get_Recent_Chat_Transcript(data[0].ID)
                //$scope.Selected_Recent_Chat = data[0].ID;                
                var customerHistFirstRecordDtTm = data[data.length - 1].SESSIONSTARTTIME;
                $scope.RchatFromDate = $filter('date')(new Date(customerHistFirstRecordDtTm), 'MM/dd/yyyy');
                smartTALKNotificationSuccess('Total ' + data.length + ' records found ' + 'from ' + $scope.RchatFromDate);
            }
        } catch (e) { }
    }

    $scope.smartTALKCustomerHistoryclick = smartTALKCustomerHistoryclick;
    var lastActivePanelScope;
    function smartTALKCustomerHistoryclick(id) {
        //Now not used , we implemented toggle
    }

    $(document).on("click", ".myaccordionCustHist", function () {
        var id = $(this).attr("id").split("_")[1];
        var emailCaseId = $(this).attr("data-email-case") || '';

        if (emailCaseId && $scope.hdCHANNELID == 'EMAIL') {
            triggerGetEmailInteractionDetails(emailCaseId);
        }
        else {
            _fetchCustomerJourneyTranscript(id)
                .then((data) => {
                    if (data && data.d) {
                        $scope.smartTALKCustomerHistorydetails(JSON.parse(data.d));
                    }
                    else {
                        $scope.smartTALKCustomerHistorydetailsList = [];
                    }
                })
                .catch((error) => {
                    smartTALKNotificationError("Unable to load the transcript.");
                    console.log('_fetchCustomerJourneyTranscript error', error)
                });

            $scope.EmailInteractionTranscript.IsAvailable = false;
            $scope.EmailInteractionTranscript.TranscriptDetails = [];
        }
        $scope.Selected_Recent_Chat = id;

        if (!$('.chathist-sidebar').hasClass('chathist-active')) {
            $('.chathist-sidebar').addClass('chathist-active');
            $('.chathist-sidebarBtn').toggleClass('toggle');
            // $(this).find('i').toggleClass('fa-chevron-left fa-chevron-right')
        }
    });

    $scope.smartTALKCustomerHistorydetails = smartTALKCustomerHistorydetails;
    function smartTALKCustomerHistorydetails(data) {
        $scope.smartTALKCustomerHistorydetailsList = [];
        $scope.smartTALKCustomerHistorydetailsList = data.Table;
        var CustomerChatHistoryResponseJsonMSG = {};
        $scope.oCustomerChatHistoryResponseMSG = [];
        $scope.Disposition = "";
        $scope.SubDisposition = "";
        $scope.Remarks = "";
    }
    //#endregion

    //#region Agent Custom Customer Chat History Operation Start
    $scope.customCustomerHistorySearch = { SearchConditions: [{ id: 'and', name: 'and' }, { id: 'or', name: 'or' }], SelectedSearchCondition: { id: null, name: null }, SelectedSearchPara1: [{ CUSTOMERATTRIBUTEKEY: '0', CUSTOMERATTRIBUTEVALUE: '0' }], SelectedSearchPara2: [{ CUSTOMERATTRIBUTEKEY: '0', CUSTOMERATTRIBUTEVALUE: '0' }], SelectedSearchVal1: '', SelectedSearchVal2: '', };
    $scope.onSearchConditionChange = function (oSelectedSearchConditions) {
        if (oSelectedSearchConditions) {
            $scope.customCustomerHistorySearch.SelectedSearchCondition = oSelectedSearchConditions;
        }
        else {
            $scope.customCustomerHistorySearch.SelectedSearchCondition = { id: null, name: null };
            $scope.customCustomerHistorySearch.SelectedSearchVal2 = ''
        }
    }
    $scope.smartTALKGetActiveCustRecentChatCustom = smartTALKGetActiveCustRecentChatCustom;
    function smartTALKGetActiveCustRecentChatCustom(oCustomCustomerHistorySearch) {
        $scope.Selected_Recent_Chat = 0;
        GetActiveCustRecentChatCustom($scope.hdsessionId, oCustomCustomerHistorySearch);
    }
    //#endregion

    //#region Agent My Chat History Operation Start
    $scope.smartTALKFilterMyChatHistoryList = [];
    $scope.smartTALKFilterMyChatHistoryBindDetailsList = [];

    //outbond in my chat history 12/11/19
    $scope.smartTALKFilterOutboundList = [];
    $scope.smartTALKFilterOutboundBindDetailsList = [];
    //

    //HSMtemplate in Outbound missed interaction 12/11/19
    //$scope.smartTALKHSMTemplateList = [];
    $scope.smartTALKFilterHSMTemplateLists = [];
    //

    $scope.ddlMyChatHistoryChannels = [];
    $scope.ddlSelectedMyChatHistoryChannel = {};

    $scope.updateddlSelectedMyChatHistoryChannel = function myfunction(value) {
        $scope.ddlSelectedMyChatHistoryChannel = value;
    }

    $scope.smartTALKFilterMyChatHistory = smartTALKFilterMyChatHistory;
    function smartTALKFilterMyChatHistory(staus) {
        if ($scope.DatecheckErr($scope.FromDate, $scope.ToDate)) {
            $scope.Selected_MyHistoery_Chat = 0;
            CustRecentChat.FROM_DATE = funDateformating($scope.FromDate);
            CustRecentChat.TO_DATE = funDateformating($scope.ToDate);
            CustRecentChat.CHANNELS = $scope.ddlSelectedMyChatHistoryChannel.id;
            CustRecentChat.SEARCH = staus;
            CustRecentChat.SUBJECT = $scope.txtMyChatHistorySubject;
            CustRecentChat.CUSTNAME = $scope.txtMyChatHistoryCustName;

            //to refresh cust history if searching after clearing the filter
            var arrCustomerAttributeName = [];
            var arrCustomerAttributeVal = [];
            let flag = '';
            $.each($scope.DynamicCustomerHistorySearchParams, function (index, value) {
                var customerAttributeValueIndex = parseInt(value.CustomerAttributeValueIdx);
                arrCustomerAttributeName.push(value.CustomerAttributeKey);
                arrCustomerAttributeVal.push(value.CustomerAttributeValue);

                flag = value.CustomerAttributeValue + flag;
                $scope.DynamicCustomerHistorySearchParams[index].CustomerAttributeValue = value.CustomerAttributeValue;
            });

            if (flag == '') {
                smartTALKFilterHSMTemplateList
                delete CustRecentChat.CUSTOMERATTRIBUTEKEY;
                delete CustRecentChat.CUSTOMERATTRIBUTEVALUE;
            }
            else {
                $scope.CUSTOMERATTRIBUTE = arrCustomerAttributeName.join("^");
                $scope.CUSTOMERATTRIBUTEVALUE = arrCustomerAttributeVal.join("^");
                //CustRecentChat.CUSTOMERATTRIBUTEKEY = $scope.CUSTOMERATTRIBUTE;
                //CustRecentChat.CUSTOMERATTRIBUTEVALUE = $scope.CUSTOMERATTRIBUTEVALUE;

                //Kirti : Passing it blank to return all the data as NEw UI doesn't have filters.
                CustRecentChat.CUSTOMERATTRIBUTEKEY = '';
                CustRecentChat.CUSTOMERATTRIBUTEVALUE = '';

                if ($scope.DynamicCustomerHistorySearchParams[1].CustomerAttributeValue == '' && $scope.DynamicCustomerHistorySearchParams[0].CustomerAttributeValue == '') {
                    CustRecentChat.CUSTOMERATTRIBUTEVALUE = '';
                }
            }

            GetAgentCustRecentChat();
        }
    }


    //HSMTemplate list
    $scope.smartTALKFilterHSMTemplateList = smartTALKFilterHSMTemplateList;
    function smartTALKFilterHSMTemplateList(staus) {
        CustRecentChat = {};
        if ($scope.DatecheckErr($scope.FromDate, $scope.ToDate)) {
            $scope.Selected_MyHistoery_Chat = 0;
            CustRecentChat.FROM_DATE = funDateformating($scope.FromDate);
            CustRecentChat.TO_DATE = funDateformating($scope.ToDate);
            CustRecentChat.CHANNELS = $scope.ddlselectedHSMoutbound.name;
            CustRecentChat.SEARCH = staus;
            CustRecentChat.processID = $('#hdnAgentProcessId').val();
            CustRecentChat.CUSTOMERATTRIBUTEKEY = $scope.CUSTOMERATTRIBUTE;
            CustRecentChat.CUSTOMERATTRIBUTEVALUE = $scope.CUSTOMERATTRIBUTEVALUE;
            GetAgentHSMTemplateList();
        }
    }
    //end

    //Outbound for my chat history
    $scope.smartTALKFilterOutbound = smartTALKFilterMyOutbound;
    function smartTALKFilterMyOutbound(staus) {
        if ($scope.DatecheckErr($scope.FromDate, $scope.ToDate)) {
            $scope.Selected_MyHistoery_Chat = 0;
            CustRecentChat.FROM_DATE = funDateformating($scope.FromDate);
            CustRecentChat.TO_DATE = funDateformating($scope.ToDate);
            CustRecentChat.CHANNELS = $scope.ddlSelectedMyChatHistoryChannel.id;
            CustRecentChat.SEARCH = staus;
            CustRecentChat.OUTBOUNDCHANNELS = $scope.ddlselectedmanualoutbound.id;
            CustRecentChat.CUSTOMERATTRIBUTEKEY = $scope.CUSTOMERATTRIBUTE;
            CustRecentChat.CUSTOMERATTRIBUTEVALUE = $scope.CUSTOMERATTRIBUTEVALUE;
            GetAgentCustRecentChatWithOutbound();
        }
    }

    //

    $scope.smartTALKFilterMyChatHistoryBind = smartTALKFilterMyChatHistoryBind;
    function smartTALKFilterMyChatHistoryBind(data) {
        $scope.smartTALKFilterMyChatHistoryList = [];
        $scope.smartTALKFilterOutboundBindDetailsList = [];
        $scope.oMyChatHistoryResponseMSG = [];
        $scope.smartTALKFilterMyChatHistoryList = data;
        if (data.length != 0) {
            //smartTALKNotificationError('Total ' + data.length + ' records Found');
        }
        try {
            var id = "";
            id = data[0].ID;
        } catch (e) { }
        //Kirti : This is commented to avoid showing transcript pre selected
        //smartTALKFilterMyChatHistoryClick(id);
    }

    //outbound for my chat history
    $scope.smartTALKFilterMOutboundBind = smartTALKFilterOutboundList;
    function smartTALKFilterOutboundList(data) {
        $scope.smartTALKFilterOutboundList = [];
        $scope.smartTALKFilterOutboundBindDetailsList = [];
        $scope.oMyChatHistoryResponseMSG = [];
        $scope.smartTALKFilterOutboundList = data;
        if (data.length != 0) {
            //smartTALKNotificationError('Total ' + data.length + ' records Found');
        }
        try {
            var id = "";
            id = data[0].ID;
        } catch (e) { }
        //Kirti : This is commented to avoid showing transcript pre selected
        //smartTALKFilterMyChatHistoryClick(id);
    }
    //

    //HSM Template list
    $scope.smartTALKFilterHSMTemplateBind = smartTALKFilterHSMOutboundList;
    function smartTALKFilterHSMOutboundList(data) {
        $scope.HSMoutBoundCustomerList = [];
        $scope.smartTALKFilterHSMTemplateLists = [];
        $scope.oMyChatHistoryResponseMSG = [];
        $scope.HSMoutBoundCustomerList = data;
        if (data.length != 0) {
            //smartTALKNotificationError('Total ' + data.length + ' records Found');
        }
        try {
            var id = "";
            id = data[0].ID;
        } catch (e) { };
    }
    //


    $(document).on("click", ".myaccordionMyChatHist, .missedInteractionRow, .myChatHistoryInteractionRow", function () {
        var id = $(this).attr("id").split("_")[1];
        var emailCaseId = $(this).attr("data-email-case") || '';

        if (emailCaseId) {
            triggerGetEmailInteractionDetails(emailCaseId);
        }
        else {
            Get_Agent_Recent_Chat_Transcript(id);

            $scope.EmailInteractionTranscript.IsAvailable = false;
            $scope.EmailInteractionTranscript.TranscriptDetails = [];
        }

        $scope.Selected_MyHistoery_Chat = id;

        //if (!$('.chathist-sidebar').hasClass('chathist-active')) {
        //    $('.chathist-sidebar').addClass('chathist-active');
        //    $('.chathist-sidebarBtn').toggleClass('toggle');
        //}
    });

    //move this later
    function triggerGetEmailInteractionDetails(emailCaseId) {
        getEmailInteractionDetails(emailCaseId)
            .then((data) => {
                console.log('getEmailInteractionDetails', data);
                if (data) {
                    var _data = JSON.parse(data);
                    if (_data["Result"] == "Success") {
                        var oResult = _data["data"];

                        if (oResult.length > 0) {
                            $scope.EmailInteractionTranscript.IsAvailable = true;
                            $scope.EmailInteractionTranscript.TranscriptDetails = oResult;
                        }
                    }
                    else {
                        var _message = _data["data"] || '';
                        _message = _message + ' Unable to fetch the email details.';
                        smartTALKNotificationError(_message);
                    }
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Unable to load the transcript.");
                console.log('getEmailInteractionDetails error', error)
            })
    }

    //$(document).on("click", ".myChatHistAccordionOB", function () {
    //    
    //    $(this).prop("data-ng-click", "");
    //    //Get_Agent_Recent_Chat_Transcript(id);
    //    //$scope.Selected_MyHistoery_Chat = id;
    //    //if (!$('.chathist-sidebar').hasClass('chathist-active')) {
    //    //    $('.chathist-sidebar').addClass('chathist-active');
    //    //    $('.chathist-sidebarBtn').toggleClass('toggle');
    //    //}
    //});

    $scope.smartTALKFilterMyChatHistoryClick = smartTALKFilterMyChatHistoryClick;
    function smartTALKFilterMyChatHistoryClick(id) {
        //Now not used , we implemented toggle
    }

    $scope.smartTALKFilterMyChatHistoryBindDetails = smartTALKFilterMyChatHistoryBindDetails;
    function smartTALKFilterMyChatHistoryBindDetails(data) {
        $scope.smartTALKFilterMyChatHistoryBindDetailsList = [];
        $scope.smartTALKFilterMyChatHistoryBindDetailsList = data;

        var AgentChatHistoryResponseJsonMSG = {};
        $scope.oMyChatHistoryResponseMSG = [];

        $scope.AgentChatHistoeryDisposition = "";
        $scope.AgentChatHistoerySubDisposition = "";
        $scope.AgentChatHistoeryRemarks = "";

        $scope.DynamicMyChatChatHistoryResponseParms = clientConfig.DynamicMyChatChatHistoryResponseParms;

        try {
            var k = $(data)
                .filter(function (i, n) {
                    return n.TYPE === 'Closed';
                });

            if (k.length > 0) {
                $scope.AgentChatHistoeryDisposition = JSON.parse(k[0].MSG).Disposition;
                $scope.AgentChatHistoerySubDisposition = JSON.parse(k[0].MSG).SubDisposition;
                $scope.AgentChatHistoeryRemarks = JSON.parse(k[0].MSG).Remarks;

                AgentChatHistoryResponseJsonMSG = JSON.parse(k[0].MSG);

                for (var chkey in AgentChatHistoryResponseJsonMSG) {
                    $($scope.DynamicMyChatChatHistoryResponseParms).each(function (index, val) {
                        if (val.Key === chkey && val.IsDisplayed) {
                            $scope.oMyChatHistoryResponseMSG.push({ 'chkey': chkey, 'chvalue': AgentChatHistoryResponseJsonMSG[chkey], 'chDisplayName': val.DisplayName });
                        }
                    });
                }
            }
        } catch (e) { console.log('smartTALKFilterMyChatHistoryBindDetails() catch error', e); }
    }

    //Loads My chat History at page load.
    //smartTALKFilterMyChatHistory(false);

    //#endregion

    //#region Agent Manual Outbound Operation Start

    if (true) {
        getOutBoundChannelList(tenantid); //select channel dropdownlist binding
        $scope.ddlVoiceOutBoundChannels = [{ ChannelId: 1, ChannelName: "VOICE" }];
        $scope.ddlSelectedVoiceOutBoundChannels = $scope.ddlVoiceOutBoundChannels;
        $scope.txtManualOutBoundPhoneNo = '';
    }

    function getOutBoundChannelList(PROCESSID) {
        var _url = oAgentURL.OutBoundChannelUrl.replace("$$ProcessId$$", PROCESSID);

        _getOutBoundChannelList(_url)
            .then((data) => {
                if (data && data.Result) {
                    $scope.ddlManualOutBoundChannels = data.Result.Data;
                    $scope.ddlSelectedManualOutBoundChannels = $scope.ddlManualOutBoundChannels[0];

                    if ($scope.ddlSelectedManualOutBoundChannels.ChannelName == 'WEBCHAT') {
                        $scope.txtManualOutBoundPhoneNo = "+" + $scope.AgentPrerequisiteData.AgentMobileNumber;
                    }

                    var channel = $scope.ddlSelectedManualOutBoundChannels.ChannelName;
                    funchannelsource(channel);
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Failed to get OB channel list");
                console.log('_getOutBoundChannelList error', error);
            });
    }

    function funchannelsource(channel) {
        _fetchTenantID()
            .then((data) => {
                if (data && data.d) {
                    var _tenantId = data.d;

                    _fetchChannelSource(_tenantId, channel)
                        .then((data) => {
                            if (data && data.d) {
                                var channelsource = JSON.parse(data.d);

                                if (channelsource && channelsource.length > 0) {
                                    $scope.ddlGetChannelSources = channelsource;
                                    $scope.ddlSelectedManualOutBoundChannelsSource = $scope.ddlGetChannelSources[0];
                                }
                                else {
                                    $scope.ddlGetChannelSources = [{ id: '', name: 'Select Channel Source' }];
                                    $scope.ddlSelectedManualOutBoundChannelsSource = $scope.ddlGetChannelSources[0];
                                }
                            }
                        })
                        .catch((error) => {
                            smartTALKNotificationError("Failed to fetch Channel Source");
                            console.log('_fetchChannelSource error', error);
                        });
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Failed to fetch Tenant Id");
                console.log('_fetchTenantID error', error);
            });

    }

    $scope.Initiate_Conversation = function (flag) {

        if ($scope.OBSelected_Template.name == 'Select Template') {
            localStorage.removeItem("Template");
        }
        var _ObjRecords = {};
        var TemplateName = localStorage.getItem("Template");
        angular.forEach($scope.ControlDetails, function (index, item) {
            console.log(item);
            item = item + 1;
            var TemplateValue = $scope.Templatevalue[index.name];
            var ReplaceIndex = "{{" + item + "}}";
            if (TemplateValue == undefined || TemplateValue == '') {
                TemplateValue = ReplaceIndex;
            }
            TemplateName = TemplateName.replace(ReplaceIndex, TemplateValue);

        });
        $scope.Template = TemplateName;

        _ObjRecords.Channel = $scope.ddlSelectedManualOutBoundChannels.ChannelName;
        _ObjRecords.MobileNumber = $scope.txtManualOutBoundPhoneNo;
        _ObjRecords.ChannelSource = $scope.ddlSelectedManualOutBoundChannelsSource.name;
        if (_ObjRecords.ChannelSource.toUpperCase() == 'SELECT CHANNEL SOURCE') {
            _ObjRecords.ChannelSource = '';
        }
        _ObjRecords.LanguageCode = $scope.selectedTranslation.LanguageCode;
        _ObjRecords.CESESSIONID = '';
        _ObjRecords.Template = $scope.Template;
        if (!phonenumber($scope.txtManualOutBoundPhoneNo)) {
            $scope.smartTALKNotificationError('Please provide a valid 12 digit mobile no. with 91 prefix.');
            return;
        }
        else {
            OBajax(_ObjRecords);
        }

    }

    $scope.triggerManualOutBound = triggerManualOutBound;
    function triggerManualOutBound(Records, oRecordType) {
        var _ObjRecords = {};

        if (Records) {
            //originated from Interaction row Click OB.
            _ObjRecords.Channel = Records.Channel;
            _ObjRecords.MobileNumber = Records.MobileNumber;
            _ObjRecords.LanguageCode = $scope.selectedTranslation.LanguageCode;
            _ObjRecords.ChannelSourc = Records.ChannelSource;
            _ObjRecords.CESESSIONID = Records.CESESSIONID;
            _ObjRecords.Template = '';
            _ObjRecords.EventName = (oRecordType == 'MissedInteraction') ? 'EventMissedInteractionOutbound' : 'EventManualOutbound';
        }
        else {
            //stand-alone manual OB.            
            _ObjRecords.Channel = $scope.ddlSelectedManualOutBoundChannels.ChannelName;
            _ObjRecords.MobileNumber = $scope.txtVoiceCustOutBoundPhoneNoCountryCode + $scope.txtManualOutBoundPhoneNo;
            _ObjRecords.LanguageCode = $scope.selectedTranslation.LanguageCode;
            _ObjRecords.ChannelSourc = ($scope.ddlSelectedManualOutBoundChannelsSource.name == 'SELECT CHANNEL SOURCE') ? '' : $scope.ddlSelectedManualOutBoundChannelsSource.name;
            _ObjRecords.CESESSIONID = '';
            _ObjRecords.Template = '';
            _ObjRecords.EventName = 'EventManualOutbound';
        }

        if (_ObjRecords.Channel == 'WEBCHAT' && oRecordType != 'MissedInteraction') {
            $scope.smartTALKNotificationError('Outbound for Webchat is not allowed.');
            return;
        }

        if (_ObjRecords.Channel == 'WEBCHAT' && oRecordType == 'MissedInteraction' && Records.STATUS == 'Active') {
            $scope.smartTALKNotificationError('Outbound for Webchat is allowed only when interaction is in Active mode.');
            return;
        }

        if (_ObjRecords.Channel == 'WHATSAPP' && !phonenumber(_ObjRecords.MobileNumber)) {
            $scope.smartTALKNotificationError('Please provide a valid 10 digit mobile no.');
            return;
        }

        var oDuplicateOB = $.grep($scope.smartTALKActiveSessionList, function (element, index) {
            return element.PHONENO == _ObjRecords.MobileNumber && element.INTERACTIONTYPE == 'OUTBOUND';
        });

        if (oDuplicateOB.length > 0) {
            $scope.smartTALKNotificationInfo('Outbound already initiated with same contact number : ' + _ObjRecords.MobileNumber);
        }
        else {
            //OBajax(_ObjRecords);
            _validateOutBoundCapacity(_ObjRecords.Channel)
                .then((data) => {
                    if (data && data.status) {
                        let status = data['status'];
                        let msg = data['Message'];
                        if (status == 'Success') {
                            OBajax(_ObjRecords);
                        }
                        else {
                            smartTALKNotificationError(msg);
                        }
                    }
                })
                .catch((error) => {
                    OBajax(_ObjRecords);
                    smartTALKNotificationError("Unable to validate capacity for outbound interaction. Please try again.");
                    console.log('_validateOutBoundCapacity error', error)
                });
        }
    }

    function OBajax(Records) {
        var outboundRequest =
        {
            OBchannel: Records.Channel || '',
            OBphoneno: Records.MobileNumber || '',
            selLanguage: Records.LanguageCode || 'en',
            ChannelSource: Records.ChannelSourc || '',
            CESESSIONID: Records.CESESSIONID || '',
            Template: Records.Template || '',
            EventName: (Records.Channel == 'EMAIL') ? 'EventMissedInteractionOutbound' : Records.EventName,
            CheckIsParkedInteractionRecord: false,
        };

        _triggerManualOutBound(outboundRequest)
            .then((data) => {
                if (data.d.toLowerCase() == 'true') {
                    $scope.smartTALKNotificationSuccess('Outbound interaction initiated successfully.');
                    $scope.filterSubMenu('ActiveInteractions');
                    FocusOnInteraction(null, null);
                } else {
                    smartTALKNotificationError(json.d);
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Unable to initiate the outbound interaction. Please try again.");
                console.log('_triggerManualOutBound error', error)
            });
    }
    //#endregion

    //#region voice outbound

    $scope.triggerVoiceOutBound = function () {
        //
        if ($scope.ASW) {
            AgentCallOutbound($scope.txtManualOutBoundPhoneNoKnowlarity);
        }
        else {
            //
            if ($scope.cvoiceoutbound) {

                if (!Voicephonenumber($scope.txtManualOutBoundPhoneNo)) {
                    $scope.smartTALKNotificationError('Invalid Agent Mobile No, must be 12 digit with +91 prefix');
                    return;
                }

                if (!Voicephonenumber($scope.txtVoiceCustOutBoundPhoneNo)) {
                    $scope.smartTALKNotificationError('Invalid Cutomer Mobile No, must be 12 digit with +91 prefix');
                    return;
                }

                var _ObjVoiceRecords = {};
                _ObjVoiceRecords.AGENTNUMBER = $scope.txtManualOutBoundPhoneNo.split("+")[1];
                _ObjVoiceRecords.CUSTNUMBER = $scope.txtVoiceCustOutBoundPhoneNo.split("+")[1];
                _ObjVoiceRecords.CHANNEL = $scope.ddlSelectedVoiceOutBoundChannels[0].ChannelName;
                if ($scope.ddlSelectedManualOutBoundChannelsSource.name == 'Select Channel Source') {
                    $scope.ddlSelectedManualOutBoundChannelsSource.name = '';
                }
                _ObjVoiceRecords.CHANNELSOURCE = $scope.ddlSelectedManualOutBoundChannelsSource.name;
                _ObjVoiceRecords.LANG = 'en';
                _ObjVoiceRecords.UID = '';

                _ObjVoiceRecords.CESESSIONID = '';
                $.ajax({
                    type: "POST",
                    url: "SmartAgent.aspx/triggerVoiceOutBound",
                    data: "{AGENTNUMBER:'" + _ObjVoiceRecords.AGENTNUMBER + "',CUSTNUMBER:'" + _ObjVoiceRecords.CUSTNUMBER + "',CHANNEL:'" + _ObjVoiceRecords.CHANNEL + "',CHANNELSOURCE:'" + _ObjVoiceRecords.CHANNELSOURCE + "',CESESSIONID:'" + _ObjVoiceRecords.CESESSIONID + "',UID:'" + _ObjVoiceRecords.UID + "',LANG:'" + _ObjVoiceRecords.LANG + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (json) {
                        try {

                        } catch (e) { }
                    }, error: function (xhr, ajaxOptions, thrownError) { console.log('triggerManualOutBound() error', xhr); }
                });
            }
        }

    }

    //#endregion

    //#region VOICE OB Knowlarity Section

    $scope.triggerVoiceknowlarityOutBound = function () {

        if ($scope.ASW) {
            AgentCallOutbound($scope.txtManualOutBoundPhoneNoKnowlarityCountryCode + $scope.txtManualOutBoundPhoneNoKnowlarity);
        }
        else {

            if ($scope.cvoiceoutboundKnowlarity) {
                var IsAgentNOMapped = (!$scope.AgentPrerequisiteData.AgentMobileNumber) ? false : true;

                if (IsAgentNOMapped) {
                    if (!CountryCodeValidator($scope.txtManualOutBoundPhoneNoKnowlarityCountryCode)) {
                        $scope.smartTALKNotificationError('Please provide valid country code with + prefix');
                        return;
                    }
                    if (!Voicephonenumber($scope.txtManualOutBoundPhoneNoKnowlarity)) {
                        $scope.smartTALKNotificationError('Please provide a valid 12 or 8 digit mobile no.');
                        return;
                    }
                }
                else {
                    $scope.smartTALKNotificationError('Extension/mobile no mapping is missing in your user master settings.');
                    return;
                }

                let channelName = $scope.ddlSelectedVoiceOutBoundChannels[0].ChannelName;
                _validateOutBoundCapacity(channelName)
                    .then((data) => {
                        if (data && data.status) {
                            let status = data['status'];
                            let msg = data['Message'];
                            if (status == 'Success') {
                                triggerVoiceOBKnowlarity();
                            }
                            else {
                                smartTALKNotificationError(msg);
                            }
                        }
                    })
                    .catch((error) => {
                        smartTALKNotificationError("Unable to validate capacity for outbound interaction. Please try again.");
                        console.log('_validateOutBoundCapacity error', error)
                    });
            }
        }
    }

    function triggerVoiceOBKnowlarity() {
        let OBChannelSource = $scope.ddlSelectedManualOutBoundChannelsSource.name;
        let oVoiceKnowlarityOBRQ = {
            "AGENTNUMBER": $scope.AgentPrerequisiteData.AgentMobileNumber || "",
            "CUSTNUMBER": $scope.txtManualOutBoundPhoneNoKnowlarityCountryCode + $scope.txtManualOutBoundPhoneNoKnowlarity || "",
            "CHANNEL": $scope.ddlSelectedVoiceOutBoundChannels[0].ChannelName || "",
            "CHANNELSOURCE": (OBChannelSource == 'Select Channel Source') ? '' : OBChannelSource,
            "CESESSIONID": "",
            "UID": "",
            "LANG": "en"
        };
        _triggerVoiceOBKnowlarity(oVoiceKnowlarityOBRQ)
            .then((data) => {
                if (data.d) {
                    console.log(data.d);
                    smartTALKNotificationSuccess('CALL INITIATED');
                }
                else {
                    smartTALKNotificationError(data.d);
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Unable to initiate the outbound interaction. Please try again.");
                console.log('_triggerVoiceOBKnowlarity error', error);
            });
    }

    //#endregion

    //#region HSN Template
    //#region templateDDL

    $scope.OBTemplateDiv = false;

    if ($scope.coutboundtab) {

        //tenantid = $('#hdnAgentProcessId').val();
        try {
            // var URL = AgentParentDomain + "/UNFYD-Web-API/api/UtilityHelper/GetGenericTemplateFromDB?FLAG=GETOBTEMPLATELIST&TEMPLATENAME=" + "&PROCESSID=" + tenantid;
            $.ajax({
                type: "POST",
                url: "SmartAgent.aspx/FetchHSMTemplate",
                data: "{ProcessID:'" + tenantid + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (json) {
                    if (json.d == '' || json.d == undefined) { }
                    else {
                        json = JSON.parse(json.d);
                        if (json.Result && json.Result.Data.length >= 1) {
                            $scope.WA_HSM_Template_Name = json.Result.Data;
                            $scope.OBSelected_Template = $scope.WA_HSM_Template_Name[0];
                            $scope.OBTemplateDiv = true;
                        }
                        else {
                            $scope.OBTemplateDiv = false;
                        }
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('GetOutBoundTemplate() error', xhr);
                }
            });
        } catch (e) {
            console.log('GetOutBoundTemplate() catch error');
        }
        $scope.GetTemplate = function () {
            angular.forEach($scope.ControlDetails, function (index, item) {
                $scope.Templatevalue[index.name] = '';
            });
            if ($scope.OBSelected_Template == 'Select Template') { }
            else {
                //tenantid = $('#hdnAgentProcessId').val();
                //callTemplate($scope.OBSelected_Template.name, tenantid);
                funGetOutBoundTemplate($scope.OBSelected_Template.name, tenantid);
            }
        };
    }

    //


    //

    $scope.ResetHSMFields = function () {
        angular.forEach($scope.ControlDetails, function (index, item) {
            $scope.Templatevalue[index.name] = '';
        });
    }

    $scope.Templates = function (Template) {

        if (Template == 'General_Customer') {
            $scope.OBSelected_Template_Value = $scope.WA_HSM_Template_Value[1].name;
        }
        else if (Template == 'Welcome') {
            $scope.OBSelected_Template_Value = $scope.WA_HSM_Template_Value[2].name;
        }
        else {
            $scope.OBSelected_Template_Value = $scope.WA_HSM_Template_Value[3].name;
        }
        $scope.Product_value = function () {
            $scope.OBSelected_Template_Value = $scope.OBSelected_Template_Value.replace('{{2}}', $scope.Product);
        }
        $scope.Req_no_value = function () {
            $scope.OBSelected_Template_Value = $scope.OBSelected_Template_Value.replace('{{3}}', $scope.Req_No);
        }
    }



    $scope.Template_Preview = function () {
        if ($scope.OBSelected_Template.name == 'Select Template') {
            localStorage.removeItem("Template");
        }
        var TemplateName = localStorage.getItem("Template");
        angular.forEach($scope.ControlDetails, function (index, item) {
            console.log(item);
            item = item + 1;
            var TemplateValue = $scope.Templatevalue[index.name];
            var ReplaceIndex = "{{" + item + "}}";
            if (TemplateValue == undefined || TemplateValue == '') {
                TemplateValue = ReplaceIndex;
            }
            TemplateName = TemplateName.replace(ReplaceIndex, TemplateValue);

        });
        $scope.Template = TemplateName;

    }


    $("#Submit_xml").click(function () {
        if ($scope.OBSelected_Template.name == 'Select Template') {
            localStorage.removeItem("Template");
        }
        // phonenumber($scope.txtManualOutBoundPhoneNo)
        if (!phonenumber($scope.txtManualOutBoundPhoneNo)) {
            $scope.smartTALKNotificationError('Please provide a valid 12 digit mobile no. with 91 prefix.');
            return;
        }
        if ($scope.ddlSelectedManualOutBoundChannels.ChannelName == 'Select Channel' || $scope.ddlSelectedManualOutBoundChannels.ChannelName == undefined) {
            $scope.smartTALKNotificationError('Select Channel');
            return;
        }
        var TemplateXML = [];
        var mobileno = "", TemplateName = "", cust = "", msg = "", Product = "", Req_No = "";
        if ($scope.txtManualOutBoundPhoneNo == '' || $scope.txtManualOutBoundPhoneNo == undefined) { mobileno = ""; }
        else { mobileno = $scope.txtManualOutBoundPhoneNo; }
        var itemarray = "["
        itemarray = itemarray + '{"UID":"' + $scope.txtManualOutBoundPhoneNo + '"},';
        itemarray = itemarray + '{"CHANNEL":"' + $scope.ddlSelectedManualOutBoundChannels.ChannelName + '"},';
        itemarray = itemarray + '{"CHANNELSOURCE":"' + $scope.ddlSelectedManualOutBoundChannelsSource.name + '"},';
        itemarray = itemarray + '{"TEMPLATENAME":"' + $scope.OBSelected_Template.name + '"},';
        itemarray = itemarray + '{"TENANTID":"' + $('#hdnAgentProcessId').val() + '"},';
        angular.forEach($scope.ControlDetails, function (index, item) {
            var mval = $scope.Templatevalue[index.name];
            var index = [index.name];
            itemarray = itemarray + '{"' + index + '":"' + mval + '"},';

        });

        var itemarray = itemarray.substr(0, itemarray.length - 1);
        itemarray = itemarray + ']';
        TemplateXML = JSON.parse(itemarray);
        var templatedata = OBJtoXML(TemplateXML);
        // templatedata = templatedata.replace(/Item/g,'');
        if ($scope.OBSelected_Template.name == '' || $scope.OBSelected_Template.name == undefined) { TemplateName = ""; }
        else { TemplateName = $scope.OBSelected_Template.name; }

        if ($scope.Cust_Name == '' || $scope.Cust_Name == undefined) { cust = ""; }
        else { cust = $scope.Cust_Name; }

        if ($("#custvalue").text() == '' || $("#custvalue").text() == undefined) { msg = ""; }
        else { msg = $("#custvalue").text(); }

        if ($scope.Product == '' || $scope.Product == undefined) { Product = ""; }
        else { Product = $scope.Product; }

        if ($scope.Req_No == '' || $scope.Req_No == undefined) { Req_No = ""; }
        else { Req_No = $scope.Req_No; }

        //replace placeholder with its respective textbox values.
        var TemplateName = localStorage.getItem("Template");
        angular.forEach($scope.ControlDetails, function (index, item) {
            console.log(item);
            item = item + 1;
            var TemplateValue = $scope.Templatevalue[index.name];
            var ReplaceIndex = "{{" + item + "}}";
            if (TemplateValue == undefined || TemplateValue == '') {
                TemplateValue = ReplaceIndex;
            }
            TemplateName = TemplateName.replace(ReplaceIndex, TemplateValue);

        });
        //$scope.Template = TemplateName;
        $scope.Template = '';
        //end

        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/CallWebApiTemplate",
            data: JSON.stringify({ xmldata: templatedata, message: $scope.Template }),
            // data: encodeURIComponent( templatedata),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {

                try {
                    if (json.d == 'True' || json.d == '') {
                        var scope = angular.element($('#ChatArea')).scope();
                        scope.smartTALKNotificationSuccess('Response submitted successfully');
                    }
                    else {

                    }
                    console.log(json);

                } catch (e) { }
            }, error: function (xhr, ajaxOptions, thrownError) { console.log('CallWebApiTemplate error', xhr); }
        });
    });

    //code for multimedia HSM infobip start
    $("#Submit_xml_Multimedia").click(function () {

        if ($scope.OBSelected_Template.name == 'Select Template') {
            localStorage.removeItem("Template");
        }
        // phonenumber($scope.txtManualOutBoundPhoneNo)
        if (!phonenumber($scope.txtManualOutBoundPhoneNo)) {
            $scope.smartTALKNotificationError('Please provide a valid 12 digit mobile no. with 91 prefix.');
            return;
        }
        if (document.getElementById('HSMattachment').innerHTML != 'file uploaded succesfully') {
            $scope.smartTALKNotificationError('Kindly upload the file');
            return;
        }
        //if ($scope.ddlSelectedManualOutBoundChannels.ChannelName == 'Select Channel' || $scope.ddlSelectedManualOutBoundChannels.ChannelName == undefined) {
        //    $scope.smartTALKNotificationError('Select Channel');
        //    return;
        //}

        if ($scope.txtManualOutBoundPhoneNo == '' || $scope.txtManualOutBoundPhoneNo == undefined) { mobileno = ""; }
        else { mobileno = $scope.txtManualOutBoundPhoneNo; }

        // parameter array with comma
        var placeholder = '', Regexplaceholder = /,\s*$/, QUICKREPLAYBUTTONarray = '', CALLACTIONBUTTONSarray = '';
        angular.forEach($scope.ControlDetails, function (index, item) {
            if (index.Type.toUpperCase() == 'ATTACHMENT') { }
            else if (index.Type.toUpperCase() == 'BUTTONS' && $scope.OBSelected_Template.TemplateType == 'QUICKREPLAYBUTTON') {
                QUICKREPLAYBUTTONarray = QUICKREPLAYBUTTONarray + '{"quickReplyPayload": "' + $scope.Templatevalue[index.name] + '"},';
            }
            else if (index.Type.toUpperCase() == 'BUTTONS' && $scope.OBSelected_Template.TemplateType == 'CALLACTIONBUTTONS') {
                CALLACTIONBUTTONSarray = CALLACTIONBUTTONSarray + '{"urlPlaceholder": "' + $scope.Templatevalue[index.name] + '"},';
            }
            else if (index.Type.toUpperCase() != 'ATTACHMENT' || index.Type.toUpperCase() != 'BUTTONS') {
                var mval = '"' + $scope.Templatevalue[index.name] + '",';
                placeholder = placeholder + mval;
            }
        });
        placeholder = placeholder.replace(Regexplaceholder, '');
        QUICKREPLAYBUTTONarray = QUICKREPLAYBUTTONarray.replace(Regexplaceholder, '');
        CALLACTIONBUTTONSarray = CALLACTIONBUTTONSarray.replace(Regexplaceholder, '');
        //
        var itemarray = '', lat = '', long = '';
        if ($scope.OBSelected_Template.TemplateType.toUpperCase() == 'IMAGE TEMPLATE') {
            itemarray = '{ "scenarioKey": "$scenarioKey$", "destinations": [{ "to": { "phoneNumber": "$phoneNumber" } }],' +
                '"whatsApp": {"templateName": "$templateName$", "mediaTemplateData": {"header": { "imageUrl": "$mediapath$" },' +
                '"body": { "placeholders": [$placeholdersvalue$] }}, "language": "$language$"},' +
                '"sms": { "text": "This text will be received via SMS if WhatsApp message is not delivered.", "validityPeriod": 1 }} ';
        }
        else if ($scope.OBSelected_Template.TemplateType.toUpperCase() == 'VIDEO TEMPLATE') {
            itemarray = '{"scenarioKey":""$scenarioKey$","destinations":[{"to":{"phoneNumber":"$phoneNumber$"}}],' +
                '"whatsApp": { "templateName": "$templateName$", "mediaTemplateData": { "header": { "videoUrl": "$mediapath$" },' +
                '"body": { "placeholders": [$placeholdersvalue$] }}, "language": "$language$"},' +
                '"sms": { "text": "This text will be received via SMS if WhatsApp message is not delivered.", "validityPeriod": 1 }}';
        }
        else if ($scope.OBSelected_Template.TemplateType.toUpperCase() == 'DOCUMENT TEMPLATE') {
            itemarray = '{"scenarioKey":""$scenarioKey$","destinations":[{"to":{"phoneNumber":"$phoneNumber$"}}],' +
                '"whatsApp": { "templateName": "$templateName$", "mediaTemplateData": { "header": { "documentUrl": "$mediapath$",' +
                '"documentFilename": "$documentname$"}, "body": { "placeholders": [$placeholdersvalue$] }},' +
                '"language": "$language$"}, "sms": { "text": "This text will be received via SMS if WhatsApp message is not delivered.", "validityPeriod": 1 }}';
        }
        else if ($scope.OBSelected_Template.TemplateType.toUpperCase() == 'LOCATION TEMPLATE') {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                }

                function showPosition(position) {
                    lat = position.coords.latitude;
                    long = position.coords.longitude;
                }
            }
            catch (e) {
                console.log(e);
            }
            itemarray = '{"scenarioKey":"","destinations":[{"to":{"phoneNumber":""}}],' +
                '"whatsApp": { "templateName": "$templateName$", "mediaTemplateData": { "header": { "latitude": $latitude$, "longitude": $longitude$ },' +
                '"body": { "placeholders": [$placeholdersvalue$] }}, "language": "$language$"},' +
                '"sms": { "text": "This text will be received via SMS if WhatsApp message is not delivered.", "validityPeriod": 1 }} ';
        }
        else if ($scope.OBSelected_Template.TemplateType.toUpperCase() == 'CALL ACTION BUTTONS STATIC') {
            itemarray = '{"scenarioKey": "$scenarioKey$", "destinations": [{ "to": { "phoneNumber": "$phoneNumber$" } }],' +
                '"whatsApp": { "templateName": "$templateName$",' +
                '"mediaTemplateData": { "body": { "placeholders": [$placeholdersvalue$] }, "buttons": [] }, "language": "$language$"}}';
        }
        else if ($scope.OBSelected_Template.TemplateType.toUpperCase() == 'QUICK REPLAY BUTTONS') {
            itemarray = '{"scenarioKey":"$scenarioKey$","destinations":[{"to":{"phoneNumber":"$phoneNumber$"}}],' +
                '"whatsApp": { "templateName": "$templateName$", "mediaTemplateData": { "body": { "placeholders": [$placeholdersvalue$] },' +
                '"buttons": [$QUICKREPLAYBUTTONarray$]},' +
                '"language": "$language$"}, "sms": { "text": "This text will be received if WhatsApp communication channel message is not delivered." }} ';
        }
        else if ($scope.OBSelected_Template.TemplateType.toUpperCase() == 'CALL ACTION BUTTONS') {
            itemarray = '{"scenarioKey":"$scenarioKey$","destinations":[{"to":{"phoneNumber":"$phoneNumber$"}}],' +
                '"whatsApp": { "templateName": "$templateName$", "mediaTemplateData": { "body": { "placeholders": [$placeholdersvalue$] },' +
                '"buttons": [{ "urlPlaceholder": "$CALLACTIONBUTTONSarray$" }]}, "language": "$language$"},' +
                '"sms": { "text": "This text will be received if WhatsApp communication channel message is not delivered." }} ';
        }
        else if ($scope.OBSelected_Template.TemplateType.toUpperCase() == 'STATIC MESSAGE') {
            iteemarray = '{"scenarioKey":"$scenarioKey$","destinations":[{"to":{"phoneNumber": "$phoneNumber$"}}],' +
                '"whatsApp": { "templateName": $templateName$", "templateData": [$placeholdersvalue], "language": "$language$" },' +
                '"sms": { "text": "This text will be received via SMS if WhatsApp message is not delivered.", "validityPeriod": 1 }';
        }
        //else if ($scope.OBSelected_Template.TemplateType.toUpperCase() == 'FreeFormMessages') { // whatsApp text confirmation
        //    itemarray = '{"scenarioKey":"$scenarioKey$","destinations":[{"to":{"phoneNumber":"$phoneNumber$"}}],' +
        //        '"whatsApp": { "text": "This WhatsApp message will be delivered to WhatsApp application on the user device." },' +
        //        '"sms": { "text": "This is the SMS failover message" }} ';
        //}


        itemarray = itemarray.replace('$scenarioKey$', $scope.scenarioKey);
        itemarray = itemarray.replace('$templateName$', $scope.OBSelected_Template.name);
        itemarray = itemarray.replace('$phoneNumber$', $scope.txtManualOutBoundPhoneNo);
        itemarray = itemarray.replace('$placeholdersvalue$', placeholder);
        itemarray = itemarray.replace('$language$', $scope.selectedTranslation.LanguageCode);
        itemarray = itemarray.replace('$mediapath$', $scope.MediaURL);
        itemarray = itemarray.replace('$documentname$', $scope.MediaURLFileName);
        itemarray = itemarray.replace('$latitude$', lat);
        itemarray = itemarray.replace('$longitude$', long);
        itemarray = itemarray.replace('$QUICKREPLAYBUTTONarray$', QUICKREPLAYBUTTONarray);
        itemarray = itemarray.replace('$CALLACTIONBUTTONSarray$', CALLACTIONBUTTONSarray);
        $scope.Template = '';
        //end
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/CallWebApiTemplate",
            data: JSON.stringify({ xmldata: itemarray, message: $scope.OBSelected_Template.TemplateType.toUpperCase() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {

                try {
                    if (json.d == 'True' || json.d == '') {
                        var scope = angular.element($('#ChatArea')).scope();
                        scope.smartTALKNotificationSuccess('Response submitted successfully');
                        document.getElementById('HSMattachment').innerHTML = 'Upload your files';
                    }
                    else {

                    }
                    console.log(json);

                } catch (e) { }
            }, error: function (xhr, ajaxOptions, thrownError) { console.log('CallWebApiTemplate error', xhr); }
        });
    });
    ////code for multimedia HSM infobip end

    function OBJtoXML(obj) {
        var xml = '';
        for (var prop in obj) {
            xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
            if (obj[prop] instanceof Array) {
                for (var array in obj[prop]) {
                    xml += "<" + prop + ">";
                    xml += OBJtoXML(new Object(obj[prop][array]));
                    xml += "</" + prop + ">";
                }
            } else if (typeof obj[prop] == "object") {
                xml += OBJtoXML(new Object(obj[prop]));
            } else {
                xml += obj[prop];
            }
            xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
        }
        var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
        return xml
    }
    //#endregion

    //#region Agent Outbound Operation Start
    $scope.outBoundCustomerList = [];
    $scope.requestOutBoundList = requestOutBoundList;
    $scope.smartTALKSendOutBound = smartTALKSendOutBound;
    function requestOutBoundList() {
        funRequestOutBoundList();
    }
    function smartTALKSendOutBound(value) {
        //please check this, may be old code for reference
        FunSendOutBound(value);
    }
    $scope.smartTALKSendOutbound = function (oOBSelectedCustomer) {
        var selectedChannel = 'WHATSAPP';
        var selectedChannelValue = oOBSelectedCustomer.PHONENO
        funClickTOOutBound(selectedChannel, selectedChannelValue);
    }
    //#endregion

    //#region Agent SMS Outbound Operation Start
    $scope.SmsoutBoundCustomerList = [];
    $scope.requestSMSOutBoundList = requestSMSOutBoundList;
    function requestSMSOutBoundList() {
        $scope.SmsoutBoundCustomerList = [];

        var _ObjSMS = {};
        _ObjSMS.FromDate = $scope.FromDate;
        _ObjSMS.Todate = $scope.ToDate;
        funRequestSMSOutBoundList(_ObjSMS);
    }
    $scope.smartTALKSendSMSOutbound = function () {
        $("#SMSOBErrorMsg").hide();
        $("#SMSOBErrorMsg").html('');
        $("#msgddlsubtype").hide();
        $("#msgddlsubtype").html('');
        var OutboundphoneNumber = $scope.smartTALKOutboundMobileValue;
        var OutBoundMessage = $scope.smartTALKOutboundMessageValue + " " + $scope.Translations.GeneralMessageTranslation.SMSOutBoundSuffixMsg;
        var TextMessage = $scope.smartTALKOutboundMessageValue;

        if (!OutboundphoneNumber && !TextMessage) // if value is negative,undefined,null,empty value then...
        {
            $("#msgddlsubtype").show();
            $("#msgddlsubtype").html('Please enter mobile number');
            $("#SMSOBErrorMsg").show();
            $("#SMSOBErrorMsg").html('Please enter message');
            return;
        }
        if (OutboundphoneNumber) {
            var pNumber_regex = /^[0-9]{10,12}$/;
            result = pNumber_regex.test(OutboundphoneNumber);
            if (!result) {
                $("#msgddlsubtype").show();
                $("#msgddlsubtype").html('Enter vaild mobile number');
            }
        }
        if (!TextMessage) {
            $("#SMSOBErrorMsg").show();
            $("#SMSOBErrorMsg").html('Please enter message');
            return;
        }
        if (OutboundphoneNumber) {
            var pNumber_regex = /^[0-9]{10,12}$/;
            result = pNumber_regex.test(OutboundphoneNumber);
            if (!result) {
                $("#msgddlsubtype").show();
                $("#msgddlsubtype").html('Enter vaild mobile number');
            }
            else {
                funClickTOSMSOutBound(OutboundphoneNumber, OutBoundMessage)
                requestSMSOutBoundList();
            }
        }
        else {
            $("#msgddlsubtype").show();
            $("#msgddlsubtype").html('Please enter mobile number');
        }
    }
    //#endregion  

    //#region HSM Outbound operation starts
    $scope.HSMoutBoundCustomerList = [];
    $scope.requestHSMOutBoundList = requestHSMOutBoundList;
    function requestHSMOutBoundList(staus) {

        $scope.Selected_MyHistoery_Chat = 0;
        CustRecentChat.FROM_DATE = funDateformating($scope.FromDate);
        CustRecentChat.TO_DATE = funDateformating($scope.ToDate);
        CustRecentChat.CHANNELS = $scope.ddlSelectedMyChatHistoryChannel.id;
        CustRecentChat.SEARCH = staus;
        CustRecentChat.processID = $('#hdnAgentProcessId').val();
        CustRecentChat.CUSTOMERATTRIBUTEKEY = $scope.CUSTOMERATTRIBUTE;
        CustRecentChat.CUSTOMERATTRIBUTEVALUE = $scope.CUSTOMERATTRIBUTEVALUE;
        $scope.HSMoutBoundCustomerList = [];
        funRequestHSMOutBoundList(CustRecentChat);
    }
    //endregion

    //#region Agent Clean Popup Error for Change Password process after logged In Start
    $scope.funerrorclear = funerrorclear;
    function funerrorclear() {
        $("#ErrorDivPopup").html(''); $("#txtnewConpassword").val(''); $("#txtnewpassword").val(''); $("#txtoldPassword").val('');
    }
    //#endregion

    //fix related to new line in chat textbox.
    $('#txtmessage').keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 13) {
            var chatTextMessage = $('#txtmessage').text();
            chatTextMessage = chatTextMessage + "\n";
            $('#txtmessage').text(chatTextMessage);
        }
    });
    //holds chat text value for each interaction based on chat key.
    $('#txtmessage').bind("input propertychange", function (e) {
        var textChatKey = $scope.hdsessionId + '_chatMsg';
        if (sessionStorage.getItem(textChatKey) !== null) {
            sessionStorage.setItem(textChatKey, $('#txtmessage').val());
        }
    });
    //new line for group chat textbox.
    $('#txtGroupChat').keydown(function (e) {
        if (e.ctrlKey && e.keyCode == 13) {
            $(this).val(function (i, val) {
                return val + "\n";
            });
        }
    });

    function smartTALKSendMSGGroupChat(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' || keycode == 'undefined' || keycode == 1) {
            if (e.keyCode == 13 || keycode == 1) {
                if (!e.shiftKey) {
                    console.log("$scope.smartTALKChatGroup", $scope.smartTALKChatGroup.GroupID);
                    if ($scope.smartTALKGroupChatMsg.trim() != "" && $scope.smartTALKChatGroup.GroupName !== "Select" && $scope.smartTALKAgentName != "") {
                        var k = $scope.smartTALKGroupChatMsg.trim();
                        k = stringEscape(k);
                        k = k.replace(/^( |<br>)*(.*?)( |<br>)*$/, "$2");
                        //var tenantid = $('#hdnAgentProcessId').val();
                        var Data = '{ "GROUPNAME": "' + $scope.smartTALKChatGroup.GroupName + '", "AGENTNAME": "' + $scope.smartTALKAgentName + '", "MSG": "' + k + '", "TENANTID": "' + tenantid + '"}';
                        SendAgentGroupChat(Data);
                        $scope.smartTALKGroupChatMsg = "";
                        e.preventDefault();
                    }
                    else {
                        smartTALKNotificationError("Please select group name!");
                    }
                }
            }
        }
    }

    $scope.smartTALKChaneCoustomerDetails = smartTALKChaneCoustomerDetails;

    function smartTALKChaneCoustomerDetails(e, x) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' || keycode == 'undefined') {
            if (e.keyCode == 13) {
                return "";
            }
        }
    }

    $scope.smartTALKCustomerHistoryList = [];

    // $scope.smartTALKActiveSessionList

    $scope.WebchartHeadInfoList = [];
    $scope.WebchartCrolingList = [];
    $scope.ActivecustomerPIC = "";
    //$scope.smartTALKActiveSessionList = [];
    $scope.smartTALKChatList = [];
    $scope.MessageDispalyCount = $scope.MessageDispalyCountDefault;

    $scope.smartTALKGetRequestAgentDetailsList = [];

    $scope.FunsmartTALKChat = FunsmartTALKChat;
    $scope.smartTALKSendMSG = smartTALKSendMSG;

    $scope.smartTALKSendURL = smartTALKSendURL;

    $scope.smartTALKkeypress = smartTALKkeypress;
    $scope.removeAllRow = removeAllRow;
    // $scope.BIUhiddendiv = BIUhiddendiv;
    $scope.smartTALKCustomerDetails = smartTALKCustomerDetails;


    $scope.Custoattr = "";

    $scope.smartTALKCallRequestAgentDetails = smartTALKCallRequestAgentDetails;

    $scope.smartTALKGetRequestAgentDetails = smartTALKGetRequestAgentDetails;

    $scope.smartTALKActiveSessionDetails = smartTALKActiveSessionDetails();
    $scope.smartTALKActiveSession = smartTALKActiveSession;

    $scope.UpdateRealtimeAgent = UpdateRealtimeAgent;

    $scope.smartTALKClickActiveSession = smartTALKClickActiveSession;

    $scope.smartTALKCustomerStatus = smartTALKCustomerStatus;

    $scope.smartTALKActiveChanelIcone = smartTALKActiveChanelIcone;

    $scope.smartTALKChatActiveChanelIcone = smartTALKChatActiveChanelIcone;


    $scope.smartTALKDisposeCoustomer = smartTALKDisposeCoustomer;

    $scope.smartTALKWorkFlowDisposeCoustomer = smartTALKWorkFlowDisposeCoustomer;


    $scope.ActiveCoustomerDetailsIcone = ActiveCoustomerDetailsIcone;
    $scope.getActiveCustomerInfoIconChannelWise = getActiveCustomerInfoIconChannelWise;

    $scope.ActiveCoustomerDetailsDisplay = ActiveCoustomerDetailsDisplay;


    $scope.ActiveCoustomerDetailsEditable = ActiveCoustomerDetailsEditable;

    //$scope.smartTALKAgentstasListBind = smartTALKAgentstasListBind;
    $scope.smartTALKAgentLogout = smartTALKAgentLogout;


    $scope.smartTALKSuperVisoerAgentAction = smartTALKSuperVisoerAgentAction;
    $scope.smartTALKSuperVisoerCustomerAction = smartTALKSuperVisoerCustomerAction;



    $scope.smartTALKParkChatoutbound = smartTALKParkChatoutbound;
    function smartTALKParkChatoutbound(k) {

        ParkingHistoeryOutbound(k.SessionID, k.EmailCaseId);
    }


    $scope.dispoformEmail = "";
    $scope.ddlAction = "";

    $scope.dispoformRemarks = "";
    $scope.dispoformLeadID = "";


    $scope.smartTALKSuperVisorRequestActiveAgent = [];
    $scope.smartTALKSuperVisorRequestActiveCusomer = [];
    $scope.smartTALTextmessageAppend = smartTALTextmessageAppend;


    $scope.smartTALKNotificationError = smartTALKNotificationError;
    $scope.smartTALKNotificationRemove = smartTALKNotificationRemove;
    $scope.smartTALKNotificationSuccess = smartTALKNotificationSuccess;
    $scope.smartTALKNotificationInfo = smartTALKNotificationInfo;

    $scope.smartTALKViewMoreMessage = smartTALKViewMoreMessage;

    $(document).ready(function () {
        if ($scope.VideoCallingTabConfig.VideCallOutbound) {
            //TODO : Video OutBound.
        }
        else {

        }
    });

    function IDGenerator() {

        this.length = 8;
        this.timestamp = +new Date;
        var _getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        this.generate = function () {
            var ts = this.timestamp.toString();
            var parts = ts.split("").reverse();
            var id = "";

            for (var i = 0; i < this.length; ++i) {
                var index = _getRandomInt(0, parts.length - 1);
                id += parts[index];
            }

            return id;
        }
    }

    function smartTALKViewMoreMessage() {
        $scope.MessageDispalyCount = $scope.MessageDispalyCount + $scope.MessageDispalyCountDefault;

        setTimeout(function v() {
            $("#ChatArea").find("#bluescroll").scrollTop(0);
        }, 1000);
        setTimeout(function v() {
            $("#myModal").find("#bluescroll").scrollTop(0);
        }, 1000);

    }

    //MessageDispalyCount
    function smartTALKNotificationError(message) {

        try {

            Notification.error({ message: message, delay: 8000 });

        } catch (e) {


        }
    }

    function smartTALKNotificationSuccess(message) {
        Notification.success({ message: message, delay: 8000 });
    }
    function smartTALKNotificationInfo(message) {
        Notification.info({ message: message, delay: 8000 });
    }


    function smartTALKNotificationRemove() {
        // Notification.clearAll();
    }


    $scope.CampaignList = [{ id: '', name: 'Select Campaign' }, { id: 'advertise', name: 'Advertise' }, { id: 'sales', name: 'Sales' }, { id: 'other', name: 'Others' }];
    $scope.ddlCampaignList = $scope.CampaignList[0];

    $scope.OnCampaignChange = function (type, values) {

    };

    function smartTALTextmessageAppend(val) {
        //
        var sessionid = $scope.hdsessionId;
        try {
            if (sessionid !== "" && $scope.TextboxSendMessageEnabled != "1") {
                var k = $scope.txtmessage;
                var hdnTextMessage = $('#hiddendiv').text();

                $scope.txtmessage = "";
                $scope.txtmessage1 = "";

                if (k === hdnTextMessage) {
                    hdnTextMessage = "";
                }
                else if (hdnTextMessage == "") {
                    //user has intentionally made txtbox div blank and we now clear the model so that previous selected canned message gets clear
                    $scope.txtmessage = "";
                    k = "";
                }

                if ($scope.txtmessage == "" || $scope.txtmessage == null || $scope.txtmessage == "null") {
                    $scope.txtmessage = hdnTextMessage + k + " " + val;
                    //$scope.txtmessage = val;

                    //this fix was done to show the selected Canned message in chat text area.
                    //here we watch the txtmessage model change and apply the same to hiddendiv
                    $scope.$watch('txtmessage', function () {
                        $('#hiddendiv').text($scope.txtmessage);
                    }, true);
                }
                else {
                    $scope.txtmessage = hdnTextMessage + k + " " + val;
                    //$scope.txtmessage = val;
                    $scope.$watch('txtmessage', function () {
                        $('#hiddendiv').text($scope.txtmessage);
                    }, true);
                }
            }
        } catch (e) {
        }
    }

    //Load Canned Message Master
    //bindCanMessage();

    $scope.smartTALKAgentOutBoundChanelList = {
        repeatSelect: 'Select Channels',
        availableOptions: [
            { id: 'Select Channels', name: 'Select Channels' },
            { id: 'Whatsapp', name: 'Whatsapp' },
            { id: 'Skype', name: 'Skype' },
            { id: 'TWITTERDM', name: 'Twitter-DM' },
            { id: 'FBCHAT', name: 'FBCHAT' },
            { id: 'Telegram', name: 'Telegram' }
        ],
    };

    if (tenantid == 32) {
        $scope.smartTALKActiveAgentAction = {

            availableOptions: [
                { id: '', name: 'Action' },
                { id: 'Transfer', name: 'Transfer' },
            ],
        };
    }
    else {
        $scope.smartTALKActiveAgentAction = {

            availableOptions: [
                { id: '', name: 'Action' },
                { id: 'Transfer', name: 'Transfer' },
                { id: 'IM', name: 'IM' }
            ],
        };
    }
    $scope.smartTALKActiveAgentAction = {

        availableOptions: [
            { id: '', name: 'Action' },
            { id: 'Transfer', name: 'Transfer' },
            //{ id: 'Consult', name: 'Consult' },
            { id: 'IM', name: 'IM' }
        ],
    };

    $scope.smartTALKSupervisoerActiveCustomerAction = {
        //  repeatSelect: 'Select',
        availableOptions: [
            { id: '', name: 'Select' },
            { id: 'Silent Monitoring', name: 'Silent Monitoring' },
            //{ id: 'ReQueue', name: 'ReQueue' },
            { id: 'EndChat', name: 'EndChat' }
        ],
    };
    //Set the default value here.
    $scope.SupActiveCustActionSelection = $scope.smartTALKSupervisoerActiveCustomerAction.availableOptions[1];
    $scope.smartTALKOutboundValue = "";

    $scope.outBoundSelectedChatHistoryInteraction = function (oOBSelectedChatHistoryInteraction) {
        console.log('oOBSelectedChatHistoryInteraction', oOBSelectedChatHistoryInteraction);
        funClickTOOutBound(oOBSelectedChatHistoryInteraction.Channel, oOBSelectedChatHistoryInteraction.MobileNumber);
    }

    $scope.smartTALKSuperviserRequestdata = smartTALKSuperviserRequestdata;
    function smartTALKSuperviserRequestdata(categoryType, supRequestDetail) { //supervisor      
        $scope.supRequestCategoryType = categoryType;
        $scope.supRequestDetail = supRequestDetail;
        if (categoryType === 'GROUPWISE') {
            $('#supLoadIndicator').addClass("fa-spin");
        }
        else if (categoryType === 'AGENTWISE') {
            $('#supLoadIndicator2').addClass("fa-spin");
        }
        else if (categoryType === 'FILTERACTIVEAGENT') {
            // $('#supLoadIndicator2').addClass("fa-spin");
            if ($scope.myCheckboxSup.chkFilter) {
                $("#autoRefreshAgentDetails").addClass("fa-spin");
            }
            else {
                //$scope.smartTALKGetRequestAgentDetailsList = [];
                //return $scope.smartTALKGetRequestAgentDetailsList;
                $scope.supRequestCategoryType = 'GROUPWISE';
            }
        }
        $('#supLoadIndicatorMsg').html('Fetching...');
        if ($scope.myCheckboxSup.chkFilter) {
            $scope.otherAgentRequestCategoryType = 'FILTERACTIVEAGENT';
        }
        funSuperviserRequestdata();
    }

    function smartTALKSuperVisoerAgentAction(x) {
        console.log('smartTALKSuperVisoerAgentAction', x);
        if (x.ACTION == '') {
            x.ACTION = 'Force Logout';
        }
        if (x.ACTION != "") {
            FunAgentAction(x, x.ACTION);

            setTimeout(function v() {
                funSuperviserRequestdata();
            }, 1000);

        }
        else {
            smartTALKNotificationError("Please select action type!");
        }

    }

    function smartTALKSuperVisoerCustomerAction(x) {
        if (x.ACTION != "") {
            FunCustomerAction(x, x.ACTION);
        }
        else {
            smartTALKNotificationError("Please select action type!");
        }
    }
    //FuncationFileView

    $scope.FuncationFileIconeSet = FuncationFileIconeSet;

    $scope.FuncationFileViewSet = FuncationFileViewSet;

    function FuncationFileViewSet(value) {
        if (value.LOCATION) {
            return FuncationFileView(value.LOCATION);
        }
        else {
            return "";
        }
    }

    function FuncationFileIconeSet(value) {

        if (value.LOCATION) {
            return FuncationFileIcone(value.LOCATION);
        }
        else {
            return "";
        }
    }

    $scope.FullScreenImagesPath = "";
    $scope.FullScreenImages = function (x) {
        try {
            $scope.FullScreenImagesPath = $sce.trustAsResourceUrl(x.LOCATION);
            $("#btnImagePrievewModal").click();
        } catch (e) { }
    }

    $scope.smartTALKActiveAgentActionClick = function (x) {
        //console.log('smartTALKActiveAgentActionClick click data', x);
        //console.log('smartTALKActiveSessionList data', $scope.smartTALKActiveSessionList);
        //Kirti check here
        try {

            var IsIMDuplicateFound = false; //this avoids initialiting multiple IMs to same person.
            var restrictInitiatedIMTransfer = false;    //this avoids Transferring intiated IM

            var selectValue = x.ACTION;

            angular.forEach($scope.smartTALKActiveSessionList, function (value, index) {
                if (x.AGENTID == value.PHONENO && value.INTERACTIONTYPE == 'IM') {
                    //console.log('Duplicate IM intitalization found set flag true');
                    IsIMDuplicateFound = true;
                }
                //&& value.ROWNUMBER === $scope.ActiveInteractionRowNumber
                if (selectValue == 'Transfer' && x.AGENTID == value.PHONENO && value.INTERACTIONTYPE == 'IM' && value.SESSIONID == $scope.hdsessionId) {
                    restrictInitiatedIMTransfer = true;
                }
            })


            if (selectValue != "") {
                //Duplicate IM detected
                if (selectValue == "IM" && IsIMDuplicateFound == true) {
                    smartTALKNotificationError("IM already active");
                    return;
                }

                if (selectValue == "Transfer" && restrictInitiatedIMTransfer == true) {
                    smartTALKNotificationError("IM is already initiated, hence, cannot process transfer request");
                    return;
                }
                if (selectValue == "IM") {
                    $scope.TextboxSendMessageEnabled = "0";
                }

                if ($scope.TextboxSendMessageEnabled == "1") {
                    smartTALKNotificationError("Action denied as the chat is already disconnected.");
                }
                else {
                    if (x.Channels.indexOf($scope.hdCHANNELID) != -1) {

                        //document.getElementById('iframeVideoCall').contentWindow.AgentVideoTransfer();
                        $('#iframeVideoCall').attr('src', '');
                        funAgentTranferRequestAction(x, selectValue);

                        setTimeout(function () {
                            if ($scope.smartTALKActiveSessionList.length == 0) {
                                LoadForm();
                            }
                        }, 5000)
                    }
                    else {
                        $scope.smartTALKNotificationError("Cross channel interaction transfers are not allowed");
                        return;
                    }

                }
            }
            else { smartTALKNotificationError("Please select action type!"); }
        } catch (e) { }
        finally {
            if ($scope.LINKTab) {
                if ($scope.ActiveSessions == 0) {
                    _setLinkAutoLoginURL();
                }
            }
        }
    }

    $scope.smartTALKOutBoundChanelListChange = function (x) {
        //alert(x);
    }

    $scope.toggleDetail = function ($index) {
        $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
    };

    $scope.promise = "";

    $scope.promiseAnimationAgent = "";

    $scope.HaskPassport = true;
    $scope.HasPassport = false;

    // starts the interval
    $scope.start = function () {
        // stops any running interval to avoid two intervals running at the same time
        $scope.stop();
        // store the interval promise
        $scope.promise = $interval(CallRequestAgentDetails, 20000);
    };

    // stops the interval
    $scope.stop = function () {
        $interval.cancel($scope.promise);
    };

    // starts the interval
    $scope.startAnimationAgent = function () {
        // stops any running interval to avoid two intervals running at the same time

        $scope.stopAnimationAgent();
        // store the interval promise

        $scope.promiseAnimationAgent = $interval(

            function myfunction() {
                AnimationAgent($scope.smartTALKActiveSessionList)
            }
            , 2500);

        //   $scope.startAnimationAgent();

    };

    // stops the interval
    $scope.stopAnimationAgent = function () {

        $interval.cancel($scope.promiseAnimationAgent);

    };

    //AnimationAgent
    $scope.selectedagentstatusItemChanged = selectedagentstatusItemChanged;
    function selectedagentstatusItemChanged() {
        //$('#agentReadyStateLoader').addClass('fa fa-spinner fa-spin');
        funSendAgentStatus($scope.selectedItem);
        if ($scope.ASW) {

            try {

                if ($scope.selectedItem === 'Ready') {
                    goAvailable();
                }
                else {
                    goOffline();
                }
            }
            catch (e) {
            }
        }

        //setTimeout(function () {LoadForm();$('#agentReadyStateLoader').removeClass('fa fa-spinner fa-spin');}, 5000);
    }

    function smartTALKAgentLogout(logoutReason) {
        var agentLoggedOutReason = '';
        if (logoutReason) {
            agentLoggedOutReason = logoutReason;
        }
        else {
            agentLoggedOutReason = 'Logged out by Agent'
        }

        if ($scope.smartTALKActiveSessionList == null) {
            FunAgentLogout(agentLoggedOutReason);
        }
        else {
            if ($scope.smartTALKActiveSessionList.length == 0) {
                FunAgentLogout(agentLoggedOutReason);
            }
            else {
                smartTALKNotificationError($scope.Translations.GeneralMessageTranslation.DisposeActiveInteractionMsg);
            }
        }
    }

    $scope.ActiveAgentScrolPrev = function () {
        $("#ActiveAgentScrol").scrollTop(-70);
        //console.log('ActiveSessions ', $scope.ActiveSessions);
    }

    $scope.ActiveAgentScrolNext = function () {
        $("#ActiveAgentScrol").scrollTop(70);
        //console.log('ActiveAgentScrolNext',$("#ActiveAgentScrol").scrollTop());
    }

    function ActiveCoustomerDetailsIcone(val) {

        return funActiveChatSasionChanelIcon(val);
    }

    function getActiveCustomerInfoIconChannelWise(customerattributeKey, channelID) {
        return ActiveCustomerInfoIconChannelWise(customerattributeKey, channelID);
    }

    function ActiveCoustomerDetailsDisplay(val) {
        return funActiveCoustomerDetailsDisplay(val);
    }


    function ActiveCoustomerDetailsEditable(val) {
        return funActiveCoustomerEditable(val)
    }

    $scope.ActiveCoustomerDetailsInfo = function (val) {
        return funActiveChatSasionInfo(val);
    }

    $scope.allowDispositionEmailValidation = clientConfig.allowDispositionEmailValidation;

    $scope.dispoformEmailValidate = false;
    $scope.dispoformDispositionValidate = false;
    $scope.dispoformSubDispositionValidate = false;
    $scope.dispoformRemarksValidate = false;
    $scope.disposeFrmEmailCaseValid = false;

    $scope.smartTALKClosed = function () {
        var disposition = ($scope.dispoformDisposition.selected) ? $scope.dispoformDisposition.selected.DispostionName : '';
        var subDisposition = ($scope.dispoformSubDisposition.selected) ? $scope.dispoformSubDisposition.selected.SubdispositionName : '';
        var remark = $scope.dispoformRemarks || '';
        var product = '';
        var name = '';
        var number = '';
        var subSubDisposition = '';
        var productDisposition = '';
        var requestOrigin = $scope.RequestOrigin || '';
        var emailCaseStatus = ($scope.ddlEmailCaseStatus.selected) ? $scope.ddlEmailCaseStatus.selected.EmailCaseStatusName : '';

        funActiveCusomerDispoed($scope.hdPhoneNo, $scope.hdsessionId, remark, disposition, subDisposition, product, name, number, subSubDisposition, productDisposition, requestOrigin, emailCaseStatus);
        _clearDispositionForm();
    }

    $scope.ddlWorkFlow = '';
    $scope.dispoformBotRemarks = '';
    function smartTALKWorkFlowDisposeCoustomer() {

        var ddlWorkFlow = $scope.ddlWorkFlow;
        var dispoformBotRemarks = $scope.dispoformBotRemarks;

        $scope.ddlWorkFlowValidate = false;
        $scope.dispoformBotRemarksValidate = false;


        if (dispoformBotRemarks.trim() == "") {
            $scope.dispoformBotRemarksValidate = true;
            return;
        }

        funBotActiveCusomerDispoed($scope.hdPhoneNo, $scope.hdsessionId, dispoformBotRemarks, ddlWorkFlow);

    }

	$("#to_field").on("change", function(){
		$scope.EmailReplyIP.txtTo = $scope.EmailReplyIP.txtTo ? checkEmails($scope.EmailReplyIP.txtTo) : '';
	});
	
	$("#cc_field").on("change", function(){
		$scope.EmailReplyIP.txtCc = $scope.EmailReplyIP.txtCc ? checkEmails($scope.EmailReplyIP.txtCc) : '';
	});
	
	function checkEmails(data) {
		let pattern = /([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,30})\.([a-z]{2,4}(?:\.[a-z]{2,4})?)/gm;
		let removeSPace = data.replace(/\s/g, '');
		removeSPace = removeSPace.replace(/;/g, ',');
		removeSPace = removeSPace.match(pattern);
		if (removeSPace == null || removeSPace.length <= 0)
		{
			smartTALKNotificationError('Invalid email address');
			return;
		}

		let validEmail = [];
		for (let i=0; i < removeSPace.length; i++) {
			let patterns = /([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{2,30})\.([a-z]{2,4}(?:\.[a-z]{2,4})?)/;
			result = patterns.test(removeSPace[i]);
			if (result == false) {
				smartTALKNotificationError('Invalid email address');
				break;
			}
			validEmail.push(removeSPace[i]);
		}

		return validEmail.length >= 1 ? validEmail.join(',') : '';
    }

    function smartTALKDisposeCoustomer() {
        //var IsVideoEnded = (document.getElementById('iframeVideoCall').contentWindow.document.querySelector('#videos').children[0]) ? true : false;
        //if (IsVideoEnded) {
        //    smartTALKNotificationError('Kindly end video sessoin and then dispose the chat !!');
        //    return;
        //}
		
		var reg = /[!@#$%^&*(),.?":{}|<>]/g;
		$scope.invalidCharsinRemarks = false
		
		if ($scope.dispoformRemarks.match(reg)) {
            smartTALKNotificationError("no special characters allowed in remarks field.");
            return;
        }

        //#region Disposition Validation
        var Disposition = '';
        var SubDisposition = 'true';
        var SubSubDispositionName = '';
        var ProductDisposition = '';
        var Remarks = '';
        var LeadID = '';
        var Product = '';
        var email = $scope.dispoformEmail || '';
        var name = $scope.dispoformName || '';
        var number = $scope.dispoformNumber || '';
        Remarks = $scope.dispoformRemarks || '';
        LeadID = $scope.dispoformLeadID || '';

        var EmailCaseStatus = '';
        var IsEmailChannel = ($scope.hdCHANNELID == 'EMAIL') ? true : false;

        if ('selected' in $scope.dispoformDisposition && 'DispostionName' in $scope.dispoformDisposition.selected) { Disposition = $scope.dispoformDisposition.selected.DispostionName; }
        // if ('selected' in $scope.dispoformSubDisposition && 'SubdispositionName' in $scope.dispoformSubDisposition.selected) { SubDisposition = $scope.dispoformSubDisposition.selected.SubdispositionName; }
        if ($scope.SubSubDispo) {
            if ('selected' in $scope.SubSubdispoformSubDisposition && 'SubdispositionName' in $scope.SubSubdispoformSubDisposition.selected) { SubSubDispositionName = $scope.SubSubdispoformSubDisposition.selected.SubdispositionName; }
        }
        if ($scope.DispoProduct) {
            if ('selected' in $scope.productformProduct && 'ProductName' in $scope.productformProduct.selected) { ProductDisposition = $scope.productformProduct.selected.ProductName; }
        }
        if (IsEmailChannel) {
            if ('selected' in $scope.ddlEmailCaseStatus && 'EmailCaseStatusName' in $scope.ddlEmailCaseStatus.selected) { EmailCaseStatus = $scope.ddlEmailCaseStatus.selected.EmailCaseStatusName; }
        }
        if (Disposition.trim() == "") { $scope.dispoformDispositionValidate = true; } else { $scope.dispoformDispositionValidate = false; }
        if (SubDisposition.trim() == "") { $scope.dispoformSubDispositionValidate = true; } else { $scope.dispoformSubDispositionValidate = false; }

        if (Remarks.trim() == "") {
            if (clientConfig.IsDispositionRemarkRequired) { $scope.dispoformRemarksValidate = true; return; } else { $scope.dispoformRemarksValidate = false; }
        }
        else { $scope.dispoformRemarksValidate = false; }


        if ($scope.allowDispositionEmailValidation == true) {
            if (email.trim() == "") { $scope.dispoformEmailValidate = true; return; } else { $scope.dispoformEmailValidate = false; }
        } else {
            $scope.dispoformEmailValidate = false;
        }

        if (IsEmailChannel) { if (!EmailCaseStatus) { $scope.disposeFrmEmailCaseValid = true; return; } else { $scope.disposeFrmEmailCaseValid = false; } }

        try {

            if ($scope.ASW) {
                funAgentDisposeVoice($scope.hdCHANNELID, $scope.CHANNELSOURCE, $scope.PhoneNo);
            }
        } catch (e) {

        }

        //#endregion

        //#region Perform Disposition
        if (SubDisposition && Disposition) {
            if ($scope.chkIsInteractionParked && !IsEmailChannel) {
                _processParkedInteractionData();
            }
            else if (IsEmailChannel) {
                if ($scope.CRMTabConfig.InsertTicketInfoIntoBusinessCRM) {
                    //#region api call for encryption auth token and update or insert ticket details
                    _updateTicketDetails();// thyrocare client requirement
                    //#endregion
                }

                var _canValidate = ($scope.EmailReplyIP.IsDirectDispose) ? false : true;
                var emailDisposeStatus = sendDisposeMail(_canValidate);

                if (emailDisposeStatus.IsOnlyDispose && emailDisposeStatus.CanProceed) {
                    //Direct Disposal.
                    $scope.smartTALKClosed();
                }
                if (!emailDisposeStatus.IsOnlyDispose && emailDisposeStatus.CanProceed) {					
					let toEmail = $scope.EmailReplyIP.txtTo ? checkEmails($scope.EmailReplyIP.txtTo) : '';
					if(toEmail == ''){
						smartTALKNotificationError("Please enter To field value");
						return;
					}
                    triggerSendMail();
                }

                //#region emailattachment calulate
                if ($scope.INTERACTIONTYPE == "OUTBOUND" && $scope.UploadEmailAttachments.length > 0) {
                    arrTotalEmailAttachment = [];
                    for (i = 0; i < $scope.UploadEmailAttachments.length; i++) {
                        arrTotalEmailAttachment.push({
                            "FileName": $scope.UploadEmailAttachments[i].FileName,
                            "FileSize": $scope.UploadEmailAttachments[i].Size,
                            "CESESSIONID": $scope.UploadEmailAttachments[i].CESessionId
                        });
                    }
                    arrTotalEmailAttachment = arrTotalEmailAttachment.filter(function (value, index, arr) {
                        return value.CESESSIONID != $scope.hdsessionId;
                    });

                    TotalEmailAttachmentSize = funCalcTotalEmailSize(arrTotalEmailAttachment);
                    TotalEmailAttachmentSize = TotalEmailAttachmentSize + ((new Blob([$scope.editorModel]).size == 0) ? 0 : new Blob([$scope.editorModel]).size);
                }

                //#endregion emailattachment calulate
            }
            else {
				
                funActiveCusomerDispoed($scope.hdPhoneNo, $scope.hdsessionId, $scope.dispoformRemarks, $scope.dispoformDisposition.selected.DispostionName, $scope.dispoformSubDisposition.selected.SubdispositionName, Product, $scope.dispoformName, $scope.dispoformNumber, SubSubDispositionName, ProductDisposition, $scope.RequestOrigin, EmailCaseStatus);
				
			}
        }
        //#endregion        

        //#region Reset FSM KM LINK CRM VideoCalling CoBrowsing iframe during Disposition
        try {

            if ($scope.FSMTab == true) {
                $scope.FSMLoginURL = clientConfig.FSMLinkLoginURL;
                $scope.FSMDataURL = clientConfig.FSMLinkDataURL;
                //console.log('$scope.FSMDataURL', $scope.FSMDataURL);
                $('#iframeFSM').prop('src', $scope.FSMLoginURL);
            }
            if ($scope.KMTab == true) {
                $scope.KMLoginURL = clientConfig.KMLinkLoginURL;
                $scope.KMDataURL = clientConfig.KMLinkDataURL;

                $('#iframeKM').prop('src', $scope.KMLoginURL);
            }
            if ($scope.LINKTab == true) {
                $scope.LINKLoginURL = clientConfig.LINKLinkLoginURL;
                $scope.LINKDataURL = clientConfig.LINKLinkDataURL;
                _setLinkAutoLoginURL();
            }
            if ($scope.CRMTabConfig.IsCRMTabDisplayed == true) {
                //$('#iframecrm').prop('src', $scope.CRMTabConfig.CRMLinkLoginURL)
            }
            if ($scope.VideoCallingTabConfig.IsVideoCallingTabDisplayed) {
                $('#iframeVideoCall').prop('src', '');
            }
            if ($scope.CoBrowsingTabConfig.IsCoBrowsingTabDisplayed) {
                $('#iframeCoBrowsing').prop('src', '');
            }
            if ($scope.ShadowBrowseTabConfig.IsShadowBrowseTabDisplayed) {
                $('#shadowBrowseImage').html('');
            }

        }
        catch (e) { }
        //#endregion

        $scope.smartTALKCustomerHistoryList = [];

        //#region Mark Blacklist
        if ($scope.EnableBlackListingOfCustomer) {
            if ($scope.smartTALKCustomerDetailsList.length > 0) {
                var OBJBlacklist = {};
                OBJBlacklist.MOBILENUMBER = $scope.smartTALKCustomerDetailsList[2].Value;
                OBJBlacklist.DESCRIPTION = $scope.dispoformRemarks;
                OBJBlacklist.EMAILID = $scope.smartTALKCustomerDetailsList[3].Value;
                OBJBlacklist.CREATEDBY = $scope.AgentLoginID;
                OBJBlacklist.TWITERID = $scope.smartTALKCustomerDetailsList[1].Value;
                OBJBlacklist.FACEBOOKID = $scope.smartTALKCustomerDetailsList[2].Value;
                OBJBlacklist.CLIENTIP = '';
                OBJBlacklist.IPADRESS = '';
                OBJBlacklist.COUNTRY = '';
                OBJBlacklist.PROCESSID = $('#hdnAgentProcessId').val();
                OBJBlacklist.CHANNELSOURCEID = $scope.hdCHANNELID;
                OBJBlacklist.CHANNELID = $scope.hdCHANNELID;

                _blacklistedCustomer(OBJBlacklist);
            }
        }
        //#endregion Blacklist


        if ($scope.hdCHANNELID == 'EMAIL') {
            $scope.ReplyScreen = false;
        }

        //Added By Priyanka
        //TODO : Jay HELP
        if (clientConfig.ModuleConfig.IsSAPModuleEnabled && $scope.smartTALKCustomerDetailsList.length > 0) {

            var _Sap_Channel = "CHAT"
            if ($scope.ActiveChannel == "VOICE") { _Sap_Channel = "CALL"; }


            var strTranscript = getTranscript();
            EndChatEventToSAP($scope.hdsessionId, _Sap_Channel, 'UPDATEACTIVITY', 'END',
                $scope.smartTALKCustomerDetailsList[3].Value, strTranscript, $scope.smartTALKCustomerDetailsList[2].Value, $scope.hdCHANNELID);
        }
    }

    //Added By Priyanka
    function EndChatEventToSAP(strSessionId, strType, strEventType, strAction, strEmail, strTranscript, PhoneNumber, strChannel) {

        //strTranscript='Hi Avinash';
        var strSessionIdTemp = strSessionId.replace(/\|/g, '').replace(/\-/g, '');
        var SessionIDNew = strSessionIdTemp.substr(strSessionIdTemp.length - 20);

        var oPayload = null;

        if (strChannel.toUpperCase() == 'EMAIL') {
            oPayload = {
                payload: {
                    Type: strType,
                    EventType: strEventType,
                    Action: strAction,
                    Email: strEmail,
                    ExternalReferenceID: SessionIDNew,
                    Transcript: strTranscript
                }
            };
        }
        else if (strChannel.toUpperCase() == 'VOICE') {

            oPayload = {
                payload: {
                    Type: 'CALL',
                    EventType: 'CallEnded',
                    Action: strAction,
                    ExternalReferenceID: SessionIDNew,
                    ANI: PhoneNumber,
                    RecordingId: ''
                }
            };

        } else {
            oPayload = {
                payload: {
                    Type: strType,
                    EventType: strEventType,
                    Action: strAction,
                    Email: '',
                    ExternalReferenceID: SessionIDNew,
                    Transcript: strTranscript,
                    ANI: PhoneNumber
                }
            };

        }
        // ,Transcript: strTranscript
        var sPayload = null;

        sPayload = JSON.stringify(oPayload);

        console.log('End Event payload : ' + sPayload);
        window.parent.postMessage(oPayload, "*");
        // window.postMessage(oPayload, "*");

        SendAttachmentDetailsToSAP(strSessionId, SessionIDNew);
    }

    function SendAttachmentDetailsToSAP(sessionId, shortSessionId) {

        var data = {
            SessionId: sessionId,
            ShortSessionId: shortSessionId,
            AttachmentURLs: []
        }

        $.ajax({
            url: oAgentURL.SAPAttachmentSavingURL,
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (d) {
                //alert("Saved Successfully");
            },
            error: function () {
                //alert("Error please try again");
            }
        });

    }

    //Added By Priyanka
    //copy my chat history trasncript (Used for SAP Integration)
    function getTranscript() {

        //for (let [index, val] of _arrChat.entries()) {
        //    if (val.MSG.indexOf('Please join this below video link to have a video call now') !== -1) {
        //        let _msg = _arrChat[index].MSG;
        //        _msg = _msg.match(UIDRegex, _msg);
        //    }
        //}

        var str = '';
        for (let [index, val] of $scope.smartTALKChatList.entries()) {
            if ($scope.smartTALKChatList[index].TYPE.toUpperCase() == 'SYSTEM' ||
                $scope.smartTALKChatList[index].TYPE.toUpperCase() == 'AGENT' ||
                $scope.smartTALKChatList[index].TYPE.toUpperCase() == 'CUSTOMER') {

                str = str + $scope.smartTALKChatList[index].TYPE.toUpperCase() + " : (" +
                    $scope.smartTALKChatList[index].TIME + ") : " +
                    $scope.smartTALKChatList[index].MSG.toUpperCase() + " <br/> ";
            }

        }

        //for (var key in $scope.smartTALKChatList) {
        //    if ($scope.smartTALKChatList[key].TYPE.toUpperCase() == 'SYSTEM' ||
        //        $scope.smartTALKChatList[key].TYPE.toUpperCase() == 'AGENT' ||
        //        $scope.smartTALKChatList[key].TYPE.toUpperCase() == 'CUSTOMER') {

        //        str = str + $scope.smartTALKChatList[key].TYPE.toUpperCase() + " : (" +
        //            $scope.smartTALKChatList[key].TIME + ") : " +
        //            $scope.smartTALKChatList[key].MSG.toUpperCase() + " <br/> ";
        //    }
        //}

        str = str.replace(/<br\s*[\/]?>/gi, "\n");
        str = str.replace(/&GT;/g, "");
        str = str.replace(/&LT;/g, "");
        str = str.replace(/BR\//g, "");
        return str;
    }

    function _processParkedInteractionData() {
        let IsManualPark = $scope.chkIsInteractionParked ? true : false;

        if ($scope.hdCHANNELID == 'EMAIL' && ($scope.ddlEmailCaseStatus != '' || $scope.ddlEmailCaseStatus != null)) {
            var IsAutoParkValid = $scope.AutoParkInteraction.some(function (autoPark) {
                return (
                    autoPark.Key.toUpperCase() ==
                    $scope.ddlEmailCaseStatus.selected.EmailCaseStatusName.toUpperCase() &&
                    autoPark.IsDisplayed
                );
            });
        }

        let parkDtTm = IsManualPark ? $scope.dateParkedinteraction : AddMinToDateWhileParkingInteraction();
        if (IsManualPark || IsAutoParkValid) {
            var remark = $scope.dispoformRemarks || "";
            var disposition = $scope.dispoformDisposition.selected ? $scope.dispoformDisposition.selected.DispostionName : "";
            var subDisposition = $scope.dispoformSubDisposition.selected ? $scope.dispoformSubDisposition.selected.SubdispositionName : "";
            var subSubDisposition = "";
            var emailCaseStatus = $scope.ddlEmailCaseStatus.selected ? $scope.ddlEmailCaseStatus.selected.EmailCaseStatusName : "";
            if (parkDtTm) {
                var parkingRQ = _setParkingRQParams($scope.hdPhoneNo, $scope.hdsessionId, remark, parkDtTm, $scope.ActiveCustName, "", "", disposition, subDisposition, subSubDisposition);
                ActivesmartParkedinteraction(parkingRQ);
                _clearParkedInteractionDispositionForm();
            } else {
                smartTALKNotificationError("Please select parking Date and Time.");
                return;
            }
        }
    }

    $scope.SaveBlackListedData = function (Flag) {
        if (Flag) {
            $scope.EnableBlackListingOfCustomerContainer = true;
            //$scope.ActiveAgentID = $scope().smartTALKCustomerDetailsList[0].Value; //name
            $scope.CHANNELID = $scope.CHANNELID
            $scope.Cust_Name = $scope.smartTALKCustomerDetailsList[0].Value;
            $scope.CUSTID = $scope.smartTALKCustomerDetailsList[3].Value;
            $scope.MOBILENO = $scope.smartTALKCustomerDetailsList[2].Value;
        }
    }

    $scope.CloseEmailContainer = function () {
        $scope.EnableBlackListingOfCustomerContainer = false;
    }

    function smartTALKActiveChanelIcone(x) {
        return ActiveSasionChanelIcon(x.CHANNELID, x.CHANNELSOURCE);
    }

    function smartTALKChatActiveChanelIcone(chanelname) {
        return ActiveChatSasionChanelIcon(chanelname);
    }

    function smartTALKCustomerStatus(status) {
        return CsutomerSatatus(status);
    }

    //#region Interaction Toggle Click Operation
    function smartTALKClickActiveSession(x, i, e) {



        $('#InteractionWaitModal').modal('show');
        try {
            //#region to check interaction is active or disconnect
            $scope.IsInteractionReadyToDispose = (x.CUSTSTATUS.indexOf("DISPOSE.png") > 0) ? true : false;
            //#endregion
            //#region Toggle Interaction 
            _mobileInteractionToggle(e);
            _showWrapFormTextLoader();
            _setPostValues(x);
            _setCloseChatValues(x);

            $scope.MessageDispalyCount = $scope.MessageDispalyCountDefault;
            $scope.TextboxSendMessageEnabled = x.SESSIONDISPOSE;
            $scope.hdsessionId = "";

            var ActiveAgentID = x.PHONENO;
            $scope.PhoneNo = x.PHONENO;
            var CHANNELID = x.CHANNELID;
            var CutName = x.NAME;
            var sessionId = x.SESSIONID;
            var CUSTID = x.CUSTID;
            var textChatKey = x.SESSIONID + '_chatMsg';

            $scope.INTERACTIONTYPE = x.INTERACTIONTYPE;
            $scope.ActivecustomerPIC = x.PROFILEPIC;
            $scope.ActiveStatus = smartTALKCustomerStatus(x);
            $scope.ActiveChannel = smartTALKChatActiveChanelIcone(x.CHANNELID);
            $scope.CHANNELSOURCE = x.CHANNELSOURCE;
            $scope.ActiveCustName = CutName;
            $scope.hdsessionId = sessionId;
            $scope.hdPhoneNo = ActiveAgentID;
            $scope.hdCHANNELID = CHANNELID;
            $scope.CUSTID = CUSTID;
            $scope.ActiveInteractionRowNumber = x.ROWNUMBER
            $scope.chkIsInteractionParked = false;
            $scope.RequestOrigin = x.REQUESTORIGIN;
            ($scope.hdCHANNELID.toUpperCase() == 'SMS') ? document.getElementById("txtmessage").maxLength = "160" : document.getElementById("txtmessage").maxLength = "4000";

            _setEmailChannelParams(x, i);
            _disableChatTextBox();
            _maintainChatTextState(textChatKey);
			
			try {
                if ($scope.hdCHANNELID == 'WHATSAPP') {
                    $scope.DynamicCustomerHistorySearchParams = clientConfig.customerAttributeNameWhatsapp;
                }
                else if ($scope.hdCHANNELID == 'WEBCHAT') {
                    $scope.DynamicCustomerHistorySearchParams = clientConfig.customerAttributeNameWebchat;
                }
                else {
                    $scope.DynamicCustomerHistorySearchParams = clientConfig.customerAttributeName;
                }
            }
            catch (e) {}

            if ($scope.hdsessionId != "") { ActivehandletimeUpdateP($scope.hdsessionId); }
            Promise.all([funActiveCusomer(ActiveAgentID, ActiveAgentID, sessionId, CHANNELID),
            FunFirstTimeCoustomerList(sessionId),
            GetCustomerinfo(ActiveAgentID)])
                .then((result) => { })
                .catch((error) => { console.log('Toggle Intr Catch', error); })
                .finally(() => { _hideWaitModal(); });

            $scope.WebchartHeadInfoList = [];
            $scope.WebchartCrolingList = [];

            $scope.smartTALKCustomerHistoryList = [];
            $scope.smartTALKCustomerHistorydetailsList = [];
            $scope.Disposition = "";
            $scope.SubDisposition = "";
            $scope.Remarks = "";

            x.UNREADCOUNT = "";
            $scope.smartTALKActiveSessionList[i] = x;

            _processVideoCallOnInteractionClick(x);
            _processCoBrowseOnInteractionClick(x);

            //setting the session ID key as local storage.
            if ($scope.WRAPEFROM !== true) {
                if (sessionStorage.getItem(sessionId) === null) {
                    sessionStorage.setItem(sessionId, '');
                }
            }
            //#endregion

            if ($scope.hdCHANNELID == "EMAIL" && $scope.INTERACTIONTYPE == "OUTBOUND") {
                $scope.editorModel = $scope.editorModel + " " + $scope.DefaultAgentSignature;
            }
        }
        catch (e) { _hideWaitModal(); console.log('smartTALKClickActiveSession() catch error'); }
        finally {
            _CloseDispositionSlider();
            _forceScrollBottomDelayed();

            setTimeout(function () {
                if ($scope.hdCHANNELID == 'COBROWSE') {
                    $('#CoBrowsingTab a').click()
                }
                else if ($scope.hdCHANNELID == 'VIDEO') {
                    //do some logic...
                    $scope.transposeVideoFrame('Custom');
                }
                //else {
                //    $('#newchattab a').click();
                //}



                //#region Finally Timeout
                if ($scope.smartTALKCustomerDetailsList.length == 0) { }
                else {
                    $scope.dispoformName = ($scope.smartTALKCustomerDetailsList[0]) ? $scope.smartTALKCustomerDetailsList[0].Value : '';
                    $scope.dispoformNumber = ($scope.smartTALKCustomerDetailsList[2]) ? $scope.smartTALKCustomerDetailsList[2].Value : '';
                    $scope.dispoformEmail = ($scope.smartTALKCustomerDetailsList[3]) ? $scope.smartTALKCustomerDetailsList[3].Value : '';
                    $('#spnEmailSentTm').html($scope.smartTALKCustomerDetailsList[8].Value);
                }

                var Custemail = ($scope.smartTALKCustomerDetailsList[3]) ? $scope.smartTALKCustomerDetailsList[3].Value : '';
                var mobileNo = ($scope.smartTALKCustomerDetailsList[2]) ? $scope.smartTALKCustomerDetailsList[2].Value : '';

                var iframe = $("#iframecrm").attr("src", $(this).attr("href"));
                iframe = $scope.CRMTabConfig.CRMLinkDataURL || '';
                iframe = iframe.replace("$user$", Custemail);
                iframe = iframe.replace("$CustomerAttribute2$", mobileNo);
                iframe = iframe.replace("$queuename$", $scope.agent_ID);
                iframe = iframe.replace("$sessionid$", $scope.hdsessionId);
                var res = $scope.hdsessionId.split("|");
                iframe = iframe.replace("$UID$", res[0]);

                $('#iframecrm').attr('src', iframe);
                //#region Setting the LinkDataURL :: Changes By Manish 30-01-2020 4.18PM
                if (clientConfig.IsLINKTabDisplayed) {
                    var LINKDataURL = clientConfig.LINKLinkDataURL || '';
                    if ($scope.hdCHANNELID == 'WEBCHAT') {
                        LINKDataURL = LINKDataURL.replace('$$CHANNELID$$', $scope.hdCHANNELID);
                        LINKDataURL = LINKDataURL.replace('$$EMAILID$$', $scope.smartTALKCustomerDetailsList[3].Value); //cust email id
                        LINKDataURL = LINKDataURL.replace('$$MOBILENO$$', $scope.smartTALKCustomerDetailsList[2].Value);
                        LINKDataURL = LINKDataURL.replace('$$POLICYNO$$', '');
                        LINKDataURL = LINKDataURL.replace('$$FBID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$WHATSAPPID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$TWITTERID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$CASEID$$', $scope.smartTALKCustomerDetailsList[13].Value); //ticket no
                        LINKDataURL = LINKDataURL.replace('$$AGENTEMAILID$$', $scope.AgentPrerequisiteData.AgentEmailId); //agent email id
                    }
                    else if ($scope.hdCHANNELID == 'FB' || $scope.hdCHANNELID == 'FBCHAT') {
                        LINKDataURL = LINKDataURL.replace('$$CHANNELID$$', $scope.hdCHANNELID);
                        LINKDataURL = LINKDataURL.replace('$$EMAILID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$MOBILENO$$', $scope.smartTALKCustomerDetailsList[2].Value);
                        LINKDataURL = LINKDataURL.replace('$$FBID$$', $scope.PhoneNo);
                        LINKDataURL = LINKDataURL.replace('$$WHATSAPPID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$TWITTERID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$INSTAGRAMID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$POLICYNO$$', '');
                        LINKDataURL = LINKDataURL.replace('$$CASEID$$', $scope.smartTALKCustomerDetailsList[13].Value); //ticket no
                        LINKDataURL = LINKDataURL.replace('$$AGENETMAILID$$', $scope.AgentPrerequisiteData.AgentEmailId); //agent email id
                    }
                    else if ($scope.hdCHANNELID == 'INSTAGRAM') {
                        LINKDataURL = LINKDataURL.replace('$$CHANNELID$$', $scope.hdCHANNELID);
                        LINKDataURL = LINKDataURL.replace('$$EMAILID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$MOBILENO$$', $scope.smartTALKCustomerDetailsList[2].Value);
                        LINKDataURL = LINKDataURL.replace('$$FBID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$WHATSAPPID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$TWITTERID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$INSTAGRAMID$$', $scope.PhoneNo);
                        LINKDataURL = LINKDataURL.replace('$$POLICYNO$$', '');
                        LINKDataURL = LINKDataURL.replace('$$CASEID$$', $scope.smartTALKCustomerDetailsList[13].Value); //ticket no
                        LINKDataURL = LINKDataURL.replace('$$AGENTEMAILID$$', $scope.AgentPrerequisiteData.AgentEmailId); //agent email id
                    }
                    else if ($scope.hdCHANNELID == 'TWITTER') {
                        LINKDataURL = LINKDataURL.replace('$$CHANNELID$$', $scope.hdCHANNELID);
                        LINKDataURL = LINKDataURL.replace('$$EMAILID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$MOBILENO$$', $scope.smartTALKCustomerDetailsList[2].Value);
                        LINKDataURL = LINKDataURL.replace('$$FBID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$WHATSAPPID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$TWITTERID$$', $scope.PhoneNo);
                        LINKDataURL = LINKDataURL.replace('$$INSTAGRAMID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$POLICYNO$$', '');
                        LINKDataURL = LINKDataURL.replace('$$CASEID$$', $scope.smartTALKCustomerDetailsList[13].Value); //ticket no
                        LINKDataURL = LINKDataURL.replace('$$AGENTEMAILID$$', $scope.AgentPrerequisiteData.AgentEmailId); //agent email id
                    }
                    else if ($scope.hdCHANNELID == 'WHATSAPP') {
                        LINKDataURL = LINKDataURL.replace('$$CHANNELID$$', $scope.hdCHANNELID);
                        LINKDataURL = LINKDataURL.replace('$$EMAILID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$MOBILENO$$', $scope.smartTALKCustomerDetailsList[2].Value);
                        LINKDataURL = LINKDataURL.replace('$$FBID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$WHATSAPPID$$', $scope.PhoneNo);
                        LINKDataURL = LINKDataURL.replace('$$TWITTERID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$INSTAGRAMID$$', '');
                        LINKDataURL = LINKDataURL.replace('$$POLICYNO$$', '');
                        LINKDataURL = LINKDataURL.replace('$$CASEID$$', $scope.smartTALKCustomerDetailsList[13].Value); //ticket no
                        LINKDataURL = LINKDataURL.replace('$$AGENTEMAILID$$', $scope.AgentPrerequisiteData.AgentEmailId); //agent email id
                    }
                    else if ($scope.hdCHANNELID == 'EMAIL') {
                        LINKDataURL = LINKDataURL.replace('$$CASEID$$', $scope.smartTALKCustomerDetailsList[4].Value); //Case ID      
                        LINKDataURL = LINKDataURL.replace('$$AGENTID$$', $scope.AGENTID);
                        LINKDataURL = LINKDataURL.replace('$$SESSIONID$$', $scope.hdsessionId);
                        LINKDataURL = LINKDataURL.replace('$$PHONENO$$', $scope.hdPhoneNo);
                        LINKDataURL = LINKDataURL.replace('$$AGENTEMAILID$$', $scope.AgentPrerequisiteData.AgentEmailId); //agent email id
                        LINKDataURL = LINKDataURL.replace('$$DISPOSALKEY$$', 'DEMO18'); //Disposition key for Link                                                
                        console.log('Ctrl', LINKDataURL);
                    }
                    $('#iframeLINK').prop('src', LINKDataURL);
                }
                //#endregion

                //#endregion
            }, 1400);
        }
    }

    function _forceScrollBottomDelayed() {
        setTimeout(function v() { $("#ChatArea").find("#bluescroll").scrollTop(999999999999999999); }, 1500);
    }
    function _setEmailChannelParams(x, i) {
        if (x.CHANNELID == "EMAIL") {
            $scope.EMAILFROM = $scope.replaceEmailContact($scope.smartTALKActiveSessionList[i].FROMEMAIL);
            $scope.TOEMAIL = $scope.replaceEmailContact($scope.smartTALKActiveSessionList[i].TOEMAIL);
            $scope.SUBJECT = $filter('EmailFilterSpecialChar')($scope.replaceEmailContact($scope.smartTALKActiveSessionList[i].SUBJECT));
            $scope.BODY = $scope.replaceEmailContact($scope.smartTALKActiveSessionList[i].BODY);
            $scope.CCEMAIL = $scope.replaceEmailContact($scope.smartTALKActiveSessionList[i].CCEMAIL);
            $scope.BCCEMAIL = $scope.replaceEmailContact($scope.smartTALKActiveSessionList[i].BCCEMAIL);
            $scope.EMAILPHONENO = $scope.smartTALKActiveSessionList[i].PHONENO;
            $scope.ISATTACHEMENT = x.ISATTACHEMENT;
            $scope.ATTACHEMENTURL = x.ATTACHEMENTURL;


            if (x.INTERACTIONTYPE == 'OUTBOUND') {
                var _fromEmail = (typeof $scope.EMAILFROM === 'object') ? $scope.EMAILFROM : $scope.EMAILFROM;
                var _toEmail = (typeof $scope.TOEMAIL === 'object') ? $scope.TOEMAIL : $scope.TOEMAIL;
                var _ccEmail = (typeof $scope.CCEMAIL === 'object') ? $scope.TOEMAIL : $scope.CCEMAIL;
                var _subject = (typeof $scope.SUBJECT === 'object') ? $scope.SUBJECT : $scope.SUBJECT;
                var _body = (typeof $scope.BODY === 'object') ? $scope.BODY : $scope.BODY;

                if (x.REQUESTORIGIN == 'SELF') {
                    $scope.ReplyScreen = true;
                    $scope.EmailReplyIP.txtFrom = _fromEmail;
                    $scope.EmailReplyIP.txtTo = _toEmail;
                    $scope.EmailReplyIP.txtCc = '';
                    $scope.EmailReplyIP.txtBcc = '';
                    $scope.EmailReplyIP.txtSubject = '';
                    $scope.EmailReplyIP.txtBody = '';
                    $scope.editorModel = '';
                }
                else if (x.REQUESTORIGIN == 'CE') {
                    //This OB represents OB from Missed,Park,Cust/Mychat Hist.

                    $scope.ReplyScreen = false;
                }
                _SetMailboxDropdown(_fromEmail, x.INTERACTIONTYPE);
            }

            if (x.INTERACTIONTYPE == 'INBOUND') {
                $scope.ReplyScreen = false;

                $scope.EmailReplyIP.txtTo = '';
                $scope.EmailReplyIP.txtFrom = '';
                $scope.EmailReplyIP.txtCc = '';
                $scope.EmailReplyIP.txtBcc = '';
                $scope.EmailReplyIP.txtSubject = '';
                $scope.EmailReplyIP.txtBody = '';
                $scope.editorModel = '';
				
            }
            $scope.EmailReplyIP.IsDirectDispose = false;
            $scope.EmailAttachments = [];
            var _url = $scope.ATTACHEMENTURL;
            var _arrUrl = _url.split("|");
            for (var i = 0; i < _arrUrl.length; i++) {
                var oAttachments = getFilename(_arrUrl[i]);
                if (oAttachments.ext && oAttachments.filename && oAttachments.link) {
                    $scope.EmailAttachments.push(oAttachments);
                }
            }
            $('#spnEmailSentTm').html('');
        }
    }

    function _maintainChatTextState(textChatKey) {
        if (sessionStorage.getItem(textChatKey) === null) {
            sessionStorage.setItem(textChatKey, "");
        }
        if (sessionStorage.getItem(textChatKey) !== null) {
            $scope.txtmessage = sessionStorage.getItem(textChatKey);
        }
    }

    function _disableChatTextBox() {
        if ($scope.TextboxSendMessageEnabled == "1") {
            $("#txtmessage, #txtmessageExpand").attr("disabled", "disabled");
        }
        else {
            $("#txtmessage, #txtmessageExpand").removeAttr("disabled");
        }
    }

    function _setCloseChatValues(x) {
        if (x.INTERACTIONTYPE.toUpperCase() == "INBOUND" || x.INTERACTIONTYPE.toUpperCase() == "OUTBOUND" || x.INTERACTIONTYPE.toUpperCase() == "TRANSFER") {
            $scope.CloseChat = false;
        }
        else {
            $scope.CloseChat = true;
        }
    }

    function _showWrapFormTextLoader() {
        if ($scope.WRAPEFROM == true) {
            $('#iframewrapform').removeAttr('src');
            $('#wrapFormLoadIndicator').show();
        }
    }

    function _setPostValues(x) {
        if (x.CHANNELID.toUpperCase() == 'CRAWL') {
            $scope.post = true;
            if (x.CHANNELSOURCE.toUpperCase() == 'TWITTER') {
                $scope.postTWITER = true;
            }
            else {
                $scope.postTWITER = false;
            }
            if (x.CHANNELSOURCE.toUpperCase() == 'FB') {
                $scope.postFB = true;
            }
            else {
                $scope.postFB = false;
            }
        }
        else {
            $scope.post = false;
            $scope.postTWITER = false;
        }
    }

    function _processVideoCallOnInteractionClick(x) {
        if ($scope.VideoCallingTabConfig.IsVideoCallingTabDisplayed) {
            $scope.VIDEOCHATSESSIONID = x.VIDEOCHATSESSIONID;

            switch (x.VIDEOCHATSTATUS.toUpperCase()) {
                case "START":
                    $scope.VIDEOCHATSTATUS = " Started...";
                    break;
                case "END":
                    $scope.VIDEOCHATSTATUS = " Disconnected...";
                    break;
                case "RELOAD":
                    $scope.VIDEOCHATSTATUS = " Restarted...";
                    break;
                default:
                    $scope.VIDEOCHATSTATUS = "";
                    break;
            }
            $scope.RefreshVideoCall();
        }
    }

    function _processCoBrowseOnInteractionClick(x) {
        $scope.COBROWSINGSESSIONID = x.COBROWSINGSESSIONID;
        switch (x.COBROWSINGSTATUS.toUpperCase()) {
            case "START":
                $scope.COBROWSINGSTATUS = " Started...";
                break;
            case "END":
                $scope.COBROWSINGSTATUS = " Disconnected...";
                break;
            case "RELOAD":
                $scope.COBROWSINGSTATUS = " Restarted...";
                break;
            default:
                $scope.COBROWSINGSTATUS = "";
                break;
        }

        if ($scope.CoBrowsingTabConfig.IsCoBrowsingTabDisplayed) {
            var oCOBROWSINGSTATUS = '';
            var oCOBROWSINGSESSIONID = '';

            for (var i = 0; i < $scope.smartTALKActiveSessionList.length; i++) {
                if ($scope.hdCHANNELID != 'MOBILE-APP' && $scope.hdsessionId === $scope.smartTALKActiveSessionList[i].SESSIONID) {
                    oCOBROWSINGSTATUS = $scope.smartTALKActiveSessionList[i].COBROWSINGSTATUS
                    oCOBROWSINGSESSIONID = $scope.smartTALKActiveSessionList[i].COBROWSINGSESSIONID
                }
                if ($scope.hdCHANNELID == 'MOBILE-APP' && $scope.hdsessionId === $scope.smartTALKActiveSessionList[i].SESSIONID) {
                    oCOBROWSINGSTATUS = $scope.smartTALKActiveSessionList[i].COBROWSINGSTATUS
                    oCOBROWSINGSESSIONID = $scope.smartTALKActiveSessionList[i].PHONENO
                }
            }

            if ($scope.hdCHANNELID != 'MOBILE-APP' && oCOBROWSINGSTATUS.toUpperCase() === 'START' || oCOBROWSINGSTATUS.toUpperCase() === 'ACCESSCONTROL' || oCOBROWSINGSTATUS.toUpperCase() === 'NOTIFICATION') {
                var coBrowsingTabUrl = $scope.CoBrowsingTabConfig.CoBrowsingTabUrl;
                coBrowsingTabUrl = coBrowsingTabUrl.replace("$$COBROWSINGSESSIONID$$", oCOBROWSINGSESSIONID);
                coBrowsingTabUrl = coBrowsingTabUrl.replace("$$COBROWSINGSTATUS$$", oCOBROWSINGSTATUS);
                $('#iframeCoBrowsing').prop('src', coBrowsingTabUrl);
            }
            if ($scope.hdCHANNELID == 'MOBILE-APP' && oCOBROWSINGSTATUS.toUpperCase() === 'START' || oCOBROWSINGSTATUS.toUpperCase() === 'ACCESSCONTROL' || oCOBROWSINGSTATUS.toUpperCase() === 'NOTIFICATION') {
                var coBrowsingTabUrl = $scope.CoBrowsingTabConfig.CoBrowsingTabUrlMobile;
                coBrowsingTabUrl = coBrowsingTabUrl.replace("$$COBROWSINGSESSIONID$$", oCOBROWSINGSESSIONID);
                coBrowsingTabUrl = coBrowsingTabUrl.replace("$$COBROWSINGSTATUS$$", oCOBROWSINGSTATUS);
                $('#iframeCoBrowsing').prop('src', coBrowsingTabUrl);
                $("#CoBrowsingTab").find('a').click();
            }
            else if (oCOBROWSINGSTATUS.toUpperCase() === 'END') {
                $('#iframeCoBrowsing').prop('src', '');
            }
            else if (oCOBROWSINGSTATUS === "") {
                $('#iframeCoBrowsing').prop('src', '');
            }
        }
        else if ($scope.CoBrowsingTabConfig.IsCoBrowsingTabDisplayed && $scope.COBROWSINGSTATUS == "") {
            $('#iframeCoBrowsing').prop('src', '');
        }
    }

    //#endregion

    function smartTALKActiveSessionDetails() {
        _fetchActiveInteractionList()
            .then((data) => {
                if (data && data.d) {
                    var _data = JSON.parse(data.d);
                    $scope.smartTALKActiveSession(_data, false);
                }
            })
            .catch((error) => {
                console.log('_fetchActiveInteractionList error', error)
            })
    }

    function smartTALKActiveSession(data, status) {
        var oLatestInteractionAdded = {};
        $scope.currentInteractionDetails = {};

        $scope.startAnimationAgent();
        if ($scope.smartTALKActiveSessionList.length == 0) {
            if (data != null) {
                if (data.length > 0) {
                    if ($scope.$$phase) { // most of the time it is "$digest"
                        $scope.smartTALKActiveSessionList = data;
                    } else {
                        $scope.$apply($scope.smartTALKActiveSessionList = data);
                    }
                    smartTALKClickActiveSession(data[0], 0, '')
                }
            }
        } else {
            if (status) {
                _fetchPushURL($scope.selectedTranslation.LanguageCode);
                data.forEach(function (r, j) {
                    $scope.smartTALKActiveSessionList.forEach(function (v, i) {
                        if (v.SESSIONID == r.SESSIONID) {
                            $scope.smartTALKActiveSessionList.splice(i, 1);
                            $scope.currentInteractionDetails = r;

                            var arrAvailableChannelIntr = $scope.smartTALKActiveSessionList.filter(function (oData) {
                                return oData.CHANNELID == $scope.currentInteractionDetails.CHANNELID;
                            });
                            if (arrAvailableChannelIntr.length == 0) {
                                _updateInteractionCntChannelWise($scope.currentInteractionDetails.CHANNELID);
                            }

                            //console.log('$scope.currentInteractionDetails', $scope.currentInteractionDetails);
                            if (r.INTERACTIONTYPE == 'IM') {
                                smartTALKNotificationError($scope.Translations.GeneralMessageTranslation.IMCloseMsg);
                            } else {
                                smartTALKNotificationSuccess($scope.Translations.GeneralMessageTranslation.DisposeSuccessMsg);
                            }
                            if ($scope.smartTALKActiveSessionList.length == 0) {
                                if ($scope.WRAPEFROM == true) {
                                    $scope.smartTALKWRAPEFROMURL($scope.WRAPEFROMURL);
                                    console.log('$scope.smartTALKWRAPEFROMURL() called', $scope.WRAPEFROMURL);
                                }
                                _setLinkAutoLoginURL();
                            }
                            clearInterval(CustomerTime);
                            if ($scope.hdsessionId == r.SESSIONID) {
                                $scope.ActiveStatus = "";
                                $scope.ActiveChannel = "";
                                $scope.ActiveCustName = "";
                                //  $scope.hdsessionId = "";
                                $scope.hdPhoneNo = "";
                                $scope.hdCHANNELID = "";
                                $scope.ActivecustomerPIC = "";
                                $scope.smartTALKChatList = [];
                                $scope.smartTALKCustomerDetailsList = [];
                                $scope.smartTALKCustomerHistoryList = [];
                                $scope.smartTALKCustomerHistorydetailsList = [];
                                $scope.WebchartHeadInfoList = [];
                                $scope.WebchartCrolingList = [];
                                $scope.Disposition = "";
                                $scope.SubDisposition = "";
                                $scope.Remarks = "";
                                $scope.TextboxSendMessageEnabled = "0";
                                if ($scope.TextboxSendMessageEnabled == "1") {
                                    $("#txtmessage, #txtmessageExpand").attr("disabled", "disabled");
                                } else {
                                    $("#txtmessage, #txtmessageExpand").removeAttr("disabled");
                                }
                                if ($scope.smartTALKActiveSessionList.length > 0) {
                                    smartTALKClickActiveSession($scope.smartTALKActiveSessionList[0], 0, '')
                                }
                                if ($scope.smartTALKActiveSessionList.length == 0) {
                                    $scope.InteractionTime = "00:00:00";
                                    $scope.ActiveHandleTime = "00:00:00";
                                    _ShowLeftInteractionsListForMobile();
                                }
                            }
                        }
                    });
                });
            } else {
                $scope.smartTALKActiveSessionList.forEach(function (v, i) {
                    //console.log('smartTALKActiveSessionList',v);
                    data.forEach(function (r, j) {
                        if (v.SESSIONID == r.SESSIONID) {
                            if ($scope.$$phase) { // most of the time it is "$digest"
                                $scope.smartTALKActiveSessionList[i] = data[j];
                            } else {
                                $scope.$apply($scope.smartTALKActiveSessionList[i] = data[j]);
                            }
                        }
                        if ($scope.hdsessionId == r.SESSIONID) {
                            $scope.ActiveTypingNotifaction = r.NOTIFY;
                            $scope.ActiveStatus = smartTALKCustomerStatus(r);
                            $scope.TextboxSendMessageEnabled = r.SESSIONDISPOSE;
                            $scope.RequestOrigin = r.REQUESTORIGIN;
                            if ($scope.TextboxSendMessageEnabled == "1") {
                                $("#txtmessage, #txtmessageExpand").attr("disabled", "disabled");
                            } else {
                                $("#txtmessage, #txtmessageExpand").removeAttr("disabled");
                            }
                            $scope.InteractionTime = r.INTERACTIONTIME;
                            $scope.ActiveHandleTime = r.ACTIVEHANDLETIME;
                        }
                    });
                });
                var NewInterCation = funCheckActiveRecord($scope.smartTALKActiveSessionList, data);
                NewInterCation.forEach(function (r, j) {
                    if ($scope.$$phase) { // most of the time it is "$digest"
                        $scope.smartTALKActiveSessionList.push(NewInterCation[j]);
                    } else {
                        $scope.$apply($scope.smartTALKActiveSessionList.push(NewInterCation[j]));
                    }
                });

                if (NewInterCation.length > 0) {
                    oLatestInteractionAdded = NewInterCation[0];
                }
            }
        }
        //Will set Active session count.
        $scope.ActiveSessions = $scope.smartTALKActiveSessionList.length;

        _updateInteractionCntChannelWise('');

        // 28-2-2020 this condition checks if there is no interaction box then it will empty the message holding list empty. fixed for samsung.
        if ($scope.ActiveSessions < 1) {
            $scope.smartTALKChatList = [];
        }

        //This will sort the inactive interaction and push to last row
        // $scope.smartTALKActiveSessionList = $filter('orderBy')($scope.smartTALKActiveSessionList, 'SESSIONDISPOSE', false);            

        //This will sort the interaction as per MSGSENTON, with latest Interaction always on top.
        $scope.smartTALKActiveSessionList = $filter('orderBy')($scope.smartTALKActiveSessionList, 'MSGSENTON', true);

        if (oLatestInteractionAdded['INTERACTIONTYPE'] == 'OUTBOUND') {
            //In case of OB we will, auto select the interaction.
            if (oLatestInteractionAdded['CHANNELID'] == 'WHATSAPP' || oLatestInteractionAdded['CHANNELID'] == 'EMAIL') {
                FocusOnInteraction(oLatestInteractionAdded['SESSIONID'], null);
            }
        }
        //Added By Priyanka

        //Commented for now, to be discussed with Kirti, Jay to add this code on auto dispose
        //if (clientConfig.ModuleConfig.IsSAPModuleEnabled && $scope.smartTALKCustomerDetailsList.length > 0 ) {
        //    var strTranscript = getTranscript();
        //    EndChatEventToSAP($scope.hdsessionId, 'CHAT', 'UPDATEACTIVITY', 'END',
        //        $scope.smartTALKCustomerDetailsList[3].Value, strTranscript, $scope.smartTALKCustomerDetailsList[2].Value, $scope.hdCHANNELID);
        //}
        //} catch (e) { console.log('smartTALKActiveSession() catch block', e); }
    }

    //#region Auto Stop Typing Notification

    //setInterval(function () {
    //    setTimeout(function () {
    //        for (var i = 0; i < $scope.smartTALKActiveSessionList.length; i++) {
    //            if ($scope.smartTALKActiveSessionList[i].NOTIFY.indexOf("Last seen") != -1) {
    //            }
    //            else {
    //                $scope.smartTALKActiveSessionList[i].NOTIFY = '';
    //                $scope.ActiveTypingNotifaction = '';
    //            }
    //        }
    //        if ($scope.ActiveTypingNotifaction == 'Typing ...') {
    //            $scope.ActiveTypingNotifaction = '';
    //        }
    //    }, 5000);        
    //}, 3000);

    //#endregion

    function UpdateRealtimeAgent() {
        try {
            if ($scope.HaskPassport) {
                //CallRequestAgentDetails();
                smartTALKCallRequestAgentDetails($scope.otherAgentRequestCategoryType);
                $scope.HaskPassport = false;
                $scope.start();
            } else {
                $scope.HaskPassport = true;
                $scope.stop();
            }
        } catch (e) { }
    }

    function smartTALKGetRequestAgentDetails(data) {
        try {
            //This line was added to bypass the logic that appends the latest result with the old result.
            $scope.smartTALKGetRequestAgentDetailsList = [];
            if ($scope.smartTALKGetRequestAgentDetailsList.length == 0) {
                $scope.smartTALKGetRequestAgentDetailsList = data;

            }
            else {
                var VarLoginAgent = funCheckRecord($scope.smartTALKGetRequestAgentDetailsList, data);
                if ($scope.smartTALKGetRequestAgentDetailsList.length > data.length) {
                    $scope.smartTALKGetRequestAgentDetailsList.forEach(function (v, i) {
                        VarLoginAgent.forEach(function (r, j) {
                            if (v.AGENTID == r.AGENTID) {
                                $scope.smartTALKGetRequestAgentDetailsList.splice(i, 1);
                            }
                        });
                    });
                }
                else {
                    VarLoginAgent.forEach(function (v, i) {
                        $scope.smartTALKGetRequestAgentDetailsList.forEach(function (r, j) {
                            if (v.AGENTID != r.AGENTID) {
                                VarLoginAgent = funCheckRecord($scope.smartTALKGetRequestAgentDetailsList, data);
                                if (VarLoginAgent.length > 0) {
                                    $scope.smartTALKGetRequestAgentDetailsList.push(VarLoginAgent[i]);
                                }
                                return;
                            }
                        });
                    });
                }
                $scope.smartTALKGetRequestAgentDetailsList.forEach(function (v, i) {
                    data.forEach(function (r, j) {
                        if (v.AGENTID == r.AGENTID) {
                            $scope.smartTALKGetRequestAgentDetailsList[i] = data[j];
                            return;
                        }
                    });
                });
            }

        } catch (e) {
            console.log('smartTALKGetRequestAgentDetails() catch error');
        }
    }

    function smartTALKAgentRealtimeDashboard() {
        a = document.getElementById("autoRefreshAgentDetails");
        a.style.transform = " rotate(360deg)";
        a.style.transition = "1s";
        AgentDashboardDetails();
        //GetParkingHistoery();
        setTimeout(
            function myfunction() {
                $("#autoRefreshAgentDetails").removeAttr("style");
            }, 1000);

    }

    function smartTALKCallRequestAgentDetails(categoryType) { //agent
        $scope.otherAgentRequestCategoryType = categoryType;
        //console.log('Initialize get other agent request.');
        if (categoryType === 'AGENTWISE') {
            $("#autoRefreshAgentDetails2").addClass("fa-spin");
        }
        else if (categoryType === 'GROUPWISE') {
            $("#autoRefreshAgentDetails").addClass("fa-spin");
        }
        else if (categoryType === 'FILTERACTIVEAGENT') { // 9-29-19  jay

            if ($scope.myCheckbox == true) {
                $("#autoRefreshAgentDetails").addClass("fa-spin");
            }
            else {
                //$scope.smartTALKGetRequestAgentDetailsList = [];
                //return $scope.smartTALKGetRequestAgentDetailsList;
                $scope.otherAgentRequestCategoryType = 'GROUPWISE';
            }
        }
        $("#autoRefreshParkedInteractions").addClass("fa-spin");
        if ($scope.myCheckbox == true) {
            $scope.otherAgentRequestCategoryType = 'FILTERACTIVEAGENT';
        }
        CallRequestAgentDetails();
        setTimeout(function myfunction() {
            $("#autoRefreshParkedInteractions").removeClass("fa-spin");
        }, 1000);
    }


    $scope.smartTALKOpenTab = smartTALKOpenTab;
    function smartTALKOpenTab() {
        if ($('#menuToggler').is(':checked')) {
            $("#customerdetails").parent().hide();  //Tabs
            $('.bottom_div').hide();    //Back Button + Chat Area Mobile
            $('#active_div').show();    //Interaction Section          
            //$("#customerchat").parent().hide();            
            //$("#customerdetails").show();                 

        } else {
            $('#active_div').hide();                //Interaction Section
            $('.bottom_div').hide();                //Back Button + Chat Area Mobile
            $("#customerdetails").parent().show();  //Tabs                        
            //$("#customerchat").parent().hide();     //Chat area
            //$("#customerdetails").parent().hide();       
        }
    }

    //-----agent My Chat History-----

    //-----------------------------------------------------------------------------

    function smartTALKCustomerDetails(data) {
        try {
            data = $(data).filter(function (i, n) {
                return n.Key != 'MobileNumber';
            });
        } catch (e) { }
        $scope.smartTALKCustomerDetailsList = [];
        var vardata = SetOrdeToCustomerInfo(data);

        if ($scope.DispositionConfig.IsDispositionParkDisplayed) {
            _setDispositionParamsForParkedInteraction(vardata);
        }

        try {
            if (vardata[27].Value == 'TWITTER') {
                vardata[29].Value = '@' + vardata[29].Value;
            }
            if ($scope.CHANNELSOURCE == "GENESYS") {
                //Genesys Raw User Data json formatted here.
                vardata[40].Value = JSON.stringify(JSON.parse(vardata[40].Value), undefined, 4);
            }

        } catch (e) { }
        $scope.smartTALKCustomerDetailsList = vardata;
		
		try {
				if ($scope.EMAILFROM == ""){
					$scope.EMAILFROM = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE3"; })[0].Value;
				}
				if ($scope.TOEMAIL == ""){
					$scope.TOEMAIL = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE5"; })[0].Value;
				}
				if ($scope.SUBJECT == ""){
					$scope.SUBJECT = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE10"; })[0].Value;
				}
				if ($scope.CCEMAIL == ""){
					$scope.CCEMAIL = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE6"; })[0].Value;
				}
				if ($scope.BODY == ""){
					RefreshMail();
				}
				}
				catch(e){console.log(e);}
        try {

            var found_names = $.grep($scope.smartTALKCustomerDetailsList, function (v) {
                return v.Key === "CUSTOMERATTRIBUTE30";
            });
            if ($scope.CHANNELSOURCE == "BOT") { funGetWorkFlow(found_names[0].Value); }

            //#region Set Genesys Campaign Related Data
            if ($scope.CHANNELSOURCE == "GENESYS") {
                var GSW_CAMPAIGN_NAME = $.grep($scope.smartTALKCustomerDetailsList, function (v) {
                    return v.Key === "CUSTOMERATTRIBUTE41";
                });
                $scope.VoiceIP.VoiceCampaignName = GSW_CAMPAIGN_NAME[0].Value;

                var GSW_APPLICATION_ID = $.grep($scope.smartTALKCustomerDetailsList, function (v) {
                    return v.Key === "CUSTOMERATTRIBUTE49";
                });
                $scope.VoiceIP.VoiceApplicationId = GSW_APPLICATION_ID[0].Value;

                var GSW_RECORD_HANDLE = $.grep($scope.smartTALKCustomerDetailsList, function (v) {
                    return v.Key === "CUSTOMERATTRIBUTE50";
                });
                $scope.VoiceIP.VoiceRecordHandleId = GSW_RECORD_HANDLE[0].Value;

                var RECORD_ID = $.grep($scope.smartTALKCustomerDetailsList, function (v) {
                    return v.Key === "CUSTOMERATTRIBUTE51";
                });
                $scope.VoiceIP.VoiceRecordId = RECORD_ID[0].Value;
            }
            //#endregion

        } catch (e) { }
        if ($.trim($scope.hdCHANNELID.toUpperCase()) == "CRAWL") {
            if (typeof (vardata[4]) !== "undefined") {
                if ($.trim(vardata[4].Value) != "") {
                    $('#iframeCROL').prop('src', vardata[4].Value)
                    $scope.cCrolBrowser = true;
                }
                else {
                    $('#iframeCROL').prop('src', '')
                    $scope.cCrolBrowser = false;
                }
            }
            else {
                $('#iframeCROL').prop('src', '')
                $scope.cCrolBrowser = false;
            }

        } else if ($scope.hdCHANNELID == "EMAIL") {
            var EmailCaseId = $.grep($scope.smartTALKCustomerDetailsList, function (v) {
                return v.Key === "CUSTOMERATTRIBUTE4";
            });
            if (EmailCaseId) {
                //When Email Interaction, If LINK application we make the value false.
                //For Agent applicaion EMAIL disposition and Reply will be allowed.
                $scope.EmailIP.IsEmailResponseAllowed = true;
                $scope.EmailIP.IsEmailDispositionAllowed = true;
            }
        }
        if ($scope.SmartLink == true) {
            try {
                console.log('In smartTALKCustomerDetails() ccrm');
                //var url = $scope.SmartLinkTickeUrl + $scope.hdPhoneNo;
                //$('#iframecrm').prop('src', url);
            } catch (e) { }
        }
        setTimeout(function v() {
            //$("#cinfo").scrollTop(999999999999999999);
        }, 1000);
    }

    function _setDispositionParamsForParkedInteraction(vardata) {
        try {
            var channelName = vardata[27].Value;
            switch (channelName) {
                case 'TWITTERDM':
                    $scope.parkInteractionChannelValue = '@' + vardata[9].Value;
                    $scope.dispoformParkedinteractionRemarks = vardata[0].Value;

                    var parkInteractionChannels = $scope.ddlParkInteractionChannels;
                    for (var i = 0; i < parkInteractionChannels.length; i++) {
                        if (parkInteractionChannels[i].id === vardata[27].Value) {
                            $scope.ddlSelectedParkInteractionChannel = parkInteractionChannels[i];
                        }
                    }
                    break;
            }
        } catch (e) {
            console.log('_setDispositionParamsForParkedInteraction() catch error');
        }
    }

    $scope.SendMessageTypingTime = 0;

    function removeAllRow() {
        try {
            $scope.smartTALKCustomerDetailsList = [];
            $scope.smartTALKCustomerHistoryList = [];
            $scope.smartTALKCustomerHistorydetailsList = [];
            $scope.Disposition = "";
            $scope.SubDisposition = "";
            $scope.Remarks = "";
        } catch (e) { }
    }

    function smartTALKkeypress(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13' || keycode == 'undefined') {
            if (e.keyCode == 13) {
                if (!e.shiftKey) {
                    smartTALKSendMSG();
                    //$scope.txtmessage = "";
                    e.preventDefault();
                    //scrollSmoothToBottom('bluescrol');
                }
            }
        }
        var k;
        if ($scope.SendMessageTypingTime == 0) {
            //if ($scope.hdCHANNELID === 'WEBCHAT') { sendnotification(); }
            //window.clearTimeout(k);
            //k = setTimeout(function () {
            //    if ($scope.hdCHANNELID === 'WEBCHAT') { stopnotification();}
            //    $scope.SendMessageTypingTime = 0;
            //}, 3000);
            //$scope.SendMessageTypingTime = 1;
        }
    }

    function smartTALKSendMSG() {

        if (!navigator.onLine) {
            $("#InfoModal #InfoModalMSG").html("You are disconnected, please check your network connection and try again.");
            $('#InfoModal').modal('show');
            var scope = angular.element($('#ChatArea')).scope();
            try {
                document.getElementById("txtmessage").disabled = true; // disable textbox
                scope.$apply(function () {
                    createCookie(scope.hdsessionId, scope.txtmessage, 1);
                    console.log('_checkNetworkConnection() scope apply catch error');
                });
            } catch (e) { console.log('_checkNetworkConnection() scope apply catch error'); }
            CheckNetwork();
            return false;
        }
        else {
            $('#ctl19').css('cursor', 'default !important');
            $('#InfoModal').modal('hide');
            document.getElementById("txtmessage").disabled = false; // enable textbox
        }

        var k = "";
        var hdnTextMsg = $("#hiddendiv").text();
        var textMsg = $scope.txtmessage;
        var IshndTextAvailable = false;
        if (hdnTextMsg) {
            IshndTextAvailable = true;
            $scope.txtmessage = $("#hiddendiv").text();
            $("#hiddendiv").html('');
            k = $scope.txtmessage.trim();
        } else if ($scope.txtmessage) {
            k = $scope.txtmessage.trim();
			//var reg =/<(.|\n)*?>/g; 
			//var reg2 = /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/g;
			//var reg3 = /^[!@#\$%\^\&*\)\(+=._-]+$/
			//var reg = /[!@#$%^&*(),.?":{}|<>]/g;

			//if ( k.match(reg) ) {
				//k = "";
			//}
			
			var reg = /[!@#$%^&*(),.?":{}|<>]/g;
		
		if (k.match(reg)) {
            smartTALKNotificationError("no special characters allowed.");
            return;
        }
			
            if (IshndTextAvailable == false) {
                if ($scope.hdCHANNELID === 'TWITTER' || $scope.hdCHANNELID === 'TWITTERDM') {
                    var msgCnt = $("#txtmessage").val().length;
                    if (msgCnt >= 140) {
                        smartTALKNotificationError('Max length exceeded');
                        return false;
                    }
                }

                if ($scope.hdCHANNELID === 'TWITTER' || $scope.hdCHANNELID === 'TWITTERDM' || $scope.hdCHANNELID === 'FBCHAT' || $scope.hdCHANNELID === 'VIBER' || $scope.hdCHANNELID === 'FB' || $scope.hdCHANNELID === 'WEBCHAT' || $scope.hdCHANNELID === 'WHATSAPP' || $scope.hdCHANNELID === 'CRAWL' || $scope.hdCHANNELID === 'IM' || $scope.hdCHANNELID === 'TELEGRAM' || $scope.hdCHANNELID === 'WHATSAPP' || $scope.hdCHANNELID === 'SMS' || $scope.hdCHANNELID === 'INSTAGRAMPOST' || $scope.hdCHANNELID === 'INSTAGRAMDM' || $scope.hdCHANNELID === 'LINECHAT' || $scope.hdCHANNELID === 'COBROWSE' || $scope.hdCHANNELID === 'VIDEO' || $scope.hdCHANNELID === 'MOBILE-APP') {
                    // retain value of k else set k = blank
                }
                else {
                    k = "";
                }
            }
        }

        k = stringEscape(k);
        k = k.replace(/^( |<br>)*(.*?)( |<br>)*$/, "$2");
        //commented to retain multiple line key
        //k = k.replace(/\n|\r/g, " ");

        if ($scope.TextboxSendMessageEnabled != "1") {
            if (k != "" || $scope.hdPhoneNo != "") {
                $scope.blockedcontents = "";
                if (ContentBlocking) {
                    AgentCheckAbusWord(k, $scope);
                } else {
                    CheckAbusWord = true;
                }
                if (CheckAbusWord) {
                    $scope.blockedcontents = "";
                    SendMessage($scope.hdsessionId, $scope.hdPhoneNo, k, $scope.ActiveCustName.replace(/\'/g, ""), "", "", "", $scope.hdCHANNELID, $scope.CHANNELSOURCE);
                    $scope.txtmessage = "";
                    $scope.txtmessage1 = "";

                    var textChatKey = $scope.hdsessionId + '_chatMsg';
                    if (sessionStorage.getItem(textChatKey) !== null) {
                        sessionStorage.setItem(textChatKey, '');
                    }
                } else {
                    $scope.blockedcontents = "You are not allowed to use blocked contents :" + $scope.blockedcontents;
                }
            }
        }
    }

    function smartTALKSendURL() {
        if ('selected' in $scope.smartTALKPushUrlsText) {
            if ($scope.smartTALKPushUrlsText.selected.id && $scope.hdPhoneNo) {

                var k = $scope.smartTALKPushUrlsText.selected.UrlDesc;
                k = stringEscape(k);
                k = k.replace(/^( |<br>)*(.*?)( |<br>)*$/, "$2");
                SendMessage($scope.hdsessionId, $scope.hdPhoneNo, "", $scope.ActiveCustName.replace(/\'/g, ""), k, "", "", $scope.hdCHANNELID, $scope.CHANNELSOURCE);
                $scope.smartTALKPushUrlsText = {};
                $("#ChatArea").find("#txtmessage").focus();
            }
        }

    }

    function _processOTPMasking(_arrChat) {
        if (clientConfig.MaskingConfig.IsOTPMaskingEnabled) {
            for (let [index, val] of _arrChat.entries()) {
                if (val.MSG.indexOf('Please enter the OTP below') != -1 || val.MSG.indexOf('This is not the valid OTP') != -1) {
                    let _msg = _arrChat[index - 1].MSG;
                    _arrChat[index - 1].MSG = _msg.replace(_msg, '*****');
                }
            }
        }
        return _arrChat;
    }

    function _IsStringAvailable(_arrChat) {
        $scope.IsUrlSendToCustomer = false;
        var UIDRegex = /[\d]*(\d+)/m, htmlentityregex = /<(“[^”]*”|'[^’]*’|[^'”>])*>/gm;
        //if (clientConfig.VideoCallingTabConfig.VideCallOutbound) {
        for (let [index, val] of _arrChat.entries()) {
            if (val.MSG.indexOf('Please join this below video link to have a video call now') !== -1) {
                $scope.IsUrlSendToCustomer = true;
                let _msg = _arrChat[index].MSG;
                _msg = _msg.match(UIDRegex, _msg);
                var VideoOutboundURL = clientConfig.VideoCallingTabConfig.VideoCallingTabUrl.split("&")[0] + "&cesessionid=" + $scope.hdsessionId + "&type=start";
                VideoOutboundURL = VideoOutboundURL.replace("$$VIDEOCHATSESSIONID$$", _msg[0]);
                $("#iframeVideoCall").attr("src", VideoOutboundURL);
                _arrChat[index].MSG = _arrChat[index].MSG.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
                _arrChat[index].MSG = _arrChat[index].MSG.replace(htmlentityregex, "");
            }
            if (val.MSG.indexOf('Customer has ended the chat please dispose it.') == 0) {
                $scope.IsInteractionReadyToDispose = true;
            }
        }
        // }

        return _arrChat;
    }

    function CheckForVideoSession() {
        $scope.IsUrlSendToCustomer = false;
        for (let [index, val] of $scope.smartTALKChatList.entries()) {
            if (val.MSG.indexOf('Please join this below video link to have a video call now') !== -1) {
                $scope.IsUrlSendToCustomer = true;
            }
        }
        // }
        // return _arrChat;
    }

    function FunsmartTALKChat(data, status) {
        $scope.IsInteractionReadyToDispose = false;
        if (status) {
            var _data = _processOTPMasking(data.data || []);
            _IsStringAvailable(data.data || []);

            $scope.smartTALKChatList = _data;
            if ($scope.post == false) {
                if (_data && _data.length > 5) {
                    ($scope.hdCHANNELID != 'EMAIL') ? $("#chatwindow").show() : $("#chatwindow").hide();
                }
            }
            scrollChatAreaToBottom();
        } else {

            $scope.MessageDispalyCount = $scope.MessageDispalyCount + 1;
            if ($scope.smartTALKChatList == null) {
                smartTALKClickActiveSession($scope.smartTALKActiveSessionList[0], 0, '')
            } else {
                $scope.smartTALKChatList.push(data[0]);
            }
            scrollChatAreaToBottom();
            _IsStringAvailable(data || []);
            //_IsStringAvailable($scope.smartTALKChatList || []);
        }
        $scope.startAnimationAgent();
        CheckForVideoSession();
    }

    BindGroup();
    BindGroupChat();
    if (readCookie("cgrouptabUnreadCount") != null) {
        $("#cgrouptabUnreadCount").html(readCookie("cgrouptabUnreadCount"));
        FunUnreadCountGroupChat(true);
    }

    $scope.smarttwitlike = smarttwitlike;
    $scope.smartfunRetwit = smartfunRetwit;

    function smarttwitlike(x) {
        let otwitterLikeReTweet = {
            "sessionId": $scope.hdsessionId,
            "messageId": x.MESSAGEID,
            "action": "Like",
            "message": x.MSG
        }
        funtwitlike(otwitterLikeReTweet);
    }
    function smartfunRetwit(x) {
        let otwitterLikeReTweet = {
            "sessionId": $scope.hdsessionId,
            "messageId": x.MESSAGEID,
            "action": "Retweet",
            "message": x.MSG
        }
        funRetwit(otwitterLikeReTweet);
    }

    $scope.smartAgentStatistics = [];
    $scope.smartTALKAgentstasticsdetails = smartTALKAgentstasticsdetails;
    function smartTALKAgentstasticsdetails() {
        AgentDashboardDetails();
    }

    $scope.Fontincrease = Fontincrease;
    function Fontincrease() {
        $("#ChatArea").css('font-size', function (i, value) {
            return parseInt(value) + 1.1;
        });
    }
    $scope.FontDecrease = FontDecrease;
    function FontDecrease() {
        $("#ChatArea").css('font-size', function (i, value) {
            return parseInt(value) - 1.1;
        });
    }

    $scope.validationNumberMsg = "Please enter mobile no";
    $scope.txtmnoreq = "";
    $scope.txtmnoInvalid = "";
    $scope.validNo = validNo;

    function validNo() {
        if ($scope.Custoattr == "" || $scope.Custoattr == undefined) {
            $scope.txtmnoreq = "please enter mobile no.";
            $("#txtmnoreq").show();
            return false;
        }
        else {
            $scope.txtmnoreq = "";
            $("#txtmnoreq").hide();
            if ($scope.Custoattr.match(/^[6789]\d{9}$/) == false) {
                $scope.txtmnoInvalid = "Enter valid Mobile number(the number should start with 9, 8, 7, 6)";
                $("#txtmnoInvalid").show();
                return false;
            }
            else {
                $scope.txtmnoInvalid = "";
                $("#txtmnoInvalid").hide();
                return true;
            }
        }
    }
    function validatemobileNO() {
        $scope.MobileMessage = "";
        var mobileno = $("#txtmno").val();

        var regex = /^[6789]\d{9}$/;
        $scope.MobileMessage = "*";

        if (mobileno.trim() == "") {
            $scope.MobileMessage = "*";
            $scope.dispoformMobileNoValidate = true;
            //return false;
        }
        else {
            $scope.dispoformMobileNoValidate = false;
            $scope.MobileMessage = "";
            if (!regex.test(mobileno.trim())) {
                //
                $scope.MobileMessage = "Please enter valid mobile no.";
                $scope.dispoformMobileNoValidate = true;
                return false;
            }
            else {
                //
                $scope.dispoformMobileNoValidate = false;
                $scope.MobileMessage = "";
                return true;
            }
        }
    }


    //#region Agent Idel Time Out Operation Start
    var idleMax = parseInt(clientConfig.ClientIdelTimeOut);// Logout after 1 minutes of IDLE
    var idleTime = 1;
    function timerIncrement() {
        idleTime = idleTime + 1;
        //console.log('idleTime ++', idleTime);
        if (idleTime > idleMax) {
            smartTALKAgentLogout('Logged out due to agent idel behaviour for ' + idleMax + ' minutes');
        }
    }
    var idleInterval = $interval(function () {
        if ($scope.selectedItem == "Ready") {
            timerIncrement();
        }
    }, 60000); // 1 minute interval 
    $("body").mousemove(function (event) {
        idleTime = 1; // reset to one
        //console.log('moved ' , idleTime);
    });
    //#endregion

    //#region HSM multimedia File Upload Operation Start
    $scope.UploadFilesHSM = function (files, invalidFiles) {
        $scope.selectedFiles = files;
        $scope.errorFiles = invalidFiles;
        console.log('Selected Files', $scope.selectedFiles);
        console.log('Invalid Files', $scope.errorFiles);
        if ($scope.selectedFiles && $scope.selectedFiles.length) {
            for (var i = 0; i < $scope.selectedFiles.length; i++) {
                var file = $scope.selectedFiles[i];
                Upload.upload({
                    url: 'FileUploadHandler.ashx',
                    data: { ProcessId: $('#hdnAgentProcessId').val() },
                    file: file,
                }).progress(function (evt) {
                    //console.log('evt', evt);
                    var progressPercentage = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    $scope.FileUploadProgress = progressPercentage

                    //var element = angular.element(document.querySelector('#dvProgress'));
                    //element.html('<div style="width: ' + $scope.FileUploadProgress + '%">' + $scope.FileUploadProgress + '%</div>');
                }).success(function (data, status, headers, config) {
                    //alert('Uploaded successfully ' + file.name);
                    var fileUploadResult = data;
                    if (fileUploadResult.IsUploaded) {
                        $scope.FileUploadResult = data;
                        $scope.MediaURL = data.FileWebPath; //used for Multimedia HSM
                        $scope.MediaURLFileName = data.UserFileName; //used for Multimedia HSM
                        console.log('Upload File Success', data);
                        document.getElementById('HSMattachment').innerHTML = 'file uploaded succesfully';
                    }
                    else if (fileUploadResult.IsUploaded == false) {
                        smartTALKNotificationError(fileUploadResult.ErrorMessage);
                        console.log('Upload File Failure', fileUploadResult);
                    }
                    else {
                        alert('file not uploaded due to some strange reasons');
                    }
                }).error(function (err) {
                    console.log('Upload File Error', err);
                    alert('Error occured during upload');
                });
            }
        }
        else if ($scope.errorFiles && $scope.errorFiles.length) {
            if (angular.isArray($scope.errorFiles)) {
                for (var i = 0; i < $scope.errorFiles.length; i++) {
                    console.log('err data', $scope.errorFiles[0].$error);
                    if ($scope.errorFiles[0].$error === 'pattern') {
                        smartTALKNotificationError($scope.FileUploadConfig.InvalidFilePatternsErrorMsg);
                    } else if ($scope.errorFiles[0].$error === 'maxSize') {
                        smartTALKNotificationError($scope.FileUploadConfig.InvalidMaxFileSizeErrorMsg);
                    }
                }
            }
            else {
                //code here
            }

        }
    }
    $scope.validateFiles = function (ofiles) {
        //console.log('ofiles-->', ofiles);
        //code block left to implement in future
    }
    //#endregion

    //#region Agent File Upload Operation Start
    $scope.UploadFiles = function (files, invalidFiles) {
        $scope.selectedFiles = files;
        $scope.errorFiles = invalidFiles;
        console.log('Selected Files', $scope.selectedFiles);
        console.log('Invalid Files', $scope.errorFiles);
        if ($scope.selectedFiles && $scope.selectedFiles.length) {
            for (var i = 0; i < $scope.selectedFiles.length; i++) {
                var file = $scope.selectedFiles[i];
                Upload.upload({
                    url: 'FileUploadHandler.ashx',
                    data: { ProcessId: $('#hdnAgentProcessId').val() },
                    file: file,
                }).progress(function (evt) {
                    //console.log('evt', evt);
                    var progressPercentage = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    $scope.FileUploadProgress = progressPercentage

                    //var element = angular.element(document.querySelector('#dvProgress'));
                    //element.html('<div style="width: ' + $scope.FileUploadProgress + '%">' + $scope.FileUploadProgress + '%</div>');
                }).success(function (data, status, headers, config) {
                    //alert('Uploaded successfully ' + file.name);
                    var fileUploadResult = data;
                    if (fileUploadResult.IsUploaded) {
                        $scope.FileUploadResult = data;
                        !$scope.IsSendImgToUrlNetworkByPass ? _sendImgUrlToNetwork(fileUploadResult) : _SendMessageWithImage(fileUploadResult);
                        console.log('Upload File Success', data);
                    }
                    else if (fileUploadResult.IsUploaded == false) {
                        smartTALKNotificationError(fileUploadResult.ErrorMessage);
                        console.log('Upload File Failure', fileUploadResult);
                    }
                    else {
                        alert('file not uploaded due to some strange reasons');
                    }
                }).error(function (err) {
                    console.log('Upload File Error', err);
                    alert('Error occured during upload');
                });
            }
        }
        else if ($scope.errorFiles && $scope.errorFiles.length) {
            if (angular.isArray($scope.errorFiles)) {
                for (var i = 0; i < $scope.errorFiles.length; i++) {
                    console.log('err data', $scope.errorFiles[0].$error);
                    if ($scope.errorFiles[0].$error === 'pattern') {
                        smartTALKNotificationError($scope.FileUploadConfig.InvalidFilePatternsErrorMsg);
                    } else if ($scope.errorFiles[0].$error === 'maxSize') {
                        smartTALKNotificationError($scope.FileUploadConfig.InvalidMaxFileSizeErrorMsg);
                    }
                }
            }
            else {
                //code here
            }

        }
    }
    //Send Message Consisting Image.
    function _SendMessageWithImage(fileUploadResult) {
        console.log('fileUploadResult in sendmethod', fileUploadResult);
        var blankData = "";
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/SendMessage",
            data: "{SessionId:'" + fileUploadResult.SessionId + "',number:'" + fileUploadResult.PhoneNumber + "',strMSG:'" + fileUploadResult.UserFileName + "',AgentName:'" + fileUploadResult.AgentName + "',txturl:'" + blankData + "',imagepath:'" + fileUploadResult.FileWebPath + "',Extension:'" + fileUploadResult.FileType + "',CHANNELID:'" + fileUploadResult.CHANNELID + "',channelSource:'" + '' + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                console.log('_SendMessageWithImage Success', json);
                FunsmartTALKChat(JSON.parse(json.d).data, false);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('_SendMessageWithImage() error', xhr);
            }
        });
    }
    $scope.validateFiles = function (ofiles) {
        //console.log('ofiles-->', ofiles);
        //code block left to implement in future
    }
    //#endregion



    //#region Agent Refresh Video Call Operation Start
    //$scope.RefreshVideoCall = function () {
    //    if ($scope.VideoCallingTabConfig.IsVideoCallingTabDisplayed) {
    //        for (var i = 0; i < $scope.smartTALKActiveSessionList.length; i++) {
    //            if ($scope.hdsessionId === $scope.smartTALKActiveSessionList[i].SESSIONID) {
    //                _setVideoCallIframe($scope.smartTALKActiveSessionList[i].VIDEOCHATSTATUS, $scope.smartTALKActiveSessionList[i].VIDEOCHATSESSIONID);
    //            }
    //        }
    //    }
    //}

    function receiveMessage(event) {
        try {
            var IsSnapshotFlag = (event.data) ? event.data["flag"] : "";
            if (IsSnapshotFlag == "SNAP") {

                _sendImageTakeFromVideoApplication(event.data["base64"]);
            }
            else if (IsSnapshotFlag == "MINIMIZEVIDEOIFRAMEONCALLEND") {
                $scope.transposeVideoFrame('Minimize');
                $("#iframeVideoCall").attr("src", "");
            }
            else {
                sessionStorage.setItem(event.data.split('|')[0], event.data.split('|')[1]);
                if (sessionStorage.getItem($scope.hdsessionId) == event.data.split('|')[0] && event.data.split('|')[1] == 'end') {
                    sessionStorage.setItem($scope.hdsessionId, '');
                }
            }

        } catch (e) {
            //
        };
    }
    window.addEventListener("message", receiveMessage, false);

    function _sendImageTakeFromVideoApplication(base64str) {
        $scope.smartTALKNotificationSuccess("Screenshot captured. Please wait...");
        var base64 = base64str;
        var currentDate = new Date();
        var d = new Date(currentDate.getTime());
        month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        var futuredate = [year, month, day].join('') + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds() + "" + d.getMilliseconds();

        var req = {
            Base64Url: base64,
            FileName: $scope.hdPhoneNo + "_" + futuredate,
            ProcessId: "",
            Product: ""
            // URL: oAgentURL.HostPathFromBase64VideoApp
        }
        _fetchhostpath(req)
            .then((data) => {

                if (data) {
                    var FileWebPath = data;
                    var regex = /(?:[^/][\d\w\.]+)+$/gm;
                    var UserFileName = FileWebPath.match(regex);
                    fileUploadResultForSnapshot = {
                        "AgentName": $scope.smartTALKAgentName,
                        "CHANNELID": "WEBCHAT",
                        "ErrorMessage": "",
                        "FileContentType": "image/png",
                        "FilePath": "",
                        "FileSizeInBytes": 0,
                        "FileType": "FILE",
                        "FileWebPath": FileWebPath,
                        "IsUploaded": true,
                        "Message": "",
                        "PhoneNumber": $scope.hdPhoneNo,
                        "SessionId": $scope.hdsessionId,
                        "SystemFileName": "",
                        "UserFileName": UserFileName[0]
                    }
                    // _SendMessageWithImage(fileUploadResult);

                    //initiate popup preview
                    $('#ufVideoCallPopupPreview').show();
                    $('#videoOutboundSnapPreview').attr('src', data)
                    //

                } else {
                    smarttalknotificationerror(json.d);
                }
            })
            .catch((error) => {
                smarttalknotificationerror("_sendimagetakefromvideoapplication error");
                console.log('_sendimagetakefromvideoapplication error', error)
            });
    }

    $scope.RefreshVideoCall = function () {
        if ($scope.VideoCallingTabConfig.IsVideoCallingTabDisplayed && $scope.VideoCallingTabConfig.VideCallOutbound != true) {
            for (var i = 0; i < $scope.smartTALKActiveSessionList.length; i++) {
                if ($scope.hdsessionId === $scope.smartTALKActiveSessionList[i].SESSIONID) {
                    _setVideoCallIframe($scope.smartTALKActiveSessionList[i].VIDEOCHATSTATUS, $scope.smartTALKActiveSessionList[i].VIDEOCHATSESSIONID);
                }
            }
        }
        else {
            if ($scope.VideoCallingTabConfig.VideCallOutbound == true) {
                var GEN = '';
                var IDGen = '', CallType = 'start';


                if (sessionStorage.getItem($scope.hdsessionId) === '' || sessionStorage.getItem($scope.hdsessionId) === null) {
                    GEN = new IDGenerator();
                    IDGen = GEN.generate();
                    sessionStorage.setItem($scope.hdsessionId, IDGen);
                    CallType = 'start';
                }
                else {
                    if (sessionStorage.getItem($scope.hdsessionId) !== '') { //big cesession                        
                        IDGen = sessionStorage.getItem($scope.hdsessionId)
                        if (sessionStorage.getItem(IDGen) == 'start') {
                            CallType = 'resume';
                        }
                        else {
                            CallType = 'start';

                        }
                        //IDGen = sessionStorage.getItem($scope.hdsessionId);
                        //CallType = 'resume';
                    }
                }

                var videoCallingTabUrl = $scope.VideoCallingTabConfig.VideoCallingTabUrl;
                videoCallingTabUrl = videoCallingTabUrl.replace("$$VIDEOCHATSESSIONID$$", IDGen);
                videoCallingTabUrl = videoCallingTabUrl.replace("start", CallType);
                videoCallingTabUrl = videoCallingTabUrl.replace("$$CESESSIONID$$", $scope.hdsessionId);
                videoCallingTabUrl = videoCallingTabUrl.replace("$$AGENTID$$", $scope.agent_ID_);
                videoCallingTabUrl = videoCallingTabUrl.replace("$$PROCESSID$$", $('#hdnAgentProcessId').val());
                videoCallingTabUrl = videoCallingTabUrl.replace("$$LANGCODE$$", $scope.selectedTranslation.LanguageCode);
                $('#iframeVideoCall').prop('src', videoCallingTabUrl);
            }
            else {
                var videoCallingTabUrl = $scope.VideoCallingTabConfig.VideoCallingTabUrl;
                videoCallingTabUrl = videoCallingTabUrl.replace("$$VIDEOCHATSESSIONID$$", oVideoChatSessionID);
                videoCallingTabUrl = videoCallingTabUrl.replace("$$CESESSIONID$$", $scope.hdsessionId);
                videoCallingTabUrl = videoCallingTabUrl.replace("$$AGENTID$$", $scope.agent_ID_);
                videoCallingTabUrl = videoCallingTabUrl.replace("$$PROCESSID$$", $('#hdnAgentProcessId').val());
                videoCallingTabUrl = videoCallingTabUrl.replace("$$LANGCODE$$", $scope.selectedTranslation.LanguageCode);

                $('#iframeVideoCall').prop('src', videoCallingTabUrl);
                $scope.VIDEOCHATSTATUS = " Started...";
                $scope.VIDEOCHATSESSIONID = oVideoChatSessionID;
                console.log('RefreshVideoCall url set ', videoCallingTabUrl);
            }
        }
    }
    //#region video call URl to clipboard 16-07-2019
    $scope.CopyIFrameURL = function () {
        var VideoIFrame = document.getElementById("iframeVideoCall").src;
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(VideoIFrame).select();
        document.execCommand("copy");
        $temp.remove();
    }
    //#endregion video call URl to clipboard end

    function _setVideoCallIframe(oVideoChatStatus, oVideoChatSessionID) {
        if (oVideoChatStatus.toUpperCase() === 'START' || oVideoChatStatus.toUpperCase() === ' STARTED...') {
            var videoCallingTabUrl = $scope.VideoCallingTabConfig.VideoCallingTabUrl;
            videoCallingTabUrl = videoCallingTabUrl.replace("$$VIDEOCHATSESSIONID$$", oVideoChatSessionID);
            videoCallingTabUrl = videoCallingTabUrl.replace("$$CESESSIONID$$", $scope.hdsessionId);
            videoCallingTabUrl = videoCallingTabUrl.replace("$$AGENTID$$", $scope.agentID);
            videoCallingTabUrl = videoCallingTabUrl.replace("$$PROCESSID$$", $('#hdnAgentProcessId').val());
            videoCallingTabUrl = videoCallingTabUrl.replace("$$LANGCODE$$", $scope.selectedTranslation.LanguageCode);


            $('#iframeVideoCall').prop('src', videoCallingTabUrl);
            $scope.VIDEOCHATSTATUS = " Started...";
            $scope.VIDEOCHATSESSIONID = oVideoChatSessionID;
            console.log('RefreshVideoCall url set ', videoCallingTabUrl);
            //  }  
        }
        else if (oVideoChatStatus.toUpperCase() === 'END' || oVideoChatStatus.toUpperCase() === ' DISCONNECTED...') {
            $('#iframeVideoCall').prop('src', '');
            $scope.VIDEOCHATSTATUS = " Disconnected...";
            $scope.VIDEOCHATSESSIONID = '';
        } else if (oVideoChatStatus == "") {
            $('#iframeVideoCall').prop('src', '');
            $scope.VIDEOCHATSTATUS = '';
            $scope.VIDEOCHATSESSIONID = '';
        }
    }
    //#endregion

    //#region Video call outbound

    $scope.CancelPreview = function () {
        try {
            $('#ufVideoCallPopupPreview').hide();
        }
        catch (e) {
            // Todo : $
        }
    }

    function _sendImgUrlToNetwork(fileUploadResult) {
        var oImgReq = '{"Url": "$$Url$$", "FileName": "$$FileName$$", "Fileextn": "$$Fileextn$$"}'
        oImgReq = oImgReq.replace("$$Url$$", fileUploadResult.FileWebPath);
        uniqueFileName = fileUploadResult.UserFileName.split("/").pop();
        oImgReq = oImgReq.replace("$$FileName$$", uniqueFileName.split(".")[0]);
        oImgReq = oImgReq.replace("$$Fileextn$$", uniqueFileName.split(".").pop());

        $.ajax({
            type: 'POST',
            url: oAgentURL.HostPathFromBase64VideoApp,
            data: oImgReq,
            crossDomain: true,
            async: false,
            contentType: "application/json;",
            success: function (jsonConfig) {
                fileUploadResult['FileWebPath'] = jsonConfig;
                _SendMessageWithImage(fileUploadResult);
            },
            error: function (xhr) {
                console.log('Image not not sent to network drive');
            }
        });

        //ajax call start
        $.ajax({
            type: 'POST',
            url: oAgentURL.SendScreenShotAsMessage,
            data: oImgReq,
            crossDomain: true,
            contentType: "application/json;",
            success: function (jsonConfig) {

            },
            error: function (xhr) {
                console.log('Image not not sent to network drive');
            }
        });
        //end
    }

    $scope.sendScreenshotasMessage = function () {
        try {

            var currentDate = new Date();
            var d = new Date(currentDate.getTime());
            month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            let futuredate = [year, month, day].join('') + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds() + "" + d.getMilliseconds();

            fileUploadResultForSnapshot.UserFileName = $scope.smartTALKCustomerDetailsList[5].Value + $('#ddlSnapshotName').val() + "_" + futuredate;
            _SendMessageWithImage(fileUploadResultForSnapshot);
            $('#ufVideoCallPopupPreview').hide();
            $scope.smartTALKNotificationSuccess("Message Sent.");

            //save to network drive for amec
            _sendImgUrlToNetwork(fileUploadResultForSnapshot);
            //
        }
        catch (e) {
            //
        }
    }

    $scope.VideoCallOutboundModal = function () {
        try {
            $('#ufVideoCallPopup').show();

        }
        catch (e) {

        }
    }
    $scope.hideVideoCallOutboundModal = function () {
        try {
            $('#ufVideoCallPopup').hide();
        }
        catch (e) {

        }
    }

    $scope.sendVideoCallOutboundModal = function () {
        try {
            var currentDate = new Date();
            var d = new Date(currentDate.getTime());
            month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            min = (d.getMinutes().toString().length == 1) ? ("0" + d.getMinutes().toString()) : d.getMinutes().toString();
            sec = (d.getSeconds().toString().length == 1) ? ("0" + d.getSeconds().toString()) : d.getSeconds().toString();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            let futuredate = [day, month, year.toString().slice(2)].join('') + "" + d.getHours() + "" + min + sec;

            var GEN = new IDGenerator(), IDGen = GEN.generate();
            IDGen = IDGen + futuredate;
            var VideoOutboundURL = clientConfig.VideoCallingTabConfig.VideoCallingTabUrl.split("&")[0] + "&type=start&lang=" + $scope.smartTALKCustomerDetailsList[15].Value;
            VideoOutboundURL = VideoOutboundURL.replace("$$VIDEOCHATSESSIONID$$", IDGen);
            $("#iframeVideoCall").attr("src", VideoOutboundURL);

            //var htmlentityURL = '&lt;a href=&quot;$$URL$$&quot; target=&quot;_blank&quot;&gt;$$URL$$&lt;/a&gt;';
            var k = $("#iframeVideoCall").attr("src").split("&")[0] + "&cesessionid=" + $scope.hdsessionId + "&type=join&lang=" + $scope.smartTALKCustomerDetailsList[15].Value;
            k = k.replace(/^( |<br>)*(.*?)( |<br>)*$/, '$2');
            // k = k.replace(/" "/, '&nsb;');
            //htmlentityURL = htmlentityURL.replace("$$URL$$", k);htmlentityURL = htmlentityURL.replace("$$URL$$", k);
            $scope.txtmessage = (($scope.smartTALKCustomerDetailsList[15].Value == 'ar') ? "يرجى الانضمام إلى رابط الفيديو أدناه لإجراء مكالمة فيديو الآن :- " : "Please join this below video link to have a video call now :- &lt;br /&gt;") + k;
            //$scope.txtmessage = "Please join this below video link to have a video call now :- &lt;br /&gt;" + k;//htmlentityURL;
            $scope.smartTALKSendMSG();
            /* Send UID & Session ID to DB for video session continuation */
            // _FunSendVideoUrlDataToDb(IDGen, $scope.hdsessionId, 'AGENT_UPDATE_VIDEO_SESSION', 'VIDEO'); d4290f8f-48dd-4199-44aa-df2c56884a0d|WEBCHAT|al muzani|3|281020211005166945
            _FunSendVideoUrlDataToDb(IDGen, $scope.hdsessionId, 'AGENT_UPDATE_VIDEO_SESSION', 'VIDEO');
            $('#ufVideoCallPopup').hide();
            $scope.transposeVideoFrame('Restore');
        }
        catch (e) {
            //
        }
    }

    //#endregion

    //#region Agent FSM,KM,LINK,CRM iframe URL set Operation Start
    try {
        if ($scope.FSMTab == true) {
            $scope.FSMLoginURL = clientConfig.FSMLinkLoginURL;
            $scope.FSMDataURL = clientConfig.FSMLinkDataURL;
            $('#iframeFSM').prop('src', $scope.FSMLoginURL);
        }

        if ($scope.KMTab == true) {
            $scope.KMLoginURL = clientConfig.KMLinkLoginURL;
            $scope.KMDataURL = clientConfig.KMLinkDataURL;
            $('#iframeKM').prop('src', $scope.KMLoginURL);
        }

        if ($scope.LINKTab == true) {

            $scope.LINKLoginURL = clientConfig.LINKLinkLoginURL;
            $scope.LINKDataURL = clientConfig.LINKLinkDataURL;
            $('#iframeLINK').prop('src', '');
        }

        if ($scope.CRMTabConfig.IsCRMTabDisplayed == true) {
            var crmLinkLoginUrl = $scope.CRMTabConfig.CRMLinkLoginURL;
            crmLinkLoginUrl = crmLinkLoginUrl.replace('$$AGENTID$$', $scope.AGENTID);
            $('#iframecrm').prop('src', crmLinkLoginUrl)
        }
    } catch (e) {
        console.log('catch error while setting iframe URL');
    }
    //#endregion    

    $scope.getFileTypeFromExtension = function (oAttachment) {
        if (oAttachment.MSGTYPE === 'FILE') {
            if (oAttachment.LOCATION) {
                var fileArray = oAttachment.LOCATION.split(".");
                var fileArrayLen = fileArray.length;
                fileArrayLen = fileArrayLen - 1
                var extension = fileArray[fileArrayLen].toUpperCase();
                switch ($.trim(extension.toUpperCase())) {
                    case "JPG":
                    case "JPEG":
                    case "PNG":
                    case "GIF":
                        return "IMAGE"
                    case "CSV":
                    case "DOC":
                    case "DOCX":
                    case "XLS":
                    case "XLSX":
                    case "PPT":
                    case "PPTX":
                    case "TXT":
                    case "CSV":
                    case "PDF":
                        return "DOCUMENT"
                    case "MP3":
                    case "M4A":
                        return "AUDIO"
                    case "MP4":
                        return "VIDEO";
                    default:
                        return '';
                }
            }
        }
    }

    $scope.checkCalenderDtTmChange = function (key, value, type) {
        switch (key) {
            case 'RchatFromDate':
                $scope.RchatFromDate = value
                break;
            case 'RchatToDate':
                $scope.RchatToDate = value
                break;
            case 'FromDate':
                $scope.FromDate = value
                break;
            case 'ToDate':
                $scope.ToDate = value
                break;
            default:
        }
    }

    $scope.supervisorRequestDashboardData = function () {
        //console.log('IsDashBoardTabUrl :-', $scope.SupervisorTabConfig.IsDashBoardTabUrl);
        $('#iframeDashBoard').prop('src', $scope.SupervisorTabConfig.IsDashBoardTabUrl);
    };

    $scope.onGroupChange = function (data, type) {
        if (type === 'reqAgent') {
            $scope.SelectedAgentGroup = data;
        } else if (type === 'reqSupervisor') {
            $scope.SelectedAgentGroupSup = data;
        }
    };



    //#region Agent Hide attachment div for invalid file extension (KLI) Operation Start
    $scope.checkValidAttachmentExtension = function (oAttachment) {
        if (oAttachment.MSGTYPE === 'FILE') {
            if (oAttachment.LOCATION) {
                var fileArray = oAttachment.LOCATION.split(".");
                var fileArrayLen = fileArray.length;
                fileArrayLen = fileArrayLen - 1
                var extension = fileArray[fileArrayLen].toUpperCase();

                switch ($.trim(extension.toUpperCase())) {
                    case "JPG":
                    case "JPEG":
                    case "CSV":
                    case "PNG":
                    case "GIF":
                    case "DOC":
                    case "DOCX":
                    case "PPT":
                    case "PPTX":
                    case "TXT":
                    case "XLS":
                    case "XLSX":
                    case "CSV":
                    case "PDF":
                        return true;
                    default:
                        return false;
                }
            }
        }
    }
    //#endregion

    $scope.triggerForceDownload = function (url, fileName) {
        //var xhr = new XMLHttpRequest();
        //xhr.open("GET", url, true);
        //xhr.responseType = "blob";
        //xhr.onload = function () {
        //    var urlCreator = window.URL || window.webkitURL;
        //    var imageUrl = urlCreator.createObjectURL(this.response);
        //    var tag = document.createElement('a');
        //    tag.href = imageUrl;
        //    tag.download = fileName;
        //    document.body.appendChild(tag);
        //    tag.click();
        //    document.body.removeChild(tag);

        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            link.setAttribute("href", url);
            link.target = "_blank";
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        xhr.send();
    }

    //#region Agent Emoji    
    function GetEmoji() {
        _fetchEmoji()
            .then((data) => {
                if (data) {
                    $scope.agentEmojis = data;
                }
            })
            .catch((error) => {
                console.log('_fetchEmoji error', error)
            })
    }
    GetEmoji();

    $scope.selectEmoji = function (data) {
        $scope.txtmessage += data.innerText;
    }
    //#endregion

    //#region emailer
	$scope.RefreshMail = RefreshMail;
	function RefreshMail() {
        let caseId = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE4"; })[0].Value;
        if ($scope.INTERACTIONTYPE == 'INBOUND') {
			$scope.BODY = '';
			$.when(_RefreshMailBody(caseId)).done(function (d) {
				$scope.BODY = d;
				let type = 'case';
				
				setTimeout(() => {
					_RestoreCaseInlineImages(type, caseId);
					_RestoreIntInlineImages(type, caseId);
				}, 1000);
			});
        }
    }

    $scope.SendEmail = function (type) {
        //Goes to Email Editor Section.
        $scope.ReplyScreen = true;
        $scope.EmailReplyIP.IsDirectDispose = false;
        $scope.EmailReplyIP.MailScreenAction = type;

		var _subject = $filter('EmailFilterSpecialChar')($.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE10"; })[0].Value);
        var _channelSource = $scope.CHANNELSOURCE;
        var _fromEmail = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE5"; })[0].Value;
		var _sentOnTime = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE8"; })[0].Value;
		var _toEmail = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE3"; })[0].Value;
		var _ccEmail = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE6"; })[0].Value;
		var _bccEmail = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE7"; })[0].Value;
		var _subjectEmail = type == 'Reply' || type == 'ReplyAll' ? '<b>Subject: </b> RE: ' + _subject : '<b>Subject: </b> FE: ' + _subject;

        $scope.underScore = "<br><br>___________________________________________________________________________________________________________";
        $scope.onActionAppendVal = '<b>From: <a href=mailto:' + _toEmail + '></b>' + _toEmail + '</a> <br/> <b>Sent: </b>' + _sentOnTime + '<br/>';
		// if(type != 'Forward')
			$scope.onActionAppendVal += ' <b>To: </b> ' + _fromEmail + ' <br/>';
		$scope.onActionAppendVal += _ccEmail ? '<b>Cc: </b>' + _ccEmail + '<br/>' : '';
		$scope.onActionAppendVal += _bccEmail ? '<b>Bcc: </b>' + _bccEmail + '<br/>' : '';
		$scope.onActionAppendVal += _subjectEmail + "<br/><br/>";
		$scope.mailTrail = ($scope.BODY == "") ? $filter('EmailFilter')($scope.BODY) : ($scope.underScore + ' <br>' + $scope.onActionAppendVal + $filter('EmailFilter')($scope.BODY));
        $scope.editorModel = ($scope.INTERACTIONTYPE == 'OUTBOUND') ? $filter('EmailFilter')($scope.DefaultAgentSignature + $scope.mailTrail) : $filter('EmailFilter')($scope.editorModel + " " + $scope.DefaultAgentSignature + $scope.mailTrail);
		
		if($scope.INTERACTIONTYPE == 'OUTBOUND')
			$scope.editorModel = $filter('EmailFilterSpecialChar')($scope.editorModel);

        // _SetMailboxDropdown(_fromEmail, $scope.INTERACTIONTYPE);
        //Always call if after setting mailbox dropdown
        // var arrToEmail = _getToEmail(_fromEmail);
        var arrToEmail = '';

        if (type == 'Reply') {
            $scope.EmailReplyIP.txtTo = _toEmail;
            $scope.EmailReplyIP.txtFrom = _fromEmail;
            $scope.EmailReplyIP.txtCc = '';
            $scope.EmailReplyIP.txtBcc = '';
            $scope.EmailReplyIP.txtSubject = 'RE: ' + _subject;
        } else if (type == 'ReplyAll') {
            $scope.EmailReplyIP.txtTo = _toEmail;
            $scope.EmailReplyIP.txtFrom = $scope.EmailReplyIP.selectedFromEmailId.EmailMailbox;
            $scope.EmailReplyIP.txtCc = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE6"; })[0].Value;
            $scope.EmailReplyIP.txtBcc = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE7"; })[0].Value;
            $scope.EmailReplyIP.txtSubject = 'RE: ' + _subject;
            $("#user").hide();
        } else if (type == 'Forward') {
            $scope.EmailReplyIP.txtTo = '';
            $scope.EmailReplyIP.txtFrom = _fromEmail;
            $scope.EmailReplyIP.txtCc = '';
            $scope.EmailReplyIP.txtBcc = '';
            $scope.EmailReplyIP.txtSubject = 'FW: ' + _subject;
            $scope.MakeEmailAttachmentOutOfURL();
        } else if (type == 'DisposeMail') {
            $scope.EmailReplyIP.txtTo = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE3"; })[0].Value;
            $scope.EmailReplyIP.txtFrom = _fromEmail;
            $scope.EmailReplyIP.txtCc = '';
            $scope.EmailReplyIP.txtBcc = '';
            $scope.EmailReplyIP.txtSubject = 'Dispose: ' + _subject;
            $scope.EmailReplyIP.IsDirectDispose = true;
            $scope.editorModel = '';

            // $scope.ReplyScreen = ($scope.INTERACTIONTYPE == 'OUTBOUND') ? true : false;
			$scope.ReplyScreen = false;

            //we will skip the validation and just dispose email without LINK involved.
            sendDisposeMail(false);
        }
    }

    $scope.BackToInbox = function () {
        //Goes to Interaction Email View Section 
        $scope.ReplyScreen = false;
        $("#user").show();
        $scope.EmailTrailDisplayed = false;
		$scope.editorModel = "";
		$scope.EmailReplyIP.txtSubject = '';
    }

    $scope.ShowMailtrail = function () {
        $scope.EmailTrailDisplayed = !$scope.EmailTrailDisplayed;
    }

    function _getToEmail(_fromEmail) {
        let _senderEmail = $.grep($scope.smartTALKCustomerDetailsList, function (v) {
            return v.Key === "CUSTOMERATTRIBUTE3";
        })[0].Value;

        let arrFromEmail = _fromEmail.split(",").map(item => item.trim());
        arrFromEmail.push(_senderEmail);

        let arrExclusion = [];
        arrExclusion.push($scope.CHANNELSOURCE.toLowerCase());
        arrExclusion.push($scope.EmailReplyIP.selectedFromEmailId.EmailMailbox.toLowerCase());

        return arrFromEmail.filter(item => !arrExclusion.includes(item.toLowerCase()));
    }

    function _SetMailboxDropdown(oFromEmail, oInteractionType) {
        let arrFromEmail = oFromEmail.split(",").map(item => item.trim());
        for (const el of arrFromEmail) {
            let _arrmailbox = $scope.AgentPrerequisiteData.VitalEmailInfo.MailboxInfo.filter(function (oData) {
                return oData.EmailMailbox.toLowerCase() == el.toLowerCase();
            });

            if (_arrmailbox.length > 0) {
                $scope.EmailReplyIP.selectedFromEmailId = _arrmailbox[0];
            }
        }
    }

    $scope.changeselectedFromEmailId = function (oldData) {
        var _oldData = JSON.parse(oldData);
        //if ($scope.INTERACTIONTYPE != $scope.EmailReplyIP.selectedFromEmailId.EmailMailboxType) {
        //    var _arrmailbox = $scope.AgentPrerequisiteData.VitalEmailInfo.MailboxInfo.filter(function (oData) {
        //        return oData.Id == _oldData.Id
        //    });
        //    $scope.EmailReplyIP.selectedFromEmailId = _arrmailbox[0];
        //    smartTALKNotificationInfo('Mailbox auto selected for type : ' + $scope.INTERACTIONTYPE);
        //}
        $scope.EmailReplyIP.txtFrom = $scope.EmailReplyIP.selectedFromEmailId.EmailMailbox;
    }
    //#endregion

    //#region Agent Transfer To Skill.    
    funGetAgentSkillsProcessWise();
    $scope.triggerTransferToSkill = triggerTransferToSkill;
    function triggerTransferToSkill() {
        funTriggerTransferToSkill($scope.ddlSelectedTransferToSkill, $scope.hdsessionId, $scope.hdPhoneNo);
    }
    //#endregion

    $('li#cgrouptab').click(function () {
        $("#groupchat").find(".groupchat_agent").scrollTop(999999999999999999);
    });

    //#region AGENT DEAD CODE TO REMOVE LATER
    $scope.openlightbox = function (data) {
        //no longer used now LP-KIRTI
        $scope.DISPALYLOCATIONFULLPATH = data.LOCATION;
    };
    $scope.smartTALKUploadFile = function () {
        //no longer used now LP-KIRTI
        //angular.element('#FileUpload1').click();
    };
    function UpdatePassword() {
        //no longer used now LP-KIRTI
        UpdatePasswordAgent();
    }
    //--------Was used partially in Other Agents tab to sort list, now longer used now LP-KIRTI Start---
    $scope.AgentDetailsListOrderby = "AGENTNAME";
    $scope.AgentDetailsListorder = {
        field: $scope.AgentDetailsListOrderby,
        reverse: false
    };
    $scope.smartTALKAgentDetailsListOrderby = function (value) {
        return "";
    }

    //#region SignalR Typing Notification Code.
    $(document).ready(function () {
        var UF = $;
        var chat = UF.connection.chatHub;
        UF.connection.hub.url = oAgentURL.HubURL;
        UF.connection.hub.start().done(function () { });
        $('#txtmessage').keypress(function (e) {
            var UID = $scope.hdPhoneNo;

            if (UF.connection.hub.state === UF.signalR.connectionState.disconnected) {
                UF.connection.hub.start().done(function () { chat.server.agentTypingNotification(UID); });
            }
            else {
                chat.server.agentTypingNotification(UID);
            }

            if (e.charCode == 13) {
                chat.server.agentStopTypingNotification(UID);
            }
        });
    });
    //#endregion

    //#region Debounce Typing
    $('#txtmessage').keyup(debounce(function (e) {
        _processDebounceTyping('EventTypingNotification', $(this), e);
    }, 450, 'immediate'));

    $('#txtmessage').keyup(debounce(function (e) {
        _processDebounceTyping('EventStopTypingNotification', $(this), e);
    }, 500));

    function _processDebounceTyping(oEventName, $this, _event) {
        if (clientConfig.DebounceTypingConfig.AllowedChannels.includes($scope.hdCHANNELID) && $this.val() && $this.val().length > 0) {
            var oNotifyDebounceTyping = {
                "EventName": oEventName,
                "Channel": $scope.hdCHANNELID,
                "ChannelSource": $scope.CHANNELSOURCE,
                "SessionId": $scope.hdsessionId,
                "UID": $scope.hdPhoneNo,
                "QueuePrefix": "unfyd_sendmsg"
            };

            _notifyDebounceTyping(oNotifyDebounceTyping)
                .then((data) => {
                })
                .catch((error) => {
                    console.log('_notifyDebounceTyping error', error)
                })
        }
    }
    //#endregion

    angular.element(document).ready(function () {

        dTable = $('#HSMTemplateTable')
        dTable.DataTable();

        if ($scope.IsLINKTabDisplayed == true) {
            //_setLinkAutoLoginURL();
        }
    });

    //$scope.Disposition = function () {
    //    $scope.dispoformDisposition = {};
    //    $scope.dispoformSubDisposition = {};
    //    $scope.SubSubdispoformSubDisposition = {};
    //};

    $scope.VoiceToggle = function () {

        if ($scope.ddlSelectedManualOutBoundChannels.ChannelName == 'VOICE') {
            $scope.VoiceCustomerField = true;
            if ($scope.cvoiceoutbound || $scope.cvoiceoutboundKnowlarity) {
                $scope.txtManualOutBoundPhoneNo = "+" + $scope.AgentPrerequisiteData.AgentMobileNumber;
            }
        }
        if ($scope.ddlSelectedManualOutBoundChannels.ChannelName == 'WHATSAPP') {
            $scope.VoiceCustomerField = false;
            $scope.txtManualOutBoundPhoneNo = '';
            funchannelsource('WHATSAPP');
        }
        if ($scope.ddlSelectedManualOutBoundChannels.ChannelName == 'EMAIL') {
            funchannelsource('EMAIL');
            $scope.VoiceCustomerField = false;
        }
    } //controller



    //#region Schedule Voice Callback
    $scope.chkVoiceCallBackScheduleChange = function () {
        if (!$scope.VoiceIP.IsCallBackScheduled) {
            //reset the values if callback schedule is unchecked.
            $scope.VoiceIP.IsVoiceCallBackPersonal = false;
            $scope.VoiceIP.VoiceCallBackDtTm = '';
            $scope.VoiceIP.VoiceCallBackFormattedMsg = 'Schedule Voice Callback';
        }
    }

    $scope.setVoiceCallback = function () {
        $scope.VoiceIP.VoiceCallBackFormattedMsg = 'Schedule Voice Callback';
        if ($scope.VoiceIP.IsCallBackScheduled) {
            var _callbackType = ($scope.VoiceIP.IsVoiceCallBackPersonal) ? 'Personal' : 'Campaign';
            var voiceCallBackDtTm = $scope.VoiceIP.VoiceCallBackDtTm;

            //var DtTm = voiceCallBackDtTm.split(' ');
            //var Dt = DtTm[0];
            //var Tm = DtTm[1];
            //var datePart = Dt.split('-');
            //var timePart = Tm.split(':');
            //var _date = new Date(datePart[0], datePart[1], datePart[2] - 1, timePart[0], timePart[1], timePart[2], 0)
            //var voiceCallBackFormattedMsg = _date.toLocaleString();

            $scope.VoiceIP.VoiceCallBackFormattedMsg = _callbackType + ' callback scheduled on ' + voiceCallBackDtTm;
        }
        $('#VoiceCallbackModal').modal('hide');
    }
    //#endregion

    function _setMappedChannelsIconAndCnt() {
        //Reset the Mapped Channels Object with icon and count.
        for (var obj of $scope.AgentPrerequisiteData.AgentMappedChannels) {
            obj.InteractionCount = 0;
            obj.ClassName = _getMappedChannelsIconClass(obj.ChannelName);
        }
    }

    function _applyInteractionCntChannelWise(channelName, Cnt) {
        for (var obj of $scope.AgentPrerequisiteData.AgentMappedChannels) {
            if (obj.ChannelName == channelName) {
                obj.InteractionCount = Cnt;
            }
        }
    }

    function _updateInteractionCntChannelWise(channelName) {

        //#region Update Channel Wise Interaction Count
        if (channelName) {
            //If the Interaction is last of its type
            _applyInteractionCntChannelWise(channelName, 0);
        }

        var arrActiveIntrChannels = [];
        for (var obx of $scope.smartTALKActiveSessionList) {
            //Hold Active Interaction Channel name.
            arrActiveIntrChannels.push(obx.CHANNELID);
        }

        if (arrActiveIntrChannels.length > 0) {
            //We have active interactions with us, lets group it channel wise and set count against each channel.
            var oActiveIntrChannels = _groupFlatArray(arrActiveIntrChannels);
            for (const property in oActiveIntrChannels) {
                var _key = property;
                var _value = oActiveIntrChannels[property];

                _applyInteractionCntChannelWise(_key, _value);
            }
            //console.log('oActiveIntrChannels', oActiveIntrChannels);
        }
        //#endregion
    }

    $scope.filterActiveAgentInteractions = function (channelName, activeIntrCnt) {
        $scope.InteractionFilter.ActiveFilterType = 'ActiveInteractions';
        if (activeIntrCnt > 0) {
            for (var i = 0; i < $scope.smartTALKActiveSessionList.length; i++) {
                if (channelName && channelName != 'ALL') {
                    //Only the selected channel will be visible and rest will be hidden.
                    if ($scope.smartTALKActiveSessionList[i].CHANNELID != channelName) {
                        $scope.smartTALKActiveSessionList[i].ISINTERACTIONVISIBLE = "false";
                    }
                    else {
                        $scope.smartTALKActiveSessionList[i].ISINTERACTIONVISIBLE = "true";
                    }
                }
                else if (channelName == 'ALL') {
                    //ALL interactions will be set to visible
                    $scope.smartTALKActiveSessionList[i].ISINTERACTIONVISIBLE = "true";
                }
            }

            //Get List of Visible Interactions and auto click the first from the List. 
            var oFilteredVisibleInteraction = $.grep($scope.smartTALKActiveSessionList, function (element, index) {
                return element.ISINTERACTIONVISIBLE == "true";
            });
            if (oFilteredVisibleInteraction.length > 0) {
                FocusOnInteraction(oFilteredVisibleInteraction[0].SESSIONID, null);
            }
            $scope.InteractionFilter.ActiveChannel = channelName;
            console.log('returnedData', oFilteredVisibleInteraction);
        }
        else {
            $scope.smartTALKNotificationInfo('No Interaction available to filter.')
        }
    }

    $scope.filterSubMenu = function (subFilterName) {
        $scope.InteractionFilter.ActiveFilterType = subFilterName;

        if (subFilterName == 'MissedInteractions') { }
        else if (subFilterName == 'MyChatHistoryInteractions') { }
        else if (subFilterName == 'ParkedInteractions') { }

        if (IsMobile || oAgentWindowDim.resizedWidth < 768) {
            $("#tdRight").hide();
        }

    }

    //$('#filterMyChatHistoryIntr').hide();
    //$('#filterMyChatHistoryIntr').hide();
    //$('#filterMissedIntr').hide();
    $scope.initFilterSubMenu = function () {
        if ($scope.InteractionFilter.ActiveFilterType == 'MissedInteractions') {
            $('#filterMissedIntr').toggle(300);
        }
        else if ($scope.InteractionFilter.ActiveFilterType == 'MyChatHistoryInteractions') {
            $('#filterMyChatHistoryIntr').toggle(300);
        }
        else if ($scope.InteractionFilter.ActiveFilterType == 'ParkedInteractions') {
            $('#filterParkedIntr').toggle(300);
        }
    }

    $scope.chatInteractionStateIcon = function (stateName) {
        var retu = 'text-dark';
        var _stateName = (stateName) ? stateName.toUpperCase() : '';

        if (_stateName == 'QUEUE' || _stateName == 'NOTREADY' || _stateName == 'AGENTFORCENOTREADYBYSUPERVISOR') {
            retu = 'text-danger';
        } else if (_stateName == 'ACTIVE' || _stateName == 'READY') {
            retu = 'text-success';
        } else {
            retu = 'text-muted';
        }
        return retu;
    }

    $scope.userStateIcon = function (stateName, userType) {
        var retu = '';
        var _stateName = (stateName) ? stateName.toUpperCase() : '';
        var _userType = (userType) ? userType.toUpperCase() : '';

        if (_stateName == 'QUEUE' || _stateName == 'NOTREADY' || _stateName == 'AGENTFORCENOTREADYBYSUPERVISOR') {
            retu = (_userType == 'AGENT') ? 'agent-notready_ico' : 'sup-notready_ico';
        } else if (_stateName == 'ACTIVE' || _stateName == 'READY') {
            retu = (_userType == 'AGENT') ? 'agent-ready_ico' : 'sup-notready_ico';
        } else {
            retu = (_userType == 'AGENT') ? 'agent-offline_ico' : 'sup-offline_ico';
        }
        return retu;
    }

    $scope.transposeVideoFrame = function (transposeType) {
        _transposeVideoFrame(transposeType);
    }

    //#region Manual Case Creation
    function _extendManualCaseCreationConfig() {
        $scope.ManualCaseCreationConfig.ContactName = '';
        $scope.ManualCaseCreationConfig.ContactNumber = '';
        $scope.ManualCaseCreationConfig.FromEmail = '';
        $scope.ManualCaseCreationConfig.ToEmail = '';
        $scope.ManualCaseCreationConfig.Subject = '';
        $scope.ManualCaseCreationConfig.Description = '';
    }

    $scope.TriggerManualCaseCreationModal = function () {
        $('#ManualCaseCreationModal').modal('show');

        var _fromEmail = ($scope.AgentPrerequisiteData.VitalEmailInfo != null) ? $scope.AgentPrerequisiteData.VitalEmailInfo.MailboxInfo[0] : "";
        //var Email = $.grep(scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE3"; })[0].Value;
        $scope.ManualCaseCreationConfig.FromEmail = _fromEmail;
        $scope.ManualCaseCreationConfig.ToEmail = '';
        $scope.ManualCaseCreationConfig.Subject = 'Request for manual case creation';
        $scope.ManualCaseCreationConfig.Description = 'Manual case creation requested';
        $scope.ManualCaseCreationConfig.ContactName = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE1"; })[0].Value;
        $scope.ManualCaseCreationConfig.ContactNumber = $.grep($scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE2"; })[0].Value;
    }
    $scope.CreateManualCase = function () {
        if ($scope.ManualCaseCreationConfig.ContactName && $scope.ManualCaseCreationConfig.ContactNumber && $scope.ManualCaseCreationConfig.FromEmail && $scope.ManualCaseCreationConfig.ToEmail && $scope.ManualCaseCreationConfig.Subject && $scope.ManualCaseCreationConfig.Description) {
            _processCreateManualCase();
        }
        else {
            smartTALKNotificationError('All fields are mandatory.')
        }
    }

    function _processCreateManualCase() {
        var _agentEmailAddress = $scope.AgentPrerequisiteData.VitalEmailInfo.AgentRequestorInfo.AgentEmail;
        var _requestedAgentEmailId = $scope.AgentPrerequisiteData.VitalEmailInfo.AgentRequestorInfo.AgentEmailId;
        var oData = {
            "EmailCC": [],
            "EmailSourceAccount": $scope.ManualCaseCreationConfig.FromEmail,
            "AccountID": "X57D6M",
            "ReplyEmailTo": _agentEmailAddress,
            "Description": $scope.ManualCaseCreationConfig.Description,
            "Subject": $scope.ManualCaseCreationConfig.Subject,
            "Priority": "High",
            "Status": "Open",
            "RequestType": "Complaint",
            "ContactID": "",
            "SourceChannel": "EMAIL",
            "Product": "",
            "FollowupDate": "",
            "UserType": "Agent",
            "Team": "",
            "DueDate": "",
            "Agent": "",
            "REFID": "",
            "InteractionID": "",
            "BusinessHours": "Online",
            "RequestedBy": _requestedAgentEmailId,
            "Source": "DIRECT",
            "SourceID": "MANUAL",
            "Escalation": "No",
            "CallbackReq": "No",
            "FlowID": "",
            "Facebook": "",
            "Twitter": "",
            "UploadFileNames": [],
            "ListAttributes": "",
            "WhatsApp": "",
            "ContactNo": $scope.ManualCaseCreationConfig.ContactNumber,
            "EmailTo": $scope.ManualCaseCreationConfig.ToEmail,
            "Instagram": "",
            "Name": $scope.ManualCaseCreationConfig.ContactName,
            "AdditionalInfo": {},
            "AgentID": "",
            "TeamId": "",
            "saveFrom": "",
            "RequesterID": "",
            "ReqSrcChannelId": $scope.ManualCaseCreationConfig.FromEmail
        };

        _triggerCreateCaseViaLINK(oData)
            .then((data) => {
                console.log('_triggerCreateCaseViaLINK', data);
                if (data) {
                    var _data = JSON.parse(data);
                    if (_data["result"] == "Success") {
                        var _caseId = _data["caseid"];
                        if (_caseId) {
                            //Case Created
                            SendMessage($scope.hdsessionId, $scope.hdPhoneNo, _caseId, $scope.ActiveCustName.replace(/\'/g, ""), "", "", "", $scope.hdCHANNELID, $scope.CHANNELSOURCE);
                            smartTALKNotificationSuccess(_caseId);
                            $('#ManualCaseCreationModal').modal('hide');
                            _extendManualCaseCreationConfig();
                        }
                        else {
                            var _message = _data["data"] || '';
                            _message = _message + ' Failed to create case.';
                            smartTALKNotificationError(_message);
                        }
                    }
                    else {
                        var _message = _data["data"] || '';
                        _message = _message + ' Failed to create case.';
                        smartTALKNotificationError(_message);
                    }
                }
            })
            .catch((error) => {
                smartTALKNotificationError("Failed to create case. Please try again");
                console.log('_triggerCreateCaseViaLINK error', error);
            });
    }
    //#endregion

    document.body.addEventListener("keydown", function (e) {
        e = e || window.event;
        var key = e.which || e.keyCode; // keyCode detection
        var c = e.altKey ? e.altKey : ((key === 18) ? true : false); // ctrl detection

        if (key == 9) { // HSM div tabbing 
            var divlength = $scope.ControlDetails.length - 1;
            if (e.target.id.split("-")[1] == divlength) {
                var NewId = 0;
            }
            else {
                var NewId = parseInt(e.target.id.split("-")[1]) + 1
            }

            $("#Tab-" + NewId).focus();
        }
        //HSM div tabbing end

        if (key == 49 && c) {
            if ($("#Interaction1").length > 0) {
                $("#Interaction1").click();
            }
            //alert("c + 1 Pressed !");
        } else if (key == 50 && c) {
            if ($("#Interaction2").length > 0) {
                $("#Interaction2").click();
            }
            //alert("c + 2 Pressed !");
        } else if (key == 51 && c) {
            if ($("#Interaction3").length > 0) {
                $("#Interaction3").click();
            }
            //alert("c + 3 Pressed !");
        } else if (key == 52 && c) {
            if ($("#Interaction4").length > 0) {
                $("#Interaction4").click();
            }
            //alert("c + 4 Pressed !");
        } else if (key == 53 && c) {
            alert("c + 5 Pressed !");
        } else if (key == 54 && c) {
            alert("c + 6 Pressed !");
        } else if (key == 55 && c) {
            alert("c + 7 Pressed !");
        } else if (key == 37 && c) {
            alert("c + leftarrow Pressed !");
        } else if (key == 39 && c) {
            alert("c + rightarrow Pressed !");
        }

    }, false);

    //#region load email templates
    $scope.selectedagentEmailTemplateItemChanged = selectedagentEmailTemplateItemChanged;
    function selectedagentEmailTemplateItemChanged() {
        funBindEmailTemplateBasedOnSubject($scope.ddlAgentEmailTemplate);
    }

    function funBindEmailTemplateBasedOnSubject(ddlAgentEmailTemplate) {
        if (ddlAgentEmailTemplate == null) {
            $scope.editorModel = "";
            $scope.AppendToeditorModel = "";
        } else {
            $scope.AppendToeditorModel = $.grep(
                $scope.smartTALKAgentEmailTemplateList,
                function (v) {
                    return v.TemplateSubject === ddlAgentEmailTemplate.TemplateSubject;
                }
            );

            $(".trumbowyg-editor").focus();
            $(".trumbowyg-editor").trumbowyg("restoreRange");
            $("#txtEmailBodyEditor").trumbowyg("execCmd", {
                cmd: "insertText",
                param: "$$append$$",
                forceCss: false,
            });
            var html = $(".trumbowyg-editor").html();
            $(".trumbowyg-editor").html("");
            $scope.editorModel = html;
            $scope.editorModel = $scope.editorModel.replace(
                "$$append$$",
                $filter("EmailFilterSpecialChar")($scope.AppendToeditorModel[0].TemplateBody)
            );
        }
    }

    function removeEmptyPtag() {
        $(".trumbowyg-editor p").each(function () {
            var $this = $(this);
            if ($this.html().replace(/\s|&nbsp;/g, "").length == 0) $this.remove();
        });
    }
    //#endregion
});
