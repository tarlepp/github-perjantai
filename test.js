/**
 * Simple test file for unibot-perjantai plugin.
 *
 * Purpose of this is just to "mimic" actual IRC messages on channel where plugin is enabled.
 *
 * Usage:
 *  node test.js
 */

/**
 * Runner dependencies.
 *
 * @type {exports}
 */
var _ = require('lodash');
var plugin = require('./index');


var from = 'tarlepp';
var message = '!perjantai';
var match = false;

var channel = {
    say: function(message, from) {
        from ? console.log(from + ': ' + message) : console.log(message);
    }
};

_.forEach(plugin({})(channel), function iterator(callback, pattern) {
    var expression = new RegExp(pattern, 'i');
    var matches = expression.exec(message);

    if (matches) {
        console.log('Plugin matches with: ' + message);

        match = true;

        callback(from, matches);
    }
});

if (!match) {
    console.log('Plugin does not match with: ' + message);
}
