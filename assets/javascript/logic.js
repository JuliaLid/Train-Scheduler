
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
//The following var is for my attempt to  remove the child node in Firebase on click
var databaseChildKey = "";

//On click funciton to capture user input 

$("#addTrain").on("click",function(event){
	event.preventDefault();

	//Capture input value
	var trainName = $("#train-name").val().trim();
	var destination = $("#train-destination").val().trim();
	var firstTrain = $("#train-time").val().trim();
	var frequency = $("#train-frequency").val().trim();

	
	//Validate that all fields are filled out (not a validation of whether the values are in accepted format)	
	// if (trainName.length && destination.length && firstTrain.length && frequency.length >0){
	if (trainName && destination && firstTrain && frequency !=""){
	//Push values to the Firebase database
		var newChildRef=database.ref().push({
			trainName:trainName,
			destination:destination,
			firstTrain:firstTrain,
			frequency:frequency,
		});

			var newNodeID = newChildRef.getKey();
			var newItem = {
	            id:newNodeID
	        };
	        newChildRef.update(newItem);
	

		$("#train-name").val("");
		$("#train-destination").val("");
		$("#train-time").val("");
		$("#train-frequency").val("");

	} else {
		alert("Please fill out all fields")
	};
});

	//Add event listener for every new child created in Firebase database
database.ref().on("child_added",function(snapshot){

	//Get the unique key for the child
	databaseChildKey = snapshot.key;
	console.log(databaseChildKey);
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

	var deleteTrain = $("<button>"); 
	$('#table tbody tr').append('<td><a href="#" class="btn btn-info btn-xs"><i class="fa fa-pencil"></i> Edit </a><a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a></td>');
	// var deleteTrain = $("<button>").text("Delete"); 
	
	//Populate a new row for every train in the database
	$("#train-input > tbody").prepend ("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +  frequency + "</td><td>" + nextTrainDisplay + "</td><td>" + minutesRemaining + ' minutes'+ "</td><td>" + "<button type='button' id ='remove' class='btn btn-primary disabled'><i class='fa fa-trash-o'></i></a>" + "</td></tr>");
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});


//My attempt to remove the table row AND associated child node in the database. I was successfull with the former bubt not the latter
 $(document).on("click", "#remove",function(event){
 		console.log(event)
	  	event.preventDefault();
	 	
	 	//This is my attempt to pass the key to the click event to remove the Firebase node
	 	// var key = $("#remove").attr(databaseChildKey);	
	 	// console.log(key);
	 	// database.child(key).remove(); 	
				  
	 	$(this).closest("tr").remove();
 });
