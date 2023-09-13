function OpenFormIndex() {
    document.location = $("#hidenDefaultPage").val();
    
}
var ShortCodeFLag = false, ShortCodeText = '';
function subbrowinghistory() {
    document.getElementById('home').style.display = "none";
    document.getElementById('menu1').style.display = "block";
    a = document.getElementById("cobrowser1");
    a.style.backgroundImage = "url('dist/img/tab1.png')";
    a.style.color = "#000";
    a.style.fontWeight = "700";
    b = document.getElementById("subbrowinghistory");
    b.style.backgroundImage = "url('dist/img/tab2.png')";
    b.style.color = "#fff";
    b.style.fontWeight = "700";
}

function subcobrowser() {
    document.getElementById('menu1').style.display = "none";
    document.getElementById('home').style.display = "block";
    a = document.getElementById("cobrowser1");
    a.style.backgroundImage = "url('dist/img/tab2.png')";
    a.style.color = "#fff";
    a.style.fontWeight = "700";
    b = document.getElementById("subbrowinghistory");
    b.style.backgroundImage = "url('dist/img/tab1.png')";
    b.style.color = "#000";
    b.style.fontWeight = "700";
}

var k;
function openChanelConnecationdilog(msg) {
    if (!$('#ChanelModal').hasClass('in')) {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$apply(function () {
            scope.AGENTID = '';
            // console.log('scope.AGENTID in dialog : ', scope.AGENTID);
        });

        $('#ChanelModalMSG').html('');
        $('#ChanelModalMSG').html(msg);
        $('#ChanelModal').modal('show');
    }
}

function NotifyRequestAlreadyInQueue(strData) {
    var scope = angular.element($('#ChatArea')).scope();
    scope.smartTALKNotificationError(strData);
}

function CloseChanelConnecationdilog() {
    $('#ChanelModal').modal('hide');
    //CheckServer();
}

setInterval(function (e) {
    _sendKeepAliveToCE();
}, 50000);

function _sendKeepAliveToCE()
{    
    $.ajax({
        type: "POST",
        url: "SmartAgent.aspx/CheckKeepAlive",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {
            console.log('_sendKeepAliveToCE() :' + json.d + '|' + $('#hdnAgentId').val());
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('_sendKeepAliveToCE() error', xhr);
        }
    });
}


setInterval(function () {
    //adjust timer accordingly, check network connection in every 20 sec : 1000 ms = 1 second.   
    _checkNetworkConnection();
}, 20000);

function _checkNetworkConnection() {
    if (!navigator.onLine) {
        $("#InfoModal #InfoModalMSG").html("You are disconnected, please check your network connection and try again.");
        $('#InfoModal').modal('show');
        var scope = angular.element($('#ChatArea')).scope();
        try {
            scope.$apply(function () {
                createCookie(scope.hdsessionId, scope.txtmessage, 1);
                console.log('_checkNetworkConnection() scope apply catch error');
            });
        } catch (e) { console.log('_checkNetworkConnection() scope apply catch error'); }
        CheckNetwork();
    }
    else {
        $('#ctl19').css('cursor', 'default !important');
        $('#InfoModal').modal('hide');
    }
}

//-------------------------------This CheckServer() method is obsolute and not used currently---------
function CheckServer() {
    try {
        var serverTimer = 0;
        $('#ctl19').css('cursor', 'default !important');
        $('#InfoModal').modal('hide');
        window.clearTimeout(k);
        $("#InfoModal #InfoModalMSG").html("");
        k = setInterval(function () {
            $("#Button1").click();
            serverTimer = serverTimer + 1;
            if (!navigator.onLine && serverTimer > 3) {
                serverTimer = 0;
                $("#InfoModal #InfoModalMSG").html("You are disconnected, please check your network connection and try again.");
                $('#InfoModal').modal('show');
                var scope = angular.element($('#ChatArea')).scope();
                scope.$apply(function () {
                    try {
                        createCookie(scope.hdsessionId, scope.txtmessage, 1);
                    } catch (e) {
                        console.log('CheckServer() scope apply catch error');
                    }
                });
                //adjust timer accordingly, displays network disconnected modal after 9 sec : 1000 ms = 1 second.
                CheckNetwork();
            }
        }, 20000);
    } catch (e) { console.log('CheckServer() catch error'); }
}
//-------------------------------This CheckServer() method is obsolute and not used currently---------

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

$(function () {
    $('input').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
        }
    });
    if (readCookie("SoundNotification") != null) {
        if (readCookie("SoundNotification") == "true") {
            $("#Sound").attr("checked", true);
        }
        else {
            $("#Sound").attr("checked", false);
        }
    }
    else {
        $("#Sound").attr("checked", true);
    }
    $('#Sound').click(function () {
        if ($(this).is(':checked')) {
            createCookie("SoundNotification", true, 360);
        } else {
            createCookie("SoundNotification", false, 360);
        }
    });
    if (readCookie("Dextopenotification") != null) {
        if (readCookie("Dextopenotification") == "true") {
            $("#Notification").attr("checked", true);
        }
        else {
            $("#Notification").attr("checked", false);
        }
    }
    else {
        $("#Notification").attr("checked", true);
    }
    $('#Notification').click(function () {
        if ($(this).is(':checked')) {
            createCookie("Dextopenotification", true, 360);
        } else {
            createCookie("Dextopenotification", false, 360);
        }
    });
    $('#InfoModal').modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    });
    $('#ChanelModal').modal({
        show: false,
        backdrop: 'static',
        keyboard: false
    });
    $('#FromDate').val(new Date().toDateInputValue());
    $('#ToDate').val(new Date().toDateInputValue());
    //funSuperviserRequestdata();
    $("#btnsupervisoerrequest").click(function () {
        funSuperviserRequestdata();
    });
    $("#btnForceLogout").click(function () {
        var loggedOutReason = $('#ChanelModalMSG').text();
        FunAgentLogout(loggedOutReason);
    });
    $("#btnDExpand").click(function () {
        $("#DefaultCanmessage").jstree("open_all");
    });
    $("#btnDColaps").click(function () {
        $("#DefaultCanmessage").jstree("close_all");
        Colsape("DefaultCanmessage");
    });

    //#region Column Resize
    $("#tableb").colResizable({ disable: true });
    $('#tableb').find('#tdLeft').width(380);
    $("#tableb").colResizable({
        liveDrag: true,          
        minWidth: 380,
        disabledColumns: [1],
        onDrag: _OnDivDragged
    });    

    function _OnDivDragged(e) {
        var _tdstyle = $(e.currentTarget).find("td[id='tdLeft']").attr("style");        
    }

    $("#uf-right-container").colResizable({
        liveDrag: true,        
    });    
    //#endregion

    //Initialize Select2 Elements
    //$(".select2").select2();
    $("#btnAssign").on("click", function () {
        alert("The paragraph was clicked.");
    });
    $(document).on('click', '#btnAssign', function () {
        var scope = angular.element($('#ChatArea')).scope();
        var agentID = $('#ddlAgentlist').val();
        var Checkedcount = $('#SupervGrid > tbody  > tr> td').find('input[type="checkbox"]:checked:visible');
        if (agentID == "0") {
            scope.smartTALKNotificationError('Kindly select Agent To assign.');
            return;
        }
        var sessionID = "";
        var assignToAgentID = "";
        if (Checkedcount.length > 0) {
            $('#SupervGrid > tbody  > tr>td input[type="checkbox"]:checked:visible').each(function () {
                sessionID = sessionID + $(this).closest("tr").find('#chcktbl').val() + ",";
            });
            sessionID = sessionID.slice(0, -1);
            assignToAgentID = agentID;
            $.ajax({
                type: "POST",
                url: "SmartAgent.aspx/AssignAgent",
                data: "{SessionId:'" + sessionID + "', AgentToAsign:'" + assignToAgentID + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (json) {
                    scope.smartTALKNotificationError('Total ' + json.d + 'records updated successfully.');
                    $("#ParkRefresh").click();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                }
            });
        }
        else {
            scope.smartTALKNotificationError('Kindly select a row to Re-Assign.');
            return;
        }
    });
});

function stringEscape(sendmsg) {
    try {
        sendmsg = sendmsg.replace(/\\/g, '\\\\');
        sendmsg = sendmsg.replace(/\&/g, '&amp;');
        sendmsg = sendmsg.replace(/\</g, '&lt;');
        sendmsg = sendmsg.replace(/\>/g, '&gt;');
        sendmsg = sendmsg.replace(/\"/g, '&quot;');
        sendmsg = sendmsg.replace(/\'/g, '&apos;');
        return sendmsg;
    } catch (e) { console.log('stringEscape() catch error'); }
}

function funDateformating(a) {
    var today = new Date(a);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return mm + '/' + dd + '/' + yyyy;
}

function CsutomerSatatus(CUSTSTATUS) {
    if (CUSTSTATUS.SESSIONDISPOSE == "1") {
        return "disposed";
    }
    else {
        switch (CUSTSTATUS.CUSTSTATUS) {
            case "~/AgentImages/Ball Red.png":
                return "ofline";
                break;
            case "~/AgentImages/Ball Blue.png":
                return "online";
                break;
            case "~/AgentImages/DISPOSE.png":
                return "ofline";
                break;
        }
    }
}

function ActiveSasionChanelIcon(chanelname, chanelsource) {
    switch ($.trim(chanelname.toUpperCase())) {
        case "CRAWL":
            var name = "";
            switch ($.trim(chanelsource.toUpperCase())) {
                case "TWITTER":
                    return 'twi';
                    break;
                case "FB":
                    return 'fb';
                    break;
            }
            break;
        case "IM":
            return "fa fa-twitch fa-2x";
            break;
        case "TWITTERDM":
            return "interaction-twtr-dm-icon";
            break;
        case "TWITTER":
            return "interaction-twtr-icon";
            break;
        case "WHATSAPP":
            return "interaction-whatsapp";
            break;
        case "SKYPE":
            return "fa fa-skype fa-2x";
            break;
        case "WEBCHAT":
            return "interaction-webchat";
            break;
        case "FBCHAT":
            return "interaction-fb-chat-icon";
            break;
        case "FB":
            return "interaction-fb-icon";
            break;
        case "TELEGRAM":
            return "fa fa-paper-plane fa-2x";
            break;
        case "YAMMER":
            return "fa fa-y-combinator fa-2x";
            break;
        case "WECHAT":
            return "fa fa-vimeo fa-2x";
            break;
        case "CRAWL":
            return "twi";
            break;
        case "SMS":
            return "fa fa-comment-o";
            break;
        case "VOICE":
            return "interaction-call";
            break;
        case "INSTAGRAMPOST":
        case "INSTAGRAMDM":
            return "fa fa-instagram fa-2x";
            break;
        case "LINECHAT":
            return "interaction-line-dm";
            break;
        case "VIBER":
            return "interaction-viber-dm";
            break;
        case "EMAIL":
            return "interaction-email";
            break;
        case "VIDEO":
            return "interaction-video";
            break;
        case "COBROWSE":
            return "interaction-cobrowse";
            break;
        case "MOBILE-APP":
            return "interaction-phone";
            break;
    }
}

function ActiveChatSasionChanelIcon(chanelname) {
    if (typeof (chanelname) !== "undefined") {
        switch ($.trim(chanelname.toUpperCase())) {
            case "IM":
                return "fa fa-twitch fa-2x";
                break;
            case "TWITTERDM":
                return "interaction-twtr-dm-icon";
                break;
            case "TWITTER":
                return "interaction-twtr-icon";
                break;
            case "WHATSAPP":
                return "interaction-whatsapp";
                break;
            case "SKYPE":
                return "fa fa-skype";
                break;
            case "WEBCHAT":
                return "interaction-webchat";
                break;
            case "FBCHAT":
                return "interaction-fb-chat-icon";
                break;
            case "FB":
                return "interaction-fb-icon";
                break;
            case "TELEGRAM":
                return "fa fa-paper-plane";
                break;
            case "CRAWL":
                return "twi";
                break;
            case "SMS":
                return "fa fa-comment-o";
                break;
            case "VOICE":
                return "interaction-call";
                break;
            case "INSTAGRAMPOST":
            case "INSTAGRAMDM":
                return "fa fa-instagram fa-2x";
                break;
            case "LINECHAT":
                return "interaction-line-dm";
                break;
            case "VIBER":
                return "interaction-viber-dm";
                break;
            case "EMAIL":
                return "interaction-email";
                break;
            case "VIDEO":
                return "interaction-video";
                break;
            case "COBROWSE":
                return "interaction-cobrowse";
                break;
            case "MOBILE-APP":
                return "interaction-phone";
                break;
        }
    }
}

function FilterCanmessage(e) {
    var searchString = $(e).val();
    $('#DefaultCanmessage').jstree('search', searchString);
    //console.log($('#DefaultCanmessage').jstree('search', searchString));
}

var varAgentLoginTime, varAgentNotReadyTime;
function funAgentLoginTime()
{
    clearInterval(varAgentLoginTime);
    varAgentLoginTime = setInterval(
        function myfunction() {
            var scope = angular.element($('#ChatArea')).scope();
            scope.$apply(function () {
                //  scope.smartTALKAgentLOGINTIME = JSON.parse(json.d)[0].LOGINTIME;
                if (funConvertsecand(scope.smartTALKAgentLOGINTIME) + 1 > 0) {
                    scope.smartTALKAgentLOGINTIME = formatTime(funConvertsecand(scope.smartTALKAgentLOGINTIME) + 1);
                }
                try { if (scope.selectedItem === 'READY') { scope.selectedItem = "Ready"; } } catch (e) { }
            });
        }
        , 1000);
}

var CustomerTime;
function funAgentNotReadyTime() {
    clearInterval(varAgentNotReadyTime);
    varAgentNotReadyTime = setInterval(
        function myfunction() {
            var scope = angular.element($('#ChatArea')).scope();
            scope.$apply(function () {
                // scope.smartTALKAgentNOTREADYTIME = JSON.parse(json.d)[0].NOTREADYTIME;
                if (funConvertsecand(scope.smartTALKAgentNOTREADYTIME) + 1 > 0) {
                    scope.smartTALKAgentNOTREADYTIME = formatTime(funConvertsecand(scope.smartTALKAgentNOTREADYTIME) + 1);
                }
            });
        }
        , 1000);
}

function funConvertsecand(time) {
    var seconds = 0;
    seconds = parseInt(time.split(':')[0]) * (60 * 60);
    seconds = seconds + parseInt(time.split(':')[1]) * (60);
    seconds = seconds + parseInt(time.split(':')[2]);
    return seconds;
}

function formatTime(seconds) {
    var h = Math.floor(seconds / 3600),
        m = Math.floor(seconds / 60) % 60,
        s = seconds % 60;
    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    return h + ":" + m + ":" + s;
}

function customMenu(node) {
    ShortCodeFLag = false;
    var items = {
        createItem: { // The "create" menu item
            label: "Create",
            action: function (data) {
                // alert("Create");
                var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                inst.create_node(obj, {}, "last", function (new_node) {
                    new_node.data = { file: true };
                    setTimeout(function () { inst.edit(new_node); }, 0);
                });
            }
        },
        renameItem: { // The "rename" menu item
            label: "Rename",
            action: function (data) {
                //alert("Rename");
                var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                inst.edit(obj);
            }
        },
        deleteItem: { // The "delete" menu item
            label: "Delete",
            action: function (data) {
                //deleteUser = window.confirm('Are you sure you want to delete');
                //if (deleteUser) {
                var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);
                if (inst.is_selected(obj)) {
                    inst.delete_node(inst.get_selected());
                }
                else {
                    inst.delete_node(obj);
                }
            }
        },
        shortCodeItem: { // The "Short code" menu item
            label: "Short Code",
            action: function (data) {
                //alert("Rename");
                var inst = $.jstree.reference(data.reference),
                    obj = inst.get_node(data.reference);

                ShortCodeText = obj.text;
                let shortcodeRegex = /\(\((@.*)\)\)/gs;
                if (ShortCodeText.match(shortcodeRegex)) {
                    ShortCodeFLag = true;
                    var scope = angular.element($('#ChatArea')).scope();
                    scope.smartTALKNotificationError('The short code is already mapped, you can click on rename to edit it.');
                }
                else {
                    ShortCodeFLag = 'EnterShortCode';
                    inst.edit(obj);
                }

            }
        }
    };
    return items;
}

function Colsape(id) {
    var nodeID = 1;
    $("#" + id).jstree("open_node", nodeID);
    // Get the jstree object for this node
    var thisNode = $("#" + id).jstree("get_node", nodeID);
    // Get the id of the parent of this node
    nodeID = $("#" + id).jstree("get_parent", thisNode);
}

function FilterAgentCanmessage(e) {
    // //alert('s');
    // 
    // $("#txtSearch").keyup(function () {
    // //alert(1);
    var searchString = $(e).val();
    //console.log(searchString);
    //$('#AgentCanMessage').jstree('search', searchString);
    $('#AgentCanMessage').jstree(true).search(searchString);
    // });
}

function AnimationAgent(data) {
    try {
        for (var i = 0; i < data.length; i++) {
            if (data[i].AGENTNOTRESPONSE == "1" && data[i].SESSIONDISPOSE != "1") {
                $('#Selecation-' + i).addClass("Blink");
            }
            else {
            }
            setTimeout(
                function funBlink(k) {
                    $('#Selecation-' + k).removeClass("Blink");
                }
                , 2000, i);
        }
    }
    catch (e) { }
}

function htmlToPlaintext(text) {
    return text;
}

function FuncationFileIcone(fileName) {
    if (typeof (fileName) !== "undefined") {
        var name = "";
        try {
            name = fileName.split('.')[fileName.split('.').length - 1];
            switch ($.trim(name.toUpperCase())) {
                case "PDF":
                    return "fa fa-file-pdf-o fa-5x";
                case "WORD":
                case "DOC":
                case "DOCX":
                    return "fa fa-file-word-o fa-5x";
                case "EXCEL":
                case "XLSX":
                case "XLS":
                case "CSV":
                    return "fa fa-file-excel-o fa-5x";
                case "TXT":
                    return "fa fa-file-text fa-5x";
                case "PPT":
                case "PPTX":
                    return "fa fa-file-powerpoint-o fa-5x";
                default:
                    return "";
            }
        }
        catch (e) {
            console.log('FuncationFileIcone() catch error');
        }
    }
    else {
        return "";
    }
}

function FuncationFileView(fileName) {
    if (typeof (fileName) !== "undefined") {
        var name = "";
        try {
            name = fileName.split('.')[fileName.split('.').length - 1];
            switch ($.trim(name.toUpperCase())) {
                case "WORD":
                case "EXCEL":
                case "XLS":
                case "XLSX":
                case "CSV":
                case "DOC":
                case "DOCX":
                case "PPT":
                case "PPTX":
                case "PDF":
                    return "1";
                default:
                    return "";
            }
        } catch (e) {
            console.log('FuncationFileView() catch error');
        }
    }
    else {
        return "";
    }
}

function FunGetTodayDate() {
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
    return mm + '/' + dd + '/' + yyyy;
}

function SetOrdeToCustomerInfo(Data) {
    var final = [];
    try {
        for (var i = 0; i < CustomerInfoPosition.length + 1; i++) {
            var v = "";
            try {
                v = CustomerInfoPosition[i];
            }
            catch (e) {
                v = "";
            }
            $.each(Data, function (k, l) {
                var varkey = l.Key;
                var varvalue = l.Value;
                if (v == "" || v == undefined) {
                    var obj = { Value: '', Key: '' };
                    obj.Key = varkey;
                    obj.Value = varvalue;
                    if (containsObject(varkey, final)) {
                        final.push(obj)
                    }
                }
                else {
                    if (v == varkey) {
                        var obj = { Value: '', Key: '' };
                        obj.Key = varkey;
                        obj.Value = varvalue;
                        final.push(obj)
                        return false;
                    }
                }
            }
            );
        }
    } catch (e) {
        return Data;
    }
    return final;
}

function containsObject(obj, list) {
    var output = true;
    $.each(list, function (k, l) {
        if (l.key == obj) {
            output = false;
            return false;
        }
    });
    return output;
}

function CaptureLogForJquery(value1, value2, value3) {
    try {
        $.ajax({
            url: "SmartAgent.aspx/GetLogForJquery",
            type: "POST",
            data: "{Message:'" + value1 + "',stack:'" + encodeURI(value2) + "',pageDetail:'" + value3 + "'}",
            contentType: "application/json; charset=utf-8",
            processData: false,
            success: function (result) {
            },
            error: function (err) {
                // //alert(err.statusText)
            }
        });
    } catch (e) {
    }
}

function CheckVideonCoBrowse(strSessionID, strStatus, strAction, StrPhoneNo, strMSG) {
    //console.log('CheckVideonCoBrowse', strSessionID + '--->' + strStatus + '--->' + strAction + '--->' + StrPhoneNo + '--->' + strMSG);
    var scope = angular.element($('#ChatArea')).scope();
    if (strAction === 'EVENTCOBROWSING') {
        $.each(scope.smartTALKActiveSessionList, function (sKey, sVal) {
            if (sVal.SESSIONID === StrPhoneNo) {
                scope.$apply(function () {
                    scope.smartTALKActiveSessionList[sKey].COBROWSINGSESSIONID = strSessionID;
                    scope.smartTALKActiveSessionList[sKey].COBROWSINGSTATUS = strStatus;
                });
                if (strStatus.toLowerCase() === 'start' || strStatus.toLowerCase() === 'close') {
                    var coBrowsingTabUrl = scope.CoBrowsingTabConfig.CoBrowsingTabUrl;
                    coBrowsingTabUrl = coBrowsingTabUrl.replace("$$COBROWSINGSESSIONID$$", strSessionID);
                    coBrowsingTabUrl = coBrowsingTabUrl.replace("$$COBROWSINGSTATUS$$", strStatus);
                    $('#iframeCoBrowsing').prop('src', coBrowsingTabUrl);
                }
                else if (strStatus.toLowerCase() === 'end') {
                    $('#iframeCoBrowsing').prop('src', '');
                }
                if (sVal.ROWNUMBER !== scope.ActiveInteractionRowNumber) {
                    scope.smartTALKNotificationError(sVal.NAME + ' : ' + strMSG);
                }
            }
        });
    }
    else {
        if (strAction === 'EVENTVIDEOCHAT') {
            $.each(scope.smartTALKActiveSessionList, function (sKey, sVal) {
                if (sVal.SESSIONID === StrPhoneNo) {
                    scope.$apply(function () {
                        scope.smartTALKActiveSessionList[sKey].VIDEOCHATSESSIONID = strSessionID;
                        scope.smartTALKActiveSessionList[sKey].VIDEOCHATSTATUS = strStatus;
                    });
                    scope.RefreshVideoCall();
                }
            });
        }
    }
}

function BindMessageStatus(MsgID, eventName, SessionID) {
    //console.log('BindMessageStatus', MsgID + '--->' + eventName + '--->' + SessionID);
    var scope = angular.element($('#ChatArea')).scope();
    $.each(scope.smartTALKChatList, function (cKey, cVal) {
        if (cVal.MESSAGEID === MsgID && eventName == 'EVENTMESSAGEREAD') {
            //MSGREADSTATUS = 1 (string)            
            scope.$apply(function () {
                scope.smartTALKChatList[cKey].MSGREADSTATUS = "1";
            });
        }
        else if (cVal.MESSAGEID === MsgID && eventName == 'EVENTMESSAGEDELIVERED') {
            //UPDATEDTATUS = 1 (int)           
            scope.$apply(function () {
                //scope.smartTALKChatList[cKey].UPDATEDTATUS = 1;   //commented because this may create issue
                scope.smartTALKChatList[cKey].ISMSGDELIVERED = "true";
            });
        }
    });
}

function bindOutBoundCustomerList(oOutBoundCustomerList) {
    try {
        //console.log('oOutBoundCustomerList', oOutBoundCustomerList);
        var rawoOutBoundCustomerList = JSON.parse(oOutBoundCustomerList);
        if (rawoOutBoundCustomerList != "") {
            var scope = angular.element($('#ChatArea')).scope();
            scope.$apply(function () {
                scope.outBoundCustomerList = rawoOutBoundCustomerList.OBCUSTOMER;
            });
        }
    } catch (e) {
        console.log('bindOutBoundCustomerList() catch error', e);
    }
}

function displayLicenseModal(licMessage) {
    $(document).ready(function () {        
        document.onreadystatechange = function ()
        {            
            if (document.readyState == "complete") {               
                $('#LicenseMessageModal').modal('show');
                $('#licenseMessageText').text(licMessage);
            }
        }
    });
}

$(document).ready(function () {
    //$('#horizontalTab').responsiveTabs({
    //    rotate: false,
    //    startCollapsed: 'accordion',
    //    collapsible: 'accordion',
    //    setHash: true,
    //});
    //$('#start-rotation').on('click', function () {
    //    $('#horizontalTab').responsiveTabs('active');
    //});
    //$('#stop-rotation').on('click', function () {
    //    $('#horizontalTab').responsiveTabs('stopRotation');
    //});
    //$('#start-rotation').on('click', function () {
    //    $('#horizontalTab').responsiveTabs('active');
    //});
    //$('.select-tab').on('click', function () {
    //    $('#horizontalTab').responsiveTabs('activate', $(this).val());
    //});
});

function FunFirstTimeCoustomerList(hdsessionId) {
    try {
        var Status = true;
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetActiveCustChart",
            data: "{SessionId:'" + hdsessionId + "' , SendAllMessage:'" + Status + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (json) {
                FunBindCoustomerList(JSON.parse(json.d), true);
            },
            error: function (xhr, ajaxOptions, thrownError) { console.log('FunFirstTimeCoustomerList() error'); }
        });
    } catch (e) { console.log('FunFirstTimeCoustomerList() catch error'); }
}
function FunrealTimeTimeCoustomerList(data) {
    try {
        data = data.replace(/\\n/g, "\\n")
              .replace(/\\'/g, "\\'")
              .replace(/\\"/g, '\\"')
              .replace(/\\&/g, "\\&")
              .replace(/\\r/g, "\\r")
              .replace(/\\t/g, "\\t")
              .replace(/\\b/g, "\\b")
              .replace(/\\f/g, "\\f")
         .replace(/\\/g, "\\\\");
        data = data.replace(/[\u0000-\u0019]+/g, "");
        FunBindCoustomerList(JSON.parse(data).data, false);
    } catch (e) { console.log('FunrealTimeTimeCoustomerList() catch error'); }
}
function FunBindCoustomerList(data, status) {
    try {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$apply(function () {
            try {
                scope.FunsmartTALKChat(data, status);
            } catch (e) { console.log('FunBindCoustomerList() apply catch error'); }
        });
    } catch (e) { console.log('FunBindCoustomerList() catch error'); }
}

function ListCoustomerRemove(Data) {
    try {        
        var scope = angular.element($('#ChatArea')).scope();
        scope.$apply(function () {
            try
            {
                Data = Data.replace(/\\/g, "\\\\");
                Data = Data.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f").replace(/[\u0000-\u0019]+/g, "");                

                try {
                    if (scope.ASW) {

                        funWrapDisposeVoice(Data);

                        

                        var _Sap_Channel = "CHAT"
                        if (scope.ActiveChannel == "VOICE") { _Sap_Channel = "CALL"; }

                        var strTranscript = getTranscript();
                        EndChatEventToSAP(scope.hdsessionId, _Sap_Channel, 'UPDATEACTIVITY', 'END',
                            scope.smartTALKCustomerDetailsList[3].Value, strTranscript, scope.smartTALKCustomerDetailsList[2].Value, scope.hdCHANNELID);

                        


                    }
                } catch (e) {

                }

                var _parsed = JSON.parse(Data); 

                try {
                    scope.smartTALKActiveSession(_parsed, true);
                } catch (e) { console.log('ListCoustomerRemove() json parse catch error',e); }
            } catch (e) { console.log('ListCoustomerRemove() catch error',e); }
        });
    } catch (e) { console.log('ListCoustomerRemove() apply catch error',e); }
    return "";
}

function BindGetCoustomer(Data) {
    try {
        //Data = Data.replace(/\//g, "\\/");
        Data = Data.replace(/\\/g, "\\\\");
        Data = Data.replace(/\\n/g, "\\n")
			.replace(/\\'/g, "\\'")
			.replace(/\\"/g, '\\"')
			.replace(/\\&/g, "\\&")
			.replace(/\\r/g, "\\r")
			.replace(/\\t/g, "\\t")
			.replace(/\\b/g, "\\b")
			.replace(/\\f/g, "\\f");
        Data = Data.replace(/[\u0000-\u0019]+/g, "");
        //Data = Data.replace(/&nbsp;/g, ' ');

        var scope = angular.element($('#ChatArea')).scope();
        scope.$apply(function () {
            try {
                scope.smartTALKActiveSession(JSON.parse(Data), false);
            } catch (e) { console.log('BindGetCoustomer() catch error', e); }
        });
    } catch (e) { console.log('BindGetCoustomer() error'); }
}

function _triggerEventAgentNotification(type,message,sessionId) {
    try
    {
        var scope = angular.element($('#ChatArea')).scope();
        if (type == "TRUE") {
            scope.smartTALKNotificationSuccess(message);
        }
        else
        {
            scope.smartTALKNotificationError(message);
        }
    } catch (e)
    {

    }
}