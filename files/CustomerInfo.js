var chanel = "";
$(document).ready(function () {
    var scope = angular.element($('#ChatArea')).scope();
    scope.$apply(function () {
        scope.SENEDIMAGES = clientConfig.IsAttachFileButtonDisplayed;
        scope.TransferToSkills = clientConfig.allowTransferToSkills;        
        scope.MessageDispalyCountDefault = 5;
        //scope.SmartLinkLogin = "";        
        //scope.SmartLinkTickeUrl = "";
        scope.post = false;
        scope.postFB = false;
        scope.postTWITER = false;
        scope.postTWITERMSG = "";
        //Tabs Related Config
        scope.CustomerInfo = clientConfig.IsCustomerInfoDisplayed;
        scope.CustomerHistory = clientConfig.IsCustomerHistoryDisplayed;
        scope.ParkedInteractions = clientConfig.IsParkedInteractionsDisplayed;
        scope.MyChatHistory = clientConfig.IsMyChatHistoryDisplayed;
        scope.OtherAgent = clientConfig.IsOtherAgentDisplayed;
        scope.coutboundtab = clientConfig.IsOutboundCustomerDisplayed;  //OB customer
        scope.CannedMessages = clientConfig.IsCannedMessagesDisplayed;
        scope.DefaultCannedMessage = clientConfig.IsDefaultCannedMessageDisplayed;
        scope.MyCannedMessage = clientConfig.IsMyCannedMessageDisplayed;
        scope.ShoGroupChat = clientConfig.IsGroupChatDisplayed;  //Group Chat
        //scope.SmartLink = clientConfig.CRMTabConfig.IsCRMTabDisplayed;//remove this later and modify as per new code
        scope.cCrolBrowser = clientConfig.IsCrawlBrowserDisplayed;
        //Disposition Related Config
        scope.DispositionConfig = clientConfig.DispositionConfig;

        //if (scope.SmartLink == true)
        //{
        //    $('#iframecrm').prop('src', scope.SmartLinkLogin)
        //    scope.ccrmtab = true;
        //}
        scope.ChangePWD = false;
        
    });
});

function GetActiveChanel() {
    try {
        var scope = angular.element($('#ChatArea')).scope();
        var k = scope.hdCHANNELID;
        return k;
    } catch (e) { return ""; }
}

document.body.style.zoom = "100%";

var ContentBlocking = true;
//set content blocking as per client
if (clientConfig.ClientName === 'kotaksecurities') {
    ContentBlocking = false;
} else {
    //set another options here
}

//This function sets the CUSTOMERATTRIBUTE display name for specfic Channel
function funActiveChatSasionInfo(name) {    
    //this check was made to avoid undefined error
    if (typeof (name) === "undefined") { name = ''; }
    chanel = GetActiveChanel();

    var scope = angular.element($('#ChatArea')).scope();
    var custInfoKVP = scope.CustInfoKeyValPair;    
    var custInfoKeyValPair = $.grep(custInfoKVP, function (element, index) {        
        return element.LANGUAGECODE === scope.selectedTranslation.LanguageCode;
    });    
    for (var i = 0; i < custInfoKeyValPair.length; i++)
    {        
        if (custInfoKeyValPair[i].CUSTOMERATTRIBUTEKEY === name.toUpperCase() && custInfoKeyValPair[i].CUSTOMERATTRIBUTECHANNELTYPE === chanel.toUpperCase() && custInfoKeyValPair[i].CUSTOMERATTRIBUTEVALUE !== '') {            
            return custInfoKeyValPair[i].CUSTOMERATTRIBUTEVALUE;
        }
    }
}

function funActiveCoustomerEditable(name) {
    //this check was made to avoid undefined error
    if (typeof (name) === "undefined") {
        name = '';
    }
    // LoadInfoCustomer();
    switch ($.trim(name.toUpperCase())) {
        case "CUSTOMERATTRIBUTE40":
          return "true";
        default:
            return "false";
    }
}

//This function Show/Hide CUSTOMERATTRIBUTE accordingly for specfic Channel
function funActiveCoustomerDetailsDisplay(name) {
    if (typeof (name) === "undefined") { name = ''; }
    chanel = GetActiveChanel();

    var scope = angular.element($('#ChatArea')).scope();
    var custInfoKeyValPair = scope.CustInfoKeyValPair;

    for (var i = 0; i < custInfoKeyValPair.length; i++) {
        if (custInfoKeyValPair[i].CUSTOMERATTRIBUTEKEY === name.toUpperCase() && custInfoKeyValPair[i].CUSTOMERATTRIBUTECHANNELTYPE === chanel.toUpperCase() && custInfoKeyValPair[i].CUSTOMERATTRIBUTEVALUE !== '') {
            return true;
        }
    }
}

function funActiveChatSasionChanelIcon(name) {
    if (typeof (name) === "undefined") { name = ''; }
    chanel = GetActiveChanel();
    return "fa fa-info-circle";
}

function ActiveCustomerInfoIconChannelWise(customerattributeKey, channelID) {
    if (typeof (customerattributeKey) !== "undefined" && typeof (channelID) !== "undefined") {
        var scope = angular.element($('#ChatArea')).scope();
        var custInfoKeyValPair = scope.CustInfoKeyValPair;

        for (var i = 0; i < custInfoKeyValPair.length; i++) {
            if (custInfoKeyValPair[i].CUSTOMERATTRIBUTEKEY === customerattributeKey.toUpperCase() && custInfoKeyValPair[i].CUSTOMERATTRIBUTECHANNELTYPE === channelID.toUpperCase() && custInfoKeyValPair[i].CUSTOMERATTRIBUTEVALUE !== '') {
                return custInfoKeyValPair[i].CUSTOMERATTRIBUTEICON;
            }
        }
    }
    else {
        return '';
    }
}

//var PassTowrapform = [];
//var PassTowrapform = [ { 'CUSTOMERATTRIBUTE1': 'IsAuthenticated' }, { 'CUSTOMERATTRIBUTE2': 'IsLoocked' }, { 'CUSTOMERATTRIBUTE3': 'IsRegistered' }, { 'CUSTOMERATTRIBUTE4': 'ChannelofChat' }, { 'CUSTOMERATTRIBUTE5': 'ClientCode' }];
//var PassTowrapform = [{ 'CUSTOMERATTRIBUTE23': 'CHANNELSOURCE' }, { 'CUSTOMERATTRIBUTE22': 'UID' }, { 'CUSTOMERATTRIBUTE3': 'EMAILID' }, { 'id': 'CUSTOMERID' }, { 'CUSTOMERATTRIBUTE21': 'CHANEL' }, { 'CUSTOMERATTRIBUTE4': 'ISAUTHENTICATED' }, { 'CUSTOMERATTRIBUTE5': 'ISLOOCKED' }, { 'CUSTOMERATTRIBUTE6': 'ISREGISTERED' }, { 'CUSTOMERATTRIBUTE20': 'CHANNELOFCHAT' }, { 'CUSTOMERATTRIBUTE7': 'CLIENTCODE' }, { 'CUSTOMERATTRIBUTE2': 'MOBILENUMBER' }, { 'CUSTOMERATTRIBUTE8': 'CITY' }, { 'CUSTOMERATTRIBUTE1': 'NAME' }];
//var PassTowrapform = [{ 'CUSTOMERATTRIBUTE2': 'CONTACTNUMBER' }, { 'CUSTOMERATTRIBUTE27': 'CHANNEL' }];
var PassTowrapform = [{ 'CUSTOMERATTRIBUTE2': 'TICKETID' }, { 'CUSTOMERATTRIBUTE27': 'CHANNEL' }, { 'CUSTOMERATTRIBUTE2': 'MOBILENUMBER' }, { 'CUSTOMERATTRIBUTE3': 'EMAILID' }, { 'CUSTOMERATTRIBUTE23': 'BOTUID' }];
//var PassTowrapform = [{ 'CUSTOMERATTRIBUTE1': 'CUSTOMERNAME' }, { 'CUSTOMERATTRIBUTE2': 'SENTIMENT' }, { 'CUSTOMERATTRIBUTE3': 'EMAIL' }, { 'CUSTOMERATTRIBUTE4': 'TICKETID' }, { 'CUSTOMERATTRIBUTE5': 'CHANNELSOURCE' }, { 'CUSTOMERATTRIBUTE6': 'TICKETPRIORITY' }, { 'CUSTOMERATTRIBUTE31': 'PARENTSESSIONID' }];
//var PassTowrapform = [{ 'CUSTOMERATTRIBUTE1': 'CUSTOMERNAME' }, { 'CUSTOMERATTRIBUTE4': 'TOURISTID' }, { 'CUSTOMERATTRIBUTE14': 'COUNTRY' }, { 'CUSTOMERATTRIBUTE15': 'STATE' }, { 'CUSTOMERATTRIBUTE16': 'CITY' }, { 'CUSTOMERATTRIBUTE13': 'CASEID' }, { 'CUSTOMERATTRIBUTE2': 'MOBILE' }, { 'CUSTOMERATTRIBUTE3': 'EMAIL' }];

//var PassTowrapform = [{ 'CUSTOMERATTRIBUTE23': 'CHANNELSOURCE' }, { 'CUSTOMERATTRIBUTE22': 'UID' }, { 'CUSTOMERATTRIBUTE3': 'EMAILID' }, { 'id': 'CUSTOMERID' }, { 'CUSTOMERATTRIBUTE21': 'CHANEL' }, { 'CUSTOMERATTRIBUTE4': 'ISAUTHENTICATED' }, { 'CUSTOMERATTRIBUTE5': 'ISLOOCKED' }, { 'CUSTOMERATTRIBUTE6': 'ISREGISTERED' }, { 'CUSTOMERATTRIBUTE20': 'CHANNELOFCHAT' }, { 'CUSTOMERATTRIBUTE7': 'CLIENTCODE' }, { 'CUSTOMERATTRIBUTE2': 'MOBILENUMBER' }, { 'CUSTOMERATTRIBUTE8': 'CITY' }, { 'CUSTOMERATTRIBUTE1': 'NAME' }, { 'CUSTOMERATTRIBUTE32': 'ISONLINE' }, { 'CUSTOMERATTRIBUTE33': 'ISBYPASS' }, { 'CUSTOMERATTRIBUTE34': 'AGENTASSIGNNAME' }, { 'CUSTOMERATTRIBUTE35': 'CHATTOTRADE' }, { 'CUSTOMERATTRIBUTE7': 'MULTIPLECLIENTCODE' }, { 'CUSTOMERATTRIBUTE39': 'CHAT2TRADECLIENTCODE' }];