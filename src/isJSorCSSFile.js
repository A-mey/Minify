function processFileType(file, options) {
    let modifiedJS = /.*\..*\.js$/g;
    let modifiedCSS = /.*\..*\.css$/g
    let returnVal = {
        "proceed": false,
        "type": "",
        "name": ""
    }
    
    let fileName = file.split('.');
    fileName = fileName.slice(0, fileName.length - 1);
    fileName = fileName.join('.');
    let type = file.split('.').pop();

    if (options.file) {
        if (file != options.file) {
            returnVal.proceed = false;
            return returnVal;
        }
    }

    if (type == 'css' && options.type == 'css'){
        returnVal.type = 'css'
        returnVal.proceed = modifiedCSS.test(file) ? false : true;

    }
    else if (type == 'js' && options.type == 'js') {
        returnVal.type = 'js'
        returnVal.proceed = modifiedJS.test(file) ? false : true;
    }
    else if (type == 'css'){
        returnVal.type = 'css'
        returnVal.proceed = modifiedCSS.test(file) ? false : true;
    }
    else if (type == 'js') {
        returnVal.type = 'js'
        returnVal.proceed = modifiedJS.test(file) ? false : true;
    }
    else {
        returnVal.type = 'illegal'
        returnVal.proceed = false;
    }
    returnVal.fullName = fileName;
    returnVal.name = file;
    return returnVal;
}

module.exports = {processFileType};