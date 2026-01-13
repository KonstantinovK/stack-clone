// components/Footer.jsx
'use client'

export default function Footer() {
  return (
      <footer id="contact" className="footer">
        {/* Верхняя часть - 4 блока */}
        <div className="footer-top">
          <div className="footer-grid">
            {/* Блок 1: Stackroom */}
            <div className="footer-block">
              <h3 className="footer-block-title">Stackroom</h3>
              <p className="footer-block-text">
                Создаем цифровые решения, которые работают для вашего бизнеса.
              </p>
            </div>
            
            {/* Блок 2: Контакты */}
            <div className="footer-block">
              <h3 className="footer-block-title">Контакты</h3>
              <ul className="footer-block-list">
                <li className="footer-block-item">
                  <span className="footer-block-text">Email: hello@stackroom.com</span>
                </li>
                <li className="footer-block-item">
                  <span className="footer-block-text">Телефон: +7 (999) 123-45-67</span>
                </li>
                <li className="footer-block-item">
                  <span className="footer-block-text">Адрес: Москва, ул. Примерная, 123</span>
                </li>
              </ul>
            </div>
            
            {/* Блок 3: Услуги */}
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
                  <a href="#" className="footer-block-link">Мобильные приложения</a>
                </li>
                <li className="footer-block-item">
                  <a href="#" className="footer-block-link">Консалтинг</a>
                </li>
              </ul>
            </div>
            
            {/* Блок 4: Соцсети */}
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
        
        {/* Нижняя часть - длинный блок */}
        <div className="footer-bottom-block">
          <div className="footer-bottom-content">
            <p className="footer-copyright">© 2024 Stackroom. Все права защищены.</p>
          </div>
        </div>

        <style jsx>{`
          .footer {
            background: var(--black);
            padding: 80px 0 0 0;
            margin-top: 120px;
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
          
          .footer-block {
            background: #333333; /* Темно-серый цвет */
            border-radius: 12px;
            padding: 30px;
            min-height: 250px;
            display: flex;
            flex-direction: column;
            transition: background-color 0.2s ease;
          }
          
          .footer-block:hover {
            background-color: var(--black); /* При наведении становится как фон */
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
          
          /* Нижний длинный блок */
          .footer-bottom-block {
            background: #333333; /* Такой же темно-серый */
            border-radius: 12px;
            margin-top: 60px;
            transition: background-color 0.2s ease;
          }
          
          .footer-bottom-block:hover {
            background-color: var(--black); /* При наведении становится как фон */
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
          
          /* Адаптивность */
          @media (max-width: 1200px) {
            .footer-grid {
              gap: 25px;
            }
            
            .footer-block {
              padding: 25px;
              min-height: 220px;
            }
          }
          
          @media (max-width: 1024px) {
            .footer-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 30px;
            }
            
            .footer {
              margin-top: 80px;
              padding: 60px 0 0 0;
            }
            
            .footer-block {
              min-height: 200px;
            }
            
            .footer-bottom-block {
              margin-top: 50px;
            }
          }
          
          @media (max-width: 768px) {
            .footer-grid {
              grid-template-columns: 1fr;
              gap: 25px;
            }
            
            .footer {
              margin-top: 60px;
              padding: 50px 0 0 0;
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
            .footer {
              padding: 40px 0 0 0;
              margin-top: 40px;
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
      </footer>
  )
}
