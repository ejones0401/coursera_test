(function (global) { //iffy here (these functions not directly avaible outside of this)

// Set up a namespace for our utility
var ajaxUtils = {};


// Returns an HTTP request object
function getRequestObject() { //checks what type of object is available
  if (global.XMLHttpRequest) { //the most modern Ajax Object (very few browsers have older ones)
    return (new XMLHttpRequest());//so THIS is the OBJECT WE WILL USE TO MAKE HTTP REQUEST!!!
  } 
  else if (global.ActiveXObject) {
    // For very old IE browsers (optional)
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } 
  else {
    global.alert("Ajax is not supported!"); //just in case a browser somehow doesnt work w Ajax
    return(null); 
  }
}


// Makes an Ajax GET request to 'requestUrl' to send to server!!
//MAIN FUNCTION (sending a get request to the server!):
ajaxUtils.sendGetRequest = 
  function(requestUrl, responseHandler, isJsonResponse) { //requestURL: the link where we are requesting to get the resource
    //responseHandler: will handle the result of what the server returns!
    var request = getRequestObject(); //function from Line 8 (will get a new XMLHttpRequest object)
    request.onreadystatechange = //onreadystatechange is a stage in the network communication between the server and browser
      function() { 
        handleResponse(request, responseHandler, isJsonResponse); //actually handle it (once server gives response)
      }; //^this function is always the one that will execute when there is a change in state between browser and server!
    request.open("GET", requestUrl, true); //actually set up the get request (true makes it asynchronous as we want)
    request.send(null); // this is null bc its ONLY for POST commands (where the core of the request is in the BODY!)
  };


// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request, responseHandler, isJsonResponse) {
  if ((request.readyState == 4) && //meaning the request is fully ready
     (request.status == 200)) { //response status code (making sure that you only give 
    //them the resource if the Response Status Code is good; 200)

    //Default to isJsonResponse to true (if nothing passed)
    if (isJsonResponse == undefined) {
      isJsonResponse = true
    }
    if (isJsonResponse) {
      responseHandler(JSON.parse(request.responseText));
    }
    else {
      responseHandler(request.responseHandler);
    }
  }
}


// Expose the utility to the global object (so we can actually use it outside this function)
global.$ajaxUtils = ajaxUtils;


})(window);