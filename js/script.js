window.onload = function() {
  var wordContainerDiv = document.getElementById('word-container');
  var correctLettersDiv = document.getElementById('correct-letters');
  var triesLeftDiv = document.getElementById('tries-left');

  var audioElementWin = document.createElement('audio');
  var audioElementLoss = document.createElement('audio');
  audioElementWin.setAttribute('src', './assets/sounds/OOT_Get_SmallItem2.mp3');
  audioElementLoss.setAttribute('src', './assets/sounds/OOT_AdultLink_Scream2.wav');

  var game = {
    words: [ 'Link','Zelda','Ganondorf','Navi','Epona','Great Deku Tree','Saria',
      'Majoras Mask','Dark Link','Impa','Sheik','Tingle','Great Fairy','Postman','Skullkid','Hyrule',
      'Hyrule Field','Hyrule Castle','Gerudo Valley','Zoras Domain','The Lost Woods','Kokiri Forest',
      'Lake Hylia','Lon Lon Ranch','Clock Town','Termina','Rupees','Master Sword','Hylian Shield','Mirror Shield','Ocarina of Time',
      'Hookshot','Light Arrows','Biggorn Sword','Triforce'
    ],

    //will set our current word
    wordInUse: [],

    //will store our correctly guessed letters
    guessedLetter: [],

    //displays how many guesses we have left
    triesLeft: 6,

    //tracks wins/losses
    wins: 0,
    losses: 0,

    //sets to true when the game is over
    gameIsOver: false,

    //gets random word. Stores result in an array of letters
    getWord: function() {

      //random number is based off of the length of this.words.length
      var randomNum = Math.floor(this.words.length * Math.random());

      //sets our current word
      this.wordInUse = this.words[randomNum].toUpperCase().split('');
      console.log(this.wordInUse);
      return this.words[randomNum];
    },

    //Creates a new div and p element to display the letters of the selected word
    displayWordLength: function() {
      var wordLength = this.getWord().length;

      //loops through each letter
      for (i = 0; i < wordLength; i++) {

        //creates a new div tag
        var newDiv = document.createElement('div');

        //creates a new p tag
        var newP = document.createElement('p');

        //sets p content to the current letter, which is i
        newP.textContent = this.wordInUse[i];

        //adds a class of mb-0, which is used when a letter is hidden
        newP.classList.add('mb-0');

        //adds the newP variable to the newDiv variable
        newDiv.appendChild(newP);

        //Checks if current letter is a space
        if (newP.textContent === ' ') {

          //Reveals white space. revealed letters have a class of .border-0
          newDiv.classList.add('border-0');
        } else {

          //hidden letters have a class of d-none
          newP.classList.add('d-none');  
        }

        //each letter gets a class of letter-content. the class of mb-0 is used to remove the border, which reveals a letter
        newDiv.classList.add('letter-content');

        //appends the newly created div for each letter 
        wordContainerDiv.appendChild(newDiv);
      }
    },

    //removes all child nodes and sets values back to default.
    newGame: function() {
      wordContainerDiv.innerHTML = '';
      correctLettersDiv.innerHTML = '';
      triesLeftDiv.innerHTML = `<p>Tries Left </p><p>6</p>`;
      this.displayWordLength();
      this.guessedLetter = [];
      this.triesLeft = 6;
      this.gameIsOver = false;
    },

    //Revealed letters have a class of border-0. Checks for a win by seeing if all letters have a class of border-0
    checkWinLoss: function(letter) {

      //gets the win-loss-counter child elements
      var winLossCounterChildren = document.getElementById('win-loss-counter').childNodes; 

      //gets all elements in the DOM with a class of border-0. Will be used to check if the game is over.
      var revealedLetters = document.getElementsByClassName('border-0').length;

      //total letters in the word.
      var totalLetters = this.wordInUse.length;
      

      if (revealedLetters === totalLetters) {

        //game is over if all letters are revealed
        this.gameIsOver = true;
        game.wins++;

        //
        winLossCounterChildren[1].textContent = `Wins: ${game.wins}`;
        triesLeftDiv.innerHTML = `<p class="alert alert-success w-50 mx-auto" role="alert">You Win!</p>`;
        audioElementWin.play();
        setTimeout(this.newGame.bind(this), 2000);
      }
      
      if (!game.wordInUse.includes(letter)) {
        this.triesLeft--;
        if (game.triesLeft > 0) {
          triesLeftDiv.innerHTML = `<p class="m-0">Tries Left </p><p class="m-0">${game.triesLeft}</p>`;
        } else {
          this.gameIsOver = true;
          game.losses++;
          winLossCounterChildren[3].textContent = `Losses: ${game.losses}`;
          triesLeftDiv.innerHTML = `<p class="alert alert-danger w-50 mx-auto">Game Over</p>`;
          audioElementLoss.play();
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

    //only runs if a a letter is pressed
    if (!game.gameIsOver && letterCode >= 65 && letterCode <= 90 || letterCode >= 97 && letterCode <= 122) {

      //Reveals correct letter
      game.wordInUse.map((a,index) => {
        if (a === letter) {
          var children = wordContainerDiv.childNodes;      
          var getP = children[index].firstChild;
          children[index].classList.add('border-0');
          getP.classList.remove('d-none');

          //Displays a list of correct letters. Does not repeat any correct letters.
          if (!game.guessedLetter.includes(a)) {
            var newDiv = document.createElement('div');
            newDiv.classList.add('correct-guess');
            newDiv.textContent = a;
            correctLettersDiv.appendChild(newDiv);
            game.guessedLetter.push(a);
          }
        }
      });

      game.checkWinLoss(letter);
    }
  }
}