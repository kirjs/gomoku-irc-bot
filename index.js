var Ziggy = require('ziggy').Ziggy;
var dumbPlugin = require('./lib/plugins/gomoku-game.js');

var ziggy = new Ziggy({
    server: 'irc.freenode.org',
    nickname: 'gomoku-bot',
    plugins: [{name: 'gomoku-game', setup: dumbPlugin}],
    channels: ['#gomoku']
});
ziggy.start();
