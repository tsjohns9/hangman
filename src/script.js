var game = {
  words: [ 'Link','Zelda','Ganondorf','Navi','Epona','Great Deku Tree','Saria',
    'Majoras Mask','Dark Link','Impa','Sheik','Tingle','Great Fairy','Postman','Skullkid','Hyrule',
    'Hyrule Field','Hyrule Castle','Gerudo Valley','Zoras Domain','The Lost Woods','Kokiri Forest',
    'Lake Hylia','Lon Lon Ranch','Clock Town','Termina','Rupees','Master Sword','Hylian Shield','Mirror Shield','Ocarina of Time',
    'Hookshot','Light Arrows','Biggorn Sword','Triforce'
  ],

  //gets random word. Stores result in an array of letters
  getWord: function() {
    var randomNum = Math.floor(this.words.length * Math.random());
    this.wordInUse = this.words[randomNum].toUpperCase().split('');
    console.log(this.wordInUse)
    return this.words[randomNum];
  },

  wordInUse: [],
  guessedLetter: [],
  triesLeft: 6,
  gameIsOver: false,

  displayWordLength: function() {
    var wordLength = this.getWord().length;
    //Creates a new div and p element to display the letters of the selected word
    for (i = 0; i < wordLength; i++) {
      var newDiv = document.createElement('div');
      var newP = document.createElement('p');
      newP.textContent = this.wordInUse[i];
      newDiv.appendChild(newP);

      if (newP.textContent === ' ') {
        newDiv.classList.add('border-0');
      } else {
        newP.classList.add('d-none');  
      }

      newDiv.classList.add('letter-content');
      document.getElementById('word-container').appendChild(newDiv);
    }
  },

  //removes all child nodes and sets values back to default.
  restart: function() {
    document.getElementById('word-container').innerHTML = '';
    document.getElementById('correct-letters').innerHTML = '';
    document.getElementById('game-is-over').innerHTML = '';
    this.displayWordLength();
    this.guessedLetter = [];
    this.gameIsOver = false;
  },

  //Revealed letters have a class of border-0. Checks for a win by seeing if all letters have a class of border-0
  checkWin: function() {
    var revealedLetters = document.getElementsByClassName('border-0').length;
    var totalLetters = this.wordInUse.length;

    if (!this.gameIsOver && revealedLetters === totalLetters) {
      document.getElementById('game-is-over').textContent = 'You Win!'
      this.gameIsOver = true;
    }
  }
}

document.getElementById('restart').onclick = function() { game.restart() }
game.displayWordLength();

document.onkeyup = function() {
  var letter = event.key.toUpperCase();

  //Reveals correct letter
  var checkLetter = game.wordInUse.map((a,index) => {
    if (a === letter) {
      var parent = document.getElementById('word-container');
      var children = parent.childNodes;      
      var getP = children[index].firstChild;
      children[index].classList.add('border-0');
      getP.classList.remove('d-none');


      //Displays a list of correct letters. Does not repeat any correct letters.
      if (!game.guessedLetter.includes(a)) {
        var newDiv = document.createElement('div');
        newDiv.classList.add('correct-guess');
        newDiv.textContent = a;
        document.getElementById('correct-letters').appendChild(newDiv);
        game.guessedLetter.push(a);
      }
    }
  });

  game.checkWin();

  // if (!game.wordInUse.includes(letter) && game.triesLeft) {
  //   var children = document.getElementById('tries-left').childNodes;
  //   console.log(game.triesLeft)
  //   children[1].textContent = game.triesLeft--;
  // }

  // if (game.triesLeft === 0) {
  //   console.log(game.triesLeft)
  //   document.getElementById('tries-left').innerHTML = 'Game Over'
  // }



}