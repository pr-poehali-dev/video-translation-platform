import { useState } from 'react';
import { Button } from './ui/button';
import Icon from './ui/icon';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

export const Header = () => {
  const { user, login, register, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginEmail, loginPassword);
    if (success) {
      toast.success('Вы успешно вошли!');
      setAuthOpen(false);
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(regEmail, regPassword, regName);
    if (success) {
      toast.success('Регистрация успешна!');
      setAuthOpen(false);
      setRegEmail('');
      setRegPassword('');
      setRegName('');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-effect">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-purple-magenta flex items-center justify-center">
            <Icon name="Video" className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold font-montserrat bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            VideoTranslate
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {user && !user.isAdmin && (
            <button onClick={() => scrollToSection('dashboard')} className="text-foreground/70 hover:text-foreground transition-colors">
              Мои переводы
            </button>
          )}
          <button onClick={() => scrollToSection('pricing')} className="text-foreground/70 hover:text-foreground transition-colors">
            Цены
          </button>
          <button onClick={() => scrollToSection('reviews')} className="text-foreground/70 hover:text-foreground transition-colors">
            Отзывы
          </button>
          <button onClick={() => scrollToSection('support')} className="text-foreground/70 hover:text-foreground transition-colors">
            Поддержка
          </button>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden md:inline text-sm text-foreground/70">
                {user.name}
              </span>
              <Button onClick={logout} variant="outline">
                Выйти
              </Button>
            </>
          ) : (
            <Button onClick={() => setAuthOpen(true)} className="gradient-purple-magenta text-white">
              Войти
            </Button>
          )}
        </div>
      </div>

      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-montserrat text-2xl">Добро пожаловать</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Пароль</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gradient-purple-magenta text-white">
                  Войти
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Имя</Label>
                  <Input
                    id="reg-name"
                    placeholder="Ваше имя"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="your@email.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Пароль</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gradient-purple-magenta text-white">
                  Зарегистрироваться
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </header>
  );
};