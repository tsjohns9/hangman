window.onload = function() {
  var wordContainer = document.getElementById('word-container');
  var correctLetters = document.getElementById('correct-letters');
  var gameIsOver = document.getElementById('game-is-over');
  var triesLeft = document.getElementById('tries-left');
  
  var game = {
    words: [ 'Link','Zelda','Ganondorf','Navi','Epona','Great Deku Tree','Saria',
      'Majoras Mask','Dark Link','Impa','Sheik','Tingle','Great Fairy','Postman','Skullkid','Hyrule',
      'Hyrule Field','Hyrule Castle','Gerudo Valley','Zoras Domain','The Lost Woods','Kokiri Forest',
      'Lake Hylia','Lon Lon Ranch','Clock Town','Termina','Rupees','Master Sword','Hylian Shield','Mirror Shield','Ocarina of Time',
      'Hookshot','Light Arrows','Biggorn Sword','Triforce'
    ],

    // sounds: [
    //   {win: new Audio('../assets/sounds/OOT_Get_SmallItem2.wav')}
    // ],

    wordInUse: [],
    guessedLetter: [],
    triesLeft: 6,
    wins: 0,
    losses: 0,
    gameIsOver: false,

    //gets random word. Stores result in an array of letters
    getWord: function() {
      var randomNum = Math.floor(this.words.length * Math.random());
      this.wordInUse = this.words[randomNum].toUpperCase().split('');
      console.log(this.wordInUse);
      return this.words[randomNum];
    },

    //Creates a new div and p element to display the letters of the selected word
    displayWordLength: function() {
      var wordLength = this.getWord().length;
      for (i = 0; i < wordLength; i++) {
        var newDiv = document.createElement('div');
        var newP = document.createElement('p');
        newP.textContent = this.wordInUse[i];
        newP.classList.add('mb-0');
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
    newGame: function() {
      document.getElementById('word-container').innerHTML = '';
      document.getElementById('correct-letters').innerHTML = '';
      document.getElementById('game-is-over').innerHTML = '';
      document.getElementById('tries-left').innerHTML = `<p>Tries Left </p><p>6</p>`;
      this.displayWordLength();
      this.guessedLetter = [];
      this.triesLeft = 6;
      this.gameIsOver = false;
    },

    //Revealed letters have a class of border-0. Checks for a win by seeing if all letters have a class of border-0
    checkWin: function() {
      var revealedLetters = document.getElementsByClassName('border-0').length;
      var totalLetters = this.wordInUse.length;

      if (revealedLetters === totalLetters) {
        var children = document.getElementById('win-loss-counter').childNodes;
        this.gameIsOver = true;
        game.wins++;
        children[1].textContent = `Wins: ${game.wins}`;
        document.getElementById('tries-left').innerHTML = 'You Win!';
        setTimeout(this.newGame.bind(this), 1000);
      }
    },

    checkLoss: function(letter) {
      var lossTrackerChildren = document.getElementById('win-loss-counter').childNodes;
      if (!game.wordInUse.includes(letter)) {
        var triesLeftContent = document.getElementById('tries-left');
        this.triesLeft--;

        if (game.triesLeft > 0) {
          triesLeftContent.innerHTML = `<p>Tries Left </p><p>${game.triesLeft}</p>`;
        } else {
          this.gameIsOver = true;
          game.losses++;
          lossTrackerChildren[3].textContent = `Losses: ${game.losses}`;
          document.getElementById('tries-left').innerHTML = 'Game Over';
          setTimeout(this.newGame.bind(this), 2000);
        }
      }
    }
  }

  document.getElementById('new-game').onclick = function() { game.newGame() }
  game.displayWordLength();

  document.onkeypress = function() {
    var letter = event.key.toUpperCase();
    var letterCode = letter.charCodeAt(0);

    if (!game.gameIsOver && letterCode >= 65 && letterCode <= 90 || letterCode >= 97 && letterCode <= 122) {

      //Reveals correct letter
      game.wordInUse.map((a,index) => {
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
      game.checkLoss(letter)
    }
  }
}