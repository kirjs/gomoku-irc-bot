jest.dontMock('../lib/messageHandler');
var MessageHandler = require('../lib/messageHandler');

describe('messageHandler', function () {
    beforeEach(function () {
        this.bWasReset = false;
        var states = {
            a: {
                test: function ( a ) {
                    return a;
                },
                next$state: function () {
                    return 'b';
                },
                $default: function ( action ) {
                    return 'default: ' + action;
                }
            },
            b: {
                $reset: function () {
                    this.bWasReset = true;
                }.bind(this),
                test: function (a, b) {
                    return b;
                }
            }
        };
        this.handler = new MessageHandler(states, 'a');
    });
    describe('Action handler', function () {
        it('Runs default action if the named one does not exist', function () {
            expect(this.handler.handleMessage('somithing')).toBe('default: somithing');
        });
        it('Does nothing when an action does not exist', function () {
            this.handler.setState('b');
            expect(this.handler.handleMessage('somithing')).toBe(undefined);
        });

        it('Returns the value for existing action', function () {
            expect(this.handler.handleMessage('test', 'a')).toBe('a');
        });

        it('Strips "$" from the action name ', function () {
            expect(this.handler.handleMessage('$test', 1)).toBe(1);
            expect(this.handler.handleMessage('test$', 1)).toBe(1);
            expect(this.handler.handleMessage('$t$e$s$t$', 2)).toBe(2);
        });
        it('Does not change the state after handling the message', function () {
            expect(this.handler.handleMessage('test', 1)).toBe(1);
            expect(this.handler.handleMessage('test', 1)).toBe(1);
        });
    });

    describe('State changer', function () {

        it('Allows to change the state manually', function () {
            this.handler.setState('b');
            expect(this.handler.handleMessage('test',1, 2)).toBe(2);
        });

        it('Resets the state when switching to it', function () {
            expect(this.bWasReset).toBe(false);
            this.handler.setState('b');
            expect(this.bWasReset).toBe(true);
        });

        it('Allows to change the state as with a handler', function () {
            this.handler.handleState('next');
            expect(this.handler.handleMessage('test', 1, 2)).toBe(2);
        });
        it('Does nothing when setting current state again', function () {
            this.handler.setState('a');
            expect(this.handler.handleMessage('test', 1)).toBe(1);
        });
        it('Handles different states in different directions', function () {
            this.handler.setState('a');
            this.handler.setState('b');
            this.handler.setState('a');
            this.handler.setState('b');
            this.handler.setState('b');
            expect(this.handler.handleMessage('test', 1, 2)).toBe(2);


        });


    });


});
