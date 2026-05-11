import React, { useState, useEffect } from 'react';
import { TOTAL_SCREENS, GET_SCREEN_INDEX } from '../../../utilities/commonUtils';
import ScrollService from '../../../utilities/ScrollService';
import FaBar from '@/../../public/bar03.png';
import './Header.css';

const THEME_KEY = 'portfolio-theme';

export default function Header() {
  const [activeUrl, setActiveUrl]               = useState('Home');
  const [showHeaderOptions, setShowHeaderOptions] = useState(false);
  const [scrolled, setScrolled]                 = useState(false);
  const [isColor, setIsColor]                   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // load saved theme on mount; default is b&w
  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    const color = saved === 'color';
    setIsColor(color);
    document.body.classList.toggle('theme-color', color);
  }, []);

  const toggleTheme = () => {
    const next = !isColor;
    setIsColor(next);
    document.body.classList.add('theme-switching');
    document.body.classList.toggle('theme-color', next);
    localStorage.setItem(THEME_KEY, next ? 'color' : 'bw');
    setTimeout(() => document.body.classList.remove('theme-switching'), 500);
  };

  useEffect(() => {
    const sub = ScrollService.currentScreenBroadCaster.subscribe((screen) => {
      if (!screen?.screenInView) return;
      const idx = GET_SCREEN_INDEX(screen.screenInView);
      if (idx >= 0) setActiveUrl(screen.screenInView);
    });
    return () => sub.unsubscribe();
  }, []);

  const switchScreen = (screen) => {
    setActiveUrl(screen.screen_name);
    setShowHeaderOptions(false);
    const el = document.getElementById(screen.screen_name);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`header-container${scrolled ? ' scrolled' : ''}`}>
      <div className="header-parent">
        <div
          className="header-logo"
          onClick={() => switchScreen(TOTAL_SCREENS[0])}
        >
          <span className="logo-text">DURAN</span>
          <span className="logo-dot">.</span>
        </div>

        {/* Desktop nav */}
        <nav className="header-options">
          {TOTAL_SCREENS.map((screen) => (
            <div
              key={screen.screen_name}
              className={`header-option${activeUrl === screen.screen_name ? ' selected-header-option' : ''}`}
              onClick={() => switchScreen(screen)}
            >
              <span>{screen.screen_name}</span>
              <div className="nav-underline" />
            </div>
          ))}
        </nav>

        {/* Theme toggle */}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <span className="theme-toggle-track">
            <span className={`theme-toggle-thumb${isColor ? ' color' : ''}`} />
          </span>
          <span className="theme-toggle-label">{isColor ? 'Color' : 'B&W'}</span>
        </button>

        {/* Hamburger */}
        <button
          className="header-hamburger"
          onClick={() => setShowHeaderOptions(!showHeaderOptions)}
          aria-label="Toggle menu"
        >
          <img src={FaBar} alt="menu" style={{ width: '28px', filter: 'invert(1)' }} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${showHeaderOptions ? ' open' : ''}`}>
        {TOTAL_SCREENS.map((screen) => (
          <div
            key={screen.screen_name}
            className={`mobile-nav-item${activeUrl === screen.screen_name ? ' active' : ''}`}
            onClick={() => switchScreen(screen)}
          >
            {screen.screen_name}
          </div>
        ))}
      </div>
      {showHeaderOptions && (
        <div className="drawer-backdrop" onClick={() => setShowHeaderOptions(false)} />
      )}
    </header>
  );
}
