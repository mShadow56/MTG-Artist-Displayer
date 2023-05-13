import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ShowAllArt() {
  
    const { setCode } = useParams();
    const [backendData, setBackendData] = useState([{}]);
  
    useEffect(() => {
      fetch(`/set/${setCode}`)
        .then(response => response.json())
        .then(data => {
          setBackendData(data);
        });
    }, [setCode]);

    const cardNamesArray = backendData.map(item => item['name']);
    const sortedArrayOfCardNames=cardNamesArray.sort();
        console.log(sortedArrayOfCardNames);

  return (
    <div>
<h2>Cards:</h2>
    
      
    {sortedArrayOfCardNames.map((name, index) => (
      <div class="card">
      
      <img src={require('../../server/utils/images/'+name+'.png')} style={{ width: 250, height: 300 }} key={index} />
   </div>
    ))}
        
     
    </div>
  );

 
  
}
export default ShowAllArt;

//return (    <div>      <img src={myImage+ '/Angel of Flight Alabaster.png'} alt="My Image" /* use the img tag with the src attribute */ />     </div>  );
  