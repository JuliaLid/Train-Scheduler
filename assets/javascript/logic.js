
//Initialie database 
var config = {
apiKey: "AIzaSyC44dbMU3lVWENw7MAKkm_Y8DKrdMK61e0",
authDomain: "clickbutton-b17b6.firebaseapp.com",
databaseURL: "https://clickbutton-b17b6.firebaseio.com",
projectId: "clickbutton-b17b6",
storageBucket: "clickbutton-b17b6.appspot.com",
messagingSenderId: "1061301952271"
};
firebase.initializeApp(config);

var database = firebase.database();

//On click funciton to capture user input 

$("#addTrain").on("click",function(event){
	event.preventDefault();

	//Capture input value
	var trainName = $("#train-name").val().trim();
	var destination = $("#train-destination").val().trim();
	var firstTrain = $("#train-time").val().trim();
	var frequency = $("#train-frequency").val().trim();

	//Push values to the Firebase database
	database.ref().push({
		trainName:trainName,
		destination:destination,
		firstTrain:firstTrain,
		frequency:frequency,
	});

	$("#train-name").val("");
	$("#train-destination").val("");
	$("#train-time").val("");
	$("#train-frequency").val("");

});

	//Add event listener for every new child created in Firebase database
database.ref().on("child_added",function(snapshot){

	//Assign database values to variables
	var sv = snapshot.val();
	var trainName = sv.trainName;
	var destination = sv.destination;
	var firstTrain = sv.firstTrain;
	var frequency = sv.frequency;

	//Calculate next arrival time and minutes left
	var firstTrainConverted = moment(firstTrain,"hh:mm").subtract (1,"years");
	var timeDiff = moment().diff(moment(firstTrainConverted),"minutes");
	var minutesRemaining = frequency-(timeDiff%frequency);
	var nextTrain = moment().add(minutesRemaining,"minutes");
	var nextTrainDisplay = moment(nextTrain).format("hh:mm a");
	
	//Populate a new row for every train in the database
	$("#train-input > tbody").prepend ("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +  frequency + "</td><td>" + nextTrainDisplay + "</td><td>" + minutesRemaining + ' minutes'+ "</td></tr>");
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});


