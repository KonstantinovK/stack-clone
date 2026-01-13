/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Это заставит Next.js лучше отслеживать файлы
    serverComponentsExternalPackages: [],
  },
  
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Ключевая настройка: polling mode
      config.watchOptions = {
        poll: 1000,  // Проверять изменения каждую секунду
        aggregateTimeout: 300,
        ignored: [
          '**/.git/**',
          '**/.next/**',
          '**/node_modules/**',
          // Явно НЕ игнорируем папку components
          '!**/components/**',
          '!**/utils/**'
        ]
      }
      
      // Отключаем кэширование
      config.cache = false
      
      // Увеличиваем лимиты наблюдаемых файлов
      config.infrastructureLogging = {
        level: 'verbose'
      }
    }
    
    // Поддержка SVG если нужно
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    
    return config
  }
}

module.exports = nextConfig
