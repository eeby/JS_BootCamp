//	IIFE - Immediately Invocable Function Expression

(function my_iife_func() {
    var a = 42;
	console.log('running');
})();

var thatthing = {that: 'thing'};

var mylibrary = (function my_iife_func2(something) {
	console.log('running 2', something);
	return {some: 'thing'};
})(thatthing);

(function my_iife_func2() {
    var a = 24;
	console.log('running 3');
	function a_great_function() {
	     function another_great_function() {
			console.log('another great');
		 }
		 another_great_function();
		 console.log('great function');
	}
	a_great_function();
})();
	