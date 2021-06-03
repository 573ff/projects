function onclickmaker() {
	var counter = 1;
	return(function(){ show_pics(counter)
						counter++; })
}

var onclickfunction = onclickmaker();

function show_pics(counter){
	console.log("here ");
	console.log(counter);
	//alert("alert");
	let request = new  XMLHttpRequest();
	request.onreadystatechange = function(){
		if(this.readyState 	 ===  XMLHttpRequest.DONE && this.status === 200){

			console.log(JSON.parse(this.responseText));
			var box = document.getElementById("picture_box");
			var tag 
			
			var picture_data = JSON.parse(this.responseText);
			
			var i;
			for (i = 0; i < picture_data.length; i++) {
				tag = document.createElement("img");
				
				tag.src = "front/images/" + picture_data[i].path;
				tag.alt = picture_data[i].picture_name;
				tag.style.width = '60%';
				box.appendChild(tag);
			}

			
		}
	}

	
	request.open('GET',"../prog_web2_back/file.php?q=" + String(counter),true);
	request.send();

};