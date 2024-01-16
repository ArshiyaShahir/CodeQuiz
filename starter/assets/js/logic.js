// Initialization
var startScreen = document.getElementById("start-screen");
var questionContainer = document.getElementById("questions");
var questionTitle = document.getElementById("question-title");
var choicesContainer = document.getElementById("choices");
var time = document.getElementById("time");
var endScreen = document.getElementById("end-screen");
var feedback = document.getElementById("feedback");
var finalScore = document.getElementById("final-score");
var startBtn = document.getElementById("start");
var submitBtn = document.getElementById("submit");
var correctAudio = new Audio('assets/sfx/correct.wav');
var incorrectAudio = new Audio('assets/sfx/incorrect.wav');

var score, timerInterval, questionNumber=0, totalQuestions=questions.length;

// Attach click listener to start button
startBtn.addEventListener("click", startQuiz);

// Attach click listener to submit button
submitBtn.addEventListener("click", submitScore);

// Function to initiate timer, display first question and start the quiz
function startQuiz() {
	startScreen.classList.add("hide");
	questionContainer.classList.remove("hide");

	initTimer();
	startTimer();
	showQuestion();
}

// Function to display the question along with the options based on the index position
function showQuestion() {
	// Check if all the questions are already shown, exit on true
	if ( questionNumber == totalQuestions ) {
		stopQuiz();
		return;
	}

	// Set the question
	questionTitle.innerHTML = questions[questionNumber]['title'];

	// Parse is required to avoid displaying html tags
	var correctAnswer = parseHTML(questions[questionNumber]['answer']);
	// Prepare options html data
	var optionHTML = "";
	for (var j = 0; j < questions[questionNumber]['choices'].length; j++) {
		option = parseHTML(questions[questionNumber]['choices'][j]);
		optionHTML+= '<button onclick="validateAnswer(\''+option+'\',\''+correctAnswer+'\')">'+option+'</button></br>';
	}
	choicesContainer.innerHTML = optionHTML;
}

// Function to stop & reset timer, hide question section, display End Screen
function stopQuiz() {
	questionContainer.classList.add("hide");
	endScreen.classList.remove("hide");
	finalScore.innerHTML = time.innerHTML;
	resetTimer();
}

// Function to check the selected answer against the right answer, display if it was right or wrong and move to the next question
function validateAnswer(selectedAnswer, correctAnswer) {
	feedback.classList.remove("hide");
	if ( selectedAnswer == correctAnswer ) {
		correctAudio.play();
		feedback.innerHTML = "Correct!";
	} else {
		incorrectAudio.play();
		feedback.innerHTML = "Wrong!";
		time.innerHTML = time.innerHTML - 10;
	}
	setTimeout(function(){
		feedback.classList.add("hide");
		// Critical increment to help move to next question
		questionNumber+=1;
		showQuestion();
	},1000);
}

// Function to read user initials and store along with the score on the local storage
function submitScore() {
	var initials = document.getElementById("initials").value;
	var scores = {};
	if ( localStorage.getItem("scores") != null )
		scores = JSON.parse(localStorage.getItem("scores")); // convert string data to JSON format

	scores[initials] = finalScore.innerHTML;

	console.log(scores);
	localStorage.setItem("scores", JSON.stringify(scores)); // convert JSON array to string format
	location.href = "highscores.html"; // redirect user to scoreboard post submission
}

// Function to parse HTML tags present in a string variable to plain text
function parseHTML(htmlString) {
	return htmlString.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Function to set timer value
function initTimer() {
	time.innerHTML = "75";
}

// Function to reset timer
function resetTimer() {
	time.innerHTML = "0";
	clearTimeout(timerInterval);
}

// Function to initiate timer functionality
function startTimer() {
	var currentTime;
	timerInterval = setInterval(function(){
		currentTime = time.innerHTML;
		time.innerHTML = currentTime - 1;
		if ( currentTime - 1 <= 0 ) {
			clearTimeout(timerInterval);
			stopQuiz();
		}
	}, 1000);
}

