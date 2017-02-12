'use strict';

import Crawler from './crawler'

let crawler = new Crawler();
crawler.initTagsRelated('https://medium.com/tag/javascript', 'Javascript');
console.log(JSON.stringify(crawler));