import { Button } from './ui/button';
import Icon from './ui/icon';
import { useAuth } from '@/contexts/AuthContext';

export const Hero = () => {
  const { user } = useAuth();

  const scrollToUpload = () => {
    const element = document.getElementById('upload');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold font-montserrat mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
            Переводите видео
            <br />
            легко и быстро
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Профессиональный перевод видео с помощью ИИ. Всего 50₽ за 10 минут перевода
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="gradient-purple-magenta text-white text-lg px-8 py-6 hover:scale-105 transition-transform"
              onClick={scrollToUpload}
            >
              <Icon name="Upload" className="mr-2" />
              Загрузить видео
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-primary hover:bg-primary/10"
              onClick={() => {
                const element = document.getElementById('pricing');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Узнать больше
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl glass-effect hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-xl gradient-purple-magenta flex items-center justify-center mx-auto mb-4">
              <Icon name="Zap" className="text-white" size={24} />
            </div>
            <h3 className="font-montserrat font-semibold text-lg mb-2">Быстро</h3>
            <p className="text-muted-foreground text-sm">Перевод за минуты, а не часы</p>
          </div>

          <div className="p-6 rounded-2xl glass-effect hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-xl gradient-magenta-orange flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" className="text-white" size={24} />
            </div>
            <h3 className="font-montserrat font-semibold text-lg mb-2">Надёжно</h3>
            <p className="text-muted-foreground text-sm">Профессиональное качество перевода</p>
          </div>

          <div className="p-6 rounded-2xl glass-effect hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-xl gradient-purple-orange flex items-center justify-center mx-auto mb-4">
              <Icon name="Wallet" className="text-white" size={24} />
            </div>
            <h3 className="font-montserrat font-semibold text-lg mb-2">Выгодно</h3>
            <p className="text-muted-foreground text-sm">От 50₽ за 10 минут</p>
          </div>
        </div>
      </div>
    </section>
  );
};
