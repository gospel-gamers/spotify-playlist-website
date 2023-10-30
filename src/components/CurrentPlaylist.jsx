import './CurrentPlaylist.css';
import React, { useState } from 'react';


function CurrentPlaylist({ currPlaylist, removeTrackFromPlaylist, playlistName, setPlaylistName, saveCurrentPlaylist }) {


  return (

    <div className="playlist-div">
      <h3>
        <input
          required
          className='styled-title-input'
          type="text"
          placeholder="Enter playlist name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
      </h3>

      <div className="playlist-list">
        {currPlaylist.map((track, index) => (
          <div key={track.id}>
            <div className="track-name">{track.name}</div>
            <div className="artist-name">{track.artists[0].name}</div>
            <button className="remove-button" onClick={() => removeTrackFromPlaylist(index)}>-</button>
          </div>
        ))}
      </div>


    {/* Save button */}
    <div className='save-button-container'>
      <button type="submit" className='save-button' onClick={saveCurrentPlaylist}>Save</button> 
    </div>

    </div>

    
  );
}

export default CurrentPlaylist;
