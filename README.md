# Spotify Playlist Creator - React Website
 
This is my spotify playlist creator website built with React. Currently it creates an access token that valid for an hour. With this token the user is able to search the Spotify Web API for songs and add them to a playlist. The playlist can be renamed and saved to the saved playlists component. From there this playlist can be edited again (which makes it the current playlist) or deleted. 

I am still in production of this site but long term it the plan is for a user to save any created playlist to their personal Spotify account. This will require implementing OAuth 2.0 correctly and making a  POST request for a new playlist in the user's Spotify account.

### Tech Tips

For now you need to sign up with the Spotify Web API, create an account, create an app and use the `clientId` and `clientSecret`.

Create a file called `config.js` and place these two values in it under `/src/api/config.js`. Export these two variables and you will be able to make Spotify Web API calls.
