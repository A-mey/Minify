﻿var NoInterNetAvailable = [];

var NoInterNetAvailableMSG = {
    SessionId: '',
    number: '',
    strMSG: '',
    AgentName: '',
    txturl: '',
    imagepath: '',
    Extension: '',
    CHANNELID: ''
};

function LoadForm() {
    $.ajax({
        type: "POST",
        url: "SmartAgent.aspx/AgentLoginInfo",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            try {

                var scope = angular.element($('#ChatArea')).scope();
                scope.$applyAsync(function () {
                    var agentInfo = JSON.parse(json.d)[0];
                    //console.log('agentInfo', agentInfo);
                    scope.smartTALKAgentName = agentInfo.NAME;
                    scope.smartTALKAgentName_GroupChat = agentInfo.Name + '|' + agentInfo.AGENTID;
                    scope.smartTALKAgentLOGINTIME = agentInfo.LOGINTIME;
                    scope.smartTALKAgentNOTREADYTIME = agentInfo.NOTREADYTIME;
                    scope.smartTALKAgentTYPE = agentInfo.TYPE;
                    //Load Supervisor Ready NotReady Dropdown
                    if (scope.smartTALKAgentTYPE.toUpperCase() == 'SUPERVISOR') {
                        scope._getNotReadyMasterSupervisor(scope.selectedTranslation.LanguageCode);
                    }
                    else if (scope.smartTALKAgentTYPE.toUpperCase() == 'AGENT') {
                        scope.smartTALKAgentstasListGet(scope.selectedTranslation.LanguageCode);
                    }
                    scope.smartTALKAgentSTATUS = agentInfo.STATUS;
                    scope.smartTALKAgentACTIVETABE = agentInfo.ACTIVETABE;
                    scope.smartTALKAgentACTIVECUSTOMERAGENT = agentInfo.ACTIVECUSTOMERAGENT;
                    scope.AGENTID = agentInfo.AGENTID;
                    scope.AgentLoginID = agentInfo.AGENTLOGINID;
                    scope.NotReadyReason = agentInfo.NOTREADYREASON;
                    scope.AgentPreferredLanguage = agentInfo.AGENTPREFERREDLANGUAGES;
                    scope.WRAPEFROMURL = agentInfo.WRAPEFROMURL;
                    scope.selectedItem = (agentInfo.STATUS.toUpperCase() == "READY") ? "Ready" : _sanatizeNotReadyReason(agentInfo.NOTREADYREASON);
                    //scope.selectedItem = (agentInfo.STATUS.toUpperCase() == "READY") ? "Ready" : "NotReady";
                    scope.WRAPEFROM = (agentInfo.WRAPEFROM == "true") ? true : false;
                    //console.log('LoadForm() ', scope.selectedItem);
                    _showHideReadyNotReadyTimeAndIcon(scope);
                    funAgentLoginTime();
                });
                //$('#cinfotab a').click();
                var _voiceUrl = oAgentURL.NexmoVoiceURL.replace("$$AgentLoginID$$", scope.AgentLoginID);
                $('#iframeVoice').prop('src', _voiceUrl);
            } catch (e) { console.log('LoadForm() catch error', e); }
        },
        error: function (xhr, ajaxOptions, thrownError) { console.log('LoadForm() error', xhr); }
    });
}

function _sanatizeNotReadyReason(notReadyReason) {
    var retu = notReadyReason || 'NotReady';
    retu = retu.split(' - ')[0];
    retu = (retu == 'NOTREADY') ? 'NotReady' : retu;
    return retu;
}

function _showHideReadyNotReadyTimeAndIcon(scope) {

    var selStatus = scope.selectedItem.toUpperCase();
    if (scope.smartTALKActiveSessionList.length == 0) {
        if (selStatus == "READY") {
            scope.notreadytimestatus = false;
            $('#agentpic').removeClass("ico-notready").addClass("ico-ready");
            $("#notreadytime").addClass("ng-hide");
        }
        else {
            scope.notreadytimestatus = true;
            $('#agentpic').removeClass("ico-ready").addClass("ico-notready");
            $("#notreadytime").removeClass("ng-hide");

            funAgentNotReadyTime();
        }
    }
    else {
        if (selStatus == "READY") {
            $('#agentpic').removeClass("ico-notready").addClass("ico-ready");
        }
        else {
            $('#agentpic').removeClass("ico-ready").addClass("ico-notready");
        }
        scope.notreadytimestatus = false;
        $("#notreadytime").addClass("ng-hide");
    }
}

function stopnotification() {
    // PageMethods.SendTypingNotification("nottyping", $("#hdnActiveCustomerSelection").val(), $("#hdsessionId").val());
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/SendTypingNotification",
            data: "{typingstatus:'nottyping' , UID:'" + $("#hdnActiveCustomerSelection").val() + "', SESSIONID:'" + $("#hdsessionId").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (json) { },
            error: function (xhr, ajaxOptions, thrownError) { }
        });
    } catch (e) { }
}

function sendnotification() {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/SendTypingNotification",
            data: "{typingstatus:'typing' , UID:'" + $("#hdnActiveCustomerSelection").val() + "', SESSIONID:'" + $("#hdsessionId").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (json) { },
            error: function (xhr, ajaxOptions, thrownError) { }
        });
    } catch (e) { }
}

function SendMessage(SessionId, number, strMSG, AgentName, txturl, imagepath, Extension, CHANNELID, channelSource) {
    $("#divInvalidFile").html('');
    if (strMSG == "" && imagepath == "" && txturl == "") {
        return "";
    }
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/SendMessage",
            data: "{SessionId:'" + SessionId + "',number:'" + number + "',strMSG:'" + strMSG + "',AgentName:'" + AgentName + "',txturl:'" + txturl + "',imagepath:'" + encodeURIComponent(imagepath) + "',Extension:'" + Extension + "',CHANNELID:'" + CHANNELID + "',channelSource:'" + channelSource + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                FunBindCoustomerList(JSON.parse(json.d).data, false);
				var scope = angular.element($('#ChatArea')).scope();
				scope.txtmessage = "";
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('SendMessage() error', xhr);
                //var _NoInterNetAvailableMSG = new NoInterNetAvailableMSG;
                //_NoInterNetAvailableMSG.SessionId = SessionId;
                //_NoInterNetAvailableMSG.number = number;
                //_NoInterNetAvailableMSG.strMSG = strMSG;
                //_NoInterNetAvailableMSG.txturl = txturl;
                //_NoInterNetAvailableMSG.imagepath = imagepath;
                //_NoInterNetAvailableMSG.Extension = Extension;
                //_NoInterNetAvailableMSG.CHANNELID = CHANNELID;
                //NoInterNetAvailable.push(_NoInterNetAvailableMSG)
            }
        });

    } catch (e) {
        console.log('SendMessage() catch error');
    }
}

function InvalidFileAlert(msg) {

    $('#divInvalidFile').html(msg);
    $('#divInvalidFile').show();
}

function GetCustomerinfo(hdPhoneNo) {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetCustomerinfo",
            data: "{SessionId:'" + hdPhoneNo + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                if ("d" in json && json.d !== "null" && json.d !== null && json.d !== '' && json.d !== 'undefined') {
                    try {
                        var scope = angular.element($('#ChatArea')).scope();
                        if (scope.hdPhoneNo == hdPhoneNo) {
                            //_syncDispositionDetailsWithCurrentInteraction(json);

                            scope.$applyAsync(function () {
                                scope.smartTALKCustomerDetails(JSON.parse(json.d));
                                try {
                                    scope.dispoformEmail = JSON.parse(json.d)[3].Value;
                                    scope.dispoformLeadID = JSON.parse(json.d)[2].Value;

                                    if (scope.post == true || scope.postFB == true || scope.postTWITER == true) {
                                        scope.CUSTOMERATTRIBUTE = 'CUSTOMERATTRIBUTE7';
                                        scope.CUSTOMERATTRIBUTEVALUE = JSON.parse(json.d)[7].Value;
                                    }
                                    else if (scope.hdCHANNELID === 'WEBCHAT' || scope.hdCHANNELID === 'WHATSAPP' || scope.hdCHANNELID === 'SMS' || scope.hdCHANNELID === 'EMAIL' ||
                                        $scope.hdCHANNELID === 'FB' || $scope.hdCHANNELID === 'TWITTER' || $scope.hdCHANNELID === 'FBCHAT' || $scope.hdCHANNELID === 'TWITTERDM'
                                        || $scope.hdCHANNELID === 'INSTAGRAMPOST' || $scope.hdCHANNELID === 'VOICE') {
                                        if (scope.DynamicCustomerHistorySearchParams) {
                                            var arrCustomerAttributeName = [];
                                            var arrCustomerAttributeVal = [];
                                            $.each(scope.DynamicCustomerHistorySearchParams, function (index, value) {
                                                var customerAttributeValueIndex = parseInt(value.CustomerAttributeValueIdx);
                                                arrCustomerAttributeName.push(value.CustomerAttributeKey);
                                                arrCustomerAttributeVal.push(JSON.parse(json.d)[customerAttributeValueIndex].Value);
                                                scope.DynamicCustomerHistorySearchParams[index].CustomerAttributeValue = JSON.parse(json.d)[customerAttributeValueIndex].Value;
                                                if (clientConfig.MaskingConfig.ISMaskingEnabled) {
                                                    scope.DynamicCustomerHistorySearchParams[index].CustomerAttributeValue = [];
                                                }

                                                //masking key flag
                                            });
                                        }
                                        scope.CUSTOMERATTRIBUTE = arrCustomerAttributeName.join("^");
                                        scope.CUSTOMERATTRIBUTEVALUE = arrCustomerAttributeVal.join("^");
                                        scope.oCustomerChatHistoryResponseMSG = [];
                                    }
                                    else {
                                        scope.CUSTOMERATTRIBUTE = 'CUSTOMERATTRIBUTE30';
                                        scope.CUSTOMERATTRIBUTEVALUE = JSON.parse(json.d)[30].Value;
                                    }
                                }
                                catch (e) {
                                    console.log('GetCustomerinfo() scope.apply catch error');
                                }
                                if (scope.WRAPEFROM == true) {
                                    setTimeout(function a() {
                                        scope.smartTALKWRAPEFROMURL(scope.WRAPEFROMURL);
                                    }, 1000);
                                }
                            });

                            _refreshTabsWithIframe(json);
                            //Added by Priyanka on 22-05-2021
                            if (clientConfig.ModuleConfig.IsSAPModuleEnabled) {
                                var _Sap_Channel = "CHAT"
                                var _Sap_id = scope.hdsessionId;
                                if (scope.ActiveChannel == "VOICE") { _Sap_Channel = "CALL"; }


                                NotifyInviteToSAP(_Sap_id, _Sap_Channel, 'INBOUND', 'NOTIFY', scope.CUSTID, '', JSON.parse(json.d)[2].Value, scope.hdCHANNELID.toUpperCase());
                            }
                        }
                    }
                    catch (e) {
                        console.log('GetCustomerinfo() success catch error');
                    }
                }
                else {
                    //console.log('GetCustomerinfo() json was empty for ', hdPhoneNo);
                    console.log("%c GetCustomerinfo() json was empty for : " + hdPhoneNo, "color:" + 'red' + ";font-weight:bold;");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('GetCustomerinfo() error', xhr);
            }
        });
    } catch (e) {
        console.log('GetCustomerinfo() catch error');
    }
}

//Added by Priyanka on 22-05-2021
function NotifyInviteToSAP(strSessionId, strType, strEventType, strAction, strEmail, strInteractionType, PhoneNumber, strChannel) {
    try {
        var strSessionIdTemp = strSessionId.replace(/\|/g, '').replace(/\-/g, '');
        var SessionIDNew = strSessionIdTemp.substr(strSessionIdTemp.length - 20);
        var oPayload = null;

        if (strChannel == 'EMAIL') {
            oPayload = {
                payload: {
                    Type: strType, EventType: strEventType,
                    Action: strAction,
                    Email: strEmail,
                    ExternalReferenceID: SessionIDNew
                }
            };
        }
        else {
            oPayload = {
                payload: {
                    Type: strType, EventType: strEventType,
                    Action: strAction,
                    ExternalReferenceID: SessionIDNew,
                    ANI: PhoneNumber
                }
            };
        }
        var sPayload = null;

        sPayload = JSON.stringify(oPayload);

        console.log('Notify Event payload : ' + sPayload);
        window.parent.postMessage(oPayload, "*");
        // window.postMessage(oPayload, "*");


    } catch (e) {
        alert(e.message);
    }


    if (strInteractionType == 'OUTBOUND') {
        //setTimeout(function () { FocusOnInteraction(strSessionId, null); }, 1000);        
    }
}


function _syncDispositionDetailsWithCurrentInteraction(json) {
    try {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            if (sessionStorage.getItem(scope.hdsessionId)) {
                dispositionDetailsWithInteraction = JSON.parse(sessionStorage.getItem(scope.hdsessionId));
                funSubDisposition(dispositionDetailsWithInteraction.disposition.selected.DispostionName);

                scope.dispoformDisposition = dispositionDetailsWithInteraction.disposition;
                scope.dispoformSubDisposition = dispositionDetailsWithInteraction.subdisposition;
                scope.dispoformRemarks = dispositionDetailsWithInteraction.dispositionRemark;
            }
        });
    } catch (e) {
        console.log('_syncDispositionDetailsWithCurrentInteraction() catch error');
    }
}

function _refreshTabsWithIframe(json) {
    try {

        var activeInteractionName = JSON.parse(json.d)[0].Value;
        var activeInteractionContactNumber = JSON.parse(json.d)[2].Value;
        var activeInteractionEmailID = JSON.parse(json.d)[3].Value;

        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            scope.shadowBrowseSessionID = scope.hdPhoneNo;
            if (scope.ShadowBrowseTabConfig.IsShadowBrowseTabDisplayed && scope.activeTabID === 'shadowbrowsingtab') {
                $('#shadowBrowseImage').html('');
            }
            if (scope.FSMDataURL && scope.activeTabID === 'FSMTab') {
                var FSMDataURL = scope.FSMDataURL;
                FSMDataURL = FSMDataURL.replace('$$PHONENO$$', activeInteractionContactNumber);
                $('#iframeFSM').prop('src', FSMDataURL);
            }
            if (scope.KMDataURL && scope.activeTabID === 'KMTab') {
                var KMDataURL = scope.KMDataURL;
                KMDataURL = KMDataURL.replace('$$SEARCHKEY$$', 'Policy');
                $('#iframeKM').prop('src', KMDataURL);
            }
            if (scope.LINKDataURL && scope.activeTabID === 'LINKTab') {
                var LINKDataURL = scope.LINKDataURL;
                // LINKDataURL = LINKDataURL.replace('$$EMAILID$$', activeInteractionEmailID);
                // LINKDataURL = LINKDataURL.replace('$$PHONENO$$', activeInteractionContactNumber);
                // LINKDataURL = LINKDataURL.replace('$$CUSTOMERATTRIBUTE10$$', JSON.parse(json.d)[10].Value);
                // LINKDataURL = LINKDataURL.replace('$$AGENTID$$', scope.AGENTID);

                if (scope.hdCHANNELID == 'WEBCHAT') {
                    LINKDataURL = LINKDataURL.replace('$$CHANNELID$$', scope.hdCHANNELID);
                    LINKDataURL = LINKDataURL.replace('$$EMAILID$$', JSON.parse(json.d)[3].Value); //cust email id
                    LINKDataURL = LINKDataURL.replace('$$MOBILENO$$', activeInteractionContactNumber);
                    LINKDataURL = LINKDataURL.replace('$$POLICYNO$$', '');
                    LINKDataURL = LINKDataURL.replace('$$FBID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$WHATSAPPID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$TWITTERID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$CASEID$$', JSON.parse(json.d)[13].Value); //ticket no
                    LINKDataURL = LINKDataURL.replace('$$AGENTEMAILID$$', scope.AgentPrerequisiteData.AgentEmailId); //agent email id
                }
                else if (scope.hdCHANNELID == 'FB' || scope.hdCHANNELID == 'FBCHAT') {
                    LINKDataURL = LINKDataURL.replace('$$CHANNELID$$', scope.hdCHANNELID);
                    LINKDataURL = LINKDataURL.replace('$$EMAILID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$MOBILENO$$', activeInteractionContactNumber);
                    LINKDataURL = LINKDataURL.replace('$$FBID$$', scope.PhoneNo);
                    LINKDataURL = LINKDataURL.replace('$$WHATSAPPID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$TWITTERID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$INSTAGRAMID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$POLICYNO$$', '');
                    LINKDataURL = LINKDataURL.replace('$$CASEID$$', JSON.parse(json.d)[13].Value); //ticket no
                    LINKDataURL = LINKDataURL.replace('$$AGENETMAILID$$', scope.AgentPrerequisiteData.AgentEmailId); //agent email id
                }
                else if (scope.hdCHANNELID == 'INSTAGRAM') {
                    LINKDataURL = LINKDataURL.replace('$$CHANNELID$$', scope.hdCHANNELID);
                    LINKDataURL = LINKDataURL.replace('$$EMAILID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$MOBILENO$$', activeInteractionContactNumber);
                    LINKDataURL = LINKDataURL.replace('$$FBID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$WHATSAPPID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$TWITTERID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$INSTAGRAMID$$', scope.PhoneNo);
                    LINKDataURL = LINKDataURL.replace('$$POLICYNO$$', '');
                    LINKDataURL = LINKDataURL.replace('$$CASEID$$', JSON.parse(json.d)[13].Value); //ticket no
                    LINKDataURL = LINKDataURL.replace('$$AGENTEMAILID$$', scope.AgentPrerequisiteData.AgentEmailId); //agent email id
                }
                else if (scope.hdCHANNELID == 'TWITTER') {
                    LINKDataURL = LINKDataURL.replace('$$CHANNELID$$', scope.hdCHANNELID);
                    LINKDataURL = LINKDataURL.replace('$$EMAILID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$MOBILENO$$', activeInteractionContactNumber);
                    LINKDataURL = LINKDataURL.replace('$$FBID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$WHATSAPPID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$TWITTERID$$', scope.PhoneNo);
                    LINKDataURL = LINKDataURL.replace('$$INSTAGRAMID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$POLICYNO$$', '');
                    LINKDataURL = LINKDataURL.replace('$$CASEID$$', JSON.parse(json.d)[13].Value); //ticket no
                    LINKDataURL = LINKDataURL.replace('$$AGENTEMAILID$$', scope.AgentPrerequisiteData.AgentEmailId); //agent email id
                }
                else if (scope.hdCHANNELID == 'WHATSAPP') {
                    LINKDataURL = LINKDataURL.replace('$$CHANNELID$$', scope.hdCHANNELID);
                    LINKDataURL = LINKDataURL.replace('$$EMAILID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$MOBILENO$$', activeInteractionContactNumber);
                    LINKDataURL = LINKDataURL.replace('$$FBID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$WHATSAPPID$$', scope.PhoneNo);
                    LINKDataURL = LINKDataURL.replace('$$TWITTERID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$INSTAGRAMID$$', '');
                    LINKDataURL = LINKDataURL.replace('$$POLICYNO$$', '');
                    LINKDataURL = LINKDataURL.replace('$$CASEID$$', JSON.parse(json.d)[13].Value); //ticket no
                    LINKDataURL = LINKDataURL.replace('$$AGENTEMAILID$$', scope.AgentPrerequisiteData.AgentEmailId); //agent email id
                }
                else if (scope.hdCHANNELID == 'EMAIL') {
                    //LINKDataURL = LINKDataURL.replace('$$CASEID$$', JSON.parse(json.d)[4].Value); //Case ID
                    //LINKDataURL = LINKDataURL.replace('$$AGENTID$$', scope.AGENTID);
                    //LINKDataURL = LINKDataURL.replace('$$SESSIONID$$', scope.hdsessionId);
                    //LINKDataURL = LINKDataURL.replace('$$PHONENO$$', scope.hdPhoneNo);
                    //LINKDataURL = LINKDataURL.replace('$$AGENTEMAILID$$', scope.AgentPrerequisiteData.AgentEmailId);
                    //console.log('Service', LINKDataURL);
                }
                //$('#iframeLINK').prop('src', LINKDataURL);

            }
            if (scope.CRMTabConfig.IsCRMTabDisplayed && scope.activeTabID === 'ccrmtab') {
                var CRMLinkDataURL = scope.CRMTabConfig.CRMLinkDataURL;
                CRMLinkDataURL = CRMLinkDataURL.replace('$$ACTION$$', 'SearchLead');
                CRMLinkDataURL = CRMLinkDataURL.replace('$$SEARCHOBJECT$$', 'Lead');
                CRMLinkDataURL = CRMLinkDataURL.replace('$$EMAILID$$', activeInteractionEmailID);
                CRMLinkDataURL = CRMLinkDataURL.replace('$$PHNO$$', activeInteractionContactNumber);
                CRMLinkDataURL = CRMLinkDataURL.replace('$$FBID$$', '');
                CRMLinkDataURL = CRMLinkDataURL.replace('$$TWITTERID$$', '');
                CRMLinkDataURL = CRMLinkDataURL.replace('$$LINKEDINID$$', '');

                $('#iframecrm').prop('src', CRMLinkDataURL);
            }
            if (scope.SocialPresenceTabConfig.IsSocialPresenceTabDisplayed && scope.activeTabID === 'SocialPresenceTab') {
                var handleName = '';
                if (scope.hdCHANNELID === 'TWITTER') {
                    handleName = '@' + JSON.parse(json.d)[29].Value;
                }
                else if (scope.hdCHANNELID === 'TWITTERDM') {
                    handleName = '@' + JSON.parse(json.d)[9].Value;
                }
                else if (scope.hdCHANNELID === 'CRAWL') {
                    handleName = '@' + JSON.parse(json.d)[7].Value;
                }
            }
        });

    } catch (e) {
        console.log('_refreshTabsWithIframe() catch error');
    }
}


function GetActiveCustRecentChat(sessionId, attrKey, attrValue, channel, fromDate, toDate) {
    $('#divCustomerHistoryContainer').addClass('bg-blur');
    var customerJourneyIP = {
        ATTRKEY: attrKey,
        ATTRVALUE: attrValue,
        PROCESSID: "",
        FETCHCOUNT: 20,
        TRANSCRIPTID: "",
        CHANNEL: channel,
        FROMDATE: fromDate,
        TODATE: toDate,
        CESESSIONID: sessionId,
        ACTION: "FETCH_INTERACTION"
    };

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetActiveCustRecentChat",
            data: JSON.stringify({ 'oCustomerJourneyIP': customerJourneyIP }),
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
            },
            complete: function (data) {
                $('#divCustomerHistoryContainer').removeClass('bg-blur');
            }
        })
    })
}

function GetActiveCustRecentChatCustom(sessionID, oCustomCustomerHistorySearch) {
    var SelectedSearchVal1 = oCustomCustomerHistorySearch.SelectedSearchVal1;
    var SelectedSearchVal2 = oCustomCustomerHistorySearch.SelectedSearchVal2;
    var SelectedSearchPara1 = oCustomCustomerHistorySearch.SelectedSearchPara1.CUSTOMERATTRIBUTEKEY;
    var SelectedSearchPara2 = oCustomCustomerHistorySearch.SelectedSearchPara2.CUSTOMERATTRIBUTEKEY;
    var CUSTOMERATTRIBUTEKEY = '';
    var CUSTOMERATTRIBUTEVALUE = '';
    var CUSTOMERATTRIBUTSEARCHCRITERION = '';

    if (oCustomCustomerHistorySearch.SelectedSearchCondition.id) {
        CUSTOMERATTRIBUTSEARCHCRITERION = oCustomCustomerHistorySearch.SelectedSearchCondition.id;
        CUSTOMERATTRIBUTEKEY = SelectedSearchPara1 + '^' + SelectedSearchPara2;
        CUSTOMERATTRIBUTEVALUE = SelectedSearchVal1 + '^' + SelectedSearchVal2;
    }
    else {
        CUSTOMERATTRIBUTSEARCHCRITERION = 'or';
        CUSTOMERATTRIBUTEKEY = SelectedSearchPara1;
        CUSTOMERATTRIBUTEVALUE = SelectedSearchVal1;
    }

    getCustomerJourneyCustom(sessionID, CUSTOMERATTRIBUTEKEY, CUSTOMERATTRIBUTEVALUE, CUSTOMERATTRIBUTSEARCHCRITERION);
}

function getCustomerJourneyCustom(sessionID, CUSTOMERATTRIBUTEKEY, CUSTOMERATTRIBUTEVALUE, CUSTOMERATTRIBUTSEARCHCRITERION) {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetActiveCustRecentChatCustom",
            data: "{SessionId:'" + sessionID + "', CUSTOMERATTRIBUTEKEY:'" + CUSTOMERATTRIBUTEKEY + "', CUSTOMERATTRIBUTEVALUE:'" + CUSTOMERATTRIBUTEVALUE + "', CUSTOMERATTRIBUTSEARCHCRITERION:'" + CUSTOMERATTRIBUTSEARCHCRITERION + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                try {
                    var scope = angular.element($('#ChatArea')).scope();
                    var activeCustRecentChatResultJSON = [];
                    if (json.d !== '') {
                        activeCustRecentChatResultJSON = JSON.parse(json.d);
                    }
                    scope.$applyAsync(function () {
                        scope.smartTALKCustomerHistory(activeCustRecentChatResultJSON);
                    });
                } catch (e) { }
            },
            error: function (xhr, ajaxOptions, thrownError) { }
        });
    } catch (e) { }
}

function GetParkingHistoery() {
    try {
        var scope = angular.element($('#ChatArea')).scope();
        var data = "{ skill: '' }";
        if (scope.chkIsSkillFilter) {
            data = "{ skill: '" + scope.ddlSelectedAgentAssignedSkills.id + "' }";
        }
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetParkingHistoery",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $("#tblParkedInteraction").addClass('bg-blur');
            },
            success: function (json) {
                try {
                    scope.$applyAsync(function () {
                        scope.funsmartTALKCustomerParkHistoryList(JSON.parse(json.d));
                    });

                } catch (e) { console.log('GetParkingHistoery() success catch error'); }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('GetParkingHistoery() error : ', xhr);
            },
            complete: function () {
                $("#tblParkedInteraction").removeClass('bg-blur');
            }
        });
    } catch (e) { console.log('GetParkingHistoery() catch error'); }
}

function GetParkingHistoeryForSuperviser() {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetParkingHistoerySuperviser",
            data: "{Channel:'" + $("#ddlchnl").val() + "',Agent:'" + $("#ddlAgentlistFilter").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                try {
                    var scope = angular.element($('#ChatArea')).scope();
                    scope.$applyAsync(function () {
                        scope.funsmartTALKCustomerParkHistoryListForSupervisor(JSON.parse(json.d));
                    });

                } catch (e) { console.log('GetParkingHistoeryForSuperviser() success catch error'); }
            },
            error: function (xhr, ajaxOptions, thrownError) { console.log('GetParkingHistoeryForSuperviser() error'); }
        });
    } catch (e) { console.log('GetParkingHistoeryForSuperviser() catch error'); }
}

function GetChannel() {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/smartTALKCustomerParkChannels",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                try {
                    if (json.d !== "") {
                        var scope = angular.element($('#ChatArea')).scope();
                        scope.$applyAsync(function () {
                            scope.funsmartTALKCustomerParkChannels(JSON.parse(json.d));
                        });
                    }
                } catch (e) {
                    console.log('GetChannel() success catch error');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('GetChannel() error');
            }
        });
    } catch (e) {
        console.log('GetChannel() catch error');
    }
}

function GetAgentList() {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetAgentList",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                try {
                    if (json.d !== "") {
                        var scope = angular.element($('#ChatArea')).scope();
                        scope.$applyAsync(function () {
                            scope.funsmartTALKAgentList(JSON.parse(json.d));
                        });
                    }
                } catch (e) {
                    console.log('GetAgentList() success catch error');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('GetAgentList() error');
            }
        });
    } catch (e) {
        console.log('GetAgentList() catch error');
    }
}

function ParkingHistoeryOutbound(id, EmailCaseID) {
    try {
        //$("#Bind_Recent_Chat tr").removeClass("Selecation");
        //$("#Bind_Recent_Chat " + "#" + id).addClass("Selecation");
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/ParkingHistoeryOutbound",
            data: "{id:'" + id + "', emailCaseID:'" + EmailCaseID + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                console.log('ParkingHistoeryOutbound() success', json);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('ParkingHistoeryOutbound() error', xhr);
            }
        });
    } catch (e) {
        console.log('ParkingHistoeryOutbound() catch error');
    }
}

//function Get_Recent_Chat_Transcript(id) {
//    try {
//        $.ajax({
//            type: "POST",
//            url: "SmartAgent.aspx/GetActiveCustRecentChatHistoery",
//            data: "{id:'" + id + "'}",
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            // async: true,
//            success: function (json) {
//                //  Bind_Recent_Chat_Transcript(JSON.parse(json.d))
//                var scope = angular.element($('#ChatArea')).scope();
//                scope.$applyAsync(function () {
//                    scope.smartTALKCustomerHistorydetails(JSON.parse(json.d));
//                });
//            },
//            error: function (xhr, ajaxOptions, thrownError) {
//            }
//        });
//    } catch (e) {
//        //
//    }
//}

function _fetchCustomerJourneyTranscript(TranscriptId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/fetchCustomerJourneyTranscript",
            data: "{transcriptId:'" + TranscriptId + "'}",
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

function GetAgentCustRecentChat() {

    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetAgentRecentChat",
            data: JSON.stringify({ '_CLASS_AgentDisposationHistoreyData': CustRecentChat }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $("#tblMyChatHistoryInteraction").addClass('bg-blur');
            },
            success: function (json) {
                var scope = angular.element($('#ChatArea')).scope();
                scope.$applyAsync(function () {
                    scope.smartTALKFilterMyChatHistoryBind(JSON.parse(json.d));
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {

            },
            complete: function () {
                $("#tblMyChatHistoryInteraction").removeClass('bg-blur');
            }
        });

    } catch (e) {
        //
    }
}

//outbound for my chat hsitory
function GetAgentCustRecentChatWithOutbound() {
    try {

        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetAgentRecentChatforOutbound",
            data: JSON.stringify({ '_CLASS_AgentDisposationHistoreyData': CustRecentChat }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $("#tblMissedInteraction").addClass('bg-blur');
            },
            success: function (json) {
                var scope = angular.element($('#ChatArea')).scope();
                if (json && json.d) {

                    scope.$applyAsync(function () {
                        scope.smartTALKFilterMOutboundBind(JSON.parse(json.d));
                    });
                }
                else {
                    scope.smartTALKNotificationError("There is no missed interaction found for the mentioned dates.");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {

            },
            complete: function () {
                $("#tblMissedInteraction").removeClass('bg-blur');
            }
        });

    } catch (e) {
        //
    }
}
//

//HSM template list 
function GetAgentHSMTemplateList() {

    try {
        $("#myChatHistoryLoadIndicator").html("<i class='fa fa-refresh fa-spin'></i>");
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/requestHSMOutBoundList",
            data: JSON.stringify({ '_CLASS_AgentDisposationHistoreyData': CustRecentChat }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                var scope = angular.element($('#ChatArea')).scope();
                $('#HSMTemplateTable').DataTable().clear().destroy();
                scope.$applyAsync(function () {
                    scope.smartTALKFilterHSMTemplateBind(JSON.parse(json.d));
                    $("#myChatHistoryLoadIndicator").html("");

                    setTimeout(function () {
                        if (json.d == '[]') {
                            scope.smartTALKNotificationError("No Records Found.");
                        }
                        else {
                            $('#HSMTemplateTable').DataTable().destroy();
                            $('#HSMTemplateTable').DataTable(
                                {
                                    destroy: true,
                                    columnDefs: [{
                                        targets: 4,
                                        render: $.fn.dataTable.render.ellipsis(50)
                                    }]
                                }
                            );
                            $('#HSMTemplateTable').DataTable().draw();
                        }
                        $('#HSMTemplateTable_wrapper').find('div')[0].className = 'row col-lg-12';
                        $('#HSMTemplateTable_wrapper').find('div')[5].className = 'row col-lg-12';
                        $('#HSMTemplateTable_wrapper').find('div')[7].className = 'row col-lg-12';

                    }, 500);
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {

            }
        });

    } catch (e) {
        //
    }
}
//elipse with tooltip function
$.fn.dataTable.render.ellipsis = function (cutoff, wordbreak, escapeHtml) {
    var esc = function (t) {
        return t
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };

    return function (d, type, row) {
        // Order, search and type get the original data
        if (type !== 'display') {
            return d;
        }

        if (typeof d !== 'number' && typeof d !== 'string') {
            return d;
        }

        d = d.toString(); // cast numbers

        if (d.length < cutoff) {
            return d;
        }

        var shortened = d.substr(0, cutoff - 1);

        // Find the last white space character in the string
        if (wordbreak) {
            shortened = shortened.replace(/\s([^\s]*)$/, '');
        }

        // Protect against uncontrolled HTML input
        if (escapeHtml) {
            shortened = esc(shortened);
        }

        return '<span class="ellipsis" title="' + esc(d) + '">' + shortened + '&#8230;</span>';
    };
};
//

$('#HSMTemplateTable').DataTable({
    columnDefs: [{
        targets: 0,
        render: $.fn.dataTable.render.ellipsis()
    }]
});


function Get_Agent_Recent_Chat_Transcript(id) {
    try {
        CustRecentChat.SESSIONID = id;
        ajax = $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetAgentRecentChatHistoery",
            data: JSON.stringify({ '_CLASS_AgentDisposationHistoreyData': CustRecentChat }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                console.log('Ajax Response rec');
                var scope = angular.element($('#ChatArea')).scope();
                scope.$applyAsync(function () {
                    if (json.d != "") {
                        scope.smartTALKFilterMyChatHistoryBindDetails(JSON.parse(json.d));
                        //scope.smartTALKFilterMyChatHistoryBindDetailsList = JSON.parse(json.d);                        
                        console.log(json.d);
                    }
                    else {
                        scope.smartTALKFilterMyChatHistoryBindDetails([]);
                        //scope.smartTALKFilterMyChatHistoryBindDetailsList = [];
                    }
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {

            }
        });
    } catch (e) {
        //
    }
}

function CallRequestAgentDetails() {

    console.log('ReqAgentList event sent to CE');
    var scope = angular.element($('#ChatArea')).scope();
    //console.log('SelectedAgentGroup', scope.SelectedAgentGroup.GroupName);
    //console.log('otherAgentRequestCategoryType : ', scope.otherAgentRequestCategoryType);
    console.log('scope.otherAgentRequestDetail : ', scope.otherAgentRequestDetail);
    var oData = {};
    if (scope.otherAgentRequestCategoryType === 'AGENTWISE') {
        oData = "{RequestCategoryType:'" + scope.otherAgentRequestCategoryType + "', RequestDetail:'" + scope.otherAgentRequestDetail + "'}";
    }
    else {
        oData = "{RequestCategoryType:'" + scope.otherAgentRequestCategoryType + "', RequestDetail:'" + scope.SelectedAgentGroup.GroupName + "'}";
        var filteractiveagent = scope.otherAgentRequestCategoryType;
    }
    $("#otherAgentsLoadIndicator").html("Request Sent");
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/CallRequestAgentDetails",
            data: oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                $("#otherAgentsLoadIndicator").html("Fetching...");
                var rawData = json.d;
                if (rawData == 'false' || rawData == 'true') {
                    GetRequestAgentDetails('[]');
                    if (filteractiveagent == 'FILTERACTIVEAGENT' && rawData == "false") {
                        scope.$applyAsync(function () {

                            scope.smartTALKNotificationError("No agents having active chat");
                            // scope.smartTALKActiveSession(JSON.parse(json.d).data, true);
                        });
                    }
                }
                else {
                    GetRequestAgentDetails(rawData);
                }
                console.log('fetch RQ success', oData, rawData);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('CallRequestAgentDetails() error', xhr);
            }
        });
    } catch (e) {
        console.log('CallRequestAgentDetails() catch error');
    }
}


function GetRequestAgentDetails(json) {
    try {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            var otherAgents = JSON.parse(json);
            scope.smartTALKGetRequestAgentDetails(otherAgents);

            var otherAgentDetailStats = { totalAgentsCnt: 0, agentReadyCnt: 0, agentNotReadyCnt: 0 };
            scope.OtherAgentDetailStats = otherAgentDetailStats;
            for (var i = 0, len = otherAgents.length; i < len; i++) {
                var totalAgentsCnt = len;
                var agentStatus = otherAgents[i].AGENTSTATUS;
                var agentReadyCnt = 0;
                var agentNotReadyCnt = 0
                scope.OtherAgentDetailStats.totalAgentsCnt = totalAgentsCnt;
                if (agentStatus.search(/READY/i) === 0) {
                    agentReadyCnt = agentReadyCnt + 1;
                    scope.OtherAgentDetailStats.agentReadyCnt = agentReadyCnt;
                }
                if (agentStatus.search(/NOTREADY/i) === 0) {
                    agentNotReadyCnt = agentNotReadyCnt + 1;
                    scope.OtherAgentDetailStats.agentNotReadyCnt = agentNotReadyCnt;
                }
                console.log('scope.OtherAgentDetailStats', scope.OtherAgentDetailStats);
            }
        });
        //console.log('other agent received from CE', json);
        $("#autoRefreshAgentDetails,#autoRefreshAgentDetails2").removeClass("fa-spin");
        $("#otherAgentsLoadIndicator").html("");
    } catch (e) {
        console.log('GetRequestAgentDetails() catch error');
    }
}

function _fetchActiveInteractionList(selectedLangCode) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/BindGetCoustomer",
            data: "{}",
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


function funActiveCusomer(hdPhoneNo, hdnActiveCustomerSelection, hdsessionId, chanel) {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/ActiveCoustomerDatails",
            data: "{hdPhoneNo:'" + hdPhoneNo + "', hdnActiveCustomerSelection:'" + hdnActiveCustomerSelection + "', hdsessionId:'" + hdsessionId + "' , chanel:'" + chanel + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                //console.log('funActiveCusomer() success', json);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('funActiveCusomer() error', xhr);
            }
        });
    } catch (e) {
        console.log('funActiveCusomer() catch error');
    }
}

function htmlEntities(text) {
    text = text.replace(/\&/g, '&amp;');
    text = text.replace(/\</g, '&lt;');
    text = text.replace(/\>/g, '&gt;');
    text = text.replace(/\"/g, '&quot;');
    text = text.replace(/\'/g, '&apos;');
    return text;
}

function _IsVideoOutboundSessionavailable(trasncripts) {
    var UIDRegex = /[\d]*(\d+)/;
    let videoOutboundSessions = '';
    try {
        for (let [index, val] of trasncripts.entries()) {
            if (val.MSG.indexOf('Please join this below video link to have a video call now') !== -1) {
                videoOutboundSessions = videoOutboundSessions + val.MSG.match(UIDRegex)[0] + ",";
            }
        }
        videoOutboundSessions = videoOutboundSessions.substring(0, videoOutboundSessions.length - 1);
    } catch (e) { }
    return videoOutboundSessions;
}

function funActiveCusomerDispoed(PhoneNo, sessionId, Remark, Disposition, SubDisposition, Product, Name, Number, subsubdisposition, ProductDisposition, RequestOrigin, EmailCaseStatus) {
    try {
        try {
            let scope = angular.element($('#ChatArea')).scope();
            CLASS_Dispose.hdPhoneNo = PhoneNo;
            CLASS_Dispose.hdsessionId = sessionId;
            CLASS_Dispose.txtRemark = Remark;
            CLASS_Dispose.ddlDisposition = htmlEntities(Disposition);
            CLASS_Dispose.ddlSubDisposition = htmlEntities(SubDisposition);
            CLASS_Dispose.ddlProduct = Product;
            CLASS_Dispose.Name = Name;
            CLASS_Dispose.Number = Number;
            CLASS_Dispose.WRAPFORMFIELD4 = scope.dispoformLeadID;
            CLASS_Dispose.WRAPFORMFIELD17 = htmlEntities(subsubdisposition);
            CLASS_Dispose.WRAPFORMFIELD18 = htmlEntities(ProductDisposition); //product            
            CLASS_Dispose.WRAPFORMFIELD10 = EmailCaseStatus || '';
            CLASS_Dispose.REQUESTORIGIN = RequestOrigin;

            //#region of video Outbound recording 
            CLASS_Dispose.WRAPFORMFIELD20 = _IsVideoOutboundSessionavailable(scope.smartTALKChatList) || ""; // video session from video url 
            if (CLASS_Dispose.WRAPFORMFIELD20 !== "")
                CLASS_Dispose.WRAPFORMFIELD19 = "VIDEO";

            //AppSource was added to identify if interaction is of type Offline. we get the value from customerattribute30
            CLASS_Dispose.APPSOURCE = $.grep(scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE60"; })[0].Value;

        } catch (e) { }
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/ActiveCoustomerDispose",
            data: JSON.stringify({
                '_CLASS_Dispose': CLASS_Dispose
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
				var scope = angular.element($('#ChatArea')).scope();
				scope.invalidCharsinRemarks = false;
				if (json.d == "invalid characters found"){
					scope.smartTALKNotificationError("no special characters allowed in Remarks field.");
					scope.invalidCharsinRemarks = true;
					return;
					
				}
                var oData = JSON.parse(json.d);

                
                scope.$applyAsync(function () {
                    if (scope.UploadEmailAttachments.length > 0) {
                        var filteredDisposedEmailAttachments = scope.UploadEmailAttachments.filter(function (obj) {
                            return obj.CESessionId == scope.hdsessionId;
                        });
                        scope.UploadEmailAttachments = removeArrayElementByAttr(scope.UploadEmailAttachments, 'CESessionId', scope.hdsessionId);

                        _broadcastDeleteDisposeEmailAttachment('dispose', scope.hdsessionId, scope.UploadEmailAttachments, null);
                    }
                    scope.smartTALKActiveSession(oData, true);
                    setTimeout(function () {
                        if (scope.smartTALKActiveSessionList.length == 0) { LoadForm(); }
                    }, 5000);



                    //console.log('$scope.currentInteractionDetails', scope.currentInteractionDetails);
                    if (scope.currentInteractionDetails.INTERACTIONTYPE !== 'IM') {
                        if (scope.currentInteractionDetails.INTERACTIONTYPE !== 'SALIENTMONITORING') {
                            if (scope.smartTALKActiveSessionList.length <= 1) {
                                //$("#Disposition").click();
                                _CloseDispositionSlider();
                            }
                        }
                    }

                    if (!scope.CloseChat) {
                        //TODO This make IM disposition slider to appear again
                        //Please add other channel in or condition
                        //if (scope.hdCHANNELID === "WEBCHAT")
                        //{                            
                        //}
                        //else
                        //{
                        //    $("#Disposition").click();
                        //}
                    } else {
                        scope.CloseChat = false;

                        if (scope.smartTALKActiveSessionList.length > 0) {
                            for (var i = 0; i < scope.smartTALKActiveSessionList.length; i++) {
                                console.log('scope.smartTALKActiveSessionList[i]', scope.smartTALKActiveSessionList[i]);
                                if (scope.smartTALKActiveSessionList[i].SESSIONID === scope.hdsessionId) {
                                    scope.smartTALKClickActiveSession(scope.smartTALKActiveSessionList[i], i, '');
                                }
                            }
                        }
                    }


                });
				if (!scope.invalidCharsinRemarks){
					_clearDispositionForm();
				}
                sessionStorage.removeItem(sessionId);
                sessionStorage.removeItem(sessionId + '_chatMsg');
                deleteCookie(sessionId);

                //_BroadcastDisposeEvent(oData, PhoneNo, sessionId, Remark, Disposition, SubDisposition);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('funActiveCusomerDispoed() error', xhr);
            }
        });
    } catch (e) {
        console.log('funActiveCusomerDispoed() catch error', e);
    }
}

//kirti made this async: false to resolve "Use Here" pop-up issue.
function FunAgentLogout(agentLoggedOutReason) {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/AgentLogout",
            data: "{agentLoggedOutReason:'" + agentLoggedOutReason + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (json) {
                document.cookie = 'ASP.NET_SessionId=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/ ';
                console.log('FunAgentLogout success');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('AgentLogout error', xhr);
            }
        });
        window.location.href = $("#hidenDefaultPage").val();
        console.log('window.location.href', window.location.href);
    } catch (e) { }
}

function AgentstasList(selectedLangCode) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/BindNotReadyMaster",
            data: "{selectedLangCode:'" + selectedLangCode + "'}",
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

function _fetchNotReadyMasterSupervisor(selectedLangCode) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/BindNotReadyMasterSupervisor",
            data: "{selectedLangCode:'" + selectedLangCode + "'}",
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

function funSendAgentStatus(region) {
    try {
        $.ajax({

            type: "POST",
            url: "SmartAgent.aspx/SendAgentStatus",
            data: "{region:'" + region + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                if (json.d === "RESTRICT") {
                    NotifyRequestAlreadyInQueue('Request already in queue, Please try again after 30 seconds.');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('funSendAgentStatus() error', xhr);
            },
            complete: function () {
                //$('#agentReadyStateLoader').removeClass('fa fa-spinner fa-spin');
            }
        });
    } catch (e) { }
}

function funDisposition(selectedLangCode) {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/Disposition",
            data: "{selectedLangCode:'" + selectedLangCode + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                var scope = angular.element($('#ChatArea')).scope();
                scope.$applyAsync(function () {
                    scope.dispoformDispositionList = [];
                    scope.dispoformDispositionList = JSON.parse(json.d);
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('funDisposition() error', xhr);
            }
        });
    } catch (e) {
        console.log('funDisposition() catch error');
    }
}

function funProduct(selectedLangCode) {
    try {
        var scope = angular.element($('#ChatArea')).scope(); //product jay
        scope.$applyAsync(function () {
            scope.productformProductList = [];

            $.ajax({
                type: "POST",
                url: "SmartAgent.aspx/ProductDisposition",
                data: "{selectedLangCode:'" + selectedLangCode + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (json) {

                    var scope = angular.element($('#ChatArea')).scope();
                    scope.$applyAsync(function () {
                        if (json.d == '' || json.d == undefined) { }
                        else {
                            scope.dispoformSubDispositionList = [];
                            var productformProductList = JSON.parse(json.d);
                            scope.productformProductList = JSON.parse(json.d);
                        }

                    });
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('funSubDisposition() error', xhr);
                }
            });

            // scope.productformProductList = JSON.parse('[{"Id":90,"ProductName":"Sample Product","DispositionDesc":""},{"Id":91,"ProductName":"Product1","DispositionDesc":""},{"Id":92,"ProductName":"Product2","DispositionDesc":""}]');
        });
    } catch (e) {
        console.log('funDisposition() catch error');
    }
}

function funSubDisposition(id, selectedLangCode) {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/SubDisposition",
            data: "{dispositionID:'" + id + "',selectedLangCode:'" + selectedLangCode + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                var scope = angular.element($('#ChatArea')).scope();
                scope.$applyAsync(function () {
                    scope.dispoformSubDispositionList = [];
                    var subDispositionList = JSON.parse(json.d);
                    //if (subDispositionList.length === 1) {scope.dispoformSubDisposition = subDispositionList[0].SubdispositionName;}
                    scope.dispoformSubDispositionList = JSON.parse(json.d);
                    console.log('scope.dispoformSubDispositionList', scope.dispoformSubDispositionList);
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('funSubDisposition() error', xhr);
            }
        });
    } catch (e) {
        console.log('funSubDisposition() catch error');
    }
}

function funSubSubDisposition(SubDispo, dispo, selectedLangCode) {

    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/SubSubDisposition",
            data: "{dispositionID:'" + dispo.DispostionName + "',selectedLangCode:'" + selectedLangCode + "',SubdispositionID:'" + SubDispo.selected.SubdispositionName + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                if (json && json.d) {
                    var scope = angular.element($('#ChatArea')).scope();
                    scope.$applyAsync(function () {
                        scope.SubSubdispoformSubDispositionList = [];
                        var subsubDispositionList = JSON.parse(json.d);
                        //if (subDispositionList.length === 1) {scope.dispoformSubDisposition = subDispositionList[0].SubdispositionName;}
                        scope.SubSubdispoformSubDispositionList = JSON.parse(json.d);
                        console.log('scope.dispoformSubDispositionList', scope.SubSubdispoformSubDispositionList);
                    });
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('funSubDisposition() error', xhr);
            }
        });
    } catch (e) {
        console.log('funSubDisposition() catch error');
    }
}

function funAgentTranferRequestAction(x, action) {
    try {
        var agentStatus = x.AGENTSTATUS;

        if (agentStatus.indexOf("(") !== -1) { agentStatus = agentStatus.split("(")[0]; }

        var agentName = x.AGENTNAME;
        if (agentName.indexOf("(") !== -1) { agentName = agentName.split("(")[0]; }
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/AgentTranferRequestAction",
            data: "{ intACTIVESESSIONCOUNT:" + x.ACTIVESESSIONCOUNT + ", intAGENTCAPACITY:" + x.AGENTCAPACITY + ", StrTransferAgentId:" + x.AGENTID + ", StrTransferAgentName:'" + agentName + "', StrTransferAgentStatus:'" + agentStatus + "', selectvalue:'" + action + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (json) {

                var k = JSON.parse(json.d);
                if (JSON.parse(json.d).data.length == "0") {
                    if (JSON.parse(json.d).Erroer.Message != "") {
                        var scope = angular.element($('#ChatArea')).scope();
                        scope.$applyAsync(function () {
                            scope.smartTALKNotificationError(JSON.parse(json.d).Erroer.Message);
                            // scope.smartTALKActiveSession(JSON.parse(json.d).data, true);
                        });
                    }
                }
                else {

                    if (JSON.parse(json.d) != "") {
                        var scope = angular.element($('#ChatArea')).scope();
                        scope.$applyAsync(function () {
                            scope.smartTALKActiveSession(JSON.parse(json.d).data, true);
                        });
                    }
                }
            },

            error: function (xhr, ajaxOptions, thrownError) {

            }
        });

    } catch (e) { }
}

function funSuperviserRequestdata() {
    try {
        var flag = '';
        console.log('Sup request event sent to CE');
        var scope = angular.element($('#ChatArea')).scope();
        //console.log('SelectedAgentGroupSup', scope.SelectedAgentGroupSup.GroupName);
        var oData = {};
        if (scope.supRequestCategoryType === 'AGENTWISE') {
            oData = "{RequestCategoryType:'" + scope.supRequestCategoryType + "', RequestDetail:'" + scope.supRequestDetail + "'}";
        }
        else {
            oData = "{RequestCategoryType:'" + scope.supRequestCategoryType + "', RequestDetail:'" + scope.SelectedAgentGroupSup.GroupName + "'}";
            flag = scope.supRequestCategoryType;
        }
        $.ajax({
            global: false,
            type: "POST",
            url: "SmartAgent.aspx/SuperviserRequestdata",
            data: oData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            processData: true,
            success: function (data, status, jqXHR) {
                var rawData = data.d
                //var rawData = '{"AGENT":[{"AGENTID":5,"AGENTNAME":"KH-Agent (KH Agent) ","AGENTSTATUSDURATION":"01:57:08","AGENTSKILL":"GEN,UNFYDICICI@GMAIL.COM","AGENTSTATUS":"ACTIVE","processes":"2","AGENTGROUP":"KH CHAT GROUP","AGENTSTATUSTIME":"04-05-2021 17:38:34","ACTIVESESSIONCOUNT":"4","AGENTCAPACITY":"999","ACTION":"","Channels":"EMAIL,MOBILE-APP,WEBCHAT,WHATSAPP","StatusCode":"ACTIVE"}],"INTRACTION":[{"UID":"1007","CUSTOMERNAME":"Kirti Shirwayya","SESSIONID":"1007|EMAIL|unfydicici@gmail.com|2|050420210530017897","CHANNEL":"EMAIL","STARTTIME":"04-05-2021 12:45:41","DURATION":"06:50:01","ASSIGNAGENTID":"5","ASSIGNAGENTNAME":"KH-Agent","GROUPNAME":"KH CHAT GROUP","ACTION":""},{"UID":"840","CUSTOMERNAME":"Pintu Pal","SESSIONID":"840|EMAIL|unfydicici@gmail.com|2|050420210530017545","CHANNEL":"EMAIL","STARTTIME":"04-03-2021 11:35:16","DURATION":"56:00:26","ASSIGNAGENTID":"5","ASSIGNAGENTNAME":"KH-Agent","GROUPNAME":"KH CHAT GROUP","ACTION":""},{"UID":"a26e4b83-bfdb-2b36-62af-92361901b773","CUSTOMERNAME":"","SESSIONID":"a26e4b83-bfdb-2b36-62af-92361901b773|WEBCHAT||2|050420210530018493","CHANNEL":"WEBCHAT","STARTTIME":"04-05-2021 17:30:01","DURATION":"02:05:41","ASSIGNAGENTID":"5","ASSIGNAGENTNAME":"KH-Agent","GROUPNAME":"KH CHAT GROUP","ACTION":""},{"UID":"jb4cc8t4-1uqx-wmcc-efiou1v9smqe","CUSTOMERNAME":"Redmi 8","SESSIONID":"jb4cc8t4-1uqx-wmcc-efiou1v9smqe|MOBILE-APP|CHAT|2|050420210538349085","CHANNEL":"MOBILE-APP","STARTTIME":"04-05-2021 17:38:34","DURATION":"01:57:08","ASSIGNAGENTID":"5","ASSIGNAGENTNAME":"KH-Agent","GROUPNAME":"KH CHAT GROUP","ACTION":""}]}';
                console.log('SUP event sent successfully.', rawData);
                if (rawData != '') {
                    bindSubSupervisorAgentDetails(rawData);
                    bindSupervisorAgentDetails(rawData);

                    if (flag == 'FILTERACTIVEAGENT' && JSON.parse(rawData).INTRACTION == '' && JSON.parse(rawData).AGENT == '') {
                        scope.$applyAsync(function () {
                            scope.smartTALKNotificationError("No agents having active chat");
                        });
                    }

                }
            },
            error: function (xhr) {
                console.log('funSuperviserRequestdata() error', xhr);
            }
        });
    }
    catch (ex) {
        console.log('funSuperviserRequestdata() catch error');
    }
}

function bindSupervisorAgentDetails(json) {
    console.log('supervisor data received from CE', json);
    try {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            try {
                var supReqActiveAgent = JSON.parse(json).AGENT;
                //Will set Force Logout as default selection.
                for (var i = 0; i < supReqActiveAgent.length; i++) {
                    supReqActiveAgent[i].ACTION = 'Force Logout';
                }
                scope.smartTALKSuperVisorRequestActiveAgent = supReqActiveAgent;
                $('#supLoadIndicator,#supLoadIndicator2').removeClass('fa-spin');
                $('#supLoadIndicatorMsg').html('');
            } catch (e) { }
        });
    } catch (e) { }
}

function bindSubSupervisorAgentDetails(json) {
    try {
        var scope = angular.element($('#ChatArea')).scope();
        try {
            scope.$applyAsync(function () {
                var subInteractionData = JSON.parse(json).INTRACTION;
                //below loop will set the default action for all available interactions
                for (var i = 0; i < subInteractionData.length; i++) {
                    subInteractionData[i].ACTION = scope.SupActiveCustActionSelection.id;
                }

                scope.smartTALKSuperVisorRequestActiveCusomer = subInteractionData;
                console.log('scope.smartTALKSuperVisorRequestActiveCusomer', scope.smartTALKSuperVisorRequestActiveCusomer);
            });
            console.log('bindSubSupervisorAgentDetails()', json);
        } catch (e) { console.log('bindSubSupervisorAgentDetails() apply catch error'); }
    } catch (e) { console.log('bindSubSupervisorAgentDetails() catch error'); }
}

function FunAgentAction(x, ACTION) {
    try {
        console.log('FunAgentAction', x.AGENTID);

        //var selectedReasonText = $('#tblcsupervisor tr').find("td[id='" + x.AGENTID + "']").find('select option:selected').text();
        var selectedReasonText = $('#tblcsupervisor tr').find("td[id='" + x.AGENTID + "']").find('select option:selected').data('sup-action');
        console.log('tdsubAction--->', selectedReasonText);
        var _SupervisorBoBOVal = '{' + "'ID'" + ':' + "'" + x.AGENTID + "'" + ',' + "'ACTION'" + ':' + "'" + ACTION + "'" + ',' + "'ALLREQUEST'" + ':' + "''" + ',' + "'REASONTEXT'" + ':' + "'" + selectedReasonText + "'" + ',' + "'AGENTCURRENTSTATUS'" + ':' + "'" + x.AGENTSTATUS + "'" + '} '
        $.ajax({
            type: "POST",
            url: "smartAgent.aspx/RspondToCE",
            data: "{ _SupervisorBoBOVal :" + _SupervisorBoBOVal + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log('FunAgentAction', data);
                //CippAlive();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('FunAgentAction() error', xhr);
            }
        });
    } catch (e) {
        console.log('FunAgentAction() catch error', e);
    }
}

function FunCustomerAction(x, ACTION) {
    try {
        var _SupervisorBoBOVal = '{' + "'ID'" + ':' + "'" + x.ASSIGNAGENTID + "'" + ',' + "'ACTION'" + ':' + "'" + ACTION + "'" + ',' + "'SESSIONID'" + ':' + "'" + x.SESSIONID + "'" + ',' + "'UID'" + ':' + "'" + x.UID + "'" + '} '
        $.ajax({
            type: "POST",
            url: "smartAgent.aspx/RspondSubRecordToCE",
            data: "{ _SupervisorBoBOVal :" + _SupervisorBoBOVal + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('FunCustomerAction() error', xhr);
            }
        });

    } catch (e) {
        console.log('FunCustomerAction() catch error', e);
    }
}

function ActivehandletimeUpdateP(val) {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/ActivehandletimeUpdateP",
            data: "{SessionId:'" + val + "' }",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            // async: true,
            success: function (json) {
                //console.log('ActivehandletimeUpdateP success',json);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('ActivehandletimeUpdateP error', xhr);
            }
        });

    } catch (e) { console.log('ActivehandletimeUpdateP catch error'); }
}

function ActivehandletimeUpdatePageRefresh() {
    try {
        $.ajax({

            type: "POST",
            url: "SmartAgent.aspx/ActivehandletimeUpdatePageRefresh",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            // async: true,
            success: function (json) { },
            error: function (xhr, ajaxOptions, thrownError) { }
        });

    } catch (e) { }
}

function ActivehandletimeUpdate(val) {
    try {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            try {
                // 
                scope.InteractionTime = val[0].INTERACTIONTIME;
                scope.ActiveHandleTime = val[0].ACTIVEHANDLETIME;
                //funCustomerTime();                
            } catch (e) { }
        });

    } catch (e) { }
}

function funClickTOOutBound(Chanel, ChanelValue) {

    try {

        $.ajax({

            type: "POST",
            url: "SmartAgent.aspx/ClickTOOutBound",
            data: "{Chanel:'" + Chanel + "' , ChanelValue:'" + ChanelValue + "' }",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                console.log('funClickTOOutBound() success data : ', json);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('funClickTOOutBound() error', xhr);
            }
        });
    } catch (e) {
        console.log('funClickTOOutBound() catch error');
    }
}

function funGetAgentSkillsProcessWise() {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetAgentSkillsProcessWise",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                if (json.d) {

                    var data = JSON.parse(json.d);
                    var scope = angular.element($('#ChatArea')).scope();
                    scope.$applyAsync(function () {
                        scope.ddlTransferToSkills = data;

                        scope.ddlSelectedTransferToSkill = scope.ddlTransferToSkills[0];
                    });
                }
            },
            error: function (xhr, ajaxOptions, thrownError) { console.log('funGetAgentSkillsProcessWise() error', xhr); }
        });
    } catch (e) { console.log('funGetAgentSkillsProcessWise() catch error', e); }
}

//#region Load PushURL Data
function funGetpushurl(selectedLangCode) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "SmartAgent.aspx/Getpushurl",
            type: 'POST',
            data: "{selectedLangCode:'" + selectedLangCode + "'}",
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
//#endregion

//#region Canned Message CRUD
function bindCanMessage(selectedLangCode, processId) {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetCannedMessages",
            data: "{selectedLangCode:'" + selectedLangCode + "',processId:'" + processId + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                if (json.d == '') {
                    //
                }
                else {
                    $('#DefaultCanmessage').jstree('destroy');
                    $('#DefaultCanmessage').jstree({
                        "core": {
                            "data": JSON.parse(json.d).Table
                        },
                        "search": {
                            "show_only_matches": true
                        },
                        "plugins": ["search"]
                    }).bind("rename_node.jstree", function (event, data) { }).bind("dblclick.jstree", function (e) {
                        var node = $(e.target).closest("li");
                        var scope = angular.element($('#ChatArea')).scope();
                        scope.$applyAsync(function () {
                            try {
                                if ($('#DefaultCanmessage').find('li')[0].id == node[0].id) {
                                }
                                else {
                                    if (node[0].className == 'jstree-node jstree-closed' || node[0].className == 'jstree-node jstree-open' || node[0].className == 'jstree-node jstree-last jstree-open' || node[0].className == 'jstree-node jstree-last jstree-closed') { }
                                    else {
                                        var shortcodeRegex = /\(\((.*)\)\)|\(\((@.*)\)\)/gs, mycannedmsg = node[0].innerText;
                                        if (node[0].innerText.match(shortcodeRegex)) {
                                            mycannedmsg = mycannedmsg.split("((")[0];
                                        }
                                        scope.smartTALTextmessageAppend(mycannedmsg);
                                    }
                                }

                            } catch (e) { }
                        });
                    });
                    $("#DefaultCanmessage").jstree("open_all");
                }

            },
            error: function (xhr, ajaxOptions, thrownError) { }
        });
    } catch (e) { console.log('bindCanMessage() error ', e); }
}

function BindAgentCanmessage(selectedLangCode) {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/AgentCanMessageGetCannedMessages",
            data: "{selectedLangCode:'" + selectedLangCode + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                var strJSON = '';
                if (json.d !== "") {
                    strJSON = json.d;
                } else {
                    strJSON = [];
                }
                $('#AgentCanMessage').jstree('destroy');
                $('#AgentCanMessage').jstree({
                    "core": {
                        "check_callback": true,
                        "data": JSON.parse(strJSON).Table
                    },
                    "search": {
                        "case_insensitive": true,
                        "show_only_matches": true
                    },
                    "plugins": ["contextmenu", "search"],
                    "contextmenu": {
                        items: customMenu
                    }
                }).on("rename_node.jstree", function (event, data) {
                    var scope = angular.element($('#ChatArea')).scope();
                    var Updateid = data.node.id;
                    var Updatetext = data.node.text;
                    if (ShortCodeFLag == 'EnterShortCode') {
                        var shortcodeRegex = /\(\((@.*)\)\)/gs;
                        if (Updatetext.match(shortcodeRegex)) {
                            //
                        }
                        else {
                            scope.smartTALKNotificationError('Enter a valid short code with ((@ShortCode)) at the end of the canned message.');
                            return;
                        }
                    }
                    if (Updatetext.indexOf("\\") != -1 || Updatetext.indexOf("/") != -1) {
                        scope.smartTALKNotificationError('Text cannot contain \\ or / character.');
                        return;
                    }
                    if (event.type === 'rename_node') {
                        var ShortCodeText = '';
                        if (ShortCodeFLag == 'EnterShortCode') {
                            ShortCodeText = Updatetext.match(shortcodeRegex)[0];
                            ShortCodeText = ShortCodeText.replace('((', "");
                            ShortCodeText = ShortCodeText.replace('))', "");

                            event.type = 'EnterShortCode|' + ShortCodeText;
                            Updatetext = Updatetext.split('((')[0];
                        }
                        else {
                            var shortcodeRegex = /\(\((@.*)\)\)/gs;
                            if (Updatetext.match(shortcodeRegex)) {

                                ShortCodeText = Updatetext.match(shortcodeRegex)[0];
                                ShortCodeText = ShortCodeText.replace('((', "");
                                ShortCodeText = ShortCodeText.replace('))', "");
                                event.type = event.type + '|' + ShortCodeText;
                                Updatetext = Updatetext.split('((')[0];
                            }
                            else {
                                var shortcodeRegexforRename = /\(\(()\)\)/gs;
                                if (Updatetext.match(shortcodeRegexforRename)) {
                                    Updatetext = Updatetext.split('((')[0];
                                }
                            }
                        }
                        $.ajax({
                            type: "POST",
                            url: "SmartAgent.aspx/AgentCanMessageCreateNode",
                            data: "{selectedLangCode : '" + selectedLangCode + "',parentid:'" + Updateid + "',createterxt:'" + Updatetext + "',Type:'" + event.type + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (json) {
                                if (JSON.parse(json.d).data[0].id) {
                                    var scope = angular.element($('#ChatArea')).scope();
                                    if (ShortCodeFLag == 'EnterShortCode') {
                                        scope.smartTALKNotificationError('Short code is mapped successfully.');
                                    }
                                    else {
                                        scope.smartTALKNotificationError('Canned message renamed successfully.');
                                    }

                                }
                                ShortCodeCannedMsg($('#hdnAgentProcessId').val()); //rebind the shortcode array

                                BindAgentCanmessage(scope.selectedTranslation.LanguageCode);
                            },
                            error: function (xhr, ajaxOptions, thrownError) { console.log('JsTree rename_node error', xhr); }
                        });
                    }
                }).on("create_node.jstree", function (event, data) {
                    var parentid = data.node.parent;
                    var createterxt = data.node.text;
                    createterxt = createterxt.replace(/\'/g, "\\\'");

                    if (event.type === 'create_node') {
                        $.ajax({
                            type: "POST",
                            url: "SmartAgent.aspx/AgentCanMessageCreateNode",
                            data: "{selectedLangCode : '" + selectedLangCode + "',parentid:'" + parentid + "',createterxt:'" + createterxt + "',Type:'" + event.type + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (json) {
                                data.instance.set_id(data.node, JSON.parse(json.d).data[0].id);
                                var scope = angular.element($('#ChatArea')).scope();
                                scope.smartTALKNotificationError('New canned message added.');
                            },
                            error: function (xhr, ajaxOptions, thrownError) { console.log('JsTree create_node error', xhr); }
                        });
                    }
                }).on("delete_node.jstree", function (event, data) {
                    if (event.type === 'delete_node') {
                        var DeleteId = data.node.id;
                        var Deletetext = data.node.text;
                        Deletetext = Deletetext.replace(/\'/g, "\\\'");
                        $.ajax({
                            type: "POST",
                            url: "SmartAgent.aspx/AgentCanMessageCheckBeforeDelete",
                            data: "{selectedLangCode : '" + selectedLangCode + "',parentid:'" + DeleteId + "'}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (json) {
                                if (parseInt((JSON.parse(json.d).data[0].idCount)) > 0) {
                                    var agScope = angular.element($('#tab-item-2')).scope();
                                    agScope.smartTALKNotificationError('Please delete the canned message below the parent block before you attempt to delete it.');
                                    $.jstree.reference($("#AgentCanMessage")).refresh();
                                } else {
                                    $.ajax({
                                        type: "POST",
                                        url: "SmartAgent.aspx/AgentCanMessageCreateNode",
                                        data: "{selectedLangCode : '" + selectedLangCode + "',parentid:'" + DeleteId + "',createterxt:'" + Deletetext + "',Type:'" + event.type + "'}",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function (json) {
                                            var scope = angular.element($('#ChatArea')).scope();
                                            scope.smartTALKNotificationError('Canned message deleted successfully.');
                                            ShortCodeCannedMsg($('#hdnAgentProcessId').val()); //rebind the shortcode arrray
                                            BindAgentCanmessage(scope.selectedTranslation.LanguageCode);
                                        },
                                        error: function (xhr, ajaxOptions, thrownError) { console.log('JsTree delete_node error', xhr); }
                                    });
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) { console.log('JsTree check before delete error error', xhr); }
                        });
                    }
                }).bind("dblclick.jstree", function (e) {
                    var node = $(e.target).closest("li");
                    var scope = angular.element($('#ChatArea')).scope();
                    scope.$applyAsync(function () {
                        //try { scope.smartTALTextmessageAppend(node[0].innerText); } catch (e) { }
                        try {
                            if ($('#AgentCanMessage').find('li')[0].id == node[0].id) {
                            }
                            else {
                                if (node[0].className == 'jstree-node jstree-closed' || node[0].className == 'jstree-node jstree-open' || node[0].className == 'jstree-node jstree-last jstree-open' || node[0].className == 'jstree-node jstree-last jstree-closed') { }
                                else {
                                    var shortcodeRegex = /\(\((.*)\)\)|\(\((@.*)\)\)/gs, mycannedmsg = node[0].innerText;
                                    if (node[0].innerText.match(shortcodeRegex)) {
                                        mycannedmsg = mycannedmsg.split("((")[0];
                                    }
                                    scope.smartTALTextmessageAppend(mycannedmsg);
                                }
                            }

                        } catch (e) { }
                    });
                });
                Colsape("AgentCanMessage");
                ShortCodeCannedMsg($('#hdnAgentProcessId').val());
            },
            error: function (xhr, ajaxOptions, thrownError) { }
        });
        $("#btnExpand").click(function () {
            //Open all nodes
            $("#AgentCanMessage").jstree("open_all");
        });
        $("#btnColaps").click(function () {
            //Close all nodes
            $("#AgentCanMessage").jstree("close_all");
            Colsape("AgentCanMessage");
        });
    } catch (ex) {
        console.log('BindAgentCanmessage() error ', ex);
    }
}
//#endregion

//#region bind shortcode for cannedmessage
function ShortCodeCannedMsg(tenantid) {
    $.ajax({
        type: "POST",
        url: "SmartAgent.aspx/ShortCodeForCannedMsg",
        data: JSON.stringify({ ProcessID: tenantid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {

            try {
                if (JSON.parse(json.d) == '') {
                    //
                }
                else {
                    var scope = angular.element($('#ChatArea')).scope();
                    scope.ShortCodeCannedMsg = JSON.parse(JSON.parse(json.d).Result).data;
                }


            } catch (e) {
                //
            }
        }, error: function (xhr, ajaxOptions, thrownError) { console.log('GetActiveCustRecentChat() error', xhr); }
    });
}

//#endregion


//#region Get Channel 
function funGetChannels(selectedLangCode) {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetChannels",
            data: "{selectedLangCode:'" + selectedLangCode + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                var scope = angular.element($('#ChatArea')).scope();
                scope.$applyAsync(function () {
                    try {
                        var data = JSON.parse(json.d).Table;
                        scope.ddlCustomerHistoryChannels = data;
                        scope.ddlSelectedCustomerHistoryChannel = data[0];

                        scope.ddlMyChatHistoryChannels = data;
                        scope.ddlSelectedMyChatHistoryChannel = data[0];
                    } catch (e) { }
                });
            },
            error: function (xhr, ajaxOptions, thrownError) { console.log('funGetChannels() error', xhr); }
        });
    } catch (e) { console.log('funGetChannels() catch error', e); }
}
//#endregion

//#region
function funBindAgentAssignedSkills(skills) {
    try {

        var ddlAgentassignedSkillsdata = [];
        if (skills) {
            skills = skills.split(",");

            for (let i = 0; i < skills.length; i++) {
                oSkills = { id: skills[i].trim(), name: skills[i].trim() };
                ddlAgentassignedSkillsdata.push(oSkills)
            }
            ddlAgentassignedSkillsdata.splice(0, 0, { id: 'All', name: 'All' });
        }
        else {
            ddlAgentassignedSkillsdata.splice(0, 0, { id: '', name: 'No Skills' });
        }

        return ddlAgentassignedSkillsdata;
    } catch (e) { console.log('funBindAgentAssignedSkills() catch error', e); }
}
//#endregion
function SendAgentGroupChat(Data) {
    try {

        $.ajax({

            type: "POST",
            url: "SmartAgent.aspx/SendAgentGroupChat",
            data: "{_AgentGroupChat:" + Data + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            // async: false,
            success: function (json) {
                //console.log("SendAgentGroupChat success", json);
                AppendGroupChat(JSON.parse(json.d)[0]);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //console.log("SendAgentGroupChat err : ", xhr);
                //
                //  //alert("refresh error");
            }
        });
    } catch (e) {
        //
    }
}

function BindGroupChat() {
    try {
        $.ajax({

            type: "POST",
            url: "SmartAgent.aspx/fillGroupChat",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            // async: true,
            success: function (json) {
                //console.log("fillGroupChat", json);
                if (json.d != "") {
                    var scope = angular.element($('#ChatArea')).scope();
                    scope.$applyAsync(function () {
                        try {
                            scope.GroupChat = JSON.parse(json.d);
                            setTimeout(function v() {
                                $("#groupchat").find("#agent").scrollTop(999999999999999999);
                            }, 1000);


                        } catch (e) {
                            //
                        }
                    });
                }
            },

            error: function (xhr, ajaxOptions, thrownError) {
                //console.log("fillGroupChat err : ", xhr);
            }
        });
    } catch (e) { }
}

function AppendGroupChat(data) {
    try {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            try {

                if (scope.GroupChat == null) {

                    scope.GroupChat = data;
                }
                else {

                    scope.GroupChat.push(data);
                }
                setTimeout(function v() {
                    $("#groupchat").find("#agent").scrollTop(999999999999999999);
                }, 1000);

            } catch (e) { }
        });
    } catch (e) {
    }
}

function FunUnreadCountGroupChat(status) {
    try {
        if (!$("#groupchat").is(":visible")) {
            var count = 0;
            $("#cgrouptabUnread").hide();
            if (status) {
                count = parseInt($("#cgrouptabUnreadCount").html().trim());
            }
            else {
                count = parseInt($("#cgrouptabUnreadCount").html().trim()) + 1;
            }

            if (count > 0) {
                $("#cgrouptabUnread").show();
                $("#cgrouptab").hide();



                $("#cgrouptabUnreadCount").html(count);

                createCookie("cgrouptabUnreadCount", count, "360");
            }

        }
    } catch (e) { }
}

function AppendGroupChatOnServer(data) {

    try {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            try {

                var text = JSON.stringify(data);

                text = text.replace(/\</g, '&lt;');
                text = text.replace(/\>/g, '&gt;');


                if (scope.GroupChat == null) {
                    scope.GroupChat = JSON.parse(text).ROOT[0];
                }
                else {
                    scope.GroupChat.push(JSON.parse(text).ROOT[0]);
                }

                setTimeout(function v() {
                    $("#groupchat").find("#agent").scrollTop(999999999999999999);
                }, 1000);
                FunUnreadCountGroupChat(false);



            } catch (e) { }
        });
    } catch (e) { }
}

function BindGroup() {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/fillGroup",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                if (json != "") {
                    var scope = angular.element($('#ChatArea')).scope();
                    scope.$applyAsync(function () {
                        try {

                            var lstGroups = JSON.parse(json.d);
                            //console.log('lstGroups', lstGroups);
                            scope.smartTALKChatGroupList = lstGroups;
                            //scope.AgentGroups = lstGroups.slice(1);
                            scope.AgentGroups = lstGroups;
                            scope.SelectedAgentGroup = scope.AgentGroups[0];
                            scope.SelectedAgentGroupSup = scope.AgentGroups[0];
                            scope.smartTALKChatGroup = lstGroups[0];
                        } catch (e) { }
                    });
                }
            },
            error: function (xhr, ajaxOptions, thrownError) { }
        });
    } catch (e) { }
}

function CheckNetwork() {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/CheckNetwork",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            // async: true,
            success: function (json) {
                $("#Button1").click();
                console.log('CheckNetwork() timer triggered');
                //window.location.reload(true);
                //code here to bind selected intearction to load chats missed during loss of internet connection start
                var scope = angular.element($('#ChatArea')).scope();
                if (scope.smartTALKActiveSessionList.length > 0) {
                    for (var i = 0; i < scope.smartTALKActiveSessionList.length; i++) {
                        if (scope.smartTALKActiveSessionList[i].ROWNUMBER === scope.ActiveInteractionRowNumber) {
                            console.log('scope.smartTALKActiveSessionList[i] -- chknet', scope.smartTALKActiveSessionList[i]);
                            scope.smartTALKClickActiveSession(scope.smartTALKActiveSessionList[i], i, '');
                        }
                    }
                }
                //code here to bind selected intearction to load chats end
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $("#Button1").click();
                CheckNetwork();
            }
        });
    } catch (e) {
        $("#Button1").click();
        CheckNetwork();
    }
}

function funGetAbusiveWord(selectedLangCode) {
    try {
        $.ajax({
            type: "POST",
            url: "smartagent.aspx/GetAbusiveWord",
            data: "{selectedLangCode:'" + selectedLangCode + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) { },
            error: function (xhr, ajaxOptions, thrownError) { console.log('funGetAbusWord() error', xhr); }
        });
    } catch (e) { console.log('funGetAbusWord() catch error'); }
}

var CheckAbusWord = true;
function AgentCheckAbusWord(Word, $scope) {
    CheckAbusWord = false;
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/CheckAbusWord",
            data: "{Word:'" + Word + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            success: function (json) {


                var Data;

                try {

                    // json = json.replace(/\n/g, '<br/>');
                    //  json = JSON.stringify(json.d);
                    Data = JSON.parse(json.d);
                } catch (e) {
                    //
                }
                if (Data.data == "True") {

                    try {

                        // angular.element(txtmessage).html(Data.String.Word);

                        $scope.blockedcontents = " " + Data.String.Word;

                        CheckAbusWord = false;
                    } catch (e) {
                        //
                    }


                }
                else {
                    CheckAbusWord = true;
                }
            },

            error: function (xhr, ajaxOptions, thrownError) {
                CheckAbusWord = true;

            }
        });

    } catch (e) {

        CheckAbusWord = true;
    }
}

function ActiveCoustomerRemove(json) {
    try {
        var filteredJson = [];
        if (json) {
            //filteredJson = json.replace(/\n/g, "\\n");            
            filteredJson = json.replace(/\\/g, "\\\\").replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f")
                .replace(/[\u0000-\u0019]+/g, "");

            console.log('ActiveCoustomerRemove() filteredJson', filteredJson);
        }
        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {

            try {
                if (scope.ASW) {
                    funWrapDisposeVoice(json);
                }
            } catch (e) {

            }

            scope.smartTALKActiveSession(JSON.parse(filteredJson), true);
            $("#iframewrapform").hide();
            $('#iframeLINK').prop('src', scope.LINKLoginURL);
            setTimeout(function () {
                if (scope.smartTALKActiveSessionList.length == 0) {
                    LoadForm();
                }
            }, 5000)
        });
    } catch (e) {
        console.log('ActiveCoustomerRemove() catch error', e);
    }
}


//#region Agent Manual Outbound Operation Start
function funTriggerManualOutBound(manualOBChannel, manualOBPhoneno, selLanguage, channelsource) {
    var empty = '';
    try {
        //$.ajax({
        //    type: "POST",
        //    url: "smartagent.aspx/triggerManualOutBound",
        //    data: "{OBchannel:'" + manualOBChannel + "', OBphoneno:'" + manualOBPhoneno + "',selLanguage:'" + selLanguage + "',ChannelSource:'" + channelsource + "',CESESSIONID:'" + empty + "',Template:'" + empty + "',EventName:'" + 'EventManualOutbound' + "',CheckIsParkedInteractionRecord:'" + true + "'}",
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (json) {
        //        var scope = angular.element($('#ChatArea')).scope();
        //        // alert(json.d);
        //        if (json.d == 'Outbound message not send') {

        //            scope.smartTALKNotificationError(json.d);
        //        }
        //        else if (json.d == 'true') {
        //            scope.smartTALKNotificationSuccess('Outbound interaction initiated successfully.');
        //        }
        //        console.log('funTriggerManualOutBound() success', json.d);
        //    },
        //    error: function (xhr, ajaxOptions, thrownError) {
        //        console.log('funTriggerManualOutBound() error', xhr);
        //    }
        //});
    } catch (e) {
        console.log('funTriggerManualOutBound() catch error');
    }
}

function _validateOutBoundCapacity(channelName) {
    let validateOBRQ =
    {
        agentid: $('#hdnAgentId').val() || '',
        channel: channelName || '',
        processid: $('#hdnAgentProcessId').val() || '',
    };

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: oAgentURL.ValidateOutboundCapacityURL,
            data: JSON.stringify(validateOBRQ),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
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

function _triggerManualOutBound(outboundRequest) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/triggerManualOutBound",
            data: JSON.stringify(outboundRequest),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
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

function _triggerVoiceOBKnowlarity(oVoiceKnowlarityOBRQ) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/triggerVoiceOutBoundknowlarity",
            data: "{oVoiceKnowlarityOBRQ:" + JSON.stringify(oVoiceKnowlarityOBRQ) + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
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


//#endregion

function FunSendOutBound(value) {
    try {
        $.ajax({
            type: "POST",
            url: "smartagent.aspx/OutBoundCustemerCroling_Super",
            data: "{CoustomerID:'" + value.SessionID + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) { console.log('FunSendOutBound() success', json); },
            error: function (xhr, ajaxOptions, thrownError) { console.log('FunSendOutBound() error', xhr); }
        });
    } catch (e) { console.log('FunSendOutBound() catch error'); }
}

function funRequestOutBoundList() {
    try {
        $.ajax({
            type: "POST",
            url: "smartagent.aspx/requestOutBoundList",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                //console.log('funRequestOutBoundList() success', json);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('funRequestOutBoundList() error', xhr);
            }
        });
    } catch (e) {
        console.log('funRequestOutBoundList() catch error');
    }
}

function funGetWorkFlow(id) {
    try {
        $.ajax({

            type: "POST",
            url: "SmartAgent.aspx/GetWorkFlow",
            data: "{WorkFlowid:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (json) {
                //WorkFlowList

                var scope = angular.element($('#ChatArea')).scope();

                scope.$applyAsync(function () {
                    scope.WorkFlowList = [];
                    if (json.d.length > 0) {

                        scope.WorkFlowList = JSON.parse(json.d);

                    }
                });
            },
            error: function (xhr, ajaxOptions, thrownError) { }
        });
    } catch (e) { }
}

function funBotActiveCusomerDispoed(PhoneNo, sessionId, Remark, Disposition) {
    try {
        try {
            CLASS_Dispose.hdPhoneNo = PhoneNo;
            CLASS_Dispose.hdsessionId = sessionId;
            CLASS_Dispose.txtRemark = Remark;
            CLASS_Dispose.ddlDisposition = Disposition;
            CLASS_Dispose.ddlSubDisposition = "";
        } catch (e) {//
        }

        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/ActivesmartBotCoustomerDispose",
            data: JSON.stringify({
                '_CLASS_Dispose': CLASS_Dispose
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                var scope = angular.element($('#ChatArea')).scope();
                scope.$applAsyncy(function () {
                    scope.smartTALKActiveSession(JSON.parse(json.d), true);
                    setTimeout(function () {
                        if (scope.smartTALKActiveSessionList.length == 0) LoadForm();
                    }, 5000)

                    if (!scope.CloseChat) {
                        //$("#Disposition").click();
                        _CloseDispositionSlider();
                    }
                    else {
                        scope.CloseChat = false;
                    }
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    } catch (e) {
        //
    }
}

function ActivesmartParkedinteraction(oParkingRQ) {
    try {
        try {
            CLASS_Dispose.hdPhoneNo = oParkingRQ.PhoneNo;
            CLASS_Dispose.hdsessionId = oParkingRQ.SessionId;
            CLASS_Dispose.txtRemark = oParkingRQ.Remark;
            CLASS_Dispose.ddlDisposition = oParkingRQ.Disposition;
            CLASS_Dispose.ddlSubDisposition = oParkingRQ.SubDisposition;
            CLASS_Dispose.PARKTIME = "";
            CLASS_Dispose.WRAPFORMFIELD13 = oParkingRQ.ParkScheduleDtTm;
            CLASS_Dispose.WRAPFORMFIELD8 = oParkingRQ.ActiveCustName;
            CLASS_Dispose.TARGETCHANNELTYPE = oParkingRQ.parkedInteractionChannelType;
            CLASS_Dispose.TARGETCHANNELVALUE = oParkingRQ.parkedInteractionChannelValue;
        } catch (e) {
            console.log('ActivesmartParkedinteraction() catch error', e);
        }

        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/ActivesmartParkedinteraction",
            data: JSON.stringify({
                '_CLASS_Dispose': CLASS_Dispose
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                var scope = angular.element($('#ChatArea')).scope();
                scope.$applyAsync(function () {
                    scope.smartTALKActiveSession(JSON.parse(json.d), true);
                    setTimeout(function () {
                        if (scope.smartTALKActiveSessionList.length == 0) {
                            LoadForm();
                        }
                    }, 5000)

                    if (!scope.CloseChat) {
                        //$("#Disposition").click();
                        _CloseDispositionSlider();
                    }
                    else {
                        scope.CloseChat = false;
                    }
                });

                GetParkingHistoery();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('ActivesmartParkedinteraction() error', xhr);
            }
        });

    } catch (e) {
        console.log('ActivesmartParkedinteraction() catch', e);
    }
}

function funtwitlike(otwitterLikeTweet) {
    try {
        var scope = angular.element($('#ChatArea')).scope();
        var data = JSON.stringify(otwitterLikeTweet);
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/funtwitlike",
            data: "{otwitterLikeTweet:" + data + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (json) {
                if (json != "" && JSON.parse(json.d).Status == "True") {
                    scope.smartTALKNotificationError('Liked successfully.');
                }
                else {
                    scope.smartTALKNotificationError('Like request failed.');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('funtwitlike error');
            }
        });
    } catch (e) {
        console.log('funtwitlike catch error');
    }
}

function funRetwit(otwitterLikeTweet) {
    try {
        var scope = angular.element($('#ChatArea')).scope();
        var data = JSON.stringify(otwitterLikeTweet);
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/funtwitlike",
            data: "{otwitterLikeTweet:" + data + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (json) {
                if (json != "" && JSON.parse(json.d).Status == "True") {
                    scope.smartTALKNotificationError('Retweeted successfully.');
                }
                else {
                    scope.smartTALKNotificationError('Retweet request failed.');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('funRetwit error');
            }
        });
    } catch (e) {
        console.log('funRetwit catch error');
    }
}

function AgentDashboardDetails() {
    console.log('hit and run');
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetRealtimeDashboard",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('AgentDashboardDetails() error', xhr);
            }
        });
    } catch (e) {
        console.log('AgentDashboardDetails() catch error');
    }
}

function GetRealtimeDashboard(data) {
    try {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            scope.smartAgentStatistics = JSON.parse(data).ROOT;
        });
    } catch (e) {
        console.log('GetRealtimeDashboard() catch error');
    }
}
////#region outboundtemplate
//function GetOutBoundTemplate(TEMPLATENAME, PROCESSID) {
//    try {
//       console.log(URL);
//        $.ajax({
//            type: "GET",
//            url: URL,
//            data: "",
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: function (json) {
//                var Template = json.Result.Data["0"].TemplateMessage;
//                var scope = angular.element($('#ChatArea')).scope();
//                scope.$apply(function () {
//                    scope.Template = Template;
//                    $sce.trustAsHtml(scope.Template);
//                });

//            },
//            error: function (xhr, ajaxOptions, thrownError) {
//                console.log('GetOutBoundTemplate() error', xhr);
//            }
//        });
//    } catch (e) {
//        console.log('GetOutBoundTemplate() catch error');
//    }
//}
////#endregion
//#region Start Security Measure Code
function DisablePageRightClick() {
    $(document).on("contextmenu", function (e) {
        e.preventDefault();
    });
}

function DisablePageF12() {
    $(document).keydown(function (event) {
        if (event.keyCode == 123) { // Prevent F12
            return false;
        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
            return false;
        }
    });
}

function DisablePageCopyPaste() {
    $('body').bind('copy paste', function (e) {
        e.preventDefault();
        return false;
    });
}

function DisablePageViewSource() {
    $(document).keydown(function (event) {
        if (event.ctrlKey && event.keyCode == 85) { // Prevent Ctrl+U       
            return false;
        }
    });
}

function DisablePageCntrlSave() {
    $(document).keydown(function (event) {
        if (event.ctrlKey && event.keyCode == 83) { // Prevent Ctrl+S       
            return false;
        }
    });
}
//#endregion 

//#region SMS OutBound
function funClickTOSMSOutBound(Mobile, Message) {
    try {
        $.ajax({

            type: "POST",
            url: "SmartAgent.aspx/ClickTOSMSOutBound",
            data: "{Mobile:'" + Mobile + "' , Message:'" + Message + "' }",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                if (JSON.stringify(json.d).includes("Success")) {
                    var scope = angular.element($('#ChatArea')).scope();
                    scope.$applyAsync(function () {
                        scope.smartTALKOutboundMobileValue = "";
                        scope.smartTALKOutboundMessageValue = "";
                    });
                }
                console.log('funClickTOSMSOutBound() success data : ', json);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('funClickTOSMSOutBound() error', xhr);
            }
        });
    } catch (e) {
        console.log('funClickTOSMSOutBound() catch error');
    }
}

function funRequestSMSOutBoundList(_ObjSMS) {
    try {
        var data = JSON.stringify({ '_ObjSMS': _ObjSMS });
        $.ajax({
            type: "POST",
            url: "smartagent.aspx/requestSMSOutBoundList",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                var scope = angular.element($('#ChatArea')).scope();
                scope.$applyAsync(function () {
                    scope.SmsoutBoundCustomerList = [];
                    if (json.d.length > 0) {
                        scope.SmsoutBoundCustomerList = JSON.parse(json.d);
                    }
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('funRequestOutSMSBoundList() error', xhr);
            }
        });
    } catch (e) {
        console.log('funRequestOutSMSBoundList() catch error');
    }
}
//#endregion


function funRequestHSMOutBoundList(processid) { // fetch HSM outbound list
    try {
        $("#myChatHistoryLoadIndicator").html("<i class='fa fa-refresh fa-spin'></i>");
        $.ajax({
            type: "POST",
            url: "smartagent.aspx/requestHSMOutBoundList",
            data: JSON.stringify({ Processid: processid }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                var scope = angular.element($('#ChatArea')).scope();
                scope.$applyAsync(function () {
                    scope.HSMoutBoundCustomerList = [];
                    if (json.d.length > 0) {
                        scope.HSMoutBoundCustomerList = JSON.parse(json.d);
                    }
                });
                $("#myChatHistoryLoadIndicator").html("");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('funRequestHSMOutBoundList() error', xhr);
            }
        });
    } catch (e) {
        console.log('funRequestHSMOutBoundList() catch error');
    }
}
//#endregion

function funTriggerTransferToSkill(selectedTransferToSkill, selIntrSessionId, selIntrShortSessionId) {
    if (selectedTransferToSkill) {
        try {
            $.ajax({
                type: "POST",
                url: "smartagent.aspx/triggerTransferToSkillRQ",
                data: "{selectedTransferToSkill:'" + selectedTransferToSkill.SkillName + "', selIntrSessionId:'" + selIntrSessionId + "', selIntrShortSessionId:'" + selIntrShortSessionId + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (json) {
                    console.log('funTriggerTransferToSkill() success', json.d);
                    if (json.d.status) {
                        var data = JSON.parse(json.d.data);
                        var scope = angular.element($('#ChatArea')).scope();
                        scope.smartTALKActiveSession(data, true);
                    }
                    else {
                        var data = json.d.message;
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) { console.log('funTriggerTransferToSkill() error', xhr); }
            });
        } catch (e) { console.log('funTriggerTransferToSkill() catch error'); }
    }
}
//#region loadchannelsource

function _fetchTenantID() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetTenantID",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
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

function _fetchChannelSource(processId, Channel) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "smartagent.aspx/GetChannelSource",
            data: "{Processid:'" + processId + "',Channel:'" + Channel + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
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

function _getOutBoundChannelList(_url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: _url,
            data: {},
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            async: true,
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

//#endregion
function funGetOutBoundTemplate(TEMPLATENAME, PROCESSID) { //fetch template name and its parameter
    try {
        var Template = '';
        var scope = angular.element($('#ChatArea')).scope();

        //hsm template name   
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/FetchHSMTemplateMessage",
            data: "{Templatename:'" + TEMPLATENAME + "',ProcessID:'" + PROCESSID + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (json) {
                if (JSON.parse(json.d).Result.Table == "") {
                    Template = '';
                    scope.Template = '';
                }
                else {
                    Template = JSON.parse(json.d).Result.Data[0].name;
                    scope.Template = Template;
                    window.localStorage.setItem('Template', scope.Template);
                }
                $.ajax({
                    type: "POST",
                    url: "SmartAgent.aspx/FetchHSMTemplateParameter",
                    data: "{Templatename:'" + TEMPLATENAME + "',ProcessID:'" + PROCESSID + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (json1) {
                        if (JSON.parse(json1.d).Result.Table == '' || JSON.parse(json1.d).Result.Data.length == 0) {
                            Template = '';
                            scope.ControlDetails = [];
                            scope.Template = '';
                        }
                        else {
                            scope.$applyAsync(function () {
                                scope.ControlDetails = [];
                                scope.Template = Template;
                                scope.ControlDetails = JSON.parse(json1.d).Result.Data;
                                window.localStorage.setItem('Template', scope.Template);
                                setTimeout(function () { BindTemplateControl(); }, 500);

                            });
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log('GetOutBoundTemplate() error', xhr);
                    }
                });
                //  }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('GetOutBoundTemplate() error', xhr);
            }
        });
        //


        //var URL = AgentParentDomain + "/UNFYD-Web-API/api/UtilityHelper/GetGenericTemplateFromDB?FLAG=GETOBTEMPLATE&TEMPLATENAME=" + TEMPLATENAME + "&PROCESSID=" + PROCESSID;

    } catch (e) {
        console.log('GetOutBoundTemplate() catch error');
    }
}

function BindTemplateControl() {

    // alert($('.TemplateDiv input:text').length);

    //$.each('.TemplateDiv input:text', function (index, val) {
    //    alert($(this).attr('value'));
    //});
    $('.TemplateDiv input:text').each(function (index, val) {
        // alert($(this).attr('value'));
        $($(this).val($(this).attr('value')));
        var scope = angular.element($('#ChatArea')).scope();
        scope.Templatevalue[$(this).attr('placeholder')] = $(this).attr('value');
    });

}


function _blacklistedCustomer(OBJBlacklist) {
    var data = JSON.stringify({ '_BlackListedCustomer': OBJBlacklist });
    $.ajax({
        type: "POST",
        url: "SmartAgent.aspx/InserBlackListedCustomerDataInDB",
        data: JSON.stringify({ '_BlackListedCustomer': OBJBlacklist }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            try {
                console.log("_blacklistedCustomer", "ajax success");
            } catch (e) {
                console.log('LoadForm() catch error', e);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('LoadForm() error', xhr);
        }
    });
}

function _triggerAgentEmailOutBound(oEmailIP) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'SmartAgent.aspx/triggerAgentEmailOutBound',
            data: "{oEmailIP:" + JSON.stringify(oEmailIP) + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
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

function _triggerSendMail(_ObjEmail) {
    $.ajax({
        type: "POST",
        url: "SmartAgent.aspx/SendEmail",
        data: JSON.stringify({ 'oSendMailRQ': _ObjEmail }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            try {
                var res = JSON.parse(json.d);
                if (res.ResponseType == 'Success') {
                    var scope = angular.element($('#ChatArea')).scope();
                    scope.smartTALKNotificationError('Your email is sent.');
                    scope.smartTALKClosed();
                }
                else {
                    var scope = angular.element($('#ChatArea')).scope();
                    scope.smartTALKNotificationError('Unable to send the email. Please try again.');
                }
                console.log('SendEmail', res);
            }
            catch (e) { }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}

function _triggerEmailViaLinker(oData) {
    var data = JSON.stringify(oData);

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: oAgentURL.SendMailViaLinkerUrl,
            contentType: false,
            processData: false,
            data: data,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

function _triggerCreateCaseViaLINK(oData) {
    var data = JSON.stringify(oData);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: oAgentURL.CreateEmailCaseViaLinkUrl,
            type: 'POST',
            data: data,
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            },
        })
    })
}

function getEmailInteractionDetails(emailCaseId) {
    var data = JSON.stringify({ "CaseID": emailCaseId });

    return new Promise((resolve, reject) => {
        $.ajax({
            url: oAgentURL.EmailInteractionTranscriptUrl,
            type: 'POST',
            data: data,
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            },
        })
    })
}

function _closeEmailCaseInteraction(oData) {
    var data = JSON.stringify(oData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: oAgentURL.CloseEmailCaseInteractionUrl,
            type: 'POST',
            data: data,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            },
        })
    })
}

function _updateEmailCaseInteraction(oData) {
    var data = JSON.stringify(oData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: oAgentURL.UpdateEmailCaseInteractionUrl,
            type: 'POST',
            data: data,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            },
        })
    })
}

function _updateTicketInfo(oData) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "SmartAgent.aspx/InsertTicketDataInCrm",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ 'oInsertTicketDetailsInCrm': oData }),
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            },
        })
    })
}

function _getEmailTemplate(oData) {
    var data = JSON.stringify(oData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: oAgentURL.FetchEmailTemplate,
            type: 'POST',
            data: data,
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

function _notifyDebounceTyping(oNotifyDebounceTyping) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/NotifyDebounceTyping",
            data: "{oNotifyDebounceTyping:" + JSON.stringify(oNotifyDebounceTyping) + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
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

function _fetchEmoji() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: './Emoji/emoji.json',
            data: '{}',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
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

function _fetchAgentPrerequisiteData() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetAgentPrerequisiteData",
            data: "{}",
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

function _fetchAgentPreferredLanguages() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'SmartAgent.aspx/getAgentPreferredLanguages',
            data: "{}",
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

function _fetchAgentPreferredTranslation(translationURL) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: translationURL,
            data: "{}",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "text",
            beforeSend: function () {
                $('#InteractionWaitModal').modal('show');
            },
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

//#region Broadcast Dispose Event To Voice Module
function _BroadcastDisposeEvent(disposedData, phoneNo, sessionId, remark, disposition, subDisposition) {
    if (disposedData && disposedData[0] && disposedData[0].CHANNELID == 'VOICE' && disposedData[0].CHANNELSOURCE == 'GENESYS') {
        var scope = angular.element($('#ChatArea')).scope();

        var callUUID = sessionId.split('_')[0];
        var oData = { 'id': phoneNo, 'callUuid': callUUID, 'dispositionText': disposition, 'subDispositionText': subDisposition, 'dispositionRemark': remark, 'CampaignCallback': scope.VoiceIP }
        const bcChannel = new BroadcastChannel('voice_disposition');
        bcChannel.postMessage(oData);
    }
}

//#region host path from api call
function _fetchhostpath(obj) {
    var odata = '{ "Base64Url": "$Base64Url$",  "FileName": "$FileName$", "ProcessId": "", "Product": ""}';
    odata = odata.replace('$Base64Url$', obj.Base64Url);
    odata = odata.replace('$FileName$', obj.FileName);

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: oAgentURL.HostPathFromBase64VideoApp,
            data: odata,
            contentType: "application/json;",
            //dataType: "json",
            async: true,
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
//#endregion
//#endregion

//#region agent default signature
function _FetchAgentEmailSignature() {

    let scope = angular.element($('#ChatArea')).scope();
    var odata = '{ "EmailID":"$$emailid$$"}';
    odata = odata.replace('$$emailid$$', scope.AgentPrerequisiteData.AgentEmailId)
    $.ajax({
        type: "POST",
        url: oAgentURL._FetchAgentEMailSIgnature,
        data: odata,
        contentType: "application/json;",
        async: false,
        success: function (json) {
            if (json != '' && json.length > 0) {
                var osuccess = JSON.parse(json);
                if (osuccess.Result.toUpperCase() == 'SUCCESS') {
                    //osuccess.data.Signature.replace(/(\r\n|\n|\n)/g, '<br/>');
                    scope.DefaultAgentSignature = (osuccess.data.Signature == null) ? "" : osuccess.data.Signature.replace(/(\r\n|\n|\n)/g, '<br/>');;
                    if (scope.DefaultAgentSignature == "") {
                        smartTALKNotificationError("No Email sigurature mapped");
                    }
                }
            }

        },
        error: function (xhr, ajaxOptions, thrownError) { }
    });
}
//endregion

/* forwardEmailAttachToTemp */
function _ForwardEmailAttachToTemp(data) {
    data['SessionID'] = $("#hdnAgentSessionId").val();
    let odata = JSON.stringify({ 'oForwardEmailAttachToTemp': data });
    $.ajax({
        type: "POST",
        url: "SmartAgent.aspx/forwardEmailAttachToTemp",
        data: odata,
        contentType: "application/json;",
        async: false,
        success: function (json) {
            if (json != '' && json.length > 0) {
                var osuccess = JSON.parse(json);
                console.log(osuccess);
                /*if (osuccess.Result.toUpperCase() == 'SUCCESS') {
                    //osuccess.data.Signature.replace(/(\r\n|\n|\n)/g, '<br/>');
                    scope.DefaultAgentSignature = (osuccess.data.Signature == null) ? "" : osuccess.data.Signature.replace(/(\r\n|\n|\n)/g, '<br/>');;
                    if (scope.DefaultAgentSignature == "") {
                        smartTALKNotificationError("No Email sigurature mapped");
                    }
                }*/
            }

        },
        error: function (xhr, ajaxOptions, thrownError) { }
    });
}
/****************************/

/* _FunSendVideoUrlDataToDb: Send Video URL Data To Db On Video Dispose */
function _FunSendVideoUrlDataToDb(uid, sessionId, flag, interactionType) {
    try {
        let oData = {
            flag: flag,
            sp_name: "",
            processid: "",
            channel: "",
            channelsource: "",
            skill: "",
            group: "",
            uid: uid,
            sesionid: sessionId,
            agentid: "",
            attribute1: interactionType,
            attribute2: uid,
            attribute3: "",
            attribute4: "",
            attribute5: "",
            attribute6: "",
            attribute7: "",
            attribute8: "",
            attribute9: "",
            attribute10: "",
            attribute11: "",
            attribute12: "",
            attribute13: "",
            attribute14: "",
            attribute15: "",
            attribute16: "",
            attribute17: "",
            attribute18: "",
            attribute19: "",
            attribute20: ""
        };

        let odata = JSON.stringify({ 'oTransferVideoSessionToOther': oData });
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/SendVideoSessionUrlDataToDb",
            data: odata,
            contentType: "application/json;",
            async: false,
            success: function (json) {
                console.log(json);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('_FunSendVideoUrlDataToDb error', xhr, thrownError);
            }
        });
    } catch (e) {
        console.log(e);
    }
}

function _RefreshMailBody(caseId) {
    return new Promise((resolve, reject) => {
        try {
            $.ajax({
                type: "POST",
                url: oAgentURL.EmailCaseHandler + "?Action=CaseInfo",
                data: JSON.stringify({ "caseId": caseId, "userType": "agent" }),
                contentType: "application/json;",
                async: false,
                success: function (res) {
                    let d = JSON.parse(res);
                    resolve(d.data[0].Description);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    reject(xhr);
                    console.log('_RefreshMailBody error', xhr, thrownError);
                }
            });
        } catch (e) {
            console.log('_RefreshMailBody() catch error', e);
            reject(e);
        }

    });
}

function _RestoreCaseInlineImages(type, caseId) {
	$(".case_inline").each((index, element) => {
		var data = { "AttachID": $(element).attr("attachid"), "CaseID": caseId, "type": type };
		$.ajax({
			type: "POST",
			url: oAgentURL.EmailCaseHandler + "?Action=DisplayInlineImage",
			contentType: false,
			processData: false,
			data: JSON.stringify(data),
			success: function (resdata) {
				console.log(oAgentURL.EmailCaseHandler + "?Action=DisplayInlineImage");
				var respData = JSON.parse(resdata);
				if (respData.Result == "Success") {
					if (respData.data != null)
						$(element).attr('src', 'data:' + respData.FileType + ';base64,' + respData.data);
				}
				else {
					//alert('Image is not saved properly');
				}
			},
			error: function () {
				//alert('Failed to Save');
			}
		});
	});
}

function _RestoreIntInlineImages(type, caseId) {
	$(".inline").each((index, element) => {
		var data = { "AttachID": $(element).attr("attachid"), "ID": caseId, "type": type };
		$.ajax({
			type: "POST",
			url: oAgentURL.EmailCaseHandler + "?Action=DisplayInlineImage",
			contentType: false,
			processData: false,
			data: JSON.stringify(data),
			success: function (resdata) {
				var respData = JSON.parse(resdata);
				if (respData.Result == "Success") {
					if (respData.data != null)
						$(element).attr('src', 'data:' + respData.FileType + ';base64,' + respData.data);
				}
				else {
					//alert('Image is not saved properly');
				}
			},
			error: function () {
				//alert('Failed to Save');
			}
		});
	});
}

function _FunSendVideoUrlDataToDbV2(uid, sessionId, flag, interactionType) {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/SendVideoSessionUrlDataToDbV2",
            data: "{Session:'" + sessionId + "', Attribute1:'" + selIntrSessionId + "', Attribute2:'" + selIntrShortSessionId + "', flag:'" + flag + "'}",
            contentType: "application/json;",
            async: false,
            success: function (json) {
                console.log(json);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('_FunSendVideoUrlDataToDb error', xhr, thrownError);
            }
        });
    } catch (e) {
        console.log(e);
    }
}
/****************************/