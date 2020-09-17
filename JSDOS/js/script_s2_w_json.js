// Event Handling
document.addEventListener("DOMContentLoaded", //once page fully loads all HTML content
	function (event) {
		//Unobstrusive event binding
		document.querySelector("button").addEventListener("click", 
			function () { //execute this function when "button" element is clicked

				//Call server to get the name (set as blank above)
				$ajaxUtils.sendGetRequest("/data/name.json", //URL is here
					function (res) { //this time, this "res" is actually a JS object (the response)
						// EVERYTHING BELOW: using it as normal, now that its a regular JS Object Literal (was converted)
						var message = res.firstName + " " + res.lastName
						console.log(message);
						if (res.likesChineseFood) {
							message += " likes Chinese food";
						}
						else {
							message += " doesn't like Chinese food";
						}
						message += " and uses ";
						message += res.numberOfDisplays;
						message += " displays for coding.";

						document.querySelector("#content")
						.innerHTML = "<h2>" + message + "</h2>";
						//^NEEDS to be inside of AJAX call bc its asynchronous (see **PROBLEM note in notebook)
					});
			});
	}
);