# liri-node

This is a node.js application which like SIRI, will assist the user. Unlike SIRI this application doesn't have a voice!

Using the terminal a user can choose to enter spotify-this-song and a song title - and LIRI will return information about the song, including an external link to spotify, where the user can listen to the song

The user can enter in movie-this and a movie title, and LIRI will return information about the movie, including a small snippet about the plot of the movie.

The user can also enter my-tweets and LIRI will return the last 20 tweets of the user, along with the date the tweets were created.

*** THIS APPLICATION uses: 
dotenv - this is the file that holds user spotify and twitter token and secret keys - THE APPLICATION WILL NOT WORK IF THIS FILE IS NOT INCLUDED/CREATED


*** THIS APPLICATION REQUIRES:
keys
request
twitter
fs
node-spotify-api
