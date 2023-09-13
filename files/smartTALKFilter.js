
function funCheckRecord(json1, json2) {

    return FunGetUnMachedRecord(json1.concat(json2));
}
function FunGetUnMachedRecord(data) {
    var temp = {};
    var dublicate = [];
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        if (temp[obj.AGENTID] >= 0) {
            dublicate.push(data[i]);
            data.splice(i, 1);
            i--;
        }
        temp[obj.AGENTID] = i;
    }
    dublicate.forEach(function (v, i) {
        data.forEach(function (k, j) {
            if (k.AGENTID == v.AGENTID) {
                data.splice(j, 1);
            }
        });
    });
    return data;
}


function funCheckActiveRecord(json1, json2) {

    return FunActiveGetUnMachedRecord(json1.concat(json2));
}
function FunActiveGetUnMachedRecord(data) {


    var temp = {};
    var dublicate = [];
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        if (temp[obj.SESSIONID] >= 0) {
            dublicate.push(data[i]);
            data.splice(i, 1);
            i--;
        }
        temp[obj.SESSIONID] = i;
    }
    dublicate.forEach(function (v, i) {
        data.forEach(function (k, j) {
            if (k.SESSIONID == v.SESSIONID) {
                data.splice(j, 1);
            }
        });
    });
    return data;
}

var isActive = true;
var listOfNotifaction = [];
window.onfocus = function () {
    isActive = true;
    try {
        for (var i = 0; i < listOfNotifaction.length; i++) {
            listOfNotifaction[i].close()
        }
    } catch (e) { }
};
window.onblur = function () {
    isActive = false;
};
function playsound(uid) {
    var scope = angular.element($('#ChatArea')).scope();
    scope.$apply(function () {
        try {
            if (uid === scope.hdsessionId || uid !== scope.hdsessionId) {
                var audio = new Audio('./PageJs/MessageAlertTone.wav');
                audio.play();
            }
        } catch (e) { }
    });
}
function SmartNotificationPull(uid, UserPic, UserName, UserMessgae) {
    if (readCookie("SoundNotification") == "true") {
        playsound(uid);
    }
    if (!isActive)//true
    {
        if (readCookie("Dextopenotification") == "true") {
            Notification.requestPermission(function (permission) {
                var notification = new Notification(UserName, {
                    body: UserMessgae,
                    icon: UserPic,
                    dir: 'auto'
                });
                listOfNotifaction.push(notification);

                notification.onclick = function (event) {
                    var scope = angular.element($('#ChatArea')).scope();
                    if (scope.smartTALKActiveSessionList.length > 0) {
                        for (var i = 0; i < scope.smartTALKActiveSessionList.length; i++) {
                            if (scope.smartTALKActiveSessionList[i].SESSIONID === uid) {
                                scope.smartTALKClickActiveSession(scope.smartTALKActiveSessionList[i], i,'');
                            }
                        }
                    }
                    parent.focus();
                    window.focus();
                    this.close();
                }
            });
        }
    }
}

function NotifyInviteToVRM(strSessionId, strChannel, strAgentId, strFEDID, strPreviewMessage, rmId, strInteractionType)
{
    parent.postMessage(JSON.stringify({ message: "Interaction Arrived", action: "NewInteraction", value: strSessionId, channel: strChannel }), '*');

    if (strInteractionType == 'OUTBOUND')
    {
        //setTimeout(function () { FocusOnInteraction(strSessionId, null); }, 1000);        
    }
}

function FocusOnInteraction(_sessionId, _channel) {
    var scope = angular.element($('#ChatArea')).scope();

    if (_channel)
    {
        scope.filterActiveAgentInteractions(_channel, 1);
    }

    if (_sessionId) {
        if (scope.smartTALKActiveSessionList.length > 0) {
            for (var i = 0; i < scope.smartTALKActiveSessionList.length; i++) {
                if (scope.smartTALKActiveSessionList[i].SESSIONID === _sessionId) {
                    scope.smartTALKClickActiveSession(scope.smartTALKActiveSessionList[i], i,'');
                }
            }
        }
    }

}