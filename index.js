'use strict';

var _ = require('lodash');
var shorturl = require('shorturl');

/**
 * Generic GitHub plugin for UniBot
 *
 * @param  {Object} options Plugin options object, description below.
 *   db: {mongoose} the mongodb connection
 *   bot: {irc} the irc bot
 *   web: {connect} a connect + connect-rest webserver
 *   config: {object} UniBot configuration
 *
 * @return  {Function}  Init function to access shared resources
 */
module.exports = function init(options) {
    return function plugin(channel) {
        var links = [
            'http://www.riemurasia.net/video/Perjantai-video/156351',
            'http://www.riemurasia.net/kuva/Perjantai/153418',
            'http://www.riemurasia.net/kuva/Perjantai-jooga/149481',
            'http://koti.kapsi.fi/airair/arvaa/index.html',
            'http://party.toimii.fi/?autostart=true'
        ];

        return {
            "^!perjantai$": function onMatch(from, matches) {
                // Oh noes not friday
                if (new Date().getDay() === 5) {
                    shorturl(links[Math.floor(Math.random() * links.length)], function(shorturl) {
                        var message = 'Jihaa kannat kattoon, nyt on PERJANTAI!!11! - ' + shorturl;

                        channel.say(message);
                    });
                } else {
                    var message = from + ': Oh noes, eipä ole vielä perjantai...';

                    channel.say(message);
                }
            }
        };
    }
};
