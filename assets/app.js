
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

database.ref().orderByChild("age").equalTo(age - 5 <= age && age <= age + 5).on("child_added", function (snapshot) {
    console.log("filtering", snapshot.val());
});


database.ref().on("child_added", function (snapshot, prevChildKey) {

    console.log(prevChildKey);

    var childName=snapshot.val().name;
    var childAge=snapshot.val().age;
    var childGender=snapshot.val().gender;
    var childCity=snapshot.val().city;

    var tableRow=$("<tr>");
    $("#tableBody").append(tableRow);
    
    var tableName = $("<td>");
    tableRow.append(tableName.text(childName));

    var tableAge = $("<td>");
    tableRow.append(tableAge.text(childAge));

    var tableGender = $("<td>");
    tableRow.append(tableGender.text(childGender));

    var tableCity = $("<td>");
    tableRow.append(tableCity.text(childCity));

});
