var gomoku = require('gomoku-tools');

var Game = function () {
    this.game = new gomoku.Gomoku();
    this.$reset();
};

var rMove = /^[a-p]\d\d?$/;

Game.prototype = {
    $reset: function () {
        this.game.reset();
    },

    $default: function (move) {
        if (rMove.test(move)) {
            if (this.game.has(move)) {
                return 'Duplicate move';
            } else {
                return this.game.moveTo(move).ascii();
            }
        }
        return 'position';
    }

};
module.exports = Game;
