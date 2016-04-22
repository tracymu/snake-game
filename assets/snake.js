function Game() {
	this.grid = new Grid();
	this.grid.render();
	this.snake = new Snake();
	this.food = new Food();
};


function Snake() {
	this.column = 20;
	this.row = 20;
	this.render();
}

Snake.prototype = {
	render : function() {
		var cell =  $('#' + this.row + '-' + this.column);
		cell.addClass('snake');
	}
}


function Food() {
	this.row = Math.floor((Math.random() * 40) + 1);
	this.column = Math.floor((Math.random() * 40) + 1);
	this.render();
}

Food.prototype = {
	render : function() {
		var cell =  $('#' + this.row + '-' + this.column);
		cell.addClass('food');
	}
}


function Grid(size) {
	this.element = $('.grid');
}

Grid.prototype = {
	render : function() {
		var table = $('<table></table>');

		for(i=0; i<40; i++){
    	var row = $('<tr></tr>');
    	for(j=0; j< 40; j++){
				var col = $('<td class="cell" id ="' + i + '-' + j + '"></td>');
				row.append(col);
			};
    	table.append(row);
  	};
  	this.element.append(table);
  }
}


$(document).ready(function(){
	game = new Game();
});

