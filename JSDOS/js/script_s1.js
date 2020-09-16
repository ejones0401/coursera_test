// DOM (entire HTML document) MANIPULATION 
document.addEventListener("DOMContentLoaded",
	function (event) {

	function sayHello (event) { //called in HTML file (onClick = "sayHello()")
		console.log(event);
		this.textContent = "Said it!"; //change text in button element!
		var name = document.getElementById("name").value;
		var message = "<h2>Hello " + name + "!</h2>";

	// document.getElementById("content").textContent = message;
		document.getElementById("content").innerHTML = message;

		if (name === "student") {
		var title = document.querySelector("#title").textContent;
		title += " & Lovin' it!";
		document.querySelector("h1").textContent = title;
		}
	}

// Unobstrusive Event Binding
	document.querySelector("button")
		.addEventListener("click", sayHello); // SO: when there is a click on the 
// button object, execute the sayHello function!
// // AND: "this" variable now points to button element (containing element)
// Same thing: (below)
	// document.querySelector("button")
	// 	.onclick = sayHello; //not executing the function in this line! Just attributing to the element

	document.querySelector("body").addEventListener("mousemove",
		function (event) {
			if (event.shiftKey === true) { //ONLY when holding down shift button!
				console.log("x: " + event.clientX);
				console.log("y: " + event.clientY);
			} // Log x and y positions of mouse while shift is held
		}
		);
	}
);