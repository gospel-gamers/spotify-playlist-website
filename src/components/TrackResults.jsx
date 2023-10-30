import './TrackResults.css';
import React, { useState } from 'react';

function TrackResults({ searchResults, addTrackToPlaylist }) {

  return (

    <div className='track-results-div'>

        <h3>Search Results</h3>

        <div className='track-results-list'>
        
            {searchResults.map((result, index) => (
            <div id={index} key={result.id}>
                <div className='track-name'>{result.name}</div>
                <div className='artist-name'>{result.artists[0].name}</div>
                <button className='add-button' onClick={() => addTrackToPlaylist(index)}>+</button>
                {/* <button className='add-button' onClick={addTrackID(index)}>+</button> */}
            </div>
            ))}
        
        </div>
      

    </div>


    );
}

export default TrackResults;
