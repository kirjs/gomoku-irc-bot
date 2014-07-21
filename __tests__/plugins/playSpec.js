jest.dontMock('../../lib/plugins/play');
jest.dontMock('gomoku-tools');
var Play = require('../../lib/plugins/play');

describe('Play state', function () {
    beforeEach(function () {
        this.playHandler = new Play();
    });

    it('Allows to change the state manually', function () {

        var pos =
          '     A  B  C  D  E  F  G  H  I  J  K  L  M  N  O \n'
        + ' 15                                              \n'
        + ' 14                                              \n'
        + ' 13                                              \n'
        + ' 12                                              \n'
        + ' 11                                              \n'
        + ' 10                                              \n'
        + ' 9                                               \n'
        + ' 8                                               \n'
        + ' 7                                               \n'
        + ' 6                                               \n'
        + ' 5                                               \n'
        + ' 4                                               \n'
        + ' 3                                               \n'
        + ' 2                        x                      \n'
        + ' 1                                               \n';
        expect(this.playHandler.$default('h2')).toBe(pos );
    });


});

