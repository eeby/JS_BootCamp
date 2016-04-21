// iterating properties of an object
for (var p in prop) { 
	console.info('property ' + p + ' = ' + prop[p]); 
}

// a bad example: here we pullute the global object
// once the iteration ends we will have var p defined
// globally containing the last property of the object
for (p in prop) { 
	console.info('property ' + p + ' = ' + prop[p]); 
}