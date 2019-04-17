
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

//Variables used to hold user information
 var name = "";
 var age = 0;
 var city = "";
 var gender = "";
 var politics = "";
 var religion = "";
 var computer = "";
 var guns = "";

//On clicking submit button, save the entered in values
 $("#add-user-btn").click(function(event) {
   
    event.preventDefault();
   
    name = $("#name-input").val();
    age = parseInt($("#age-input").val());
    city = $("#city-input").val();
    if($("input[id=female-btn]:checked").val() === undefined) {
        gender = "male";
    } else {
        gender = "female"
    }
    religion = $("#religion-input").val();
    computer = $("#computer-input").val();
    guns = $("#guns-input").val();

//Push these variables to firebase
    database.ref().push({
        name: name,
        age: age,
        city: city,
        gender: gender,
        religion: religion,
        computer: computer,
        guns: guns
    })

//Clear local storage and then save the users information
    localStorage.clear();
    localStorage.setItem('selectedName', name);
    localStorage.setItem('selectedAge', age);
    localStorage.setItem('selectedCity', city);
    localStorage.setItem('selectedGender', gender);
    localStorage.setItem('selectedReligion', religion);
    localStorage.setItem('selectedComputer', computer);
    localStorage.setItem('selectedGuns', guns );

    database.ref().orderByChild("city").equalTo(city).on("child_added", function (snapshot) {

        console.log("filtering", snapshot.val());
      });
 })

//Switch to matches page on clicking submit button
 $("#add-user-btn").click(function() {
	window.location = 'matches.html';
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