import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowCards from './components/ShowCards';
import ArtistList from "./components/TheArtists/ArtistList";
import ShowArt from "./components/TheCards/ShowArt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/set/:setCode" element={<div>

      
<section class="layout">
  <div class="sidebar"><ArtistList /></div>
  <div class="body"><ShowCards /> <ShowArt name='Bloodflow Connoisseur.png'></ShowArt></div>
</section>
            

       

        
          </div>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}
   //<ShowArt name="Angel of Flight Alabaster.png" />
export default App;
