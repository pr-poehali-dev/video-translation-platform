import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import Icon from './ui/icon';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
}

export const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! Чем могу помочь?',
      sender: 'support',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    setTimeout(() => {
      const supportReply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Спасибо за ваше сообщение! Наш специалист ответит вам в ближайшее время.',
        sender: 'support',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, supportReply]);
    }, 1000);
  };

  const scrollToChat = () => {
    setIsOpen(true);
  };

  return (
    <>
      <section id="support" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Поддержка
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Мы всегда готовы помочь вам с любыми вопросами
          </p>
          <Button 
            onClick={scrollToChat}
            size="lg"
            className="gradient-purple-magenta text-white"
          >
            <Icon name="MessageCircle" className="mr-2" />
            Открыть чат
          </Button>
        </div>
      </section>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] animate-slide-in-right">
          <Card className="shadow-2xl border-2 border-primary/20">
            <CardHeader className="gradient-purple-magenta text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon name="Headphones" size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Поддержка</CardTitle>
                    <p className="text-xs text-white/80">Онлайн</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.sender === 'user'
                            ? 'gradient-purple-magenta text-white'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            
            <CardFooter className="border-t p-4">
              <div className="flex gap-2 w-full">
                <Input
                  placeholder="Напишите сообщение..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} className="gradient-purple-magenta text-white">
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};
