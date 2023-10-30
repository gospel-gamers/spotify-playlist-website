// component imports
import NormalSearchBar from './components/normalSearchBar';
import TrackResults from './components/TrackResults';
import CurrentPlaylist from './components/CurrentPlaylist';
import SavedPlaylists from './components/SavedPlaylists';

// import CSS rules and React
import './App.css';
import React, { useState } from 'react';

// import getAccessToken and searchSpotify
import { getAccessToken, searchSpotify } from './api/spotifyApi';

function App() {

  // state declarations
  const [searchResults, setSearchResults] = useState([]);
  const [currPlaylist, setCurrPlaylist] = useState([]); // Track the current playlist
  const [playlistName, setPlaylistName] = useState('');
  const [savedPlaylists, setSavedPlaylists] = useState([]); // Store saved playlists
  const [errorMessage, setErrorMessage] = useState(''); // Store error message


  async function handleSearch(searchTerm) {
    // Implement your search logic here, e.g., fetch data from an API.
    console.log(`\nSearching for: ${searchTerm}`);
    console.log(`creating access token and then searching spotify API for results`);

    try {
      // Handle search results, update component state, etc.
      const results = await searchSpotify(searchTerm);
      // update searchResults with the first 10 hits
      setSearchResults(results.slice(0, 10));
      // logs
      console.log(`\nSearch Results:`);
      console.log(results);
    } catch (error) {
      console.error(error);
    }

    
  };

  function addTrackToPlaylist(idOfTrack) {
    const selectedTrack = searchResults[idOfTrack];

    // Check if the selected track is already in the current playlist
    const isTrackAlreadyAdded = currPlaylist.some((track) => track.id === selectedTrack.id);

    if (isTrackAlreadyAdded) {
      // Handle the case where the track is already in the playlist (e.g., show an error message).
      console.log(`Track with ID ${selectedTrack.id} is already in the playlist.`);
      setErrorMessage(`The song ${selectedTrack.name} by ${selectedTrack.artists[0].name} is already in the current playlist.`); // Clear the error message
      // You can set an error message here or take any other appropriate action.
    } else {
      // If the track is not already in the playlist, add it.
      setCurrPlaylist([...currPlaylist, selectedTrack]);
      setErrorMessage(''); // Clear the error message if it exists, redefine it if not
    }

    console.log(`\nadding track with id:  ${idOfTrack}`);
    console.log(`current playlist:`);
    console.log(currPlaylist);
  }

  function removeTrackFromPlaylist(idOfTrack) {
    // can I optimize space time on this below...?
    const updatedPlaylist = [...currPlaylist];
    updatedPlaylist.splice(idOfTrack, 1);
    setCurrPlaylist(updatedPlaylist);

    console.log(`\removing track with id:  ${idOfTrack}`);
    console.log(`current playlist:`);
    console.log(currPlaylist);
  }

  function saveCurrentPlaylist() {
    if (playlistName.trim() === '') {
      setErrorMessage('Playlist name cannot be empty. Please try again with a valid name...');
    } else {
      const newPlaylist = {
        name: playlistName,
        tracks: currPlaylist,
      };
      setSavedPlaylists([...savedPlaylists, newPlaylist]);
      setCurrPlaylist([]);
      setPlaylistName('');
      setErrorMessage(''); // Clear the error message
    }
    
    // const newPlaylist = {
    //   name: playlistName,
    //   tracks: currPlaylist,
    // };
    // setSavedPlaylists([...savedPlaylists, newPlaylist]);
  }


  function editPlaylist(playlist) {
    // Set the selected playlist as the current playlist for editing
    setCurrPlaylist(playlist.tracks);
    setPlaylistName(playlist.name);

    // Remove the old playlist from saved playlists
    const updatedPlaylists = savedPlaylists.filter((p) => p !== playlist);

    // Update the state of saved playlists to trigger a re-render
    setSavedPlaylists(updatedPlaylists);

  }

  function saveToSpotify(playlist) {
    // Implement the logic to save the playlist to Spotify
    // use the Spotify API for this
  }

  function deletePlaylist(playlist) {
    // Remove the playlist from the saved playlists
    const updatedPlaylists = savedPlaylists.filter((p) => p !== playlist);
    setSavedPlaylists(updatedPlaylists);
  }


  return (
    <div className="App">

      {/* Search Bar on top of screen */}
      < NormalSearchBar onSearch={handleSearch} />

      {/* title name of the main app */}
      <h1 className='main-app-title'>Spotify Playlist Creator</h1>



      {/*  error message if playlist name is empty */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className='main-sections-div'>

        {/* Display top 10 search results */}
        <TrackResults searchResults={searchResults} addTrackToPlaylist={addTrackToPlaylist} />

        {/* Display added Tracks to the Playlist */}
        <CurrentPlaylist currPlaylist={currPlaylist} removeTrackFromPlaylist={removeTrackFromPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} saveCurrentPlaylist={saveCurrentPlaylist}/>

        <SavedPlaylists savedPlaylists={savedPlaylists} editPlaylist={editPlaylist} saveToSpotify={saveToSpotify} deletePlaylist={deletePlaylist} /> {/* Pass saved playlists to SavedPlaylists */}

      </div>


    </div>
  );
}

export default App;
