import React from 'react';

function ShowAllArt() {
  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../images/', true, /\.png$/));

  return (
    <div className="card-img-table">
      {Object.keys(images).map((key) => (
        <img className="card-img" src={images[key]} alt={key} />
      ))}
    </div>
  );
}

export default ShowAllArt;