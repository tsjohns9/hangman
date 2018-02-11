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

  displayWordLength: function() {
    var wordLength = this.getWord().length;
    
//Creates a new div and p element to display the letter of the selected word
    for (i = 0; i < wordLength; i++) {
      var newDiv = document.createElement('div');
      var newP = document.createElement('p');
      newP.textContent = this.wordInUse[i];
      newDiv.appendChild(newP);
      newP.classList.add('letter-visibility');
      newDiv.classList.add('letter-content');
      document.getElementById('word-container').appendChild(newDiv);
    }
  }

}

game.displayWordLength();

document.onkeyup = function() {
  var letter = event.key;

  var checkLetter = game.wordInUse.map((a,index) => {
    if (a === letter) {
      var parent = document.getElementById('word-container');
      var children = parent.childNodes;
      var getP = children[index+1].firstChild;
      getP.classList.remove('letter-visibility');
    }
  })

}