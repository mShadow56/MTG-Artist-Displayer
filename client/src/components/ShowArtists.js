import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowArtByArtist from './ShowArtByArtist';

function ShowArtists() {
  const { setCode } = useParams();
  const [backendData, setBackendData] = useState([{}]);
  const [theArtist, setTheArtist] = useState('');

  useEffect(() => {
    fetch(`/set/${setCode}`)
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
      });
  }, [setCode]);

  function getArtistNames(cards) {
    let artistNames = [];
    let artist;
    for (let i = 0; i < cards.length; i++) {
      artist = cards[i].artist;
      if (!artistNames.includes(artist)) {
        artistNames.push(artist)
      }
    }
    return artistNames.sort();
  }

  function showArtByArtist(name) {
    setTheArtist(name);
  }

  return (
    <div className="page-view">
      <div className="artistsTable">
        <div className="artist" key={"AllButton"} onClick={() => showArtByArtist("")}>
          <h3>Show All Cards</h3>
        </div>
        {getArtistNames(backendData).map(artist => (
          <div className="artist" key={artist} onClick={() => showArtByArtist(artist)} >
            <h3>{artist}</h3>
          </div>
        ))}
      </div>
      <ShowArtByArtist artist={theArtist}></ShowArtByArtist>
    </div>
  );
}

export default ShowArtists;
