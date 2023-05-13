import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowArtists from './components/ShowArtists';
import ShowArt from './components/ShowArt';
import ShowCards from './components/ShowCards';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/set/:setCode" element={
          <div className="page-view">
            <ShowArtists/>
            <ShowArt/>
            <ShowCards/>
          </div>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
