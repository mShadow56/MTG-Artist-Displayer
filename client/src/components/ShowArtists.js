import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ShowArtists() {
  const { setCode } = useParams();
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch(`/set/${setCode}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setBackendData(data);
      });
  }, [setCode]);

  function getArtistNames(cards) {
    console.log(backendData);
    let artistNames = [];
    let artist;
    for (let i; i < cards.length; i++) {
      artist = cards[i].artist;
      if (!artistNames.includes(artist)) {
        artistNames.push(artist)
      }
    }
  }

  const artistNames = getArtistNames(backendData.cards);
  
  return (
    <div>
      <div className="artistsTable">
        {artistNames.map(artist => (
          <div className="artist" key={artist}>
            {artist}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetData;
