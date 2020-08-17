const searchBtn = document.querySelector('.search-btn');
const apiUrl = 'https://api.lyrics.ovh/';

if (searchBtn) {
  searchBtn.addEventListener('click', (e) => {
    const searchValue = document.getElementById('search-value').value;
    clearAllValue();
    clearFancyDisplay();
    document.querySelector('.display-title').innerHTML = 'Song Title Goes Here';
    document.querySelector('.lyric').innerHTML = 'Lyrics Goes Here';
    getSongs(searchValue);
  });
}

//GETTING SONGS BY FETCHING API DATA
function getSongs(searchTerm) {
  fetch(`${apiUrl}suggest/${searchTerm}`)
    .then((res) => res.json())
    .then((result) => {
      displaySongs(result.data);
      fancyDisplay(result.data);
    });
}

//SIMPLE DISPLAY
function displaySongs(data) {
  if (data.length >= 10) {
    var html, newHtml;
    for (var i = 0; i < 10; i++) {
      html =
        '<p class="author lead" id="song-name-%id%"><strong>%songTitle%</strong> Album by <span>%artistName%</span> <button class="btn btn-success" id="get-lyrics-%id%">Get Lyrics</button></p>';
      newHtml = html.replace('%id%', data[i].id);
      newHtml = newHtml.replace('get-lyrics-%id%', `get-lyrics-${data[i].id}`);
      //SHORTING LONG TITLE BY CALLING sanitizeData FUNCTION
      newHtml = newHtml.replace(
        '%songTitle%',
        data[i].title.length > 20 ? sanitizeData(data[i].title) : data[i].title
      );
      newHtml = newHtml.replace('%artistName%', data[i].artist.name);

      document.querySelector('.songs').insertAdjacentHTML('beforeend', newHtml);

      const songTitle = data[i].title;
      const artist = data[i].artist.name;
      const id = data[i].id;

      document.getElementById(`get-lyrics-${id}`).onclick = function () {
        getLyrics(songTitle, artist);
      };
    }
  } else if (data.length < 10) {
    var html, newHtml;
    for (var i = 0; i < data.length; i++) {
      html =
        '<p class="author lead" id="song-name-%id%"><strong>%songTitle%</strong> Album by <span>%artistName%</span> <button class="btn btn-success" id="get-lyrics-%id%">Get Lyrics</button></p>';
      newHtml = html.replace('%id%', data[i].id);
      newHtml = newHtml.replace('get-lyrics-%id%', `get-lyrics-${data[i].id}`);
      //SHORTING LONG TITLE BY CALLING sanitizeData FUNCTION
      newHtml = newHtml.replace(
        '%songTitle%',
        data[i].title.length > 15 ? sanitizeData(data[i].title) : data[i].title
      );
      newHtml = newHtml.replace('%artistName%', data[i].artist.name);

      document.querySelector('.songs').insertAdjacentHTML('beforeend', newHtml);

      const songTitle = data[i].title;
      const artist = data[i].artist.name;
      const id = data[i].id;

      document.getElementById(`get-lyrics-${id}`).onclick = function () {
        getLyrics(songTitle, artist);
      };
    }
  }
}

//GETTING LYRICS BY FETCH
function getLyrics(title, artist) {
  document.querySelector('.display-title').innerHTML = `${title} - ${artist}`;
  fetch(`${apiUrl}v1/${artist}/${title}`)
    .then((res) => res.json())
    .then((result) => {
      displayLyrics(result);
    })
    .catch((err) => {
      console.log('not found');
      showError();
    });
}
//DISPLAYING LYRICS
function displayLyrics(lyrics) {
  let temp = lyrics.lyrics.replace(/\n/g, '<br />');
  document.querySelector('.lyric').innerHTML = temp;
}

function showError() {
  document.querySelector('.lyric').innerHTML = 'Sorry Lyrics Not Found';
}

//SANITIZING LONG TITLE
function sanitizeData(title) {
  var newTitle = title.split(' ');

  if (newTitle.length > 3) {
    return `${newTitle.splice(0, 4).join(' ')}...`;
  } else {
    return `${newTitle.splice(0, newTitle.length).join(' ')}`;
  }
}

//CLEARING ALL VALUES
function clearAllValue() {
  const fields = document.querySelectorAll('.author');
  //   console.log(fields);
  var fieldsArr = Array.prototype.slice.call(fields);
  if (fieldsArr) {
    fieldsArr.forEach((element) => {
      element.remove();
    });

    document.getElementById('search-value').focus();
  }
}

//FANCY DISPLAY
function fancyDisplay(data) {
  if (data.length >= 10) {
    for (var i = 0; i < 10; i++) {
      var html =
        '<div class="single-result row align-items-center my-3 p-3"><div class="col-md-9"><h3 class="lyrics-name">%title%</h3> <p class="author lead">Album by <span>%artist%</span></p></div><div class="col-md-3 text-md-right text-center"><button class="btn btn-success" id="fancy-get-lyrics-%id%">Get Lyrics</button></div></div>';

      var newHtml = html.replace('%title%', data[i].title);
      newHtml = newHtml.replace('%artist%', data[i].artist.name);
      newHtml = newHtml.replace(
        'fancy-get-lyrics-%id%',
        `fancy-get-lyrics-${data[i].id}`
      );

      document
        .querySelector('.search-result')
        .insertAdjacentHTML('beforeend', newHtml);

      const songTitle = data[i].title;
      const artist = data[i].artist.name;
      const id = data[i].id;

      document.getElementById(`fancy-get-lyrics-${id}`).onclick = function () {
        getLyrics(songTitle, artist);
      };
    }
  } else if (data.length < 10) {
    for (var i = 0; i < data.length; i++) {
      var html =
        '<div class="single-result row align-items-center my-3 p-3"><div class="col-md-9"><h3 class="lyrics-name">%title%</h3> <p class="author lead">Album by <span>%artist%</span></p></div><div class="col-md-3 text-md-right text-center"><button class="btn btn-success" id="fancy-get-lyrics-%id%">Get Lyrics</button></div></div>';

      var newHtml = html.replace('%title%', data[i].title);
      newHtml = newHtml.replace('%artist%', data[i].artist.name);
      newHtml = newHtml.replace(
        'fancy-get-lyrics-%id%',
        `fancy-get-lyrics-${data[i].id}`
      );

      document
        .querySelector('.search-result')
        .insertAdjacentHTML('beforeend', newHtml);

      const songTitle = data[i].title;
      const artist = data[i].artist.name;
      const id = data[i].id;

      document.getElementById(`fancy-get-lyrics-${id}`).onclick = function () {
        console.log('hey');
        getLyrics(songTitle, artist);
      };
    }
  }
}

//CLEAR FANCY DISPLAY
function clearFancyDisplay() {
  const fancyDisplay = document.querySelectorAll('.single-result');
  var fancyDisplayArr = Array.prototype.slice.call(fancyDisplay);
  if (fancyDisplayArr) {
    fancyDisplayArr.forEach((element) => {
      element.remove();
    });
  }
}
