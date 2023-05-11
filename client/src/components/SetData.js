import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
/*
const colorMap = {
  "W": "white",
  "U": "blue",
  "B": "black",
  "R": "red",
  "G": "green"
};

function getCardBackground(colors) {
  const colorStops = colors.map(color => colorMap[color]).join(",");
  return `linear-gradient(to right, ${colorStops})`;
}
*/
function SetData() {
  const { setCode } = useParams();
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch(`/set/${setCode}`)
      .then(response => response.json())
      .then(data => setBackendData(data));
  }, [setCode]);

  return (
    <div className="cardsTable">
      <div>
        {backendData.slice(0, backendData.length).map(card => (
          <div className="card" key={card.id} /*style={{ background: getCardBackground(card.colors) }}*/>
            <h2>{card.name} ({card.number} of {backendData[backendData.length - 1].number})</h2>
            <p>Art by {card.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetData;
