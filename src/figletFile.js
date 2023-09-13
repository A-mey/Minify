var figlet = require('figlet');

function _figlet(x){
    figlet(x, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
}

module.exports = {_figlet}