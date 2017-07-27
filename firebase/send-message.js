var request = require('request');
var path = require('path');
var config = require(path.join(__dirname, 'config', 'config.json'))[process.env.NODE_ENV];

module.exports.sendMessageFireBase = function (message) {
    var options = {
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
            'Authorization': 'key=' + config.keyAuthorFireBase
        },
        json: message
    };
    request.post(options, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('ERROR - FIREBASE POST failed:', err);
        } else {
            body = JSON.stringify(body);
            if (body.success == 0) {
                console.log("error response : " + body);
            } else {
                console.log("success response : " + body);
            }
        }
    });
}