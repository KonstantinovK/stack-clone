import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import Script from 'next/script'


const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})


export const metadata = {
  title: 'Stackroom - Digital Solutions',
  description: 'Мы создаем цифровые решения, которые работают для вашего бизнеса',
}


interface RootLayoutProps {
  children: ReactNode
}


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        
        {/* Bitrix24 Widget */}
        <Script
          id="bitrix24-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,u){
                var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);
                var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
              })(window,document,'https://cdn-ru.bitrix24.ru/b35982374/crm/site_button/loader_2_w5jpy6.js');
            `,
          }}
        />
      </body>
    </html>
  )
}

