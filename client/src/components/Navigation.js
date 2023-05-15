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


  //Uses the setCode in the text, describing which set is currently viewed
  return (
    <nav>
      <div className="navi-setCode">
        <span>
          <div className="navi-title">Shadows of the Past ({setCode.toLocaleUpperCase()}) by Bjørn Lundin and Kenneth Møller</div>
        </span>
      </div>
    </nav>
  );
}

export default Navigation;