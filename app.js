let songidx = 1;
let currsongid = 1;
let tempsongidx = 1;
let tempsongvar = 1;
let flagValue = 0;
let audioelement = new Audio("songs/apna bana le.mp3");
let playbtn = document.getElementById("playsong");
let bar = document.getElementById("bar");
let gif = document.getElementById("playimage");
let currentsong = document.getElementById("currentsong");
let audioplaytime = document.getElementById("audioplaybacktime");
let songitem = Array.from(document.getElementsByClassName("item"));
let songs = [
  {
    songName: 'Apna Bana Le (From "Bhediya")',
    filePath: "songs/apna bana le.mp3",
    audioTime: "4:33",
  },
  {
    songName: 'Aap Jaisa Koi (From "An Action Hero")',
    filePath: "songs/aap jaisa koi.mp3",
    audioTime: "2:31",
  },
  {
    songName: 'Firecracker (From "Jayeshbhai Jordaar")',
    filePath: "songs/firecracker.mp3",
    audioTime: "2:39",
  },
  {
    songName: 'Yeh Ek Zindagi (From "Monica, O my Darling")',
    filePath: "songs/yeh ek zindagi.mp3",
    audioTime: "3:39",
  },
  {
    songName: 'Kaala Jaadu (From "Freddy")',
    filePath: "songs/kaala jaadu.mp3",
    audioTime: "3:36",
  },
  {
    songName: 'Kesariya (From "Brahmastra")',
    filePath: "songs/kesariya.mp3",
    audioTime: "2:53",
  },
  {
    songName: 'Maiyya Mainu (From "Jersey")',
    filePath: "songs/maiyya mainu.mp3",
    audioTime: "4:02",
  },
  {
    songName: 'Tere Pyaar Mein (From "Tu Jhoothi Main Makkaar")',
    filePath: "songs/tere pyaar mein.mp3",
    audioTime: "4:17",
  },
  {
    songName: 'Rait Zara Si (From "Atrangi Re")',
    filePath: "songs/rait zara si.mp3",
    audioTime: "5:06",
  },
  {
    songName: 'Tu Jo Mila (From "Bajrangi Bhaijaan")',
    filePath: "songs/tu jo mila.mp3",
    audioTime: "4:18",
  },
];

function updateplaybacktime() {
  var min = 0;
  var roundedoffcurr = Math.ceil(audioelement.currentTime);
  if (roundedoffcurr > 60) {
    min = ~~(roundedoffcurr / 60);
    var roundedoffcurr =
      roundedoffcurr - min * 60 * parseInt(roundedoffcurr / (min * 60));
  }
  if (roundedoffcurr < 10) {
    roundedoffcurr = "0" + roundedoffcurr;
  }
  audioplaytime.innerHTML = `${min}:${roundedoffcurr} / ${
    songs[songidx - 1].audioTime
  }`;
}
function scrolltosong() {
  if (flagValue == 0) {
    document
      .getElementById(songidx)
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
function playpausefn() {
  if (audioelement.paused || audioelement.currentTime <= 0) {
    currsongid = document.getElementById(songidx);
    currsongid.classList.remove("fa-play");
    currsongid.classList.add("fa-pause");
    audioelement.play();
    flagValue = 0;
    playbtn.classList.remove("fa-play");
    playbtn.classList.add("fa-pause");
    gif.src = "images/music.gif";
  } else {
    currsongid = document.getElementById(songidx);
    currsongid.classList.remove("fa-pause");
    currsongid.classList.add("fa-play");
    audioelement.pause();
    playbtn.classList.remove("fa-pause");
    playbtn.classList.add("fa-play");
    gif.src = "images/pauseimage.jpg";
  }
}
function nextfn() {
  if (songidx > songs.length - 1) {
    tempsongidx = songidx;
    songidx = 1;
  } else {
    tempsongidx = songidx;
    songidx++;
  }
  flagValue = 0;
  tempsongvar = document.getElementById(tempsongidx);
  currsongid = document.getElementById(songidx);
  if (tempsongvar.classList.contains("fa-pause")) {
    tempsongvar.classList.remove("fa-pause");
    tempsongvar.classList.add("fa-play");
  }
  currsongid.classList.remove("fa-play");
  currsongid.classList.add("fa-pause");
  audioelement.src = songs[songidx - 1].filePath;
  audioplaytime.innerHTML = `0:00 / ${songs[songidx - 1].audioTime}`;
  audioelement.currentTime = 0;
  audioelement.play();
  gif.src = "images/music.gif";
  currentsong.innerText = songs[songidx - 1].songName;
  playbtn.classList.remove("fa-play");
  playbtn.classList.add("fa-pause");
}
function prevfn() {
  if (songidx <= 1) {
    tempsongidx = songidx;
    songidx = songs.length;
  } else {
    tempsongidx = songidx;
    songidx--;
  }
  flagValue = 0;
  tempsongvar = document.getElementById(tempsongidx);
  currsongid = document.getElementById(songidx);
  if (tempsongvar.classList.contains("fa-pause")) {
    tempsongvar.classList.remove("fa-pause");
    tempsongvar.classList.add("fa-play");
  }
  currsongid.classList.remove("fa-play");
  currsongid.classList.add("fa-pause");
  audioelement.src = songs[songidx - 1].filePath;
  audioplaytime.innerHTML = `0:00 / ${songs[songidx - 1].audioTime}`;
  audioelement.currentTime = 0;
  audioelement.play();
  gif.src = "images/music.gif";
  currentsong.innerText = songs[songidx - 1].songName;
  playbtn.classList.remove("fa-play");
  playbtn.classList.add("fa-pause");
}
function makeelseplay() {
  Array.from(document.getElementsByClassName("songplay")).forEach((element) => {
    element.classList.remove("fa-pause");
    element.classList.add("fa-play");
  });
}

playbtn.addEventListener("click", playpausefn);
setInterval(updateplaybacktime, 1000);
setInterval(scrolltosong, 100);
document.querySelector(".list").addEventListener("scroll", () => {
  flagValue = 1;
});
audioelement.addEventListener("timeupdate", () => {
  progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
  bar.value = progress;
});
bar.addEventListener("change", () => {
  audioelement.currentTime = (bar.value * audioelement.duration) / 100;
});
Array.from(document.getElementsByClassName("songplay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    if (element.classList.contains("fa-play")) {
      makeelseplay();
      playbtn.classList.remove("fa-play");
      playbtn.classList.add("fa-pause");
      gif.src = "images/music.gif";
      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
      if (songidx != parseInt(e.target.id)) {
        songidx = parseInt(e.target.id);
        currentsong.innerText = songs[songidx - 1].songName;
        audioelement.src = songs[songidx - 1].filePath;
        audioelement.currentTime = 0;
        audioelement.play();
      } else {
        audioelement.play();
      }
    } else {
      e.target.classList.remove("fa-pause");
      e.target.classList.add("fa-play");
      audioelement.pause();
      gif.src = "images/pauseimage.jpg";
      playbtn.classList.remove("fa-pause");
      playbtn.classList.add("fa-play");
    }
  });
});
document.getElementById("next").addEventListener("click", nextfn);
document.getElementById("prev").addEventListener("click", prevfn);
document.body.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) {
    playpausefn();
  }
  if (e.keyCode === 37) {
    progress -= 1;
    audioelement.currentTime -= 2;
    audioelement.pause();
  }
  if (e.keyCode === 39) {
    progress += 1;
    audioelement.currentTime += 2;
    audioelement.pause();
  }
  if (e.keyCode === 188) {
    prevfn();
  }
  if (e.keyCode === 190) {
    nextfn();
  }
});
document.body.addEventListener("keyup", (e) => {
  if (e.keyCode === 37) {
    audioelement.play();
  }
  if (e.keyCode === 39) {
    audioelement.play();
  }
});
