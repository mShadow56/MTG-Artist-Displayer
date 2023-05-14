import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ShowArtByArtist({ artist }) {

  //Collects data from the MySQL database
  const { setCode } = useParams();
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch(`/set/${setCode}`)
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
      });
  }, [setCode]);

  //Finds related images and makes an Array
  function getCardNames(cards) {
    let cardNames = [];
    for (let i = 0; i < cards.length; i++) {
      if (artist === "") {
        cardNames.push(cards[i].name);
      } else if (cards[i].artist === artist) {
        cardNames.push(cards[i].name);
      }
    }
    return cardNames;
  }

  return (
    <div className="card-img-table">
      {getCardNames(backendData).map(name => (
        <img className="card-img" src={require('../images/' + name + '.png')} alt={name} />
      ))}
    </div>
  );
}

export default ShowArtByArtist;
