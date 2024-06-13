
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("modal-overlay");
    const span = document.getElementsByClassName("close")[0];
    const likeBtn = document.getElementById("like-btn");
    const shuffleBtn = document.getElementById("shuffle-btn");

    let currentPlaylist = null; // Define currentPlaylist

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function openModal(playlist) {
        currentPlaylist = playlist; // Set currentPlaylist

        document.getElementById('playlist_name').innerText = playlist.playlist_name;
        document.getElementById('playlist_art').src = playlist.playlist_art;
        document.getElementById('playlist_creator').innerText = `Creator: ${playlist.playlist_creator}`;
        document.getElementById('likeCount').innerText = `Likes: ${playlist.likes}`;
        
        let songsHTML = '';
        playlist.songs.forEach(song => {
            songsHTML += `
                <li>
                    <img src="${song.cover_art}" alt="Song cover art" class="song-cover">
                    <span class="song-title">${song.title}</span>
                    <span class="song-artist">${song.artist}</span>
                    <span class="song-duration">${song.duration}</span>
                </li>`;
        });
        
        document.getElementById('songs').innerHTML = songsHTML;
        modal.style.display = "block";

        // Update like button state
        likeBtn.classList.toggle('liked', playlist.liked);
        likeBtn.onclick = function() {
            playlist.liked = !playlist.liked;
            likeBtn.classList.toggle('liked', playlist.liked);
            if (playlist.liked) {
                playlist.likes += 1;
            } else {
                playlist.likes -= 1;
            }
            document.getElementById('likeCount').innerText = `Likes: ${playlist.likes}`;
            const card = document.querySelector(`[data-id="${playlist.id}"]`);
            card.querySelector('.likeCount').innerText = `Likes: ${playlist.likes}`;
        };
    }

    // Helper function to shuffle playlist songs
    function shufflePlaylist(playlist) {
        let currentIndex = playlist.songs.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [playlist.songs[currentIndex], playlist.songs[randomIndex]] = [
                playlist.songs[randomIndex], playlist.songs[currentIndex]
            ];
        }
    }

    // Shuffle button functionality
    shuffleBtn.onclick = function() {
        if (currentPlaylist) { // Check if currentPlaylist is defined
            shufflePlaylist(currentPlaylist);
            // Update modal view with shuffled songs
            let shuffledSongsHTML = '';
            currentPlaylist.songs.forEach(song => {
                shuffledSongsHTML += `
                    <li>
                        <img src="${song.cover_art}" alt="Song cover art" class="song-cover">
                        <span class="song-title">${song.title}</span>
                        <span class="song-artist">${song.artist}</span>
                        <span class="song-duration">${song.duration}</span>
                    </li>`;
            });
            document.getElementById('songs').innerHTML = shuffledSongsHTML;
        } else {
            console.error("currentPlaylist is not defined or accessible.");
        }
    };

    function createPlaylistCards(playlists) {
        const playlistCardsContainer = document.querySelector('#container');
        playlists.forEach(playlist => {
            // Initialize likes as a number
            playlist.likes = Number(playlist.likes) || 0;
            playlist.liked = false; // Ensure the liked property is defined

            const card = document.createElement('div');
            card.classList.add('playlist-card');
            card.setAttribute('data-id', playlist.id); // Set a data-id attribute to identify the card
            card.innerHTML = `
                <img src="${playlist.playlist_art}" alt="Playlist art" class="playlist-art">
                <h2 class="playlist-title">${playlist.playlist_name}</h2>
                <p class="playlist-creator">Created by: ${playlist.playlist_creator}</p>
                <p class="likeCount">Likes: ${playlist.likes}</p>
                <button class="like-btn"><i class="far fa-heart"></i></button>
            `;
            card.addEventListener('click', (event) => {
                if (!event.target.closest('.like-btn')) {
                    openModal(playlist);
                }
            });
            card.querySelector('.like-btn').addEventListener('click', (event) => {
                event.stopPropagation();
                const likeIcon = event.target.closest('.like-btn').querySelector('.fa-heart');
                likeIcon.classList.toggle('far');
                likeIcon.classList.toggle('fas');
                card.classList.toggle('liked');
                playlist.liked = !playlist.liked;
                if (playlist.liked) {
                    playlist.likes += 1;
                } else {
                    playlist.likes -= 1;
                }
                card.querySelector('.likeCount').innerText = `Likes: ${playlist.likes}`;
                if (modal.style.display === 'block' && document.getElementById('playlist_name').innerText === playlist.playlist_name) {
                    document.getElementById('likeCount').innerText = `Likes: ${playlist.likes}`;
                }
            });
            playlistCardsContainer.appendChild(card);
        });
    }
    
    const search = document.getElementById("search");
    search.addEventListener("input", (e) => {
        const playlistCardsContainer = document.querySelector('#container');
        const value = e.target.value.toLowerCase();
        const filteredPlaylists = data.playlists.filter(playlist => playlist.playlist_name.toLowerCase().includes(value));
        
        playlistCardsContainer.innerHTML = '';
        createPlaylistCards(filteredPlaylists);
    });


    // Assume `data` is defined in your data.js file
    createPlaylistCards(data.playlists);
});
