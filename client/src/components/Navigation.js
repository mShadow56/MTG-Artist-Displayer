import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

/**
 * This is the component for the navigation bar at the top of the /set/:setCode pages
 */
function Navigation() {
  //Retrieves the setCode that is written in the address/path
  const { setCode } = useParams();

  useEffect(() => {
    fetch(`/set/${setCode}`)
  }, [setCode]);

  /**
   * This maps the set code values from the cards table to relevant set titles -- !incomplete!
   */
  const setCodeMap = {
    "SIS": "Shadows of the Past", // setCode: setName
    "LTR": "The Lord of the Rings: Tales of Middle-earth" // setCode: setName
  };

  //Uses the setCode in the text, describing which set is currently viewed
  return (
    <nav>
      <div className="navi-setCode">
        <span>
          <div className="navi-title">{setCodeMap[setCode]} ({setCode.toLocaleUpperCase()})</div>
        </span>
      </div>
    </nav>
  );
}

export default Navigation;