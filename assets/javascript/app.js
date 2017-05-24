var divClone = $(".gameBody").clone();
var userAnswer;
var gameTimer;
var correctCount = 0;
var incorrectCount = 0;
var timeUpCount = 0;
var indexCounter = 0;
var counter = 15;

var questionsObj = {
	questions: ["Who has attempted more 3-pointers than any other player in postseason history?", "Who has the second highest plus-minus in a season in the conference finals, minimum 70 plus-minus?", "Who was the last player with 30 PPG in a season in the playoffs vs the Spurs?", "Who has the most career games with 6 or more 3PM in the conference finals? "],
	options: [["LeBron James","Klay Thompson","Kyrie Irving","Steph Curry"],["Derek Fisher","Kevin Durant","LeBron James","Kobe Bryant"],["LeBron James","Klay Thompson","Kyrie Irving","Steph Curry"],["J.R. Smith","Klay Thompson","Ray Allen","Steph Curry"]],
	answers: ["LeBron James","Kevin Durant","Steph Curry","Steph Curry"],
	images: ["<img class='center-block' src='assets/images/lebron.png'>", "<img class='center-block' src='assets/images/durant.png'>", "<img class='center-block' src='assets/images/curry2.png'>", "<img class='center-block' src='assets/images/curry2.png'>"]
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
	$(".gameBody").html("<p class='text-center' style='color:green;'>Correct! " + "<br>" + questionsObj.answers[indexCounter] + " is the answer.</p>" + questionsObj.images[indexCounter] + "<br><p class='text-center'>Next question coming up!</p>");
	setTimeout(refresh, 3000);
}

function loseResult() {
	incorrectCount++;
	$(".gameBody").html("<p class='text-center' style='color:red;'>Incorrect! " + "<br>" + questionsObj.answers[indexCounter] + " is the answer.</p>" + questionsObj.images[indexCounter] + "<br><p class='text-center'>Next question coming up!</p>");
	setTimeout(refresh, 3000);
}

function timeUpResult() {
	timeUpCount++;
	$(".gameBody").html("<p class='text-center' style='color:red;'>Time's up! " + "<br>" + questionsObj.answers[indexCounter] + " is the answer.</p>" + questionsObj.images[indexCounter] + "<br><p class='text-center'>Next question coming up!</p>");
	setTimeout(refresh, 3000);
}

function gameResult() {
	$(".gameBody").html("<h2 class='text-center'>Results" + "</h2>" + "<p class='text-center'>Correct: " + correctCount + "</p>" + "<p class='text-center'>Wrong Answers: " + incorrectCount + "</p class='text-center'>" + "<p class='text-center'>Unanswered: " + timeUpCount + "</p>" + "<p class='text-center'><a class='btn btn-success btn-lg reset' href='#' role='button'>Play again!</a></p>");
}


$(document).ready(function() {

	function startScreen() {
		$(".gameBody").html("<br><h3 class='text-center'>Instructions</h3><p class='text-center'>You have 15 seconds per question to answer.</p><br><button type='button' class='btn btn-primary btn-lg center-block startButton'>Start!</button>");
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
	$(".gameBody").html("<h5 class='text-center'>Time Remaining: <span class='timer'>15</span></h5><h4 class='text-center'>" + questionsObj.questions[indexCounter] + "</h4><button type='button' class='btn btn-secondary btn-lg center-block answerOption btn-block'>" + questionsObj.options[indexCounter][0] + "</button><button type='button' class='btn btn-secondary btn-lg center-block answerOption btn-block'>"+questionsObj.options[indexCounter][1]+"</button><button type='button' class='btn btn-secondary btn-lg center-block answerOption btn-block'>"+questionsObj.options[indexCounter][2]+"</button><button type='button' class='btn btn-secondary btn-lg center-block answerOption btn-block'>"+questionsObj.options[indexCounter][3]+"</button>");

	// Going to try to use .text() jquery to populate answers into buttons rather than always .html()-ing in future
	// $(".gameBody").replaceWith(divClone);
	// $("#question").text(questionsObj.questions[indexCounter]);
	// $("#a1").text(questionsObj.options[indexCounter][0]);
	// $("#a2").text(questionsObj.options[indexCounter][1]);
	// $("#a3").text(questionsObj.options[indexCounter][2]);
	// $("#a4").text(questionsObj.options[indexCounter][3]);
}










