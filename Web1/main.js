
function check(){

	var question1 = document.quiz.question1.value;
	var question2 = document.quiz.question2.value;
	var question3 = document.quiz.question3.value;
	var correct = 0;


	if (question1 == "Camera" || question1 == "CAMERA" || question1 == "camera") {
		correct++;
}
	if (question2 == "answer_two") {
		correct++;
}	
	if (question3 == "answer_three") {
		correct++;
	}
	
	var messages = ["Excellent!", "Good!", "That is ok, just try your best as you can!"];
	var score;

	if (correct == 0) {
		score = 2;
	}

	if (correct > 0 && correct < 3) {
		score = 1;
	}

	if (correct == 3) {
		score = 0;
	}

	document.getElementById("after_submit").style.visibility = "visible";

	document.getElementById("message").innerHTML = messages[score];
	document.getElementById("number_correct").innerHTML = "You got " + correct + " correct.";
	}


























