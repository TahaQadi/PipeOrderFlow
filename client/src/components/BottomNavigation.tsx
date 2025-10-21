import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  ShoppingCart, 
  FileText, 
  Heart, 
  User,
  Package
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageProvider';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { getTouchFeedbackClasses } from '@/lib/mobile-utils';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartItemCount: number;
  notificationCount: number;
  onPriceRequestClick: () => void;
  onCartOpen?: () => void;
}

export function BottomNavigation({ 
  activeTab, 
  onTabChange, 
  cartItemCount, 
  notificationCount,
  onPriceRequestClick,
  onCartOpen
}: BottomNavigationProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { user } = useAuth();

  const isArabic = language === 'ar';

  const navigationItems = [
    {
      id: 'lta-products',
      label: isArabic ? 'اتفاقياتي' : 'My LTAs',
      labelAr: 'اتفاقياتي',
      labelEn: 'My LTAs',
      icon: Package,
      href: null,
      badge: null
    },
    {
      id: 'all-products',
      label: isArabic ? 'الكل' : 'All',
      labelAr: 'الكل',
      labelEn: 'All',
      icon: Home,
      href: null,
      badge: null
    },
    {
      id: 'cart',
      label: isArabic ? 'السلة' : 'Cart',
      labelAr: 'السلة',
      labelEn: 'Cart',
      icon: ShoppingCart,
      href: null,
      badge: cartItemCount > 0 ? cartItemCount : null,
      onClick: () => {
        // This will be handled by parent component
      }
    },
    {
      id: 'templates',
      label: isArabic ? 'قوالب' : 'Templates',
      labelAr: 'قوالب',
      labelEn: 'Templates',
      icon: FileText,
      href: null,
      badge: null
    },
    {
      id: 'profile',
      label: isArabic ? 'الملف' : 'Profile',
      labelAr: 'الملف',
      labelEn: 'Profile',
      icon: User,
      href: '/profile',
      badge: notificationCount > 0 ? notificationCount : null
    }
  ];

  const handleItemClick = (item: typeof navigationItems[0]) => {
    if (item.href) {
      // External link - handled by Link component
      return;
    }
    
    if (item.id === 'cart') {
      // Handle cart opening
      onCartOpen?.();
    } else if (item.id === 'profile') {
      // Profile is handled by Link
      return;
    } else {
      // Tab switching
      onTabChange(item.id);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border/50 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navigationItems.map((item) => {
          const isActive = activeTab === item.id;
          
          if (item.href) {
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={cn(
                  "flex flex-col items-center justify-center h-full px-2 py-1 rounded-none min-h-[44px]",
                  "hover:bg-primary/10 transition-colors duration-200",
                  isActive && "text-primary bg-primary/10",
                  getTouchFeedbackClasses()
                )}
                asChild
                data-testid={`bottom-nav-${item.id}`}
              >
                <Link href={item.href}>
                  <div className="flex flex-col items-center gap-1">
                    <div className="relative">
                      <item.icon className="h-5 w-5" />
                      {item.badge && (
                        <Badge 
                          variant="default" 
                          className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs font-medium truncate max-w-[60px]">
                      {item.label}
                    </span>
                  </div>
                </Link>
              </Button>
            );
          }

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={cn(
                "flex flex-col items-center justify-center h-full px-2 py-1 rounded-none min-h-[44px]",
                "hover:bg-primary/10 transition-colors duration-200",
                isActive && "text-primary bg-primary/10",
                getTouchFeedbackClasses()
              )}
              onClick={() => handleItemClick(item)}
              data-testid={`bottom-nav-${item.id}`}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="relative">
                  <item.icon className="h-5 w-5" />
                  {item.badge && (
                    <Badge 
                      variant="default" 
                      className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium truncate max-w-[60px]">
                  {item.label}
                </span>
              </div>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}