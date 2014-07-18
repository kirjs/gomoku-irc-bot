function MessageHandler(states, state) {
    this.states = states;
    this.setState(state);
}

MessageHandler.prototype = {
    setState: function (state) {
        if (this.states[state] === void 0) {
            throw new Error('Unknown state');
        }
        this.activeState = this.states[state];

    },
    handleMessage: function (action, args, user) {
        if (typeof this.activeState[action] === 'function') {
            return this.activeState[action](user, args);
        } else if (typeof this.activeState.$default === 'function') {
            return this.activeState.$default(user, args);
        }
    },
    handleState: function (action, args, user) {
        if (typeof this.activeState[action + '$state'] === 'function') {
            var state = this.activeState[action + '$state'](args, user);
            if (state !== undefined) {
                this.setState(state);
            }
        }
    }
};

module.exports = MessageHandler;
