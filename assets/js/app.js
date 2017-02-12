var generateName = function () {
  var idx = parseInt(Math.random() * shortnames.length);
  var emoji1 = shortnames[idx];
  idx = parseInt(Math.random() * shortnames.length);
  var emoji2 = shortnames[idx];
  var elem = $('#js_emojiContainer')[0];
  elem.innerHTML = emojione.shortnameToImage(emoji1 + emoji2);
  console.log(emoji1, emoji2);
};

$(document).ready(function () {
  emojione.imageType = 'svg';
  emojione.sprites = true;
  emojione.imagePathSVGSprites = 'assets/img/emojione.sprites.svg';

  generateName();
});
