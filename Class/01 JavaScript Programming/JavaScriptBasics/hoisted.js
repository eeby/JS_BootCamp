// here we define the variable, and it is hoisted
(function test() {
	console.log('zz is: ' + zz);
	var zz = 42;
})(); // undefined

// ... what really happens is this...
(function test() {
	var zz;
	console.log(zz);
	zz = 42;
})();

// in this case the variable is not defined altogether
(function test() {
	console.log('zz is: ' + zz);
	/* var zz = 42; */
})(); // Uncaught ReferenceError: zz is not defined

// in this case the variable is global
(function test() {
	console.log('zz is: ' + zz);
})();
var zz = 42; // zz is: undefined

// in this case the variable is global
(function test() {
	console.log('zz is: ' + zz);
})();
zz = 42; // Uncaught ReferenceError: zz is not defined(…)
