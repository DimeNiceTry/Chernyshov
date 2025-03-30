import React, { useState, useEffect } from 'react'
import classes from "./Header.module.css"

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Добавляем класс к body при развороте на мобильных устройствах
    if (isMobile && isExpanded) {
      document.body.classList.add('menu-expanded');
      document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку под открытым меню
    } else {
      document.body.classList.remove('menu-expanded');
      document.body.style.overflow = ''; // Возвращаем прокрутку
    }
    
    return () => {
      document.body.classList.remove('menu-expanded');
      document.body.style.overflow = '';
    };
  }, [isExpanded, isMobile]);

  const toggleHeader = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <header className={`${isExpanded ? classes['expanded'] : ''} ${isMobile ? classes['mobile'] : ''}`}>
      <div className={classes['header-toggle']} onClick={toggleHeader}>
        <div className={classes['toggle-icon']}>
          {isExpanded ? '×' : '☰'}
        </div>
      </div>
      <a target='_blank' href='https://dimenicetry.github.io/DCSite' className={`${classes.logo} ${classes['header-link']}`} ><span>Dmitry</span><span>Chernyshov</span></a>
      <div className={classes['header-info']}>
        <div className={classes['header-info-main']}>
          <div className={classes['header-info-card']}>
            <span className={classes['header-span']}>TRANSNEFT</span>
            <span className={classes['header-span']}>Frontend Developer</span>
            <span className={classes['header-span']}>Moscow, Russia</span>
          </div>
        </div>
        <div className={`${classes['header-info-contact']} ${classes['header-info-card']}`}>
          <a target='_blank' href='https://www.instagram.com/nice_try_bruh/profilecard/?igsh=dmYwdnZkbndhd2ds' className={classes['header-link']}>instagram</a>
          <a target='_blank' href='https://dimenicetrymirror.github.io' className={classes['header-link']}>CV</a>
          <a target='_blank' href='https://t.me/nice_try_bruh' className={classes['header-link']}>telegram</a>
          <a target='_blank' href="mailto:chdd04@gmail.com"  className={classes['header-link']}>chdd04@gmail.com</a>
        </div>
      </div>
    </header>
  )
}

export default Header