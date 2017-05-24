var divClone = $(".gameBody").clone();
var userAnswer;
var gameTimer;
var correctCount = 0;
var incorrectCount = 0;
var timeUpCount = 0;
var indexCounter = 0;
var counter = 15;

var questionsObj = {
	questions: ["what is A", "what is B", "what is C", "what is D"],
	options: [["a","b","c","d"],["a","b","c","d"],["a","b","c","d"],["a","b","c","d"]],
	answers: ["a","b","c","d"],
	images: ["<img class='center-block' src='assets/images/curry.png'>", "<img class='center-block' src='assets/images/curry.png'>", "<img class='center-block' src='assets/images/curry.png'>", "<img class='center-block' src='assets/images/curry.png'>"]
};

function newTimer() {
	gameTimer = setInterval(elapse, 1000);
	function elapse() {
		if (counter === 0) {
			clearInterval(gameTimer);
			timeUpResult();
		}
		if (counter > 0) { //<-------------------
			counter--;
		}
		$(".timer").html(counter);
	};
}

function refresh() {
	if (indexCounter < 3) {
		indexCounter++;
		console.log(indexCounter);
		counter = 15;
		console.log(counter);
		newQuestion();
		newTimer();
	}
	else {
		gameResult();
	}
}

function winResult() {
	correctCount++;
	$(".gameBody").html("<p class='text-center'>Correct! " + "<br>" + questionsObj.answers[indexCounter] + " is the answer.</p>" + questionsObj.images[indexCounter] + "<br><p class='text-center'>Next question coming up!</p>");
	setTimeout(refresh, 3000);
}

function loseResult() {
	incorrectCount++;
	$(".gameBody").html("<p class='text-center'>Incorrect! " + "<br>" + questionsObj.answers[indexCounter] + " is the answer.</p>" + questionsObj.images[indexCounter] + "<br><p class='text-center'>Next question coming up!</p>");
	setTimeout(refresh, 3000);
}

function timeUpResult() {
	timeUpCount++;
	$(".gameBody").html("<p class='text-center'>Time's up! " + "<br>" + questionsObj.answers[indexCounter] + " is the answer.</p>" + questionsObj.images[indexCounter] + "<br><p class='text-center'>Next question coming up!</p>");
	setTimeout(refresh, 3000);
}

function gameResult() {
	$(".gameBody").html("<h2 class='text-center'>Results" + "</h2>" + "<p class='text-center'>Correct: " + correctCount + "</p>" + "<p class='text-center'>Wrong Answers: " + incorrectCount + "</p class='text-center'>" + "<p class='text-center'>Unanswered: " + timeUpCount + "</p>" + "<p class='text-center'><a class='btn btn-success btn-lg reset' href='#' role='button'>Play again!</a></p>");
}


$(document).ready(function() {

	function startScreen() {
		$(".gameBody").html("<br><h3 class='text-center'>Instructions</h3><p class='text-center'>You have 15 seconds per question to answer. Answer 3 of the 4 questions correctly and win a prize!</p><br><button type='button' class='btn btn-primary btn-lg center-block startButton'>Start!</button>");
	}

	startScreen();

	$(".startButton").click(function() {
		$(".gameBody").replaceWith(divClone);
		newQuestion();
		newTimer();
	});


	$("body").on("click", ".answerOption", function(event){
		userAnswer = $(this).text();
		console.log(userAnswer);
		if (userAnswer === questionsObj.answers[indexCounter]) {
			clearInterval(gameTimer);
			winResult();
		}
		else {
			clearInterval(gameTimer);
			loseResult();
		}
	});

	$("body").on("click", ".reset", function(event){
		indexCounter = 0;
		correctCount = 0;
		incorrectCount = 0;
		timeUpCount = 0;
		counter = 15;
		newQuestion();
		newTimer();
	});

});

function newQuestion() {
	$(".gameBody").html("<p class='text-center timer-p'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" + questionsObj.questions[indexCounter] + "</p><button type='button' class='btn btn-secondary btn-lg center-block answerOption btn-block'>" + questionsObj.options[indexCounter][0] + "</button><button type='button' class='btn btn-secondary btn-lg center-block answerOption btn-block'>"+questionsObj.options[indexCounter][1]+"</button><button type='button' class='btn btn-secondary btn-lg center-block answerOption btn-block'>"+questionsObj.options[indexCounter][2]+"</button><button type='button' class='btn btn-secondary btn-lg center-block answerOption btn-block'>"+questionsObj.options[indexCounter][3]+"</button>");

	// Going to try to use .text() jquery to populate answers into buttons rather than always .html()-ing in future
	// $(".gameBody").replaceWith(divClone);
	// $("#question").text(questionsObj.questions[indexCounter]);
	// $("#a1").text(questionsObj.options[indexCounter][0]);
	// $("#a2").text(questionsObj.options[indexCounter][1]);
	// $("#a3").text(questionsObj.options[indexCounter][2]);
	// $("#a4").text(questionsObj.options[indexCounter][3]);
}










