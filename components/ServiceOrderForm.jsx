// components/ServiceOrderForm.jsx
'use client';

import { useState } from 'react';

export default function ServiceOrderForm({ serviceType, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [buttonText, setButtonText] = useState('Отправить заявку');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Сбрасываем текст кнопки при изменении поля
    if (buttonText !== 'Отправить заявку') {
      setButtonText('Отправить заявку');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация
    if (!formData.name.trim()) {
      setButtonText('Введите имя');
      setTimeout(() => setButtonText('Отправить заявку'), 2000);
      return;
    }

    if (!formData.email.trim()) {
      setButtonText('Введите email');
      setTimeout(() => setButtonText('Отправить заявку'), 2000);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setButtonText('Некорректный email');
      setTimeout(() => setButtonText('Отправить заявку'), 2000);
      return;
    }

    if (!formData.message.trim()) {
      setButtonText('Введите сообщение');
      setTimeout(() => setButtonText('Отправить заявку'), 2000);
      return;
    }

    if (formData.message.trim().length < 10) {
      setButtonText('Минимум 10 символов');
      setTimeout(() => setButtonText('Отправить заявку'), 2000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setButtonText('Отправляем...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Запрос на ${serviceType}: ${formData.message}`
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при отправке');
      }

      console.log('✅ Форма отправлена:', data);
      setSubmitStatus('success');
      setButtonText('Отправлено! ✓');

      // Очищаем форму
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      // Закрываем форму через 3 секунды
      setTimeout(() => {
        setButtonText('Отправить заявку');
        setSubmitStatus(null);
        if (onClose) onClose();
      }, 3000);

    } catch (error) {
      console.error('❌ Ошибка:', error);
      setSubmitStatus('error');
      setButtonText('Ошибка отправки');

      // Возвращаем исходный текст через 3 секунды
      setTimeout(() => {
        setButtonText('Отправить заявку');
      }, 3000);

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="service-order-form-container">
      <div className="form-header">
        <h3>Заказать {serviceType}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="service-order-form">
        <div className="form-field-group">
          <label className="form-field-label">Вас зовут</label>
          <div className="form-input-wrapper">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите ваше имя"
              className="form-input"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="form-field-group">
          <label className="form-field-label">Ответим вам на</label>
          <div className="form-input-wrapper">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="form-input"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="form-field-group">
          <label className="form-field-label">Сообщение</label>
          <div className="form-textarea-wrapper">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={`Расскажите о ваших потребностях в ${serviceType.toLowerCase()}...`}
              className="form-textarea"
              rows="4"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <button
          type="submit"
          className={`submit-button ${isSubmitting ? 'submitting' : ''} ${
            buttonText === 'Отправлено! ✓' ? 'success' : 
            buttonText.includes('Ошибка') || buttonText.includes('Введите') || buttonText.includes('Некорректный') || buttonText.includes('Минимум') ? 'error' : ''
          }`}
          disabled={isSubmitting}
        >
          <div className="submit-button-content">
            <span className="submit-button-text">{buttonText}</span>
          </div>
        </button>
      </form>

      <style jsx>{`
        .service-order-form-container {
          width: 100%;
        }
        
        .form-header {
          margin-bottom: 20px;
        }
        
        .form-header h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--black);
          margin: 0;
        }
        
        .service-order-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .form-field-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-field-label {
          margin-bottom: 8px;
          font-weight: 500;
          color: var(--black);
          font-size: 0.9rem;
        }
        
        .form-input-wrapper, .form-textarea-wrapper {
          position: relative;
        }
        
        .form-input, .form-textarea {
          width: 100%;
          padding: 14px;
          border: 1px solid rgba(19, 19, 19, 0.15);
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s ease;
          background: rgba(248, 248, 248, 0.7);
        }
        
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #fa6151;
          box-shadow: 0 0 0 3px rgba(250, 97, 81, 0.1);
        }
        
        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        .submit-button {
          background: var(--black);
          color: var(--white);
          border: none;
          border-radius: 8px;
          padding: 16px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 10px;
        }
        
        .submit-button:hover:not(:disabled) {
          background: #333;
          transform: translateY(-2px);
        }
        
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .submit-button.success {
          background: #34d399;
        }
        
        .submit-button.error {
          background: #ef4444;
        }
      `}</style>
    </div>
  );
}