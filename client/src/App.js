import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SetData from './components/SetData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/set/:setCode" element={<SetData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
