import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Menu, 
  Home, 
  ShoppingCart, 
  FileText, 
  Heart, 
  History, 
  User, 
  Settings, 
  LogOut,
  Bell,
  Package,
  Search
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageProvider';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'wouter';
import { useState } from 'react';
import { getTouchFeedbackClasses, getMobileButtonClasses } from '@/lib/mobile-utils';

interface MobileNavigationProps {
  cartItemCount: number;
  notificationCount: number;
  onPriceRequestClick: () => void;
  onTabChange?: (tab: string) => void;
}

export function MobileNavigation({ 
  cartItemCount, 
  notificationCount, 
  onPriceRequestClick,
  onTabChange
}: MobileNavigationProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isArabic = language === 'ar';

  const navigationItems = [
    {
      id: 'home',
      label: isArabic ? 'الرئيسية' : 'Home',
      labelAr: 'الرئيسية',
      labelEn: 'Home',
      icon: Home,
      href: '/',
      badge: null
    },
    {
      id: 'cart',
      label: isArabic ? 'سلة التسوق' : 'Shopping Cart',
      labelAr: 'سلة التسوق',
      labelEn: 'Shopping Cart',
      icon: ShoppingCart,
      href: null,
      badge: cartItemCount > 0 ? cartItemCount : null,
      onClick: () => {
        onTabChange?.('cart');
        setIsOpen(false);
      }
    },
    {
      id: 'templates',
      label: isArabic ? 'القوالب' : 'Templates',
      labelAr: 'القوالب',
      labelEn: 'Templates',
      icon: FileText,
      href: null,
      badge: null,
      onClick: () => {
        onTabChange?.('templates');
        setIsOpen(false);
      }
    },
    {
      id: 'price-requests',
      label: isArabic ? 'طلبات الأسعار' : 'Price Requests',
      labelAr: 'طلبات الأسعار',
      labelEn: 'Price Requests',
      icon: Heart,
      href: null,
      badge: null,
      onClick: () => {
        onPriceRequestClick();
        onTabChange?.('price-requests');
        setIsOpen(false);
      }
    },
    {
      id: 'history',
      label: isArabic ? 'السجل' : 'History',
      labelAr: 'السجل',
      labelEn: 'History',
      icon: History,
      href: null,
      badge: null,
      onClick: () => {
        onTabChange?.('history');
        setIsOpen(false);
      }
    }
  ];

  const adminItems = [
    {
      id: 'admin',
      label: isArabic ? 'الإدارة' : 'Admin',
      labelAr: 'الإدارة',
      labelEn: 'Admin',
      icon: Settings,
      href: '/admin',
      badge: null
    },
    {
      id: 'products',
      label: isArabic ? 'المنتجات' : 'Products',
      labelAr: 'المنتجات',
      labelEn: 'Products',
      icon: Package,
      href: '/admin/products',
      badge: null
    },
    {
      id: 'clients',
      label: isArabic ? 'العملاء' : 'Clients',
      labelAr: 'العملاء',
      labelEn: 'Clients',
      icon: User,
      href: '/admin/clients',
      badge: null
    }
  ];

  const handleItemClick = (item: typeof navigationItems[0]) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 sm:h-10 sm:w-10 text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 md:hidden"
          data-testid="button-mobile-menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side={isArabic ? 'right' : 'left'} 
        className="w-80 sm:w-96 flex flex-col p-0"
      >
        <SheetHeader className="p-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt={isArabic ? 'شعار الشركة' : 'Company Logo'}
              className="h-10 w-10 object-contain dark:filter dark:drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
            />
            <div>
              <SheetTitle className="text-lg font-semibold">
                {isArabic ? 'نظام الطلبات' : 'Ordering System'}
              </SheetTitle>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'مرحباً' : 'Welcome'}, {isArabic ? user?.nameAr : user?.nameEn}
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {/* Main Navigation */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              {isArabic ? 'الملاحة الرئيسية' : 'Main Navigation'}
            </h3>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-12 px-3 text-left min-h-[44px]",
                    getTouchFeedbackClasses()
                  )}
                  onClick={() => handleItemClick(item)}
                  data-testid={`nav-item-${item.id}`}
                >
                  <item.icon className="h-5 w-5 me-3 flex-shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant="default" 
                      className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </nav>
          </div>

          <Separator />

          {/* Admin Navigation */}
          {user?.isAdmin && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                {isArabic ? 'الإدارة' : 'Administration'}
              </h3>
              <nav className="space-y-1">
                {adminItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start h-12 px-3 text-left"
                    asChild
                    onClick={() => setIsOpen(false)}
                    data-testid={`nav-admin-${item.id}`}
                  >
                    <Link href={item.href!}>
                      <item.icon className="h-5 w-5 me-3 flex-shrink-0" />
                      <span className="flex-1 truncate">{item.label}</span>
                    </Link>
                  </Button>
                ))}
              </nav>
            </div>
          )}

          <Separator />

          {/* Notifications */}
          <div className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-start h-12 px-3 text-left"
              data-testid="nav-notifications"
            >
              <Bell className="h-5 w-5 me-3 flex-shrink-0" />
              <span className="flex-1 truncate">
                {isArabic ? 'الإشعارات' : 'Notifications'}
              </span>
              {notificationCount > 0 && (
                <Badge 
                  variant="default" 
                  className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start h-12 px-3 text-left text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => window.location.href = '/api/logout'}
            data-testid="nav-logout"
          >
            <LogOut className="h-5 w-5 me-3 flex-shrink-0" />
            <span className="flex-1 truncate">
              {isArabic ? 'تسجيل الخروج' : 'Logout'}
            </span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}