  // Initialize Firebase

var firebaseConfig = {
    apiKey: "AIzaSyA-hKRyUoQu4CZ8H6i8zTPG3FMihsi8ZeI",
    authDomain: "amysproj-c3ec2.firebaseapp.com",
    databaseURL: "https://amysproj-c3ec2.firebaseio.com",
    projectId: "amysproj-c3ec2",
    storageBucket: "amysproj-c3ec2.appspot.com",
    messagingSenderId: "958618142623",
    appId: "1:958618142623:web:88204b29420c2a83"
  };
  
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  // Button for adding trains
  $("#add-train-btn").on("click", function(event) {
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

 // Logs everything to console
 console.log(newTrain.tempTrain);
 console.log(newTrain.tempDestination);
 console.log(newTrain.tempFirstTrainTime)
 console.log(newTrain.tempFrequency);
  });
