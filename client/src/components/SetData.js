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
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    const color = "lightgray";
    return `linear-gradient(to right, ${color}, ${color})`;
  } else if (colors.length === 1) {
    const colorStops = colorMap[colors];
    return `linear-gradient(to right, ${colorStops}, ${colorStops})`;
  }
  const colorStops = colors.map(color => colorMap[color]).join(",");
  return `linear-gradient(to right, ${colorStops})`;
}

function SetData() {
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
  
  function getTextColor(colors) {
    if (!colors || !Array.isArray(colors)) {
      return "black";
    }
    if (colors.includes("B")) {
      return "lightgrey";
    }
    return "black";
  }

  function getCardName(name) {
    console.log(name);
    if (typeof name === 'string' && name !== undefined) {
      return name.replace(/_/g, "'");
    }
    return "";
  }
  
  return (
    <div className="cardsTable">
      <div>
        {backendData.slice(0, backendData.length).map(card => (
          <div className="card" key={card.id * 2} style={{ background: getCardBackground(card.colors), color: getTextColor(card.colors) }}>
            <h2>{getCardName(card.name)} ({card.number} of {backendData[backendData.length - 1].number})</h2>
            <p>Art by {card.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetData;
