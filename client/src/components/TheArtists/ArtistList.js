import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function ArtistList() {
  const { setCode } = useParams();
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch(`/set/${setCode}`)
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
      });
  }, [setCode]);

  const artistNamesArray = backendData.map(item => item['artist']);
  
  const uniqueArrayOfArtist = artistNamesArray.filter((value, index) => {
    return artistNamesArray.indexOf(value) === index;
  });

  const sortedUniqueArrayOfArtist=uniqueArrayOfArtist.sort();

 return (
    <div>
      <h2>Artist Names:</h2>
    
      
        {sortedUniqueArrayOfArtist.map((name, index) => (
          <div class="card">
          <li>
          <button key={index}>{name}</button>
        </li></div>
        ))}
      
    </div>
  );
}



export default ArtistList;