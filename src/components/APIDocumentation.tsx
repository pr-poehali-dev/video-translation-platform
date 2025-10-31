import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Icon from './ui/icon';

export const APIDocumentation = () => {
  return (
    <section id="api" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-magenta-orange mb-4">
            <Icon name="Code" className="text-white" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            API Документация
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Интегрируйте VideoTranslate в ваши приложения
          </p>
        </div>

        <div className="space-y-6">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="font-montserrat flex items-center gap-2">
                <Icon name="Play" className="text-primary" size={24} />
                Быстрый старт
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Получите API ключ</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Войдите в личный кабинет и перейдите в раздел "Настройки" → "API ключи"
                </p>
                <div className="p-3 bg-muted/50 rounded-lg font-mono text-sm">
                  API_KEY: vtranslate_xxxxxxxxxxxxx
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Базовый запрос</h4>
                <div className="p-4 bg-muted/50 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`POST https://api.videotranslate.ru/v1/translate
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "audio": "base64_encoded_audio",
  "targetLang": "en"
}`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">3. Пример ответа</h4>
                <div className="p-4 bg-muted/50 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`{
  "status": "success",
  "audio": "base64_encoded_translated_audio",
  "transcript": "Original text",
  "translation": "Translated text",
  "duration": 120,
  "cost": 20
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="font-montserrat flex items-center gap-2 text-lg">
                  <Icon name="Zap" className="text-secondary" size={20} />
                  Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold text-primary">POST /v1/translate</div>
                  <p className="text-muted-foreground">Перевод видео/аудио</p>
                </div>
                <div>
                  <div className="font-semibold text-primary">GET /v1/status/:id</div>
                  <p className="text-muted-foreground">Статус обработки</p>
                </div>
                <div>
                  <div className="font-semibold text-primary">GET /v1/balance</div>
                  <p className="text-muted-foreground">Проверка баланса</p>
                </div>
                <div>
                  <div className="font-semibold text-primary">GET /v1/usage</div>
                  <p className="text-muted-foreground">История использования</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="font-montserrat flex items-center gap-2 text-lg">
                  <Icon name="BookOpen" className="text-accent" size={20} />
                  Параметры запроса
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold">audio <span className="text-red-500">*</span></div>
                  <p className="text-muted-foreground">Base64 аудио/видео файл</p>
                </div>
                <div>
                  <div className="font-semibold">targetLang <span className="text-red-500">*</span></div>
                  <p className="text-muted-foreground">Целевой язык (en, ru, es, fr, de, zh, ja, ko)</p>
                </div>
                <div>
                  <div className="font-semibold">outputFormat</div>
                  <p className="text-muted-foreground">Формат вывода (mp4, avi, mov, webm). По умолчанию: mp4</p>
                </div>
                <div>
                  <div className="font-semibold">quality</div>
                  <p className="text-muted-foreground">Качество (hd, fullhd, 4k). Зависит от баланса</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect border-2 border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Icon name="AlertCircle" className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Лимиты и ограничения</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Максимальный размер файла: 500 МБ</li>
                    <li>• Максимальная длина видео: 60 минут</li>
                    <li>• Rate limit: 10 запросов в минуту</li>
                    <li>• API доступен для всех тарифов</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
