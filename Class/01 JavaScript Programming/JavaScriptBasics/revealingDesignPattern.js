var cmd = (function Command () {

	// revealing design pattern
	return {
		do: _do,
		undo: _undo2,
		dontdo: _dontdo // oh no! undefined is not a fuction
	};
	
	function _dontdo() { // defined only at runtime
		// .....
	}
	
	function _do() {
		// .....
	}
	
	function _undo2() {
		// ......
	}
})();