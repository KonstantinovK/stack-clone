// components/Clients.jsx
'use client'
import { motion } from 'framer-motion'

const clients = [
  { name: 'Client 1', logo: '/images/client1.svg' },
  { name: 'Client 2', logo: '/images/client2.svg' },
  { name: 'Client 3', logo: '/images/client3.svg' },
  { name: 'Client 4', logo: '/images/client4.svg' },
  { name: 'Client 5', logo: '/images/client5.svg' },
  { name: 'Client 6', logo: '/images/client6.svg' }
]

export default function Clients() {
  return (
      <section id="clients" className="section section_clients">
        <div className="panel">
          <div className="panel_content">
            {/* Заголовок в стиле других секций */}
            <div className="badge">
              <div className="badge_icon">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM20 36C11.178 36 4 28.822 4 20C4 11.178 11.178 4 20 4C28.822 4 36 11.178 36 20C36 28.822 28.822 36 20 36Z"/>
                  <path d="M20 10C15.037 10 11 14.037 11 19C11 23.963 15.037 28 20 28C24.963 28 29 23.963 29 19C29 14.037 24.963 10 20 10ZM20 24C17.243 24 15 21.757 15 19C15 16.243 17.243 14 20 14C22.757 14 25 16.243 25 19C25 21.757 22.757 24 20 24Z"/>
                </svg>
              </div>
              <h2 className="badge_text">Наши клиенты</h2>
            </div>
            
            <motion.div 
              className="clients-grid"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  className="client-item"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="client-item-inner">
                    {/* Заглушка для логотипа */}
                    <div className="client-logo-placeholder">
                      <span className="client-initial">{client.name.charAt(0)}</span>
                    </div>
                    <div className="client-name">{client.name}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <style jsx>{`
          .section_clients {
            width: 100%;
          }
          
          .clients-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 40px;
          }
          
          .client-item {
            background: var(--white);
            border-radius: var(--border-radius);
            border: 1px solid rgba(19, 19, 19, 0.08);
            padding: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 150px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          
          .client-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            border-color: var(--black);
          }
          
          .client-item-inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            text-align: center;
          }
          
          .client-logo-placeholder {
            width: 60px;
            height: 60px;
            background: var(--black);
            color: var(--white);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 600;
          }
          
          .client-name {
            font-size: 1.1rem;
            font-weight: 500;
            color: var(--black);
          }
          
          @media (max-width: 1024px) {
            .clients-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 25px;
            }
            
            .client-item {
              padding: 25px;
              min-height: 140px;
            }
          }
          
          @media (max-width: 768px) {
            .clients-grid {
              grid-template-columns: 1fr;
              gap: 20px;
              margin-top: 30px;
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
          }
          
          @media (max-width: 480px) {
            .clients-grid {
              gap: 15px;
            }
            
            .client-item {
              padding: 15px;
              min-height: 100px;
            }
          }
        `}</style>
      </section>
  )
}
