// components/Header.jsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const dropdownTimeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const servicesMenu = [
    {
      title: 'Внедрение Битрикс24',
      href: '/services/bitrix24-implementation',
      description: 'Полное внедрение CRM под ваш бизнес'
    },
    {
      title: 'Сопровождение Битрикс24',
      href: '/services/bitrix24-support',
      description: 'Техническая поддержка и развитие системы'
    },
    {
      title: 'Тарифы Битрикс24',
      href: '/services/bitrix24-pricing',
      description: 'Выбор оптимального тарифного плана'
    },
    {
      title: 'StackLink',
      href: '/services/stacklink',
      description: 'Решение для удаленного доступа к оборудованию'
    }
  ]

  // Hover handlers для десктопного меню
  const handleServicesMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setIsServicesDropdownOpen(true)
  }

  const handleServicesMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesDropdownOpen(false)
    }, 200)
  }

  const handleDropdownClick = () => {
    setIsServicesDropdownOpen(false)
    setIsMenuOpen(false)
  }

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  const handleNavigation = (e, href) => {
    e.preventDefault()
    router.push(href)
    setIsMenuOpen(false)
    setIsServicesDropdownOpen(false)
  }

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <a href="/" className="nav-element logo" onClick={(e) => {e.preventDefault(); router.push('/')}}>
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
            {/* Выпадающее меню "Сервисы" с hover поведением */}
            <div
              className="services-dropdown-trigger"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
              style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', height: '96px', zIndex: 1001 }}
            >
              <div className="nav-element services-dropdown-wrapper" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', width: '100%', height: '100%', margin: 0, overflow: 'visible' }}>
                <span>Сервисы</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  className="dropdown-arrow"
                  style={{
                    marginLeft: '8px',
                    marginBottom: '20px',
                    transition: 'transform 0.2s ease',
                    transform: isServicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  <path d="M6 8.5L1.5 4H10.5L6 8.5Z" />
                </svg>
              </div>
              
              {/* Выпадающий список */}
              <AnimatePresence>
                {isServicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="services-dropdown-menu"
                    onMouseEnter={handleServicesMouseEnter}
                    onMouseLeave={handleServicesMouseLeave}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: 'transparent',
                      backdropFilter: 'none',
                      WebkitBackdropFilter: 'none',
                      border: 'none',
                      borderRadius: '0',
                      padding: '12px 0 0 0',
                      boxShadow: 'none',
                      zIndex: 9999,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {servicesMenu.map((service, index) => (
                      <motion.a
                        key={service.title}
                        href={service.href}
                        onClick={(e) => handleNavigation(e, service.href)}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="dropdown-item"
                        style={{
                          display: 'block',
                          padding: '0 20px 20px 20px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          color: 'var(--black)',
                          fontWeight: '500',
                          fontSize: '16px',
                          letterSpacing: '0.02em',
                          transition: 'all 0.2s ease',
                          marginBottom: '6px',
                          background: 'rgba(248, 248, 248, 1)',
                          border: '1px solid rgba(19, 19, 19, 0.08)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                          width: '100%',
                          boxSizing: 'border-box',
                          height: '96px',
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'flex-start',
                          position: 'relative',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textAlign: 'left',
                          lineHeight: '1'
                        }}
                      >
                        <div className="dropdown-item-content">
                          <span className="dropdown-item-title" style={{ display: 'block', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>{service.title}</span>
                          <span className="dropdown-item-desc" style={{ display: 'block', fontSize: '12px', opacity: '0.7', lineHeight: '1.3' }}>{service.description}</span>
                        </div>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <a href="/#about" className="nav-element" onClick={(e) => {e.preventDefault(); router.push('/#about');}}>О нас</a>
            <a href="/#articles" className="nav-element" onClick={(e) => {e.preventDefault(); router.push('/#articles');}}>Блог</a>
            
            {/* Кнопка "Скажи привет" с исправленной звездой */}
            <a href="/contact" className="nav-element hello" onClick={(e) => {e.preventDefault(); router.push('/contact');}}>
              <div className="star-icon-corner">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <g clipPath="url(#clip0_275_1034)">
                    <path d="M39.317 15.7815L38.0424 11.858L25.0584 16.0768L33.0832 5.03198L29.7458 2.60726L21.721 13.6526V0H17.596V13.6526L9.57122 2.60726L6.23434 5.03198L14.2586 16.0768L1.27466 11.858L0 15.7815L12.984 20.0003L0 24.219L1.27466 28.142L14.2586 23.9232L6.23434 34.968L9.57122 37.3927L17.596 26.3479V40H21.721V26.3479L29.7458 37.3927L33.0832 34.968L25.0584 23.9232L38.0424 28.142L39.317 24.219L26.333 20.0003L39.317 15.7815Z" fill="currentColor"/>
                  </g>
                </svg>
              </div>
              Скажи привет <span className="highlight"></span>
            </a>
            
            <a href="/#projects" className="nav-element projects" onClick={(e) => {e.preventDefault(); router.push('/#projects');}}>Проекты</a>
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
            {/* Мобильное выпадающее меню */}
            <div 
              className="mobile-nav-item services-dropdown-mobile"
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              style={{ 
                position: 'relative',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}>
                <span className="mobile-nav-text">Сервисы</span>
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="currentColor"
                  style={{
                    transition: 'transform 0.2s ease',
                    transform: isServicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  <path d="M6 8.5L1.5 4H10.5L6 8.5Z" />
                </svg>
              </div>
              
              <AnimatePresence>
                {isServicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mobile-dropdown-content"
                  >
                    {servicesMenu.map((service) => (
                      <a
                        key={service.title}
                        href={service.href}
                        onClick={(e) => handleNavigation(e, service.href)}
                        className="mobile-submenu-item"
                      >
                        <div className="mobile-submenu-title">{service.title}</div>
                        <div className="mobile-submenu-desc">{service.description}</div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <a href="/#about" className="mobile-nav-item" onClick={(e) => {e.preventDefault(); router.push('/#about'); handleNavClick();}}>
              <span className="mobile-nav-text">О нас</span>
            </a>
            <a href="/#articles" className="mobile-nav-item" onClick={(e) => {e.preventDefault(); router.push('/#articles'); handleNavClick();}}>
              <span className="mobile-nav-text">Блог</span>
            </a>
            
            {/* Мобильная кнопка "Скажи привет" с исправленной звездой */}
            <a href="/contact" className="mobile-nav-item hello" onClick={(e) => {e.preventDefault(); router.push('/contact'); handleNavClick();}}>
              <div className="star-icon-corner">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <g clipPath="url(#clip0_275_1034)">
                    <path d="M39.317 15.7815L38.0424 11.858L25.0584 16.0768L33.0832 5.03198L29.7458 2.60726L21.721 13.6526V0H17.596V13.6526L9.57122 2.60726L6.23434 5.03198L14.2586 16.0768L1.27466 11.858L0 15.7815L12.984 20.0003L0 24.219L1.27466 28.142L14.2586 23.9232L6.23434 34.968L9.57122 37.3927L17.596 26.3479V40H21.721V26.3479L29.7458 37.3927L33.0832 34.968L25.0584 23.9232L38.0424 28.142L39.317 24.219L26.333 20.0003L39.317 15.7815Z" fill="currentColor"/>
                  </g>
                </svg>
              </div>
              <span className="highlight">Скажи привет!</span>
            </a>
            
            <a href="/#projects" className="mobile-nav-item" onClick={(e) => {e.preventDefault(); router.push('/#projects'); handleNavClick();}}>
              <span className="mobile-nav-text">Проекты</span>
            </a>
          </nav>
          
          <div className="mobile-menu-footer">
            <div className="mobile-contact">
              <p className="mobile-contact-label">Get in touch</p>
              <a href="mailto:hello@stackroom.ru" className="mobile-contact-email">
                hello@stackroom.ru
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Стили для кнопки "Скажи привет" */
        .nav-element.hello {
          position: relative;
          padding-top: 30px;
        }
        
        .nav-element.hello .star-icon-corner {
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
        
        .nav-element.hello .star-icon-corner svg {
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
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .mobile-nav-item.hello .star-icon-corner svg {
          width: 16px;
          height: 16px;
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
