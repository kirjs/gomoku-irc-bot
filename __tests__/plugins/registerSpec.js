jest.dontMock('../../lib/plugins/register');
var register = require('../../lib/plugins/register');

describe('register state', function () {
    beforeEach(function () {
        this.registerHandler = new register();
    });

    it('Allows to register a player', function () {
        expect(this.registerHandler.play('mememe')).toContain('mememe');
    });
    it('Allows to register more then one player', function () {
        expect(this.registerHandler.play('bebe')).toContain('bebe');
        expect(this.registerHandler.play('mememe')).toContain('mememe');
    });

    it('Starts the game when both players register', function () {
        expect(this.registerHandler.play('bebe')).toContain('bebe');
        expect(this.registerHandler.play$state()).toBeUndefined();
        expect(this.registerHandler.play('mememe')).toContain('mememe');
        expect(this.registerHandler.play$state()).toBe('play');
    });


});

