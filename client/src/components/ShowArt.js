import React from 'react';
import myImage from '../images/Bonds of Faith.png'; // import the image

function ShowArt() {
  return (
    <div className="card-img-table">
      <img className="card-img" src={myImage} alt="example card" /> 
    </div>
  );
}
export default ShowArt;
