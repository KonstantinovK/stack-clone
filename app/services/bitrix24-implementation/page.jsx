// app/services/bitrix24-implementation/page.jsx
'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  BarChart3,
  CheckCircle2,
  Zap,
  Users,
  FileText,
  Settings,
  GitMerge, // Замена для Integration
  GraduationCap,
  Headphones,
  Cpu,
  Shield,
  DollarSign,
  Target,
  Globe,
  Mail,
  Phone,
  MessageSquare,
  Database,
  Workflow,
  Layers
} from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ServiceOrderModal from '../../../components/ServiceOrderModal';

export default function Bitrix24ImplementationPage() {
  const [selectedPackage, setSelectedPackage] = useState('standard');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalServiceType, setModalServiceType] = useState('');

  const openModal = (serviceType) => {
    setModalServiceType(serviceType);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const packages = [
    {
      id: 'basic',
      name: 'Базовый пакет',
      price: 'от 39000',
      description: 'Для небольших команд до 10 человек',
      features: [
        'Настройка базовых модулей CRM',
        'Интеграция с сайтом компании',
        'Обучение до 5 сотрудников',
        'Настройка основных бизнес-процессов',
        'Техническая документация',
        'Поддержка 1 месяц'
      ],
      popular: false
    },
    {
      id: 'standard',
      name: 'Стандартный пакет',
      price: 'от 89000',
      description: 'Для среднего бизнеса до 30 человек',
      features: [
        'Все из базового пакета',
        'Настройка маркетинговых инструментов',
        'Интеграция с 1С и другими системами',
        'Обучение до 15 сотрудников',
        'Разработка индивидуальных отчетов',
        'Поддержка 3 месяца'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Премиум пакет',
      price: 'от 199000',
      description: 'Для крупного бизнеса без ограничений',
      features: [
        'Все из стандартного пакета',
        'Индивидуальная настройка под бизнес',
        'Разработка уникальных приложений',
        'Обучение неограниченного числа сотрудников',
        'Персональный менеджер проекта',
        'Поддержка 6 месяцев',
        'Приоритетная техническая поддержка'
      ],
      popular: false
    }
  ];

  const stages = [
    {
      id: 1,
      title: 'Анализ бизнес-процессов',
      description: 'Изучаем текущие процессы вашей компании, выявляем точки роста и оптимизации',
      icon: BarChart3
    },
    {
      id: 2,
      title: 'Проектирование решения',
      description: 'Разрабатываем архитектуру системы с учетом специфики вашего бизнеса',
      icon: Settings
    },
    {
      id: 3,
      title: 'Внедрение и настройка',
      description: 'Устанавливаем и настраиваем модули Битрикс24 под ваши задачи',
      icon: Zap
    },
    {
      id: 4,
      title: 'Интеграция систем',
      description: 'Подключаем внешние сервисы и системы для комплексной автоматизации',
      icon: GitMerge // Используем GitMerge вместо Integration
    },
    {
      id: 5,
      title: 'Обучение сотрудников',
      description: 'Проводим обучение для вашей команды по работе с системой',
      icon: GraduationCap
    },
    {
      id: 6,
      title: 'Поддержка и сопровождение',
      description: 'Обеспечиваем техническую поддержку и развитие системы',
      icon: Headphones
    }
  ];

  const benefits = [
    {
      title: 'Рост продаж',
      description: 'Автоматизация процессов приведет к увеличению эффективности продаж',
      icon: TrendingUp,
      color: '#fa6151'
    },
    {
      title: 'Экономия времени',
      description: 'Сокращение рутинных операций и автоматизация ежедневных задач',
      icon: Clock,
      color: '#fa6151'
    },
    {
      title: 'Аналитика и контроль',
      description: 'Доступ к аналитике и метрикам для принятия обоснованных решений',
      icon: BarChart3,
      color: '#fa6151'
    }
  ];

  return (
    <div className="implementation-page">
      <Header />
      
      <main className="main-content">
        <section className="hero-section">
          <div className="section-container">
            <h1 className="hero-title">Внедрение Битрикс24</h1>
            <p className="hero-description">
              Комплексное внедрение CRM-системы под ваш бизнес с интеграцией и обучением
            </p>
          </div>
        </section>

        <section className="stages-section">
          <div className="section-container">
            <h2 className="section-title">Этапы внедрения</h2>
            <div className="stages-grid">
              {stages.map((stage) => (
                <div key={stage.id} className="stage-card">
                  <div className="stage-number">{stage.id.toString().padStart(2, '0')}</div>
                  <div className="stage-icon">
                    <stage.icon className="w-6 h-6" />
                  </div>
                  <h3 className="stage-title">{stage.title}</h3>
                  <p className="stage-description">{stage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="packages-section">
          <div className="section-container">
            <h2 className="section-title">Выберите пакет услуг</h2>
            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <div className="popular-badge">Популярный</div>}
                  <div className="package-header">
                    <h3 className="package-name">{pkg.name}</h3>
                    <p className="package-description">{pkg.description}</p>
                    <div className="package-price">
                      <span className="price-value">{pkg.price.toLocaleString('ru-RU')}</span>
                      <span className="price-currency"> ₽</span>
                    </div>
                  </div>
                  
                  <div className="package-features">
                    <ul>
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="feature-item">
                          <CheckCircle2 className="check-mark" />
                          <span className="feature-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="package-action">
                    <button
                      className={`select-package-btn ${selectedPackage === pkg.id ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        openModal(pkg.name);
                      }}
                    >
                      Получить рассчет
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <div className="section-container">
            <h2 className="section-title">Преимущества внедрения</h2>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <div className="benefit-icon" style={{ backgroundColor: `${benefit.color}20`, color: benefit.color }}>
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <ServiceOrderModal
          isOpen={isModalOpen}
          onClose={closeModal}
          serviceType={modalServiceType}
        />
      </main>

      <Footer />

      <style jsx global>{`
        .implementation-page {
          background: var(--surface);
          color: var(--black);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          padding-top: var(--nav-height);
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

        .hero-section {
          padding: 80px 0;
          text-align: center;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1rem;
          color: var(--black);
        }

        .hero-description {
          font-size: 1.5rem;
          color: #666;
          max-width: 800px;
          margin: 0 auto;
        }

        .stages-section {
          padding: 80px 0;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 60px;
          color: var(--black);
        }

        .stages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .stage-card {
          background: var(--white);
          border-radius: var(--border-radius);
          padding: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid rgba(19, 19, 19, 0.08);
          text-align: center;
        }

        .stage-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .stage-number {
          font-size: 3rem;
          font-weight: 800;
          color: #fa6151;
          opacity: 0.2;
          margin-bottom: 0.5rem;
        }

        .stage-icon {
          width: 50px;
          height: 50px;
          background: rgba(250, 97, 81, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          color: #fa6151;
        }

        .stage-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--black);
        }

        .stage-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.5;
        }

        .packages-section {
          padding: 80px 0;
          background: var(--white);
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .package-card {
          background: var(--white);
          border-radius: var(--border-radius);
          padding: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          position: relative;
          transition: all 0.3s ease;
          border: 1px solid rgba(19, 19, 19, 0.08);
        }

        .package-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .package-card.popular {
          border-color: #fa6151;
          box-shadow: 0 4px 16px rgba(250, 97, 81, 0.15);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #fa6151;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .package-header {
          text-align: center;
          margin-bottom: 25px;
        }

        .package-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--black);
        }

        .package-description {
          color: #666;
          margin-bottom: 20px;
        }

        .package-price {
          margin: 15px 0;
        }

        .price-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--black);
        }

        .price-currency {
          font-size: 1.2rem;
          color: var(--black);
        }

        .package-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feature-item {
          padding: 8px 0;
          border-bottom: 1px solid rgba(19, 19, 19, 0.05);
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .feature-item:last-child {
          border-bottom: none;
        }

        .check-mark {
          color: #34d399;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          margin-top: 3px;
        }

        .feature-text {
          flex: 1;
        }

        .package-action {
          margin-top: 25px;
          text-align: center;
        }

        .select-package-btn {
          width: 100%;
          padding: 15px;
          background: var(--black);
          color: var(--white);
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .select-package-btn:hover {
          background: #333;
          transform: translateY(-2px);
        }

        .select-package-btn.selected {
          background: #fa6151;
        }

        .benefits-section {
          padding: 80px 0;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .benefit-card {
          background: var(--white);
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
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          transition: all 0.3s ease;
        }

        .benefit-card:hover .benefit-icon {
          transform: scale(1.1) rotate(5deg);
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
          
          .stages-grid,
          .packages-grid,
          .benefits-grid {
            grid-template-columns: 1fr;
          }
          
          .popular-badge {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            margin: 10px auto;
          }
          
          .stage-icon {
            width: 45px;
            height: 45px;
          }
          
          .benefit-icon {
            width: 60px;
            height: 60px;
          }
        }
        
        /* Стили для модального окна */
        #b24-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        
        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
        }
        
        .modal-content {
          position: relative;
          background-color: white;
          border-radius: 8px;
          padding: 20px;
          max-width: 600px;
          width: 90%;
          max-height: 90%;
          overflow: auto;
          z-index: 10001;
        }
        
        .modal-close {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          z-index: 10002;
        }
      `}</style>
    </div>
  );
}
