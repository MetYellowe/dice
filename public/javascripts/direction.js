window.onload = function() {
  nicknameAppearance.charByCharFirstNick();
  nicknameAppearance.charByCharSecondNick();
};

var listener = function(e) {

  if(e.keyCode == 13) {
    
    infoMessage.remove();

    removePreviousAnimation();

    addAnimation();
    
    soundOfDice();

    setTimeout(()=> {
      resultOfGame.makeChangeOfScrore();
      coin.createCoin1(count);
      coin.createCoin2(count);
    }, 5000);

  }

}

document.addEventListener('keydown', listener);

function addAnimation() {

  document.removeEventListener('keydown', listener);
  setTimeout(function() {
    document.addEventListener('keydown', listener);
  }, 5000);

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  var arrOfClass1 = ['play1-1', 'play1-2', 'play1-3', 'play1-4', 'play1-5', 'play1-6'];
  cube1.classList.add(arrOfClass1[getRandomInt(6)]);

  var arrOfClass2 = ['play2-1', 'play2-2', 'play2-3', 'play2-4', 'play2-5', 'play2-6'];
  cube2.classList.add(arrOfClass2[getRandomInt(6)]);

}

function removePreviousAnimation() {

  var cubeClasses1 = Object.values(cube1.classList);
  var cubeClasses2 = Object.values(cube2.classList);

  if(cubeClasses1.length > 2) {
    cube1.classList.remove(cubeClasses1[2]);
    cube2.classList.remove(cubeClasses2[2]);
    cube1.style.cssText = `
      position: absolute;
      top: 30px;
      left: 30px;
    `;
    cube2.style.top = 0;
    cube2.style.left = document.documentElement.clientWidth - cube2.style.width + 'px';
  }
  
}  

var resultOfGame = {
  
  score1: 1,
  score2: 1,
  arrOfClass1: function() {
    return ['play1-1', 'play1-2', 'play1-3', 'play1-4', 'play1-5', 'play1-6'];
  },
  arrOfClass2: function() {
    return ['play2-1', 'play2-2', 'play2-3', 'play2-4', 'play2-5', 'play2-6'];
  },
  result1: function() {
    var cubeClasses1 = Object.values(cube1.classList);
    return this.arrOfClass1().indexOf(cubeClasses1[2]);
  },
  result2: function() {
    var cubeClasses2 = Object.values(cube2.classList);
    return this.arrOfClass2().indexOf(cubeClasses2[2]);
  },
  makeChangeOfScrore: function() {
    if(this.result1() > this.result2()) {
      table1.innerHTML = this.score1++;
    } else if(this.result2() > this.result1()) {
      table2.innerHTML = this.score2++;
    } else {
      table1.innerHTML = this.score1++;
      table2.innerHTML = this.score2++;
    }
  }

};

function soundOfDice() {
    soundDice.play();  
}

var coin = {
    ti1: function() {
      return table1.innerHTML;
    },
    ti2: function() {
      return table2.innerHTML;
    },
    blueprintOfCoin: function(csl) {
      
      var c = document.createElement('div');
      var p = document.createElement('div');
      var fr = document.createElement('div');
      var ba = document.createElement('div');
      c.classList.add('c');
      c.style.top = 0;
      c.style.left = csl + 'px';
      p.classList.add('p', 'bv');
      fr.classList.add('fr', 'f');
      ba.classList.add('ba', 'f');
      document.body.appendChild(c);
      c.appendChild(p);
      p.appendChild(fr);
      p.appendChild(ba);
      fr.innerHTML = 'GOLD<br>9999';
    },
    awardCeremony: function(nickPlace) {

      document.removeEventListener('keydown', listener);

      var wiw1 = this.ti1();
      var wiw2 = this.ti2();
      function nickOfWinner() {
        var str = '';
        for(elem of nickPlace.children) {
          if(elem.tagName == 'SPAN') {
            str += elem.innerHTML;
          } else if(elem.tagName == 'P') {
            for(span of elem.children) {
              str += span.innerHTML;
            }
          }
        }
        return str + ' is the Winner!';
      }
      var messageAboutDraw = 'Match ended with draw. Try again!';
      var arrOfChar = [];
      var arrOfDraw = [];
      for(char of nickOfWinner()) {
        arrOfChar.push(char);
      }
      for(draw of messageAboutDraw) {
        arrOfDraw.push(draw);
      }
      var numberOfArrayElements = '';
      if(wiw1 == 9 && wiw2 == 9) {
        numberOfArrayElements = arrOfDraw.length;
      } else {
        numberOfArrayElements = arrOfChar.length;
      }
      var timeout = setInterval(function() {
        var aoc = arrOfChar;
        var aod = arrOfDraw;
        placeChars(aoc[0], aod[0]);
        aoc.shift();
        aod.shift();
      }, 500);
      setTimeout(function() {
        clearInterval(timeout);
      }, numberOfArrayElements * 500);
      
      function placeChars(char, draw) {
        var span = document.createElement('span');
        if(wiw1 == 9 && wiw2 != 9) {
          span.classList.add('first-gamer');
          span.innerHTML = char;
        } else if(wiw2 == 9 && wiw1 != 9) {
          span.classList.add('second-gamer');
          span.innerHTML = char;
        } else if(wiw1 == 9 && wiw2 == 9) {
          span.classList.add('draw');
          span.innerHTML = draw;
        }
        cloth.insertAdjacentElement('beforeEnd', span);
      }
    
    },
    countCoin1: 0,
    countCoin2: 0,
    createCoin1: function() {
        if(this.ti1() == 3 && this.countCoin1 == 0) {
          soundCoin2.play();
          this.blueprintOfCoin(320);
          this.countCoin1 = 6;
          console.log(this.createCoin1());
        } else if(this.ti1() == 6 && this.countCoin1 == 6) {
          soundCoin2.play();
          this.blueprintOfCoin(440);
          this.countCoin1 = 0;
        } else if(this.ti1() == 9 && this.ti2() != 9) {
          soundCoin1.play();
          this.blueprintOfCoin(560);
          this.awardCeremony(nickPlace1);
        } else if(this.ti1() == 9 && this.ti2() == 9) {
          soundCoin1.play();
          this.blueprintOfCoin(560);
        }
    },
    createCoin2: function() {
      if(this.ti2() == 3 && this.countCoin2 == 0) {
          soundCoin2.play();
          this.blueprintOfCoin(950);
          this.countCoin2 = 6;
      } else if(this.ti2() == 6 && this.countCoin2 == 6) {
          soundCoin2.play();
          this.blueprintOfCoin(830);
          this.countCoin2 = 0;
      } else if(this.ti2() == 9 && this.ti1() != 9) {
          soundCoin2.play();
          this.blueprintOfCoin(710);
          this.awardCeremony(nickPlace2);
      } else if(this.ti2() == 9 && this.ti1() == 9) {
          soundCoin2.play();
          this.blueprintOfCoin(710);
          this.awardCeremony();
      }
  }
};

nicknameAppearance = {
  firstNick: function() { return cloth.firstChild.innerHTML; },
  secondNick: function() { return cloth.firstChild.nextElementSibling.innerHTML; },
  charByCharFirstNick: function() {
    var firstNickLength = this.firstNick().length;
    var arr1 = [];
    var p = document.createElement('p');
    nickPlace1.appendChild(p);
    for(char of this.firstNick()) {
      arr1.push(char);
    }
    var timerid = setInterval(function() {
      var spanForNick1 = document.createElement('span');
      spanForNick1.classList.add('span');
      if(arr1.includes(' ')) {
        spanForNick1.innerHTML = arr1[0];
        p.insertAdjacentElement('beforeEnd', spanForNick1);
        arr1.shift();
      } else {
        spanForNick1.innerHTML = arr1[0];
        nickPlace1.insertAdjacentElement('beforeEnd', spanForNick1);
        arr1.shift();
      }
    }, 500);
    setTimeout(function() {
      clearInterval(timerid);
    }, firstNickLength * 500);
  },
  charByCharSecondNick: function() {
    var secondNickLength = this.secondNick().length;
    var arr2 = [];
    var p = document.createElement('p');
    nickPlace2.appendChild(p);
    for(char of this.secondNick()) {
      arr2.push(char);
    }
    var timerid = setInterval(function() {
      var spanForNick2 = document.createElement('span');
      spanForNick2.classList.add('span');
      if(arr2.includes(' ')) {
        p.appendChild(spanForNick2);
        spanForNick2.innerHTML = arr2[0];
        arr2.shift();
      } else {
        spanForNick2.innerHTML = arr2[0];
        nickPlace2.insertAdjacentElement('beforeEnd', spanForNick2);
        arr2.shift();
      }
    }, 500);
    setTimeout(function() {
      clearInterval(timerid);
    }, secondNickLength * 500);
  }
};
