import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Icon from './ui/icon';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const UploadSection = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [sourceLang, setSourceLang] = useState(() => localStorage.getItem('lastSourceLang') || '');
  const [targetLang, setTargetLang] = useState(() => localStorage.getItem('lastTargetLang') || '');
  const [currentVideoBlob, setCurrentVideoBlob] = useState<Blob | null>(null);

  const languages = [
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'Английский' },
    { value: 'es', label: 'Испанский' },
    { value: 'fr', label: 'Французский' },
    { value: 'de', label: 'Немецкий' },
    { value: 'zh', label: 'Китайский' },
    { value: 'ja', label: 'Японский' },
    { value: 'ko', label: 'Корейский' },
  ];

  useEffect(() => {
    if (sourceLang) localStorage.setItem('lastSourceLang', sourceLang);
    if (targetLang) localStorage.setItem('lastTargetLang', targetLang);
  }, [sourceLang, targetLang]);

  const handleFile = async (file: File) => {
    if (!user) {
      toast.error('Пожалуйста, войдите в систему');
      return;
    }

    if (!sourceLang || !targetLang) {
      toast.error('Пожалуйста, выберите языки перевода');
      return;
    }

    if (sourceLang === targetLang) {
      toast.error('Язык оригинала и перевода должны отличаться');
      return;
    }

    setFileName(file.name);
    setUploading(true);
    setProgress(30);

    try {
      const reader = new FileReader();
      
      const audioBase64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setUploading(false);
      setProcessing(true);
      setProgress(0);

      const response = await fetch('https://functions.poehali.dev/41df4859-2e40-4c00-86de-0b76c55720ab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio: audioBase64,
          targetLang: targetLang
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Ошибка обработки');
      }

      const data = await response.json();
      
      const translatedAudioBlob = await fetch(`data:audio/mp3;base64,${data.audio}`).then(r => r.blob());
      setCurrentVideoBlob(translatedAudioBlob);
      
      setProcessing(false);
      setCompleted(true);
      setProgress(100);

      const translation = {
        id: Date.now().toString(),
        fileName: file.name,
        sourceLang: languages.find(l => l.value === sourceLang)?.label || sourceLang,
        targetLang: languages.find(l => l.value === targetLang)?.label || targetLang,
        status: 'completed' as const,
        date: new Date().toLocaleDateString('ru-RU'),
        downloadUrl: 'blob-url'
      };
      
      const existingTranslations = JSON.parse(
        localStorage.getItem(`translations_${user.id}`) || '[]'
      );
      localStorage.setItem(
        `translations_${user.id}`,
        JSON.stringify([translation, ...existingTranslations])
      );
      
      toast.success('Перевод завершён! Файл готов к скачиванию.');
    } catch (error) {
      setUploading(false);
      setProcessing(false);
      toast.error(error instanceof Error ? error.message : 'Ошибка при обработке видео');
      console.error('Translation error:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      handleFile(file);
    } else {
      toast.error('Пожалуйста, загрузите видео файл');
    }
  };

  const handleDownload = () => {
    if (!currentVideoBlob) {
      toast.error('Файл не найден');
      return;
    }
    
    const url = URL.createObjectURL(currentVideoBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `translated_${fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Скачивание начато...');
  };

  const handleReset = () => {
    setCompleted(false);
    setFileName('');
    setProgress(0);
    setCurrentVideoBlob(null);
  };

  return (
    <section id="upload" className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="border-2 border-primary/30 bg-card/50 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="font-montserrat text-3xl mb-2">Загрузить видео</CardTitle>
            <CardDescription className="text-base">
              Поддерживаемые форматы: MP4, AVI, MOV, WebM
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {!uploading && !processing && !completed && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Язык оригинала</label>
                    <Select value={sourceLang} onValueChange={setSourceLang}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите язык" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Перевести на</label>
                    <Select value={targetLang} onValueChange={setTargetLang}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите язык" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <label className="block">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={!user}
                  />
                  <div
                    className={`cursor-pointer p-12 rounded-xl border-2 border-dashed transition-all ${
                      isDragging
                        ? 'border-primary bg-primary/10'
                        : 'border-primary/50 glass-effect hover:border-primary hover:bg-muted/20'
                    } flex flex-col items-center gap-4`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="w-20 h-20 rounded-2xl gradient-purple-magenta flex items-center justify-center">
                      <Icon name="Upload" className="text-white" size={40} />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-lg mb-1">
                        {user ? 'Перетащите файл сюда' : 'Войдите для загрузки'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        или нажмите для выбора файла
                      </p>
                    </div>
                  </div>
                </label>
              </>
            )}

            {uploading && (
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-purple-magenta flex items-center justify-center animate-pulse">
                    <Icon name="Upload" className="text-white" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{fileName}</p>
                    <p className="text-sm text-muted-foreground">Загрузка файла...</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={progress} className="h-3" />
                  <p className="text-center text-sm font-medium">{progress}%</p>
                </div>
              </div>
            )}

            {processing && (
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-magenta-orange flex items-center justify-center animate-pulse">
                    <Icon name="Sparkles" className="text-white" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{fileName}</p>
                    <p className="text-sm text-muted-foreground">
                      Перевод с {languages.find(l => l.value === sourceLang)?.label} на {languages.find(l => l.value === targetLang)?.label}...
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={progress} className="h-3" />
                  <p className="text-center text-sm font-medium">{progress}%</p>
                </div>
              </div>
            )}

            {completed && (
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <Icon name="CheckCircle" className="text-green-500" size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{fileName}</p>
                    <p className="text-sm text-green-500">Готово к скачиванию</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleDownload}
                    className="flex-1 gradient-purple-magenta text-white"
                    size="lg"
                  >
                    <Icon name="Download" className="mr-2" size={18} />
                    Скачать видео
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                  >
                    Загрузить ещё
                  </Button>
                </div>
              </div>
            )}

            {user && !uploading && !processing && !completed && (
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Info" size={16} className="text-primary" />
                  <span className="font-semibold">Как это работает:</span>
                </div>
                <ol className="text-sm text-muted-foreground space-y-1 ml-6 list-decimal">
                  <li>Выберите языки перевода выше</li>
                  <li>Перетащите видео в зону загрузки</li>
                  <li>Дождитесь завершения обработки</li>
                  <li>Скачайте готовое видео</li>
                </ol>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};