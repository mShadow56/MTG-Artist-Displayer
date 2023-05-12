import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowCards from './components/ShowCards';
import ShowArt from './components/ShowArt';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/set/:setCode" element={<div>
          <ShowCards>
            
          </ShowCards>
          <ShowArt>

          </ShowArt>
          </div>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
