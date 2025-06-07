let now_playing = document.querySelectorAll('.now-playing');
let track_art = document.querySelectorAll('.track-art');
let track_name = document.querySelectorAll('.track-name');
let track_artist = document.querySelectorAll('.track-artist');
let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');
let like_btn = document.querySelector('.like-track');
let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');
let playlist = document.getElementById('playlist-tracks');
let favoritesTracks = document.getElementById('favorites-tracks');
let newSongsTracks = document.getElementById('new-songs-tracks');
let albumTracks = document.getElementById('album-tracks');
let artistTracks = document.getElementById('artist-tracks');
let searchResultsTracks = document.getElementById('search-results-tracks');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
let likedTracks = JSON.parse(localStorage.getItem('likedTracks')) || [];

const music_list = [
    {
        img: 'Images/starboy.jpeg',
        name: 'Starboy',
        artist: 'The Weeknd',
        music: 'Music/weekend.mp3',
        album: 'Starboy'
    },
    {
        img: 'Images/closer.jpeg',
        name: 'Closer',
        artist: 'The Chainsmokers',
        music: 'Music/closer.mp3',
        album: 'Collage'
    },
    {
        img: 'Images/enemy.jpeg',
        name: 'Enemy',
        artist: 'Imagine Dragons',
        music: 'Music/enemy.mp3',
        album: 'Arcane'
    },
    {
        img: 'Images/xxxtentacion.jpeg',
        name: 'Changes',
        artist: 'XXXTentacion',
        music: 'Music/changes.mp3',
        album: 'Sad'
    },
    {
        img: 'Images/bones.jpg',
        name: 'Bones',
        artist: 'Imagine Dragons',
        music: 'Music/Bones.mp3',
        album: 'Rock'
    },
    {
        img: 'Images/expresso.jpeg',
        name: 'Expresso',
        artist: 'Sabrina Carpenter',
        music: 'Music/Espresso.mp3',
        album: 'Sabrina Carpenter'
    },
    {
        img: 'Images/fein.jpeg',
        name: 'FE!N',
        artist: 'Travis Scott',
        music: 'Music/FEIN.mp3',
        album: 'UTOPIA'
    },
    {
        img: 'Images/gs.jpg',
        name: 'Golden Sparrow',
        artist: 'Sublahshini, Dhanush,',
        music: 'Music/Golden Sparrow.mp3',
        album: 'Nilavuku En Mel Ennadi Kobam '
    },
    {
        img: 'Images/hukum.jpeg',
        name: 'Hukum',
        artist: 'Anirudh Ravichander',
        music: 'Music/Hukum.mp3',
        album: 'Jailer'
    },
    {
        img: 'Images/lv.jpeg',
        name: 'Leviating',
        artist: 'Dua Lipa',
        music: 'Music/Levitating.mp3',
        album: 'Future Nostalgia'
    },
    {
        img: 'Images/lkv.jpeg',
        name: 'Lokiverse',
        artist: 'Anirudh Ravichander',
        music: 'Music/lokiverse.mp3',
        album: 'LCU'
    },
    {
        img: 'Images/ms.jpeg',
        name: 'Manasilaayo',
        artist: 'Anirudh Ravichander',
        music: 'Music/Manasilaayo.mp3',
        album: 'Vettayan'
    },
    {
        img: 'Images/nt.jpeg',
        name: 'Nagumomu Thaarale',
        artist: 'Sid Sriram',
        music: 'Music/Nagumomu Thaarale.mp3',
        album: 'Radhe Shyam'
    },
    {
        img: 'Images/p.jpeg',
        name: 'People',
        artist: ' Libianca',
        music: 'Music/People.mp3',
        album: 'Walk Away'
    },
    {
        img: 'Images/hit.jpeg',
        name: 'Prema Velluva',
        artist: 'Sid Sriram, Mickey J Meyer',
        music: 'Music/Prema Velluva.mp3',
        album: 'HIT-3'
    },
    {
        img: 'Images/pr.jpeg',
        name: 'Premalo',
        artist: 'Anurag Kulkarni, Sameera Bharadwaj',
        music: 'Music/Premalo.mp3',
        album: 'Court'
    },
    {
        img: 'Images/hanuman.jpeg',
        name: 'Hanuman Chalisa',
        artist: 'Bhaskaruni Sai Charan, Harshavardhan Chavali',
        music: 'Music/hanuman.mp3',
        album: 'Hanuman'
    },
    {
        img: 'Images/doctor.jpeg',
        name: 'Soul Of Doctor',
        artist: 'Anirudh Ravichander',
        music: 'Music/Soul-of-Doctor.mp3',
        album: 'Doctor'
    },
    {
        img: 'Images/krishna.jpeg',
        name: 'Tum prem ho',
        artist: 'Aishwarya Anand, Mohit Lalwani',
        music: 'Music/tumpremho.mp3',
        album: 'RadhaKrishna'
    },
    {
        img: 'Images/souraa.jpeg',
        name: 'Souraa',
        artist: 'Ritesh G Rao, and Shruthika Samudhrala',
        music: 'Music/souraa.mp3',
        album: 'Bharatyeedu 2'
    },
    {
        img: 'Images/an.jpeg',
        name: 'Anuvanuvvu',
        artist: 'Arijit Singh, Sunny M.R.',
        music: 'Music/Anuvu.mp3',
        album: 'Om Bheem Bush'
    }
];

loadTrack(track_index);
renderPlaylist();
renderFavorites();
renderNewSongs();
renderAlbums();
renderArtists();

function loadTrack(index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[index].music;
    curr_track.load();

    track_art.forEach(art => {
        art.style.backgroundImage = `url(${music_list[index].img})`;
    });
    track_name.forEach(name => {
        name.textContent = music_list[index].name;
    });
    track_artist.forEach(artist => {
        artist.textContent = music_list[index].artist;
    });

    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
    curr_track.addEventListener('error', () => alert('Error loading track!'));

    like_btn.querySelector('i').className = likedTracks.includes(index)
        ? 'fa-solid fa-heart liked'
        : 'fa-regular fa-heart';
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    loadTrack(track_index);
    playTrack();
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play().catch(() => alert('Playback failed!'));
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
}

function nextTrack() {
    if (track_index < music_list.length - 1 && !isRandom) {
        track_index += 1;
    } else if (isRandom) {
        track_index = Math.floor(Math.random() * music_list.length);
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    track_index = track_index > 0 ? track_index - 1 : music_list.length - 1;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
    localStorage.setItem('volume', volume_slider.value);
}

function likeTrack() {
    if (likedTracks.includes(track_index)) {
        likedTracks = likedTracks.filter(i => i !== track_index);
        like_btn.querySelector('i').className = 'fa-regular fa-heart';
    } else {
        likedTracks.push(track_index);
        like_btn.querySelector('i').className = 'fa-solid fa-heart liked';
    }
    localStorage.setItem('likedTracks', JSON.stringify(likedTracks));
    renderFavorites();
}

function setUpdate() {
    if (!isNaN(curr_track.duration)) {
        let seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        curr_time.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        total_duration.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    }
}

function renderPlaylist() {
    playlist.innerHTML = '';
    music_list.forEach((track, index) => {
        renderTrackCard(playlist, track, index);
    });
}

function renderFavorites() {
    favoritesTracks.innerHTML = '';
    music_list.forEach((track, index) => {
        if (likedTracks.includes(index)) {
            renderTrackCard(favoritesTracks, track, index);
        }
    });
}

function renderNewSongs() {
    newSongsTracks.innerHTML = '';
    music_list.slice(-5).forEach((track, index) => {
        renderTrackCard(newSongsTracks, track, music_list.length - 5 + index);
    });
}

function renderAlbums() {
    albumTracks.innerHTML = '';
    const albums = [...new Set(music_list.map(track => track.album))];
    albums.forEach(album => {
        let albumDiv = document.createElement('div');
        albumDiv.innerHTML = `<h3>${album}</h3>`;
        let albumList = document.createElement('div');
        albumList.className = 'track-list';
        music_list.forEach((track, index) => {
            if (track.album === album) {
                renderTrackCard(albumList, track, index);
            }
        });
        albumDiv.appendChild(albumList);
        albumTracks.appendChild(albumDiv);
    });
}

function renderArtists() {
    artistTracks.innerHTML = '';
    const artists = [...new Set(music_list.map(track => track.artist))];
    artists.forEach(artist => {
        let artistDiv = document.createElement('div');
        artistDiv.innerHTML = `<h3>${artist}</h3>`;
        let artistList = document.createElement('div');
        artistList.className = 'track-list';
        music_list.forEach((track, index) => {
            if (track.artist === artist) {
                renderTrackCard(artistList, track, index);
            }
        });
        artistDiv.appendChild(artistList);
        artistTracks.appendChild(artistDiv);
    });
}

function renderTrackCard(container, track, index) {
    let card = document.createElement('div');
    card.className = 'track-card';
    card.innerHTML = `
        <img src="${track.img}" alt="${track.name}">
        <h3>${track.name}</h3>
        <p>${track.artist}</p>
    `;
    card.onclick = () => {
        track_index = index;
        loadTrack(index);
        playTrack();
        showSection('player');
    };
    container.appendChild(card);
}

function searchTracks() {
    let query = document.getElementById('search-input').value.toLowerCase();
    searchResultsTracks.innerHTML = '';
    if (query.trim() === '') {
        showSection(document.querySelector('.section.active').id);
        return;
    }
    music_list.forEach((track, index) => {
        if (track.name.toLowerCase().includes(query) || track.artist.toLowerCase().includes(query)) {
            renderTrackCard(searchResultsTracks, track, index);
        }
    });
    showSection('search-results');
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`.nav-item[data-section="${sectionId}"]`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

// Load saved preferences
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }
    if (localStorage.getItem('volume')) {
        volume_slider.value = localStorage.getItem('volume');
        curr_track.volume = volume_slider.value / 100;
    }
    showSection('landing');
});