
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDEU7u0sN9_gOCtEBz_J2VpUHbZ0zVmFpM",
    authDomain: "plentyoftiffs.firebaseapp.com",
    databaseURL: "https://plentyoftiffs.firebaseio.com",
    projectId: "plentyoftiffs",
    storageBucket: "plentyoftiffs.appspot.com",
    messagingSenderId: "400267177365"
};

firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var age = 0;
var city = "";
var gender = "";
var politics = "";
var religion = "";
var computer = "";
var guns = "";

$("#add-user-btn").click(function (event) {
    event.preventDefault();

    name = $("#name-input").val();
    age = parseInt($("#age-input").val());
    city = $("#city-input").val();
    if ($("input[id=female-btn]:checked").val() === undefined) {
        gender = "male";
    } else {
        gender = "female"
    }
    religion = $("#religion-input").val();
    computer = $("#computer-input").val();
    guns = $("#guns-input").val();

    database.ref().push({
        name: name,
        age: age,
        city: city,
        gender: gender,
        religion: religion,
        computer: computer,
        guns: guns
    })
    localStorage.clear();
    localStorage.setItem('selectedName', name);
    localStorage.setItem('selectedAge', age);
    localStorage.setItem('selectedCity', city);
    localStorage.setItem('selectedGender', gender);
    localStorage.setItem('selectedReligion', religion);
    localStorage.setItem('selectedComputer', computer);
    localStorage.setItem('selectedGuns', guns);

});


$("#add-user-btn").click(function (event) {
    event.preventDefault();
    window.location = "matches.html";
})


database.ref().on("child_added", function (snapshot, prevChildKey) {

    console.log(prevChildKey);

    var childName = snapshot.val().name;
    var childAge = snapshot.val().age;
    var childGender = snapshot.val().gender;
    var childCity = snapshot.val().city;

    var tableRow = $("<tr>");
    $("#tableBody").append(tableRow);

    var tableName = $("<td>");
    tableRow.append(tableName.text(childName));

    var tableAge = $("<td>");
    tableRow.append(tableAge.text(childAge));

    var tableGender = $("<td>");
    tableRow.append(tableGender.text(childGender));

    var tableCity = $("<td>");
    tableRow.append(tableCity.text(childCity));
//if cityArr !include childCity , push childCity to array
})


// var cities ={
//     Seattle ={
//         lat:"",
//         lng:""
//     },
//     Renton  ={
//         lat:"",
//         lng:""
//     }
// }

var map = infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 47.6038, lng: -122.3301 },
        zoom: 7 
    });
    infoWindow = new google.maps.InfoWindow;

    var lat = "47.4799"
    var lon = "-122.2034"
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {lat: parseInt(lat), lng: parseInt(lon)}
      });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here, Dude.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}



if (localStorage.getItem("selectedCity")) {
    firebaseAdded("city", "selectedCity");
}

function firebaseAdded(parameter1, parameter2) {
    database.ref().orderByChild(parameter1).equalTo(localStorage.getItem(parameter2)).on("child_added", function (snapshot) {
        childName = snapshot.val().name;
        childAge = snapshot.val().age;
        childGender = snapshot.val().gender;
        childCity = snapshot.val().city;

        console.log(database.ref("gender").once("value"));

        if (localStorage.getItem("selectedGender", gender) !== childGender) {
            var tableRow = $("<tr>");
            $("#tableBody").append(tableRow);

            var tableName = $("<td>");
            tableRow.append(tableName.text(childName));

            var tableAge = $("<td>");
            tableRow.append(tableAge.text(childAge));

            var tableGender = $("<td>");
            tableRow.append(tableGender.text(childGender));

            var tableCity = $("<td>");
            tableRow.append(tableCity.text(childCity));
        }
    });
}



// here is code for NY times API

// /**
//  * pulls information from the form and build the query URL
//  * @returns {string} URL for NYT API based on form inputs
//  */
// function buildQueryURL() {
//     // queryURL is the url we'll use to query the API
//     var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  
//     // Begin building an object to contain our API call's query parameters
//     // Set the API key
//     var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };
  
//     // Grab text the user typed into the search input, add to the queryParams object
//     queryParams.q = "Fights"
  
//     // If the user provides a startYear, include it in the queryParams object
    
  
//     // If the user provides an endYear, include it in the queryParams object
   
//     // Logging the URL so we have access to it for troubleshooting
//     console.log("---------------\nURL: " + queryURL + "\n---------------");
//     console.log(queryURL + $.param(queryParams));
//     return queryURL + $.param(queryParams);
//   }
  
//   /**
//    * takes API data (JSON/object) and turns it into elements on the page
//    * @param {object} NYTData - object containing NYT API data
//    */
//   function updatePage(NYTData) {
//     // Get from the form the number of results to display
//     // API doesn't have a "limit" parameter, so we have to do this ourselves
//     var numArticles = $("#article-count").val();
  
//     // Log the NYTData to console, where it will show up as an object
//     console.log(NYTData);
//     console.log("------------------------------------");
  
//     // Loop through and build elements for the defined number of articles
//     for (var i = 0; i < numArticles; i++) {
//       // Get specific article info for current index
//       var article = NYTData.response.docs[i];
  
//       // Increase the articleCount (track article # - starting at 1)
//       var articleCount = i + 1;
  
//       // Create the  list group to contain the articles and add the article content for each
//       var $articleList = $("<ul>");
//       $articleList.addClass("list-group");
  
//       // Add the newly created element to the DOM
//       $("#article-section").append($articleList);
  
//       // If the article has a headline, log and append to $articleList
//       var headline = article.headline;
//       var $articleListItem = $("<li class='list-group-item articleHeadline'>");
  
//       if (headline && headline.main) {
//         console.log(headline.main);
//         $articleListItem.append(
//           "<span class='label label-primary'>" +
//             articleCount +
//             "</span>" +
//             "<strong> " +
//             headline.main +
//             "</strong>"
//         );
//       }
  
//       // If the article has a byline, log and append to $articleList
//       var byline = article.byline;
  
//       if (byline && byline.original) {
//         console.log(byline.original);
//         $articleListItem.append("<h5>" + byline.original + "</h5>");
//       }
  
//       // Log section, and append to document if exists
      
  
//       // Log published date, and append to document if exists
      
//       // Append and log url
//       $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
//       console.log(article.web_url);
  
//       // Append the article
//       $articleList.append($articleListItem);
//     }
//   }
  
  
//   // ==========================================================
  
//   // .on("click") function associated with the Search Button
//   $("#run-search").on("click", function(event) {
//     // This line allows us to take advantage of the HTML "submit" property
//     // This way we can hit enter on the keyboard and it registers the search
//     // (in addition to clicks). Prevents the page from reloading on form submit.
//     event.preventDefault();
  
//     // Empty the region associated with the articles
   
  
//     // Build the query URL for the ajax request to the NYT API
//     var queryURL = buildQueryURL();
  
//     // Make the AJAX request to the API - GETs the JSON data at the queryURL.
//     // The data then gets passed as an argument to the updatePage function
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(updatePage);
//   });
  
  
  