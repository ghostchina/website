var unidecode  = require('unidecode'),

    utils,
    getRandomInt,
    _   = require('lodash'),
    Segment = require('segment').Segment;
    var segment = new Segment();
    segment.useDefault();

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */
getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

utils = {
    /**
     * Timespans in seconds and milliseconds for better readability
     */
    ONE_HOUR_S: 3600,
    ONE_DAY_S: 86400,
    ONE_YEAR_S: 31536000,
    ONE_HOUR_MS: 3600000,
    ONE_DAY_MS: 86400000,
    ONE_YEAR_MS: 31536000000,

    /**
     * Return a unique identifier with the given `len`.
     *
     *     utils.uid(10);
     *     // => "FDaS435D2z"
     *
     * @param {Number} len
     * @return {String}
     * @api private
     */
    uid: function (len) {
        var buf = [],
            chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charlen = chars.length,
            i;

        for (i = 1; i < len; i = i + 1) {
            buf.push(chars[getRandomInt(0, charlen - 1)]);
        }

        return buf.join('');
    },
    safeString: function (string) {
        string = string.trim();

        // Remove non ascii characters
        string = unidecode(string);

        // Remove URL reserved chars: `:/?#[]@!$&'()*+,;=` as well as `\%<>|^~£"`
        string = string.replace(/[:\/\?#\[\]@!$&'()*+,;=\\%<>\|\^~£"]/g, '')
            // Replace dots and spaces with a dash
            .replace(/(\s|\.)/g, '-')
            // Convert 2 or more dashes into a single dash
            .replace(/-+/g, '-')
            // Make the whole thing lowercase
            .toLowerCase();

        return string;
    },
    'segement':function doSegment(str){
        var result = segment.doSegment(str);
        return _.sortBy(result,'p');
    }
};

module.exports = utils;