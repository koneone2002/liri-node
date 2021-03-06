require("dotenv").config();
var keys = require("./keys");
var request = require("request");
var Twitter = require('twitter');
var fs = require('fs');

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];

function switches(action, value){
    switch (action) {
        case "my-tweets":
            myTweets();
            break;
    
        case "spotify-this-song":
            spotifySongs(value);
            break;
    
        case "movie-this":
            movieThis(value);
            break;
    
        case "do-what-it-says":
            doIt();
            break;
    }

}
switches(action, process.argv[3]);

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
function spotifySongs(songTitle) {
    var nodeArgs = process.argv;
    
    

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            songTitle = songTitle + "+" + nodeArgs[i];

        }
       

    };
    if (!songTitle) {
        songTitle ='The Sign by Ace of Base';
    };
    


    spotify.search({
        type: 'track',
        query: songTitle,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log(err);
        };
    
    
   
    
        console.log("---------------------")
        console.log("The Song Name is: " + data.tracks.items[0].name + "\nThe Artist is: " + data.tracks.items[0].album.artists[0].name + "\nListen to the song here: " + data.tracks.items[0].external_urls.spotify + "\nThe Album the song appears on is: " +
        data.tracks.items[0].album.name);
        console.log("---------------------")
        
    });
    

}
// this will return info regarding movie input 
// if no movie is input it will return Mr Nobody
function movieThis(value) {
    var nodeArgs = process.argv;
   
    var movieName = "";
   
    if(!process.argv[3]){
        movieName = value;
    }
    else {
        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
            } else {
                movieName += nodeArgs[i];
            }
        }

    }

    if (value === undefined) {
        movieName = "Mr Nobody";
        console.log("_______________");
        console.log("\nIf you haven't seen Mr Nobody, it's on Netflix!\n")
    }




    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
   
    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log("---------------------")
            console.log("The movie's Title is: " + JSON.parse(body).Title + "\nThe movie was released in: " + JSON.parse(body).Year + "\nThe movie's IMDB rating is: " + JSON.parse(body).imdbRating + "\nThe movie's Rotten Tomatoes score is: " + JSON.parse(body).Ratings[1].Value + "\nThe movie was made in: " + JSON.parse(body).Country + "\nThe movie's language: " + JSON.parse(body).Language + "\nThe movie's plot is: " + JSON.parse(body).Plot + "\nThe actors are: " + JSON.parse(body).Actors);
            console.log("---------------------")

        }
    });
}

// this will randomly return one of the above 
// function doIt() {
//     var randomFun = ["my-tweets", "spotify-this-song", "movie-this"];
//     var randomNess = randomFun[Math.floor(Math.random() * randomFun.length)];
//     action = randomNess;
//     console.log("The randomness is " + action);
//     if (action === "movie-this") {
//         movieThis();
//     } else {
//         if (action === "my-tweets") {
//             myTweets();
//         } else {
//             spotifySong()
//         }

//     };
// }
function doIt() {
    

   fs.readFile("random.txt", "utf8", function(err, data){
       if (err) {
           return console.log(err);
       }
     
      
       var random = data.split(",");
       console.log(random);
       switches(random[0], random[1]);
       

   })
}

function logIt() {
   
    var action = process.argv[2] + ", ";
    for (i = 3; i < process.argv.length; i++) {
        action += process.argv[i];
    }
    action += "\n"

    fs.appendFile("logFile.txt", action, function(err){
        if(err) {
            console.log(err);
        }
        else {
            console.log("Content Added");
        }
    })
}
logIt();