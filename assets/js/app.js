var g_emoji1;
var g_emoji2;

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function loadFromPath() {
  var cp_emoji1 = getUrlParameter('a');
  var cp_emoji2 = getUrlParameter('b');
  g_emoji1 = String.fromCodePoint(parseInt(cp_emoji1));
  g_emoji2 = String.fromCodePoint(parseInt(cp_emoji2));
};

function saveToHistory() {
  var u_emoji1 = g_emoji1.codePointAt(0);
  var u_emoji2 = g_emoji2.codePointAt(0);
  var urlBase = window.location.protocol + '//' + window.location.host;
  var url = urlBase + '?a=' + u_emoji1 + '&b=' + u_emoji2;

  if (window.location.search === '') {
    history.replaceState(null, '', url);
  } else {
    history.pushState(null, '', url);
  }
};

function generateEmoji() {
  var idx = parseInt(Math.random() * shortnames.length);
  g_emoji1 = emojione.shortnameToUnicode(shortnames[idx]);

  idx = parseInt(Math.random() * shortnames.length);
  g_emoji2 = emojione.shortnameToUnicode(shortnames[idx]);

  console.debug(g_emoji1, g_emoji2);
};

function displayEmoji() {
  var elem = $('#js_emojiContainer')[0];
  elem.innerHTML = emojione.unicodeToImage(g_emoji1 + g_emoji2);
};

function onAnotherClick(e) {
  generateEmoji();
  saveToHistory();
  displayEmoji();
};

window.addEventListener('popstate', function (e) {
  loadFromPath();
  displayEmoji();
});

$(document).ready(function () {
  emojione.imageType = 'svg';
  emojione.sprites = true;
  emojione.imagePathSVGSprites = '/assets/img/emojione.sprites.svg';

  $('.convert-emoji').each(function () {
      var original = $(this).html();
      var converted = emojione.shortnameToImage(original);
      $(this).html(converted);
  });

  if (window.location.search !== '') {
    loadFromPath();
  } else {
    generateEmoji();
    saveToHistory();
  }

  displayEmoji();
});
