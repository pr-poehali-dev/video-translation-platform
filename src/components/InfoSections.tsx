import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import Icon from './ui/icon';

export const InfoSections = () => {
  const faqItems = [
    {
      question: 'Какие форматы видео поддерживаются?',
      answer: 'Мы поддерживаем все популярные форматы: MP4, AVI, MOV, WebM, MKV, FLV и другие.'
    },
    {
      question: 'Сколько времени занимает перевод?',
      answer: 'Обычно обработка занимает 2-5 минут в зависимости от длительности видео и загрузки сервера.'
    },
    {
      question: 'Можно ли отредактировать перевод?',
      answer: 'Да, вы можете скачать файл субтитров отдельно и отредактировать их вручную перед финальной обработкой.'
    },
    {
      question: 'Какие языки доступны для перевода?',
      answer: 'Доступны: русский, английский, испанский, французский, немецкий, китайский, японский и корейский языки.'
    },
    {
      question: 'Безопасны ли мои данные?',
      answer: 'Да, все файлы шифруются и удаляются с серверов после обработки. Мы не храним ваши видео.'
    }
  ];

  return (
    <div className="space-y-20">
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-8 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            О сервисе
          </h2>
          <Card>
            <CardContent className="pt-6 space-y-4 text-muted-foreground">
              <p>
                VideoTranslate — это современная платформа для автоматического перевода видео с использованием технологий искусственного интеллекта. Мы помогаем создателям контента, преподавателям и компаниям делать свои видео доступными для аудитории по всему миру.
              </p>
              <p>
                Наш сервис использует передовые модели машинного обучения от OpenAI, включая Whisper для распознавания речи, GPT для точного перевода и TTS для создания естественной озвучки на целевом языке.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-purple-magenta flex items-center justify-center">
                    <Icon name="Zap" className="text-white" size={32} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Быстро</h3>
                  <p className="text-sm">Обработка за считанные минуты</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-magenta-orange flex items-center justify-center">
                    <Icon name="Shield" className="text-white" size={32} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Надёжно</h3>
                  <p className="text-sm">Шифрование и защита данных</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-purple-orange flex items-center justify-center">
                    <Icon name="Sparkles" className="text-white" size={32} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Качественно</h3>
                  <p className="text-sm">Естественная озвучка и перевод</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 bg-gradient-to-b from-transparent to-muted/30">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-8 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Частые вопросы
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="api" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-8 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            API Документация
          </h2>
          <Card>
            <CardHeader>
              <CardTitle className="font-montserrat">REST API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Интегрируйте VideoTranslate в свои приложения с помощью нашего простого REST API.
              </p>
              <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <code>
                  POST https://api.videotranslate.ru/v1/translate<br/>
                  Content-Type: application/json<br/>
                  Authorization: Bearer YOUR_API_KEY<br/><br/>
                  &#123;<br/>
                  &nbsp;&nbsp;"audio": "base64_encoded_audio",<br/>
                  &nbsp;&nbsp;"targetLang": "en"<br/>
                  &#125;
                </code>
              </div>
              <p className="text-sm text-muted-foreground">
                Свяжитесь с нами для получения API ключа и полной документации.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="privacy" className="py-20 px-4 bg-gradient-to-b from-transparent to-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-8 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Политика конфиденциальности
          </h2>
          <Card>
            <CardContent className="pt-6 space-y-4 text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">Сбор данных</h3>
              <p>
                Мы собираем только необходимую информацию: email, имя и загруженные файлы для обработки. Файлы автоматически удаляются после завершения перевода.
              </p>
              <h3 className="text-lg font-semibold text-foreground">Использование данных</h3>
              <p>
                Ваши данные используются исключительно для предоставления сервиса перевода. Мы не продаём и не передаём информацию третьим лицам.
              </p>
              <h3 className="text-lg font-semibold text-foreground">Безопасность</h3>
              <p>
                Все данные передаются по защищённому HTTPS протоколу и шифруются при хранении. Доступ к данным имеют только авторизованные сотрудники.
              </p>
              <h3 className="text-lg font-semibold text-foreground">Cookies</h3>
              <p>
                Мы используем cookies для улучшения работы сервиса и аналитики. Вы можете отключить cookies в настройках браузера.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="terms" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-8 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Условия использования
          </h2>
          <Card>
            <CardContent className="pt-6 space-y-4 text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">Использование сервиса</h3>
              <p>
                Используя VideoTranslate, вы соглашаетесь не загружать контент, нарушающий авторские права, содержащий запрещённую информацию или противоречащий законодательству РФ.
              </p>
              <h3 className="text-lg font-semibold text-foreground">Оплата и возврат</h3>
              <p>
                Все платежи обрабатываются безопасно. Возврат средств возможен в течение 14 дней при технических проблемах с сервисом.
              </p>
              <h3 className="text-lg font-semibold text-foreground">Ответственность</h3>
              <p>
                Мы не несём ответственности за качество исходного контента и точность автоматического перевода. Рекомендуем проверять результат перед публикацией.
              </p>
              <h3 className="text-lg font-semibold text-foreground">Изменение условий</h3>
              <p>
                Мы оставляем за собой право изменять условия использования. Актуальная версия всегда доступна на этой странице.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
