var MessageHandler = require('./messageHandler');
var Play =  require('./plugins/play');
var Register = require('./plugins/register');

var states = {
    play: new Play(),
    register: new Register()
};


module.exports = function (ziggy) {
    var handler = new MessageHandler(states, 'register');
    ziggy.on('message', function (user, channel, text) {
        var args = text.split(' ');
        var action = args.shift();
        var response = handler.handleMessage(action, args, user);
        if (response !== void 0) {
            ziggy.say(channel,response);
        }
        handler.handleState(action, args, user);
    });
};

