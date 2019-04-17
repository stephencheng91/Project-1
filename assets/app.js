
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
var age=0;
var city = "";
var gender = "";

//Variable for pulling from firebase
var childName = "";
var childAge = "";
var childGender = "";
var childCity = "";

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

    localStorage.clear();
    localStorage.setItem('selectedGender', gender);
    localStorage.setItem('selectedAge', age);
    localStorage.setItem('selectedCity', city);

    database.ref().push({
        name: name,
        age: age,
        city: city,
        gender: gender
    })
})

$("#add-user-btn").click(function () {
    window.location = 'matches.html';
})


// if (localStorage.getItem("selectedCity")) {
//     firebaseAdded("city", "selectedCity");
// }
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



