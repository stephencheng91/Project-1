
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
    
      if(localStorage.getItem("selectedGender", gender) !== childGender){
        var tableRow = $("<tr>");
        $("#tableBody").append(tableRow);

})

        var tableAge = $("<td>");
        tableRow.append(tableAge.text(childAge));

        var tableGender = $("<td>");
        tableRow.append(tableGender.text(childGender));

        var tableCity = $("<td>");
        tableRow.append(tableCity.text(childCity));
      }
    });
}

var map = infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

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

