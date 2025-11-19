import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './DarkModeContext';
import ScrollToTop from './ScrollToTop'; // <-- new import
import './index.css';
import Home from './Home.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Dev from './Dev.jsx';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <ScrollToTop />  {/* <-- ensures scroll resets on every route change */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dev" element={<Dev />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
