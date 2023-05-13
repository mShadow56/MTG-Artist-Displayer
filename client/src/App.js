import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowArtists from './components/ShowArtists';
//import ShowAllArt from './components/TheCards/ShowAllArt';
import ShowCards from './components/ShowCards';
import ShowArtByArtist from "./components/ShowArtByArtist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/set/:setCode" element={
          <div className="page-view">
            <ShowArtists/>
            
            <ShowCards />
          </div>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
