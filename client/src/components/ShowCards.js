import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const colorMap = {
  "W": "#F9FAF4", // white
  "U": "#0E68AB", // blue
  "B": "#150B00", // black
  "R": "#D3202A", // red
  "G": "#00733E" // green
};

function getCardBackground(colors) {
  let colorStops = "#B3A295";
  let colorStopLight = "#D9D5D3";
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return `linear-gradient(to right, ${colorStops}, ${colorStopLight})`;
  } else if (colors.length === 1) {
    colorStops = colorMap[colors];
    if (colorStops === "#F9FAF4") {
      colorStopLight = "#F8E7B9";
    } else if (colorStops === "#0E68AB") {
      colorStopLight = "#B3CEEA";
    } else if (colorStops === "#150B00") {
      colorStopLight = "#A69F9D";
    } else if (colorStops === "#D3202A") {
      colorStopLight = "#EB9F82";
    } else {
      colorStopLight = "#C4D3CA";
    }
    return `linear-gradient(to right, ${colorStops}, ${colorStopLight})`;
  }
  colorStops = colors.map(color => colorMap[color]).join(",");
  return `linear-gradient(to right, ${colorStops})`;
}

function ShowCards() {
  const { setCode } = useParams();
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch(`/set/${setCode}`)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setBackendData(data);
      });
  }, [setCode]);
  
  function getTextColor(colors) {
    if (!colors || !Array.isArray(colors)) {
      return "black";
    }
    if (colors.includes("B")) {
      return "lightgrey";
    }
    return "black";
  }

  function getCardNameWithApostrophe(name) {
    //console.log(name);
    if (typeof name === 'string' && name !== undefined) {
      return name.replace(/_/g, "'");
    }
    return "";
  }

  function getCardNames(cards, artist) {
    let cardNames = [];
    for (let i; i < cards.length; i++) {
      if (cards[i].artist === artist) {
        cardNames.push(cards[i].name);
      }
    }
    return cardNames;
  }
  
  return (
    <div>
      <div className="cardsTable">
        {backendData.slice(0, backendData.length).map(card => (
          <div className="card" key={card.id * 2} style={{ background: getCardBackground(card.colors), color: getTextColor(card.colors) }}>
            <h2>{getCardNameWithApostrophe(card.name)} ({card.number} of {backendData[backendData.length - 1].number})</h2>
            <p>Art by {card.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowCards;
