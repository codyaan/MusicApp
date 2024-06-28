// Variables 

// Variables for SideBar
let homeTab = document.querySelector('.home');
let popularSongsTab = document.querySelector('.popular-songs');
let artistsTab = document.querySelector('.artists');

let tabs = document.querySelectorAll('.tab');

let sideBar = document.querySelector('.side-bar');
let listItems = document.querySelectorAll('.li-items');

let currentSong = new Audio();

let linksList = [];
// ------------------------------------------------------------


// Adding logic to switch tabs when the nav buttons are clicked 

// For Home Tab 
home.addEventListener('click', ()=>{
    tabs.forEach((e)=>{
        e.style.zIndex = "0"
    })
    homeTab.style.zIndex = "1"
})





// For Popular songs Tab 
popularSongs.addEventListener('click', ()=>{
    tabs.forEach((e)=>{
        e.style.zIndex = "0"
    })
    popularSongsTab.style.zIndex = "1"
})





// For artists Tab 
artists.addEventListener('click', ()=>{
    tabs.forEach((e)=>{
        e.style.zIndex = "0"
    })
    artistsTab.style.zIndex = "1"
})







// For Welcome btn 
welcomeBtn.addEventListener('click', () => {
    tabs.forEach((e) => {
        e.style.zIndex = "0";
    });
    homeTab.style.zIndex = "1";
});



// For library Btn 
libraryBtn.addEventListener('click', () => {
    tabs.forEach((e) => {
        e.style.zIndex = "0";
    });
    artistsTab.style.zIndex = "1"
});



// Adding the hamburger logic 
hamburger.addEventListener('click', () => {
    sideBar.style.left = "0";
});



cross.addEventListener('click', () => {
    sideBar.style.left = "-200%";
});




listItems.forEach((e) => {
    e.addEventListener('click', () => {
        sideBar.style.left = "-200%";
    });
});












// ------------------------getAllSongs Function and related functions ------------------------------------
// Fetching all the songs from the "All songs" folder
async function getAllSongs() {
    const repoURL = "https://api.github.com/repos/codyaan/MusicApp/contents/All%20songs";

    try {
        let rawSongs = await fetch(repoURL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (!rawSongs.ok) {
            throw new Error(`HTTP error! status: ${rawSongs.status}`);
        }
        // Parsing raw data to json 
        let allSongs = await rawSongs.json();



        // for loop to extract links, title, artist, image link and to make song cards 
        allSongs.forEach(song => {

            // Checking if the link contains .mp3 to proceed further
            if (song.name.endsWith(".mp3")) {
                // Extracting the song url 
                let songUrl = song.download_url;
                // Adding the song url to the linksList array 
                linksList.push(songUrl);

                // Creating variables for image source, song name and artist name 
                let imgSrc = song.name.replace(".mp3", "").split("-")[2].replace("bit.ly", "bit.ly/");
                let songName = song.name.replace(".mp3", "").split("-")[0].replace("bit.ly", "bit.ly/");
                let artistName = song.name.replace(".mp3", "").split("-")[1].replace("bit.ly", "bit.ly/");

                createSongCard(imgSrc, songName, artistName, songUrl);
            }
        });

        let songCard = document.querySelectorAll('.song-card');

        // Adding logic to play the song 
        songCard.forEach((card) => {

            card.addEventListener('click', () => {

                let songName = card.querySelector('.song-title').innerHTML;
                let artistName = card.querySelector('.song-artist').innerHTML;
                let link = card.getAttribute('data-url');

                playSong(link, songName, artistName);
            });
        });

        

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}








// Function to create song cards 
const createSongCard = (imgSrc, title, artistName, link) => {
    let div = `<div class="song-card" data-url="${link}">
                    <div class="song-image"><img src="https://${imgSrc}" alt="">
                        <i class="fa-solid fa-circle-play" style="color: #03aed2;"></i>
                    </div>
                    <div class="song-title">${title}</div>
                    <div class="song-artist">${artistName}</div>
                </div>`;
    homeTab.innerHTML += div;
}
// ---------------------------------------------------------------------------------------------------------------

















// ------------------------ getPopularSongs Function and related functions ------------------------------------
// Fetching all the songs from the "All songs" folder
async function getPopularSongs() {
    const repoURL = "https://api.github.com/repos/codyaan/MusicApp/contents/Popular%20songs";

    try {
        let rawSongs = await fetch(repoURL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (!rawSongs.ok) {
            throw new Error(`HTTP error! status: ${rawSongs.status}`);
        }
        // Parsing raw data to json 
        let allSongs = await rawSongs.json();

        // for loop to extract links, title, artist, image link and to make song cards 
        allSongs.forEach(song => {

            // Checking if the link contains .mp3 to proceed further
            if (song.name.endsWith(".mp3")) {


                // Extracting the song url 
                let songUrl = song.download_url;

                // Adding the song url to the linksList array 
                linksList.push(songUrl);

                // Creating variables for image source, song name and artist name 
                let imgSrc = song.name.replace(".mp3", "").split("-")[2].replace("bit.ly", "bit.ly/");
                let songName = song.name.replace(".mp3", "").split("-")[0].replace("bit.ly", "bit.ly/");
                let artistName = song.name.replace(".mp3", "").split("-")[1].replace("bit.ly", "bit.ly/");

                createPopularSongCard(imgSrc, songName, artistName, songUrl);
            }
        });


        let popularPlayBtn = document.querySelectorAll('.popular-song-card');

        // Adding logic to play the song 
        popularPlayBtn.forEach((button) => {
            
            button.addEventListener('click', () => {

                let link = button.getAttribute('data-url');
                let songName = button.querySelector('.title').innerHTML;
                let artistName = button.querySelector('.artist').innerHTML;

                playSong(link, songName, artistName);
            });
        });

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}









// Function to create popular songs card 
const createPopularSongCard = (imgSrc, title, artistName, link) => {
    let div = `<div class="popular-song-card" data-url="${link}">
                    <div class="content">
                        <div class="popular-song-image"><img src="https://${imgSrc}" alt=""></div>
                        <div class="popular-song-title">
                            <div class="title">${title}</div>
                            <div class="artist">${artistName}</div>
                        </div>
                    </div>
                    <div class="play-btn"><i class="fa-solid fa-circle-play button" style="color: #03aed2;"></i></div>   
                </div>`;
    popularSongsTab.innerHTML += div;
}
// ---------------------------------------------------------------------------------------------------------------








// ------------------------getArtistSongs Function and related functions ------------------------------------
// Fetch and display songs of a specific artist
async function getArtistSongs(artistName) {
    const repoURL = "https://api.github.com/repos/codyaan/MusicApp/contents/All%20songs";

    try {
        let rawSongs = await fetch(repoURL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (!rawSongs.ok) {
            throw new Error(`HTTP error! status: ${rawSongs.status}`);
        }

        // Parsing raw data to json 
        let allSongs = await rawSongs.json();

        // for loop to extract links, title, artist, image link and to make song cards 
        allSongs.forEach(song => {

            // Checking if the link contains .mp3 to proceed further
            if (song.name.includes(artistName)) {

                // Extracting the song url 
                let songUrl = song.download_url;
                let songName = song.name.split("-")[0];
                let artistName = song.name.split("-")[1];
                let imgSrc = song.name.split("-")[2].replace(".mp3", "").replace("bit.ly", "bit.ly/");


                createArtistSongCard(imgSrc, songName, artistName, songUrl);


                document.querySelectorAll(".artist-song-card").forEach((card) => {

                    card.addEventListener('click', () => {

                        let link = card.getAttribute('data-url');
                        let songName = card.querySelector('.title').innerHTML;
                        let artistName = card.querySelector('.artist').innerHTML;
                        
                        playSong(link, songName, artistName);
                    });
                });
            }
        });

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}



// Function to fetch and create artist cards
async function getArtists() {
    const repoURL = "https://api.github.com/repos/codyaan/MusicApp/contents/Artists";

    try {
        let rawArtists = await fetch(repoURL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (!rawArtists.ok) {
            throw new Error(`HTTP error! status: ${rawArtists.status}`);
        }

        let allArtists = await rawArtists.json();

        allArtists.forEach(artist => {

            // condition to check weather the file ends with ../ to avoid it 
            if (!artist.name.endsWith("../")) {

                // Creating variables for image source and artist name 
                let artistName = artist.name.replace("/", "").split("-")[0];
                let imgSrc = artist.name.replace("/", "").split("-")[1].replace("bit.ly", "bit.ly/");

                // Calling the function to create artist cards 
                createArtistCard(imgSrc, artistName);
            }
        });

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}






// Function to create artist card 
const createArtistCard = (imgSrc, artist) => {
    let div = `<div class="artist-card">
                    <div class="artist-content">
                        <div class="artist-image"><img src="https://${imgSrc}" alt=""></div>
                        <div class="artist-name">${artist}</div>
                    </div>
                </div>`;
    artistsTab.innerHTML += div;
}








// Function to create artist song card 
const createArtistSongCard = (imgSrc, songName, artistName, link) => {
    let div = `<div class="artist-song-card" data-url="${link}">
                        <div class="content">
                            <div class="artist-song-image"><img src="https://${imgSrc}" alt=""></div>
                            <div class="artist-song-title">
                                <div class="title">${songName}</div>
                                <div class="artist">${artistName}</div>
                            </div>
                        </div>
                        <div class="artist-play-btn"><i class="fa-solid fa-circle-play" style="color: #03aed2;"></i></div>
                    </div>`;
    document.querySelector('.artist-song').innerHTML += div;
}
// ---------------------------------------------------------------------------------------------------------------















// ------------------------------------ SeekBar and song playing functions ------------------------------------
// Play song function
const playSong = (track, songName, artistName) => {
    currentSong.src = track;
    currentSong.play();
    playBtn.src = "./assets/pause.svg";
    document.querySelector(".song-name").innerHTML = `${songName} | ${artistName}`;
}



// function to play the song when the play button is clicked 
playBtn.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play();
        playBtn.src = "./assets/pause.svg";
    } else {
        currentSong.pause();
        playBtn.src = "./assets/play.svg";
    }
});



function convertSecondsToMinutes(seconds) {
    // Calculate the minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format minutes and seconds to ensure two digits
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    // Combine them in MM:SS format
    return `${formattedMinutes}:${formattedSeconds}`;
}




// Event listener to update time of the song 
currentSong.addEventListener("timeupdate", () => {
    document.querySelector("#songTime").innerHTML = `${convertSecondsToMinutes(currentSong.currentTime)} / ${convertSecondsToMinutes(currentSong.duration)}`;
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    document.querySelector('.seek-bar-div2').style.width = (currentSong.currentTime / currentSong.duration) * 90 + "%";
});


// Event listener on the seekbar when clicked the circle and seek bar div 2 moves there 
document.querySelector(".seek-bar-div").addEventListener("click", (circ) => {
    
    let percent = (circ.offsetX / circ.target.getBoundingClientRect().width) * 100;

    document.querySelector(".circle").style.left = percent + "%";
    document.querySelector('.seek-bar-div2').style.width = percent + "%";

    currentSong.currentTime = (currentSong.duration * percent) / 100;

});



document.querySelector(".volume-bar").getElementsByTagName("input")[0].addEventListener("change", (e) => {

    currentSong.volume = parseInt(e.target.value) / 100;

    if (document.querySelector(".volume-bar").getElementsByTagName("input")[0].value != 0) {
        volumeBtn.src = "./assets/volume.svg";
    }

    if (document.querySelector(".volume-bar").getElementsByTagName("input")[0].value == 0) {
        volumeBtn.src = "./assets/mute.svg";
    }
});



// Event listener for volume bar 
volumeBtn.addEventListener("click", () => {

    if (currentSong.volume == 0) {

        currentSong.volume = 1;
        volumeBtn.src = "./assets/volume.svg";

        document.querySelector(".volume-bar").getElementsByTagName("input")[0].value = 100;

    } 
    
    else {

        currentSong.volume = 0;
        volumeBtn.src = "./assets/mute.svg";

        document.querySelector(".volume-bar").getElementsByTagName("input")[0].value = 0;
    }
});
// ---------------------------------------------------------------------------------------------------------------









// Main function to run the async functions 
async function main() {

    // Awaiting 
    await getAllSongs();
    await getArtists();
    await getPopularSongs();


    // Logic for the previous button 
    // I have kept them in the main function because they will work after fetching the songs and the songs need to be awaited 
   previousBtn.addEventListener("click", () => {

    try {

        let link = linksList[linksList.indexOf(currentSong.src) - 1];
        let songName = decodeURI(linksList[linksList.indexOf(currentSong.src) - 1].split("/").pop().split("-")[0]);
        let artistName = decodeURI(linksList[linksList.indexOf(currentSong.src) - 1].split("/").pop().split("-")[1]);

        playSong(link, songName, artistName);

    } 
    catch {

        let link = linksList[linksList.indexOf(currentSong.src)];
        let songName = decodeURI(linksList[linksList.indexOf(currentSong.src)].split("/").pop().split("-")[0]);
        let artistName = decodeURI(linksList[linksList.indexOf(currentSong.src)].split("/").pop().split("-")[1]);

        playSong(link, songName, artistName);

    }
});


    // Adding the logic for next button 
    nextBtn.addEventListener("click", () => {

        try {

            let link = linksList[linksList.indexOf(currentSong.src) + 1];
            let songName = decodeURI(linksList[linksList.indexOf(currentSong.src) + 1].split("/").pop().split("-")[0]);
            let artistName = decodeURI(linksList[linksList.indexOf(currentSong.src) + 1].split("/").pop().split("-")[1]);

            playSong(link, songName, artistName);

        } 
        catch {

            let link = linksList[linksList.indexOf(currentSong.src)];
            let songName = decodeURI(linksList[linksList.indexOf(currentSong.src)].split("/").pop().split("-")[0]);
            let artistName = decodeURI(linksList[linksList.indexOf(currentSong.src)].split("/").pop().split("-")[1]);

            playSong(link, songName, artistName);

        }
    });




    // Logic for displaying artist Library songs for a particular artist 
    document.querySelectorAll('.artist-card').forEach((card) => {

        card.addEventListener('click', () => {

            artistName = card.querySelector('.artist-name').innerHTML;
            let artistDiv = document.querySelector('.artist-song');

            // Clearing the artist div 
            artistDiv.innerHTML = "";

            // Calling the function to display the songs of the artist 
            getArtistSongs(artistName);

            // Making the artist div visible 
            artistDiv.style.zIndex = "1";
        });
    });


}

main();
// End of main function 
