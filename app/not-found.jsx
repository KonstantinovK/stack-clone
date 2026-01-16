import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Страница не найдена</h2>
          <p className="text-gray-600 mb-8">
            К сожалению, запрашиваемая страница не существует
          </p>
          <Link 
            href="/" 
            className="inline-block px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Вернуться на главную
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
