








// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyA-hKRyUoQu4CZ8H6i8zTPG3FMihsi8ZeI",
  authDomain: "amysproj-c3ec2.firebaseapp.com",
  databaseURL: "https://amysproj-c3ec2.firebaseio.com",
  storageBucket: "amysproj-c3ec2.appspot.com",
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainNameInput").val();
  var destination = $("#destinationInput").val();
  var firstTrainTime = $("#firstTrainTimeInput").val();
  var frequency = $("#frequencyInput").val();

  //creates local "temporary" object for holding train data
  var newTrain = {
    tempTrain: trainName,
    tempDestination: destination,
    tempFirstTrainTime: firstTrainTime,
    tempFrequency: frequency
  };
  
  // Uploads train data to the database
  database.ref().push(newTrain);

  alert("New Train successfully added");

  // Clears all of the text boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainTimeInput").val("");
  $("#frequencyInput").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // storing the snapshot.val() in a variable for convenience
    var trainName = childSnapshot.val().tempTrain;
    var destination = childSnapshot.val().tempDestination;
    var firstTrainTime = childSnapshot.val().tempFirstTrainTime;
    var frequency = childSnapshot.val().tempFrequency;

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    // Change the HTML to reflect
    $("#train-table > tbody").append(
      $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(firstTrainTime)
      ))

});
