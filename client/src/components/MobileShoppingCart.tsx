import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, X, ShoppingCart as CartIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageProvider';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { getTouchFeedbackClasses, getMobileButtonClasses } from '@/lib/mobile-utils';

export interface CartItem {
  productId: string;
  nameEn: string;
  nameAr: string;
  price: string;
  quantity: number;
  sku: string;
}

interface MobileShoppingCartProps {
  items: CartItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onSubmitOrder: () => void;
  onSaveTemplate: () => void;
  currency: string;
}

export function MobileShoppingCart({
  items,
  open,
  onOpenChange,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSubmitOrder,
  onSaveTemplate,
  currency,
}: MobileShoppingCartProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const isArabic = language === 'ar';
  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + tax;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side={isArabic ? 'left' : 'right'} 
        className="w-full sm:max-w-md flex flex-col p-0 h-full"
      >
        <SheetHeader className="p-4 pb-2 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-lg">
              <CartIcon className="h-5 w-5" />
              {t('yourCart')}
            </SheetTitle>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearCart}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                data-testid="button-clear-cart"
              >
                {t('clearCart')}
              </Button>
            )}
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center">
              <CartIcon className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-medium text-lg">{t('emptyCart')}</p>
              <p className="text-sm text-muted-foreground">
                {isArabic ? 'ابدأ التسوق لإضافة منتجات إلى سلة التسوق' : 'Start shopping to add products to your cart'}
              </p>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-3 p-3 bg-card/50 rounded-lg border border-border/50"
                    data-testid={`cart-item-${item.sku}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm leading-tight line-clamp-2">
                        {isArabic ? item.nameAr : item.nameEn}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t('sku')}: {item.sku}
                      </p>
                      <p className="font-mono text-sm mt-2 text-primary">
                        {currency} {item.price}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          className={cn(
                            'h-10 w-10 min-h-[44px] min-w-[44px]',
                            getTouchFeedbackClasses()
                          )}
                          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          data-testid={`button-decrease-${item.sku}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <div className="min-w-[3rem] text-center">
                          <span className="font-medium text-base">{item.quantity}</span>
                        </div>
                        
                        <Button
                          variant="outline"
                          className={cn(
                            'h-10 w-10 min-h-[44px] min-w-[44px]',
                            getTouchFeedbackClasses()
                          )}
                          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                          data-testid={`button-increase-${item.sku}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        className={cn(
                          'h-10 w-10 min-h-[44px] min-w-[44px] text-destructive hover:text-destructive hover:bg-destructive/10',
                          getTouchFeedbackClasses()
                        )}
                        onClick={() => onRemoveItem(item.productId)}
                        data-testid={`button-remove-${item.sku}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Order Summary - Sticky Bottom */}
            <div className="p-4 border-t bg-background/95 backdrop-blur-sm sticky bottom-0">
              <div className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('subtotal')}</span>
                    <span className="font-mono">{currency} {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('tax')} (15%)</span>
                    <span className="font-mono">{currency} {tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base font-semibold">
                    <span>{t('total')}</span>
                    <span className="font-mono text-primary">{currency} {total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className={cn(
                      getMobileButtonClasses('secondary', 'flex-1'),
                      getTouchFeedbackClasses()
                    )}
                    onClick={onSaveTemplate}
                    data-testid="button-save-template"
                  >
                    {t('saveAsTemplate')}
                  </Button>
                  <Button
                    className={cn(
                      getMobileButtonClasses('primary', 'flex-1'),
                      getTouchFeedbackClasses()
                    )}
                    onClick={onSubmitOrder}
                    data-testid="button-submit-order"
                  >
                    {t('submitOrder')}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}