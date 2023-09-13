function createCookie(name, value, days)
{
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else
        var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
    //console.log('Cookie Created by agent',name);
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    //console.log('cookie deleted by Agent', name);
}
function Checkopen() {
    try
    {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/Checkopen",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (json) { }
        });
    } catch (e) { }
}
function CheckClosed() {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/CheckClosed",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (json) { }
        });
    } catch (e) { }
}