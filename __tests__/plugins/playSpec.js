jest.dontMock('../../lib/play');
var play = require('../../lib/play');

describe('Play state', function () {
    beforeEach(function () {
        var states = {
            a: {
                test: function () {
                    return 1;
                },
                next$state: function () {
                    return 'b';
                }
            },
            b: {
                test: function () {
                    return 2;
                }
            }
        };
        this.handler = new MessageHandler(states, 'a');
    });
    describe('Action handler', function () {
        it('Does nothing when an action does not exist', function () {
            expect(this.handler.handleMessage('somithing')).toBe(undefined);
        });

        it('Returns the value for existing action', function () {
            expect(this.handler.handleMessage('test')).toBe(1);
        });
        it('Does not change the state after handling the message', function () {
            expect(this.handler.handleMessage('test')).toBe(1);
            expect(this.handler.handleMessage('test')).toBe(1);
        });
    });

    describe('State changer', function () {

        it('Allows to change the state manually', function () {
            this.handler.setState('b');
            expect(this.handler.handleMessage('test')).toBe(2);
        });

        it('Allows to change the state as with a handler', function () {
            this.handler.handleState('next');
            expect(this.handler.handleMessage('test')).toBe(2);
        });
        it('Does nothing when setting current state again', function () {
            this.handler.setState('a');
            expect(this.handler.handleMessage('test')).toBe(1);
        });
        it('Handles different states in different directions', function () {
            this.handler.setState('a');
            this.handler.setState('b');
            this.handler.setState('a');
            this.handler.setState('b');
            this.handler.setState('b');
            expect(this.handler.handleMessage('test')).toBe(2);


        });


    });


});

