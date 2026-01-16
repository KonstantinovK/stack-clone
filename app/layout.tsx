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
const GA_ID = 'G-26653MGSH4' // Замените на ваш Google Analytics ID когда получите

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
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
          <YandexMetrika id={106286519} />
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
