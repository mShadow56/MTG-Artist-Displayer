import React from 'react';


function ShowArt(props) {
  

  return (
    <div>

        <img src={require('../../server/utils/images/'+props.name)} style={{ width: 250, height: 300 }} />
     
    </div>
  );

 
  
}
export default ShowArt;

//return (    <div>      <img src={myImage+ '/Angel of Flight Alabaster.png'} alt="My Image" /* use the img tag with the src attribute */ />     </div>  );
  