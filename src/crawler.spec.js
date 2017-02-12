/**
 * Created by cfhernandez on 12/2/17.
 */

import Crawler from '../src/crawler';

describe('Crawler', () => {

    describe('url', () => {

        let crawler;

        beforeEach(() => {
            crawler = new Crawler('https://github.com/');
        });

        it('should return the url of https://github.com/', () => {
            crawler.url.should.equal('https://github.com/');
        });

        it('should overwrite the url value and return https://gitlab.com/', () => {
            crawler.url = 'https://gitlab.com';
            crawler.url.should.equal('https://gitlab.com');
        });

    });
});