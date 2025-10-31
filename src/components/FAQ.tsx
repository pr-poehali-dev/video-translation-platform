import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Icon from './ui/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export const FAQ = () => {
  const faqs = [
    {
      question: 'Как работает VideoTranslate?',
      answer: 'VideoTranslate использует передовые технологии ИИ для распознавания речи в видео, перевода текста на целевой язык и синтеза новой озвучки с естественным голосом. Процесс полностью автоматизирован и занимает всего несколько минут.'
    },
    {
      question: 'Какие языки поддерживаются?',
      answer: 'Мы поддерживаем перевод между русским, английским, испанским, французским, немецким, китайским, японским и корейским языками. Список поддерживаемых языков постоянно расширяется.'
    },
    {
      question: 'Какие форматы видео можно загружать?',
      answer: 'Поддерживаются все популярные форматы: MP4, AVI, MOV, WebM, MKV. Максимальный размер файла зависит от вашего тарифа.'
    },
    {
      question: 'Сколько времени занимает обработка?',
      answer: 'Обработка видео обычно занимает 2-5 минут в зависимости от длины видео и загруженности сервера. Пользователи премиум-тарифов получают приоритетную обработку.'
    },
    {
      question: 'Как работает система оплаты?',
      answer: 'Вы пополняете баланс на нужную сумму. Качество видео и доступные функции зависят от суммы на балансе: до 199₽ - HD, 200-499₽ - Full HD, от 500₽ - 4K качество.'
    },
    {
      question: 'Можно ли вернуть деньги?',
      answer: 'Да, мы предоставляем возврат средств в течение 14 дней с момента пополнения баланса, если услуга не была использована.'
    },
    {
      question: 'Безопасны ли мои данные?',
      answer: 'Да, мы используем шифрование для защиты ваших данных. Все загруженные видео автоматически удаляются с наших серверов через 24 часа после обработки.'
    },
    {
      question: 'Есть ли API для разработчиков?',
      answer: 'Да, мы предоставляем REST API для интеграции VideoTranslate в ваши приложения. Документация доступна в разделе "API Документация".'
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-purple-magenta mb-4">
            <Icon name="HelpCircle" className="text-white" size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Частые вопросы
          </h2>
          <p className="text-lg text-muted-foreground">
            Ответы на самые популярные вопросы о VideoTranslate
          </p>
        </div>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="font-montserrat text-2xl">FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
