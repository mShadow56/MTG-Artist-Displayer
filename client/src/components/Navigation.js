import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
    const { setCode } = useParams();
    const [backendData, setBackendData] = useState([{}]);
  
    useEffect(() => {
      fetch(`/set/${setCode}`)
        .then(response => response.json())
        .then(data => {
          setBackendData(data);
        });
    }, [setCode]);


  return (
    <nav className="navbar navbar-light bg-light">
        <div className="navi-setCode">
      <span className="navbar-brand mb-0 h1 ml-auto">Shadows of the Past ({setCode.toLocaleUpperCase()}) by Bjørn Lundin and Kenneth Møller</span>
      </div>
    </nav>
  );
}

export default Navigation;