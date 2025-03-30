// src/App.js

import { useState, useEffect } from 'react';
import './App.css';
import David from './UI/David/David';
import Header from './UI/Header/Header';
import ProjectList from './UI/ProjectList/ProjectList';

function App() {
  const [items, setItems] = useState([
    { index: 1, text: 'FP1', link: 'https://dimenicetry.github.io/SLAYSOLVE', isHovered: false, isClicked: false },
    { index: 2, text: 'FP2', isHovered: false, isClicked: false },
    { index: 3, text: 'FP1', isHovered: false, isClicked: false },
  ]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = (index) => {
    const newItems = [...items];
    newItems[index].isHovered = true;
    setItems(newItems);
  };

  const handleMouseLeave = (index) => {
    const newItems = [...items];
    newItems[index].isHovered = false;
    setItems(newItems);
  };

  const handleMouseClick = (index) => {
    const newItems = [...items];
    newItems[index].isClicked = true;
    setItems(newItems);
  };

  return (
    <div className={`app-container ${isMobile ? 'mobile' : ''}`}>
      <David />
      <div className="App">
        <ul className='projectList'>
          {items.map((item, index) => (
            <ProjectList
              key={item.index}
              item={item}
              index={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseClick={handleMouseClick}
            />
          ))}
        </ul>
        <Header />
      </div>
    </div>
  );
}

export default App;
