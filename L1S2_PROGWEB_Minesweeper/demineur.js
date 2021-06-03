var my_button = document.getElementById("button");

var cellules = [];
var voisins = [];
var position_array = [];

var nb_mines = 0;
var nb_lignes = 0;
var nb_colonnes = 0;
var counter=0;

var checkbox = false;
  
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function set_to_zero(tab, l, c) {

  var q;
  var e;

  for (q = 0; q < l; q++) {
    tab.push([]);        
    for (e = 0; e < c; e++) {
      tab[q].push(0);    
    }
  }
}


function placer_mines(nb_lignes, nb_colonnes, nb_mines) {

  for (i = 0; i < nb_mines; i++) {

    var line_pos = getRandomInt(0, nb_lignes);   
    var colone_pos = getRandomInt(0, nb_colonnes);

    if (position_array[line_pos][colone_pos] == 1) { //if there is already a mine

      i -= 1;
    } 
    else {

      position_array[line_pos][colone_pos] = 1; //this is where the mines are 
    }
  }
}

function createGrid() {
    
  var grid = document.getElementById("grid");
  var colonnes_input = document.getElementById("c");
  var lignes_input = document.getElementById("l");
  var mines_input = document.getElementById("m");
  var checkbox_input = document.getElementById("ck");


  nb_colonnes = parseInt(colonnes_input.value);
  nb_lignes = parseInt(lignes_input.value);
  nb_mines = parseInt(mines_input.value);
  checkbox = (checkbox_input.checked);

  if(nb_mines >= nb_colonnes*nb_lignes){
    alert("Too many mines.");
    nb_mines = nb_colonnes*nb_lignes;
  }

  var grille = [];

  var new_ligne;        
  var i;

  grid.style.width = String(200 + nb_colonnes * 20) + "px";  
  grid.style.height = String(200 + nb_lignes * 20) + "px";


  var h = 100/nb_lignes;
  var w = 100/nb_colonnes;
  for (i = 0; i < nb_lignes; i++) {

    new_ligne = document.createElement("div");
    grille.push(new_ligne);
    grid.appendChild(grille[i]);

    grille[i].style.width = "100%";
    grille[i].style.height = String(h) + "%"; 
    console.log("h:", String(h) + "%");
    grille[i].style.borderStyle = "none";
    grille[i].style.borderColor = "black";
    grille[i].style.display = "flex";
    grille[i].style.flexDirection = "row";
    grille[i].style.justifyContent = "space-evenly";

    var j;

    cellules.push([]);

    for (j = 0; j < nb_colonnes & j < 100; j++) {

      var cell = document.createElement("div");
      cellules[i].push(cell);
      grille[i].appendChild(cellules[i][j]);

      cellules[i][j].style.backgroundColor = "white";
      cellules[i][j].style.width = String(w) + "%"; 
      cellules[i][j].style.height = "100%";
      cellules[i][j].style.borderStyle = "solid";
      cellules[i][j].style.borderWidth = "1px";
      cellules[i][j].style.borderColor = "black";
      cellules[i][j].style.borderCollapse = "collapse";
      cellules[i][j].style.textAlign = "center";
      cellules[i][j].style.backgroundColor = "#666";


    }
  }
}

function game_over(){
    
  for(i=0;i<nb_lignes;i++){
  	for(j=0;j<nb_colonnes;j++){

      cellules[i][j].innerHTML = voisins[i][j];
    }
  }
  
  var p = document.getElementById("status");
  p.innerHTML = "On going game: GAME OVER";
	
}

function playerClicked(i, j) {
    
  console.log("clicked: ", i, j);

  cellules[i][j].style.color = "white";



  if (position_array[i][j] == 1) {

    cellules[i][j].innerHTML = "M";
    game_over();
    
  } 
  else {

    cellules[i][j].innerHTML = voisins[i][j];
    counter++;
  }
  console.log("counter:",counter);
  var size = nb_colonnes*nb_lignes; 

  console.log("size: ",size);


  if (counter == size - nb_mines){
    var p = document.getElementById("status");
    p.innerHTML = "YOU WON!";
  }
  
}

function makePlayerClicked(i, j) {
    
  function func() {
    playerClicked(i, j);

  }

  return (func);
}

my_button.onclick = start_game;

function start_game() {
    
  var k;
  var l;

  voisins = [];
  position_array = [];
  cellules = [];
  counter=0;
    
  var grid = document.getElementById("grid");

  while (grid.firstChild != null) {
    grid.removeChild(grid.firstChild);
	}
  
  createGrid();

  set_to_zero(position_array, nb_lignes, nb_colonnes);

  placer_mines(nb_lignes, nb_colonnes, nb_mines);

  set_to_zero(voisins, nb_lignes, nb_colonnes);

  voisinage(position_array, voisins);


	for (k = 0; k < nb_lignes; k++) {
    for (l = 0; l < nb_colonnes; l++) {
            
      cellules[k][l].onclick = makePlayerClicked(k, l); //(k,l);

        if (checkbox == true) {

          cellules[k][l].innerHTML = voisins[k][l];
        }
      }
    }
  
    var checkbox_input = document.getElementById("ck");
    checkbox_input.checked = checkbox_input.defaultChecked;
    checkbox = false;
  
    var p = document.getElementById("status");
    p.innerHTML = "On going game";
  
}
  
function voisinage(tab, copy) {
  for (i = 0; i < nb_lignes; i++) {
    for (j = 0; j < nb_colonnes; j++) {
      if (tab[i][j] == 0) {

        //top border

        if ((i == 0) && (j == 0)) { //top corner left 
          if (tab[i][j + 1] == 1) copy[i][j] += 1;
          if (tab[i + 1][j] == 1) copy[i][j] += 1;
          if (tab[i + 1][j + 1] == 1) copy[i][j] += 1;
        } else if ((i == 0) && (j == (nb_colonnes - 1))) { //top corner right 
          if (tab[i][j - 1] == 1) copy[i][j] += 1;
          if (tab[i + 1][j - 1] == 1) copy[i][j] += 1;
          if (tab[i + 1][j] == 1) copy[i][j] += 1;
        } else if ((i == 0) && ((j > 0) || (j < (nb_colonnes - 1)))) { //others on the top border except corners 
          if (tab[i][j + 1] == 1) copy[i][j] += 1;
          if (tab[i + 1][j - 1] == 1) copy[i][j] += 1;
          if (tab[i + 1][j] == 1) copy[i][j] += 1;
          if (tab[i + 1][j + 1] == 1) copy[i][j] += 1;
          if (tab[i][j - 1] == 1) copy[i][j] += 1;
        }
        //bottom border
        else if ((i == (nb_lignes - 1)) && (j == 0)) { //4 is nb lignes-1 and this is bottom corner left
          if (tab[i - 1][j] == 1) copy[i][j] += 1;
          if (tab[i - 1][j + 1] == 1) copy[i][j] += 1;
          if (tab[i][j + 1] == 1) copy[i][j] += 1;
        } else if ((i == (nb_lignes - 1)) && (j == (nb_colonnes - 1))) { //4 is nb_lignes-1 and also this is the bottom corner right 
          if (tab[i - 1][j] == 1) copy[i][j] += 1;
          if (tab[i - 1][j - 1] == 1) copy[i][j] += 1;
          if (tab[i][j - 1] == 1) copy[i][j] += 1;
        } else if ((i == (nb_lignes - 1)) && ((j > 0) || (j < (nb_colonnes - 1)))) { //bottom elements except corners 
          if (tab[i][j - 1] == 1) copy[i][j] += 1;
          if (tab[i][j + 1] == 1) copy[i][j] += 1;
          if (tab[i - 1][j - 1] == 1) copy[i][j] += 1;
          if (tab[i - 1][j + 1] == 1) copy[i][j] += 1;
          if (tab[i - 1][j] == 1) copy[i][j] += 1;
        }

        //left border except cornes because already done in top and bottom border 
        else if ((j == 0) && ((i > 0) || (i < (nb_lignes - 1)))) { //4 being nb_lignes-1
          if (tab[i + 1][j] == 1) copy[i][j] += 1;
          if (tab[i - 1][j] == 1) copy[i][j] += 1;
          if (tab[i - 1][j + 1] == 1) copy[i][j] += 1;
          if (tab[i][j + 1] == 1) copy[i][j] += 1;
          if (tab[i + 1][j + 1] == 1) copy[i][j] += 1;
        }

        //right border ecxept corners since already done in top and bottom border 
        else if ((j == (nb_colonnes - 1)) && ((i > 0) || (i < (nb_lignes - 1)))) {
          if (tab[i - 1][j] == 1) copy[i][j] += 1;
          if (tab[i - 1][j - 1] == 1) copy[i][j] += 1;
          if (tab[i][j - 1] == 1) copy[i][j] += 1;
          if (tab[i + 1][j - 1] == 1) copy[i][j] += 1;
          if (tab[i + 1][j] == 1) copy[i][j] += 1;
        } else {
          if (tab[i - 1][j] == 1) copy[i][j] += 1;
          if (tab[i + 1][j] == 1) copy[i][j] += 1;
          if (tab[i][j - 1] == 1) copy[i][j] += 1;
          if (tab[i][j + 1] == 1) copy[i][j] += 1;
          if (tab[i - 1][j - 1] == 1) copy[i][j] += 1;
          if (tab[i + 1][j + 1] == 1) copy[i][j] += 1;
          if (tab[i - 1][j + 1] == 1) copy[i][j] += 1;
          if (tab[i + 1][j - 1] == 1) copy[i][j] += 1;
        }
      } else {
        copy[i][j] = "M";
      }
    }
  }
}
