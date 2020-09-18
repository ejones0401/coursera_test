$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });

  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  }); //^^^these three lines might not be necesary
});

(function (global) {

var dc = {}; //"setting up namespace called dc"

var homeHtml = "snippets/home-snippet.html"; 
var allCategoriesUrl = "http://davids-restaurant.herokuapp.com/categories.json";
var categoriesTitleHtml = "snippets/categories-title-snippet.html"; 
var categoryHtml = "snippets/category-snippet.html"; 

var allCategoriesUrl = "http://davids-restaurant.herokuapp.com/menu-items.json?category=";//append each category later!
var menuItemsTitleHtml = "snippets/menu-items-title.html"; 
var menuItemHtml = "snippets/menu-item.html"; 

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

//To insert properties (in array) into the category-snipped file! (NEW: lecture 61)
var insertProperty = function(string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml, //links to the home-snippet html file
  function (responseText) { //handler function
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);
});

// NOW LOAD the menu categories view: Lecture 61 also
dc.loadMenuCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML); //value of a function (defined below)
    //AND IT WILL GENERATE A FULL OBJECT
}

// NOW LOAD the SINGLE category view: Lecture 62
dc.loadMenuItems = function (categoryShort) {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    menuItemsUrl + categoryShort,
    buildAndShowMenuItemsHTML); //value of a function (defined later)
    //AND IT WILL GENERATE A FULL OBJECT
}

// BUILDS HTML for the Categories page based on data from server! (L 61):
function buildAndShowCategoriesHTML (categories) { //"categories" is an OBJECT
  // Load title snippet
  $ajaxUtils.sendGetRequest(categoriesTitleHtml, function(categoriesTitleHtml) {
    // Retreive single category snippet:
      $ajaxUtils.sendGetRequest(categoryHtml, function(categoryHtml) {
          var categoriesViewHtml = buildCategoriesViewHtml(categories, //JUST INVENTED THIS FUNCTION NOW (defined later)
            categoriesTitleHtml, categoryHtml);
          insertHtml("#main-content", categoriesViewHtml);
        },
        false); //don't want any of our HTML snippets to be processed as json
    },
    false);
}

// Using categories data and snippets html
// build categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories,
                                 categoriesTitleHtml,
                                 categoryHtml) {

  var finalHtml = categoriesTitleHtml;
  console.log(finalHtml);

  finalHtml += "<section class='row'>"; //since we removed that before, since its not looping

  // Loop over categories array
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>"; //pretty coooooool
  console.log(finalHtml);

  return finalHtml;
}

// BUILDS HTML for the SINGLE category page based on data from server! (L 62):
function buildAndShowMenuItemsHTML (categoryMenuItems) { 
  // Load title snippet
  $ajaxUtils.sendGetRequest(menuItemsTitleHtml, function(menuItemsTitleHtml) {
    // Retreive single menu item snippet:
      $ajaxUtils.sendGetRequest(menuItemHtml, function(menuItemHtml) {
          var menuItemsViewHtml = buildMenuItemsViewHtml(categoryMenuItems, //JUST INVENTED THIS FUNCTION NOW (defined later)
            menuItemsTitleHtml, menuItemHtml);
          insertHtml("#main-content", menuItemsViewHtml);
        },
        false); //don't want any of our HTML snippets to be processed as json
    },
    false);
}

function buildMenuItemsViewHtml(categoryMenuItems,
                                 menuItemsTitleHtml,
                                 menuItemHtml) {

  menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "name",
    categoryMenuItems.category.special_instructions);

  menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "special_instructions",
    categoryMenuItems.category.name);

  var finalHtml = menuItemsTitleHtml;
  console.log(finalHtml);

  finalHtml += "<section class='row'>"; //since we removed that before, since its not looping

  // Loop over menu items (each an array)
  var menuItems = categoryMenuItems.menu_items;
  var catShortName = categoryMenuItems.category.short_name;
  for (var i = 0; i < menuItems.length; i++) {
    // Insert menu item values
    var html = menuItemHtml;
    html = //SETTING ALL OF THESE AS VARIABLES (to be defined later)
          // BECAUSE SOMETIMES THESE DATA WON'T EXIST!
      insertProperty(html, "short_name", menuItems[i].short_name);
    html =
      insertProperty(html,
                     "catShortName",
                     catShortName);
    html =
      insertItemPrice(html,
                      "price_small",
                      menuItems[i].price_small);
    html =
      insertItemPortionName(html,
                            "small_portion_name",
                            menuItems[i].small_portion_name);
    html =
      insertItemPrice(html,
                      "price_large",
                      menuItems[i].price_large);
    html =
      insertItemPortionName(html,
                            "large_portion_name",
                            menuItems[i].large_portion_name);
    html =
      insertProperty(html,
                     "name",
                     menuItems[i].name);
    html =
      insertProperty(html,
                     "description",
                     menuItems[i].description);

    // Add clearfix after every second menu item: (to not mess up our grid based on how large the menu items are) to CLEAR to the next row!
    if (i % 2 != 0) {
      html +=
        "<div class='clearfix visible-lg-block visible-md-block'></div>";
    }

    finalHtml += html;
  }

  finalHtml += "</section>";
  console.log(finalHtml);

  return finalHtml;
}


// Appends price with '$' if price exists
function insertItemPrice(html,
                         pricePropName,
                         priceValue) {
  // If not specified, replace with empty string
  if (!priceValue) { //if it exists:
    return insertProperty(html, pricePropName, "");;
  }

  priceValue = "$" + priceValue.toFixed(2);
  html = insertProperty(html, pricePropName, priceValue);
  return html;
}


// Appends portion name in parens if it exists
function insertItemPortionName(html,
                               portionPropName,
                               portionValue) {
  // If not specified, return original string
  if (!portionValue) {
    return insertProperty(html, portionPropName, "");
  }

  portionValue = "(" + portionValue + ")";
  html = insertProperty(html, portionPropName, portionValue);
  return html;
}


global.$dc = dc;

})(window);
