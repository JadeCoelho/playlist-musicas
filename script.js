let playlist = [
  {
    nome: "Aerials",
    artista: "System Of A Down",
    img: "system",
    src: "Aerials",
  },
  {
    nome: "After dark",
    artista: "Mr.Kitty",
    img: "mrkitty",
    src: "afterdark",
  },
  {
    nome: "Angel",
    artista: "Massive Attack",
    img: "massive",
    src: "Angel",
  },
  {
    nome: "Black",
    artista: "Pearl Jam",
    img: "pearl",
    src: "Black",
  },
  {
    nome: "Blame me",
    artista: "Two Feet",
    img: "twofeet",
    src: "blameme",
  },
  {
    nome: "Chicago",
    artista: "Michael Jackson",
    img: "xcape",
    src: "Chicago",
  },
  {
    nome: "Come Undone",
    artista: "Duran Duran",
    img: "duranduran",
    src: "ComeUndone",
  },
  {
    nome: "Creep",
    artista: "Radiohead",
    img: "radiohead",
    src: "Creep",
  },
  {
    nome: "El tango de Roxanne",
    artista: "The End Of Iris",
    img: "endofiris",
    src: "roxanne",
  },
  {
    nome: "Every breath you take",
    artista: "The Police",
    img: "thepolice",
    src: "EveryBreathYouTake",
  },
  {
    nome: "Far from home",
    artista: "Sam Tinnesz",
    img: "sam",
    src: "farfromhome",
  },
  {
    nome: "Intro",
    artista: "The xx",
    img: "xx",
    src: "intro",
  },
  {
    nome: "Sadeness",
    artista: "Enigma",
    img: "enigma",
    src: "Sadeness",
  },
  {
    nome: "Still loving you",
    artista: "Scorpions",
    img: "scorpions",
    src: "StillLovingYou",
  },
  {
    nome: "Strangelove",
    artista: "Depeche Mode",
    img: "depechemode",
    src: "Strangelove",
  },
  {
    nome: "Without you",
    artista: "Harry Nilsson",
    img: "nilsson",
    src: "withoutyou",
  },
  {
    nome: "Would",
    artista: "Alice In Chains",
    img: "aliceinchains",
    src: "Would",
  },
  {
    nome: "Your Love",
    artista: "Glass Animals",
    img: "glassanimals",
    src: "YourLove",
  },
];

const musica = document.querySelector("#musica"),
  musicaImg = musica.querySelector(".img-musica img"),
  musicaNome = musica.querySelector(".info-musica .nome"),
  musicaArtista = musica.querySelector(".info-musica  .artista"),
  playPauseBtn = musica.querySelector(".play-pause"),
  anterior = musica.querySelector("#anterior"),
  proxima = musica.querySelector("#proxima"),
  audioPrincipal = musica.querySelector("#audio-principal"),
  progressoMusica = musica.querySelector(".progresso-musica"),
  progressoBarra = progressoMusica.querySelector(".progresso-barra"),
  listaMusica = musica.querySelector(".lista-musica"),
  maisMusica = musica.querySelector("#mais-musica"),
  fechar = listaMusica.querySelector("#fechar");

let indexMusica = Math.floor(Math.random() * playlist.length + 1);
let musicaParada = true;

window.addEventListener("load", () => {
  carregaMusica(indexMusica);
  tocandoMusica();
});

function carregaMusica(indexNum) {
  musicaNome.innerText = playlist[indexNum - 1].nome;
  musicaArtista.innerText = playlist[indexNum - 1].artista;
  musicaImg.src = `imgs/${playlist[indexNum - 1].img}.jpg`;
  audioPrincipal.src = `audios/${playlist[indexNum - 1].src}.mp3`;
}

function tocaMusica() {
  musica.classList.add("parado");
  playPauseBtn.querySelector("i").innerText = "pause";
  audioPrincipal.play();
}

function paraMusica() {
  musica.classList.remove("parado");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  audioPrincipal.pause();
}

function musicaAnterior() {
  indexMusica--;
  indexMusica < 1
    ? (indexMusica = playlist.length)
    : (indexMusica = indexMusica);
  carregaMusica(indexMusica);
  tocaMusica();
  tocandoMusica();
}

function proximaMusica() {
  indexMusica++;
  indexMusica > playlist.length
    ? (indexMusica = 1)
    : (indexMusica = indexMusica);
  carregaMusica(indexMusica);
  tocaMusica();
  tocandoMusica();
}

playPauseBtn.addEventListener("click", () => {
  const musicaTocando = musica.classList.contains("parado");
  musicaTocando ? paraMusica() : tocaMusica();
  tocandoMusica();
});

anterior.addEventListener("click", () => {
  musicaAnterior();
});

proxima.addEventListener("click", () => {
  proximaMusica();
});

audioPrincipal.addEventListener("timeupdate", (e) => {
  let tempoAtual = e.target.currentTime;
  let duracao = e.target.duration;
  let progressoWidth = (tempoAtual / duracao) * 100;
  progressoBarra.style.width = `${progressoWidth}%`;

  let musicaTempoAtual = musica.querySelector(".atual"),
    musicaDuracao = musica.querySelector(".final");
  audioPrincipal.addEventListener("loadeddata", () => {
    let audioDuracao = audioPrincipal.duration;
    let totalMin = Math.floor(audioDuracao / 60);
    let totalSeg = Math.floor(audioDuracao % 60);
    if (totalSeg < 10) {
      totalSeg = `0${totalSeg}`;
    }
    musicaDuracao.innerText = `${totalMin}:${totalSeg}`;
  });
  let minAtual = Math.floor(tempoAtual / 60);
  let segAtual = Math.floor(tempoAtual % 60);
  if (segAtual < 10) {
    segAtual = `0${segAtual}`;
  }
  musicaTempoAtual.innerText = `${minAtual}:${segAtual}`;
});

progressoMusica.addEventListener("click", (e) => {
  let progressoWidth = progressoMusica.clientWidth;
  let clickedOffsetX = e.offsetX;
  let cancaoDuracao = audioPrincipal.duration;

  audioPrincipal.currentTime =
    (clickedOffsetX / progressoWidth) * cancaoDuracao;
  tocaMusica();
  tocandoMusica();
});

const repetir = musica.querySelector("#repetir");
repetir.addEventListener("click", () => {
  let pegaTexto = repetir.innerText;
  switch (pegaTexto) {
    case "repeat":
      repetir.innerText = "repeat_one";
      repetir.setAttribute("title", "Música em loop");
      break;
    case "repeat_one":
      repetir.innerText = "shuffle";
      repetir.setAttribute("title", "Tocar aleatória");
      break;
    case "shuffle":
      repetir.innerText = "repeat";
      repetir.setAttribute("title", "Playlist em loop");
      break;
  }
});

audioPrincipal.addEventListener("ended", () => {
  let pegaTexto = repetir.innerText;
  switch (pegaTexto) {
    case "repeat":
      proximaMusica();
      break;
    case "repeat_one":
      audioPrincipal.currentTime = 0;
      carregaMusica(indexMusica);
      tocaMusica();
      break;
    case "shuffle":
      let randIndex = Math.floor(Math.random() * playlist.length + 1);
      do {
        randIndex = Math.floor(Math.random() * playlist.length + 1);
      } while (indexMusica == randIndex);
      indexMusica = randIndex;
      carregaMusica(indexMusica);
      tocaMusica();
      tocandoMusica();
      break;
  }
});

maisMusica.addEventListener("click", () => {
  listaMusica.classList.toggle("mostrar");
});
fechar.addEventListener("click", () => {
  maisMusica.click();
});

const ulTag = musica.querySelector("ul");
for (let i = 0; i < playlist.length; i++) {
  let liTag = `<li li-index="${i + 1}">
  <div class="linha-musica">
      <span>${playlist[i].nome}</span>
      <p>${playlist[i].artista}</p>
  </div>
  <span id="${playlist[i].src}" class="audio-duracao"></span>
  <audio class="${playlist[i].src}" src="audios/${playlist[i].src}.mp3"></audio>
</li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);

  let duracaoTag = ulTag.querySelector(`#${playlist[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${playlist[i].src}`);
  liAudioTag.addEventListener("loadeddata", () => {
    let duracao = liAudioTag.duration;
    let totalMin = Math.floor(duracao / 60);
    let totalSeg = Math.floor(duracao % 60);
    if (totalSeg < 10) {
      totalSeg = `0${totalSeg}`;
    }
    duracaoTag.innerText = `${totalMin}:${totalSeg}`;
    duracaoTag.setAttribute("t-duration", `${totalMin}:${totalSeg}`);
  });
}

function tocandoMusica() {
  const allLiTag = ulTag.querySelectorAll("li");

  for (const element of allLiTag) {
    let audioTag = element.querySelector(".audio-duracao");

    if (element.classList.contains("tocando")) {
      element.classList.remove("tocando");
      let adduracao = audioTag.getAttribute("t-duration");
      audioTag.innerText = adduracao;
    }

    if (element.getAttribute("li-index") == indexMusica) {
      element.classList.add("tocando");
    }

    element.setAttribute("onclick", "clicked(this)");
  }
}

function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  indexMusica = getLiIndex;
  carregaMusica(indexMusica);
  tocaMusica();
  tocandoMusica();
}
