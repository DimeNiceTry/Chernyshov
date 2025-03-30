// src/UI/ProjectList/ProjectList.js

import React from 'react';
import './ProjectList.css';

const ProjectList = ({ item, index, onMouseEnter, onMouseLeave, onMouseClick }) => {
  const handleClick = () => {
    onMouseClick(index);
    if (item.link) {
      window.open(item.link, '_blank'); // Открытие ссылки в новой вкладке
    }
  };

  return (
    <div className='projectListItem-container'>
    <li
      className={`projectListItem ${item.isHovered ? 'hovered' : ''} ${item.isClicked ? 'clicked' : ''}`}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave(index)}
      onMouseDown={handleClick}
    >
      <div>
        <a>{item.text}</a>
      </div>
    </li>
    </div>

  );
};

export default ProjectList;
