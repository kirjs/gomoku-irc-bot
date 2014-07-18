var Register = function (state) {

    var players = [];
};

Register.prototype = {
    play: function (user) {
        this.players.push(user);
        return 'User ' + user + ' has registered for the game';
    },
    play$state: function () {
        if (this.players.length === 2) {
            return 'state';
        }
    }


};
module.exports = Register;
