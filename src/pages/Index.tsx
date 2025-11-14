import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  ageRange: string;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Деревянный конструктор',
    price: 2490,
    category: 'Конструкторы',
    ageRange: '3-6',
    image: 'https://cdn.poehali.dev/projects/edbf0917-99f2-4a8f-a7b0-8a84f0f7340c/files/5650ace0-c223-46b4-b3f8-0aa7bb7f312b.jpg',
    description: 'Развивающий конструктор из натурального дерева'
  },
  {
    id: 2,
    name: 'Мягкая игрушка Мишка',
    price: 1890,
    category: 'Мягкие игрушки',
    ageRange: '0-3',
    image: 'https://cdn.poehali.dev/projects/edbf0917-99f2-4a8f-a7b0-8a84f0f7340c/files/e2916bcd-eabe-4365-8212-80e9bb30b847.jpg',
    description: 'Плюшевый мишка из гипоаллергенных материалов'
  },
  {
    id: 3,
    name: 'Набор для рисования',
    price: 3200,
    category: 'Творчество',
    ageRange: '6-12',
    image: 'https://cdn.poehali.dev/projects/edbf0917-99f2-4a8f-a7b0-8a84f0f7340c/files/c26c2140-eb05-4dee-ac69-790fd821c975.jpg',
    description: 'Профессиональный набор для юных художников'
  },
  {
    id: 4,
    name: 'Интерактивный робот',
    price: 5490,
    category: 'Электронные',
    ageRange: '6-12',
    image: '/placeholder.svg',
    description: 'Программируемый робот с голосовым управлением'
  },
  {
    id: 5,
    name: 'Кукольный домик',
    price: 4200,
    category: 'Ролевые игры',
    ageRange: '3-6',
    image: '/placeholder.svg',
    description: 'Трехэтажный домик с мебелью и аксессуарами'
  },
  {
    id: 6,
    name: 'Развивающие кубики',
    price: 890,
    category: 'Развивающие',
    ageRange: '0-3',
    image: '/placeholder.svg',
    description: 'Мягкие кубики с буквами и цифрами'
  },
  {
    id: 7,
    name: 'Настольная игра "Эрудит"',
    price: 1650,
    category: 'Настольные игры',
    ageRange: '6-12',
    image: '/placeholder.svg',
    description: 'Классическая игра для развития словарного запаса'
  },
  {
    id: 8,
    name: 'Машинка на пульте',
    price: 3890,
    category: 'Транспорт',
    ageRange: '3-6',
    image: '/placeholder.svg',
    description: 'Внедорожник с пультом дистанционного управления'
  }
];

const categories = ['Все', 'Конструкторы', 'Мягкие игрушки', 'Творчество', 'Электронные', 'Ролевые игры', 'Развивающие', 'Настольные игры', 'Транспорт'];
const ageRanges = ['Все возрасты', '0-3', '3-6', '6-12'];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedAge, setSelectedAge] = useState('Все возрасты');
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Все' || product.category === selectedCategory;
    const ageMatch = selectedAge === 'Все возрасты' || product.ageRange === selectedAge;
    return categoryMatch && ageMatch;
  });

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Blocks" className="text-primary" size={32} />
            <h1 className="text-2xl font-heading font-bold text-primary">ToyLand</h1>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="font-heading">Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Корзина пуста</p>
                  </div>
                ) : (
                  <>
                    {cart.map((item, index) => (
                      <Card key={index} className="animate-fade-in">
                        <CardContent className="p-4 flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-primary font-semibold">{item.price} ₽</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(index)}
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="border-t pt-4 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-heading font-semibold">Итого:</span>
                        <span className="text-2xl font-heading font-bold text-primary">{getTotalPrice()} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="bg-gradient-to-r from-accent/30 via-secondary/30 to-primary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-heading font-bold mb-4 animate-fade-in">
            Мир детских игрушек
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Качественные и безопасные игрушки для развития и радости ваших детей
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 space-y-6">
          <div>
            <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
              <Icon name="Filter" size={20} />
              Категория
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all hover:scale-105"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
              <Icon name="Baby" size={20} />
              Возраст
            </h3>
            <div className="flex flex-wrap gap-2">
              {ageRanges.map(age => (
                <Button
                  key={age}
                  variant={selectedAge === age ? 'default' : 'outline'}
                  onClick={() => setSelectedAge(age)}
                  className="transition-all hover:scale-105"
                >
                  {age === 'Все возрасты' ? age : `${age} лет`}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-muted-foreground">
            Найдено товаров: <span className="font-semibold text-foreground">{filteredProducts.length}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative overflow-hidden bg-secondary/20">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                  {product.ageRange} лет
                </Badge>
              </div>
              <CardContent className="p-5">
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
                <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-heading font-bold text-primary">
                    {product.price} ₽
                  </span>
                  <Button 
                    size="sm"
                    onClick={() => addToCart(product)}
                    className="group-hover:scale-105 transition-transform"
                  >
                    <Icon name="Plus" size={16} className="mr-1" />
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-heading text-xl font-semibold mb-2">Товары не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить фильтры</p>
          </div>
        )}
      </div>

      <footer className="bg-muted/50 border-t mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-heading font-semibold mb-3 flex items-center gap-2 justify-center md:justify-start">
                <Icon name="Shield" size={20} />
                Безопасность
              </h4>
              <p className="text-sm text-muted-foreground">
                Все игрушки сертифицированы и безопасны для детей
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3 flex items-center gap-2 justify-center md:justify-start">
                <Icon name="Truck" size={20} />
                Доставка
              </h4>
              <p className="text-sm text-muted-foreground">
                Быстрая доставка по всей России
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3 flex items-center gap-2 justify-center md:justify-start">
                <Icon name="Headphones" size={20} />
                Поддержка
              </h4>
              <p className="text-sm text-muted-foreground">
                Консультация по выбору игрушек 24/7
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;