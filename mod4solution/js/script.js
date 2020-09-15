// Closures
function makeMultiplier (multiplier) {
	function b() {
		console.log("Multiplier is: " + multiplier);
	}
	b();
	return (
		function (x) {
			return multiplier * x;
		} //This is NOT an execution of a function (just saving it to a variable) so it doesnt get an outer reference, this object, etc.
		) //^ UNTIL it is called later!!
}
var doubleAll = makeMultiplier(2);
console.log(doubleAll(15));
// Closure allow the outer lexical environment to stay saved

// Namespace (just an object, prevent variables overriding, esp. relevant when you have multiple scripts called in the HTML file)
// script2 in his demo was the same except for John and different hello variable
var yaakovGreeter = {};
yaakovGreeter.name = "Yaakov";
yaakovGreeter.sayHello = function() {
	console.log("Hello " + yaakovGreeter.name);
}
yaakovGreeter.sayHello();

//Immediately Invoked Function Expressions (IIFEs)
(function () {
	console.log("Hello Coursera")
})(); //THIS LINE IS AN IIFE OR "IFFY"

(function (window) {
	var yaakovGeezy = {};
	yaakovGeezy.name = "Yaakov";
	window.yaakovGeezy = yaakovGeezy;
})(window); //
console.log(yaakovGeezy);
//^THIS ALLOWS YOU TO IMMEDIATELY CALL, AND ALSO PUT IT IN GLOBAL WINDOW IN THIS OBJECT!

