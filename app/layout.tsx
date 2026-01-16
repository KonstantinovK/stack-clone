import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode, Suspense } from 'react'
import Script from 'next/script'
import YandexMetrika from '@/components/analytics/YandexMetrika'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'

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

const YM_ID = 106286519
const GA_ID = 'G-3T1PW37FDR'

export default function RootLayout({ children }: RootLayoutProps) {
  // Schema.org микроразметка
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Stackroom",
    "url": "https://stackroom.ru",
    "logo": "https://stackroom.ru/images/logo.png",
    "description": "Мы создаем цифровые решения, которые работают для вашего бизнеса",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "url": "https://stackroom.ru/contact"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Stackroom",
    "url": "https://stackroom.ru",
    "description": "Digital Solutions - Веб-разработка, UI/UX дизайн, IT интеграция, Внедрение CRM"
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Service",
        "position": 1,
        "name": "Веб-разработка",
        "description": "Создаем современные веб-приложения на React, Next.js",
        "provider": {
          "@type": "Organization",
          "name": "Stackroom"
        }
      },
      {
        "@type": "Service",
        "position": 2,
        "name": "UI/UX Дизайн",
        "description": "Проектируем интуитивные интерфейсы",
        "provider": {
          "@type": "Organization",
          "name": "Stackroom"
        }
      },
      {
        "@type": "Service",
        "position": 3,
        "name": "IT интеграция",
        "description": "Установка и настройка оборудования",
        "provider": {
          "@type": "Organization",
          "name": "Stackroom"
        }
      },
      {
        "@type": "Service",
        "position": 4,
        "name": "Внедрение CRM",
        "description": "Настройка CRM под вашу нишу",
        "provider": {
          "@type": "Organization",
          "name": "Stackroom"
        }
      }
    ]
  }

  return (
    <html lang="ru">
      <head>
        {/* Schema.org без Script компонента */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema)
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        
        {/* Yandex Metrika */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106286519', 'ym');

              ym(106286519, 'init', {
                ssr:true,
                webvisor:true,
                clickmap:true,
                ecommerce:"dataLayer",
                accurateTrackBounce:true,
                trackLinks:true
              });
            `,
          }}
        />
        <noscript>
          <div>
            <img 
              src="https://mc.yandex.ru/watch/106286519" 
              style={{ position: 'absolute', left: '-9999px' }} 
              alt="" 
            />
          </div>
        </noscript>
        
        <Suspense fallback={null}>
          <YandexMetrika id={YM_ID} />
        </Suspense>

        {/* Google Analytics */}
        <GoogleAnalytics gaId={GA_ID} />
        
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
