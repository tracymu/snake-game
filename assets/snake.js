function Game() {
  this.grid = new Grid();
  this.grid.render();
  this.snake = new Snake();
  this.food = new Food();
  this.start();
  this.changeDirection();
};


Game.prototype = {
  start : function() {
    var timer;
    clearInterval(timer);
    timer = setInterval(function() {
      this.game.snake.move();
    }, 1000);
  },

  changeDirection : function() {
    var keys = {
      37 : 'l',
      38 : 'u',
      39 : 'r',
      40 : 'd'
    }

    $(document).keydown(function(event){
      window.game.snake.direction = keys[event.keyCode];
      event.preventDefault();
    });
  }
}

function Snake() {
  this.head = [20,20]
  this.direction = 'r';
  this.render();
}

Snake.prototype = {
  render : function() {
    var cell =  $('#' + this.head[0] + '-' + this.head[1]);
    cell.addClass('snake');
  },

  newHead : function() {
    switch (this.direction) {
      case 'r':
        return [this.head[0], this.head[1] + 1] ;
        break;
      case 'l':
        return [this.head[0], this.head[1] - 1];
        break;
      case 'u':
        return [this.head[0] - 1, this.head[1]];
        break;
      case 'd':
        return [this.head[0] + 1, this.head[1]];
        break;
    }
  },

  move : function() {    
    var cell =  $('#' + this.head[0] + '-' + this.head[1]);
    cell.removeClass('snake');
    this.head = this.newHead();
    this.render();
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

