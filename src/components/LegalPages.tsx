import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Icon from './ui/icon';

export const PrivacyPolicy = () => {
  return (
    <section id="privacy" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-purple-magenta mb-4">
            <Icon name="Shield" className="text-white" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
            Политика конфиденциальности
          </h2>
        </div>

        <Card className="glass-effect">
          <CardContent className="pt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. Сбор информации</h3>
              <p className="text-muted-foreground">
                Мы собираем информацию, которую вы предоставляете при регистрации: имя, email, платежную информацию. 
                Также мы автоматически собираем данные об использовании сервиса для улучшения качества работы.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. Использование информации</h3>
              <p className="text-muted-foreground">
                Ваши данные используются для предоставления услуг, обработки платежей, улучшения сервиса 
                и отправки уведомлений о статусе обработки видео.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3. Защита данных</h3>
              <p className="text-muted-foreground">
                Мы используем современные методы шифрования для защиты ваших данных. 
                Все загруженные видео автоматически удаляются с наших серверов через 24 часа после обработки.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">4. Передача третьим лицам</h3>
              <p className="text-muted-foreground">
                Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением случаев, 
                требуемых законодательством или для обработки платежей через защищенные платежные системы.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">5. Cookies</h3>
              <p className="text-muted-foreground">
                Мы используем cookies для улучшения работы сайта и анализа трафика. 
                Вы можете отключить cookies в настройках браузера, но это может повлиять на функциональность сервиса.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">6. Ваши права</h3>
              <p className="text-muted-foreground">
                Вы имеете право запросить доступ к своим данным, исправление, удаление или ограничение обработки. 
                Для этого свяжитесь с нами по email: support@videotranslate.ru
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export const TermsOfService = () => {
  return (
    <section id="terms" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-magenta-orange mb-4">
            <Icon name="FileText" className="text-white" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
            Условия использования
          </h2>
        </div>

        <Card className="glass-effect">
          <CardContent className="pt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. Принятие условий</h3>
              <p className="text-muted-foreground">
                Используя сервис VideoTranslate, вы соглашаетесь с настоящими условиями использования. 
                Если вы не согласны с какими-либо условиями, пожалуйста, не используйте сервис.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. Использование сервиса</h3>
              <p className="text-muted-foreground">
                Вы обязуетесь использовать сервис только в законных целях и не загружать контент, 
                нарушающий авторские права, содержащий вредоносный код или запрещенную информацию.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3. Интеллектуальная собственность</h3>
              <p className="text-muted-foreground">
                Вы сохраняете все права на загруженный контент. Мы получаем лицензию на обработку 
                вашего контента только для предоставления услуг перевода.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">4. Оплата и возврат средств</h3>
              <p className="text-muted-foreground">
                Все платежи обрабатываются через защищенные платежные системы. 
                Возврат средств возможен в течение 14 дней при условии, что услуга не была использована.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">5. Ограничение ответственности</h3>
              <p className="text-muted-foreground">
                Мы не несем ответственности за качество исходного аудио, точность перевода машинного обучения 
                или технические проблемы, возникшие не по нашей вине.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">6. Изменения условий</h3>
              <p className="text-muted-foreground">
                Мы оставляем за собой право изменять условия использования. 
                О существенных изменениях мы уведомим вас по email за 30 дней до вступления в силу.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export const AboutService = () => {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-transparent to-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-purple-orange mb-4">
            <Icon name="Info" className="text-white" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
            О сервисе
          </h2>
        </div>

        <Card className="glass-effect mb-8">
          <CardHeader>
            <CardTitle className="font-montserrat text-2xl">VideoTranslate - автоматический перевод видео</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              VideoTranslate - это современный облачный сервис для автоматического перевода видео на разные языки 
              с использованием передовых технологий искусственного интеллекта.
            </p>
            <p>
              Наш сервис использует нейросети последнего поколения для распознавания речи (Whisper AI), 
              перевода текста (GPT-4) и синтеза естественной речи (TTS), что обеспечивает высокое качество 
              финального результата.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl gradient-purple-magenta flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" className="text-white" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Быстро</h4>
              <p className="text-sm text-muted-foreground">Обработка за 2-5 минут</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl gradient-magenta-orange flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" className="text-white" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Безопасно</h4>
              <p className="text-sm text-muted-foreground">Шифрование данных</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 rounded-xl gradient-purple-orange flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" className="text-white" size={24} />
              </div>
              <h4 className="font-semibold mb-2">Качественно</h4>
              <p className="text-sm text-muted-foreground">До 4K качества</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
