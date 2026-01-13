// components/Header.jsx
'use client'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        {/* Убрали .nav-container, оставили только .nav-content */}
        <div className="nav-content">
          <a href="#" className="nav-element logo">
            <div className="logo-wrapper">
              <span style={{
                fontSize: '48px', 
                fontWeight: '700', 
                color: 'currentColor',
                lineHeight: '1'
              }}>
                STACKROOM
              </span>
            </div>
          </a>
          
          <nav className="nav-desktop">
            <a href="#services" className="nav-element">Сервисы</a>
            <a href="#about" className="nav-element">О нас</a>
            <a href="#articles" className="nav-element">Блог</a>
            <a href="#contact" className="nav-element hello">
              <div className="star-icon-corner">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <g clipPath="url(#clip0_275_1034)">
                    <path d="M39.317 15.7815L38.0424 11.858L25.0584 16.0768L33.0832 5.03198L29.7458 2.60726L21.721 13.6526V0H17.596V13.6526L9.57122 2.60726L6.23434 5.03198L14.2586 16.0768L1.27466 11.858L0 15.7815L12.984 20.0003L0 24.219L1.27466 28.142L14.2586 23.9232L6.23434 34.968L9.57122 37.3927L17.596 26.3479V40H21.721V26.3479L29.7458 37.3927L33.0832 34.968L25.0584 23.9232L38.0424 28.142L39.317 24.219L26.333 20.0003L39.317 15.7815Z" fill="currentColor"/>
                  </g>
                </svg>
              </div>
              Скажи привет <span className="highlight"></span>
            </a>
            <a href="#projects" className="nav-element projects">Проекты</a>
          </nav>

          <button 
            className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            <span className="burger-dot"></span>
            <span className="burger-dot"></span>
            <span className="burger-dot"></span>
            <span className="burger-dot"></span>
          </button>
        </div>
      </header>

      {/* Мобильное меню (выдвигается справа) */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)}>
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <nav className="mobile-nav">
            <a href="#services" className="mobile-nav-item" onClick={handleNavClick}>
              <span className="mobile-nav-text">Services</span>
            </a>
            <a href="#about" className="mobile-nav-item" onClick={handleNavClick}>
              <span className="mobile-nav-text">About Us</span>
            </a>
            <a href="#articles" className="mobile-nav-item" onClick={handleNavClick}>
              <span className="mobile-nav-text">Articles</span>
            </a>
            <a href="#contact" className="mobile-nav-item hello" onClick={handleNavClick}>
              <div className="star-icon-corner">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <g clipPath="url(#clip0_275_1034)">
                    <path d="M39.317 15.7815L38.0424 11.858L25.0584 16.0768L33.0832 5.03198L29.7458 2.60726L21.721 13.6526V0H17.596V13.6526L9.57122 2.60726L6.23434 5.03198L14.2586 16.0768L1.27466 11.858L0 15.7815L12.984 20.0003L0 24.219L1.27466 28.142L14.2586 23.9232L6.23434 34.968L9.57122 37.3927L17.596 26.3479V40H21.721V26.3479L29.7458 37.3927L33.0832 34.968L25.0584 23.9232L38.0424 28.142L39.317 24.219L26.333 20.0003L39.317 15.7815Z" fill="currentColor"/>
                  </g>
                </svg>
              </div>
              Say <span className="highlight">Halló</span>
            </a>
            <a href="#projects" className="mobile-nav-item" onClick={handleNavClick}>
              <span className="mobile-nav-text">Projects</span>
            </a>
          </nav>
          
          <div className="mobile-menu-footer">
            <div className="mobile-contact">
              <p className="mobile-contact-label">Get in touch</p>
              <a href="mailto:hello@stackroom.com" className="mobile-contact-email">
                hello@stackroom.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nav-element.hello {
          position: relative;
          padding-top: 30px;
        }
        
        .star-icon-corner {
          position: absolute;
          top: 15px;
          right: 20px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fa6151;
          opacity: 0.9;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        
        .star-icon-corner svg {
          width: 100%;
          height: 100%;
        }
        
        .nav-element.hello:hover .star-icon-corner {
          opacity: 1;
          transform: rotate(15deg) scale(1.1);
        }
        
        .mobile-nav-item.hello {
          position: relative;
          padding-top: 30px;
        }
        
        .mobile-nav-item.hello .star-icon-corner {
          position: absolute;
          top: 12px;
          right: 20px;
          width: 20px;
          height: 20px;
          color: #fa6151;
        }
        
        .highlight {
          font-weight: 600;
          color: #fa6151 !important;
        }
        
        .nav-element.hello:hover .highlight {
          color: var(--black) !important;
        }
        
        .mobile-nav-item.hello:hover .highlight {
          color: var(--black) !important;
        }
      `}</style>
    </>
  )
}
