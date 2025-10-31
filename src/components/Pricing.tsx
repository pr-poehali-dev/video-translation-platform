import { Button } from './ui/button';
import Icon from './ui/icon';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const Pricing = () => {
  const { addBalance, balance } = useSubscription();
  const { user } = useAuth();
  const plans = [
    {
      name: 'Стартовый',
      price: 199,
      priceText: '199₽',
      features: [
        'HD качество (720p)',
        'Email уведомления',
        'Базовая поддержка',
        'Все форматы видео'
      ],
      gradient: 'gradient-purple-magenta',
      popular: false
    },
    {
      name: 'Популярный',
      price: 499,
      priceText: '499₽',
      features: [
        'Full HD качество (1080p)',
        'Email + SMS уведомления',
        'Приоритетная поддержка',
        'Все форматы видео',
        'Быстрая обработка'
      ],
      gradient: 'gradient-magenta-orange',
      popular: true
    },
    {
      name: 'Профессиональный',
      price: 999,
      priceText: '999₽',
      features: [
        '4K качество (2160p)',
        'Все виды уведомлений',
        'VIP поддержка 24/7',
        'Все форматы видео',
        'Максимальная скорость',
        'Приоритетная обработка'
      ],
      gradient: 'gradient-purple-orange',
      popular: false
    }
  ];

  const handlePurchase = (amount: number, planName: string) => {
    if (!user) {
      toast.error('Войдите в систему для пополнения баланса');
      return;
    }
    addBalance(amount);
    toast.success(`Баланс пополнен на ${amount}₽! План "${planName}" активирован.`);
  };

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Тарифы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите подходящий план для ваших задач
          </p>
          {user && (
            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full glass-effect border border-primary/30">
              <Icon name="Wallet" size={20} className="text-primary" />
              <span className="font-semibold">Ваш баланс:</span>
              <span className="text-2xl font-bold text-primary">{balance}₽</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative hover:scale-105 transition-transform ${plan.popular ? 'border-2 border-secondary shadow-2xl' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full gradient-magenta-orange text-white text-sm font-semibold">
                    Популярный
                  </span>
                </div>
              )}
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${plan.gradient} flex items-center justify-center mb-4`}>
                  <Icon name="Video" className="text-white" size={24} />
                </div>
                <CardTitle className="font-montserrat text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold font-montserrat">{plan.priceText}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Icon name="CheckCircle2" className="text-primary shrink-0 mt-0.5" size={18} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handlePurchase(plan.price, plan.name)}
                  className={`w-full ${plan.gradient} text-white`}
                  disabled={!user}
                >
                  {user ? 'Пополнить баланс' : 'Войдите для покупки'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};