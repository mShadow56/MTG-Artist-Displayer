import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowArtists from './components/ShowArtists';
import ShowCards from './components/ShowCards';
import Navigation from "./components/Navigation";

/**
 * This App.js sets up all the routes in the app
 * ATM there is only one route at '/set/:setCode' which, when visited, sets up the page using various local components
 */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/set/:setCode" element={
          <div>
            <Navigation />
            <div className="page-view">
              <ShowArtists />
              <ShowCards />
            </div>
          </div>
        }>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
