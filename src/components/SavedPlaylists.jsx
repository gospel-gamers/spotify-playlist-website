// SavedPlaylists.jsx
import './SavedPlaylists.css'
import React from 'react';


function SavedPlaylists({ savedPlaylists, editPlaylist, saveToSpotify, deletePlaylist }) {
  return (
    <div className="saved-playlists-div">
      <h3>Saved Playlists</h3>
      {savedPlaylists.map((playlist, index) => (
        <div key={index} className="playlist-item">
          <h4 className='playlist-title'>{playlist.name}</h4>
          <p className='playlist-tracks-info'>{`${playlist.tracks.length} track${playlist.tracks.length === 1 ? '' : 's'}`}</p>

          {/* buttons */}
          <div className='special-buttons-div'> 

            <button className='save-playlist-button' onClick={() => saveToSpotify(playlist)}>Save to Spotify</button>
            <button className='edit-button' onClick={() => editPlaylist(playlist)}>Edit Playlist</button>
            <button className='delete-button' onClick={() => deletePlaylist(playlist)}>Delete Playlist</button>

          </div>
        </div>
      ))}
    </div>
  );
}

export default SavedPlaylists;



// <div className="saved-playlists-div">
//   <h3>Saved Playlists</h3>

//   {savedPlaylists.map((playlist, index) => (
//     <div key={index}>

//         <div className="playlist-title">{playlist.name}</div>
//         <div className="playlist-length">Contains {playlist.length} tracks</div>

//         {/* // ? Display the tracks from the saved playlist */}
//         {/* {playlist.tracks.map((track, trackIndex) => (
//             <div key={track.id}>
//             <div className="track-name">{track.name}</div>
//             <div className="artist-name">{track.artists[0].name}</div>
//             </div>
//         ))} */}
//     </div>
//   ))}
// </div>



// function SavedPlaylists({ savedPlaylists }) {
  
//   function countTracks(inputPlayList) {
//     return inputPlayList.length
//   }
  
//     return (
    
//         <div className="saved-playlists-div">

//             <h3>Saved Playlists</h3>
//             {savedPlaylists.map((playlist, index) => (
//                 <div key={index} className="playlist-item">

//                   <h4 className='playlist-title'>{playlist.name}</h4>
//                   <p className='playlist-tracks-info'>{`${playlist.tracks.length} track${playlist.tracks.length === 1 ? '' : 's'}`}</p>

//                   <button>edit playlist</button>

//                   <button>save to spotify</button>

//                   <button>delete playlist</button>

//                 </div>

//             ))}

//         </div>

//   );
// }