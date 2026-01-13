/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // ВАЖНО: Заставляем отслеживать ВСЕ файлы проекта
      config.watchOptions = {
        poll: 500,  // Проверять изменения каждые 500ms
        aggregateTimeout: 100,
        ignored: [
          '**/.git/**',
          '**/.next/**',
          '**/node_modules/**',
          '!**/node_modules/your-package-name/**'  // Если нужно
        ]
      }
      
      // Отключаем кэширование для dev
      config.cache = false
    }
    
    // Добавляем поддержку SVG если нужно
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    
    return config
  }
}

export default nextConfig
