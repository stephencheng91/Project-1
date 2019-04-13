
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


    database.ref().push({
        name: name,
        age: age,
        city: city,
        gender: gender
    })
 })

 $("#add-user-btn").click(function() {
	window.location = 'matches.html';
})
