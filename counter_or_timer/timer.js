
//TODO
/**
 * reset button not working
 * clearInterval() not properly shutting down
 * functions for down arrows
 * css
 */


//html objects where time is modified
var hour = document.getElementById("h");
var min = document.getElementById("m");
var sec = document.getElementById("s");

var arrow_buttons = document.querySelectorAll("button");
var size = arrow_buttons.length ;

//variables which keep up the time 
var h = 0;
var m = 0;
var s = 0;


//html buttons for up and down arrows
var increase_btn = document.getElementsByClassName("up");
var decrease_btn = document.getElementsByClassName("down");

//html button for setting the timer
var set_btn = document.getElementById("set");


// next 3 functions for the hour/min/sec when up arrow is pushed
// incrementing by 1
function increase_hour_handler(){

	h++;
	hour.innerText = h;

}

function increase_min_handler(){
	m++;
	
	if (m<60){
		min.innerText = m;
	}
	else if(m==60){
		min.innerHTML = "0";
		m = m -60;
		h++;
		hour.innerText = h;
	}
	else{
		m = m-60;
		h++;
		hour.innerText = h;	
	}
}

function increase_sec_handler(){

	s++;
	if(s<60){
		sec.innerText = s;
	}
	else if(s>=60){
		increase_min_handler();
		/*m++;
		min.innerText = m;
		*/
		s = 0;
		sec.innerText = s;
	}
	
}

//when button "SET" is pressed without any values, set everything to 0
//also when button "RESET" is pressed

function reset_to_zero(){

	h=0;
	m=0;
	s=0;

	hour.innerText = "hh";
	min.innerText = "mm";
	sec.innerText = "ss";
}

//converting from seconds to h/m/s
//returns a size 3 array with h/m/s

function convert_time(seconds){

	var time_Array = new Array();
	
	var hour = Math.floor(seconds / 3600);
	var remaining_mins = seconds - hour*3600 
	var min = Math.floor(remaining_mins/60);
	var sec = seconds - hour*3600 - min *60;
	
	time_Array.push(hour);
	time_Array.push(min);
	time_Array.push(sec);

	return time_Array;

}

function time_calculations(reset){


	var total_seconds  = h*3600+60*m+s;

	var hours_at_button_click = new Date().getHours();
	var minutes_at_button_click = new Date().getMinutes();
	var seconds_at_button_click = new Date().getSeconds();

	var time_at_btn_click_in_seconds = hours_at_button_click*3600 + 
				minutes_at_button_click*60 + seconds_at_button_click;	

	var dest_time = time_at_btn_click_in_seconds + total_seconds;

	if(reset == true){
		reset_to_zero();
		var i;
		for(i=0;i<size-1;i++){
			arrow_buttons[i].disabled = false;
		}
		//clearInterval(myfunct);
	}

	else if(total_seconds == 0){
		alert("No time set.Please set a timer.");
		reset_to_zero();
		var i;
		for(i=0;i<size-1;i++){
			arrow_buttons[i].disabled = false;
		}
		//clearInterval(myfunct);
	}

	else {

		var myfunct = setInterval(function(){
	
		
		var hours_at_end_timer = new Date().getHours();
		var minutes_at_end_timer = new Date().getMinutes();
		var seconds_at_end_timer = new Date().getSeconds();

		var time__in_sec_at_end_timer = hours_at_end_timer*3600+
			minutes_at_end_timer*60+seconds_at_end_timer;
	
		var remaining_time =  dest_time - time__in_sec_at_end_timer;

		var time_Array;
		time_Array = convert_time(remaining_time);
		
		h = time_Array[0];
		m = time_Array[1];
		s = time_Array[2];

		hour.innerHTML = h;
		min.innerHTML = m;
		sec.innerHTML =s;
	
		//end of the timer
		if(dest_time == time__in_sec_at_end_timer){	

			document.title = "Timer Done!";

			var bell = new Audio("bell_medium_large_bell.mp3");
			bell.play();
			reset_to_zero();
			var i;
			for(i=0;i<size-1;i++){
				arrow_buttons[i].disabled = false;
			}
			clearInterval(myfunct);

		}
		
		},1000);	
	}

}


//setting the timer 

function set_timer_button_handler(){


	//if value not entered for a field (h/m/s) then set it to 0
	if(hour.innerText == "hh"){
		hour.innerHTML = "0";
		h=0;
	}
	
	if(min.innerText == "mm"){
		min.innerHTML = "0";
		m=0;
	}

	if(sec.innerText == "ss"){
		sec.innerHTML = "0";
		s=0;
	}




	//when button "SET" is pressed "RESET" appears 
	// a new timer can be set if "RESET" is pressed
	//when "RESET" is pressed "SET" appears and will start the timer

	

	if(set_btn.innerText == "SET"){
		set_btn.innerText = "RESET";

		//disable arrow buttons
		var i;
		for(i=0;i<size-1;i++){
			arrow_buttons[i].disabled = true;
		}

		//start the countown
		var reset = false;
		time_calculations(reset);
		

	}
	else{

		document.title = "TIMER";
		//reset_to_zero();

		//enable arrow buttons back
		
		var reset = false;
		time_calculations(reset);
	

		set_btn.innerText = "RESET";

		
	}


	
}



increase_btn[0].addEventListener("click",increase_hour_handler);
increase_btn[1].addEventListener("click",increase_min_handler);
increase_btn[2].addEventListener("click",increase_sec_handler);
set_btn.addEventListener("click",set_timer_button_handler);

