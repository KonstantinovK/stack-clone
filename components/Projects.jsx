// components/Projects.jsx
'use client'

export default function Projects() {
  const projects = [
    { id: 1, title: 'Интеграция CRM', category: 'Интеграция' },
    { id: 2, title: 'Baishan Cloud ', category: 'Интеграция' },
    { id: 3, title: 'Alicloud узел в Москве', category: 'Интеграция' },
    { id: 4, title: 'Интеграция CRM', category: 'Интеграция' },
    { id: 5, title: 'Сайт для Турагенства', category: 'Web Development' },
    { id: 6, title: 'MVP мобильного приложения', category: 'Mobile App' },
    { id: 7, title: 'Аналитический портал', category: 'UI/UX Design' },
    { id: 8, title: 'Service Desk система', category: 'Web Development' },
  ]

  return (
      <section className="section section_projects">
        {/* Заголовок */}
        <div className="panel">
          <div className="panel_content">
            <div className="badge"
              style={{ 
                justifyContent: 'flex-end',
                marginLeft: 'auto',
                marginRight: '50',
                width: 'fit-content',
                paddingRight: '1230px'
              }}
            >
              <div className="badge_icon">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M30 20C35.523 20 40 15.523 40 9.99999C40 4.47698 35.523 0 30 0C24.477 0 20 4.47698 20 9.99999C20 4.47698 15.523 0 10 0C4.477 0 0 4.47698 0 9.99999C0 15.523 4.477 20 10 20C4.477 20 0 24.477 0 30C0 35.523 4.477 40 10 40C15.523 40 20 35.523 20 30C20 35.523 24.477 40 30 40C35.523 40 40 35.523 40 30C40 24.477 35.523 20 30 20Z"/>
                </svg>
              </div>
              <h2 className="badge_text">Наши проекты</h2>
            </div>
            <p className="body-x-large"></p>
          </div>
        </div>
        
        {/* Сетка проектов */}
        <div className="services-grid-container">
          <div className="projects_grid">
            {projects.map((project) => (
              <div key={project.id} className="project_card">
                <a href="#" className="project_link">
                  <div className="project_image">
                    <div className="project_placeholder">
                      <span className="project_number">{project.id.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="project_overlay">
                      <div className="project_info">
                        <h3 className="project_title">{project.title}</h3>
                        <p className="project_category">{project.category}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          /* СЕТКА 4x2 */
          .projects_grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            width: 100%;
          }
          
          /* КАРТОЧКА ПРОЕКТА */
          .project_card {
            border-radius: var(--border-radius);
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            height: 280px;
            width: 100%;
            background: var(--white);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(19, 19, 19, 0.08);
          }
          
          .project_card:hover {
            transform: translateY(-8px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border-color: var(--black);
          }
          
          .project_link {
            display: block;
            height: 100%;
            text-decoration: none;
            color: inherit;
          }
          
          .project_image {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: var(--border-radius);
            overflow: hidden;
          }
          
          .project_placeholder {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          
          .project_number {
            font-size: 48px;
            font-weight: 800;
            color: rgba(0, 0, 0, 0.08);
            line-height: 1;
          }
          
          .project_overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(0, 0, 0, 0.4) 70%,
              rgba(0, 0, 0, 0.7) 100%
            );
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            align-items: flex-end;
            padding: 20px;
          }
          
          .project_card:hover .project_overlay {
            opacity: 1;
          }
          
          .project_info {
            transform: translateY(20px);
            transition: transform 0.3s ease;
          }
          
          .project_card:hover .project_info {
            transform: translateY(0);
          }
          
          .project_title {
            font-size: 18px;
            font-weight: 600;
            color: var(--white);
            margin-bottom: 5px;
            line-height: 1.3;
          }
          
          .project_category {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            font-weight: 400;
          }
          
          /* АДАПТИВНОСТЬ */
          @media (max-width: 1200px) {
            .projects_grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 25px;
            }
          }
          
          @media (max-width: 1024px) {
            .projects_grid {
              gap: 20px;
            }
            
            .project_card {
              height: 250px;
            }
          }
          
          @media (max-width: 768px) {
            .projects_grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
            }
            
            .project_card {
              height: 220px;
            }
          }
          
          @media (max-width: 480px) {
            .projects_grid {
              grid-template-columns: 1fr;
              gap: 15px;
            }
            
            .project_card {
              height: 200px;
            }
          }
        `}</style>
      </section>
  )
}
