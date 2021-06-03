var button = document.getElementById("image_button");
var start_up_logo = document.getElementsByClassName("logo")[0];


function mouseOver(){
	this.style.backgroundColor = "purple";
}
function mouseOut(){
	this.style.backgroundColor = "white";
}

function out(){
	this.style.backgroundColor = "green";
}


var button_array = [];
var i = 0;
for( i = 0;i < 54; i++){
	button_array[i] = document.createElement("button");
	button_array[i].setAttribute("type", "button");
	//button_array[i].innerHTML = String.fromCharCode(i+33);

	button_array[i].style.width = "50px";
	button_array[i].style.height = "35px";
	button_array[i].style.border = "2px solid";
	button_array[i].style.backgroundColor = "white";
	button_array[i].addEventListener("mouseover",mouseOver);
	button_array[i].addEventListener("mouseout", mouseOut);
	button_array[i].style.display = "none";
	
	
}


var newDiv = document.createElement("div");
newDiv.style.display = "flex";
newDiv.style.flexDirection = "row";
newDiv.style.alignItems = "center";
newDiv.style.width = "100%";
newDiv.style.height = "50%";


var j=0;
for (j=0;j<54;j++){
	newDiv.appendChild(button_array[j]);
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

var player = document.createElement("div");
player.style.display = "flex";
player.style.flexDirection = "row";
player.style.alignItems = "center";
player.style.width = "100%";
player.style.height = "50%";

var player_array = [];
var i = 0;
for( i = 0;i < 54; i++){
	player_array[i] = document.createElement("button");
	player_array[i].setAttribute("type", "button");
	//player_array[i].innerHTML = String.fromCharCode(i+33);
	player_array[i].style.width = "50px";
	player_array[i].style.height = "35px";
	player_array[i].style.border = "2px solid";
	player_array[i].style.backgroundColor = "white";
	player_array[i].addEventListener("mouseover",mouseOver);
	player_array[i].addEventListener("mouseout", mouseOut);
	player_array[i].style.display = "none";
	
	
}

j=0;
for (j=0;j<54;j++){
	player.appendChild(player_array[j]);
}


function similar_cards(card1, card2){

	var result = new Array();

	for(var i = 0;i<8;i++){
		for(var j = 0;j<8;j++){
			if(card1[i] == card2[j]){
				result.push(i);
				result.push(j);
				
			}
		}
	}

	return result;

}



button.onclick = function() {
	start_up_logo.style.display = "none";

	/*document.body.appendChild(newDiv);
	document.body.appendChild(player);

	
	var k = 0;
	var n = 0;

	var symbol_k = [];
	var symbol_n = [];

	let i = 0;
	for(i;i<8;i++){

		k = getRandomInt(33,88);
		n = getRandomInt(33,88);

		let j=0;
		for(j;j<8;j++){
			if(k == symbol_k[j]){
				k = getRandomInt(33,88);
			}
			if(n == symbol_n[j]){
				n = getRandomInt(33,88);
			}
			if((k==n)&&(i!=7)){
				k=getRandomInt(33,88);
			}
		}


		console.log("k=",k);
		console.log("n=",n);

		newDiv.style.justifyContent = "center";
		player.style.justifyContent = "center";
		
		button_array[i].innerHTML = String.fromCharCode(k);
		button_array[i].style.display = "inline";
		symbol_k[i] = k;

		player_array[i].innerHTML = String.fromCharCode(n);
		player_array[i].style.display = "inline";
		symbol_n[i] = n;

		
	}
	let r1 = getRandomInt(0,8);
	let r2 = getRandomInt(0,8);

	let symbol_r1 = symbol_k[r1];
	player_array[r2].innerHTML = String.fromCharCode(symbol_r1);

	console.log(symbol_k);
	console.log(symbol_n);

	var common_symbol = similar_cards(symbol_k,symbol_n);
	console.log(common_symbol);

	var index_player_array = common_symbol[1]

	
	player_array[index_player_array].onclick = function(){
		player_array[index_player_array].style.backgroundColor = "green";
		player_array[index_player_array].addEventListener("mouseout",out);
	}

	*/

}

