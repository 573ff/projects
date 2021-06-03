var color_array = ["RED","GREEN","BLUE","WHITE","BLACK","PURPLE","PINK","YELLOW",
					"BROWN","ORANGE"];

var color_value = ["#ff3300","#009933","#0066ff","#ffffff","#000000","#9933ff",
					"#ff99ff","#ffff00","#996633","#ff8000"];


					
var button = document.getElementById("click");
var content = document.getElementById("content");

var display_box = document.getElementById("txt");
var text = document.getElementsByTagName("h2")[0];

function randInt(max){
	var nb = Math.random() * max;
	return Math.floor(nb);
}



function button_handler(){

	var k = randInt(10);	//bc size of array is 10
	console.log(k);
	var p = "Background Color : ";
	var color = color_array[k];
	p = p.concat(color);

	if(k == 4){	
		display_box.style.backgroundColor = "white";
		display_box.style.color = "black";
		content.style.backgroundColor = color_value[k];
		text.innerHTML = p ;
	}
	else{
		display_box.style.backgroundColor = "black";
		display_box.style.color = "white";
		content.style.backgroundColor = color_value[k];
		text.innerHTML = p;

	}		

	var bg_color = color_value[k];
	var nav_item_simple = document.getElementsByTagName("a")[0];
	var nav_item_hex = document.getElementsByTagName("a")[1];
	console.log(nav_item_hex);

	nav_item_simple.addEventListener("mouseenter",function(event){
		this.style.backgroundColor = bg_color;
	});
	nav_item_hex.addEventListener("mouseenter",function(event){
		this.style.backgroundColor = bg_color;
	});

	nav_item_simple.addEventListener("mouseout",function(event){
		this.style.backgroundColor = "white";
	});
	nav_item_hex.addEventListener("mouseout",function(event){
		this.style.backgroundColor = "white";
	});
}

button.addEventListener("click", button_handler);

