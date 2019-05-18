require("dotenv").config();
let keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let fs = require("fs");
let axios = require("axios");
let moment = require("moment");

let spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let query = process.argv.slice(3).join(" ");

doThis(command, query);

function doThis(command, query) {
  log(command, query);
  switch (command) {
    case "concert-this":
      concertThis(query);
      break;
    case "spotify-this-song":
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
  if (!query) {
    console.log("");
    console.log("No song specified, displaying The Sign by Ace of Base.");
    query = "The Sign Ace of Base";
  }

  spotify
    .search({ type: "track", query: query, limit: 1 })
    .then(function(response) {
      let tracks = response.tracks.items;
      tracks.forEach(function(track) {
        displayTrack(track);
      });
    })
    .catch(function(err) {
      console.log(err);
    });
}

function concertThis(artist) {
  if (!artist) {
    console.log("");
    console.log("No artist specified. Displaying results for Nickelback.");
    artist = "Nickelback";
  }
  let queryURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios
    .get(queryURL)
    .then(function(response) {
      if (response.status === 200) {
        console.log("");
        console.log("Upcoming Shows for " + artist + ":");
        console.log("");
        response.data.forEach(function(show) {
          displayShow(show);
        });
      }
    })
    .catch(function(error) {
      if (error.status == 403) {
        console.log("");
        console.log("No upcoming shows for this band.");
        console.log("");
      } else {
        console.log("");
        console.log("Something went wrong. Please try another band.");
        console.log("");
      }
    });
}

function movieThis(movie) {
  if (!movie) {
    movie = "Mr. Nobody";
    console.log("");
    console.log("No movie was entered. Displaying Results for 'Mr. Nobody'.");
  }
  let queryUrl =
    "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  axios
    .get(queryUrl)
    .then(function(response) {
      if (response.status === 200 && response.data.Title) {
        displayMovie(response);
      } else {
        console.log("IMDB does not have information about " + movie);
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
    let dataArr = data.split(",");
    let command = dataArr[0].trim();
    let query = dataArr[1].trim();

    doThis(command, query);
  });
}

function log(command, query) {
  fs.appendFile("log.txt", command + "," + query + "\n", function(err) {
    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }
  });
}

function getVenueLocation(show) {
  let place = [];
  if (show.venue.city) {
    place.push(show.venue.city);
  }
  if (show.venue.region) {
    place.push(show.venue.region);
  }
  if (show.venue.country) {
    place.push(show.venue.country);
  }
  return place.join(", ");
}

function displayShow(show) {
  let placeString = getVenueLocation(show);
  console.log("");
  console.log(show.venue.name);
  console.log(placeString);
  console.log(moment(show.datetime).format("MM/DD/YYYY"));
  console.log("");
}

function displayTrack(track) {
  let artists = [];
  track.artists.forEach(function(artist) {
    artists.push(artist.name);
  });
  console.log("");
  console.log(artists.join(", "));
  console.log("");
  console.log(track.name);
  console.log("");
  console.log("Preview: " + track.preview_url);
  console.log("");
  console.log(track.album.name);
  console.log("");
}

function displayMovie(response) {
  console.log("");
  console.log(response.data.Title);
  console.log(response.data.Year);
  console.log("");
  console.log("IMDB Rating: " + response.data.imdbRating);
  console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
  console.log(response.data.Country);
  console.log(response.data.Language);
  console.log("");
  console.log(response.data.Plot);
  console.log("");
  console.log(response.data.Actors);
  console.log("");
}
