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
      this.game.checkIfEatFood();
    }, 500);
  }

  this.checkIfEnd = function() {
    if (leftGrid() || ateItself()) {
      clearInterval(timer);
      $('.grid').replaceWith('<h1>Game Over</h1>');
    };
  }

  var ateItself = function() {
    for (var i = 2; i < this.game.snake.bodyCells.length; i++) {
      if (this.game.snake.bodyCells[i][0] == this.game.snake.newHead()[0] && this.game.snake.bodyCells[i][1] == this.game.snake.newHead()[1]) {
        return true;
      }
    }
  }

  var leftGrid = function() {
    if (this.game.snake.bodyCells[0][0] < 0 || this.game.snake.bodyCells[0][0] > 19 || this.game.snake.bodyCells[0][1] < 0 || this.game.snake.bodyCells[0][1] > 19  ) {
      return true;
    };
  }

  this.checkIfEatFood = function() {
    if (this.snake.bodyCells[0][0] == this.food.position[0] && this.snake.bodyCells[0][1] == this.food.position[1]) {
      this.snake.grow = true;
      this.food.newFood();
    }
  }
}

function Snake() {
  this.bodyCells = [[10,10]];
  this.direction = 39;
  this.changeDirection();
  this.grow = false;
}

Snake.prototype = {
  render : function() {
    var cell =  $('#' + this.bodyCells[0][0] + '-' + this.bodyCells[0][1]);
    cell.addClass('snake');
  },

  newHead : function() {
    switch (this.direction) {
      case 39:
        return [this.bodyCells[0][0], this.bodyCells[0][1] + 1] ;
        break;
      case 37:
        return [this.bodyCells[0][0], this.bodyCells[0][1] - 1];
        break;
      case 38:
        return [this.bodyCells[0][0] - 1, this.bodyCells[0][1]];
        break;
      case 40:
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
    
    if (this.grow == true) {
      this.grow = false;
    } else {
      var oldTail = this.bodyCells.pop();
      var deadCell = $('#' + oldTail[0] + '-' + oldTail[1]);
      deadCell.removeClass('snake');
    };


    this.render();
  },


  changeDirection : function() {
    $(document).keydown(function(event){
      if (window.game.snake.direction%2 == event.keyCode%2) {
        return;
      } else {
        window.game.snake.direction = event.keyCode;
      }
      event.preventDefault();
    });
  },
}


function Food() {
  this.position = [Math.floor((Math.random() * 20) + 1), Math.floor((Math.random() * 20) + 1)]
  this.render();
}

Food.prototype = {
  render : function() {
    var cell =  $('#' + this.position[0] + '-' + this.position[1]);
    cell.addClass('food');
  },

  newFood : function() {
    var cell = $('#' + this.position[0] + '-' + this.position[1]);
    cell.removeClass('food');

    this.position = [Math.floor((Math.random() * 19) + 1), Math.floor((Math.random() * 19) + 1)];
    this.render();
  }
}


function Grid(size) {
  this.element = $('.grid');
}

Grid.prototype = {
  render : function() {
    var table = $('<table></table>');

    for(i=0; i<20; i++){
      var row = $('<tr></tr>');
      for(j=0; j< 20; j++){
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



 // To do
 // what happens when you hit other buttons  jjust return - it's making errors and breaking things
 //  refactor to the maxtreme
 //  increase pointes
 // increase speed with increased pointe
 // the food cannot appear in a spot that has a snake cell in it

//  sometimes the food still not there!!!
//  on open the page, it must have a play game.
//  put up on my blog somehow

