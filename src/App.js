import { useState } from 'react';
import './App.css';
import David from './UI/David';

function App() {
  const [isHovered, setisHovered] = useState(false)
  const [isClicked, setisClicked] = useState(false)
  const [items, setItems] = useState ([
    {index: 1, text:'University', isHovered: false, isClicked: false},
    {index: 1,text:'Антошка', isHovered: false, isClicked: false},
    {index: 1,text:'Ромашка', isHovered: false, isClicked: false},
    {index: 1,text:'Диморик', isHovered: false, isClicked: false},
    {index: 1,text:'Ромашка', isHovered: false, isClicked: false},
    {index: 1,text:'ФЕДОРИК', isHovered: false, isClicked: false},
    {index: 1,text:'ФЕДОРИК', isHovered: false, isClicked: false},
    {index: 1,text:'ФЕДОРИК', isHovered: false, isClicked: false},
    {index: 1,text:'ФЕДОРИК', isHovered: false, isClicked: false},
    {index: 1,text:'ФЕДОРИК', isHovered: false, isClicked: false},
    {index: 1,text:'Максимка ', isHovered: false, isClicked: false},
  ]
  )
  const handleMouseEnter = (index) => {
    const newItems = [...items];
    newItems[index].isHovered = true
    setItems(newItems)
  }
  const handleMouseLeave = (index) => {
    const newItems = [...items];
    newItems[index].isHovered = false
    setItems(newItems)
  }
  const handleMouseClick = (index) => {
    const newItems = [...items];
    newItems[index].isClicked = true
    setItems(newItems)
  }
  
  return (
    <>
      <David />
    <header>
        <a className='logo'><span>Dmitry</span><span>Chernyshov</span></a>
        <div className='header-info'>
          <div className='header-info-main'>
            <div className='header-info-card'>
            <span>TRANSNEFT</span>
            <span>Web Developer</span>
            </div>
            <div className='header-info-card'>
            <span>Moscow, Russia</span>
            <a>chdd04@gmail.com</a>
            </div>
          </div>
          <div className='header-info-contact header-info-card'>
            <a>instagram</a>
            <a>hh.ru</a>
            <a>telegram</a>
          </div>
          
        </div>
        <p>Copyright © 2024 Dchernyshov Co. All rights reserved.</p>
      </header>
      <div className="App">
        <ul>
          {items.map((item, index) => (
            <li
              className={`projectList ${item.isHovered ? 'hovered' : ''} ${item.isClicked ? 'active' : ''}`}
              key={item.index} // Используйте item.index вместо item.id
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onMouseDown={() => handleMouseClick(index)}
            >
              <div>
                <a>{item.text}</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
    </>
  );

  
}

export default App;
