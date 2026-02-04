// app/services/bitrix24-pricing/page.jsx
'use client';

import { useState } from 'react';
import { 
  CheckCircle2,
  Briefcase,
  Users,
  MessageSquare,
  BarChart3,
  ShoppingCart,
  RefreshCw,
  Shield,
  FileText,
  Globe,
  Smartphone,
  Mail,
  Phone,
  Headphones,
  Settings,
  TrendingUp,
  Target,
  Zap,
  Database,
  CreditCard,
  Calendar,
  DollarSign,
  Star,
  Award,
  Crown,
  Sparkles,
  Rocket
} from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ServiceOrderModal from '../../../components/ServiceOrderModal'; // Добавили импорт модального окна

export default function Bitrix24PricingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month'); // 'month' or 'year'
  const [selectedEnterpriseUsers, setSelectedEnterpriseUsers] = useState('250');
  
  // Состояния для модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalServiceType, setModalServiceType] = useState('');
  
  // Функция открытия модального окна
  const openModal = (serviceType) => {
    setModalServiceType(serviceType);
    setIsModalOpen(true);
  };
  
  // Функция закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Обработчик для кнопок "Выбрать тариф"
  const handleSelectPlan = (planName, planId, userCount = null) => {
    let serviceType = planName;
    
    if (planId === 'enterprise' && userCount) {
      serviceType = `${planName} (${userCount} пользователей)`;
    }
    
    openModal(serviceType);
  };

  const handleEnterpriseUserChange = (planId, event) => {
    if (planId === 'enterprise') {
      setSelectedEnterpriseUsers(event.target.value);
    }
  };
  
  // Pricing map for Enterprise plan based on user count
  const enterprisePricing = {
    250: { monthly: 33990, annual: 27190 },
    500: { monthly: 59990, annual: 47990 },
    1000: { monthly: 99990, annual: 79990 },
    2000: { monthly: 199990, annual: 159990 },
    3000: { monthly: 299990, annual: 239990 },
    4000: { monthly: 399990, annual: 319990 },
    5000: { monthly: 499990, annual: 399990 },
    6000: { monthly: 599990, annual: 479990 },
    7000: { monthly: 699990, annual: 559990 },
    8000: { monthly: 799990, annual: 639990 },
    9000: { monthly: 899990, annual: 719990 },
    10000: { monthly: 999990, annual: 799990 }
  };
  
  // Calculate adjusted prices for enterprise plan based on user selection
  const getAdjustedPrice = (plan) => {
    if (plan.id === 'enterprise') {
      // Get the selected number of users
      const selectedUsers = parseInt(selectedEnterpriseUsers);
      const pricingInfo = enterprisePricing[selectedUsers];
      
      // Return the appropriate price based on selected period
      if (selectedPeriod === 'month') {
        return pricingInfo.monthly;
      } else {
        return pricingInfo.annual;
      }
    } else if (plan.id === 'basic' || plan.id === 'standard' || plan.id === 'professional') {
      // For basic, standard and professional plans, use the stored prices
      if (selectedPeriod === 'month') {
        return plan.priceMonthly; // 2490 for basic, 6990 for standard, 13990 for professional
      } else {
        // For annual period, show the discounted monthly rate
        return plan.priceYearly; // 1990 for basic, 5590 for standard, 11190 for professional (discounted monthly rate)
      }
    } else {
      // For all other plans, use standard calculation
      return selectedPeriod === 'month' ? plan.priceMonthly : Math.floor(plan.priceMonthly * 12 * (1 - 0.2));
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Бесплатный',
      priceMonthly: 0,
      priceYearly: 0,
      description: 'Начните работать онлайн и продавать больше с CRM',
      features: [
        'Совместная работа',
        'Мессенджер',
        'Коллабы',
        'Задачи и Проекты',
        'CRM',
        'BitrixGPT',
        'Онлайн-подпись',
        'Диск',
        'Доски',
        'Контакт-центр',
        'Сайты'
      ],
      popular: false,
      icon: Star,
      buttonText: 'Начать бесплатно'
    },
    {
      id: 'basic',
      name: 'Базовый',
      priceMonthly: 2490,
      priceYearly: 1990,  // This represents the discounted monthly rate when annual is selected
      description: 'CRM для небольших отделов продаж',
      features: [
        'Совместная работа',
        'Мессенджер',
        'Коллабы',
        'Задачи и Проекты',
        'CRM',
        'BitrixGPT',
        'Онлайн-подпись',
        'Диск',
        'Доски',
        'Контакт-центр',
        'Сайты',
        'Интернет-магазин',
        'Онлайн-запись',
        'Поддержка'
      ],
      popular: false,
      icon: Users,
      buttonText: 'Выбрать тариф'
    },
    {
      id: 'standard',
      name: 'Стандартный',
      priceMonthly: 6990,
      priceYearly: 5590,
      description: 'Для совместной работы всей компании или рабочих групп',
      features: [
        'Совместная работа',
        'Мессенджер',
        'Коллабы',
        'Задачи и Проекты',
        'CRM',
        'BitrixGPT',
        'Онлайн-подпись',
        'Диск',
        'Доски',
        'Контакт-центр',
        'Сайты',
        'Интернет-магазин',
        'Онлайн-запись',
        'Маркетинг',
        'Документы Онлайн',
        'КЭДО + Госключ',
        'BI Конструктор',
        'Поддержка',
        'Администрирование'
      ],
      popular: false,
      icon: Target,
      buttonText: 'Выбрать тариф'
    },
    {
      id: 'professional',
      name: 'Профессиональный',
      priceMonthly: 13990,
      priceYearly: 11190,
      description: 'Для максимальной автоматизации всех процессов в компании',
      features: [
        'Совместная работа',
        'Мессенджер',
        'Коллабы',
        'Задачи и Проекты',
        'CRM',
        'BitrixGPT',
        'Онлайн-подпись',
        'Диск',
        'Доски',
        'Контакт-центр',
        'Сайты',
        'Интернет-магазин',
        'Онлайн-запись',
        'Маркетинг',
        'Документы Онлайн',
        'КЭДО + Госключ',
        'BI Конструктор',
        'Сквозная аналитика',
        'Автоматизация',
        'HR: Компания',
        'Поддержка',
        'Администрирование'
      ],
      popular: true,
      icon: Award,
      buttonText: 'Выбрать тариф'
    },
    {
      id: 'enterprise',
      name: 'Энтерпрайз',
      priceMonthly: 33990, // Base price for 250 users
      priceYearly: 27190,  // Discounted price for 250 users
      description: 'Почему Битрикс24 Энтерпрайз?',
      features: [
        'Совместная работа',
        'Мессенджер',
        'Коллабы',
        'Задачи и Проекты',
        'CRM',
        'CRM №1',
        'BitrixGPT',
        'Онлайн-подпись',
        'Диск',
        'Доски',
        'Контакт-центр',
        'Сайты',
        'Интернет-магазин',
        'Онлайн-запись',
        'Маркетинг',
        'Документы Онлайн',
        'КЭДО + Госключ',
        'BI Конструктор',
        'Сквозная аналитика',
        'Автоматизация',
        'HR: Компания',
        'Филиалы',
        'Энтерпрайз-кластер',
        'Энтерпрайз-пакет',
        'Поддержка',
        'Администрирование'
      ],
      popular: false,
      icon: Crown,
      buttonText: 'Выбрать тариф и количество'
    }
  ];

  const yearlyDiscount = 0.2; // 20% discount for annual billing

  const features = [
    {
      title: 'CRM',
      description: 'Управление клиентами, сделками и воронками продаж',
      icon: Briefcase,
      color: '#fa6151'
    },
    {
      title: 'Управление проектами',
      description: 'Планирование задач, контроль сроков и распределение ресурсов',
      icon: Users,
      color: '#fa6151'
    },
    {
      title: 'Корпоративный чат',
      description: 'Коммуникация внутри компании с возможностью видеоконференций',
      icon: MessageSquare,
      color: '#fa6151'
    },
    {
      title: 'Аналитика и отчеты',
      description: 'Детальная статистика по эффективности работы',
      icon: BarChart3,
      color: '#fa6151'
    },
    {
      title: 'Интернет-магазин',
      description: 'Онлайн-торговля с интеграцией с CRM',
      icon: ShoppingCart,
      color: '#fa6151'
    },
    {
      title: 'Автоматизация',
      description: 'Бизнес-процессы и роботы для автоматизации задач',
      icon: RefreshCw,
      color: '#fa6151'
    }
  ];

  return (
    <div className="pricing-page">
      <Header />
      
      <main className="main-content">
        {/* Features Section */}
        <section className="features-section">
          <div className="section-container">
            <div className="features-intro">
              <h2 className="features-title">Возможности Битрикс24</h2>
              <p className="features-subtitle">Вместо десятков сервисов и приложений — единая платформа для организации работы всей компании.</p>
              <a 
                href="/contact" 
                className="get-free-btn"
                onClick={(e) => {
                  e.preventDefault();
                  openModal('Бесплатный тариф Битрикс24');
                }}
              >
                Получить бесплатно
              </a>
            </div>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon" style={{ backgroundColor: `${feature.color}20`, color: feature.color }}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="pricing-plans">
          <div className="section-container">
            <div className="plans-header">
              <h1 className="pricing-title">Тарифы Битрикс24</h1>
              <p className="pricing-subtitle">Выберите оптимальный тарифный план для вашего бизнеса</p>
              
              <div className="billing-toggle">
                <span className={`${selectedPeriod === 'month' ? 'active' : ''}`} onClick={() => setSelectedPeriod('month')}>
                  Месяц
                </span>
                <span className={`divider`}>|</span>
                <span className={`${selectedPeriod === 'year' ? 'active' : ''}`} onClick={() => setSelectedPeriod('year')}>
                  Год ({Math.round(yearlyDiscount * 100)}% скидка)
                </span>
              </div>
            </div>
            
            <div className="plans-grid">
              {plans.map((plan, index) => (
                <div key={index} className={`plan-card ${plan.popular ? 'popular' : ''} ${plan.id === 'free' ? 'free-plan' : ''}`}>
                  {plan.popular && <div className="popular-badge">Популярный</div>}
                  <div className="plan-top">
                    <div className="plan-icon">
                      <plan.icon className="w-6 h-6" />
                    </div>
                    <h2 className="plan-name">{plan.name}</h2>
                    <p className="plan-description">{plan.description}</p>
                    <div className="price-container">
                      {plan.id === 'free' ? (
                        <div className="price-free">
                          <span className="price-value">Бесплатно</span>
                        </div>
                      ) : (
                        <>
                          <span className="price-value">
                            {getAdjustedPrice(plan).toLocaleString('ru-RU')}
                          </span>
                          <span className="price-currency"> ₽</span>
                          <span className="price-period">/{selectedPeriod === 'month' ? 'мес' : 'год'}</span>
                        </>
                      )}
                    </div>
                    {plan.id === 'free' ? (
                      <p className="price-per-user">Неограниченное количество пользователей</p>
                    ) : plan.id === 'basic' ? (
                      <p className="price-per-user">5 пользователей</p>
                    ) : plan.id === 'standard' ? (
                      <p className="price-per-user">50 пользователей</p>
                    ) : plan.id === 'professional' ? (
                      <p className="price-per-user">100 пользователей</p>
                    ) : plan.id === 'enterprise' ? (
                      <div className="enterprise-users-selector">
                        <select
                          className="users-dropdown"
                          value={selectedEnterpriseUsers}
                          onChange={(e) => handleEnterpriseUserChange(plan.id, e)}
                        >
                          <option value="250">250 пользователей</option>
                          <option value="500">500 пользователей</option>
                          <option value="1000">1000 пользователей</option>
                          <option value="2000">2000 пользователей</option>
                          <option value="3000">3000 пользователей</option>
                          <option value="4000">4000 пользователей</option>
                          <option value="5000">5000 пользователей</option>
                          <option value="6000">6000 пользователей</option>
                          <option value="7000">7000 пользователей</option>
                          <option value="8000">8000 пользователей</option>
                          <option value="9000">9000 пользователей</option>
                          <option value="10000">10000 пользователей</option>
                        </select>
                      </div>
                    ) : (
                      <p className="price-per-user">за пользователя</p>
                    )}
                  </div>
                  
                  <div className="plan-features">
                    <ul>
                      {plan.features.map((feature, idx) => {
                        // Определяем уровень фичи (1-3 точки) в зависимости от тарифа и позиции фичи
                        // Простая система уровней: Free имеет 1 точку, Basic имеет 1-2 точки, Standard имеет 2 точки, Professional имеет 2-3 точки, Enterprise имеет 3 точки
                        const featureLevels = {
                          'free': [1, 1, 1, 1, 1, 2, 1, 1, 3, 1, 1], // 11 фич для бесплатного тарифа
                          'basic': [2, 2, 1, 1, 2, 3, 2, 1, 3, 2, 2, 1, 1, 1], // 14 фич для базового тарифа
                          'standard': [2, 3, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], // 19 фич для стандартного тарифа
                          'professional': [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 3, 2, 2], // 23 фич для профессионального тарифа
                          'enterprise': [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3] // 27 фич для энтерпрайз тарифа
                        };
                        
                        // Устанавливаем уровень в зависимости от тарифа и индекса фичи
                        let level = 1;
                        if (featureLevels[plan.id] && featureLevels[plan.id][idx] !== undefined) {
                          level = featureLevels[plan.id][idx];
                        }
                        
                        // Для лучшего визуального отображения используем иконки разного цвета
                        let levelColor = '#e5e7eb'; // Серый по умолчанию
                        if (level >= 1) levelColor = '#34d399'; // Зеленый для уровня 1+
                        if (level >= 2) levelColor = '#fa6151'; // Оранжево-красный для уровня 2+
                        if (level >= 3) levelColor = '#2563eb'; // Синий для уровня 3
                        
                        return (
                          <li key={idx} className="feature-item">
                            <div className="feature-level-indicator">
                              {[...Array(level)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className="feature-dot"
                                  style={{ backgroundColor: levelColor }}
                                />
                              ))}
                            </div>
                            <span className="feature-text">{feature}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  
                  <div className="plan-action">
                    <button 
                      className="select-plan-btn"
                      onClick={() => {
                        if (plan.id === 'enterprise') {
                          handleSelectPlan(plan.name, plan.id, selectedEnterpriseUsers);
                        } else {
                          handleSelectPlan(plan.name, plan.id);
                        }
                      }}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Модальное окно для формы заказа */}
        <ServiceOrderModal
          isOpen={isModalOpen}
          onClose={closeModal}
          serviceType={modalServiceType}
        />
        
      </main>

      <Footer />

      <style jsx global>{`
        .pricing-page {
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
          padding: 0;
        }
        
        @media (max-width: 1024px) {
          .section-container {
            padding: 0;
          }
        }
        
        @media (max-width: 768px) {
          .section-container {
            padding: 0;
          }
        }

        .pricing-header {
          padding: 60px 0;
          text-align: center;
        }

        .pricing-title {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1rem;
          color: var(--black);
        }

        .pricing-subtitle {
          font-size: 1.5rem;
          color: #666;
          margin-bottom: 2rem;
        }

        .billing-toggle {
          display: inline-flex;
          align-items: center;
          background: var(--white);
          border-radius: 8px;
          padding: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .billing-toggle span {
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .billing-toggle span.active {
          background: var(--black);
          color: var(--white);
        }

        .billing-toggle span.divider {
          opacity: 0;
          pointer-events: none;
        }

        .features-section {
          padding: 80px;
          margin-top: 30px;
          background: var(--white);
        }
        
        .features-intro {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .features-title {
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 15px;
          color: var(--black);
        }
        
        .features-subtitle {
          font-size: 1.5rem;
          color: #666;
          max-width: 800px;
          margin: 0 auto 30px;
          line-height: 1.5;
        }
        
        .get-free-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 40px;
          background: #16a34a;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-size: 1.25rem;
          font-weight: 600;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(22, 163, 74, 0.3);
        }
        
        .get-free-btn:hover {
          background: #15803d;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(22, 163, 74, 0.4);
        }
        
        .plans-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          width: 100%;
          margin-top: 40px;
        }
        
        .feature-card {
          background: var(--white);
          border-radius: var(--border-radius);
          padding: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid rgba(19, 19, 19, 0.08);
          text-align: center;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1) rotate(5deg);
        }
        
        .feature-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 15px;
          color: var(--black);
        }
        
        .feature-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.5;
        }
        
        .pricing-plans {
          padding: 60px 0;
        }
        
        @media (max-width: 992px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .features-section {
            padding: 60px 0;
          }
        }
        
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin: 0 auto;
          width: 100%;
          max-width: 1200px;
          box-sizing: border-box;
          justify-items: center;
          justify-content: center;
          grid-auto-rows: minmax(550px, auto);
        }
        
        @media (max-width: 1200px) {
          .plans-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 992px) {
          .plans-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .plans-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .plan-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .plan-top, .plan-features, .plan-action {
          width: 100%;
        }
        
        .plan-card {
          background: var(--white);
          border-radius: var(--border-radius);
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          position: relative;
          transition: all 0.3s ease;
          border: 1px solid rgba(19, 19, 19, 0.08);
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 550px;
        }
        
        .plan-card.free-plan {
          background: #f0fdf4;
          border-color: #a7f3d0;
        }
        
        .plan-card.free-plan .price-free .price-value {
          font-weight: 700;
        }
        
        .plan-top {
          flex: 0 0 auto;
          margin-bottom: 25px;
        }
        
        .plan-features {
          flex: 1;
          margin-bottom: 25px;
          min-height: 150px;
        }
        
        .plan-action {
          flex: 0 0 auto;
          margin-top: auto;
        }
        
        .plan-icon {
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
        
        .plan-name, .plan-description, .price-container, .price-per-user, .enterprise-users-selector {
          align-self: center;
          text-align: center;
        }
        
        .price-container {
          margin: 15px 0;
          min-height: 40px;
        }
        
        .price-per-user, .enterprise-users-selector {
          margin-top: 15px;
        }
        
        .plan-action {
          margin-top: auto;
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

        .price-container {
          margin: 15px 0;
        }
        
        .price-free {
          margin: 15px 0;
        }
        
        .price-free .price-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--black);
        }

        .price-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--black);
        }

        .price-currency {
          font-size: 1.5rem;
          color: var(--black);
        }

        .price-period {
          font-size: 1rem;
          color: #666;
        }

        .price-per-user {
          font-size: 0.9rem;
          color: #666;
        }

        .enterprise-users-selector {
          margin-top: 15px;
        }
        
        .users-dropdown {
          width: 100%;
          padding: 10px;
          border: 1px solid rgba(19, 19, 19, 0.15);
          border-radius: 8px;
          font-size: 1rem;
          background: rgba(248, 248, 248, 0.7);
          color: var(--black);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .users-dropdown:focus {
          outline: none;
          border-color: #fa6151;
          box-shadow: 0 0 0 3px rgba(250, 97, 81, 0.1);
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
          align-items: center;
        }
        
        .feature-item:last-child {
          border-bottom: none;
        }
        
        .feature-level-indicator {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-right: 12px;
          min-width: 30px;
          gap: 2px;
        }
        
        .feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
          margin: 0 1px;
        }
        
        .feature-text {
          flex: 1;
          color: var(--black);
          font-size: 0.9rem;
        }

        .plan-action {
          margin-top: 15px;
          margin-bottom: 20px;
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
          background: #404040ff;
          transform: translateY(-2px);
        }
        
        .plan-card.free-plan .select-plan-btn {
          background: #16a34a;
        }
        
        .plan-card.free-plan .select-plan-btn:hover {
          background: #15803d;
        }
        
        .plan-card.popular .select-plan-btn {
          background: #fa6151;
        }
        
        .plan-card.popular .select-plan-btn:hover {
          background: #e84a3a;
        }

        @media (max-width: 768px) {
          .pricing-title {
            font-size: 2rem;
          }
          
          .pricing-subtitle {
            font-size: 1.2rem;
          }
          
          .plans-grid {
            grid-template-columns: 1fr;
          }
          
          .popular-badge {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            margin: 10px auto;
          }
          
          .feature-dot {
            width: 5px;
            height: 5px;
          }
        }
      `}</style>
    </div>
  );
}

