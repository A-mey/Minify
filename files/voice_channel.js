var containerDiv = document.getElementById("AWS-container-div");
var instanceURL = "https://wipro-unfyd.my.connect.aws/connect/ccp#/";

/* $(document).ready(function () {
   // if (scope.ASW) {
   init();
   // }
   //your code
}); */

window.myCPP = window.myCPP || {};

// initialize the streams api
function LoadAWS() {
    // initialize the ccp
    connect.core.initCCP(containerDiv, {
        ccpUrl: instanceURL, // REQUIRED
        loginPopup: true, // optional, defaults to `true`
        loginPopupAutoClose: true, // optional, defaults to `false`
        loginOptions: { // optional, if provided opens login in new window
            autoClose: true, // optional, defaults to `false`
            height: 600, // optional, defaults to 578
            width: 400, // optional, defaults to 433
            top: 0, // optional, defaults to 0
            left: 0 // optional, defaults to 0
        },
        region: "us-west-2", // REQUIRED for `CHAT`, optional otherwise
        softphone: { // optional, defaults below apply if not provided
            allowFramedSoftphone: true, // optional, defaults to false
            disableRingtone: false, // optional, defaults to false
            ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
        },
        pageOptions: { // optional
            enableAudioDeviceSettings: true, // optional, defaults to 'false'
            enablePhoneTypeSettings: true // optional, defaults to 'true'
        }
    });
    _OnLoad();
}

var UNFYD_contact = '';
function _OnLoad() {
    setTimeout(function () {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            var TemplateName = localStorage.getItem("agentASWIVRChannels");
            if (TemplateName != null)
                scope.ASWIVRChannels = JSON.parse(TemplateName);
        });
        connect.contact(subscribeToContactEvents);
        connect.agent(subscribeToAgentEvents);
        smartTALKNotificationError("You are successfully logged in to Amazon Connect");
    }, 5000);
}

function funmute(event) {
    window.myCPP.agent.mute();
    var scope = angular.element($('#ChatArea')).scope();
    scope.$applyAsync(function () {
        scope.ASWIVRChannels.disconnect = true;
        scope.ASWIVRChannels.call = false;
        scope.ASWIVRChannels.reject = false;
        scope.ASWIVRChannels.Mute = false;
        scope.ASWIVRChannels.Unmute = true;
        scope.ASWIVRChannels.Hold = true;
        scope.ASWIVRChannels.Merge = false;
        scope.ASWIVRChannels.Transfer = false;
        localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
        ClickToIvrAction("VOICE", "AWS", window.myCPP.contact.contactId, "MUTE", "INBOUND", "Accepted contact via Streams", scope.hdsessionId, "", "");
    });
    event.stopPropagation();
}

function fununmute(event) {
    window.myCPP.agent.unmute();
    var scope = angular.element($('#ChatArea')).scope();
    scope.$applyAsync(function () {
        scope.ASWIVRChannels.disconnect = true;
        scope.ASWIVRChannels.call = false;
        scope.ASWIVRChannels.reject = false;
        scope.ASWIVRChannels.Mute = true;
        scope.ASWIVRChannels.Unmute = false;
        scope.ASWIVRChannels.Hold = true;
        scope.ASWIVRChannels.Merge = false;
        scope.ASWIVRChannels.Transfer = false;
        localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
        ClickToIvrAction("VOICE", "AWS", window.myCPP.contact.contactId, "CONNECTED", "INBOUND", "Accepted contact via Streams", scope.hdsessionId, "", "");
    });
    event.stopPropagation();
}

function connectionhold(event) {
    var conns = window.myCPP.contact.getActiveInitialConnection();
    conns.hold({
        success: function () {
            var scope = angular.element($('#ChatArea')).scope();
            scope.$applyAsync(function () {
                scope.ASWIVRChannels.Hold = false;
                scope.ASWIVRChannels.resume = true;
                scope.ASWIVRChannels.Merge = false;
                scope.ASWIVRChannels.Transfer = false;
                localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
                ClickToIvrAction("VOICE", "AWS", window.myCPP.contact.contactId, "ON HOLD", "INBOUND", "Accepted contact via Streams", scope.hdsessionId, "", "");
            });
        },
        failure: function (err) {
            /* ... */
        }
    });
    event.stopPropagation();
}

function connectionresume(event) {
    var conns = window.myCPP.contact.getActiveInitialConnection();
    conns.resume({
        success: function () {
            var scope = angular.element($('#ChatArea')).scope();
            scope.$applyAsync(function () {
                scope.ASWIVRChannels.Hold = true;
                scope.ASWIVRChannels.resume = false;
                scope.ASWIVRChannels.Merge = false;
                scope.ASWIVRChannels.Transfer = false;
                localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
                ClickToIvrAction("VOICE", "AWS", window.myCPP.contact.contactId, "CONNECTED", "INBOUND", "Accepted contact via Streams", scope.hdsessionId, "", "");
            });
        },
        failure: function (err) { /* ... */ }
    });
    event.stopPropagation();
}

function subscribeToContactEvents(contact) {
    window.myCPP.contact = contact;
    logInfoMsg("Subscribing to events for contact");
    if (contact.getActiveInitialConnection()
        && contact.getActiveInitialConnection().getEndpoint()) {
        var _phoneNumber = "";
        var _DNIS = "";
        try {
            var _numberd = contact.getConnections()[0].getEndpoint();
            var queuesARNs = window.myCPP.agent.getAllQueueARNs();
            try {
                window.myCPP.agent.getEndpoints(
                    queuesARNs[0],
                    {
                        success: function (data) {
                            var endpoints = data.endpoints; // or data.addresses
                        },
                        failure: function (err) {
                        }
                    }
                );
            }
            catch (e) {
                console.log('subscribeToContactEvents() catch error');
            }

            var taskName = contact.getName();
            _phoneNumber = contact._getData().connections[1].address.phoneNumber;
            _DNIS = contact.agent.getExtension();
            var k = JSON.stringify(contact._getData());

            var agentConn = JSON.stringify(contact.getAgentConnection());
        }
        catch (e) { }

        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            scope.ASWIVRChannels.ConnecctionId = contact.contactId;
            scope.ASWIVRChannels.phoneincomming = true;
            scope.ASWIVRChannels.reject = true;
            scope.ASWIVRChannels.call = true;
            scope.ASWIVRChannels.Number = _phoneNumber;
            if (scope.ASWIVRChannels.InterCationType == 'OUTBOUND') {
                scope.ASWIVRChannels.reject = false;
                scope.ASWIVRChannels.disconnect = true;
            }
            else {
                scope.ASWIVRChannels.reject = true;
                scope.ASWIVRChannels.disconnect = false;
            }
            ClickToIvrAction("VOICE", "AWS", contact.contactId, "ReqNewInteraction", scope.ASWIVRChannels.InterCationType, "New call", "", _phoneNumber, _phoneNumber);

            try {
                setTimeout(function () {
                    var scope = angular.element($('#ChatArea')).scope();
                    scope.$applyAsync(function () {
                        if (scope.ASWIVRChannels.InterCationType == "OUTBOUND") {
                            NotifyAcceptInviteToSAP(scope.hdsessionId, "CALL", "INBOUND", "ACCEPT", "", "CALL", scope.ASWIVRChannels.Number, "VOICE");
                        }
                    });
                }, 7000);
            } catch (e) {
            }

            //NotifyAcceptInviteToSAP(contact.contactId, "CALL", "INBOUND", "NOTIFY", "", "CALL", _phoneNumber, "VOICE");
            scope.ASWIVRChannels.InterCationType = 'INBOUND';
            localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
        });
        logInfoMsg("New contact is from " + contact.getActiveInitialConnection().getEndpoint().phoneNumber);
    } else {
        logInfoMsg("This is an existing contact for this agent");
    }

    logInfoMsg("Contact is from queue " + contact.getQueue().name);
    logInfoMsg("Contact attributes are " + JSON.stringify(contact.getAttributes()));
    contact.onIncoming(handleContactIncoming);
    contact.onAccepted(handleContactAccepted);
    contact.onConnected(handleContactConnected);
    contact.onMissed(handleContactMissed);
    contact.onEnded(handleContactEnded);
}

function handleContactIncoming(contact) {
    if (contact)
        logInfoEvent("[contact.onIncoming] Contact is incoming. Contact state is " + contact.getStatus().type);
    else
        logInfoEvent("[contact.onIncoming] Contact is incoming. Null contact passed to event handler");
}

function handleContactAccepted(contact) {
    if (contact)
        logInfoEvent("[contact.onAccepted] Contact accepted by agent. Contact state is " + contact.getStatus().type);
    else
        logInfoEvent("[contact.onAccepted] Contact accepted by agent. Null contact passed to event handler");
}

function handleContactConnected(contact) {
    if (contact) {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            scope.ASWIVRChannels.disconnect = true;
            scope.ASWIVRChannels.call = false;
            scope.ASWIVRChannels.reject = false;
            scope.ASWIVRChannels.Mute = true;
            scope.ASWIVRChannels.Unmute = false;
            scope.ASWIVRChannels.Hold = true;
            scope.ASWIVRChannels.Merge = false;
            scope.ASWIVRChannels.Transfer = false;
            localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
            // ClickToIvrAction("VOICE", "AWS", contact.contactId, "ANSWERED", "INBOUND", "Accepted contact via Streams", scope.hdsessionId,"","");
            // setTimeout(function(contactId,hdsessionId){ 
            // ClickToIvrAction("VOICE", "AWS", contactId, "CONNECTED", "INBOUND", "Accepted contact via Streams", scope.hdsessionId,"","");
            // }, 1000,contact.contactId,scope.hdsessionId);
        });
        logInfoEvent("[contact.onConnected] Contact connected to agent. Contact state is " + contact.getStatus().type);
    } else {
        logInfoEvent("[contact.onConnected] Contact connected to agent. Null contact passed to event handler");
    }
}

function handleContactMissed(contact) {
    if (contact) {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            scope.ASWIVRChannels.phoneincomming = false;
            scope.ASWIVRChannels.disconnect = false;
            scope.ASWIVRChannels.call = false;
            scope.ASWIVRChannels.reject = false;
            scope.ASWIVRChannels.ContactMissed = true;
            ClickToIvrAction("VOICE", "AWS", contact.contactId, "DISCONNECTED ON RINGING NO RESPONSE", "INBOUND", "reject contact via Streams", scope.hdsessionId, "", "");
            localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
        });
    }
}

function handleContactEnded(contact) {
    var scope = angular.element($('#ChatArea')).scope();
    scope.$applyAsync(function () {

        if (contact) {
            if (scope.ASWIVRChannels.call)
                ClickToIvrAction("VOICE", "AWS", contact.contactId, "CUSTOMER ABENDED", "INBOUND", "reject contact via Streams", scope.hdsessionId, "", "");

            scope.ASWIVRChannels.phoneincomming = false;
            scope.ASWIVRChannels.disconnect = false;
            scope.ASWIVRChannels.call = false;
            scope.ASWIVRChannels.reject = false;
            scope.ASWIVRChannels.Mute = false;
            scope.ASWIVRChannels.Unmute = false;
            scope.ASWIVRChannels.Hold = false;
            scope.ASWIVRChannels.Merge = false;
            scope.ASWIVRChannels.Transfer = false;
            scope.ASWIVRChannels.AgentClose = false;
            localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
            setTimeout(function (contactId, hdsessionId) {
                ClickToIvrAction("VOICE", "AWS", contactId, "DISCONNECTED", "INBOUND", "", hdsessionId, "", "");
            }, 3000, contact.contactId, scope.hdsessionId);

            logInfoEvent("[contact.onEnded] Contact has ended. Contact state is " + contact.getStatus().type);
        } else {
            logInfoEvent("[contact.onEnded] Contact has ended. Null contact passed to event handler");
        }
    });
}

function AgentCallInbound(data) {
    try {
        let scope = angular.element($('#ChatArea')).scope();
        if (data.CHANNELID == 'VOICE' && data.INTERACTIONTYPE == 'INBOUND') {
            scope.$applyAsync(function () {
                scope.ASWIVRChannels =
                {
                    ConnecctionId: data.PHONENO,
                    phoneincomming: true,
                    disconnect: false,
                    call: false,
                    reject: true,
                    Mute: false,
                    Unmute: false,
                    Hold: false,
                    resume: false,
                    Merge: false,
                    Transfer: false,
                    AgentClose: false,
                    InterCationType: data.INTERACTIONTYPE,
                    ContactMissed: false,
                    Number: ''
                };
            });
        }
    } catch (e) {
        console.log("Agent Call Inbound catch error", e.message);
    }
}

function AgentCallOutbound(number) {
    try {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            scope.ASWIVRChannels.InterCationType = "OUTBOUND";
            localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
        });
    }
    catch (e) {
    }
}

function subscribeToAgentEvents(agent) {
    window.myCPP.agent = agent;
    var permissions = agent.getPermissions();
    var routingProfile = agent.getRoutingProfile();
    agentGreetingDiv.innerHTML = '<h3>Hi ' + agent.getName() + '!</h3>';
    logInfoMsg("Subscribing to events for agent " + agent.getName());
    logInfoMsg("Agent is currently in status of " + agent.getStatus().name);
    displayAgentStatus(agent.getStatus().name);
    agent.onRefresh(handleAgentRefresh);
    agent.onRoutable(handleAgentRoutable);
    agent.onNotRoutable(handleAgentNotRoutable);
    agent.onOffline(handleAgentOffline);

    agent.onMuteToggle(function (obj) {
        /* if (obj.muted) {
        } else {
        } */
    });
    //debugger
}

function handleAgentRefresh(agent) {
    logInfoEvent("[agent.onRefresh] Agent data refreshed. Agent status is " + agent.getStatus().name);
    displayAgentStatus(agent.getStatus().name);
}

function handleAgentRoutable(agent) {
    logInfoEvent("[agent.onRoutable] Agent is routable. Agent status is " + agent.getStatus().name);
    displayAgentStatus(agent.getStatus().name);
}

function handleAgentNotRoutable(agent) {
    logInfoEvent("[agent.onNotRoutable] Agent is online, but not routable. Agent status is " + agent.getStatus().name);
    displayAgentStatus(agent.getStatus().name);
}

function handleAgentOffline(agent) {
    logInfoEvent("[agent.onOffline] Agent is offline. Agent status is " + agent.getStatus().name);
    displayAgentStatus(agent.getStatus().name);
}

function logMsgToScreen(msg) {
    // console.log("logMsgToScreen :" + msg);
    // logMsgs.innerHTML = '<div>' + new Date().toLocaleTimeString() + ' ' + msg + '</div>' + logMsgs.innerHTML;
}

function logEventToScreen(msg) {
    //console.log("logEventToScreen :" + msg);
    //  eventMsgs.innerHTML = '<div>' + new Date().toLocaleTimeString() + ' ' + msg + '</div>' + eventMsgs.innerHTML;
}

function logInfoMsg(msg) {
    connect.getLog().info(msg);
    logMsgToScreen(msg);
}

function logInfoEvent(eventMsg) {
    connect.getLog().info(eventMsg);
    logEventToScreen(eventMsg);
}

function displayAgentStatus(status) {
    console.log("displayAgentStatus :" + status);
    //agentStatusDiv.innerHTML = 'Status: <span style="font-weight: bold">' + status + '</span>';
}

function goAvailable() {
    //ClickToIvrAction("","","00071","ReqNewInteraction","","","","","");
    var routableState = window.myCPP.agent.getAgentStates().filter(function (state) {
        return state.type === connect.AgentStateType.ROUTABLE;
    })[0];
    window.myCPP.agent.setState(routableState, {
        success: function () {
            logInfoMsg("Set agent status to Available (routable) via Streams")
        },
        failure: function () {
            logInfoMsg("Failed to set agent status to Available (routable) via Streams")
        }
    });
}

function goOffline() {
    var offlineState = window.myCPP.agent.getAgentStates().filter(function (state) {
        return state.type === connect.AgentStateType.OFFLINE;
    })[0];
    window.myCPP.agent.setState(offlineState, {
        success: function () {
            logInfoMsg("Set agent status to Offline via Streams")
        },
        failure: function () {
            logInfoMsg("Failed to set agent status to Offline via Streams")
        }
    });
}

function acceptContact(event) {
    var scope = angular.element($('#ChatArea')).scope();
    scope.$applyAsync(function () {
        scope.ASWIVRChannels.disconnect = true;
        scope.ASWIVRChannels.call = false;
        scope.ASWIVRChannels.reject = false;
        scope.ASWIVRChannels.Mute = true;
        scope.ASWIVRChannels.Unmute = false;
        scope.ASWIVRChannels.Hold = true;
        scope.ASWIVRChannels.Merge = false;
        scope.ASWIVRChannels.Transfer = false;
        localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
    });
}

function rejectContact(event) {
    window.myCPP.contact.reject({
        success: function () {
            logInfoMsg("reject contact via Streams");
            var scope = angular.element($('#ChatArea')).scope();
            scope.$applyAsync(function () {
                scope.ASWIVRChannels.AgentClose = true;
                scope.ASWIVRChannels.phoneincomming = false;
                scope.ASWIVRChannels.disconnect = false;
                scope.ASWIVRChannels.call = false;
                scope.ASWIVRChannels.reject = false;
                scope.ASWIVRChannels.Mute = false;
                scope.ASWIVRChannels.Unmute = false;
                scope.ASWIVRChannels.Hold = false;
                scope.ASWIVRChannels.Merge = false;
                scope.ASWIVRChannels.Transfer = false;
                localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
                ClickToIvrAction("VOICE", "AWS", window.myCPP.contact.contactId, "REJECTED", "INBOUND", "reject contact via Streams", scope.hdsessionId, "", "");
                setTimeout(function (contactId, hdsessionId) {
                    ClickToIvrAction("VOICE", "AWS", contactId, "DISCONNECTED", "INBOUND", "", hdsessionId, "", "");
                }, 3000, window.myCPP.contact.contactId, scope.hdsessionId);
            });
            goAvailable();
        },
        failure: function () {
            logInfoMsg("Failed to reject contact via Streams");
        }
    });
    event.stopPropagation();
}

function disconnectContact(event) {
    try {
        let scope = angular.element($('#ChatArea')).scope();
        let ct10 = $.grep(scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE10"; });
        $.ajax({
            url: oAgentURL.click2CallAPI + "CallActionByAgent",
            method: 'POST',
            data: JSON.stringify({
                "action_type": "0",
                "agentid": scope.AgentPrerequisiteData.AgentId,
                "call_id": ct10[0].Value
            }),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                scope.$applyAsync(function () {
                    scope.ASWIVRChannels.AgentClose = true;
                    scope.ASWIVRChannels.phoneincomming = false;
                    scope.ASWIVRChannels.disconnect = false;
                    scope.ASWIVRChannels.call = false;
                    scope.ASWIVRChannels.reject = false;
                    scope.ASWIVRChannels.Mute = false;
                    scope.ASWIVRChannels.Unmute = false;
                    scope.ASWIVRChannels.Hold = false;
                    scope.ASWIVRChannels.Merge = false;
                    scope.ASWIVRChannels.Transfer = false;
                    localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
                });
            },
            error: function (e) {
                console.log('Agent call disconnect error', e.responseText);
            }
        })
    } catch (e) {
        console.log('Disconnecting Contact... catch error', e.responseText);
    }
    event.stopPropagation();
}

function ClickToIvrAction(CHANEL, CHANNELSOURCE, UID, EVENT, INTERACTIONTYPE, MESSAGE, SESSIONID, CUSTOMERATTRIBUTE1, CUSTOMERATTRIBUTE2) {
    try {
        var scope = angular.element($('#ChatArea')).scope();
        scope.$applyAsync(function () {
            var LoginId = "sct007";//scope.AgentPrerequisiteData.AgentLoginId;
            if (LoginId == "")
                LoginId = "sct007";

            var _URL = "";
            switch (EVENT) {
                case 'ReqNewInteraction':
                    _URL = "https://uatapp.unfyd.com/unfyd-Voice-API/api/VoiceAPI/oncallpredialaws?UID=" + UID + "&Channel=VOICE&Channelsource=aws&ProcessId=15&AgentId=" + LoginId + "&status=Closed&CUSTOMERATTRIBUTE1=" + CUSTOMERATTRIBUTE1 + "&CUSTOMERATTRIBUTE2=" + CUSTOMERATTRIBUTE2 + "&CUSTOMERATTRIBUTE3=&CUSTOMERATTRIBUTE4=&CUSTOMERATTRIBUTE5=&InterActionType=" + INTERACTIONTYPE;
                    break;
                case "DISCONNECTED":
                    _URL = "https://uatapp.unfyd.com/unfyd-Voice-API/api/VoiceAPI/OnCallCompletionaws?UID=" + UID + "&Channel=VOICE&Channelsource=aws&ProcessId=15&AgentId=" + LoginId + "&status=DISCONNECTED";
                    break;
                default:
                    _URL = "https://uatapp.unfyd.com/unfyd-Voice-API/api/VoiceAPI/onVoiceNotificationaws?UID=" + UID + "&Channel=VOICE&Channelsource=aws&ProcessId=15&AgentId=" + LoginId + "&status=" + EVENT
                // code block
            }
            console.log('_URL :', _URL);

            $.ajax({
                type: "GET",
                url: _URL,
                //data: "{CHANEL:'" + CHANEL + "' , CHANNELSOURCE:'" + CHANNELSOURCE + "' , UID:'" + UID + "' , EVENT:'" + EVENT + "' , INTERACTIONTYPE:'" + INTERACTIONTYPE + "' , MESSAGE:'" + MESSAGE + "' , SESSIONID:'" + SESSIONID + "', CUSTOMERATTRIBUTE1:'" + CUSTOMERATTRIBUTE1 + "', CUSTOMERATTRIBUTE2:'" + CUSTOMERATTRIBUTE2 + "' }",
                // contentType: "application/json; charset=utf-8",
                // dataType: "json",
                success: function (json) {
                    console.log('ClickToIvrAction() success data : ', json);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('ClickToIvrAction() error', xhr);
                }
            });

        });
    } catch (e) {
        console.log('ClickToIvrAction() catch error');
    }
}

function funWrapDisposeVoice(data) {
    try {

        var _data = JSON.parse(data);
        if (_data[0].CHANNELID == "VOICE" && _data[0].CHANNELSOURCE == "aws") {
            VoiveAgentAvailable();
            //EndChatEventToSAP(window.myCPP.contact.contactId, 'CALL', 'UPDATEACTIVITY', 'END',
            //    $scope.smartTALKCustomerDetailsList[3].Value, strTranscript, $scope.smartTALKCustomerDetailsList[2].Value, $scope.hdCHANNELID);
        }
    }
    catch (e) { }
}

function funAgentDisposeVoice(CHANNELID, CHANNELSOURCE, PhoneNo) {
    if (CHANNELID == "VOICE" && CHANNELSOURCE == "aws")
        VoiveAgentAvailable();
}

function VoiveAgentAvailable() {
    var scope = angular.element($('#ChatArea')).scope();
    scope.$applyAsync(function () {
        scope.ASWIVRChannels =
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
        localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
        goAvailable();
    });
}

function voiceTransfer(confNumber = null) {
    let scope = angular.element($('#ChatArea')).scope();
    let ct10 = $.grep(scope.smartTALKCustomerDetailsList, function (v) { return v.Key === "CUSTOMERATTRIBUTE10"; });
    $.ajax({
        url: oAgentURL.click2CallAPI + "CallActionByAgent",
        method: 'POST',
        data: JSON.stringify({
            "action_type": "4",
            "sessionid": scope.hdsessionId,
            "agentid": scope.AgentPrerequisiteData.AgentId,
            "call_id": ct10[0].Value,
            "conferernce_number": "",
            "is_conferernce_Internal": "false"
        }),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            scope.$applyAsync(function () {
                scope.ASWIVRChannels.AgentClose = true;
                scope.ASWIVRChannels.phoneincomming = false;
                scope.ASWIVRChannels.disconnect = false;
                scope.ASWIVRChannels.call = false;
                scope.ASWIVRChannels.reject = false;
                scope.ASWIVRChannels.Mute = false;
                scope.ASWIVRChannels.Unmute = false;
                scope.ASWIVRChannels.Hold = false;
                scope.ASWIVRChannels.Merge = false;
                scope.ASWIVRChannels.Transfer = false;
                localStorage.setItem('agentASWIVRChannels', JSON.stringify(scope.ASWIVRChannels));
            });
        },
        error: function (e) {
            console.log('Agent call disconnect error', e.responseText);
        }
    })
}