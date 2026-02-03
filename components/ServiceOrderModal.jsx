// components/ServiceOrderModal.jsx
'use client';

import { useEffect } from 'react';
import ServiceOrderForm from './ServiceOrderForm';

export default function ServiceOrderModal({ isOpen, onClose, serviceType }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <ServiceOrderForm serviceType={serviceType} onClose={onClose} />
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          backdrop-filter: blur(5px);
        }
        
        .modal-content {
          position: relative;
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          animation: modalAppear 0.3s ease-out;
        }
        
        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .modal-close {
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          z-index: 10001;
          color: #666;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .modal-close:hover {
          color: #000;
          background: #f0f0f0;
          border-radius: 50%;
        }
        
        .modal-body {
          padding: 30px;
        }
        
        .modal-body h2 {
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--black);
        }
      `}</style>
    </div>
  );
}