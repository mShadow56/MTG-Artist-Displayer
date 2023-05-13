import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



function ShowAllArt() {
  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const images = importAll(require.context('../../images/', true, /\.png$/));
  
  return (
    <div className="card-img-table">
      {Object.keys(images).map((key) => (
        <img className="card-img" src={images[key]} alt={key} />
      ))}
    </div>
  );
}
export default ShowAllArt;

//return (    <div>      <img src={myImage+ '/Angel of Flight Alabaster.png'} alt="My Image" /* use the img tag with the src attribute */ />     </div>  );
  