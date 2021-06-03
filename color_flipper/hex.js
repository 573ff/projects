var hex_codes = ["A","B","C","D","E","F","1","2","3","4","5","6","7","8","9"];
var size = 15;

					
var button = document.getElementById("click");
var content = document.getElementById("content");

var display_box = document.getElementById("txt");
var text = document.getElementsByTagName("h2")[0];

function randInt(max){
	var nb = Math.random() * max;
	return Math.floor(nb);
}


function generate_hex_code(){

	var i = 0;
	var color = "#";

	while(i<6){

		var index = randInt(15);
		var letter = hex_codes[index];
		color = color.concat(letter);
		i++;
	}

	return color;

}



function button_handler(){

	var color = generate_hex_code();
	console.log(color);
	var p = "Background Color : ";
	p = p.concat(color);
	

	if(color == "#000000"){	
		display_box.style.backgroundColor = "white";
		display_box.style.color = "black";
		content.style.backgroundColor = color;
		text.innerHTML = p;
	}
	else{
		display_box.style.backgroundColor = "black";
		display_box.style.color = "white";
		content.style.backgroundColor = color;
		text.innerHTML = p;

	}		
	

}

button.addEventListener("click", button_handler);
