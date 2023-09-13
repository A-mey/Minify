$(function () {
    var fileUploadID = '1';

    var intrAttachmentFiles = new FormData();
    //stores copy of uploaded file names.
    var fileNamesArray = [];
    //Hold the status against each file uploaded or not.
    var arrFileUploadStatus = [];
    //Hold file information as object against unique key.
    var dataintr = {};
    var j = 1;
    //Hold files which are already uploaded post ajax call.
    var UploadedFiles = [];

    $("#fileUploadIntr1").change(function (e) {
        ChangeUpload();
    });

    function UploadAttachment() {
        var i = 0;

        for (var key in dataintr) {
            var _attachInfo = dataintr[key];
            var status = $.grep(arrFileUploadStatus, function (v) { return v.UploadAttachKey == key; })[0].UploadAttachStatus;

            if (_attachInfo && !status) {
                i++;

                intrAttachmentFiles = new FormData();
                intrAttachmentFiles.append(key, dataintr[key]);
                intrAttachmentFiles.append("sessionId", $('#hdnAgentSessionId').val());
                intrAttachmentFiles.append("save", "Interactions");
                intrAttachmentFiles.append("CESessionId", angular.element($('#ChatArea')).scope().hdsessionId);
                intrAttachmentFiles.append("AttachFileKey", key);
                intrAttachmentFiles.append("attachment", arrFileUploadStatus.filedes);

                if (i >= 1) {
                    $.ajax({
                        type: "POST",
                        url: "EmailFileUploadHandler.ashx",
                        contentType: false,
                        processData: false,
                        data: intrAttachmentFiles,
                        success: function (resdata) {
                            i = 0;
                            var respData = JSON.parse(resdata);
                            if (respData.Result == "Success") {
                                var _response = JSON.parse(respData.data);

                                var d = '';
                                $.when(uploadToConverter(_response.base64String, $('#hdnAgentSessionId').val())).done(function (d) {
                                _response.URL = d;
                                    // .then((data) => {
                                    // if (data) {
                                    // _response.URL = data;
                                    // }
                                    // })
                                    var _idx = arrFileUploadStatus.findIndex((oData => oData.UploadAttachKey == _response.AttachFileKey));
                                    arrFileUploadStatus[_idx].UploadAttachStatus = true;
                                    _response.oBlobURL = arrFileUploadStatus[_idx].oBlobURL;
                                    _response.oFormattedFileSize = arrFileUploadStatus[_idx].oFormattedFileSize;

                                    UploadedFiles.push(_response);

                                    var arrUniqueUplodedFiles = [];
                                    for (var entry of UploadedFiles) {
                                        if (!isDuplicate(entry, arrUniqueUplodedFiles)) {
                                            arrUniqueUplodedFiles.push(entry)
                                        }
                                    }

                                    var scope = angular.element($('#ChatArea')).scope();
                                    scope.UploadEmailAttachments = [];
                                    if (scope.EmailReplyIP.MailScreenAction == 'Forward') {

                                        try {
                                            if (isDuplicateAttachmentOnForward(entry, scope.UploadEmailAttachmentsForForward) == 0) {
                                                scope.UploadEmailAttachmentsForForward.push(_response);
                                                scope.UploadEmailAttachments = scope.UploadEmailAttachmentsForForward;
                                            }
                                            else {
                                                angular.element($('#ChatArea')).scope().smartTALKNotificationError('A file with the same name has already been attached.');
                                                scope.UploadEmailAttachments = scope.UploadEmailAttachmentsForForward;
                                            }
                                        }
                                        catch (e) { }

                                    }
                                    else {
                                        scope.UploadEmailAttachments = arrUniqueUplodedFiles;
                                        console.log('UploadedFiles', scope.UploadEmailAttachments);
                                    }


                                    angular.element($('#ChatArea')).scope().smartTALKNotificationSuccess('File attached successfully.');
                                })

                                
                            } else {
                                angular.element($('#ChatArea')).scope().smartTALKNotificationError('Fail to attach file.');
                            }
                        },
                        error: function () {
                            angular.element($('#ChatArea')).scope().smartTALKNotificationError('Exception occurred while attaching the file, please try again.');
                        }
                    });
                } else {
                    angular.element($('#ChatArea')).scope().smartTALKNotificationError('Please select files to attach.');
                }
            }
        }
    }

    function uploadToConverter(base64URL, sessionID) {
        var file = arrFileUploadStatus[0].fileName;
        fileName = file.substring(0, file.lastIndexOf("."));
		fileName = sessionID + "1_" + fileName;
        Fileextn = file.substring(file.lastIndexOf(".")+1, file.length);
        var fileUploadResult = JSON.stringify({ "URL": base64URL, "FileName": fileName, "Fileextn": Fileextn, "SessionID": sessionID });
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: oAgentURL.EmailAttachmentBase64,
                data: fileUploadResult,
                crossDomain: true,
                async: false,
                contentType: "application/json;",
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

    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0)
            return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    };

    function ChangeUpload() {
        var arrTypes = ['.txt', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.jpeg', '.jpg', '.png', '.gif'];
        var file = document.getElementById("fileUploadIntr1");

        for (i = 0; i < file.files.length; i++) {
            var filedes = file.files[i];
            var filetype = filedes.name;
            var filenametype = [];
            var filetypematch = false;
            var IsSameFile = false;
            var orignalFileSize = filedes.size;
            var readableFileSize = bytesToSize(orignalFileSize);

            filenametype = filetype.split(/\.(?=[^\.]+$)/);  // separates filename and extension based on last dot.            
            var img = filenametype[0];
            var fileimgtype = filenametype[1];
            var fileAttachmentSize = filedes.size;

            if (arrTypes.indexOf("." + fileimgtype.toLowerCase()) > -1 && fileimgtype.toLowerCase() != 'zip') {
                filetypematch = true;
            } else if (filetypematch == false) {
                angular.element($('#ChatArea')).scope().smartTALKNotificationError('Incorrect file type detected. Please attach only the allowed extensions.');
            }

            if (filetypematch) {
                var _ceSessionID = angular.element($('#ChatArea')).scope().hdsessionId;

                //creates a unique file name.
                var _fileNameKey = 'tblfileDesIntr' + fileUploadID + '_' + filedes.name + '_' + _ceSessionID;

                var filename = _fileNameKey;
                if (fileNamesArray.indexOf(filename) == -1) // filename does not exist.
                {
                    var _attachKey = "Attachment" + "|" + fileUploadID + "|" + j + "|" + _ceSessionID;

                    dataintr[_attachKey] = filedes;
                    var oBlobURL = URL.createObjectURL(filedes);

                    var _data = '';

                    // $.when(getBase64(filedes)).done(function(d) {
                    // console.log(d);
                    // var _data = d.substring(d.indexOf('base64,')+7, d.length);
                    // });

                    // var _data = getBase64(filedes);

                    fileNamesArray.push(_fileNameKey);

                    arrFileUploadStatus.push({ 'UploadAttachKey': _attachKey, 'UploadAttachStatus': false, 'oBlobURL': oBlobURL, 'oFormattedFileSize': readableFileSize, 'fileName': filetype, 'Fileextn': fileimgtype, 'filedes': filedes, 'base64URL': _data });

                    j++;
                } else {
                    IsSameFile = true;
                    angular.element($('#ChatArea')).scope().smartTALKNotificationError('A file with the same name has already been attached.');
                }
            }
        }

        if (filetypematch && !IsSameFile) {
            UploadAttachment();
        }
        $('#fileUploadIntr1').val('');
    }

    function isDuplicate(entry, arr) {
        return arr.some(x => (entry.AttachSaveName == x.AttachSaveName) && (entry.CESessionId == x.CESessionId))
    }

    function isDuplicateAttachmentOnForward(entry, arry) {
        return $.grep(arry, function (obj) { return obj.AttachSaveName === entry.AttachSaveName; });
    }

    // async function getBase64(file) {
    // return new Promise((resolve, reject) => {
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    // resolve(reader.result);
    // console.log(reader.result);
    // }
    // // setTimeout(function loader() {
    // // },5000);

    // // arrFileUploadStatus.push({ 'UploadAttachKey': _attachKey, 'UploadAttachStatus': false, 'oBlobURL': oBlobURL, 'oFormattedFileSize': readableFileSize, 'fileName': filetype, 'Fileextn': fileimgtype, 'base64URL': _data});

    // reader.onerror = error => {reject(error); console.log('rejected');}
    // }
    // )
    // // var reader = new FileReader();
    // // reader.readAsDataURL(file);
    // // reader.onload = async function (e) {
    // // res = await reader.result;
    // // console.log(res);
    // // // arrFileUploadStatus.push({ 'UploadAttachKey': _attachKey, 'UploadAttachStatus': false, 'oBlobURL': oBlobURL, 'oFormattedFileSize': readableFileSize, 'fileName': filetype, 'Fileextn': fileimgtype, 'base64URL': res});
    // // };
    // // reader.onerror = function (error) {
    // // console.log('Error: ', error);
    // // };
    // }

    const bcChannel = new BroadcastChannel('email_delete_attachment');
    bcChannel.onmessage = function (e) {
        if (e.data.type == 'delete') {
            var _fileNameFilter = 'tblfileDesIntr' + fileUploadID + '_' + e.data.oAttachmentInfo.FileName + '_' + e.data.oAttachmentInfo.CESessionId;
            fileNamesArray = fileNamesArray.filter(function (e) { return e !== _fileNameFilter });
            for (var key in dataintr) {
                if (key == e.data.oAttachmentInfo.AttachFileKey) {
                    delete dataintr[key];
                }
            }
            arrFileUploadStatus = removeArrayElementByAttr(arrFileUploadStatus, 'UploadAttachKey', e.data.oAttachmentInfo.AttachFileKey);
            UploadedFiles = removeArrayElementByAttr(UploadedFiles, 'AttachFileKey', e.data.oAttachmentInfo.AttachFileKey);
        }
        else {
            var arrData = e.data.arrDisposedEmailAttachments;
            arrData.forEach(function (item, index) {
                var _fileNameFilter = 'tblfileDesIntr' + fileUploadID + '_' + item.FileName + '_' + item.CESessionId;
                fileNamesArray = fileNamesArray.filter(function (e) { return e !== _fileNameFilter });

                for (var key in dataintr) {
                    if (key == item.AttachFileKey) {
                        delete dataintr[key];
                    }
                }
                arrFileUploadStatus = removeArrayElementByAttr(arrFileUploadStatus, 'UploadAttachKey', item.AttachFileKey);
                UploadedFiles = removeArrayElementByAttr(UploadedFiles, 'AttachFileKey', item.AttachFileKey);
            });
        }
    };
});