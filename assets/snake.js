function Game() {
  var timer;

  this.init = function() {
    this.grid = new Grid();
    this.grid.render();
    this.snake = new Snake();
    this.food = new Food();
    this.start();
  }

  this.start = function() {
    timer = setInterval(function() {
      this.game.checkIfEnd();
      this.game.snake.move();
    }, 1000);
  }

  this.checkIfEnd = function() {
    if (this.snake.head[0] < 0 || this.snake.head[0] > 39 || this.snake.head[1] < 0 || this.snake.head[1] > 39  ) {
      clearInterval(timer);
      $('.grid').replaceWith('<h1>Game Over</h1>');
    };
  }
}

function Snake() {
  this.head = [20,20]
  this.direction = 'r';
  this.render();
  this.changeDirection();
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
  },
}


function Food() {
  this.random = Math.floor((Math.random() * 40) + 1);
  this.position = [this.random, this.random]
  this.render();
}

Food.prototype = {
  render : function() {
    var cell =  $('#' + this.position[0] + '-' + this.position[1]);
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
  game.init();
});

