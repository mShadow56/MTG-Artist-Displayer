import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Navigation() {
  const { setCode } = useParams();

  useEffect(() => {
    fetch(`/set/${setCode}`)
  }, [setCode]);


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