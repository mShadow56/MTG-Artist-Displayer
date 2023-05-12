import React from 'react';
import myImage from '../images/Bonds of Faith.png'; // import the image
function ShowArt() {
  return (
    <div>
      <img src={myImage} alt="My Image" /* use the img tag with the src attribute */ /> 
    </div>
  );
}
export default ShowArt;
