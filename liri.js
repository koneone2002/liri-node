require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var Twitter = require('twitter');


var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];


switch (action) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doIt();
        break;
}


// this will show last 20 tweets with timestamp
function myTweets() {

    var params = {
        screen_name: 'KataTheKat1',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("---------------------")
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("---------------------")
            };
        } else {
            console.log(error)
        };
    });

}
// this will return info regarding song including band album link to the song
// if no title is input it will return 'The Sign' from Ace of Base
function spotifySong(title) {
    var nodeArgs = process.argv;
    var title = process.argv[3];
  

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            title = title + "+" + nodeArgs[i];

        }
       

    };
    if (!title) {
        title ='The Sign by Ace of Base';
    };
    


    spotify.search({
        type: 'track',
        query: title,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log(err);
        };
    
    
   
    
        console.log("---------------------")
        console.log("The Song Name is " + data.tracks.items[0].name);
        console.log("The Artist is " + data.tracks.items[0].album.artists[0].name);
        console.log("Listen to the song here " + data.tracks.items[0].external_urls.spotify);
        console.log("The Album the song appears on is " + data.tracks.items[0].album.name);
        console.log("---------------------")
        // console.log(JSON.stringify(data, null, 2));
    });
    

}
// this will return info regarding movie input 
// if no movie is input it will return Mr Nobody
function movieThis() {
    var nodeArgs = process.argv;
    var value = process.argv[3];
    var movieName = "";

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }
    if (value === -1 || value === undefined) {
        movieName = "Mr Nobody";
    }



    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // console.log(queryUrl);
    console.log("I think the movie name requested is " + movieName);
    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log("---------------------")
            console.log("The movie's Title is: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes score is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movie's was made in: " + JSON.parse(body).Country);
            console.log("The movie's plot is: " + JSON.parse(body).Plot);
            console.log("The actors are: " + JSON.parse(body).Actors);
            console.log("---------------------")

        }
    });
}
// this will randomly return one of the above 
function doIt() {
    var randomFun = ["my-tweets", "spotify-this-song", "movie-this"];
    var randomNess = randomFun[Math.floor(Math.random() * randomFun.length)];
    action = randomNess;
    console.log("The randomness is " + action);
    if (action === "movie-this") {
        movieThis();
    } else {
        if (action === "my-tweets") {
            myTweets();
        } else {
            spotifySong()
        }

    };
}