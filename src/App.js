import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Certification from './components/Certification';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certification />
      <Contact />
      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Chinmaya Kumar Mallick. All rights reserved.</p>
          <p>Cloud & DevOps Engineer</p>
        </div>
      </footer>
    </div>
  );
}

export default App;