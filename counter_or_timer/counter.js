var counter = document.getElementById("number");
var current_number = counter.textContent;

var increase_button = document.getElementById("increase");
var reset_button = document.getElementById("reset");
var decrease_button = document.getElementById("decrease");

function increase_handler(){

	current_number++;
	counter.textContent = current_number;
	counter.style.color = "green";
	
	if(current_number < 0){
		counter.style.color = "red";
	}

	if(current_number == 0){
		counter.style.color = "black";
	}

}

function reset_handler(){

	current_number = 0;
	counter.textContent = current_number;
	counter.style.color  = "black";	

}

function decrease_handler(){

	current_number --;
	counter.textContent = current_number;
	counter.style.color = "red";	

	if (current_number > 0){
		counter.style.color = "green";
	}
	if(current_number == 0){
		counter.style.color = "black";
	}
}

increase_button.addEventListener("click",increase_handler);
reset_button.addEventListener("click",reset_handler);
decrease_button.addEventListener("click",decrease_handler);



/*
*
* TO DO: mouse enter mouse out for nav bar
*
*/
