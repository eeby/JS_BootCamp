/**
 * Created by elibe on 16/02/2016.
 */

function TableDrawer() {
    var Table = require('cli-table');
    var table = new Table();
    this.push = function(obj) {
        return table.push(obj);
    }
}


// we will export a singleton instance
module.exports = exports = new TableDrawer();
