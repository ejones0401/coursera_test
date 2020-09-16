// DOM (entire HTML document) MANIPULATION 
console.log(document.getElementById("title"));

console.log(document instanceof HTMLDocument);

function sayHello (event) {
	console.log(this);
	var name = document.getElementById("name").value;
	var message = "<h2>Hello " + name + "!</h2>";

	// document.getElementById("content").textContent = message;
	document.getElementById("content").innerHTML = message;

	if (name === "student") {
		var title = document.querySelector("#title").textContent;
		title += " & Lovin' it!";
		document.querySelector("#title").textContent = title;
	}
}

// Unobstrusive Event Binding
document.querySelector("button").addEventListener("click", sayHello);