import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px',
      background: '#000',
      color: '#fff'
    }}>
      <h1 style={{ fontSize: '120px', margin: '0' }}>404</h1>
      <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Страница не найдена</h2>
      <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.8 }}>
        К сожалению, запрашиваемая страница не существует
      </p>
      <Link 
        href="/" 
        style={{
          display: 'inline-block',
          padding: '12px 30px',
          background: '#fff',
          color: '#000',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'opacity 0.2s'
        }}
      >
        Вернуться на главную
      </Link>
    </div>
  )
}
