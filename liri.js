require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
let fs = require("fs");
let axios = require("axios");
var spotify = new Spotify(keys.spotify);

let command = process.argv[2];
var query = process.argv.slice(3).join(" ");

// concert-this

// spotify-this-song

// movie-this

// do-what-it-says

doThis(command, query);

function doThis(command, query) {
  switch (command) {
    case "concert-this":
      concertThis(query);
      break;
    case "spotify-this-song":
      console.log("here");
      spotifyThis(query);
      break;
    case "movie-this":
      movieThis(query);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
  }
}

function spotifyThis(query) {
  spotify
    .search({ type: "track", query: query, limit: 1 })
    .then(function(response) {
      let tracks = response.tracks.items;
      tracks.forEach(function(track) {
        console.log(track.name);
        console.log(track.album.name);
      });
    })
    .catch(function(err) {
      console.log(err);
    });
}

function concertThis(artist) {
  let queryURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios
    .get(queryURL)
    .then(function(response) {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

function movieThis(movie) {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  axios
    .get(queryUrl)
    .then(function(response) {
      if (response.status === 200) {
        console.log("The movie's release year is: " + response.data.Year);
      }
    })
    .catch(function(error) {
      console.error("error!");
    });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
    var command = dataArr[0];
    var query = dataArr[1];

    // We will then re-display the content as an array for later use.
    doThis(command, query);
  });
}
