import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import Icon from './ui/icon';

export const AdminPanel = () => {
  const stats = [
    { label: 'Всего переводов', value: '1,247', icon: 'Video', gradient: 'gradient-purple-magenta' },
    { label: 'Активных пользователей', value: '324', icon: 'Users', gradient: 'gradient-magenta-orange' },
    { label: 'Доход за месяц', value: '62,350₽', icon: 'Wallet', gradient: 'gradient-purple-orange' },
    { label: 'Среднее время', value: '12 мин', icon: 'Clock', gradient: 'gradient-purple-magenta' },
  ];

  const recentOrders = [
    { id: '#1247', user: 'user@example.com', duration: '8 мин', status: 'completed', price: '50₽' },
    { id: '#1246', user: 'test@mail.ru', duration: '45 мин', status: 'processing', price: '200₽' },
    { id: '#1245', user: 'client@gmail.com', duration: '120 мин', status: 'completed', price: '500₽' },
    { id: '#1244', user: 'demo@yandex.ru', duration: '15 мин', status: 'pending', price: '50₽' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-montserrat mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Админ-панель
          </h1>
          <p className="text-muted-foreground">Управление платформой VideoTranslate</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold font-montserrat">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.gradient} flex items-center justify-center`}>
                    <Icon name={stat.icon as any} className="text-white" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat">Последние заказы</CardTitle>
            <CardDescription>Управление заказами на перевод</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Пользователь</TableHead>
                  <TableHead>Длительность</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Цена</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell>{order.duration}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === 'completed' ? 'default' :
                          order.status === 'processing' ? 'secondary' : 'outline'
                        }
                      >
                        {order.status === 'completed' ? 'Завершён' :
                         order.status === 'processing' ? 'В работе' : 'Ожидание'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{order.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
