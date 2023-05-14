import React from 'react';

function ShowArt(cardNames) {
 
    const names = [];
    for (let i = 0; i < cardNames.length; i++) {
        names.push(cardNames[i]);
    }
    console.log(cardNames);

    return (
        <div>
            {names.map(name => (
                <img className="card-img" src={require('../images/' + name + '.png')} alt={name} />
            ))}
        </div>
    );
}

export default ShowArt;