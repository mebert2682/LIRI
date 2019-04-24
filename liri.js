require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


var request = process.argv[2]
var query = process.argv.slice(3).join("+")


switch (request) {
  case "concert-this":
    findConcerts();
    break;
  case "spotify-this-song":
    searchSong();
    break;
  case "movie-this":
    searchMovie();
    break;
}

function findConcerts() {
  
  axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp").then(
  function(response) {

    console.log(response);
    
    
    
    
  }
);

}

function searchSong() {

spotify.search({ type: 'track', query: query }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
//console.log(data)
console.log(data.tracks.items[0].artists[0].name)
console.log(data.tracks.items[0].name)
console.log(data.tracks.items[0].album.name)
console.log(data.tracks.items[0].preview_url)
});

}

function searchMovie() {

axios.get("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy").then(
  function(response) {

    //console.log(response);
    console.log("Movie Title: " + response.data.Title);
    console.log("Year Released: " + response.data.Year);
    console.log("imdb Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Movie Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  });

}