function myfunc () { console.info('I was called'); }
undefined
myfunc()
VM414:2 I was called
undefined
['myfunction']
["myfunction"]
window['myfunction']
undefined
window['myfunc']
myfunc() { console.info('I was called'); }
['myfunc']
["myfunc"]
window['myfunc']
myfunc() { console.info('I was called'); }
window['myfunc']()
VM414:2 I was called
undefined
window['myfunc'].call(this)
VM414:2 I was called
undefined
var myarr = [myfunc, myfunc, ,,,]
undefined
myarr
[myfunc(), myfunc(), undefined × 3]
myarr[0]
myfunc() { console.info('I was called'); }
myarr[0]()
VM414:2 I was called
undefined