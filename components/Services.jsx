// components/Services.jsx
'use client'

export default function Services() {
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

  return (
    <section className="section section_home-services">
      {/* Убираем .panel и .panel_content - они создают лишние отступы */}
      
      <div className="badge">
        <div className="badge_icon">
          <svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor">
            <path d="M30 20C35.523 20 40 15.523 40 9.99999C40 4.47698 35.523 0 30 0C24.477 0 20 4.47698 20 9.99999C20 4.47698 15.523 0 10 0C4.477 0 0 4.47698 0 9.99999C0 15.523 4.477 20 10 20C4.477 20 0 24.477 0 30C0 35.523 4.477 40 10 40C15.523 40 20 35.523 20 30C20 35.523 24.477 40 30 40C35.523 40 40 35.523 40 30C40 24.477 35.523 20 30 20Z"/>
          </svg>
        </div>
        <h2 className="badge_text">Что мы делаем</h2>
      </div>
      
      <div className="services-grid-container">
        <div className="services-grid-2x2">
          {services.map((service) => (
            <div key={service.id} className="service-card-large">
              <div className="service-card-header">
                <div className="service-number-large">
                  {service.id.toString().padStart(2, '0')}
                </div>
                <h3 className="service-title-large">{service.title}</h3>
              </div>
              <p className="service-description-large">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Breakbar - убираем .panel обертку */}
      <div className="breakbar services-breakbar">
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

      <style jsx>{`
        .section_home-services {
          display: flex;
          flex-direction: column;
          gap: 10px; /* Контролируем отступы между элементами внутри секции */
        }
        
        .badge {
          margin-bottom: 0; /* Убираем если есть */
        }
        
        .services-grid-container {
          width: 100%;
          margin-top: 0;
        }
        
        .services-grid-2x2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, auto);
          gap: 20px;
          width: 100%;
        }
        
        .service-card-large {
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
        
        .service-card-large:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .service-card-header {
          margin-bottom: 1.5rem;
        }
        
        .service-number-large {
          font-size: 1rem;
          font-weight: 800;
          color: #fa6151;
          opacity: 1;
          margin-bottom: 0.75rem;
        }
        
        .service-title-large {
          font-size: 1.75rem;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 1rem;
          color: var(--black);
        }
        
        .service-description-large {
          font-size: 1.125rem;
          line-height: 1.5;
          color: #666;
          opacity: 0.9;
          flex: 1;
        }
        
        /* СТИЛИ ДЛЯ BREAKBAR С ИКОНКОЙ */
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
        
        /* АДАПТИВНОСТЬ */
        @media (max-width: 1024px) {
          .section_home-services {
            gap: 35px; /* Меньше отступы на планшете */
          }
          
          .services-grid-2x2 {
            gap: 25px;
          }
          
          .service-card-large {
            padding: 2rem;
            min-height: 200px;
          }
          
          .service-title-large {
            font-size: 1.5rem;
          }
          
          .service-description-large {
            font-size: 1rem;
          }
          
          .breakbar-star-icon {
            width: 22px;
            height: 22px;
          }
          
          .breakbar-star-icon svg {
            width: 20px;
            height: 20px;
          }
          
          .breakbar-text .rich-text-block {
            font-size: 1rem;
          }
        }
        
        @media (max-width: 768px) {
          .section_home-services {
            gap: 30px; /* Еще меньше на мобильных */
          }
          
          .services-grid-2x2 {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .service-card-large {
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
        }
        
        @media (max-width: 480px) {
          .section_home-services {
            gap: 25px; /* Минимальные отступы */
          }
          
          .service-card-large {
            padding: 1.5rem;
            min-height: 160px;
          }
          
          .service-title-large {
            font-size: 1.35rem;
          }
          
          .service-description-large {
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
        }
      `}</style>
    </section>
  )
}
