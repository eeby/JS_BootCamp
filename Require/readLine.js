/**
 * Created by elibe on 16/02/2016.
 */

function LineReader() {
    var rs = require('readline-sync');

    this.question = function(what) {
        return rs.question(what);
    }
}

// we will export a singleton instance
module.exports = exports = new LineReader();
