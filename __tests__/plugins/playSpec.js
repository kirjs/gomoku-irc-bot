jest.dontMock('../../lib/plugins/play');
var Play = require('../../lib/plugins/play');

describe('Play state', function () {
    beforeEach(function () {
        this.playHandler = new Play();
    });

    it('Allows to change the state manually', function () {
        expect(this.playHandler.$default('h2')).toBe('position');
    });


});

