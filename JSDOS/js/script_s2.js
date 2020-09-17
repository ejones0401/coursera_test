// Event Handling
document.addEventListener("DOMContentLoaded", //once page fully loads all HTML content
	function (event) {
		//Unobstrusive event binding
		document.querySelector("button").addEventListener("click", 
			function () { //execute this function when "button" element is clicked

				//Call server to get the name (set as blank above)
				$ajaxUtils.sendGetRequest("/data/name.txt", //URL is here
					function (request) { //this is the responseHandler! (this function)
						var name = request.responseText;

						document.querySelector("#content")
						.innerHTML = "<h2>Hello " + name + "!";
						//^NEEDS to be inside of AJAX call bc its asynchronous (see **PROBLEM note in notebook)
					});
			});
	}
);