import React from 'react';

function ShowArt(name) {
console.log(name);

  return <img className="card-img" src={require('../images/'+name+'.png')} alt={name} /> ;
}

export default ShowArt;