// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyA-hKRyUoQu4CZ8H6i8zTPG3FMihsi8ZeI",
  authDomain: "amysproj-c3ec2.firebaseapp.com",
  databaseURL: "https://amysproj-c3ec2.firebaseio.com",
  storageBucket: "amysproj-c3ec2.appspot.com",
};

firebase.initializeApp(firebaseConfig);

var trainData = firebase.database();

// Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainNameInput")
    .val()
    .trim();
  var destination = $("#destinationInput")
    .val()
    .trim();
  var firstTrain = $("#firstTrainTimeInput")
    .val()
    .trim();
  var frequency = $("#frequencyInput")
    .val()
    .trim();

  //creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads train data to the database
  trainData.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("New Train successfully added");

  // Clears all of the text boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainTimeInput").val("");
  $("#frequencyInput").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
trainData.ref().on("child_added", function (childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  // storing the snapshot.val() in a variable for convenience
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;
  console.log(typeof tFirstTrain);

  // Start calculations here 
  var timeArr = tFirstTrain.split(":");
  var trainTime = moment()
    .hours(timeArr[0])
    .minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), moment(trainTime)).format();
  var tMinutes;
  var tArrival;

  // If the first train is later than the current time, sent arrival to the first train time
  if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes");
  } else {
    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
    // and find the modulus between the difference and the frequency.
    var differenceTimes = moment().diff(trainTime, "minutes");
    var tRemainder = differenceTimes % tFrequency;
    tMinutes = tFrequency - tRemainder;
    // To calculate the arrival time, add the tMinutes to the current time
    tArrival = moment()
      .add(tMinutes, "m")
      .format("hh:mm A");
  }

  console.log("tMinutes:", tMinutes);
  console.log("tArrival:", tArrival);

  // End calculations

  // Change the HTML to reflect
  $("#train-table > tbody").append(
    $("<tr>").append(
      $("<td>").text(tName),
      $("<td>").text(tDestination),
      $("<td>").text(tFrequency),
      $("<td>").text(tArrival),
      $("<td>").text(tMinutes)
    )
  );
});
