
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
    politics = $("#politics-input").val();
    religion = $("#religion-input").val();
    computer = $("#computer-input").val();
    guns = $("#guns-input").val();

    //Push these variables to firebase
    database.ref().push({
        name: name,
        age: age,
        city: city,
        gender: gender,
        politics: politics,
        religion: religion,
        politics: politics,
        computer: computer,
        guns: guns
    })

    //Clear local storage and then save the users information

    localStorage.clear();
    localStorage.setItem('selectedName', name);
    localStorage.setItem('selectedAge', age);
    localStorage.setItem('selectedCity', city);
    localStorage.setItem('selectedGender', gender);
    localStorage.setItem('selectedPolitics', politics);
    localStorage.setItem('selectedReligion', religion);
    localStorage.setItem('selectedComputer', computer);
    localStorage.setItem('selectedGuns', guns);

});


$("#add-user-btn").click(function (event) {
    event.preventDefault();
    window.location = "matches.html";
})


if (localStorage.getItem("selectedCity")) {
    firebaseAdded("city", "selectedCity");
}

function firebaseAdded(parameter1, parameter2) {
    database.ref().orderByChild(parameter1).equalTo(localStorage.getItem(parameter2)).on("child_added", function (snapshot) {
        childName = snapshot.val().name;
        childAge = snapshot.val().age;
        childGender = snapshot.val().gender;
        childCity = snapshot.val().city;
        childReligion = snapshot.val().religion
        childPolitics = snapshot.val().politics
        childGuns = snapshot.val().guns
        childComputer = snapshot.val().computer


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

            var tableSecondRow = $("<tr>")

            var areasOfConflict = "AREAS OF CONFLICT: ";
            // $(areasOfConflict.css({'font-weight': 'Bold'})
            var conflict = $("<td>")
            conflict.attr("colspan", 4)
            conflict.css("background", "red")

            if (localStorage.getItem("selectedReligion", religion) !== childReligion) {
                areasOfConflict += "Religion: " + childReligion + " ";
            }
            if (localStorage.getItem("selectedPolitics", politics) !== childPolitics) {
                areasOfConflict += "Politics: " + childPolitics + " ";
            }
            if (localStorage.getItem("selectedGuns", guns) !== childGuns) {
                areasOfConflict += "Gun Control: " + childGuns + " ";
            }
            if (localStorage.getItem("selectedComputer", computer) !== childComputer) {
                areasOfConflict += "Computer Preference: " + childComputer + " ";
            }

            conflict.text(areasOfConflict);
            tableSecondRow.append(conflict);
            $("#tableBody").append(tableSecondRow);
        }
    })
}

//map API
var map, infoWindow;
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

//New York Times API
function buildQueryURL() {

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };
    queryParams.q = "street fights"
    return queryURL + $.param(queryParams);
}

function updatePage(NYTData) {
    for (var i = 0; i < 5; i++) {
        var article = NYTData.response.docs[i];
        var $articleList = $("<tr>");

        $("#articleList").append($articleList);

        var headline = article.headline;
        var articleHeadline = $("<td>");
        var articleLink = $("<td>");

        articleHeadline.append("<strong> " + headline.main + "</strong>")
        articleLink.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");

        $articleList.append(articleHeadline);
        $articleList.append(articleLink);
    }
}

$("#newYorkTimes").on("click", function (event) {
    event.preventDefault();

    var queryURL = buildQueryURL();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(updatePage);
});

