let currentMusicIndex = 0;
const music = document.querySelector('#audio')
const seekBar = document.querySelector('.seek-bar')
const songName = document.querySelector('.music-name')
const artistName = document.querySelector('.artist-name')
const disk = document.querySelector('.disk')
const currentTime = document.querySelector('.current-time')
const musicDuration = document.querySelector('.song-duration')
const playBtn = document.querySelector('.play-btn')
const forwardBtn = document.querySelector('.forward-btn')
const backwardBtn = document.querySelector('.backward-btn')
const listOfSongsElement = document.getElementById("musicList")

playBtn.addEventListener('click', () => {
    if (playBtn.className.includes("pause")) {
        music.play();
    } else music.pause();

    playBtn.classList.toggle('pause');
    disk.classList.toggle('play')
})

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
});

// IMPORTANT: AUTOPLAY FUNCTIONALITY HERE
//Constantly Update Seekbar W.R.T> value of audio tag
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
}, 500)


//AWESOME HACK since eventListener wasn't working
music.onended = function () {
    const num = setTimeout(() => {
        console.log("Changing To Next Song in 2 Seconds")
        forwardBtn.click();
    }, 2000);
}

forwardBtn.addEventListener('click', () => {
    if (currentMusicIndex >= songs.length - 1) {
        currentMusicIndex = 0;
    } else currentMusicIndex++;
    setMusic(currentMusicIndex)
    playMusic();
})
backwardBtn.addEventListener('click', () => {
    if (currentMusicIndex <= 0) {
        currentMusicIndex = songs.length - 1;
    } else currentMusicIndex--;
    setMusic(currentMusicIndex)
    playMusic();
})

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusicIndex = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;
    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        //this is since there is slight delay to load the music to audio tag
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300)
}

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause')
    disk.classList.add('play')
}

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) { min = `0${min}` };
    let sec = Math.floor(time % 60);
    if (sec < 10) { sec = `0${sec}` };
    return `${min}:${sec}`
}

// UI OPTIONS SELECTOR
const musicSelector = (music) => {
    listOfSongsElement.innerHTML += `
        <a href="${music.link}" onclick="window.event.preventDefault();setMusic(this)" > 
                ${music.name} 
        </a><br/>
    `;
}
// songs.forEach(musicSelector)
for (const [index, music] of songs.entries()) {
    listOfSongsElement.innerHTML += `
        <a href="${music.link}" onclick="window.event.preventDefault();setMusic(${index});playMusic()" > 
                ${music.name} 
        </a><br/>
    `;
}
setMusic(0)