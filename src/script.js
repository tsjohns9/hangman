var game = {
  words: [ 'Link','Zelda','Ganondorf','Navi','Epona','Great Deku Tree','Saria',
    'Majora','Dark Link','Impa','Sheik','Tingle','Great Fairy','Postman','Skullkid','Hyrule',
    'Hyrule Field','Hyrule Castle','Gerudo Valley','Zora\'s Domain','The Lost Woods','Kokiri Forest',
    'Lake Hylia','Lon Lon Ranch','Clock Town','Rupee','Master Sword','Hylian Shield','Mirror Shield','Ocarina of Time',
    'Hookshot','Light Arrows','Biggorn\'s Sword','Triforce'
  ],

  getWord: function() {
    var randomNum = Math.floor(this.words.length * Math.random());
    this.wordInUse = this.words[randomNum].split('');
    console.log(this.wordInUse)
    return this.words[randomNum];
  },

  wordInUse: [],
  guessedLetter: [],
  triesLeft: 6,

  displayWordLength: function() {
    var wordLength = this.getWord().length;
    //Creates a new div and p element to display the letter of the selected word
    for (i = 0; i < wordLength; i++) {
      var newDiv = document.createElement('div');
      var newP = document.createElement('p');
      newP.textContent = this.wordInUse[i];
      newDiv.appendChild(newP);
      newP.classList.add('d-none');
      newDiv.classList.add('letter-content');
      document.getElementById('word-container').appendChild(newDiv);
    }
  },

  restart: function() {
    //removes all child nodes
    document.getElementById('word-container').innerHTML = '';
    document.getElementById('correct-letters').innerHTML = '';
    this.displayWordLength();
  }
}

document.getElementById('restart').onclick = function() { game.restart() }
game.displayWordLength();

document.onkeyup = function() {
  var letter = event.key;

  //Reveals correct letter
  var checkLetter = game.wordInUse.map((a,index) => {
    if (a === letter) {
      var parent = document.getElementById('word-container');
      var children = parent.childNodes;      
      var getP = children[index].firstChild;
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