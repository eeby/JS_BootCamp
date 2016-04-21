// some imaginary language
function MyFunction(int num, string a=null) {
}

class MyArgs {
	string a: null;
	int b: 9;
}

function MyFunction2(MyArgs args) {
	return args.a == 43 ? 'BAD' : 'GOOD';
}

