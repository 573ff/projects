
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }




//oragnization arrays
var color_array = ["green","yellow","pink","purple","orange","red","cyan","blue","white"];

var symbol_array = [["skull","heart","car","cactus","apple","flash","pen","carrot","empty"], //1
					["question","web","clover","light","flash","lips","dolphin","moon","empty"], //2
					["glasses","heart","ying_yang","fire","man","web","exclamation","bird","empty"],//3
					["snowman","key","ying_yang","tortoise","carrot","candle","moon","sun","empty"],//4
					["tree","snowflake","dolphin","glasses","flower","carrot","droplet","dog","empty"],//5
					["ice","snowflake","flash","ghost","fire","key","hammer","cat","empty"],//6
					["heart","clock","spider","tortoise","cat","light","dots","flower","empty"],//7
					["carrot","scissors","cat","target","lips","man","ladybug","milk_bottle","empty"],//8
					["dinosaur","flash","sun","droplet","dobble","exclamation","milk_bottle","clock","empty"],//9
					["cactus","dots","lock","hammer","droplet","moon","bird","target","empty"],//10
					["bomb","tortoise","skull","canada","droplet","fire","lips","stop","empty"],//11
					["canada","carrot","anchor","hammer","horse","cheese","web","clock","empty"],//12
					["clover","scissors","droplet","heart","ghost","snowman","music","horse","empty"],//13
					["key","web","scissors","pen","dinosaur","dots","stop","dog","empty"],//14
					["car","exclamation","anchor","music","lips","flower","key","lock","empty"],//15
					["clover","hammer","apple","milk_bottle","stop","dragon","flower","ying_yang","empty"],//16
					["bomb","ice","dog","zebra","heart","milk_bottle","anchor","moon","empty"],//17
					["spider","carrot","lock","dinosaur","clover","fire","eye","zebra","empty"],//18
					["igloo","tortoise","dog","man","lock","flash","dragon","horse","empty"],//19
					["question","ghost","clown","bomb","dragon","carrot","dots","exclamation","empty"],//20
					["anchor","spider","glasses","target","stop","snowman","flash","clown","empty"],//21
					["ladybug","cheese","stop","heart","sun","question","lock","snowflake","empty"],//22
					["ghost","web","flower","skull","target","igloo","sun","zebra","empty"],//23
					["apple","zebra","droplet","key","clown","light","man","cheese","empty"],//24
					["question","dog","candle","music","clock","apple","target","fire","empty"],//25
					["man","clock","car","tree","ghost","stop","moon","eye","empty"],//26
					["hammer","dinosaur","lips","candle","clown","igloo","heart","tree","empty"],//27
					["snowflake","milk_bottle","clown","eye","cactus","tortoise","music","web","empty"],//28
					["pen","flower","ladybug","fire","horse","moon","clown","dobble","empty"],//29
					["glasses","candle","canada","pen","baby_bottle","ghost","log","light","empty"],//30
					["web","cat","apple","lock","tree","bomb","snowman","dobble","empty"],//31
					["pen","sun","spider","bomb","dolphin","music","man","hammer","empty"],//32
					["ghost","dinosaur","tortoise","anchor","bird","ladybug","apple","dolphin","empty"],//33
					["dolphin","eye","heart","dobble","key","target","dragon","canada","empty"],//34
					["igloo","fire","car","cheese","milk_bottle","dots","snowman","dolphin","empty"],//35
					["ying_yang","bomb","snowflake","dinosaur","target","light","car","horse","empty"],//36
					["moon","snowflake","apple","exclamation","spider","igloo","canada","scissors","empty"],//37
					["dobble","ying_yang","dog","ghost","cactus","lips","cheese","spider","empty"],//38
					["bird","tree","key","skull","milk_bottle","horse","question","spider","empty"],//39
					["tortoise","hammer","dobble","question","car","scissors","zebra","glasses","empty"],//40
					["flower","eye","candle","bomb","bird","cheese","scissors","flash","empty"],//41
					["cactus","exclamation","zebra","dolphin","stop","cat","horse","candle","empty"],//42
					["dots","tree","music","flah","ladybug","zebra","ying_yang","canada","empty"],//43
					["cactus","tree","dragon","light","fire","sun","scissors","anchor","empty"],//44
					["bird","zebra","snowman","snowflake","clock","lips","pen","dragon","empty"],//45
					["anchor","candle","skull","dots","man","dobble","clover","snowflake","empty"],//46
					["stop","bird","ice","carrot","igloo","dobble","music","light","empty"],//47
					["lips","ice","glasses","eye","horse","dots","apple","sun","empty"],//48
					["moon","dragon","glasses","music","cheese","dinosaur","skull","cat","empty"],//49
					["candle","web","ladybug","car","spider","droplet","ice","dragon","empty"],//50
					["droplet","igloo","cat","ying_yang","eye","anchor","pen","question","empty"],//51
					["car","bird","canada","sun","cat","dog","clown","clover","empty"],//52
					["ice","dolphin","clown","skull","lock","scissors","ying_yang","clock","emoty"],//53
					["pen","exclamation","ice","tortoise","clover","cheese","target","tree","empty"],//54
					["clover","igloo","key","clock","cactus","ladybug","glasses","bomb","empty"],//55
					];	



var start_up_logo = document.getElementById("image_button");

var player_nb = 5; //number of card loaded for player
var deck_nb = 1;   //number of card loaded for deck
					
var player_dom = document.createElement("img");
var player_mask_dom = document.createElement("img");
var deck_dom = document.createElement("img");
var deck_mask_dom = document.createElement("img");

var canvas = document.createElement("canvas");


function load_image(number,dom_object){

	if ((number<0) || (number>55)){
		return -1;
	}
	
	var picture_name = "dobble_cards/dc";
	var extension = ".jpg";
	var number_to_string = number.toString(10);
	picture_name = picture_name + number_to_string + extension;

	var alt_name = "card_";
	alt_name = alt_name + number_to_string;

	dom_object.setAttribute("src",picture_name);
	dom_object.setAttribute("alt",alt_name);
	
	return 1;
}

function load_mask(number,dom_object){

	if ((number<0) || (number>55)){
		return -1;
	}
	
	var picture_name = "dobble_masks/dm";
	var extension = ".png";
	var number_to_string = number.toString(10);
	picture_name = picture_name + number_to_string + extension;	

	var alt_name = "mask_";
	alt_name = alt_name + number_to_string;

	dom_object.setAttribute("src",picture_name);
	dom_object.setAttribute("alt",alt_name);
	
	return 1;
}

function rgb(color){

	if ((color[0] == 0) && (color[1] == 255) && (color[2] == 0)){
		return 0;
	}
	else if ((color[0] == 255) && (color[1] == 255) && (color[2] == 0)){
		return 1;
	}
	else if ((color[0] == 255) && (color[1] == 0) && (color[2] == 128)){
		return 2;
	}
	else if ((color[0] == 255) && (color[1] == 0) && (color[2] == 255)){
		return 3;
	}
	else if ((color[0] == 255) && (color[1] == 128) && (color[2] == 0)){
		return 4;
	}
	else if ((color[0] == 255) && (color[1] == 0) && (color[2] == 0)){
		return 5;
	}
	else if ((color[0] == 0) && (color[1] == 255) && (color[2] == 255)){
		return 6;
	}
	else if ((color[0] == 0) && (color[1] == 0) && (color[2] == 255)){
		return 7;
	}
	else{
		return 8;
	}


}

function player_dom_handler(event){

	var rect = event.target.getBoundingClientRect();
	var coords = new Array();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;

	coords.push(x);
	coords.push(y);

	canvas.width = player_dom.width;
	canvas.height = player_dom.height;

	canvas.getContext('2d').drawImage(player_mask_dom, 0, 0, player_mask_dom.width, player_mask_dom.height,
					0,0,canvas.width,canvas.height);

	//console.log(player_dom.naturalWidth);

	//getting the colog of the pixels 
	var color_pixel = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
	
	//getting the color of the mask 
	var color_index = rgb(color_pixel);
	console.log(color_index,player_nb,symbol_array[player_nb-1][color_index]);
	
	//getting the symbol of players card
	var symbol = symbol_array[player_nb-1][color_index];
	console.log(color_pixel);

	//checking is clicked symbol is in the deck
	var exists = check_existence(deck_nb,symbol);
	console.log(exists);
	if (exists == true) {
		document.body.removeChild(document.body.lastChild);
		document.body.removeChild(document.body.lastChild);

		dobble_step(getRandomInt(1,56), getRandomInt(1,56));
	}
	
	

}

function check_existence(card_nb,symbol){

	var i=0;
	for(i=0;i<8;i++){
		if (symbol_array[card_nb-1][i] == symbol){
			return true;
		}
	}
	return false;
}


function dobble_step(p_nb, d_nb) {
	
	player_nb = p_nb;
	deck_nb = d_nb;

	document.body.appendChild(player_dom);
	document.body.appendChild(deck_dom);
	//loading player card and its mask
	load_image(player_nb,player_dom);
	load_mask(player_nb,player_mask_dom);

	//loading deck card and its mask
	load_image(deck_nb,deck_dom);
	load_mask(deck_nb,deck_mask_dom);


	player_dom.onclick = player_dom_handler;
}

start_up_logo.onclick = function(){

	start_up_logo.style.display = "none";

	dobble_step(6, 3);

}