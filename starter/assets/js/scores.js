// Declaration and initialization
var highscoresContainer = document.getElementById("highscores");
var clear = document.getElementById("clear");
var highscores = JSON.parse(localStorage.getItem("scores"));
var scoreHTML = "";

// Prepare Scores HTML string
for ( var key in highscores ) {
	scoreHTML += "<li>"+key+" - "+highscores[key]+"</li>";
}
highscoresContainer.innerHTML = scoreHTML; // Insert the content to the container

clear.addEventListener("click", clearScores); // register click listener for clear button

// Function to clear scores from the local storage and the html content
function clearScores(){
	localStorage.removeItem("scores");
	highscoresContainer.innerHTML = "";
}