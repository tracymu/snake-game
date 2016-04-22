function Game(element) {
	this.element = element;
	this.snake = new Snake();
	this.food = new Food();
};


function Snake() {
	this.column = 20;
	this.row = 20;
}


function Food() {
	this.row = Math.floor((Math.random() * 40) + 1);
	this.column = Math.floor((Math.random() * 40) + 1);
}


Game.prototype = {
	render : function() {

		var table = $('<table></table>');

		for(i=0; i<40; i++){
    	var row = $('<tr></tr>');
    	for(j=0; j<40; j++){
				var col = $('<td></td>');
				if (i === this.food.row && j === this.food.column) { 
					col.addClass('food');
				} else if (i === this.snake.row && j === this.snake.column) {
					col.addClass('snake');
				};
				row.append(col);
			};

    	table.append(row);
  	};
  	this.element.append(table);

  	addEventListener("keydown", function(event) {
  		event.preventDefault();
    	console.log(event.code);
  	});
  }
}


$(document).ready(function(){
	var element = $('.grid');
	var game = new Game(element);

	game.render();
});




//  make a state class

// make a cell class with a render method, which returns the td that we want.
//  then in the loop you will call the render on that
//  and it will use the State
//  with the cell, it takes in i and j for it's coordinates


//  so the keypress changes the steate - and the game will game.render() will listen for a new state  - some kind of observer thing

