import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SVGLearningApp from './SVGLearningApp';
import './App.css';

function App() {
  return (
    <Router basename="/svg-learning-app">
      <div className="App app-container">
        <Routes>
          <Route path="/" element={<SVGLearningApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

