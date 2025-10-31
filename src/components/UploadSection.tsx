import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Icon from './ui/icon';
import { Progress } from './ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const UploadSection = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!user) {
      toast.error('Пожалуйста, войдите в систему');
      return;
    }

    setFileName(file.name);
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            toast.success('Видео успешно загружено и отправлено на перевод!');
            setFileName('');
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <section id="upload" className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-2 border-dashed border-primary/50 hover:border-primary transition-colors">
          <CardHeader className="text-center">
            <CardTitle className="font-montserrat text-3xl mb-2">Загрузить видео</CardTitle>
            <CardDescription className="text-base">
              Поддерживаемые форматы: MP4, AVI, MOV, WebM
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!uploading ? (
              <label className="block">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={!user}
                />
                <div className="cursor-pointer p-12 rounded-xl glass-effect hover:bg-muted/50 transition-colors flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl gradient-purple-magenta flex items-center justify-center">
                    <Icon name="Upload" className="text-white" size={40} />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg mb-1">
                      {user ? 'Нажмите для выбора файла' : 'Войдите для загрузки'}
                    </p>
                    <p className="text-sm text-muted-foreground">или перетащите файл сюда</p>
                  </div>
                </div>
              </label>
            ) : (
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl gradient-purple-magenta flex items-center justify-center animate-pulse">
                    <Icon name="Video" className="text-white" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{fileName}</p>
                    <p className="text-sm text-muted-foreground">Загрузка...</p>
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-center text-sm text-muted-foreground">{progress}%</p>
              </div>
            )}

            {user && !uploading && (
              <div className="mt-6 p-4 rounded-lg bg-muted/50 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Info" size={16} className="text-primary" />
                  <span className="font-semibold">Как это работает:</span>
                </div>
                <ol className="text-sm text-muted-foreground space-y-1 ml-6 list-decimal">
                  <li>Загрузите видео через форму выше</li>
                  <li>Выберите язык перевода</li>
                  <li>Оплатите услугу (50₽ за 10 минут)</li>
                  <li>Получите готовое видео на email</li>
                </ol>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
