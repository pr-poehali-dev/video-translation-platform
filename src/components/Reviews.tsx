import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import Icon from './ui/icon';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Review {
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export const Reviews = () => {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const defaultReviews: Review[] = [
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

  const [reviews, setReviews] = useState<Review[]>(defaultReviews);

  useEffect(() => {
    const savedReviews = localStorage.getItem('user_reviews');
    if (savedReviews) {
      setReviews([...JSON.parse(savedReviews), ...defaultReviews]);
    }
  }, []);

  const handleSubmitReview = async () => {
    if (!user) {
      toast.error('Войдите для оставления отзыва');
      return;
    }
    if (!reviewText.trim()) {
      toast.error('Напишите текст отзыва');
      return;
    }

    try {
      await fetch('https://functions.poehali.dev/c64f525a-c92b-407a-9686-addc0dd48e46', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          rating,
          comment: reviewText
        })
      });

      const newReview: Review = {
        name: user.name,
        avatar: user.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        rating,
        text: reviewText,
        date: 'Сейчас'
      };

      const savedReviews = localStorage.getItem('user_reviews');
      const userReviews = savedReviews ? JSON.parse(savedReviews) : [];
      userReviews.unshift(newReview);
      localStorage.setItem('user_reviews', JSON.stringify(userReviews));

      setReviews([newReview, ...reviews]);
      setDialogOpen(false);
      setReviewText('');
      setRating(5);
      toast.success('Спасибо за ваш отзыв! Он будет опубликован после модерации.');
    } catch (error) {
      toast.error('Не удалось отправить отзыв');
    }
  };

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

        <div className="text-center mt-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-effect">
            <Icon name="Star" className="text-accent fill-accent" size={20} />
            <span className="font-semibold">4.8/5</span>
            <span className="text-muted-foreground">из {reviews.length} отзывов</span>
          </div>
          <Button 
            onClick={() => setDialogOpen(true)}
            className="gradient-purple-magenta text-white"
            size="lg"
          >
            <Icon name="MessageSquare" className="mr-2" size={18} />
            Оставить отзыв
          </Button>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-montserrat text-2xl">Оставить отзыв</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Ваша оценка</label>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setRating(i + 1)}
                      className="transition-transform hover:scale-110"
                    >
                      <Icon
                        name="Star"
                        size={32}
                        className={i < rating ? 'text-accent fill-accent' : 'text-muted'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Ваш отзыв</label>
                <Textarea
                  placeholder="Расскажите о вашем опыте использования VideoTranslate..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={5}
                  className="resize-none"
                />
              </div>
              <Button 
                onClick={handleSubmitReview}
                className="w-full gradient-purple-magenta text-white"
              >
                Отправить отзыв
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};