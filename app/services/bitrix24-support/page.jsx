// app/services/bitrix24-support/page.jsx
'use client';

import { useState } from 'react';
import { 
  Headphones,
  MessageSquare,
  RefreshCw,
  GraduationCap,
  GitMerge,
  BarChart3,
  CheckCircle2,
  Wrench,
  Zap,
  Shield,
  Users,
  Clock,
  Settings,
  FileText,
  Monitor,
  Smartphone,
  Mail,
  Phone,
  HelpCircle,
  BookOpen,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ServiceOrderModal from '../../../components/ServiceOrderModal';

export default function Bitrix24SupportPage() {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalServiceType, setModalServiceType] = useState('');
  
  const openModal = (serviceType) => {
    setModalServiceType(serviceType);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const supportPlans = [
    {
      id: 'basic',
      name: 'Базовая поддержка',
      price: 'от 15000',
      description: 'Для малого бизнеса и стартапов',
      features: [
        'Техническая поддержка по email',
        'Консультации до 2 часов в день',
        'Обновления системы',
        'Резервное копирование',
        'Анализ производительности',
        'Мониторинг системы'
      ],
      popular: false
    },
    {
      id: 'standard',
      name: 'Стандартная поддержка',
      price:'от 29000',
      description: 'Для среднего и крупного бизнеса',
      features: [
        'Все из базового плана',
        'Поддержка по телефону и email',
        'Консультации до 4 часов в день',
        'Настройка новых функций',
        'Индивидуальные отчеты',
        'Помощь в обучении сотрудников',
        'Приоритетная техническая поддержка'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Премиум поддержка',
      price: 'от 60000',
      description: 'Для крупного бизнеса с высокими требованиями',
      features: [
        'Все из стандартного плана',
        'Круглосуточная поддержка',
        'Консультации без ограничений',
        'Индивидуальная настройка под бизнес',
        'Разработка новых функций',
        'Персональный менеджер',
        'Ежемесячные отчеты и аналитика',
        'Приоритетная обработка запросов'
      ],
      popular: false
    }
  ];

  const services = [
    {
      id: 1,
      title: 'Техническая поддержка',
      description: 'Круглосуточная помощь в решении технических вопросов и устранении неполадок',
      icon: Headphones
    },
    {
      id: 2,
      title: 'Консультации экспертов',
      description: 'Профессиональные консультации по всем аспектам работы с Битрикс24',
      icon: MessageSquare
    },
    {
      id: 3,
      title: 'Обновления и модернизация',
      description: 'Регулярные обновления системы и внедрение новых функций',
      icon: RefreshCw
    },
    {
      id: 4,
      title: 'Обучение сотрудников',
      description: 'Обучение вашей команды эффективному использованию системы',
      icon: GraduationCap
    },
    {
      id: 5,
      title: 'Интеграция сервисов',
      description: 'Подключение внешних сервисов и инструментов к вашей системе',
      icon: GitMerge
    },
    {
      id: 6,
      title: 'Аналитика и отчетность',
      description: 'Регулярная аналитика и отчеты о работе вашей системы',
      icon: BarChart3
    }
  ];

  const whyUsBenefits = [
    {
      title: 'Опытные специалисты',
      description: 'Команда сертифицированных специалистов с многолетним опытом работы с Битрикс24',
      icon: Users,
      color: '#fa6151'
    },
    {
      title: 'Быстрое реагирование',
      description: 'Гарантируем оперативное решение вопросов в течение 2 часов',
      icon: Zap,
      color: '#fa6151'
    },
    {
      title: 'Безопасность данных',
      description: 'Обеспечиваем высокий уровень защиты вашей информации',
      icon: ShieldCheck,
      color: '#fa6151'
    }
  ];

  return (
    <div className="support-page">
      <Header />
      
      <main className="main-content">
        <section className="hero-section">
          <div className="section-container">
            <h1 className="hero-title">Сопровождение Битрикс24</h1>
            <p className="hero-description">
              Комплексная поддержка и развитие вашей CRM-системы для стабильной работы бизнеса
            </p>
          </div>
        </section>

        <section className="services-section">
          <div className="section-container">
            <h2 className="section-title">Наши услуги сопровождения</h2>
            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-icon">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="plans-section">
          <div className="section-container">
            <h2 className="section-title">Выберите план поддержки</h2>
            <div className="plans-grid">
              {supportPlans.map((plan) => (
                <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                  {plan.popular && <div className="popular-badge">Популярный</div>}
                  <div className="plan-header">
                    <h3 className="plan-name">{plan.name}</h3>
                    <p className="plan-description">{plan.description}</p>
                    <div className="plan-price">
                      <span className="price-value">{plan.price.toLocaleString('ru-RU')}</span>
                      <span className="price-currency"> ₽</span>
                      <span className="price-period">/мес</span>
                    </div>
                  </div>
                  
                  <div className="plan-features">
                    <ul>
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="feature-item">
                          <CheckCircle2 className="check-mark" />
                          <span className="feature-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="plan-action">
                    <button
                      className={`select-plan-btn ${selectedPlan === plan.id ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        openModal(plan.name);
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

        <section className="why-us-section">
          <div className="section-container">
            <h2 className="section-title">Почему выбирают нас</h2>
            <div className="why-us-grid">
              {whyUsBenefits.map((benefit, index) => (
                <div key={index} className="why-us-card">
                  <div className="why-us-icon" style={{ backgroundColor: `${benefit.color}20`, color: benefit.color }}>
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="why-us-title">{benefit.title}</h3>
                  <p className="why-us-description">{benefit.description}</p>
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
        .support-page {
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

        .services-section {
          padding: 80px 0;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 60px;
          color: var(--black);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .service-card {
          background: var(--white);
          border-radius: var(--border-radius);
          padding: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid rgba(19, 19, 19, 0.08);
          text-align: center;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .service-icon {
          width: 50px;
          height: 50px;
          background: rgba(250, 97, 81, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #fa6151;
        }

        .service-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--black);
        }

        .service-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.5;
        }

        .plans-section {
          padding: 80px 0;
          background: var(--white);
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .plan-card {
          background: var(--white);
          border-radius: var(--border-radius);
          padding: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          position: relative;
          transition: all 0.3s ease;
          border: 1px solid rgba(19, 19, 19, 0.08);
        }

        .plan-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .plan-card.popular {
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

        .plan-header {
          text-align: center;
          margin-bottom: 25px;
        }

        .plan-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--black);
        }

        .plan-description {
          color: #666;
          margin-bottom: 20px;
        }

        .plan-price {
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

        .price-period {
          font-size: 1rem;
          color: #666;
        }

        .plan-features ul {
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

        .plan-action {
          margin-top: 25px;
          text-align: center;
        }

        .select-plan-btn {
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

        .select-plan-btn:hover {
          background: #333;
          transform: translateY(-2px);
        }

        .select-plan-btn.selected {
          background: #fa6151;
        }

        .why-us-section {
          padding: 80px 0;
        }

        .why-us-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .why-us-card {
          background: var(--white);
          border-radius: var(--border-radius);
          padding: 30px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid rgba(19, 19, 19, 0.08);
        }

        .why-us-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .why-us-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          transition: all 0.3s ease;
        }

        .why-us-card:hover .why-us-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .why-us-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--black);
        }

        .why-us-description {
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
          
          .services-grid,
          .plans-grid,
          .why-us-grid {
            grid-template-columns: 1fr;
          }
          
          .popular-badge {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            margin: 10px auto;
          }
          
          .service-icon {
            width: 45px;
            height: 45px;
          }
          
          .why-us-icon {
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
