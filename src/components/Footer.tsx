import Icon from './ui/icon';

export const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-purple-magenta flex items-center justify-center">
                <Icon name="Video" className="text-white" size={18} />
              </div>
              <h3 className="font-bold font-montserrat text-lg">VideoTranslate</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Профессиональный перевод видео с помощью ИИ
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Продукт</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Тарифы</a></li>
              <li><a href="#about" className="hover:text-foreground transition-colors">О сервисе</a></li>
              <li><a href="#api" className="hover:text-foreground transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#support" className="hover:text-foreground transition-colors">Связаться с нами</a></li>
              <li><a href="#faq" className="hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#docs" className="hover:text-foreground transition-colors">Документация</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Правовая информация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#privacy" className="hover:text-foreground transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#terms" className="hover:text-foreground transition-colors">Условия использования</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 VideoTranslate. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};