import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import Icon from './ui/icon';

export const Reviews = () => {
  const reviews = [
    {
      name: 'Алексей Смирнов',
      avatar: 'АС',
      rating: 5,
      text: 'Отличный сервис! Перевел несколько обучающих видео для своих студентов. Качество на высоте, а скорость обработки впечатляет.',
      date: '2 дня назад'
    },
    {
      name: 'Мария Петрова',
      avatar: 'МП',
      rating: 5,
      text: 'Использую для перевода контента для YouTube канала. Очень удобно и недорого. Рекомендую!',
      date: '1 неделю назад'
    },
    {
      name: 'Дмитрий Козлов',
      avatar: 'ДК',
      rating: 4,
      text: 'Хороший сервис за свои деньги. Иногда бывают небольшие неточности в переводе, но в целом всё отлично.',
      date: '3 недели назад'
    },
    {
      name: 'Екатерина Волкова',
      avatar: 'ЕВ',
      rating: 5,
      text: 'Профессионально и быстро! Переводила видео для корпоративного обучения. Клиенты остались довольны.',
      date: '1 месяц назад'
    }
  ];

  return (
    <section id="reviews" className="py-20 px-4 bg-gradient-to-b from-transparent to-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Отзывы клиентов
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Что говорят о нас наши пользователи
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="gradient-purple-magenta text-white font-semibold">
                      {review.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{review.name}</h4>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={16}
                          className={i < review.rating ? 'text-accent fill-accent' : 'text-muted'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-effect">
            <Icon name="Star" className="text-accent fill-accent" size={20} />
            <span className="font-semibold">4.8/5</span>
            <span className="text-muted-foreground">из 247 отзывов</span>
          </div>
        </div>
      </div>
    </section>
  );
};
