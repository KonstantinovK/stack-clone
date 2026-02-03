// app/services/stacklink/page.jsx
'use client';

import { useState } from 'react';
import { 
  Clock, 
  ShieldAlert, 
  Wrench, 
  Cpu, 
  CheckCircle2, 
  Server, 
  Globe, 
  Calculator,
  ArrowRight,
  Wifi,
  Shield,
  Zap
} from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ServiceOrderModal from '../../../components/ServiceOrderModal';

export default function StackLinkPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalServiceType, setModalServiceType] = useState('StackLink: подключение к промышленному оборудованию');

  const openModal = (serviceType: string) => {
    setModalServiceType(serviceType);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const problems = [
    {
      id: 1,
      title: 'Дорогое железо',
      description: 'Роутеры за 3000–5000₽ на каждый объект съедают бюджет',
      icon: Cpu
    },
    {
      id: 2,
      title: 'Потеря времени',
      description: '30+ минут на настройку VPN и правил фаервола вручную',
      icon: Clock
    },
    {
      id: 3,
      title: 'Риск безопасности',
      description: 'Проброс портов = открытая дверь для внешних угроз',
      icon: ShieldAlert
    },
    {
      id: 4,
      title: 'Зависимость',
      description: 'Нужен квалифицированный сетевой инженер для каждой мелочи',
      icon: Wrench
    }
  ];

  const solutionSteps = [
    {
      id: 1,
      title: 'Получите шлюз',
      description: 'Готовый модуль. Включаете в розетку и подключаете к интернету (Ethernet, Wi-Fi, 4G)',
      icon: Server
    },
    {
      id: 2,
      title: 'Автоподключение',
      description: 'Через 5 минут шлюз находит облако и регистрируется. Зеленый индикатор — всё готово',
      icon: Wifi
    },
    {
      id: 3,
      title: 'Контролируйте',
      description: 'Единая веб-панель. Видите все объекты. Подключаетесь одним кликом',
      icon: Globe
    }
  ];

  const comparisonData = [
    {
      parameter: 'Стоимость оборудования',
      traditional: '3000–5000₽',
      stacklink: 'от 299₽'
    },
    {
      parameter: 'Время настройки',
      traditional: '30+ минут',
      stacklink: '5 минут'
    },
    {
      parameter: 'Требуемые навыки',
      traditional: 'Сетевой инженер',
      stacklink: 'Любой техник'
    },
    {
      parameter: 'Безопасность',
      traditional: 'Риск ошибок',
      stacklink: 'Zero Trust'
    },
    {
      parameter: 'Управление',
      traditional: 'Нет (разрозненно)',
      stacklink: 'Единая панель'
    }
  ];

  const benefits = [
    {
      id: 1,
      title: 'Экономия времени',
      description: 'Сокращение настройки с 30+ минут до 5 минут на объект',
      icon: Zap
    },
    {
      id: 2,
      title: 'Снижение затрат',
      description: 'Экономия 1000–3000₽ на каждом устройстве подключения',
      icon: Calculator
    },
    {
      id: 3,
      title: 'Повышенная безопасность',
      description: 'Zero Trust архитектура без открытых портов',
      icon: Shield
    }
  ];

  const stats = [
    {
      value: 'от 15 мин',
      label: 'экономии на объекте'
    },
    {
      value: 'Экономия ₽',
      label: 'на каждую точку подключения'
    },
    {
      value: '100%',
      label: 'безопасность'
    }
  ];

  return (
    <div className="stacklink-page">
      <Header />
      
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="section-container">
            <h1 className="hero-title">
              Устали тратить <span className="accent-text">деньги</span> и{' '}
              <span className="accent-text">время</span> на настройку доступа?
            </h1>
            <p className="hero-description">
              StackLink: подключение к промышленному оборудованию за 15 минут. 
              Без сложных VPN, без открытых портов, без привлечения сетевого инженера.
            </p>
            <div className="hero-actions">
              <button 
                className="primary-button"
                onClick={() => openModal('StackLink: подключение к промышленному оборудованию')}
              >
                <Calculator className="w-5 h-5" />
                Рассчитать экономию
              </button>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section className="problems-section">
          <div className="section-container">
            <h2 className="section-title">Знакомые боли установщика?</h2>
            <p className="section-subtitle">
              Почему старые методы больше не работают эффективно
            </p>
            <div className="problems-grid">
              {problems.map((problem) => (
                <div key={problem.id} className="problem-card">
                  <div className="problem-icon">
                    <problem.icon className="w-6 h-6" />
                  </div>
                  <h3 className="problem-title">{problem.title}</h3>
                  <p className="problem-description">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="solution-section">
          <div className="section-container">
            <h2 className="section-title">Решение — <span className="accent-text">StackLink</span></h2>
            <p className="solution-description">
              Plug-and-play шлюз, который подключается сам и дает доступ ко всему оборудованию как к локальной сети.
            </p>
            
            <div className="solution-content">
              <div className="solution-steps">
                {solutionSteps.map((step) => (
                  <div key={step.id} className="solution-step">
                    <div className="step-number">{step.id.toString().padStart(2, '0')}</div>
                    <div className="step-icon">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="step-content">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-description">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="solution-visual">
                <div className="dashboard-preview">
                  <div className="dashboard-header">
                    <div className="status-indicators">
                      <div className="status-dot active"></div>
                      <div className="status-dot active"></div>
                      <div className="status-dot active"></div>
                    </div>
                    <div className="dashboard-title">dashboard.stacklink.io</div>
                  </div>
                  <div className="dashboard-content">
                    <div className="gateway-item online">
                      <div className="gateway-info">
                        <div className="gateway-status"></div>
                        <span>Gateway-01</span>
                      </div>
                      <span className="status-badge">Online</span>
                    </div>
                    <div className="gateway-item online">
                      <div className="gateway-info">
                        <div className="gateway-status"></div>
                        <span>Gateway-02</span>
                      </div>
                      <span className="status-badge">Online</span>
                    </div>
                    <div className="connection-status">
                      <span>Connecting to secure tunnel...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="comparison-section">
          <div className="section-container">
            <h2 className="section-title">StackLink vs. Традиционный подход</h2>
            <p className="section-subtitle">Сравните и почувствуйте разницу</p>
            
            <div className="comparison-table">
              <div className="table-header">
                <div className="parameter-column">Параметр</div>
                <div className="value-column">Обычный подход</div>
                <div className="value-column accent-column">StackLink</div>
              </div>
              
              {comparisonData.map((row, index) => (
                <div key={index} className="table-row">
                  <div className="parameter-column">{row.parameter}</div>
                  <div className="value-column">{row.traditional}</div>
                  <div className="value-column accent-column">
                    {row.stacklink}
                    <CheckCircle2 className="check-icon" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="benefits-section">
          <div className="section-container">
            <h2 className="section-title">Преимущества внедрения</h2>
            <div className="benefits-grid">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="benefit-card">
                  <div className="benefit-icon">
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="section-container">
            <h2 className="section-title">Готовы упростить удаленный доступ?</h2>
            <p className="cta-description">
              Оставьте контакты и получите персональный расчет экономии, демо-доступ к панели и гайд по переходу.
            </p>
            
            <div className="cta-actions">
              <button 
                className="primary-button large"
                onClick={() => openModal('StackLink: подключение к промышленному оборудованию')}
              >
                Получить консультацию
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Modal */}
        <ServiceOrderModal
          isOpen={isModalOpen}
          onClose={closeModal}
          serviceType={modalServiceType}
        />
      </main>

      <Footer />

      <style jsx global>{`
        .stacklink-page {
          background: var(--surface);
          color: var(--black);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          padding-top: calc(var(--nav-height) + 40px);
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--section-padding-desktop);
        }

        @media (max-width: 1024px) {
          .section-container {
            padding: 0 var(--section-padding-tablet);
          }
        }

        @media (max-width: 768px) {
          .section-container {
            padding: 0 var(--section-padding-mobile);
          }
        }

        /* Hero Section */
        .hero-section {
          padding: 80px 0;
          text-align: center;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--black);
        }

        .hero-description {
          font-size: 1.5rem;
          color: #666;
          max-width: 800px;
          margin: 0 auto 2rem;
        }

        .hero-actions {
          margin-top: 2rem;
        }

        .accent-text {
          color: #fa6151;
        }

        /* Problems Section */
        .problems-section {
          padding: 80px 0;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 20px;
          color: var(--black);
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: #666;
          text-align: center;
          margin-bottom: 60px;
        }

        .problems-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .problem-card {
          background: var(--white);
          border-radius: var(--border-radius);
          padding: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid rgba(19, 19, 19, 0.08);
          text-align: center;
        }

        .problem-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .problem-icon {
          width: 60px;
          height: 60px;
          background: #fa6151;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
        }

        .problem-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--black);
        }

        .problem-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.5;
        }

        /* Solution Section */
        .solution-section {
          padding: 80px 0;
          background: var(--white);
        }

        .solution-description {
          font-size: 1.2rem;
          color: #666;
          text-align: center;
          max-width: 800px;
          margin: 0 auto 60px;
        }

        .solution-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .solution-content {
            grid-template-columns: 1fr;
          }
        }

        .solution-steps {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .solution-step {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          position: relative;
        }

        .solution-step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 45px;
          top: 60px;
          bottom: -40px;
          width: 2px;
          background: rgba(19, 19, 19, 0.1);
        }

        .step-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #fa6151;
          opacity: 0.2;
          min-width: 60px;
        }

        .step-icon {
          width: 50px;
          height: 50px;
          background: rgba(250, 97, 81, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fa6151;
          margin-top: 10px;
        }

        .step-content {
          flex: 1;
        }

        .step-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--black);
        }

        .step-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.5;
        }

        .solution-visual {
          background: var(--surface);
          border-radius: var(--border-radius);
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .dashboard-preview {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(19, 19, 19, 0.1);
        }

        .dashboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          background: var(--surface);
          border-bottom: 1px solid rgba(19, 19, 19, 0.1);
        }

        .status-indicators {
          display: flex;
          gap: 8px;
        }

        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #666;
        }

        .status-dot.active {
          background: #34d399;
        }

        .status-dot:nth-child(1) { background: #fa6151; }
        .status-dot:nth-child(2) { background: #fbbf24; }
        .status-dot:nth-child(3) { background: #34d399; }

        .dashboard-title {
          font-size: 0.9rem;
          color: #666;
          font-family: monospace;
        }

        .dashboard-content {
          padding: 20px;
        }

        .gateway-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px;
          background: var(--surface);
          border-radius: 8px;
          margin-bottom: 10px;
          border: 1px solid rgba(19, 19, 19, 0.08);
        }

        .gateway-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .gateway-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 8px rgba(52, 211, 153, 0.5);
        }

        .status-badge {
          font-size: 0.8rem;
          padding: 4px 12px;
          background: rgba(52, 211, 153, 0.1);
          color: #34d399;
          border-radius: 20px;
        }

        .connection-status {
          padding: 20px;
          background: var(--surface);
          border-radius: 8px;
          text-align: center;
          color: #666;
          font-size: 0.9rem;
          border: 1px dashed rgba(19, 19, 19, 0.2);
        }

        /* Comparison Section */
        .comparison-section {
          padding: 80px 0;
        }

        .comparison-table {
          background: var(--white);
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(19, 19, 19, 0.08);
        }

        .table-header {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          background: var(--surface);
          font-weight: 600;
          padding: 20px;
          border-bottom: 1px solid rgba(19, 19, 19, 0.1);
        }

        .table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          padding: 20px;
          align-items: center;
          border-bottom: 1px solid rgba(19, 19, 19, 0.05);
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .parameter-column {
          font-weight: 600;
          color: var(--black);
        }

        .value-column {
          color: #666;
        }

        .accent-column {
          color: #fa6151;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .check-icon {
          width: 20px;
          height: 20px;
          color: #34d399;
        }

        /* Benefits Section */
        .benefits-section {
          padding: 80px 0;
          background: var(--white);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .benefit-card {
          background: var(--surface);
          border-radius: var(--border-radius);
          padding: 30px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid rgba(19, 19, 19, 0.08);
        }

        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .benefit-icon {
          width: 70px;
          height: 70px;
          background: rgba(250, 97, 81, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #fa6151;
        }

        .benefit-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--black);
        }

        .benefit-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.5;
        }

        /* CTA Section */
        .cta-section {
          padding: 80px 0;
          text-align: center;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: white;
        }

        .cta-section .section-title {
          color: white;
        }

        .cta-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto 40px;
        }

        .cta-actions {
          margin: 40px 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-top: 60px;
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #fa6151;
          margin-bottom: 10px;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
        }

        /* Buttons */
        .primary-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          background: var(--black);
          color: var(--white);
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .primary-button:hover {
          background: #333;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .primary-button.large {
          padding: 18px 40px;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-description {
            font-size: 1.2rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .section-subtitle {
            font-size: 1rem;
          }
          
          .problems-grid,
          .benefits-grid {
            grid-template-columns: 1fr;
          }
          
          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 10px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
          @media (max-width: 768px) {
  .main-content {
    padding-top: calc(var(--nav-height) + 20px);
  }
  
  .hero-section {
    padding: 60px 0 40px 0 !important;
  }
      `}</style>
    </div>
  );
}
