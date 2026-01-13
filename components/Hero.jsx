// components/Hero.jsx
'use client'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)
  const marqueeRef = useRef(null)
  
  const marqueeItems = [
    "Внедрение CRM систем",
    "Разработка сайтов и бизнес-приложений", 
    "IT интеграция",
    "Поддержка и сопровождение систем"
  ]
  
  const allItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
      <section className="section section_hero">
        <div className="panel space-between">
          <div className="panel_content">
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
          </div>
        </div>
        
        <div className="panel breakbar-panel">
          <div className="breakbar"
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
        </div>

        <style jsx>{`
          .marquee.paused {
            animation-play-state: paused !important;
            transition: animation-play-state 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
          }
          
          .breakbar {
            transition: opacity 0.3s ease;
          }
          
          .breakbar:hover {
            opacity: 0.95;
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
          
          .hero-abstract-image-right {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            opacity: 0.85;
            transition: opacity 0.3s ease, transform 0.3s ease;
            margin-top: 2px;
            margin-right: 80px;
          }
          
          .hero-abstract-image-right:hover {
            opacity: 1;
            transform: scale(1.25) rotate(2deg);
          }
          
          .abstract-img-right {
            display: block;
            filter: brightness(1.05);
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
          
          @media (max-width: 1024px) {
            .hero-top-container {
              gap: 30px;
              margin-bottom: 30px;
            }
            
            .hero-title-large {
              max-width: 55%;
            }
            
            .hero-abstract-image-right {
              width: 180px;
              margin-right: 40px;
            }
          }
          
          @media (max-width: 768px) {
            .hero-top-container {
              flex-direction: column;
              gap: 20px;
              margin-bottom: 25px;
            }
            
            .hero-title-large {
              max-width: 100%;
              font-size: clamp(2rem, 5vw, 4rem);
            }
            
            .hero-abstract-image-right {
              align-self: flex-end;
              width: 150px;
              margin-top: 0;
              margin-bottom: 20px;
              margin-right: 30px;
            }
            
            .hero-subtitle-bottom {
              max-width: 100%;
              text-align: left;
              margin-top: 0;
            }
          }
          
          @media (max-width: 480px) {
            .hero-abstract-image-right {
              align-self: center;
              width: 130px;
              margin-right: 20px;
            }
            
            .hero-subtitle-bottom {
              font-size: 1.25rem;
            }
          }
        `}</style>
      </section>
  )
}
