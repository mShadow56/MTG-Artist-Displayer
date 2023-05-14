import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowArtists from './components/ShowArtists';
import ShowCards from './components/ShowCards';
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/set/:setCode" element={
          <div>
            <Navigation />
          <div className="page-view">
            <ShowArtists/>
            <ShowCards/>
          </div></div>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
