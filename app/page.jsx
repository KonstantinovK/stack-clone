// app/page.jsx - ЕДИНЫЙ ФАЙЛ ГЛАВНОЙ СТРАНИЦЫ
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function HomePage() {
  // ===================== СОСТОЯНИЯ =====================
  
  // Header states
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Hero states
  const [isHovered, setIsHovered] = useState(false)
  const marqueeRef = useRef(null)

// ===================== ПЛАВНАЯ ПРОКРУТКА =====================
const handleSmoothScroll = (e) => {
  e.preventDefault();
  
  const targetId = e.currentTarget.getAttribute('href');
  if (!targetId || targetId === '#') return;
  
  // Закрываем мобильное меню
  setIsMenuOpen(false);
  
  const id = targetId.replace('#', '');
  const targetElement = document.getElementById(id);
  
  if (targetElement) {
    // Используем scrollIntoView с полифиллом для offset
    const yOffset = -140; // Отступ для header
    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
    
    window.history.pushState(null, '', targetId);
  }
};
  
  // FigmaCursors states
  const containerRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 400 })
  const [cursors, setCursors] = useState([
    { 
      id: 1, 
      name: 'Алексей', 
      role: 'Frontend Lead', 
      x: 150, y: 120, 
      color: '#bb63beff', 
      speedX: 2.7, 
      speedY: 2.4,
    },
    { 
      id: 2, 
      name: 'Мария', 
      role: 'UI/UX Designer', 
      x: 350, y: 60, 
      color: '#724ecdff', 
      speedX: -1.5, 
      speedY: 2.6,
    },
    { 
      id: 3, 
      name: 'Дмитрий', 
      role: 'Backend Dev', 
      x: 550, y: 180, 
      color: '#fb8d4dff', 
      speedX: 2.6, 
      speedY: -1.3,
    },
    { 
      id: 4, 
      name: 'Анна', 
      role: 'Project Manager', 
      x: 250, y: 280, 
      color: '#17b98eff', 
      speedX: -1.4, 
      speedY: 1.7,
    },
    { 
      id: 5, 
      name: 'Константин', 
      role: 'Product Manager', 
      x: 250, y: 280, 
      color: '#1786b9ff', 
      speedX: 3.4, 
      speedY: -3.7,
    },
  ])
  
  // ===================== ДАННЫЕ =====================
  
  const marqueeItems = [
    "Внедрение CRM систем",
    "Разработка сайтов и бизнес-приложений", 
    "IT интеграция",
    "Поддержка и сопровождение систем"
  ]
  
  const allItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]
  
  const services = [
    {
      id: 1,
      title: 'Веб-разработка',
      description: 'Создаем современные веб-приложения на React, Next.js и других современных технологиях. Полный цикл разработки от прототипа до запуска.'
    },
    {
      id: 2,
      title: 'UI/UX Дизайн',
      description: 'Проектируем интуитивные интерфейсы, которые нравятся пользователям. Исследования пользователей, прототипирование, тестирование.'
    },
    {
      id: 3,
      title: 'IT интеграция',
      description: 'Поможем с проектами различной сложности. Установим и настроим оборудование под ваши задачи. On-premise и гибридные решения.'
    },
    {
      id: 4,
      title: 'Технический консалтинг',
      description: 'Помогаем выбрать оптимальные технологии и архитектуру для вашего проекта. Аудит существующих систем, разработка стратегии.'
    }
  ]
  
  const projects = [
    { id: 1, title: 'Интеграция CRM', category: 'Интеграция', image: '/images/projects/crm-integration.webp'},
    { id: 2, title: 'UCloud Москва', category: 'Пусконаладка', image: '/images/projects/u-cloud.webp'},
    { id: 3, title: 'Alicloud М9 Москва', category: 'Пусконаладка', image: '/images/projects/alicloud-moscow.webp'},
    { id: 4, title: 'Дизайн приложения', category: 'UI/UX Design', image: '/images/projects/ui-design.webp'},
    { id: 5, title: 'Сайт для Турагенства', category: 'Web Development', image: '/images/projects/corporate-portal.webp'},
    { id: 6, title: 'MVP мобильного приложения', category: 'Mobile App', image: '/images/projects/mobile-app-mvp.webp'},
    { id: 7, title: 'Аналитический портал', category: 'UI/UX Design', image: '/images/projects/analytics-portal.webp'},
    { id: 8, title: 'Service Desk система', category: 'Web Development', image: '/images/projects/service-desk.webp'},
  ]
  
  const clients = [
    { name: 'Client 1', logo: '/images/client1.svg' },
    { name: 'Client 2', logo: '/images/client2.svg' },
    { name: 'Client 3', logo: '/images/client3.svg' },
    { name: 'Client 4', logo: '/images/client4.svg' },
    { name: 'Client 5', logo: '/images/client5.svg' },
    { name: 'Client 6', logo: '/images/client6.svg' }
  ]
  
  // ===================== ЭФФЕКТЫ =====================
  
  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Mobile menu body lock
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
  
  // FigmaCursors container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setContainerSize({ width, height })
      }
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  
  // FigmaCursors animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCursors(prev => prev.map(cursor => {
        const randomFactor = 0.03
        const newSpeedX = cursor.speedX + (Math.random() - 0.5) * randomFactor
        const newSpeedY = cursor.speedY + (Math.random() - 0.5) * randomFactor
        
        const maxSpeed = 1.2
        const speedX = Math.max(-maxSpeed, Math.min(maxSpeed, newSpeedX))
        const speedY = Math.max(-maxSpeed, Math.min(maxSpeed, newSpeedY))
        
        let newX = cursor.x + speedX
        let newY = cursor.y + speedY
        
        if (newX < 30 || newX > containerSize.width - 70) {
          return { 
            ...cursor, 
            speedX: -speedX * (0.8 + Math.random() * 0.4),
            speedY: speedY * (0.9 + Math.random() * 0.2),
            x: newX < 30 ? 30 : containerSize.width - 70,
            y: newY,
          }
        }
        
        if (newY < 30 || newY > containerSize.height - 60) {
          return { 
            ...cursor, 
            speedX: speedX * (0.9 + Math.random() * 0.2),
            speedY: -speedY * (0.8 + Math.random() * 0.4),
            x: newX,
            y: newY < 30 ? 30 : containerSize.height - 60,
          }
        }
        
        return { 
          ...cursor, 
          x: newX,
          y: newY,
          speedX: speedX,
          speedY: speedY,
        }
      }))
    }, 40)

    return () => clearInterval(interval)
  }, [containerSize])
  
  // ===================== ОБРАБОТЧИКИ =====================
  
  const handleNavClick = () => {
    setIsMenuOpen(false)
  }
  
  // ===================== РЕНДЕР =====================
  
  return (
    <main className="home-main">
      
      {/* ===================== HEADER ===================== */}
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
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
            <a href="#services" className="nav-element" onClick={handleSmoothScroll}>Сервисы</a>
            <a href="#about" className="nav-element" onClick={handleSmoothScroll}>О нас</a>
            <a href="#articles" className="nav-element" onClick={handleSmoothScroll}>Блог</a>
            <a href="/contact" className="nav-element hello">
              <div className="star-icon-corner">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <g clipPath="url(#clip0_275_1034)">
                    <path d="M39.317 15.7815L38.0424 11.858L25.0584 16.0768L33.0832 5.03198L29.7458 2.60726L21.721 13.6526V0H17.596V13.6526L9.57122 2.60726L6.23434 5.03198L14.2586 16.0768L1.27466 11.858L0 15.7815L12.984 20.0003L0 24.219L1.27466 28.142L14.2586 23.9232L6.23434 34.968L9.57122 37.3927L17.596 26.3479V40H21.721V26.3479L29.7458 37.3927L33.0832 34.968L25.0584 23.9232L38.0424 28.142L39.317 24.219L26.333 20.0003L39.317 15.7815Z" fill="currentColor"/>
                  </g>
                </svg>
              </div>
              Скажи привет <span className="highlight"></span>
            </a>
            <a href="#projects" className="nav-element projects" onClick={handleSmoothScroll}>Проекты</a>
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
            <a href="#services" className="mobile-nav-item" onClick={(e) => {
              handleSmoothScroll(e);
              handleNavClick();
            }}>
              <span className="mobile-nav-text">Сервисы</span>
            </a>
            <a href="#about" className="mobile-nav-item" onClick={(e) => {
              handleSmoothScroll(e);
              handleNavClick();
            }}>
              <span className="mobile-nav-text">О нас</span>
            </a>
            <a href="#articles" className="mobile-nav-item" onClick={(e) => {
              handleSmoothScroll(e);
              handleNavClick();
            }}>
              <span className="mobile-nav-text">Блог</span>
            </a>
            <a href="/contact" className="mobile-nav-item hello" onClick={handleNavClick}>
              <div className="star-icon-corner">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <g clipPath="url(#clip0_275_1034)">
                    <path d="M39.317 15.7815L38.0424 11.858L25.0584 16.0768L33.0832 5.03198L29.7458 2.60726L21.721 13.6526V0H17.596V13.6526L9.57122 2.60726L6.23434 5.03198L14.2586 16.0768L1.27466 11.858L0 15.7815L12.984 20.0003L0 24.219L1.27466 28.142L14.2586 23.9232L6.23434 34.968L9.57122 37.3927L17.596 26.3479V40H21.721V26.3479L29.7458 37.3927L33.0832 34.968L25.0584 23.9232L38.0424 28.142L39.317 24.219L26.333 20.0003L39.317 15.7815Z" fill="currentColor"/>
                  </g>
                </svg>
              </div>
               <span className="highlight">Скажи привет!</span>
            </a>
            <a href="#projects" className="mobile-nav-item" onClick={(e) => {
              handleSmoothScroll(e);
              handleNavClick();
            }}>
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

      {/* ===================== HERO SECTION ===================== */}
      <section className="hero-section">
        <div className="hero-main-block">
          <div className="hero-top-container">
            <div className="hero-title-large">
              Здесь какой-то цепляющий <br /> 
              заголовок
            </div>
          </div>
          
          <div className="hero-subtitle-bottom">
            Создаем решения<br />
            которые помогают 
          </div>
        </div>
        
        <div className="hero-breakbar"
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
          <div className="breakbar-wrapper">
            <div 
              className={`marquee ${isHovered ? 'paused' : ''}`}
              ref={marqueeRef}
              style={{
                animationDuration: '60s',
                transition: 'animation-play-state 0.8s ease'
              }}
            >
              {allItems.map((item, index) => (
                <div key={index} className="marquee_inner">
                  <div className="rich-text-block">
                    <p><em>{item}</em></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SERVICES SECTION ===================== */}
      <section id="services" className="services-section">
        <div className="services-badge">
          <div className="badge_icon">
            <svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor">
              <path d="M30 20C35.523 20 40 15.523 40 9.99999C40 4.47698 35.523 0 30 0C24.477 0 20 4.47698 20 9.99999C20 4.47698 15.523 0 10 0C4.477 0 0 4.47698 0 9.99999C0 15.523 4.477 20 10 20C4.477 20 0 24.477 0 30C0 35.523 4.477 40 10 40C15.523 40 20 35.523 20 30C20 35.523 24.477 40 30 40C35.523 40 40 35.523 40 30C40 24.477 35.523 20 30 20Z"/>
            </svg>
          </div>
          <h2 className="badge_text">Что мы делаем</h2>
        </div>
        
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-card-header">
                <div className="service-number">
                  {service.id.toString().padStart(2, '0')}
                </div>
                <h3 className="service-title">{service.title}</h3>
              </div>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="services-breakbar">
          <div className="breakbar-content">
            <div className="breakbar-star-icon">
              <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                <g clipPath="url(#clip0_275_1034)">
                  <path d="M39.317 15.7815L38.0424 11.858L25.0584 16.0768L33.0832 5.03198L29.7458 2.60726L21.721 13.6526V0H17.596V13.6526L9.57122 2.60726L6.23434 5.03198L14.2586 16.0768L1.27466 11.858L0 15.7815L12.984 20.0003L0 24.219L1.27466 28.142L14.2586 23.9232L6.23434 34.968L9.57122 37.3927L17.596 26.3479V40H21.721V26.3479L29.7458 37.3927L33.0832 34.968L25.0584 23.9232L38.0424 28.142L39.317 24.219L26.333 20.0003L39.317 15.7815Z" fill="currentColor"/>
                </g>
              </svg>
            </div>
            
            <div className="breakbar-text">
              <div className="rich-text-block">
                <p>Только продуктовый подход</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PROJECTS SECTION ===================== */}
     <section id="projects" className="projects-section">
        <div className="projects-badge">
          <div className="badge_icon">
            <svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor">
              <path d="M30 20C35.523 20 40 15.523 40 9.99999C40 4.47698 35.523 0 30 0C24.477 0 20 4.47698 20 9.99999C20 4.47698 15.523 0 10 0C4.477 0 0 4.47698 0 9.99999C0 15.523 4.477 20 10 20C4.477 20 0 24.477 0 30C0 35.523 4.477 40 10 40C15.523 40 20 35.523 20 30C20 35.523 24.477 40 30 40C35.523 40 40 35.523 40 30C40 24.477 35.523 20 30 20Z"/>
            </svg>
          </div>
          <h2 className="badge_text">Наши проекты</h2>
        </div>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <a href="#" className="project-link">
                <div className="project-image">
                  <div className="project-image-container">
                    {project.image ? (
                     // Если есть картинка - показываем её
                     <img 
                        src={project.image} 
                        alt={project.title}
                        className="project-real-image"
                    />
                  ) : (
                      // Если нет картинки - показываем плейсхолдер
                    <div className="project-placeholder">
                      <span className="project-number">{project.id.toString().padStart(2, '0')}</span>
                    </div>
                  )}
                </div>
                  <div className="project-overlay">
                    <div className="project-info">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-category">{project.category}</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== ABOUT SECTION ===================== */}
      <section id="about" className="about-section">
        <div className="about-badge">
          <div className="badge_icon">
            <svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor">
              <path d="M30 20C35.523 20 40 15.523 40 9.99999C40 4.47698 35.523 0 30 0C24.477 0 20 4.47698 20 9.99999C20 4.47698 15.523 0 10 0C4.477 0 0 4.47698 0 9.99999C0 15.523 4.477 20 10 20C4.477 20 0 24.477 0 30C0 35.523 4.477 40 10 40C15.523 40 20 35.523 20 30C20 35.523 24.477 40 30 40C35.523 40 40 35.523 40 30C40 24.477 35.523 20 30 20Z"/>
              </svg>
          </div>
          <h2 className="badge_text">О нас</h2>
        </div>
        
        {/* Figma Cursors Component */}
        <div className="figma-cursors-section">
          <div className="figma-cursors-background">
            <div 
              ref={containerRef}
              className="figma-cursors-container"
              style={{ height: '400px' }}
            >
              {cursors.map(cursor => (
                <motion.div
                  key={cursor.id}
                  className="cursor-element"
                  style={{
                    position: 'absolute',
                    left: cursor.x,
                    top: cursor.y,
                  }}
                  animate={{
                    x: [0, 2, 0, -2, 0],
                    y: [0, -1, 0, 1, 0],
                  }}
                  transition={{
                    x: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <div className="cursor-pointer">
                    <svg width="22" height="21" viewBox="0 0 20 19" fill="none" style={{ color: cursor.color }}>
                      <path d="M7.52273 15.1152L7.52263 15.1151L3.90047 11.7092C3.2202 11.0697 3.1516 9.99996 3.74667 9.2794C3.74667 9.2794 3.74667 9.2794 3.74667 9.27939L3.80248 9.32548C4.36141 8.64858 5.34234 8.52526 6.05 9.04808L7.52273 15.1152ZM7.52273 15.1152C7.5415 15.1328 7.56047 15.15 7.57964 15.1668C8.38822 16.1131 9.59278 16.7151 10.9374 16.7151H11.6611C14.0993 16.7151 16.0758 14.7385 16.0758 12.3003V6.51056C16.0758 5.67116 15.3953 4.99074 14.556 4.99074C14.323 4.99074 14.1021 5.04321 13.9046 5.13702V4.33938C13.9046 3.49999 13.2241 2.81956 12.3848 2.81956C12.1043 2.81956 11.8414 2.89563 11.6158 3.02825C11.386 2.48063 10.8449 2.09584 10.2137 2.09584C9.37426 2.09584 8.69384 2.77629 8.69384 3.61566V3.68958C8.49636 3.59577 8.27549 3.54329 8.04249 3.54329C7.20309 3.54329 6.52267 4.22371 6.52267 5.06311V9.3073L7.52273 15.1152ZM10.865 8.68173V8.7541H10.9374H11.6611H11.7335V8.68173V4.33938V4.33807C11.7341 3.97893 12.0255 3.68803 12.3848 3.68803C12.7445 3.68803 13.0362 3.97965 13.0362 4.33938V8.68173V8.7541H13.1086H13.8323H13.9046V8.68173V6.51056C13.9046 6.15081 14.1963 5.8592 14.556 5.8592C14.9157 5.8592 15.2074 6.15082 15.2074 6.51056V12.3003C15.2074 14.2589 13.6196 15.8466 11.6611 15.8466H10.9374C9.83573 15.8466 8.85142 15.3443 8.20093 14.5561L8.19622 14.5504L8.19045 14.5457C8.16569 14.5258 8.14134 14.5047 8.11752 14.4823L4.49537 11.0766L4.4458 11.1293L4.49537 11.0766C4.14825 10.7502 4.11334 10.1993 4.41627 9.83236C4.70707 9.48026 5.21091 9.418 5.57689 9.68838L7.27576 10.9435L7.39113 11.0288V10.8853V5.06311C7.39113 4.70337 7.68274 4.41176 8.04249 4.41176C8.40216 4.41176 8.69384 4.70337 8.69384 5.06311V8.68173V8.7541H8.76621H9.48993H9.5623V8.68173V3.61566C9.5623 3.25592 9.85391 2.96431 10.2137 2.96431C10.5734 2.96431 10.865 3.25592 10.865 3.61566V8.68173Z" fill="currentColor" stroke="currentColor" strokeWidth="0.144745"/>
                      <path d="M10.2145 2.89209C9.81481 2.89209 9.4908 3.2161 9.4908 3.61581V8.68188H8.76708V5.06326C8.76708 4.66355 8.44299 4.33954 8.04335 4.33954C7.64364 4.33954 7.31963 4.66355 7.31963 5.06326V10.8855L5.62076 9.63032C5.22372 9.33699 4.67652 9.40481 4.36134 9.78643C4.03407 10.1828 4.07177 10.777 4.44666 11.1294L8.06883 14.5352C8.09401 14.5589 8.11978 14.5812 8.14598 14.6023C8.80963 15.4065 9.81409 15.9191 10.9382 15.9191H11.662C13.6605 15.9191 15.2806 14.299 15.2806 12.3005V6.51071C15.2806 6.111 14.9565 5.78698 14.5569 5.78698C14.1572 5.78698 13.8331 6.111 13.8331 6.51071V8.68188H13.1094V4.33954C13.1094 3.93982 12.7853 3.61581 12.3857 3.61581C11.9864 3.61581 11.6627 3.93903 11.662 4.33809V8.68188H10.9382V3.61581C10.9382 3.2161 10.6142 2.89209 10.2145 2.89209Z" fill="white"/>
                    </svg>
                  </div>
                  
                  <div className="cursor-label" style={{ backgroundColor: cursor.color }}>
                    <div className="cursor-name">{cursor.name}</div>
                    <div className="cursor-role">{cursor.role}</div>
                  </div>
                </motion.div>
              ))}
              
              <div className="cursors-text-overlay">
                <h3 className="cursors-title">Распределенная команда</h3>
                <p className="cursors-description">
                  Уделяем особое внимание созданию удобных 
                  пользовательских решений, обеспечивающих 
                  максимальные результаты
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="about-benefits">
          
          
          <div className="benefits-breakbar-grid">
            {[
              { 
                title: 'Лучшие специалисты', 
                desc: 'Собираем команду лучших для вашего проекта',
                icon: '👨‍💻'
              },
              { 
                title: 'Гибкость процессов', 
                desc: 'Адаптируем рабочий ритм под нужды каждого участника',
                icon: '⚙️'
              },
              { 
                title: 'Круглосуточный прогресс', 
                desc: 'Задачи решаются пока вы спите или занимаетесь другими делами',
                icon: '🌍'
              },
              { 
                title: 'Свежий взгляд', 
                desc: 'Посмотрим на вашу задачу под разными углами',
                icon: '👁️'
              },
            ].map((benefit, idx) => (
              <div key={idx} className="breakbar-benefit-card">
                <div className="breakbar-benefit-icon">{benefit.icon}</div>
                <div className="breakbar-benefit-content">
                  <h4 className="breakbar-benefit-title">{benefit.title}</h4>
                  <p className="breakbar-benefit-desc">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* ===================== CLIENTS SECTION ===================== */}
<section id="clients" className="clients-section">
  <div className="badge-wrapper">
    <div className="badge_icon">
      <svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor">
        <path d="M30 20C35.523 20 40 15.523 40 9.99999C40 4.47698 35.523 0 30 0C24.477 0 20 4.47698 20 9.99999C20 4.47698 15.523 0 10 0C4.477 0 0 4.47698 0 9.99999C0 15.523 4.477 20 10 20C4.477 20 0 24.477 0 30C0 35.523 4.477 40 10 40C15.523 40 20 35.523 20 30C20 35.523 24.477 40 30 40C35.523 40 40 35.523 40 30C40 24.477 35.523 20 30 20Z"/>
      </svg>
    </div>
    <h2 className="badge_text">Наши друзья</h2>
  </div>

  <div className="clients-main-container">
    {/* Заголовок блока */}
    <div className="clients-header">
      <h2 className="clients-heading">
        Присоединяйтесь к списку наших клиентов и партнеров
      </h2>
      <p className="clients-subheading">
        Мы работаем с компаниями разных масштабов и отраслей, создавая решения, которые действительно работают
      </p>
    </div>

    {/* Основной контент */}
    <div className="clients-content-container">
      {/* Левая часть: сетка логотипов 4x2 */}
      <div className="clients-logos-section">
        <div className="clients-logos-grid">
          {[
            { src: 'https://upload.wikimedia.org/wikipedia/ru/a/ae/China_Eastern_Logo.svg', name: 'Client 1' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Alibaba_en_logo.svg', name: 'Client 2' },
            { src: 'https://pic.onlinewebfonts.com/thumbnails/icons_335711.svg', name: 'Client 3' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Shadow_-_BaishanCloud_Logo.png', name: 'Client 4' },
            { src: 'https://upload.wikimedia.org/wikipedia/ru/9/97/Air_China_Logo.svg', name: 'Client 5' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/2/24/LogoSelectel.svg', name: 'Client 6' },
            { src: 'https://edgecenter.ru/files/marketing/logo_EC_black.svg', name: 'Client 7' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Bitrix24-logo-ru.svg', name: 'Client 8' },
          ].map((client, index) => (
            <div key={index} className="client-logo-item">
              <div className="client-logo-box">
                <img 
                  src={client.src} 
                  alt={client.name}
                  loading="lazy"
                  className="client-logo-img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Правая часть: Drag & Drop зона */}
      <div className="clients-dropzone-section">
        <div 
          className={`dropzone ${isDragging ? 'dragover' : ''} ${isLoading ? 'loading' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            setIsLoading(true);
            
            setTimeout(() => {
              setIsLoading(false);
              console.log('Logo dropped!');
            }, 2000);
          }}
          onClick={() => {
            if (!isLoading) {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 2000);
            }
          }}
        >
          {/* Основной контент */}
          <div className="dropzone-default">
            <div className="dropzone-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="dropzone-text">
              <h3 className="dropzone-title">Кидайте свое лого сюда</h3>
              <p className="dropzone-subtitle">Специально сохранили место</p>
            </div>
          </div>

          {/* Состояние загрузки */}
          <div className="dropzone-loading">
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="loading-message">
              <div className="sad-icon">😔</div>
              <p className="loading-text">Эм минутку…</p>
              <p className="loading-subtext">Для начала нам нужно поработать!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ===================== FOOTER SECTION ===================== */}
      <footer id="contact" className="footer-section">
        <div className="footer-cta">
          <h3 className="footer-cta-title">Хотите обсудить проект?</h3>
          <a href="/contact" className="footer-cta-button">
            Напишите нам <span className="cta-arrow">→</span>
          </a>
        </div>
        <div className="footer-top">
          <div className="footer-grid">
            <div className="footer-block">
              <h3 className="footer-block-title">Stackroom</h3>
              <p className="footer-block-text">
                Создаем цифровые решения, которые работают для вашего бизнеса.
              </p>
            </div>
            
            <div className="footer-block">
              <h3 className="footer-block-title">Контакты</h3>
              <ul className="footer-block-list">
                <li className="footer-block-item">
                  <span className="footer-block-text">Email: hello@stackroom.ru</span>
                </li>
                <li className="footer-block-item">
                  <span className="footer-block-text">Телефон: +7 (999) 123-45-67</span>
                </li>
                <li className="footer-block-item">
                  <span className="footer-block-text">Адрес: Москва, ул. Примерная, 123</span>
                </li>
              </ul>
            </div>
            
            <div className="footer-block">
              <h3 className="footer-block-title">Услуги</h3>
              <ul className="footer-block-list">
                <li className="footer-block-item">
                  <a href="#" className="footer-block-link">Веб-разработка</a>
                </li>
                <li className="footer-block-item">
                  <a href="#" className="footer-block-link">UI/UX Дизайн</a>
                </li>
                <li className="footer-block-item">
                  <a href="#" className="footer-block-link">IT интеграция</a>
                </li>
                <li className="footer-block-item">
                  <a href="#" className="footer-block-link">Консалтинг</a>
                </li>
              </ul>
            </div>
            
            <div className="footer-block">
              <h3 className="footer-block-title">Соцсети</h3>
              <ul className="footer-block-list">
                <li className="footer-block-item">
                  <a href="#" className="footer-block-link">LinkedIn</a>
                </li>
                <li className="footer-block-item">
                  <a href="#" className="footer-block-link">Telegram</a>
                </li>
                <li className="footer-block-item">
                  <a href="#" className="footer-block-link">GitHub</a>
                </li>
                <li className="footer-block-item">
                  <a href="#" className="footer-block-link">Behance</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom-block">
          <div className="footer-bottom-content">
            <p className="footer-copyright">© 2024 Stackroom. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* ===================== ОСНОВНЫЕ СТИЛИ ===================== */
        :root {
          --surface: rgba(204, 211, 218, 1);
          --black: #131313;
          --white: #f8f8f8;
          --gutter: 24px;
          --border-radius: 12px;
          --nav-height: 96px;
          --header-top-padding: 20px;
          --section-padding-desktop: 80px;
          --section-padding-tablet: 40px;
          --section-padding-mobile: 20px;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: var(--surface);
          color: var(--black);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }
        
        /* ===================== ОБЩАЯ СТРУКТУРА ===================== */
        .home-main {
          display: flex;
          flex-direction: column;
          gap: 30px; /* КОНТРОЛЬ ВСЕХ ОТСТУПОВ МЕЖДУ СЕКЦИЯМИ */
        }
        
        section {
          padding: 0 var(--section-padding-desktop);
        }
        
        /* ===================== HEADER ===================== */
        .navbar {
          position: fixed;
          top: var(--header-top-padding);
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          background: transparent;
          width: 100%;
          padding: 0 var(--section-padding-desktop);
          height: auto; /* Изменить с фиксированной высоты */
          min-height: var(--nav-height); /* Минимальная высота */
          padding-bottom: 0px; /* Добавить отступ снизу */
        }
        
        .navbar.scrolled {
          background: var(--surface);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-content {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: var(--nav-height);
          gap: 12px;
          width: 100%;
          margin: 0;
          padding: calc(var(--gutter) * 0.5) 3px;
        }
        
        .nav-desktop {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          flex-shrink: 0;
        }
        
        .nav-element {
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          height: 96px;
          padding: 0 30px 20px 30px;
          border-radius: 8px;
          text-decoration: none;
          color: var(--black);
          font-weight: 500;
          font-size: 16px;
          letter-spacing: 0.02em;
          transition: all 0.2s ease;
          background: rgba(248, 248, 248, 0.9);
          border: 1px solid rgba(19, 19, 19, 0.08);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          text-align: left;
          line-height: 1;
        }
        
        .nav-element[href="#services"],
        .nav-element[href="#about"], 
        .nav-element[href="#articles"] {
          min-width: 100px;
          padding: 0 20px 20px 20px;
        }
        
        .nav-element.hello,
        .nav-element[href="#projects"] {
          min-width: 220px;
          padding: 0 40px 20px 40px;
        }
        
        .nav-element:hover {
          background: var(--black);
          color: var(--white);
          border-color: var(--black);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          transform: translateY(-1px);
        }
        
        .nav-element.logo {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 96px;
          padding: 0 24px;
          border-radius: 8px;
          text-decoration: none;
          color: var(--black);
          font-weight: 700;
          font-size: 28px;
          letter-spacing: -0.02em;
          transition: all 0.2s ease;
          background: rgba(248, 248, 248, 0.9);
          border: 1px solid rgba(19, 19, 19, 0.08);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          white-space: nowrap;
          flex: 1;
          max-width: none;
          margin-right: auto;
        }
        
        .nav-element.logo:hover {
          background: var(--black);
          color: var(--white);
          border-color: var(--black);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          transform: translateY(-1px);
        }
        
        .nav-element.hello {
          background: var(--black);
          color: var(--white);
          border-color: var(--black);
        }
        
        .nav-element.hello:hover {
          background: var(--white);
          color: var(--black);
          border-color: var(--black);
        }
        
        .nav-element.hello .highlight {
          font-weight: 600;
          color: #fa6151;
        }
        
        .nav-element.hello .shape-icon {
          color: #fa6151;
        }
        
        .shape-icon {
          display: flex;
          align-items: center;
          margin-right: 8px;
        }
        
        .logo-wrapper {
          display: flex;
          align-items: center;
          height: 32px;
        }
        
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
        
        .highlight {
          font-weight: 600;
          color: #fa6151 !important;
        }
        
        .nav-element.hello:hover .highlight {
          color: var(--black) !important;
        }
        
        /* Бургер меню */
        .burger-menu {
          display: none;
          position: relative;
          width: 96px;
          height: 96px;
          background: rgba(248, 248, 248, 0.9);
          border: 1px solid rgba(19, 19, 19, 0.08);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1004;
          margin-left: 12px;
          flex-shrink: 0;
          overflow: hidden;
        }
        
        .burger-dot {
          position: absolute;
          width: 16px;
          height: 16px;
          background: var(--black);
          border-radius: 50%;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transform: translate(-50%, -50%);
        }
        
        .burger-dot:nth-child(1) {
          top: 20px;
          left: 20px;
        }
        
        .burger-dot:nth-child(2) {
          top: 20px;
          right: 20px;
          left: auto;
          transform: translate(50%, -50%);
        }
        
        .burger-dot:nth-child(3) {
          bottom: 20px;
          left: 20px;
          top: auto;
          transform: translate(-50%, 50%);
        }
        
        .burger-dot:nth-child(4) {
          bottom: 20px;
          right: 20px;
          top: auto;
          left: auto;
          transform: translate(50%, 50%);
        }
        
        .burger-menu.open .burger-dot:nth-child(1) {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translate(-12px, -12px);
        }
        
        .burger-menu.open .burger-dot:nth-child(2) {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translate(12px, -12px);
        }
        
        .burger-menu.open .burger-dot:nth-child(3) {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translate(-12px, 12px);
        }
        
        .burger-menu.open .burger-dot:nth-child(4) {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translate(12px, 12px);
        }
        
        .burger-menu:hover {
          background: var(--black);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }
        
        .burger-menu:hover .burger-dot {
          background: var(--white);
        }
        
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1003;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .mobile-menu-overlay.open {
          opacity: 1;
          visibility: visible;
        }
        
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 320px;
          height: 100vh;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border-left: 1px solid rgba(255, 255, 255, 0.3);
          z-index: 1005;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          transition: right 0.4s cubic-bezier(0.77, 0, 0.175, 1);
          box-shadow: 
            -4px 0 20px rgba(0, 0, 0, 0.05),
            inset 1px 0 0 rgba(255, 255, 255, 0.2);
          border-radius: 20px 0 0 20px;
          overflow-y: auto;
        }
        
        .mobile-menu.open {
          right: 0;
        }
        
        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-grow: 1;
        }
        
        .mobile-nav-item {
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          height: 96px;
          padding: 0 30px 20px 30px;
          border-radius: 8px;
          text-decoration: none;
          color: var(--black);
          font-weight: 500;
          font-size: 16px;
          letter-spacing: 0.02em;
          transition: all 0.2s ease;
          background: rgba(248, 248, 248, 0.9);
          border: 1px solid rgba(19, 19, 19, 0.08);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
          text-align: left;
          line-height: 1;
        }
        
        .mobile-nav-item:hover {
          background: var(--black);
          color: var(--white);
          border-color: var(--black);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          transform: translateY(-1px);
        }
        
        .mobile-nav-text {
          font-size: 16px;
          font-weight: 500;
        }
        
        .mobile-nav-arrow {
          display: none;
        }
        
        .mobile-nav-item:hover .mobile-nav-arrow {
          transform: translateX(4px);
          opacity: 1;
        }
        
        .mobile-nav-item.hello {
          background: var(--black);
          color: var(--white);
          border-color: var(--black);
        }
        
        .mobile-nav-item.hello:hover {
          background: var(--white);
          color: var(--black);
          border-color: var(--black);
        }
        
        .mobile-nav-item.hello .highlight {
          font-weight: 600;
          color: #fa6151;
        }
        
        .mobile-nav-item.hello .shape-icon {
          color: #fa6151;
        }
        
        .mobile-menu-footer {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(19, 19, 19, 0.1);
        }
        
        .mobile-contact-label {
          font-size: 0.875rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        
        .mobile-contact-email {
          font-size: 1.125rem;
          color: var(--black);
          text-decoration: none;
          font-weight: 500;
        }
        
        .mobile-contact-email:hover {
          color: #fa6151;
        }
        
        /* ===================== HERO SECTION ===================== */
        .hero-section {
          padding-top: calc(var(--nav-height) + var(--header-top-padding) + 7px);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .hero-main-block {
          background: rgba(248, 248, 248, 0.9);
          border: 1px solid rgba(19, 19, 19, 0.08);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          padding: 40px;
          width: 100%;
          min-height: 600px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        
        .hero-top-container {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 10px;
          gap: 10px;
        }
        
        .hero-title-large {
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 600;
          line-height: 0.9;
          letter-spacing: -0.02em;
          flex: 2;
          max-width: 55%;
        }
        
        .hero-subtitle-bottom {
          font-size: 2.5rem;
          line-height: 1.4;
          color: #fd3b26ff;
          opacity: 0.9;
          align-self: flex-end;
          text-align: right;
          max-width: 40%;
          margin-top: auto;
        }
        
        .hero-breakbar {
          background: var(--black);
          color: var(--white);
          padding: 1rem 0;
          overflow: hidden;
          border-radius: 8px;
          width: 100%;
          margin: 12px 0 0 0 !important;
          position: relative;
          z-index: 10;
          display: flex;
        }
        
        .breakbar-wrapper {
          display: flex;
          overflow: hidden;
          width: 100%;
        }
        
        .marquee {
          display: flex;
          animation: marquee 50s linear infinite;
          min-width: max-content;
          will-change: transform;
          padding-left: 100%;
          transition: animation-play-state 1s ease;
        }
        
        .marquee:hover {
          animation-play-state: paused;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .marquee.paused {
          animation-play-state: paused !important;
          transition: animation-play-state 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }
        
        .marquee_inner {
          display: flex;
          gap: 3rem;
          padding: 0 3rem;
          flex-shrink: 0;
        }
        
        .hero-breakbar:hover {
          opacity: 0.95;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        /* ===================== SERVICES SECTION ===================== */
        .services-section {
          display: flex;
          flex-direction: column;
          gap: 20px; /* ВНУТРЕННИЕ ОТСТУПЫ МЕЖДУ ЭЛЕМЕНТАМИ */
        }
        
        .services-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0;
        }
        
        .badge_icon {
          width: 40px;
          height: 40px;
          background: var(--black);
          color: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .badge_text {
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, auto);
          gap: 20px;
          width: 100%;
        }
        
        .service-card {
          background: var(--white);
          padding: 2.5rem;
          border-radius: var(--border-radius);
          transition: all 0.3s ease;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .service-card-header {
          margin-bottom: 1.5rem;
        }
        
        .service-number {
          font-size: 1rem;
          font-weight: 800;
          color: #fa6151;
          opacity: 1;
          margin-bottom: 0.75rem;
        }
        
        .service-title {
          font-size: 1.75rem;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 1rem;
          color: var(--black);
        }
        
        .service-description {
          font-size: 1.125rem;
          line-height: 1.5;
          color: #666;
          opacity: 0.9;
          flex: 1;
        }
        
        .services-breakbar {
          background: var(--black);
          color: var(--white);
          padding: 1rem 0;
          border-radius: 8px;
          width: 100%;
          margin-top: 10px; /* ← ДОБАВЛЯЕМ ОТСТУП ЗДЕСЬ */
        }
        
        .breakbar-content {
          display: flex;
          align-items: center;
          gap: 20px;
          width: 100%;
          text-align: left;
          min-height: 30px;
        }
        
        .breakbar-star-icon {
          flex-shrink: 0;
          width: 25px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fa6151 !important;
          margin-top: 4px;
          margin-left: 20px;
        }
        
        .breakbar-star-icon svg {
          width: 24px;
          height: 24px;
        }
        
        .breakbar-text {
          flex: 1;
        }
        
        .breakbar-text .rich-text-block {
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--white);
          margin: 0;
        }
        
        .breakbar-text .rich-text-block p {
          margin: 0;
        }
        
        /* ===================== PROJECTS SECTION ===================== */

        .services-badge,
        .projects-badge,
        .about-badge,
        .clients-badge {
        display: flex;
        flex-direction: row; /* ← ВАЖНО! */
        align-items: center;
        gap: 1rem;
        margin-bottom: 20px;
        }

        .projects-section {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
        }
        
        .project-card {
          border-radius: var(--border-radius);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: 280px;
          width: 100%;
          background: var(--white);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          
        }
        
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 60px rgba(0, 0, 0, 0.1); 
        }
        
        .project-link {
          display: block;
          height: 100%;
          text-decoration: none;
          color: inherit;
        }
        
        .project-image {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: var(--border-radius);
          overflow: hidden;
        }
        
        .project-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .project-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.project-real-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Обрезает фото по размерам карточки */
  transition: transform 0.5s ease;
}

.project-card:hover .project-real-image {
  transform: scale(1.05); /* Легкий зум при наведении */
}

.project-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.project-number {
  font-size: 48px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.08);
  line-height: 1;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0.7) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 20px;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

        .project-number {
          font-size: 48px;
          font-weight: 800;
          color: rgba(0, 0, 0, 0.08);
          line-height: 1;
        }
        
        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 15%,
            rgba(39, 39, 39, 0.4) 80%,
            rgba(24, 24, 24, 0.7) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 20px;
        }
        
        .project-card:hover .project-overlay {
          opacity: 1;
        }
        
        .project-info {
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }
        
        .project-card:hover .project-info {
          transform: translateY(0);
        }
        
        .project-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--white);
          margin-bottom: 5px;
          line-height: 1.3;
        }
        
        .project-category {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 400;
        }
        
        /* ===================== ABOUT SECTION ===================== */
        .about-section {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        
        /* Figma Cursors */
        .figma-cursors-section {
          width: 100%;
          margin: -10px 0;
        }
        
        .figma-cursors-background {
          background: var(--white);
          border-radius: var(--border-radius);
          border: 1px solid rgba(19, 19, 19, 0.08);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        
        .figma-cursors-container {
          position: relative;
          width: 100%;
          height: 400px;
          padding: 40px;
          overflow: hidden;
          background: 
            linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.015) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .cursor-element {
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translate(-50%, -50%);
          cursor: pointer;
          z-index: 10;
        }
        
        .cursor-pointer {
          margin-bottom: 8px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
          transition: transform 0.2s ease;
        }
        
        .cursor-element:hover .cursor-pointer {
          transform: scale(1.1);
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.2));
        }
        
        .cursor-label {
          padding: 6px 10px;
          border-radius: 3px;
          color: white;
          text-align: center;
          min-width: 90px;
          max-width: 120px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.15);
          opacity: 0.95;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.2);
          transform: translateY(0);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          z-index: 11;
        }
        
        .cursor-element:hover .cursor-label {
          opacity: 1;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transform: translateY(-2px);
        }
        
        .cursor-name {
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 2px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .cursor-role {
          font-size: 0.7rem;
          opacity: 0.9;
          font-weight: 400;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .cursors-text-overlay {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(10px);
          padding: 20px 30px;
          border-radius: var(--border-radius);
          max-width: 450px;
          width: 90%;
          border: 1px solid rgba(19, 19, 19, 0.1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          z-index: 5;
        }
        
        .cursors-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: var(--black);
        }
        
        .cursors-description {
          font-size: 0.95rem;
          line-height: 1.5;
          color: #555;
        }
        
        .about-benefits {
          padding: 0 60px;
        }
        
        .benefits-title {
          text-align: center;
          margin-bottom: 40px;
          font-size: 1.8rem;
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
        }
        
        .benefit-card {
          padding: 30px;
          background: rgba(248, 248, 248, 0.9);
          border-radius: var(--border-radius);
          border: 1px solid rgba(19, 19, 19, 0.08);
        }
        
        .benefit-card h4 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: var(--black);
        }
        
        .benefit-card p {
          color: #666;
          line-height: 1.5;
        }
        
/* ===================== ABOUT BENEFITS BREAKBAR STYLE ===================== */
.about-benefits {
  padding: 0;
}

.benefits-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 1.8rem;
  color: var(--black);
}

.benefits-breakbar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  width: 100%;
}

.breakbar-benefit-card {
  background: var(--black);
  color: var(--white);
  border-radius: 8px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}






@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.breakbar-benefit-icon {
  font-size: 2.5rem;
  margin-bottom: 5px;
  transition: transform 0.3s ease;
}

.breakbar-benefit-card:hover .breakbar-benefit-icon {
  transform: scale(1.1) rotate(5deg);
}

.breakbar-benefit-content {
  flex: 1;
}

.breakbar-benefit-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--white);
  line-height: 1.3;
}

.breakbar-benefit-desc {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.breakbar-benefit-card:hover .breakbar-benefit-desc {
  opacity: 1;
}

/* АДАПТИВНОСТЬ */
@media (max-width: 1024px) {
  .benefits-breakbar-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .breakbar-benefit-card {
    padding: 20px;
  }
  
  .breakbar-benefit-icon {
    font-size: 2rem;
  }
  
  .breakbar-benefit-title {
    font-size: 1.1rem;
  }
  
  .breakbar-benefit-desc {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .benefits-breakbar-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .benefits-title {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }
  
  .breakbar-benefit-card {
    padding: 18px;
  }
  
  .breakbar-benefit-icon {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .benefits-title {
    font-size: 1.3rem;
    margin-bottom: 25px;
  }
  
  .breakbar-benefit-card {
    padding: 15px;
  }
  
  .breakbar-benefit-title {
    font-size: 1rem;
  }
  
  .breakbar-benefit-desc {
    font-size: 0.85rem;
  }
}

        /* ===================== CLIENTS SECTION ===================== */
.clients-section {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.badge-wrapper {
  display: flex;
  align-items: center; /* ← ОБЯЗАТЕЛЬНО! */
  justify-content: flex-start;
  gap: 1rem;
}

.clients-main-container {
  background: var(--white);
  border-radius: var(--border-radius);
  border: 1px solid rgba(19, 19, 19, 0.08);
  padding: 60px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}

/* Заголовок блока */
.clients-header {
  text-align: center;
  margin-bottom: 50px;
}

.clients-heading {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 20px;
  color: var(--black);
}

.clients-subheading {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Основной контент */
.clients-content-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

/* Левая часть: сетка логотипов */
.clients-logos-section {
  display: flex;
  flex-direction: column;
}

.clients-logos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 25px;
}

.client-logo-item {
  aspect-ratio: 1;
}

.client-logo-box {
  width: 100%;
  height: 100%;
  background: rgba(248, 248, 248, 0.9);
  border: 1px solid rgba(19, 19, 19, 0.08);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
}

.client-logo-box:hover {
  transform: translateY(-8px);
  border-color: var(--black);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  background: var(--white);
}

.client-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.8;
  transition: all 0.3s ease;
}

.client-logo-box:hover .client-logo-img {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.08);
}

/* Правая часть: Drop Zone */
.clients-dropzone-section {
  display: flex;
  flex-direction: column;
}

.dropzone {
  width: 100%;
  height: 100%;
  min-height: 100%;
  border: 2px dashed rgba(19, 19, 19, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background: linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%);
}

.dropzone:hover {
  border-color: var(--black);
  background: linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%);
  transform: translateY(-3px);
}

.dropzone.dragover {
  border-color: #fa6151;
  background: linear-gradient(135deg, #fff0f0 0%, #ffe8e8 100%);
  animation: pulse 1s ease infinite alternate;
}

@keyframes pulse {
  from { transform: scale(1); box-shadow: 0 0 0 rgba(250, 97, 81, 0); }
  to { transform: scale(1.02); box-shadow: 0 0 20px rgba(250, 97, 81, 0.2); }
}

.dropzone-default {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  transition: all 0.3s ease;
}

.dropzone-icon {
  width: 64px;
  height: 64px;
  background: var(--black);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.dropzone:hover .dropzone-icon {
  background: #fa6151;
  transform: rotate(90deg) scale(1.1);
}

.dropzone-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 10px;
}

.dropzone-subtitle {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.5;
}

/* Состояние загрузки */
.dropzone-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.6s ease;
  border-radius: 14px;
}

.dropzone.loading .dropzone-default {
  opacity: 0;
  transform: translateY(15px);
}

.dropzone.loading .dropzone-loading {
  opacity: 1;
  visibility: visible;
}

.loading-dots {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.dot {
  width: 12px;
  height: 12px;
  background: var(--black);
  border-radius: 50%;
  animation: dotJump 1.4s ease-in-out infinite;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dotJump {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-15px); }
}

.sad-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  animation: sadFloat 3s ease-in-out infinite;
}

@keyframes sadFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-8px) rotate(-3deg); }
  50% { transform: translateY(-4px); }
  75% { transform: translateY(-6px) rotate(3deg); }
}

.loading-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 8px;
}

.loading-subtext {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.5;
}

/* АДАПТИВНОСТЬ */
@media (max-width: 1200px) {
  .clients-main-container {
    padding: 50px;
  }
  
  .clients-heading {
    font-size: 3rem;
  }
  
  .clients-content-container {
    gap: 30px;
  }
  
  .clients-logos-grid {
    gap: 20px;
  }
}

@media (max-width: 1024px) {
  .clients-main-container {
    padding: 40px;
  }
  
  .clients-heading {
    font-size: 2.5rem;
  }
  
  .clients-content-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .clients-logos-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .dropzone {
    min-height: 300px;
  }
}

@media (max-width: 768px) {
  .clients-main-container {
    padding: 30px;
  }
  
  .clients-heading {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  
  .clients-subheading {
    font-size: 1.1rem;
  }
  
  .clients-logos-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 15px;
  }
  
  .client-logo-box {
    padding: 20px;
    border-radius: 12px;
  }
  
  .dropzone {
    padding: 30px;
    min-height: 250px;
    border-radius: 12px;
  }
  
  .dropzone-title {
    font-size: 1.3rem;
  }
  
  .dropzone-subtitle {
    font-size: 1rem;
  }
  
  .dropzone-icon {
    width: 56px;
    height: 56px;
  }
}

@media (max-width: 480px) {
  .clients-main-container {
    padding: 20px;
  }
  
  .clients-heading {
    font-size: 1.8rem;
  }
  
  .clients-logos-grid {
    gap: 12px;
  }
  
  .client-logo-box {
    padding: 15px;
    border-radius: 10px;
  }
  
  .dropzone {
    padding: 25px;
    min-height: 220px;
  }
  
  .sad-icon {
    font-size: 2.5rem;
  }
}
        
        /* ===================== FOOTER SECTION ===================== */
        .footer-section {
          background: var(--black);
          padding: 80px var(--section-padding-desktop) 0; /* ← ДОБАВЬТЕ ОТСТУПЫ ПО БОКАМ */
          margin-top: 0; /* Убираем, т.к. есть gap у родителя */
          width: 100%;
        }
        
        .footer-top {
          width: 100%;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

                /* Добавьте в ваш стиль футера */
        .footer-cta {
          background: #333333;
          border-radius: 12px;
          padding: 40px;
          margin-bottom: 60px;
          text-align: center;
          transition: background-color 0.2s ease;
        }

        .footer-cta:hover {
          background-color: var(--black);
        }

        .footer-cta-title {
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: var(--white);
        }

        .footer-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          background: #fa6151;
          color: var(--white);
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.125rem;
          transition: all 0.2s ease;
        }

        .footer-cta-button:hover {
          background: #e84a3a;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(250, 97, 81, 0.3);
        }

        .cta-arrow {
          transition: transform 0.2s ease;
        }

        .footer-cta-button:hover .cta-arrow {
          transform: translateX(5px);
        }
        
        .footer-block {
          background: #333333;
          border-radius: 12px;
          padding: 30px;
          min-height: 250px;
          display: flex;
          flex-direction: column;
          transition: background-color 0.2s ease;
        }
        
        .footer-block:hover {
          background-color: var(--black);
        }
        
        .footer-block-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: var(--white);
        }
        
        .footer-block-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .footer-block-list {
          list-style: none;
          padding: 0;
          margin: 0;
          flex: 1;
        }
        
        .footer-block-item {
          margin-bottom: 15px;
        }
        
        .footer-block-item:last-child {
          margin-bottom: 0;
        }
        
        .footer-block-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.2s ease;
          display: inline-block;
        }
        
        .footer-block-link:hover {
          color: var(--white);
        }
        
        .footer-bottom-block {
          background: #333333;
          border-radius: 12px;
          margin-top: 60px;
          transition: background-color 0.2s ease;
        }
        
        .footer-bottom-block:hover {
          background-color: var(--black);
        }
        
        .footer-bottom-content {
          padding: 30px;
          text-align: center;
        }
        
        .footer-copyright {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          margin: 0;
        }
        
        /* ===================== АДАПТИВНОСТЬ ===================== */
        @media (max-width: 1200px) {
          .home-main {
            gap: 60px;
          }
          
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
          }
          
          .clients-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
          }
          
          .footer-grid {
            gap: 25px;
          }
          
          .footer-block {
            padding: 25px;
            min-height: 220px;
          }
        }
        
        @media (max-width: 1024px) {
          .home-main {
            gap: 50px;
          }
          
          section {
            padding: 0 var(--section-padding-tablet);
          }
          
          .navbar {
            padding: 0 var(--section-padding-tablet);
          }
          
          .nav-desktop {
            display: none !important;
          }
          
          .burger-menu {
            display: flex;
          }
          
          .services-grid {
            gap: 25px;
          }
          
          .service-card {
            padding: 2rem;
            min-height: 200px;
          }
          
          .service-title {
            font-size: 1.5rem;
          }
          
          .service-description {
            font-size: 1rem;
          }
          
          .projects-grid {
            gap: 20px;
          }
          
          .project-card {
            height: 250px;
          }
          
          .figma-cursors-container {
            padding: 30px;
          }
          
          .cursors-text-overlay {
            padding: 18px 25px;
          }
          
          .about-benefits {
            padding: 0 40px;
          }
          
          .footer-section {
            margin-top: 50px;
            padding: 60px var(--section-padding-tablet) 0;
          }
          
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
          
          .footer-block {
            min-height: 200px;
          }
          
          .footer-bottom-block {
            margin-top: 50px;
          }
        }
        
        @media (max-width: 991px) {
          :root {
          --nav-height: 64px; /* Уменьшаем высоту */
          --header-top-padding: 15px; /* ОТСТУП СВЕРХУ ДЛЯ HEADER */
          }

          .navbar {
          padding: 0 var(--section-padding-mobile);
          height: var(--nav-height);
          }

          .nav-content {
          height: var(--nav-height);
          }

          /* Hero отступ сверху */
          .hero-section {
          padding-top: calc(var(--nav-height) + var(--header-top-padding) + 10px) !important;
          }

          /* Уменьшаем элементы навигации */
          .nav-element {
          height: var(--nav-height);
          padding: 0 20px 12px 20px;
          }

          .nav-element.logo {
          height: var(--nav-height);
          padding: 0 16px;
          }

          .burger-menu {
          width: var(--nav-height);
          height: var(--nav-height);
          }
        }

        @media (max-width: 768px) {
          .home-main {
            gap: 40px;
          }
          
          section {
            padding: 0 var(--section-padding-mobile);
          }
          
          .navbar {
            padding: 0 var(--section-padding-mobile);
          }
          
          .hero-main-block {
            padding: 20px;
            min-height: 200px;
          }
          
          .hero-title-large {
            font-size: clamp(1.5rem, 4vw, 2.5rem);
          }
          
          .hero-subtitle-bottom {
            font-size: 0.75rem;
            margin-top: 15px;
            max-width: 100%;
            text-align: left;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .service-card {
            min-height: 180px;
            padding: 1.75rem;
          }
          
          .breakbar-content {
            gap: 15px;
          }
          
          .breakbar-star-icon {
            width: 20px;
            height: 20px;
            margin-left: 15px;
          }
          
          .breakbar-star-icon svg {
            width: 18px;
            height: 18px;
          }
          
          .breakbar-text .rich-text-block {
            font-size: 0.95rem;
            line-height: 1.5;
          }
          
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          
          .project-card {
            height: 220px;
          }
          
          .figma-cursors-container {
            padding: 20px;
            height: 320px;
          }
          
          .cursors-text-overlay {
            padding: 15px 20px;
            bottom: 20px;
          }
          
          .cursors-title {
            font-size: 1.1rem;
          }
          
          .cursors-description {
            font-size: 0.85rem;
          }
          
          .cursor-label {
            min-width: 80px;
            padding: 5px 8px;
          }
          
          .cursor-name {
            font-size: 0.8rem;
          }
          
          .cursor-role {
            font-size: 0.65rem;
          }
          
          .about-benefits {
            padding: 0 20px;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .benefit-card {
            padding: 20px;
          }
          
          .clients-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-top: 20px;
          }
          
          .client-item {
            padding: 20px;
            min-height: 120px;
          }
          
          .client-logo-placeholder {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
          
          .footer-section {
            padding: 50px var(--section-padding-mobile) 0;
          }
          
          .footer-grid {
          grid-template-columns: repeat(2, 1fr);
          }
          
          .footer-block {
            min-height: auto;
            padding: 25px;
          }
          
          .footer-bottom-block {
            margin-top: 40px;
          }
          
          .footer-bottom-content {
            padding: 25px;
          }
        }
        
        @media (max-width: 480px) {
          .home-main {
            gap: 30px;
          }
          
          .hero-main-block {
            padding: 20px;
            min-height: 220px;
          }
          
          .hero-title-large {
            font-size: clamp(1.5rem, 3vw, 2.5rem);
          }
          
          .hero-subtitle-bottom {
            font-size: 1rem;
            margin-top: 1rem;
          }
          
          .service-card {
            padding: 1.5rem;
            min-height: 160px;
          }
          
          .service-title {
            font-size: 1.35rem;
          }
          
          .service-description {
            font-size: 0.95rem;
          }
          
          .breakbar-content {
            gap: 12px;
          }
          
          .breakbar-star-icon {
            width: 18px;
            height: 18px;
            margin-left: 12px;
          }
          
          .breakbar-star-icon svg {
            width: 16px;
            height: 16px;
          }
          
          .breakbar-text .rich-text-block {
            font-size: 0.9rem;
            line-height: 1.4;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .project-card {
            height: 200px;
          }
          
          .figma-cursors-container {
            height: 280px;
            padding: 15px;
          }
          
          .cursors-text-overlay {
            padding: 12px 15px;
          }
          
          .cursor-label {
            min-width: 70px;
          }
          
          .cursor-name {
            font-size: 0.75rem;
          }
          
          .clients-grid {
            gap: 15px;
          }
          
          .client-item {
            padding: 15px;
            min-height: 100px;
          }
          
          .footer-section {
            padding: 40px var(--section-padding-mobile) 0;
          }
          
          .footer-grid {
          grid-template-columns: 1fr;
          }

          .footer-block {
            padding: 20px;
          }
          
          .footer-block-title {
            font-size: 1.2rem;
            margin-bottom: 15px;
          }
          
          .footer-block-text,
          .footer-block-link {
            font-size: 0.9rem;
          }
          
          .footer-bottom-block {
            margin-top: 30px;
          }
          
          .footer-bottom-content {
            padding: 20px;
          }
          
          .footer-copyright {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </main>
  )
}
