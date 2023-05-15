import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * This component shows all the cards within the set as <div> elements,
 * including info on card name, card number of the set total number,
 * and the name of the artist(s), who drew the art for the given card.
 * It also gives relevant background colors to the card <div>.
 */
function ShowCards() {
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
   * This function changes the color of the card <div> text based on whether the card is a black card or not
   */
  function getTextColor(colors) {
    if (!colors || !Array.isArray(colors)) {
      return "black";
    }
    if (colors.includes("B")) {
      return "lightgrey";
    }
    return "black";
  }

  /**
   * The cards' names that are stored within the database have had their apostrophes replaced by underscores.
   * As such, to show the names properly, this function replaces the underscores with apostrophes.
   */
  function getCardNameWithSpecialCharacters(name) {
    if (typeof name === 'string' && name !== undefined) {
      return name.replace(/_/g, "'").replace(/-/g, "!");
    }
    return "";
  }

  /**
   * Returns a cardsTable <div> within which is created a new card <div> for each card in the set
   */
  return (
    <div className="cardsTable">
      {backendData.slice(0, backendData.length).map(card => (
        <div className="card" key={card.id * 2} style={{ background: getCardBackground(card.colors), color: getTextColor(card.colors) }}>
          <h3>{getCardNameWithSpecialCharacters(card.name)}</h3>
          <h3>({card.number} of {backendData[backendData.length - 1].number})</h3>
          <p>Art by {card.artist}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * This maps the color values from the card_colors table to relevant hex codes
 */
const colorMap = {
  "W": "#F9FAF4", // white
  "U": "#0E68AB", // blue
  "B": "#150B00", // black
  "R": "#D3202A", // red
  "G": "#00733E" // green
};

/**
 * Sets the style of the background color of a <div> card element
 */
function getCardBackground(colors) {
  let colorStops = "#B3A295"; // gray -- used for colorless cards
  let colorStop2 = "#D9D5D3"; // secondary colorless color
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return `linear-gradient(to right, ${colorStops}, ${colorStops}, ${colorStop2})`; // sets the color for the colorless cards
  } else if (colors.length === 1) {
    colorStops = colorMap[colors];
    if (colorStops === "#F9FAF4") {
      colorStop2 = "#F8E7B9"; // secondary white color
    } else if (colorStops === "#0E68AB") {
      colorStop2 = "#B3CEEA"; // secondary blue color
    } else if (colorStops === "#150B00") {
      colorStop2 = "#A69F9D"; // secondary black color
    } else if (colorStops === "#D3202A") {
      colorStop2 = "#EB9F82"; // secondary red color
    } else {
      colorStop2 = "#C4D3CA"; // secondary green color
    }
    return `linear-gradient(to right, ${colorStops}, ${colorStops}, ${colorStop2})`; // sets the color for the single-colored cards
  } else if (colors.length === 2) {
    colorStops = colors.map(color => [colorMap[color], colorMap[color]]).flat().join(",");
    return `linear-gradient(to right, ${colorStops})`; // sets the colors for multi-colored cards
  }
  colorStops = colors.map(color => colorMap[color]).join(",");
  return `linear-gradient(to right, ${colorStops})`; // sets the colors for multi-colored cards
}

export default ShowCards;
