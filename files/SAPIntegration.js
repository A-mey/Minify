
//Added By Priyanka

function NotifyAcceptInviteToSAP(strSessionId, strType, strEventType, strAction, strEmail, strInteractionType, PhoneNumber, strChannel) {

    try {
        

        var strSessionIdTemp = strSessionId.replace(/\|/g, '').replace(/\-/g, '');
        var SessionIDNew = strSessionIdTemp.substr(strSessionIdTemp.length - 20);
        var Channel = strChannel;
        var oPayload = null;

        if (Channel.toUpperCase() == 'VOICE') {
            strType = "CALL";

            oPayload = {
                payload: {
                    Type: strType, EventType: strEventType,
                    Action: strAction,
                    ExternalReferenceID: SessionIDNew,
                    ANI: PhoneNumber
                }
            };
        }
        else {
            if (Channel.toUpperCase() == 'EMAIL') {

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
                        Email: '',
                        ExternalReferenceID: SessionIDNew,
                        ANI: PhoneNumber
                    }
                };
            }

        }

        var sPayload = null;

        sPayload = JSON.stringify(oPayload);

        console.log('Notify Event payload : ' + sPayload);
        window.parent.postMessage(oPayload, "*");
        // window.postMessage(oPayload, "*");

        if (Channel.toUpperCase() != 'VOICE') {

            if (Channel.toUpperCase() == 'EMAIL') {
                oPayload = {
                    payload: {
                        Type: strType, EventType: strEventType,
                        Action: 'ACCEPT',
                        Email: strEmail,
                        ExternalReferenceID: SessionIDNew
                    }
                };
            }
            else {

                oPayload = {
                    payload: {
                        Type: strType, EventType: strEventType,
                        Action: 'ACCEPT',
                        Email: '',
                        ExternalReferenceID: SessionIDNew,
                        ANI: PhoneNumber
                    }
                };

            }
            sPayload = JSON.stringify(oPayload);

            console.log('Accept Event payload : ' + sPayload);
            // window.parent.postMessage(oPayload, "*");
            setTimeout(function (a) {
                
                window.parent.postMessage(a, "*");
            }, 5000, oPayload);

        }
    } catch (e) {
        alert(e.message);
    }


    if (strInteractionType == 'OUTBOUND') {
        //setTimeout(function () { FocusOnInteraction(strSessionId, null); }, 1000);        
    }
}