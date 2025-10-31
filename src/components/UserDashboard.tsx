import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Icon from './ui/icon';
import { useAuth } from '@/contexts/AuthContext';

interface Translation {
  id: string;
  fileName: string;
  sourceLang: string;
  targetLang: string;
  status: 'completed' | 'processing' | 'failed';
  date: string;
  downloadUrl?: string;
}

export const UserDashboard = () => {
  const { user } = useAuth();

  const translations: Translation[] = JSON.parse(
    localStorage.getItem(`translations_${user?.id}`) || '[]'
  );

  const stats = [
    { 
      label: 'Всего переводов', 
      value: translations.length.toString(), 
      icon: 'Video', 
      gradient: 'gradient-purple-magenta' 
    },
    { 
      label: 'Завершено', 
      value: translations.filter(t => t.status === 'completed').length.toString(), 
      icon: 'CheckCircle', 
      gradient: 'gradient-magenta-orange' 
    },
    { 
      label: 'В обработке', 
      value: translations.filter(t => t.status === 'processing').length.toString(), 
      icon: 'Clock', 
      gradient: 'gradient-purple-orange' 
    },
  ];

  const handleDownload = (translation: Translation) => {
    if (!translation.downloadUrl) return;
    
    const link = document.createElement('a');
    link.href = translation.downloadUrl;
    link.download = `translated_${translation.fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-montserrat mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Личный кабинет
          </h1>
          <p className="text-muted-foreground">Добро пожаловать, {user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold font-montserrat">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.gradient} flex items-center justify-center`}>
                    <Icon name={stat.icon as any} className="text-white" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="font-montserrat">История переводов</CardTitle>
            <CardDescription>Все ваши переводы и их статусы</CardDescription>
          </CardHeader>
          <CardContent>
            {translations.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Файл</TableHead>
                    <TableHead>Перевод</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {translations.map((translation) => (
                    <TableRow key={translation.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {translation.fileName}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {translation.sourceLang} → {translation.targetLang}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {translation.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            translation.status === 'completed' ? 'default' :
                            translation.status === 'processing' ? 'secondary' : 'destructive'
                          }
                        >
                          {translation.status === 'completed' ? 'Готово' :
                           translation.status === 'processing' ? 'Обработка' : 'Ошибка'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {translation.status === 'completed' && translation.downloadUrl ? (
                          <Button
                            size="sm"
                            onClick={() => handleDownload(translation)}
                            className="gradient-purple-magenta text-white"
                          >
                            <Icon name="Download" size={16} className="mr-1" />
                            Скачать
                          </Button>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl gradient-purple-magenta flex items-center justify-center mx-auto mb-4 opacity-50">
                  <Icon name="Video" className="text-white" size={32} />
                </div>
                <p className="text-muted-foreground mb-4">У вас пока нет переводов</p>
                <Button
                  onClick={() => {
                    const element = document.getElementById('upload');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="gradient-purple-magenta text-white"
                >
                  Загрузить первое видео
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};