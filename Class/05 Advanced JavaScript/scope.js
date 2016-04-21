// let's check if indeed a scope is only created in a function...

function testfunc() {
	if (true) {
		var x=3;
	}
	// if above is local scope then x should not exist here
	console.log('x is..... ' + x);
	// x is..... 3
}

console.log('and outside of the above scope x is ... ' + x);
// Uncaught ReferenceError: x is not defined(…)