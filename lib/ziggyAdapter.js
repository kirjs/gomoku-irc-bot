var states = {
    play: require('./plugins/play'),
    register: require('./plugins/register')
};


module.exports = function (ziggy) {
    var handler = new MessageHandler(states, 'play');
    ziggy.on('message', function (user, channel, text) {
        var args = text.split(' ');
        var action = args.shift();
        var response = handler.handleMessage(action, args, user);
        if (response !== void 0) {
            ziggy.say('response');
        }
        handler.handleState(action, args, user);
    })
};

