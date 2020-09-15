// // W4 S1: Intro JS

var message = "in global";
console.log("global: message = " + message);

var a = function() {
var message = "inside a";
console.log("a: message = " + message);
b();
}

// function b () {
// 	console.log("b: message = " + message);
// }

// a();



// // W4 S2: JS Types

// var x;
// console.log(x);

// if (x == undefined) {
// 	console.log("x is undefined");
// }

// x = 5;
// if (x == undefined) {
// 	console.log("x is undefined");
// }
// else {
// 	console.log("x has been defined")
// }


// // W4 S2: Common Language Constructs

// strings
// var string = "Hello";
// string += " World";
// console.log(string + "!");

// math
// console.log((5+4)/3);
// console.log(undefined / 5);

// equality (does type COERSION for double equals sign)
// var x=4, y=4;
// if (x == y) {
// 	console.log("x is equal to y")
// }
// x = "4";
// if (x == y) {
// 	console.log("x='4' is equal to y=4")
// }

// STRICT equality (triple equal sign)
// if (x === y) {
// 	console.log("Strict: x='4' is equal to y=4")
// }
// else {
// 	console.log("Strict x='4' is NOT equal to y=4")
// }

// Booleans (true vs. false) or's and and's
// if (false || null || undefined || "" || 0 || NaN) {
// 	console.log("This line won't ever execute");
// }
// else {
// 	console.log("All false");
// }

// if (true && "hello" && 1 && -1 && "false") {
// 	console.log("All true");
// }

// Curly braces for {} style (not just for style, established practice)
// function a()
// {
// 	return // in this method (BAD) the function will return immediately without executing the function
// 	{
// 		name: "Yaakov"
// 	};
// }
// function b() {
// 	return {
// 		name: "Yaakov"
// 	};
// }

// console.log(a());
// console.log(b());

// FOR LOOPS
// var sum = 0;
// for (var i = 0; i < 10; i++) {
// 	console.log(i);
// 	sum = sum + i
// }
// console.log("sum of 0 through 9 is: " + sum);

// Default Values
// function orderChickenWith(sideDish) {
// 	if (sideDish === undefined) {
// 		sideDish = "whatever!";
// 	}
// 	console.log("Chicken with " + sideDish);
// }
// OR (another way to set defaul value):
// function orderChickenWith(sideDish) {
// 	sideDish = sideDish || "whatever!";
// 	console.log("Chicken with " + sideDish);
// } //since "or" statement will coerce the value into this "true" value of "whatever"
// orderChickenWith("noodles");
// orderChickenWith(); //prints "Chicken with undefined" unless if statement is above or default value set



// // W4 S3: JS Objects and Functions

// new objects
// var company = new Object();
// company.name = "Facebook";
// company.ceo = new Object();
// company.ceo.firstName = "Mark";
// company.ceo.favColor = "blue";

// console.log(company);
// console.log("Company CEO" + company.ceo.firstName);
// console.log(company["name"]);

// company.$stock = 110

// create objects with literal syntax (cleaner)
// var facebook = {
// 	name: "Facebook",
// 	ceo: {
// 		firstName: "Mark",
// 		favColor: "blue"
// 	},
// 	"stock of company": 110
// };
// console.log(facebook.ceo.firstName);

// functions
// function multiply(x,y) {
// 	return x * y;
// }
// console.log(multiply(2,5));

// multiply.version = "v.1.0.0"; //add property just like an object!!
// console.log(multiply.version);
// function makeMultiplier(multiplier) {
// 	var my_function = function(x) {
// 		return multiplier * x;
// 	};
// 	return my_function;
// }

// var multiplyBy3 = makeMultiplier(3);
// console.log(multiplyBy3(10));
// var doubleAll = makeMultiplier(2);
// console.log(doubleAll(100));

// passing functions as arguments
// function doOperationOn(x,operation) {
// 	return operation(x);
// }
// var result = doOperationOn(5,multiplyBy3);
// console.log(result);


// passing (or copying) by VALUE (see notes for concepts)
// primitives (passed by value):
// var a = 7;
// var b = a;
// console.log("a: " + a);
// console.log("b: " + b);

// b = 5;
// console.log("after b update:");
// console.log("a: " + a);
// console.log("b: " + b);
// objects (passed by reference):
// var a = {x: 7};
// var b = a;
// console.log(a);
// console.log(b);

// b.x = 5;
// console.log("after b.x update:");
// console.log(a);
// console.log(b);

//another example of "passing": primitives
// function changePrimitive(primValue) {
// 	console.log("in changePrimitive...");
// 	console.log("before:");
// 	console.log(primValue)

// 	primValue=5;
// 	console.log("after:");
// 	console.log(primValue);
// }
// var value = 7;
// changePrimitive(value); // another form of "passing"/copying, saying primValue = value!
// console.log("after changePrimitive, orig value:");
// console.log(value); // notice that "value" does NOT change
// //another example of "passing": objects
// function changeObject(objValue) {
// 	console.log("in changeObject...");
// 	console.log("before:");
// 	console.log(objValue)

// 	objValue.x = 5;
// 	console.log("after:");
// 	console.log(objValue);
// }
// var value = {x: 7};
// changeObject(value); // another form of "passing"/copying, saying objValue = value!
// console.log("after changeObject, orig value:");
// console.log(value); // notice that "value" DOES change!

// this:
// function test() {
// 	console.log(this);
// 	this.myName = "Yaakov";
// }
// test();
// console.log(window.myName);
// // Function constructors
// function Circle (radius) {
// 	this.radius = radius; //CANNOT RETURN ANYTHING IN CONSTRUCTOR!
// }
// Circle.prototype.getArea = 
// 	function () {
// 		return Math.PI * Math.pow(this.radius, 2);
// 	}

// var myCircle = new Circle(10); // SAME as doing new Object()
// console.log(myCircle);

// var myOtherCircle = new Circle(20); 
// console.log(myOtherCircle);

// // Object literals and "this"
// var literalCircle = {
// 	radius:10,
// 	getArea: function () {
// 		var self = this;
// 		console.log(this);

// 		var increaseRadius = function() {
// 			self.radius = 20; // USING THIS.RADIUS HERE WILL SET THE RADIUS OF THE GLOBAL WINDOW, NOT THE REAL THIS!!!
// 		};
// 		increaseRadius();

// 		return Math.PI * Math.pow(this.radius, 2);
// 	}
// }; // This works EXACTLY like a function constructor

// console.log(literalCircle.getArea());

// //Arrays
var array = new Array();
array[0] = "yaakov";
array[1] = 2;
array[2] = function (name) {
	console.log("Hello " + name);
};
array[3] = {course: " HTML, CSS & JS"};

console.log(array);
console.log(array[1]);
// RARE THAT PROG. LANGUAGES ALLOW ALL TYPES TO BE INSIDE ONE ARRAY (BUT JS DOES)
// START TAKING ALL NOTES ON LAPTOP: WILL IMPROVE YOUR EFFICIENCY AND SKILL CODING
console.log(array);
array[2](array[0]);
console.log(array[3].course);
// Might have to bail on the workout week: need to grind 16-18 hours per day.

// Short hand array creation:
var names = ["Yaakov", "John", "Joe"];
console.log



