var clientConfig = {};
var FetchEncodeClientConfig = false;
var CheckOfflineHoursForParking = false;
$(document).ready(function () {

    var agentProcessId = $('#hdnAgentProcessId').val() || "1";
    var Filepath = "" + "enc_" + "ClientConfig_" + agentProcessId + ".json";
    var APIurl = oAgentURL.ClientConfigURL;
   

    function _loadAgentEncodeClientConfig() {
        try {
            $.ajax({
                type: "POST",
                url: "SmartAgent.aspx/DecodeClientConfig",
                //data: JSON.stringify({ 'processID': agentProcessId }, { '_filepath': Filepath }),  mobile: mobileno, TemplateName: TemplateName,
                data: JSON.stringify({ processID: agentProcessId, _filepath: Filepath }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data) {
                        data = JSON.parse(data.d);
                        clientConfig = data;
                        _loadAgentCustomerInfoConfig();
                    } else { console.log('No data returned from _loadAgentEncodeClientConfig()'); }
                },
                error: function (xhr) { console.log('_loadAgentEncodeClientConfig() error xhr : ', xhr); },
                failure: function (response) { console.log('_loadAgentEncodeClientConfig() failure response : ', response); }
            });
        } catch (e) {
            console.log('_loadAgentClientConfig() catch error');
        }
    }

    function _loadAgentClientConfig() {
        try {
            $.ajax({
                type: "GET",
                url: APIurl + '/ClientConfig_' + agentProcessId + '.json',
                data: '{}',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data) {
                        clientConfig = data;
                        _loadAgentCustomerInfoConfig();
                    } else { console.log('No data returned from _loadAgentClientConfig()'); }
                },
                error: function (xhr) { console.log('_loadAgentClientConfig() error xhr : ', xhr); },
                failure: function (response) { console.log('_loadAgentClientConfig() failure response : ', response); }
            });
        } catch (e) { console.log('_loadAgentClientConfig() catch error'); }
    }

    function _loadAgentCustomerInfoConfig() {
        try {
            $.ajax({
                type: "GET",
                url: APIurl + '/CustomerInfo_' + agentProcessId + '.json',
                data: '{}',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data) {
                        clientConfig.CustInfoKeyValPair = data;
                    } else { console.log('No data returned from _loadAgentCustomerInfoConfig()'); }
                },
                error: function (xhr) { console.log('_loadAgentCustomerInfoConfig() error xhr : ', xhr); },
                failure: function (response) { console.log('_loadAgentCustomerInfoConfig() failure response : ', response); }
            });
        } catch (e) { console.log('_loadAgentCustomerInfoConfig() catch error'); }
    }

    function GetWebConfigKeys() {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetWebConfigKeys",
            data: "{}",
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log('GetConfigKeyManager', JSON.parse(data.d));
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('GetConfigKeyManager() for login error', xhr);
            }
        });
    }
    //CheckOfflineHoursForParking starts
    function _CheckOfflineHoursForParking(tenantid) {
        try {
            Number.prototype.padLeft = function (base, chr) {
                var len = (String(base || 10).length - String(this).length) + 1;
                return len > 0 ? new Array(len).join(chr || '0') + this : this;
            };                
            var d = new Date,
                dformat = [d.getFullYear().padLeft(),
                    (d.getMonth() + 1).padLeft(),
                    d.getDate().padLeft("0")].join('-') +
                        ' ' +
                        [d.getHours().padLeft(),
                        d.getMinutes().padLeft(),
                        d.getSeconds().padLeft()].join(':');           
           
            $.ajax({
                type: "POST",
                url: "SmartAgent.aspx/CheckOfflineHoursForParking",              
                data: JSON.stringify({ processID: agentProcessId, dateTime: dformat, Channel: 'Webchat', languageCode: 'EN' }),
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

    //GetWebConfigKeys();

    if (FetchEncodeClientConfig) {
        _loadAgentEncodeClientConfig();
    }
    else {
        _loadAgentClientConfig();
    }

    if (CheckOfflineHoursForParking) {
        _CheckOfflineHoursForParking(agentProcessId);
    }

});