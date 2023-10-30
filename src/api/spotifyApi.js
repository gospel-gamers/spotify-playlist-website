// ! this only works for an individual user for now
// create your own credentials via the Spotify Web API and you can import them here

import credentials from './config';
const { clientId, clientSecret } = credentials;

let accessToken = null;
let tokenExpirationTime = 0;

// Function to obtain an access token using the Client Credentials Flow
export async function getAccessToken() {
  if (!accessToken || Date.now() >= tokenExpirationTime) {

    // ! Buffer is not defined in the method below in the browser environment
    // ? const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const authString = btoa(`${clientId}:${clientSecret}`); // needed for the spotify api
    const tokenUrl = 'https://accounts.spotify.com/api/token';

    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'client_credentials');

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        accessToken = data.access_token;
        tokenExpirationTime = Date.now() + (data.expires_in * 1000); // Set token expiration time, * 1000 used to convert from milliseconds to seconds
      } else {
        throw new Error('Failed to obtain access token.');
      }
    } catch (error) {
      throw new Error(`Error obtaining access token: ${error.message}`);
    }
  }

  return accessToken;
}

// Function to search for tracks using the obtained access token
export async function searchSpotify(searchTerm) {
  const accessToken = await getAccessToken(); // Get the access token with the function above

  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.tracks.items;
    } else {
      throw new Error('Failed to fetch search results');
    }
  } catch (error) {
    throw new Error(`Error searching Spotify: ${error.message}`);
  }
}