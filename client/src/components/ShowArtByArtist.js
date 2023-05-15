import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * This component, ShowArtByArtist.js, finds the names of all the cards whose artwork a given artist has created.
 * It then creates a new image element per card name, finding the relevant image,
 * and returns the result when all images are found
 */

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

/**
 * 
 */
function getCards(cards) {
  if (artist === "") {
    return cards;
  }
  return cards.filter(card => card.artist === artist);
}

  return (
    <div className="card-img-table">
      {getCards(backendData).map(card => (
        <img
          className="card-img"
          src={require(`../images/${setCode}/${card.number}-${card.name}.png`)}
          alt={card.name}
        />
      ))}
    </div>
  );
}

export default ShowArtByArtist;
