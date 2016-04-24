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
      this.game.eatFood();
    }, 250);
  }

  this.checkIfEnd = function() {
    if (this.snake.bodyCells[0][0] < 0 || this.snake.bodyCells[0][0] > 39 || this.snake.bodyCells[0][1] < 0 || this.snake.bodyCells[0][1] > 39  ) {
      clearInterval(timer);
      $('.grid').replaceWith('<h1>Game Over</h1>');
    };
  }

  this.eatFood = function() {
    // if (this.snake.head[0] == this.food.position[0] && this.snake.head[1] == this.food.position[1]) {
    //   this.snake.increaseSize();
    // }
  }
}

function Snake() {
  this.bodyCells = [[20,20]];
  this.direction = 'r';
  this.changeDirection();
}

Snake.prototype = {
  render : function() {
    var cell =  $('#' + this.bodyCells[0][0] + '-' + this.bodyCells[0][1]);
    cell.addClass('snake');
  },

  newHead : function() {
    switch (this.direction) {
      case 'r':
        return [this.bodyCells[0][0], this.bodyCells[0][1] + 1] ;
        break;
      case 'l':
        return [this.bodyCells[0][0], this.bodyCells[0][1] - 1];
        break;
      case 'u':
        return [this.bodyCells[0][0] - 1, this.bodyCells[0][1]];
        break;
      case 'd':
        return [this.bodyCells[0][0] + 1, this.bodyCells[0][1]];
        break;
    }
  },

  move : function() {
    var newHead = this.newHead();
    //  add new head to the beginning (one cell forward)
    this.bodyCells.unshift(newHead);
    
    var newCell = $('#' + newHead[0] + '-' + newHead[1]);
    newCell.addClass('snake');

    // remove the last cell
    var oldTail = this.bodyCells.pop();
    var deadCell = $('#' + oldTail[0] + '-' + oldTail[1]);
    deadCell.removeClass('snake');

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

  newCell : function() {
    switch (this.direction) {
      case 'r':
        return [this.head[0], this.head[1] - 1] ;
        break;
      case 'l':
        return [this.head[0], this.head[1] + 1];
        break;
      case 'u':
        return [this.head[0] + 1, this.head[1]];
        break;
      case 'd':
        return [this.head[0] - 1, this.head[1]];
        break;
    }
  },

  increaseSize : function() {
    this.bodyCells.push(this.newCell());
  }
}


function Food() {
  this.position = [Math.floor((Math.random() * 40) + 1), Math.floor((Math.random() * 40) + 1)]
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

