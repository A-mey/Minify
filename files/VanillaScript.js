var oAgentURL = {
    ClientConfigURL: 'http://localhost/compass-web-api/Data/DefaultClientConfig',
    SocketURL: 'https://demo15.unfyd.com:5001/',
    HubURL: 'http://localhost/compass-webchat-HUB/signalr',
    NexmoVoiceURL: 'https://api.unfyd.com:8083/NexmoVoice.html?AgentID=$$AgentLoginID$$',
    OutBoundChannelUrl: 'http://localhost/compass-web-api/api/UtilityHelper/GetGenericTemplateFromDB?FLAG=GETOBCHANNELLIST&TEMPLATENAME=&PROCESSID=$$ProcessId$$',
    SendMailViaLinkerUrl: 'https://videoapi.niveussolutions.com/UNFYD-LINK/CasesHandler?Action=AddInteraction',
    CreateEmailCaseViaLinkUrl: 'https://videoapi.niveussolutions.com/UNFYD-LINK/CasesHandler?Action=SaveNewCaseDetails',
    EmailInteractionTranscriptUrl: 'https://videoapi.niveussolutions.com/UNFYD-LINK/CasesHandler?Action=GetInteractionHistory',
    CloseEmailCaseInteractionUrl: 'https://videoapi.niveussolutions.com/UNFYD-LINK/CasesHandler?Action=CloseCase',
    MyInsightDataUrl: 'http://localhost/compass-web-api/api/BotData/CheckBotSession',
    ValidateOutboundCapacityURL: 'http://localhost/UNFYD-Routing-Service/api/queues/validateouboundcapacity',
    UpdateEmailCaseInteractionUrl: 'https://videoapi.niveussolutions.com/UNFYD-LINK/CasesHandler?Action=UpdateCases',
    SAPAttachmentSavingURL: 'https://uatapp.unfyd.com/compass-web-api-new/api/SAPIntegration/SaveAttachmentDetails',
    FetchEmailTemplate: 'https://videoapi.niveussolutions.com/UNFYD-LINK/AdminHandler?Action=GetTempletForCannedAPI',
    FetchAgentEmailSignature: 'https://pi.unfyd.com/UNFYD-LINK/AdminHandler?Action=GetUserDetailsapi',
    SendScreenShotAsMessage: 'https://localhost/converter/Conversion/UrlToImageUrl_New',
    HostPathFromBase64VideoApp: 'https://localhost/converter/Conversion/Base64ToImageUrl',
    SendHSMTemplate: 'https://stayunfyd.unfyd.com/hsm/HsmTemplate/SendHsmTemplate',
    EmailLogger: 'https://cx.unfyd.com/hafele-email-logger/api/values',
    Disposition: {
        DispositionReasonURL: 'http://localhost/ReasonAPI/api/values',
        SearchConsSpr: 'http://localhost/gcic/api/SearchConsSpr',
        SearchConsPrdSpr: 'http://localhost/GCIC/api/SearchConsPrdSpr',
        CreateChngConsSpr: 'http://localhost/GCIC/api/Createchngconsspr',
        CreateGaTaSpr: 'http://localhost/GCIC/api/CreateGaTaSpr'
    },
    getSetHawkerDetails: 'https://nipunuat.unfyd.com:3001/api/index'
    
};

var client = "", IsMobile = false, arrTotalEmailAttachment = [], objTotalEmailAttachment = {}, TotalEmailAttachmentSize = 0;
var CountryCodeRegex = /((^\+93))$|((^\+355))$|((^\+213))$|((^\+376))$|((^\+244))$|((^\+672))$|((^\+54))$|((^\+374))$|((^\+297))$|((^\+61))$|((^\+43))$|((^\+994))$|((^\+973))$|((^\+880)$)$|((^\+375))$|((^\+32))$|((^\+501))$|((^\+229))$|((^\+975))$|((^\+591))$|((^\+387))$|((^\+267))$|((^\+55))$|((^\+246))$|((^\+673))$|((^\+359))$|((^\+226))$|((^\+257))$|((^\+855))$|((^\+237))$|((^\+1))$|((^\+238))$|((^\+236))$|((^\+235))$|((^\+56))$|((^\+86))$|((^\+61))$|((^\+61))$|((^\+57))$|((^\+269))$|((^\+682))$|((^\+506))$|((^\+385))$|((^\+53))$|((^\+599))$|((^\+357))$|((^\+420)$)$|((^\+243))$|((^\+45))$|((^\+253))$|((^\+670)$)$|((^\+593))$|((^\+20)$)$|((^\+503))$|((^\+240)$)$|((^\+291))$|((^\+372))$|((^\+251))$|((^\+500)$)$|((^\+298))$|((^\+679))$|((^\+358))$|((^\+33))$|((^\+689))$|((^\+241))$|((^\+220)$)$|((^\+995))$|((^\+49))$|((^\+233))$|((^\+350)$)$|((^\+30)$)$|((^\+299))$|((^\+502))$|((^\+224))$|((^\+245))$|((^\+592))$|((^\+509))$|((^\+504))$|((^\+852))$|((^\+36))$|((^\+354))$|((^\+91))$|((^\+62))$|((^\+98))$|((^\+964))$|((^\+353))$|((^\+972))$|((^\+39))$|((^\+225))$|((^\+81))$|((^\+962))$|((^\+7))$|((^\+254))$|((^\+686))$|((^\+383))$|((^\+965))$|((^\+996))$|((^\+856))$|((^\+371))$|((^\+961))$|((^\+266))$|((^\+231))$|((^\+218))$|((^\+423))$|((^\+370)$)$|((^\+352))$|((^\+853))$|((^\+389))$|((^\+261))$|((^\+265))$|((^\+60)$)$|((^\+960)$)$|((^\+223))$|((^\+356))$|((^\+692))$|((^\+222))$|((^\+230)$)$|((^\+262))$|((^\+52))$|((^\+691))$|((^\+373))$|((^\+377))$|((^\+976))$|((^\+382))$|((^\+212))$|((^\+258))$|((^\+95))$|((^\+264))$|((^\+674))$|((^\+977))$|((^\+31))$|((^\+599))$|((^\+687))$|((^\+64))$|((^\+505))$|((^\+227))$|((^\+234))$|((^\+683))$|((^\+850)$)$|((^\+47))$|((^\+968))$|((^\+92))$|((^\+680)$)$|((^\+970)$)$|((^\+507))$|((^\+675))$|((^\+595))$|((^\+51))$|((^\+63))$|((^\+64))$|((^\+48))$|((^\+351))$|((^\+974))$|((^\+242))$|((^\+262))$|((^\+40)$)$|((^\+7))$|((^\+250)$)$|((^\+590)$)$|((^\+290)$)$|((^\+590)$)$|((^\+508))$|((^\+685))$|((^\+378))$|((^\+239))$|((^\+966))$|((^\+221))$|((^\+381))$|((^\+248))$|((^\+232))$|((^\+65))$|((^\+421))$|((^\+386))$|((^\+677))$|((^\+252))$|((^\+27))$|((^\+82))$|((^\+211))$|((^\+34))$|((^\+94))$|((^\+249))$|((^\+597))$|((^\+47))$|((^\+268))$|((^\+46))$|((^\+41))$|((^\+963))$|((^\+886))$|((^\+992))$|((^\+255))$|((^\+66))$|((^\+228))$|((^\+690)$)$|((^\+676))$|((^\+216))$|((^\+90)$)$|((^\+993))$|((^\+688))$|((^\+256))$|((^\+380)$)$|((^\+971))$|((^\+44))$|((^\+1))$|((^\+598))$|((^\+998))$|((^\+678))$|((^\+379))$|((^\+58))$|((^\+84))$|((^\+681))$|((^\+212))$|((^\+967))$|((^\+260)$)$|((^\+263))$/gm;

//#region Agent Ajax Complete Event tracker
$(document).ajaxComplete(function (event, xhr, settings) {
    var funName = settings.url.split('SmartAgent.aspx/')[1] || settings.url;
    //console.log('funName', funName);
});
//#endregion

//#region Agent multiple tabs presence detection Start
try {
    localStorage.AgentPageOpened = Date.now();
    var onLocalStorageEvent = function (e) {
        if (e.key == "AgentPageOpened") {
            localStorage.AgentPageAvailable = Date.now();
        }
        if (e.key == "AgentPageAvailable") {
            oURL = new URL('./index.aspx', document.baseURI);
            if (oURL.host === location.host && oURL.protocol === location.protocol) {
                var encodedURI = encodeURI(oURL.href);
                window.location.href = encodeURI(oURL.href);
            }
        }
    };
    window.addEventListener('storage', onLocalStorageEvent, false);
} catch (e) { console.log('err during detectection of multiple tabs', e); }
//#endregion

//#region Disposition Tab List Operation
$(document).ready(function () {
    // Create a new ClientJS object
    client = new ClientJS();
    // Get the client's device type
    IsMobile = (client.isMobile()) ? true : false //to check if page is loaded in desptop or mobile

    if (IsMobile || oAgentWindowDim.resizedWidth < 768) {


        $('#divMobileBack').hide();    //Back Button + Chat Area Mobile

        $('#tdRight').hide();

    }


    $('ul.out li').on('click', function () {
        $(this).parent().find('li.acts').removeClass('acts');
        $(this).addClass('acts');
    });

    $(".dispo1").click(function () { $("#dispo1").show(); $("#dispo2").hide(); $("#dispo3").hide(); });
    $(".dispo2").click(function () { $("#dispo2").show(); $("#dispo1").hide(); $("#dispo3").hide(); });
    $(".dispo3").click(function () { $("#dispo3").show(); $("#dispo2").hide(); $("#dispo1").hide(); });
    $(".dispo3").click();
});

//#endregion

//#region Red Color Blinker
setInterval(function () { $(".divtoBlink").toggleClass("backgroundRed"); }, 1000);
//#endregion

//#region Auto Refresh Other Agent Switch
function AutoRefreshOtherAgentSwitch(event) {
    (event.classList.contains('off')) ? event.classList.remove('off') : event.classList.add('off');
}
//#endregion

//#region Agent Window Dimention For Mobile Devices
oAgentWindowDim = {
    Width: $(window).width(),
    Height: $(window).height(),
    resizedWidth: $(window).width(),
    resizedHeight: $(window).height(),
};

function _resizeLeftTD(width, height) {
    // $('#tdLeft').width(width);
    $('.outerdiv-left').height(height - 100);   //Left Div Whole
    $('.bluescroll').height(height - 290);      //Chat Scroll Area    
}

function _mobileInteractionToggle(e) {

    var width = oAgentWindowDim.resizedWidth;
    var height = oAgentWindowDim.resizedHeight;
    //if (width <= 768)
    if (IsMobile || oAgentWindowDim.resizedWidth < 768) {

        _resizeLeftTD(width, height);
        $('#divMobileBack').hide();    //Back Button + Chat Area Mobile
        // $('#active_div').hide();    //Interaction Section
        if (e) { //done this to hide cahtting div on pageload but the function is common for pageload and click.
            $('#tdRight').show();
        }
        else {
            $('#tdRight').hide();
        }
    }
}



function ShowMobileInteractions() {
    $('#active_div').show();    //Interaction Section
    $('.bottom_div').hide();    //Back Button + Chat Area Mobile 
}

function _ShowLeftInteractionsListForMobile() {
    //if (oAgentWindowDim.resizedWidth <= 768)
    if (IsMobile) {
        //Mobile View.
        if (angular.element($('#ChatArea')).scope().smartTALKActiveSessionList.length == 0) {
            $('#tdRight').hide();
        }
    }
}

$(window).resize(function () {

    IsMobile = (client.isMobile()) ? true : false //to check if page is loaded in desptop or mobile

    oAgentWindowDim.resizedWidth = $(window).width();
    oAgentWindowDim.resizedHeight = $(window).height();
    //if (oAgentWindowDim.resizedWidth <= 768) {
    if (IsMobile) {
        _resizeLeftTD(oAgentWindowDim.resizedWidth, oAgentWindowDim.resizedHeight);
        _ShowLeftInteractionsListForMobile();
    }
});

$(window).on('orientationchange', function (event) {
    if (window.orientation == 90 || window.orientation == -90) {
        console.log('landscape mode');
    }
});

//#endregion

//#region Toggle Disposition Slider
var oAgentDispositionSilder = {
    IsDispositionSliderOpen: false,
};

function _ToggleDispositionSlider() {
    let scope = angular.element($('#ChatArea')).scope();
    if (scope.altDisposition) {
        scope.setSelectedTab("altDisposition");
    }
    else {
        $('#chatheader').toggleClass('direct-chat-contacts-open');

        var _IsDispositionSliderOpen = $('#chatheader').hasClass("direct-chat-contacts-open");
        if (_IsDispositionSliderOpen) {
            //Slider Open
            $("#contacts").show();
            oAgentDispositionSilder.IsDispositionSliderOpen = true;
            //console.log('Open');
        }
        else {
            //Slider Close
            $("#contacts").hide();
            oAgentDispositionSilder.IsDispositionSliderOpen = false;
            //console.log('Close');
        }
        let stateMaintain = JSON.parse(sessionStorage.getItem("stateMaintain"));
        scope.smartTALKDisposition();
    }
}

function _CloseDispositionSlider() {
    $('#chatheader').removeClass('direct-chat-contacts-open');
    oAgentDispositionSilder.IsDispositionSliderOpen = false;
    $("#contacts").hide();
}
//#endregion

//#region Hide Loader
function _hideWaitModal() {
    if (window.jQuery) {
        setTimeout(function () {
            $('#InteractionWaitModal').modal('hide');
            //$('body').removeClass('modal-open');
            //$('.modal-backdrop').remove();
            //console.log('InteractionWaitModal Removed...');
        }, 500);
    }
}
//#endregion

//#region Scroll Bottom
function scrollSmoothToBottom(id) { try { $('.bluescrol').animate({ scrollTop: 1000000 }, 500); } catch (e) { } }
//#endregion

//#region Pop Overs OtherAgents Emoji
$(function () {
    $('#popoverOtherAgentDetailStats').popover({ trigger: "hover" });
    $("#popoverEmoji").popover({
        html: true,
        content: function () {
            var content = $(this).attr("data-popover-content");
            return $(content).children(".popover-body").html();
        }
    });

    $(document).on("click", ".emoIcon", function () {
        if ($('#popoverEmoji').data('bs.popover')._activeTrigger.click) {
            //Open popover is in open state ,lets close it.
            $('#popoverEmoji').click();
        }
        angular.element('#btnEmoji').scope().selectEmoji($(this)[0]);
    });
});
//#endregion

//#region Email Slider
$(function () {
    $(".received-emailer-avatar").click(function () {
        $('#divViewEmailToCc').slideToggle(000, 'linear', function () {
            if ($(this).is(':hidden')) {
                var state = "closed";
                $('.received-emailer-avatar span').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
                $('.uf-received-email-message').height(424);
            } else {
                var state = "open";
                $('.received-emailer-avatar span').removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
                $('.uf-received-email-message').height(364);
            }
        });
    });

    $(document).on('click', '#btnResoreEmailEditor', function () { RestoreEmailEditor(); });
    function RestoreEmailEditor() {
        $('.uf-agent-emailer-controls').slideToggle(000, 'linear', function () {
            if ($(this).is(':hidden')) {
                var state = "closed";
                $('button#btnResoreEmailEditor i').removeClass('fa fa-pencil-square-o').addClass('fa fa-pencil');
                $('.trumbowyg-editor').height(418);
            } else {
                var state = "open";
                $('button#btnResoreEmailEditor i').removeClass('fa fa-pencil').addClass('fa fa-pencil-square-o');
                $('.trumbowyg-editor').height(300);
            }
        });
    }
});
//#endregion

//#region Agent Slide Drawer
$(function () {
    //Chat History Slider
    $('.chathist-sidebarBtn').click(function () {
        $('.chathist-sidebar').toggleClass('chathist-active');
        $('.chathist-sidebarBtn').toggleClass('toggle');
    });
    //Dashboard Slider
    $(document).on('click', ".admin-sidebarBtn", function () {
        $('.admin-sidebar').toggleClass('admin-active');
        $('.admin-sidebarBtn').toggleClass('toggle');
    });

});
//#endregion

//#region Disable Tab Key, To Avoid Accidental Side
$(document).on('keydown', function (event) {
    //if (event.keyCode == 9) { event.preventDefault(); }
});
//#endregion            

//#region IsNumeric Validator
function _IsNumeric(eventkp) {
    var keyCode1 = (eventkp.which) ? eventkp.which : event.keyCode;
    if (keyCode1 != 46 && keyCode1 > 31 && (keyCode1 < 48 || keyCode1 > 57)) { return false; } else { return true; }
}
//#endregion

//#region Init BS ToolTip
$(function () {
    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
    $('[data-toggle="tooltip"]').on('click', function () { $(this).tooltip('hide') });
});
//#endregion

//#region Global Ajax Settings
$.ajaxSetup({ cache: false });
//#endregion

//#region Browser History Object
history.pushState(null, null, 'SmartAgent.aspx');
window.addEventListener('popstate', function (event) { history.pushState(null, null, 'SmartAgent.aspx'); });
var oURL = new URL('../error.html', document.baseURI);
if (oURL.host === location.host && oURL.protocol === location.protocol) {
    if (typeof jQuery === 'undefined') {
        window.location.href = encodeURI(oURL.href);
    }
}
//#endregion

//#region Trigger Outbound on Enter
$(document).on("keypress", "#txtManualOutBoundPhone", function (e) {
    if ($('#txtManualOutBoundPhone').is(':focus') && e.keyCode == 13) {
        angular.element($('#ChatArea')).scope().triggerManualOutBound('', 'ManualWhatsappOB');
    }
});

$(document).on("keypress", "#txtManualOutBoundEmail", function (e) {
    if ($('#txtManualOutBoundEmail').is(':focus') && e.keyCode == 13) {
        angular.element($('#ChatArea')).scope().triggerAgentEmailOutBound();
    }
});

$(document).on("keypress", "#txtManualOutBoundPhoneNoKnowlarity", function (e) {
    if ($('#txtManualOutBoundPhoneNoKnowlarity').is(':focus') && e.keyCode == 13) {
        angular.element($('#ChatArea')).scope().triggerVoiceknowlarityOutBound();
    }
});

$(document).keyup(function (e) {
    if (e.which == 27) {
        _CloseDispositionSlider();
    }
});

$(document).on("click", ".dropdown-submenu", function (e) {
    console.log(e);
});

function videoFrameMousedown() {
    $('.resp-iframe').css({ 'pointer-events': 'none' });
    $('#divVideoMinMaxBar').css({ 'background-color': '#ededed' });
}
function videoFrameMouseup() {
    $('.resp-iframe').css({ 'pointer-events': '' });
    $('#divVideoMinMaxBar').css({ 'background-color': 'white' });
}
//#endregion

$(document).on('hidden.bs.collapse', '#accordionCustJourney', function (e) {

});

function scrollMappedChannels(direction) {
    if (direction == 'right') {
        $('.intercation-filter').animate({ scrollLeft: $('.intercation-filter').scrollLeft() + 250 }, 500);
    }
    else if (direction == 'left') {
        $('.intercation-filter').animate({ scrollLeft: $('.intercation-filter').scrollLeft() - 250 }, 500);
    }
}

function scrollChatAreaToBottom() {
    setTimeout(function v() {
        $("#ChatArea").find("#bluescroll").scrollTop(999999999999999999);
    }, 1000);
}

function IsEmailAttachmentPreviewAllowed(applicationBaseType, applicationType) {
    var IsPreviewAllowed = false;
    if (applicationBaseType == 'application' && applicationType == 'pdf') {
        IsPreviewAllowed = true;
    }
    else if (applicationBaseType == 'image' || applicationBaseType == 'text') {
        IsPreviewAllowed = true;
    }
    return IsPreviewAllowed;
}

function _closeEmaillAttachmentPreviewModal() {
    document.getElementById('iframeEmailAttachmentPreview').src = '';
    $('#EmailAttachmentModal').modal('hide');
}

function _transposeVideoFrame(transposeType) {
    if (transposeType == 'Minimize') {
        $(".drag-resize-div").animate({ "left": "35%", "top": "0", "height": "5px", "width": "200px" });
    }
    else if (transposeType == 'Restore') {
        $(".drag-resize-div").animate({ "left": "35%", "top": "0", "height": "320px", "width": "305px" });
    }
    else if (transposeType == 'Maximize') {
        $(".drag-resize-div").animate({ "left": "0", "top": "0", "height": "100%", "width": "100%" });
    }
    else if (transposeType == 'Custom') {
        $(".drag-resize-div").animate({ "left": "50%", "top": "10%", "height": "62%", "width": "48%" });
    }
}

//#region Utility Function
function phonenumber(inputtxt) {
    var phoneno = /^\d{12}$/;
    var retu = (inputtxt.match(phoneno)) ? true : false;
    return retu;
}

function Voicephonenumber(inputtxt) //5 may
{
    var retu = false;
    if (inputtxt) {
        var phoneno = /^[0-9]{8,12}$/;
        retu = (inputtxt.match(phoneno)) ? true : false;
    }
    return retu;
}
function CountryCodeValidator(inputtxt) //5 may
{
    var retu = false;
    if (inputtxt) {
        retu = (inputtxt.match(CountryCodeRegex)) ? true : false;
    }
    return retu;
}


function _groupFlatArray(arr) {
    const result = arr.reduce((total, value) => {
        total[value] = (total[value] || 0) + 1;
        return total;
    }, {});
    return result
}

function getFilename(url) {
    _url = url;
    // get the part after last /, then replace any query and hash part
    url = url.split('/').pop().replace(/\#(.*?)$/, '').replace(/\?(.*?)$/, '');
    url = url.split(/\.(?=[^\.]+$)/);  // separates filename and extension based on last dot.
    return { filename: (url[0] || ''), ext: (url[1] || ''), link: _url }
}

var removeArrayElementByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {

            arr.splice(i, 1);

        }
    }
    return arr;
}

function getIdxByAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

//davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
//#endregion

function _broadcastDeleteDisposeEmailAttachment(type, cESessionId, arrDisposedEmailAttachments, oAttachmentUrlInfo) {
    const bcChannel = new BroadcastChannel('email_delete_attachment');
    bcChannel.postMessage({ 'type': type, 'cESessionId': cESessionId, 'arrDisposedEmailAttachments': arrDisposedEmailAttachments, 'oAttachmentInfo': oAttachmentUrlInfo });
}

function funCalcTotalEmailSize(arrTotalEmailAttachmentSize) {
    let Totalsize = 0;
    for (const element of arrTotalEmailAttachmentSize) {
        Totalsize = element.FileSize + Totalsize;
    }
    return Totalsize;
}

function _getMappedChannelsIconClass(chanelname) {
    switch (chanelname) {
        case "IM":
            return "fa fa-twitch mapped-channel";
            break;
        case "TWITTERDM":
            return "fa fa-twitter mapped-channel";
            break;
        case "TWITTER":
            return "fa fa-twitter-square mapped-channel";
            break;
        case "WHATSAPP":
            return "fa fa-whatsapp mapped-channel";
            break;
        case "SKYPE":
            return "fa fa-skype mapped-channel";
            break;
        case "WEBCHAT":
            return "fa fa-weixin mapped-channel";
            break;
        case "FBCHAT":
            return "fa fa-facebook mapped-channel";
            break;
        case "FB":
            return "fa fa-facebook-official mapped-channel";
            break;
        case "TELEGRAM":
            return "fa fa-paper-plane mapped-channel";
            break;
        case "CRAWL":
            return "fa fa-question mapped-channel";
            break;
        case "SMS":
            return "fa fa-envelope-square mapped-channel";
            break;
        case "VOICE":
            return "fa fa-phone mapped-channel";
            break;
        case "INSTAGRAMPOST": case "INSTAGRAMDM":
            return "fa fa-instagram mapped-channel";
            break;
        case "LINECHAT":
            return "fa fa-question mapped-channel";
            break;
        case "VIBER":
            return "fab fa-viber mapped-channel";
            break;
        case "EMAIL":
            return "fa fa-envelope mapped-channel";
            break;
        case "BUZZ":
            return "fa fa-bolt mapped-channel";
            break;
        case "COBROWSE":
            return "fa fa-desktop mapped-channel";
            break;
        case "VIDEO":
            return "fa fa-video-camera mapped-channel";
            break;
        case "MOBILE-APP":
            return "fa fa-mobile mapped-channel";
            break;
        default:
            return "fa fa-question mapped-channel";
    }
}



//#region Class Modal
var CustRecentChat = {
    AGENT_ID: '',
    FROM_DATE: '',
    TO_DATE: '',
    CHANNELS: '',
    SESSIONID: '',
    SEARCH: false,
    CUSTOMERATTRIBUTEKEY: '',
    CUSTOMERATTRIBUTEVALUE: '',
    PROCESSID: '',
    OUTBOUNDCHANNELS: '',
    AGENTNUMBER: '',
    CUSTNUMBER: '',
    CHANNEL: '',
    CHANNELSOURCE: '',
};

var CLASS_Dispose = {
    hdsessionId: '',
    hdPhoneNo: '',
    txtRemark: '',
    ddlSubDisposition: '',
    ddlDisposition: '',
    WRAPFORMFIELD1: '',
    WRAPFORMFIELD2: '',
    WRAPFORMFIELD3: '',
    WRAPFORMFIELD4: '',
    WRAPFORMFIELD5: '',
    WRAPFORMFIELD6: '',
    WRAPFORMFIELD7: '',
    WRAPFORMFIELD8: '',
    WRAPFORMFIELD9: '',
    WRAPFORMFIELD10: '',
    WRAPFORMFIELD11: '',
    WRAPFORMFIELD12: '',
    WRAPFORMFIELD13: '',
    WRAPFORMFIELD14: '',
    WRAPFORMFIELD15: '',
    WRAPFORMFIELD16: '',
    WRAPFORMFIELD17: '',
    WRAPFORMFIELD18: '',
    WRAPFORMFIELD19: '',
    WRAPFORMFIELD20: '',
    PARKTIME: '',
    SCHEDULEDTIME: '',
    TARGETCHANNELTYPE: '',
    TARGETCHANNELVALUE: '',
    ddlProduct: '',
    Name: '',
    Number: '',
    REQUESTORIGIN: '',
    APPSOURCE: '',
};
//#endregion


//#region doughnut chart.js

//#endregion

