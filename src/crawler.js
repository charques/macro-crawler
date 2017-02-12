/**
 * Created by cfhernandez on 12/2/17.
 */
'use strict';

import Horseman from 'node-horseman';


class Crawler {

    constructor() {
    }

    //********************
    // init
    //********************

    initTagsRelated(url, title) {
        this._linkIndex = 0;
        this.links = [{title: title, url: url}];

        this._getTagsRelated(this.links[0]);
    }

    _getTagsRelated(link) {
        if(!link) {return;}

        let that = this;
        let horseman = new Horseman();

        let _scrape = function() {

            let _getLinks = function() {
                return horseman.evaluate( function(){
                    // This code is executed in the browser.
                    let links = [];
                    $("div.tags a").each(function( item ){
                        let link = {
                            title : $(this).text(),
                            url : $(this).attr("href")
                        };
                        links.push(link);
                    });
                    return links;
                });
            };

            return new Promise( function( resolve, reject ){
                return _getLinks()
                    .then(function(newLinks){
                        resolve(newLinks);
                    });
            });
        };

        let _concatArraysUniqueWithSort = function (thisArray, otherArray) {
            let newArray = thisArray.concat(otherArray).sort(function (a, b) {
                return a > b ? 1 : a < b ? -1 : 0;
            });

            return newArray.filter(function (item, index) {
                return newArray.indexOf(item) === index;
            });
        };

        console.log('scraping... ' + link.url);
        horseman
            .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
            .open(link.url)
            .waitForSelector('div.tags')
            .then( _scrape )
            .then(function(newLinks) {
                that.links = _concatArraysUniqueWithSort(that.links, newLinks);
                console.log(JSON.stringify(that.links));
            })
            .finally(function(){
                console.log('scraping finish');
                horseman.close();

                if(that.links.length < 20) {
                    that._linkIndex++;
                    console.log('CONTINUE ' + JSON.stringify(that.links[that._linkIndex]));
                    that._getTagsRelated(that.links[that._linkIndex]);
                }
                else {
                    console.log('EXIT');
                }
            });
    }

    //********************
    // Links
    //********************

    get links() {
        return this._links;
    }

    set links(value) {
        if (typeof value !== 'object') {
            throw new Error('"links" must be a object.');
        }

        this._links = value;
    }
}

module.exports = Crawler;