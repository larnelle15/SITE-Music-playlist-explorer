document.addEventListener('DOMContentLoaded', function() {
    const playlistArt = document.getElementById('playlist_art');
    const playlistName = document.getElementById('playlist_name');
    const playlistCreator = document.getElementById('playlist_creator');
    const songsList = document.getElementById('songs');


    function displayRandomPlaylist(playlists) {
        const randomIndex = Math.floor(Math.random() * playlists.length);
        const randomPlaylist = playlists[randomIndex];
        currentPlaylist = randomPlaylist;

        playlistArt.src = randomPlaylist.playlist_art;
        playlistName.innerText = randomPlaylist.playlist_name;
        playlistCreator.innerText = `Creator: ${randomPlaylist.playlist_creator}`;


        let songsHTML = '';
        randomPlaylist.songs.forEach(song => {
            songsHTML += `
                <li>
                    <img src="${song.cover_art}" alt="Song cover art" class="song-cover">
                    <span class="song-title">${song.title}</span>
                    <span class="song-artist">${song.artist}</span>
                    <span class="song-duration">${song.duration}</span>
                </li>`;
        });
        songsList.innerHTML = songsHTML;
    }

    displayRandomPlaylist(data.playlists);
});