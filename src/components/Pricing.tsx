import { Button } from './ui/button';
import Icon from './ui/icon';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export const Pricing = () => {
  const plans = [
    {
      name: 'Стартовый',
      price: '50₽',
      duration: '10 минут',
      features: [
        'Перевод до 10 минут',
        'HD качество',
        'Базовая поддержка',
        'Email уведомления'
      ],
      gradient: 'gradient-purple-magenta',
      popular: false
    },
    {
      name: 'Популярный',
      price: '200₽',
      duration: '50 минут',
      features: [
        'Перевод до 50 минут',
        'Full HD качество',
        'Приоритетная поддержка',
        'Email + SMS уведомления',
        'Скидка 20%'
      ],
      gradient: 'gradient-magenta-orange',
      popular: true
    },
    {
      name: 'Профессиональный',
      price: '500₽',
      duration: '150 минут',
      features: [
        'Перевод до 150 минут',
        '4K качество',
        'VIP поддержка 24/7',
        'Все виды уведомлений',
        'Скидка 33%',
        'Приоритетная обработка'
      ],
      gradient: 'gradient-purple-orange',
      popular: false
    }
  ];

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
                  <span className="text-4xl font-bold font-montserrat">{plan.price}</span>
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
                <Button className={`w-full ${plan.gradient} text-white`}>
                  Выбрать план
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
