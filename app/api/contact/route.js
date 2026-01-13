// app/api/contact/route.js
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  console.log('📧 Контактная форма: начата обработка')
  
  try {
    const { name, email, message } = await request.json()
    
    // Валидация
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      )
    }
    
    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Введите корректный email адрес' },
        { status: 400 }
      )
    }
    
    // Проверка минимальной длины сообщения
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Сообщение должно содержать минимум 10 символов' },
        { status: 400 }
      )
    }
    
    console.log('📝 Получены данные:')
    console.log('- Имя:', name)
    console.log('- Email:', email)
    console.log('- Сообщение длина:', message.length, 'символов')
    
    // Проверка переменных окружения
    console.log('🔧 Проверка конфигурации Timeweb SMTP:')
    console.log('- EMAIL_HOST:', process.env.EMAIL_HOST || 'Не установлен')
    console.log('- EMAIL_USER:', process.env.EMAIL_USER ? '✅ Установлен' : '❌ Не установлен')
    
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
      console.error('❌ SMTP не настроен в .env.local')
      return NextResponse.json(
        { error: 'Сервис отправки писем временно недоступен' },
        { status: 500 }
      )
    }
    
    // Создаем транспорт для Timeweb
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // smtp.timeweb.ru
      port: parseInt(process.env.EMAIL_PORT) || 465,
      secure: true, // true для порта 465
      auth: {
        user: process.env.EMAIL_USER, // hello@stackroom.ru
        pass: process.env.EMAIL_PASSWORD, // ваш пароль
      },
    })
    
    // Проверяем подключение к SMTP
    try {
      await transporter.verify()
      console.log('✅ Подключение к SMTP серверу успешно')
    } catch (verifyError) {
      console.error('❌ Ошибка подключения к SMTP:', verifyError)
      return NextResponse.json(
        { 
          error: 'Ошибка подключения к почтовому серверу',
          details: process.env.NODE_ENV === 'development' ? verifyError.message : undefined
        },
        { status: 500 }
      )
    }
    
    // Настройки письма
    const mailOptions = {
      from: `"Stackroom Contact Form" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'konstantinov87@mail.ru',
      replyTo: email, // Чтобы можно было ответить отправителю
      subject: `Новое сообщение с сайта Stackroom от ${name}`,
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Новое сообщение с сайта Stackroom</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            background: linear-gradient(135deg, #131313 0%, #333 100%);
            color: white;
            padding: 30px;
            border-radius: 12px 12px 0 0;
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 14px;
        }
        .card {
            background: white;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 20px;
            border: 1px solid #eaeaea;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .sender-info {
            border-left: 4px solid #fa6151;
        }
        .message-content {
            border-left: 4px solid #131313;
        }
        .label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #666;
            margin-bottom: 8px;
            font-weight: 600;
        }
        .value {
            font-size: 16px;
            margin-bottom: 15px;
        }
        .message-text {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            white-space: pre-wrap;
            font-size: 15px;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 13px;
            border-top: 1px solid #eee;
            margin-top: 30px;
        }
        .reply-button {
            display: inline-block;
            background: #fa6151;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            margin-top: 10px;
        }
        .star {
            color: #fa6151;
            font-size: 20px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="star">✦</div>
        <h1>Новое сообщение с сайта</h1>
        <p>Stackroom — контактная форма</p>
    </div>
    
    <div class="card sender-info">
        <div class="label">Отправитель</div>
        <div class="value">
            <strong>👤 Имя:</strong> ${name}<br>
            <strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a><br>
            <strong>🕐 Дата:</strong> ${new Date().toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}
        </div>
    </div>
    
    <div class="card message-content">
        <div class="label">Сообщение</div>
        <div class="message-text">${message}</div>
    </div>
    
    <div class="footer">
        <p>📧 Это письмо отправлено автоматически с контактной формы <a href="https://stackroom.ru" style="color: #131313; font-weight: 600;">stackroom.ru</a></p>
        <p>
            <a href="mailto:${email}" class="reply-button">Ответить отправителю</a>
        </p>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">
            Если вы получили это письмо по ошибке, пожалуйста, проигнорируйте его.
        </p>
    </div>
</body>
</html>
      `,
      text: `
НОВОЕ СООБЩЕНИЕ С САЙТА STACKROOM
=================================

Отправитель:
👤 Имя: ${name}
📧 Email: ${email}
🕐 Дата: ${new Date().toLocaleString('ru-RU')}

Сообщение:
${message}

=================================
Это письмо отправлено автоматически с контактной формы stackroom.ru
Для ответа используйте адрес: ${email}
      `,
    }
    
    console.log('📤 Отправка письма...')
    
    // Отправляем письмо
    const info = await transporter.sendMail(mailOptions)
    
    console.log('✅ Письмо успешно отправлено!')
    console.log('- Message ID:', info.messageId)
    console.log('- Ответный адрес:', email)
    
    return NextResponse.json({
      success: true,
      message: 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Критическая ошибка при отправке:', error)
    
    // Детальный лог ошибки для отладки
    if (error.code) {
      console.error('- Код ошибки:', error.code)
    }
    if (error.command) {
      console.error('- Команда:', error.command)
    }
    
    return NextResponse.json(
      { 
        error: 'Произошла ошибка при отправке сообщения',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

// Для тестирования - GET запрос (проверка конфигурации)
export async function GET() {
  const config = {
    status: 'API контактной формы работает',
    endpoint: '/api/contact',
    method: 'POST',
    requiredFields: ['name', 'email', 'message'],
    smtpConfigured: !!(process.env.EMAIL_HOST && process.env.EMAIL_USER),
    smtpHost: process.env.EMAIL_HOST || 'Не настроен',
    smtpUser: process.env.EMAIL_USER ? 'Настроен' : 'Не настроен',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  }
  
  console.log('🔧 Конфигурация API:', config)
  
  return NextResponse.json(config)
}
