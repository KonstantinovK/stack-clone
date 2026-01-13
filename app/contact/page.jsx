// app/contact/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error'
  const [buttonText, setButtonText] = useState('Отправить сообщение')
  
  // Header states
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Сбрасываем текст кнопки при изменении поля
    if (buttonText !== 'Отправить сообщение') {
      setButtonText('Отправить сообщение')
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Валидация
    if (!formData.name.trim()) {
      setButtonText('Введите имя')
      setTimeout(() => setButtonText('Отправить сообщение'), 2000)
      return
    }
    
    if (!formData.email.trim()) {
      setButtonText('Введите email')
      setTimeout(() => setButtonText('Отправить сообщение'), 2000)
      return
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setButtonText('Некорректный email')
      setTimeout(() => setButtonText('Отправить сообщение'), 2000)
      return
    }
    
    if (!formData.message.trim()) {
      setButtonText('Введите сообщение')
      setTimeout(() => setButtonText('Отправить сообщение'), 2000)
      return
    }
    
    if (formData.message.trim().length < 10) {
      setButtonText('Минимум 10 символов')
      setTimeout(() => setButtonText('Отправить сообщение'), 2000)
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    setButtonText('Отправляем...')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при отправке')
      }
      
      console.log('✅ Форма отправлена:', data)
      setSubmitStatus('success')
      setButtonText('Отправлено! ✓')
      
      // Очищаем форму
      setFormData({
        name: '',
        email: '',
        message: ''
      })
      
      // Возвращаем исходный текст через 3 секунды
      setTimeout(() => {
        setButtonText('Отправить сообщение')
        setSubmitStatus(null)
      }, 3000)
      
    } catch (error) {
      console.error('❌ Ошибка:', error)
      setSubmitStatus('error')
      setButtonText('Ошибка отправки')
      
      // Возвращаем исходный текст через 3 секунды
      setTimeout(() => {
        setButtonText('Отправить сообщение')
      }, 3000)
      
    } finally {
      setIsSubmitting(false)
    }
  }
  
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
  
  const handleNavClick = () => {
    setIsMenuOpen(false)
  }
  
  return (
    <main className="contact-page">
      
      {/* ===================== HEADER ===================== */}
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <a href="/" className="nav-element logo">
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
            <a href="/#services" className="nav-element" onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#services';
            }}>Сервисы</a>
            <a href="/#about" className="nav-element" onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#about';
            }}>О нас</a>
            <a href="/#articles" className="nav-element" onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#articles';
            }}>Блог</a>
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
           <a href="/#projects" className="nav-element projects" onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#projects';
            }}>Проекты</a>
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
            <a href="/#services" className="mobile-nav-item" onClick={(e) => {
              e.preventDefault();
              window.location.href = '/#services';
              handleNavClick();
            }}>
              <span className="mobile-nav-text">Сервисы</span>
            </a>
            <a href="/#about" className="mobile-nav-item" onClick={(e) => {
              e.preventDefault();
              window.location.href = '/#about';
              handleNavClick();
            }}>
              <span className="mobile-nav-text">О нас</span>
            </a>
            <a href="/#articles" className="mobile-nav-item" onClick={(e) => {
              e.preventDefault();
              window.location.href = '/#articles';
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
              Скажи привет <span className="highlight"></span>
            </a>
            <a href="/#projects" className="mobile-nav-item" onClick={(e) => {
              e.preventDefault();
              window.location.href = '/#projects';
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

      {/* Header Space */}
      <div className="header-space" />
      
      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          
          {/* Left Column - Form (2/3 ширины) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="contact-form-column"
          >
            {/* Badge как на главной */}
            <div className="contact-badge">
              <div className="badge_icon">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M30 20C35.523 20 40 15.523 40 9.99999C40 4.47698 35.523 0 30 0C24.477 0 20 4.47698 20 9.99999C20 4.47698 15.523 0 10 0C4.477 0 0 4.47698 0 9.99999C0 15.523 4.477 20 10 20C4.477 20 0 24.477 0 30C0 35.523 4.477 40 10 40C15.523 40 20 35.523 20 30C20 35.523 24.477 40 30 40C35.523 40 40 35.523 40 30C40 24.477 35.523 20 30 20Z"/>
                </svg>
              </div>
              <h2 className="badge_text">Напишите нам</h2>
            </div>
            
            {/* White Form Block */}
            <div className="contact-form-block">
              <form onSubmit={handleSubmit} className="contact-form">
                {/* Name Field */}
                <div className="form-field-group">
                  <label className="form-field-label">Привет, меня зовут</label>
                  <div className="form-input-wrapper">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Введите ваше имя"
                      className="form-input"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                {/* Email Field */}
                <div className="form-field-group">
                  <label className="form-field-label">Ответьте мне на</label>
                  <div className="form-input-wrapper">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="form-input"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                {/* Message Field */}
                <div className="form-field-group">
                  <label className="form-field-label">И я хотел(а) бы рассказать о</label>
                  <div className="form-textarea-wrapper">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Опишите ваш проект, задайте вопросы или просто поздоровайтесь..."
                      className="form-textarea"
                      rows="6"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </form>
            </div>
            
            {/* Submit Button - отдельный черный блок */}
            <motion.button
              type="submit"
              onClick={handleSubmit}
              className={`submit-button-block ${isSubmitting ? 'submitting' : ''} ${
                buttonText === 'Отправлено! ✓' ? 'success' : 
                buttonText.includes('Ошибка') || buttonText.includes('Введите') || buttonText.includes('Некорректный') || buttonText.includes('Минимум') ? 'error' : ''
              }`}
              disabled={isSubmitting}
              whileHover={!isSubmitting && buttonText === 'Отправить сообщение' ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting && buttonText === 'Отправить сообщение' ? { scale: 0.98 } : {}}
            >
              <div className="submit-button-content">
                <span className="submit-button-text">
                  {buttonText}
                </span>
                <div className="submit-button-star">
                  <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                    <g clipPath="url(#clip0_275_1034)">
                      <path d="M39.317 15.7815L38.0424 11.858L25.0584 16.0768L33.0832 5.03198L29.7458 2.60726L21.721 13.6526V0H17.596V13.6526L9.57122 2.60726L6.23434 5.03198L14.2586 16.0768L1.27466 11.858L0 15.7815L12.984 20.0003L0 24.219L1.27466 28.142L14.2586 23.9232L6.23434 34.968L9.57122 37.3927L17.596 26.3479V40H21.721V26.3479L29.7458 37.3927L33.0832 34.968L25.0584 23.9232L38.0424 28.142L39.317 24.219L26.333 20.0003L39.317 15.7815Z" fill="currentColor"/>
                    </g>
                  </svg>
                </div>
              </div>
            </motion.button>
            
            {/* Status Messages */}
            
          </motion.div>
          
          {/* Right Column - Placeholder for Image (1/3 ширины) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition  ={{ duration: 0.6, delay: 0.1 }}
            className="image-placeholder-column"
          >
            <div className="contact-image-wrapper">
              <img 
                src="/image-contact.webp" 
                alt="Свяжитесь с нами"
                className="contact-image"
              />
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* ===================== FOOTER SECTION ===================== */}
      <footer className="footer-section">
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
                  <a href="/#services" className="footer-block-link">Веб-разработка</a>
                </li>
                <li className="footer-block-item">
                  <a href="/#services" className="footer-block-link">UI/UX Дизайн</a>
                </li>
                <li className="footer-block-item">
                  <a href="/#services" className="footer-block-link">IT интеграция</a>
                </li>
                <li className="footer-block-item">
                  <a href="/#services" className="footer-block-link">Консалтинг</a>
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
        /* ===================== CONTACT PAGE STYLES ===================== */
        .contact-page {
          min-height: 100vh;
          background: var(--surface);
          padding-top: var(--nav-height);
        }
        
        /* Space for header */
        .header-space {
          height: var(--header-top-padding);
        }
        
        /* Contact Form Section */
        .contact-form-section {
          padding: 40px var(--section-padding-desktop);
          min-height: calc(100vh - var(--nav-height) - var(--header-top-padding));
          display: flex;
          align-items: center;
        }
        
        .contact-form-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
          width: 100%;
          min-height: 600px;
          align-items: stretch;
        }
        
        /* Columns */
        .contact-form-column {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .image-placeholder-column {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 100%;
        }
        
        /* Badge */
        .contact-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
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
        
        /* White Form Block */
        .contact-form-block {
          background: var(--white);
          border: 1px solid rgba(19, 19, 19, 0.08);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          border-radius: 12px;
          padding: 40px;
          flex: 1;
          min-height: 0;
          transition: all 0.2s ease;
        }
        
        .contact-form-block:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
        
        /* Form Styles */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 30px;
          height: 100%;
        }
        
        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .form-field-label {
          font-size: 1rem;
          font-weight: 500;
          color: var(--black);
          opacity: 0.9;
        }
        
        .form-input-wrapper,
        .form-textarea-wrapper {
          position: relative;
        }
        
        /* Поля с закругленными краями и серой обводкой */
        .form-input,
        .form-textarea {
          width: 100%;
          padding: 18px 24px;
          background: var(--white);
          border: 1px solid rgba(19, 19, 19, 0.2);
          border-radius: 8px;
          font-size: 1.125rem;
          color: var(--black);
          font-family: inherit;
          transition: all 0.3s ease;
          resize: none;
        }
        
        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--black);
          box-shadow: 0 0 0 2px rgba(19, 19, 19, 0.1);
        }
        
        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(19, 19, 19, 0.4);
          font-style: normal;
        }
        
        .form-input:disabled,
        .form-textarea:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .form-textarea {
          min-height: 180px;
        }
        
        /* Submit Button Block - отдельный черный блок */
        .submit-button-block {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          background: var(--black);
          color: var(--white);
          border: 1px solid var(--black);
          border-radius: 12px;
          padding: 20px 20px 15px 20px;
          margin-top: 20px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          width: 100%;
          border: none;
          font-family: inherit;
          position: relative;
        }
        
        .submit-button-block:hover:not(:disabled) {
          background: var(--white);
          color: var(--black);
          border-color: var(--black);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
        
        .submit-button-block:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        /* Стили для разных состояний кнопки */
        .submit-button-block.success {
          background: #10b981 !important;
          color: white !important;
          border-color: #10b981 !important;
        }
        
        .submit-button-block.success:hover {
          background: #10b981 !important;
          color: white !important;
          transform: none !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
        }
        
        .submit-button-block.error {
          background: #ef4444 !important;
          color: white !important;
          border-color: #ef4444 !important;
          animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        .submit-button-block.error:hover {
          background: #ef4444 !important;
          color: white !important;
          transform: none !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
        }
        
        .submit-button-block.submitting {
          position: relative;
          overflow: hidden;
        }
        
        .submit-button-block.submitting::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .submit-button-content {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          width: 100%;
        }
        
        .submit-button-text {
          font-size: 1.25rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          line-height: 1;
          margin-bottom: 2px;
        }
        
        .submit-button-star {
          color: #fa6151;
          opacity: 0.9;
          transition: opacity 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
          margin-bottom: 2px;
        }
        
        .submit-button-block:hover .submit-button-star {
          opacity: 1;
          transform: rotate(15deg) scale(1.1);
        }
        
        /* Убираем звездочку при ошибке/успехе */
        .submit-button-block.success .submit-button-star,
        .submit-button-block.error .submit-button-star {
          display: none;
        }
        
        /* Status Messages */
        .status-message {
          margin-top: 20px;
          padding: 24px;
          border-radius: 8px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          animation: slideIn 0.5s ease;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .status-message.success {
          background: rgba(52, 211, 153, 0.1);
          border: 1px solid #34d399;
        }
        
        .status-message.error {
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid #f87171;
        }
        
        .status-icon {
          font-size: 2rem;
          line-height: 1;
        }
        
        .status-content {
          flex: 1;
        }
        
        .status-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--black);
        }
        
        .status-text {
          font-size: 1rem;
          color: rgba(19, 19, 19, 0.7);
          line-height: 1.5;
        }
        
        .status-link {
          color: #fa6151;
          text-decoration: none;
          font-weight: 500;
        }
        
        .status-link:hover {
          text-decoration: underline;
        }
        
        /* Right Column - Image Placeholder (1/3 ширины) */
        .image-placeholder {
          background: var(--white);
          border: 1px solid rgba(19, 19, 19, 0.08);
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          height: 647px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: all 0.2s ease;
          margin-top: 70px; /* Опускаем на высоту badge */
        }
        
        .image-placeholder:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
        
        .placeholder-content {
          padding: 40px;
          text-align: center;
        }
        
        .placeholder-text {
          color: rgba(19, 19, 19, 0.4);
          font-size: 1.125rem;
          line-height: 1.5;
        }
        
        .placeholder-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 20px;
          opacity: 0.6;
        }

        /* Contact Image Styles */
.contact-image-wrapper {
  background: var(--white);
  border: 1px solid rgba(19, 19, 19, 0.08);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 647px;
  overflow: hidden;
  transition: all 0.2s ease;
  margin-top: 70px;
}

.contact-image-wrapper:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.contact-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.contact-image-wrapper:hover .contact-image {
  transform: scale(1.05);
}

/* Адаптивность для мобильных */
@media (max-width: 1024px) {
  .contact-image-wrapper {
    height: 300px;
    margin-top: 0;
  }
}

@media (max-width: 768px) {
  .contact-image-wrapper {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .contact-image-wrapper {
    height: 200px;
  }
}
        
        /* ===================== HEADER STYLES ===================== */
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
          height: auto;
          min-height: var(--nav-height);
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
        
        .nav-element[href*="#services"],
        .nav-element[href*="#about"], 
        .nav-element[href*="#articles"] {
          min-width: 100px;
          padding: 0 20px 20px 20px;
        }
        
        .nav-element.hello,
        .nav-element[href*="#projects"] {
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
        
        /* ===================== FOOTER STYLES ===================== */
        .footer-section {
          background: var(--black);
          padding: 80px var(--section-padding-desktop) 0;
          margin-top: 60px;
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
        
        /* ===================== RESPONSIVE ===================== */
        @media (max-width: 1200px) {
          .contact-form-container {
            gap: 30px;
          }
          
          .contact-form-block {
            padding: 35px;
          }
          
          .submit-button-block {
            padding: 25px 35px;
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
          .contact-form-section {
            padding: 40px var(--section-padding-tablet);
            min-height: auto;
          }
          
          .contact-form-container {
            grid-template-columns: 1fr;
            max-height: none;
            gap: 30px;
          }
          
          .image-placeholder {
            height: 300px;
          }
          
          .footer-section {
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
          
          /* Header responsive */
          .navbar {
            padding: 0 var(--section-padding-tablet);
          }
          
          .nav-desktop {
            display: none !important;
          }
          
          .burger-menu {
            display: flex;
          }
        }
        
        @media (max-width: 991px) {
          :root {
            --nav-height: 64px;
            --header-top-padding: 15px;
          }

          .navbar {
            padding: 0 var(--section-padding-mobile);
            height: var(--nav-height);
          }

          .nav-content {
            height: var(--nav-height);
          }

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
          
          .mobile-nav-item {
            height: var(--nav-height);
            padding: 0 20px 12px 20px;
          }
        }
        
        @media (max-width: 768px) {
          .contact-form-section {
            padding: 30px var(--section-padding-mobile);
          }
          
          .contact-form-block {
            padding: 30px;
          }
          
          .form-input,
          .form-textarea {
            padding: 16px 20px;
            font-size: 1rem;
          }
          
          .submit-button-block {
            padding: 20px 30px;
          }
          
          .submit-button-text {
            font-size: 1.125rem;
          }
          
          .image-placeholder {
            height: 250px;
          }
          
          .footer-section {
            margin-top: 40px;
            padding: 50px var(--section-padding-mobile) 0;
          }
          
          .footer-cta {
            padding: 30px;
            margin-bottom: 40px;
          }
          
          .footer-cta-title {
            font-size: 1.5rem;
          }
          
          .footer-cta-button {
            padding: 12px 25px;
            font-size: 1rem;
          }
          
          .footer-grid {
            gap: 25px;
          }
          
          .footer-block {
            padding: 25px;
            min-height: 180px;
          }
          
          .footer-block-title {
            font-size: 1.2rem;
            margin-bottom: 15px;
          }
          
          .footer-bottom-block {
            margin-top: 40px;
          }
          
          .footer-bottom-content {
            padding: 25px;
          }
        }
        
        @media (max-width: 480px) {
          .contact-form-section {
            padding: 20px var(--section-padding-mobile);
          }
          
          .contact-form-block {
            padding: 25px;
          }
          
          .form-input,
          .form-textarea {
            padding: 14px 18px;
          }
          
          .submit-button-block {
            padding: 18px 25px;
          }
          
          .submit-button-text {
            font-size: 1rem;
          }
          
          .submit-button-star svg {
            width: 18px;
            height: 18px;
          }
          
          .image-placeholder {
            height: 200px;
          }
          
          .placeholder-text {
            font-size: 1rem;
          }
          
          .placeholder-icon {
            font-size: 2.5rem;
          }
          
          .footer-section {
            padding: 40px var(--section-padding-mobile) 0;
          }
          
          .footer-cta {
            padding: 25px;
            margin-bottom: 30px;
          }
          
          .footer-cta-title {
            font-size: 1.3rem;
            margin-bottom: 15px;
          }
          
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .footer-block {
            padding: 20px;
            min-height: auto;
          }
          
          .footer-block-title {
            font-size: 1.1rem;
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
