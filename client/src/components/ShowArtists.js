import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowArtByArtist from './ShowArtByArtist';

/**
 * Shows all the artists who created art for a given set, as well as either all card arts within a set if the 'Show All Cards' button is pressed, which it is by default
 * Or it shows all the cards whose artwork was created by whichever artist's button was pressed
 */
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

  if (backendData === null || backendData === undefined || backendData.length <= 1) {
    return <div>Loading . . .</div>
  }

  //Returns a list of all the artist names within a set, never repeating the same name twice
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

  //Gets total count of cards in set
  function getTotalCount(cards) {
    let totalCount = 0;
    if (!cards) {
      return totalCount;
    }
    for (let i = 0; i < cards.length; i++) {
      totalCount ++;
    }
    return totalCount;
  }

  //Finds the number of images created by artist
  function getArtCount(cards, artist) {
    let artCount = 0;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].artist === artist) {
        artCount ++;
      }
    }
    return artCount;
  }

  //Calculates the percentage of cards created by artist within the set
  function getPercentage(totalCount, artCount) {
    let num = (artCount/totalCount) * 100;
    return parseFloat((num + 0.005).toFixed(2)) ;
  }

  console.log(backendData);

  return (
    <div className="page-view">
      <div className="artistsTable">
        <div className="artist" key={"AllButton"} onClick={() => showArtByArtist("")}>
          <div>Show All Cards</div>
        </div>
        {getArtistNames(backendData).map(artist => (
          <div className="artist" key={artist} onClick={() => showArtByArtist(artist)} >
            <div>{artist}</div>
            <div>{getPercentage(getTotalCount(backendData), getArtCount(backendData, artist))}% ({getArtCount(backendData, artist)} of {getTotalCount(backendData)})</div>
          </div>
        ))}
      </div>
      <ShowArtByArtist artist={theArtist}></ShowArtByArtist>
    </div>
  );
}

export default ShowArtists;
