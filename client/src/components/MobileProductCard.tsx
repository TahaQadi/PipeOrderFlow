import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Heart, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageProvider';
import { cn } from '@/lib/utils';
import { getTouchFeedbackClasses, getMobileButtonClasses } from '@/lib/mobile-utils';
import { useState } from 'react';

interface MobileProductCardProps {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  price: string;
  currency: string;
  sku: string;
  imageUrl?: string;
  hasPrice: boolean;
  onAddToCart: () => void;
  onRequestPrice: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export function MobileProductCard({
  nameEn,
  nameAr,
  descriptionEn,
  descriptionAr,
  price,
  currency,
  sku,
  imageUrl,
  hasPrice,
  onAddToCart,
  onRequestPrice,
  onViewDetails,
  className
}: MobileProductCardProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [isPressed, setIsPressed] = useState(false);

  const isArabic = language === 'ar';
  const name = isArabic ? nameAr : nameEn;
  const description = isArabic ? descriptionAr : descriptionEn;

  const handleTouchStart = () => {
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-200",
        "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        "bg-card/50 backdrop-blur-sm border-border/50",
        isPressed && "scale-[0.98] shadow-md",
        className
      )}
      data-testid={`mobile-card-product-${sku}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-muted/30 to-muted/60 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-muted-foreground">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}
        
        {/* Quick Actions Overlay */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {onViewDetails && (
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails();
              }}
              data-testid={`button-view-details-${sku}`}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Price Badge */}
        {hasPrice && (
          <div className="absolute bottom-2 left-2">
            <Badge 
              variant="default" 
              className="bg-primary/90 text-primary-foreground backdrop-blur-sm"
            >
              {currency} {price}
            </Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <div className="space-y-1">
          <h3 className="font-semibold text-base leading-tight line-clamp-2 min-h-[2.5rem]">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {t('sku')}: {sku}
          </p>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {description}
          </p>
        )}

        {/* Price Display */}
        <div className="flex items-center justify-between">
          {hasPrice ? (
            <div className="space-y-1">
              <div className="font-mono text-lg font-semibold text-primary">
                {currency} {price}
              </div>
              <div className="text-xs text-muted-foreground">
                {t('perUnit')}
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="text-sm font-medium text-muted-foreground">
                {isArabic ? 'السعر عند الطلب' : 'Price on Request'}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {hasPrice ? (
            <Button
              className={cn(
                getMobileButtonClasses('primary', 'flex-1'),
                getTouchFeedbackClasses()
              )}
              onClick={onAddToCart}
              data-testid={`button-add-to-cart-${sku}`}
            >
              <Plus className="h-4 w-4 me-2" />
              {t('addToCart')}
            </Button>
          ) : (
            <Button
              variant="outline"
              className={cn(
                getMobileButtonClasses('secondary', 'flex-1'),
                getTouchFeedbackClasses()
              )}
              onClick={onRequestPrice}
              data-testid={`button-request-price-${sku}`}
            >
              <Heart className="h-4 w-4 me-2" />
              {isArabic ? 'طلب سعر' : 'Request Price'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}