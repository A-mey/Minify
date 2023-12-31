﻿var CheckPasswordPolicyStatus = false;
var oAgentPasswordPolicy = {};
var oldpawd = '';

function createCookie(name, value, days) {
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
    try {
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


function _hideErrorDiv() {
    $("#ErrorDivPopup").hide();
    $("#ErrorDivPopup").html("");
}
function _showErrorDiv(msg) {
    $("#ErrorDivPopup").show();
    $("#ErrorDivPopup").html(msg);
}
function getPasswordPolicy(pawd) {
    try {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/GetPasswordPolicy",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {

                oAgentPasswordPolicy = JSON.parse(data.d);

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log('getPasswordPolicy() for login error', xhr);
            }
        });
    }
    catch (e) { }
    finally {
        $("#txtoldPassword").val(sessionStorage.getItem("defaultpawd"));
        //sessionStorage.removeItem("defaultpawd");
    }
}
$(window).on('load', function () {
    $("#txtoldPassword").blur(function myfunction() {
        if ($(this).val() != "") {
            CheckoldPassword();
        }
    });
    $("#txtnewpassword").blur(function myfunction() {
        if (CheckPasswordPolicy()) {
            Machpassword();
        }
    });
    $("#txtnewConpassword").blur(function myfunction() {
        if (Checkoldnewpassword()) {
            Machpassword();
        }
    });
    //have prevented password updation while user pressing enter.
    $(document).on("keypress", "#txtnewConpassword", function (e) {
        if (e.which == 13) {
            if (Checkoldnewpassword()) {
                Machpassword();
            }
            e.preventDefault();
        }
    });
});
function openDilog(pawd) {
    $("#txtoldPassword").val(pawd);
    $("#ClickChangePassword").click();
    getPasswordPolicy(pawd);
    sessionStorage.setItem("defaultpawd", pawd);
}
function CheckoldPassword() {
    $.ajax({
        type: "POST",
        url: "SmartAgent.aspx/CheckoldPassword",
        data: '{username: "' + $("#hidAgentid").val() + '" ,Password: "' + $("#txtnewConpassword").val() + '" ,OldPassword: "' + $("#txtoldPassword").val() + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != "") {
                _showErrorDiv(data.d); //password you entered don't match.
            } else {
                _hideErrorDiv();
            }
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            _showErrorDiv(r.Message);
        }
    });
}
function ChengeOldPassword() {
    $("#LoginAlready").modal('hide');
    var IsMatchPasswordValid = false;
    var IsPasswordPolicyValid = false;
    if (sessionStorage.getItem("defaultpawd") != null) {
        $("#txtoldPassword").val(sessionStorage.getItem("defaultpawd"));
        sessionStorage.removeItem("defaultpawd");
    }
    if (Machpassword()) {
        IsMatchPasswordValid = true;
    } else {
        return false;
    }
    if (CheckPasswordPolicyStatus == false) {
        CheckPasswordPolicy();
    }
    if (CheckPasswordPolicyStatus == true && IsMatchPasswordValid == true) {
        $.ajax({
            type: "POST",
            url: "SmartAgent.aspx/ChengePassword",
            data: '{username: "' + $("#hidAgentid").val() + '" ,Password: "' + $("#txtnewConpassword").val() + '" ,OldPassword: "' + $("#txtoldPassword").val() + '" ,type: "' + $("#hidType").val() + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("#txtnewConpassword").val('');
                $("#txtnewpassword").val('');
                $("#txtoldPassword").val('');
                if (data.d != "") {
                    if (data.d === "true") {
                        //when status is true : Password updated successfully, please login again.
                        $("#ChangePassword").modal('hide');
                        $("#LoginAlready").modal('hide');
                        //console.log('password updated .. pop up hidden');
                        $("#Errormsg").css({
                            'color': 'green',
                            'display': 'block'
                        });
                        $("#Errormsg").html(oAgentPasswordPolicy.PasswordUpdateOkMsg);
                    } else {
                        $("#LoginAlready").modal('hide');
                        _showErrorDiv(data.d); //password you entered don't match.
                    }
                } else {
                    $("#EmrrorDivPopup").hide();
                    $("#ErrorDivPopup").html("");
                }
            },
            failure: function (response) {
                $("#LoginAlready").modal('hide');
                var r = jQuery.parseJSON(response.responseText);
                _showErrorDiv(r.Message);
            }
        });
    } else {
        $("#LoginAlready").modal('hide');
        console.log('ChengeOldPassword failed');
    }
}
function UpdatePasswordAgent() {
    if (Checkoldnewpassword()) {
        if ($("#txtoldPassword").val() == "") {
            _showErrorDiv(oAgentPasswordPolicy.OldPasswordRequiredMsg);
        } else if ($("#txtnewpassword").val() != "" && $("#txtnewConpassword").val() != "") {
            if (Machpassword()) {
                ChengeOldPassword();
            }
        } else {
            if ($("#txtnewpassword").val() == "" && $("#txtnewConpassword").val() == "") {
                _showErrorDiv(oAgentPasswordPolicy.ConfirmAndNewPasswordRequiredMsg);
            } else if ($("#txtnewpassword").val() == "") {
                _showErrorDiv(oAgentPasswordPolicy.NewPasswordRequiredMsg)
            } else if ($("#txtnewConpassword").val() == "") {
                _showErrorDiv(oAgentPasswordPolicy.ConfirmPasswordRequiredMsg);
            }
        }
    }
}
function Checkoldnewpassword() {

    if ($("#txtoldPassword").val() != "" && $("#txtnewpassword").val() != "") {
        if ($("#txtoldPassword").val() == $("#txtnewpassword").val()) {
            _showErrorDiv(oAgentPasswordPolicy.NewAndOldPasswordMatchMsg)
            return false;
        } else {
            _hideErrorDiv();
            return true;
        }
    } else {
        return false;
    }
}
function Machpassword() {
    if ($("#txtnewpassword").val() != "" && $("#txtnewConpassword").val() != "") {
        if ($("#txtnewpassword").val() == $("#txtnewConpassword").val()) {
            _hideErrorDiv();
            return true;
        } else {
            _showErrorDiv(oAgentPasswordPolicy.ConfirmPasswordMismatchMsg)
            return false;
        }
    }
    return false;
}
function CheckPasswordPolicy() {
    $.ajax({
        type: "POST",
        url: "SmartAgent.aspx/validPassword",
        data: '{username: "' + $("#hidAgentid").val() + '" ,Password: "' + $("#txtnewpassword").val() + '" ,OldPassword: "' + $("#txtoldPassword").val() + '" ,type: "' + $("#hidType").val() + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d != "") {
                _showErrorDiv(data.d); //password you entered don't match.
                CheckPasswordPolicyStatus = false;
            } else if (data.d === "") {
                _hideErrorDiv();
                CheckPasswordPolicyStatus = true;
            }
        },
        failure: function (response) {
            var r = jQuery.parseJSON(response.responseText);
            _showErrorDiv(r.Message);
            CheckPasswordPolicyStatus = false;
        }
    });
}
function PassChangeErrormsg(val) {
    _showErrorDiv(val);
}


$(document).ready(function () {

    if (sessionStorage.getItem("defaultpawd") != null) {
        $("#txtoldPassword").val(sessionStorage.getItem("defaultpawd"));
        //sessionStorage.removeItem("defaultpawd");
    }
});