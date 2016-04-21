// just a simple callback example
function callme() {
	console.log('you called me?');
}
setTimeout(callme, 1000);

// and in node... 
var somelib = require('somelib');

somelib.dosomething(42, function callback(result, err) {
	if (err) {
		// houston we have a problem..
	}
	else {
		// all is good
	}
});