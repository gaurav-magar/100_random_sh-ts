const moods = {
    happy: { bg: "linear-gradient(135deg,#f6d365,#fda085)", songs: [{ title: "Happy Vibes", src: "./musics/Happy.mp3" }] },
    sad: { bg: "linear-gradient(135deg,#3a6073,#16222a)", songs: [{ title: "Sad Piano", src: "./musics/Sad.mp3" }] },
    romantic: { bg: "linear-gradient(135deg,#ff758c,#ff7eb3)", songs: [{ title: "Romantic Melody", src: "./musics/Romantic.mp3" }] },
    energetic: { bg: "linear-gradient(135deg,#f83600,#f9d423)", songs: [{ title: "Energy Boost", src: "./musics/Energetic.mp3" }] },
    chill: { bg: "linear-gradient(135deg,#30cfd0,#330867)", songs: [{ title: "Chill Beats", src: "./musics/Chill.mp3" }] }
};

let currentMood = null;
let currentSongIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("songTitle");
const moodText = document.getElementById("songMood");
const coverImg = document.getElementById("coverImg");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");

document.querySelectorAll(".mood-card").forEach(card => {
    card.addEventListener("click", () => {
        const mood = card.dataset.mood;
        changeMood(mood);

        document.querySelectorAll(".mood-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
    });
});

function changeMood(mood) {
    currentMood = mood;
    currentSongIndex = 0;

    document.body.style.background = moods[mood].bg;
    coverImg.src = `images/${mood}.avif`;
    coverImg.alt = mood;
    moodText.innerText = mood.toUpperCase() + " MODE";

    loadSong();
    audio.play();
    playIcon.src = "images/pause.png";
}

function loadSong() {
    const song = moods[currentMood].songs[currentSongIndex];
    audio.src = song.src;
    title.innerText = song.title;
}


document.getElementById("nextBtn").addEventListener("click", () => {
    if (!currentMood) return;
    currentSongIndex = (currentSongIndex + 1) % moods[currentMood].songs.length;
    loadSong();
    audio.play();
    playIcon.src = "images/pause.png";
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (!currentMood) return;
    currentSongIndex = (currentSongIndex - 1 + moods[currentMood].songs.length) % moods[currentMood].songs.length;
    loadSong();
    audio.play();
    playIcon.src = "images/pause.png";
});

audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
});

progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

