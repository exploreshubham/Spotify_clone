console.log("Welcome to Spotify");

let songIndex = 0;

let songs = [
    { songName: "Fortuner", filePath: "Songs/Fortuner.mp3", coverPath: "cover.png" },
    { songName: "Gypsy", filePath: "Songs/Gypsy.mp3", coverPath: "cover.png" },
    { songName: "Hero Handa", filePath: "Songs/hero_handa.mp3", coverPath: "cover.png" },
    { songName: "Kaalo Chasmo", filePath: "Songs/kaalo_chasmo.mp3", coverPath: "cover.png" },
    { songName: "Kallo", filePath: "Songs/Kallo.mp3", coverPath: "cover.png" },
    { songName: "Lamba Lamba Ghunghat", filePath: "Songs/lamba_lamba_ghunghat.mp3", coverPath: "cover.png" },
    { songName: "Mahila Mittar", filePath: "Songs/mahila_mittar.mp3", coverPath: "cover.png" },
    { songName: "Mithe Tere Bol Pari", filePath: "Songs/bol_pari.mp3", coverPath: "cover.png" },
    { songName: "Nagan Si Lugai", filePath: "Songs/nagan_si_lugai.mp3", coverPath: "cover.png" },
    { songName: "Pind De Gerhe Ft Desi Crew", filePath: "Songs/pind_de_gerhe.mp3", coverPath: "cover.png" },
    { songName: "Solid Body Ft DJ Rohit Dahiya", filePath: "Songs/solid_body.mp3", coverPath: "cover.png" },
    { songName: "Kali Activa", filePath: "Songs/Kali_Activa.mp3", coverPath: "cover.png" },
    { songName: "Kabootar", filePath: "Songs/Kabootar.mp3", coverPath: "cover.png" },
    { songName: "Maan Meri Jaan", filePath: "Songs/Maan_Meri_Jaan.mp3", coverPath: "cover.png" },
    { songName: "Banjaara", filePath: "Songs/Banjaara.mp3", coverPath: "cover.png" },
    { songName: "Temporary Pyar kaka", filePath: "Songs/Temporary_Pyar.mp3", coverPath: "cover.png" },
    { songName: "Soulmate", filePath: "Songs/Soulmate.mp3", coverPath: "cover.png" },
    { songName: "Competition", filePath: "Songs/Competition.mp3", coverPath: "cover.png" },
    { songName: "Nas Nas Kyu Dukhe", filePath: "Songs/Nas_Nas_Kyu_Dukhe.mp3", coverPath: "cover.png" },
];

let audioElement = new Audio(songs[0].filePath);

let masterPlay = document.getElementById('masterPlay');
let myprogressBar = document.getElementById('myprogressBar');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

const updatePlayIcon = () => {
    if (audioElement.paused) {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    } else {
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
};

const playSong = (index) => {
    songIndex = index;

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;

    audioElement.play()
        .then(() => {
            makeAllPlays();

            let currentIcon = document.getElementById(songIndex.toString());

            currentIcon.classList.remove('fa-play-circle');
            currentIcon.classList.add('fa-pause-circle');

            updatePlayIcon();
        })
        .catch((error) => {
            console.log("Audio play error:", error);
        });
};

masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {

        audioElement.play();

        let currentIcon = document.getElementById(songIndex.toString());

        makeAllPlays();

        currentIcon.classList.remove('fa-play-circle');
        currentIcon.classList.add('fa-pause-circle');

    } else {

        audioElement.pause();

        makeAllPlays();
    }

    updatePlayIcon();
});

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {

    element.addEventListener('click', (e) => {

        let clickedIndex = parseInt(e.target.id);

        if (songIndex === clickedIndex && !audioElement.paused) {

            audioElement.pause();

            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');

            updatePlayIcon();

        } else {

            playSong(clickedIndex);
        }
    });
});

audioElement.addEventListener('timeupdate', () => {

    if (audioElement.duration) {

        let progress = parseInt(
            (audioElement.currentTime / audioElement.duration) * 100
        );

        myprogressBar.value = progress;
    }
});

myprogressBar.addEventListener('input', () => {

    if (audioElement.duration) {

        audioElement.currentTime =
            (myprogressBar.value * audioElement.duration) / 100;
    }
});

document.getElementById('next').addEventListener('click', () => {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    playSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    playSong(songIndex);
});

audioElement.addEventListener('ended', () => {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    playSong(songIndex);
});

const songSearchInput = document.getElementById('songSearch');
const noSongsFound = document.getElementById('noSongsFound');

songSearchInput.addEventListener('input', () => {

    const query = songSearchInput.value.toLowerCase();

    let visibleSongs = 0;

    songItems.forEach((item, index) => {

        const songName = songs[index].songName.toLowerCase();

        if (songName.includes(query)) {

            item.style.display = "flex";
            visibleSongs++;

        } else {

            item.style.display = "none";
        }
    });

    noSongsFound.hidden = visibleSongs !== 0;
});