// components/About.jsx
'use client'

import FigmaCursors from './FigmaCursors'

export default function About() {
  return (
      <section className="section section_about">
        <div className="panel">
          <div className="panel_content">
            {/* Заголовок секции */}
            <div className="badge">
              <div className="badge_icon">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM20 36C11.178 36 4 28.822 4 20C4 11.178 11.178 4 20 4C28.822 4 36 11.178 36 20C36 28.822 28.822 36 20 36Z"/>
                  <path d="M20 10C15.037 10 11 14.037 11 19C11 23.963 15.037 28 20 28C24.963 28 29 23.963 29 19C29 14.037 24.963 10 20 10ZM20 24C17.243 24 15 21.757 15 19C15 16.243 17.243 14 20 14C22.757 14 25 16.243 25 19C25 21.757 22.757 24 20 24Z"/>
                </svg>
              </div>
              <h2 className="badge_text">О нас</h2>
            </div>
          </div>
        </div>
        
        {/* Интерактивный блок с курсорами Figma */}
        <div className="figma-cursors-wrapper">
          <FigmaCursors />
        </div>
        
        {/* Дополнительный блок */}
        <div className="panel" style={{ marginTop: '60px' }}>
          <div className="panel_content">
            <div style={{ padding: '0 60px' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.8rem' }}>
                Почему распределенная команда работает эффективнее
              </h3>
              
              <div className="benefits-grid">
                {[
                  { title: 'Лучшие специалисты', desc: 'Нанимаем лучших специалистов без географических ограничений' },
                  { title: 'Гибкость процессов', desc: 'Адаптируем рабочий процесс под нужды каждого участника' },
                  { title: 'Круглосуточный прогресс', desc: 'Задачи решаются пока вы спите или занимаетесь другими делами' },
                  { title: 'Свежий взгляд', desc: 'Разные культуры и подходы улучшают конечный результат' },
                ].map((benefit, idx) => (
                  <div key={idx} className="benefit-card">
                    <h4>{benefit.title}</h4>
                    <p>{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .badge {
            margin-left: 57px;
          }
          
          .figma-cursors-wrapper {
            margin-top: 6px;
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
          
          @media (max-width: 1024px) {
            .badge {
              margin-left: 40px;
            }
            
            .figma-cursors-wrapper {
              margin-top: 15px;
            }
            
            .benefits-grid {
              gap: 25px;
            }
            
            div[style*="padding: 0 60px"] {
              padding: 0 40px !important;
            }
          }
          
          @media (max-width: 768px) {
            .benefits-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
            
            .badge {
              margin-left: 20px;
            }
            
            .figma-cursors-wrapper {
              margin-top: 10px;
            }
            
            div[style*="padding: 0 60px"] {
              padding: 0 20px !important;
            }
            
            .benefit-card {
              padding: 20px;
            }
          }
        `}</style>
      </section>
  )
}
