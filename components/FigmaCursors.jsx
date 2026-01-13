// components/FigmaCursors.jsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function FigmaCursors() {
  const containerRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 400 })
  
  const [cursors, setCursors] = useState([
    { 
      id: 1, 
      name: 'Алексей', 
      role: 'Frontend Lead', 
      x: 150, y: 120, 
      color: '#FF6B6B', 
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
      color: '#fbc74dff', 
      speedX: 2.6, 
      speedY: -1.3,
    },
    { 
      id: 4, 
      name: 'Анна', 
      role: 'Project Manager', 
      x: 250, y: 280, 
      color: '#06D6A0', 
      speedX: -1.4, 
      speedY: 1.7,
    },
  ])

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

  return (
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
            <h3 className="cursors-title">Смотрим на один экран, работаем из разных точек мира</h3>
            <p className="cursors-description">
              Уделяем особое внимание созданию удобных 
              пользовательских решений, обеспечивающих 
              максимальные результаты
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .figma-cursors-section {
          width: 100%;
          margin: 60px 0;
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
          border-radius: 16px;
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
          background: rgba(255, 255, 255, 0.95);
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
        
        @media (max-width: 1024px) {
          .figma-cursors-container {
            padding: 30px;
          }
          
          .cursors-text-overlay {
            padding: 18px 25px;
          }
        }
        
        @media (max-width: 768px) {
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
        }
        
        @media (max-width: 480px) {
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
        }
      `}</style>
    </div>
  )
}
