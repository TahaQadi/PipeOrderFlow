# Quick Reference Guide - Mobile Features

## 🚀 Quick Component Import

```typescript
// Mobile Components
import { MobileNavigation } from '@/components/MobileNavigation';
import { BottomNavigation } from '@/components/BottomNavigation';
import { MobileProductCard } from '@/components/MobileProductCard';
import { MobileShoppingCart } from '@/components/MobileShoppingCart';

// Mobile Utilities
import { 
  getTouchFeedbackClasses,
  getMobileButtonClasses,
  getMobileSpacing,
  touchTargetSizes,
  mobileButtonClasses
} from '@/lib/mobile-utils';
```

## 📱 Responsive Display Patterns

```tsx
// Show only on mobile
<div className="md:hidden">
  <MobileComponent />
</div>

// Show only on desktop
<div className="hidden md:block">
  <DesktopComponent />
</div>

// Show on tablet and up
<div className="hidden sm:block">
  <TabletComponent />
</div>
```

## 🎯 Touch Target Sizes

```tsx
// Minimum 44px (WCAG 2.1 compliant)
<Button className="min-h-[44px] min-w-[44px]">
  Icon
</Button>

// Using utility
<Button className={touchTargetSizes.sm}>
  Small Touch
</Button>

<Button className={touchTargetSizes.md}>
  Medium Touch
</Button>
```

## 🖱️ Touch Feedback

```tsx
// Add touch feedback to any interactive element
<div className={getTouchFeedbackClasses()}>
  Interactive Content
</div>

// Custom touch feedback
const [isPressed, setIsPressed] = useState(false);

<div
  onTouchStart={() => setIsPressed(true)}
  onTouchEnd={() => setIsPressed(false)}
  className={cn(
    "transition-all",
    isPressed && "scale-95 shadow-md"
  )}
>
  Custom Feedback
</div>
```

## 🔘 Mobile-Optimized Buttons

```tsx
// Primary button
<Button className={getMobileButtonClasses('primary')}>
  Add to Cart
</Button>

// Secondary button
<Button className={getMobileButtonClasses('secondary')}>
  Save
</Button>

// Icon button
<Button className={getMobileButtonClasses('icon')}>
  <Icon />
</Button>

// With additional classes
<Button className={getMobileButtonClasses('primary', 'w-full')}>
  Full Width
</Button>
```

## 🗂️ Mobile Navigation Setup

```tsx
function OrderingPage() {
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('lta-products');
  
  return (
    <>
      {/* Header with Mobile Menu */}
      <header>
        <div className="md:hidden">
          <MobileNavigation
            cartItemCount={5}
            notificationCount={3}
            onPriceRequestClick={() => {}}
            onTabChange={setActiveTab}
          />
        </div>
      </header>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartItemCount={5}
        notificationCount={3}
        onPriceRequestClick={() => {}}
        onCartOpen={() => setMobileCartOpen(true)}
      />

      {/* Mobile Cart */}
      <MobileShoppingCart
        items={cartItems}
        open={mobileCartOpen}
        onOpenChange={setMobileCartOpen}
        {...handlers}
      />
    </>
  );
}
```

## 🎴 Mobile Product Card Usage

```tsx
<MobileProductCard
  id="prod-123"
  nameEn="Product Name"
  nameAr="اسم المنتج"
  descriptionEn="Description"
  descriptionAr="الوصف"
  price="99.99"
  currency="SAR"
  sku="SKU-123"
  imageUrl="/products/image.jpg"
  hasPrice={true}
  onAddToCart={() => addToCart(productId)}
  onRequestPrice={() => requestPrice(productId)}
  onViewDetails={() => viewDetails(productId)}
/>
```

## 🛒 Shopping Cart Implementation

```tsx
// Cart items interface
interface CartItem {
  productId: string;
  nameEn: string;
  nameAr: string;
  price: string;
  quantity: number;
  sku: string;
}

// Cart component
<MobileShoppingCart
  items={cartItems}
  open={isOpen}
  onOpenChange={setIsOpen}
  onUpdateQuantity={(id, qty) => updateQty(id, qty)}
  onRemoveItem={(id) => removeItem(id)}
  onClearCart={() => clearAll()}
  onSubmitOrder={() => submitOrder()}
  onSaveTemplate={() => saveTemplate()}
  currency="SAR"
/>
```

## 📐 Responsive Grid Layouts

```tsx
// Product grid
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {products.map(product => (
    <MobileProductCard key={product.id} {...product} />
  ))}
</div>

// Using mobile grid utility
import { mobileGrids } from '@/lib/mobile-utils';

<div className={`grid ${mobileGrids['responsive-sm']} gap-4`}>
  {items.map(item => <Item key={item.id} {...item} />)}
</div>
```

## 🎨 Mobile Spacing

```tsx
// Using spacing utility
import { getMobileSpacing } from '@/lib/mobile-utils';

<div className={getMobileSpacing('md')}>
  Content with mobile-optimized padding
</div>

// Direct usage
<div className="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>
```

## 🌐 RTL/LTR Support

```tsx
import { useLanguage } from '@/components/LanguageProvider';

function Component() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  return (
    <Sheet side={isArabic ? 'right' : 'left'}>
      <div className={isArabic ? 'text-right' : 'text-left'}>
        {isArabic ? contentAr : contentEn}
      </div>
    </Sheet>
  );
}
```

## 🎯 Test IDs

All mobile components include test IDs:

```tsx
// Navigation
data-testid="button-mobile-menu"
data-testid="nav-item-cart"
data-testid="nav-admin-products"

// Bottom Navigation
data-testid="bottom-nav-cart"
data-testid="bottom-nav-templates"

// Product Card
data-testid="mobile-card-product-SKU123"
data-testid="button-add-to-cart-SKU123"
data-testid="button-request-price-SKU123"

// Shopping Cart
data-testid="cart-item-SKU123"
data-testid="button-increase-SKU123"
data-testid="button-decrease-SKU123"
data-testid="button-remove-SKU123"
```

## ⚡ Performance Patterns

```tsx
// Lazy load components
const MobileCart = lazy(() => import('@/components/MobileShoppingCart'));

// Debounce search
const debouncedSearch = useMemo(
  () => debounce((value) => performSearch(value), 300),
  []
);

// Virtualize long lists
import { useVirtualizer } from '@tanstack/react-virtual';

// Optimize images
<img 
  src={imageUrl}
  loading="lazy"
  decoding="async"
  alt={altText}
/>
```

## 🔍 Common Patterns

### Page Padding for Bottom Nav
```tsx
<main className="pb-16 md:pb-0">
  {/* Content - leaves space for bottom nav on mobile */}
</main>
```

### Mobile Modal/Sheet
```tsx
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent 
    side={isArabic ? 'left' : 'right'}
    className="w-full sm:max-w-md"
  >
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
    </SheetHeader>
    Content
  </SheetContent>
</Sheet>
```

### Mobile-Optimized Form
```tsx
<form className="space-y-4">
  <Input 
    className="h-12 text-base min-h-[44px]"
    type="text"
  />
  <Button 
    className={cn(
      getMobileButtonClasses('primary'),
      'w-full'
    )}
  >
    Submit
  </Button>
</form>
```

### Loading States
```tsx
// Skeleton loader
<div className="animate-pulse">
  <div className="h-48 bg-muted rounded-lg" />
  <div className="h-4 bg-muted rounded mt-4" />
  <div className="h-4 bg-muted rounded mt-2 w-2/3" />
</div>

// Spinner
<div className="flex items-center justify-center p-8">
  <Loader2 className="h-8 w-8 animate-spin" />
</div>
```

## 🐛 Debugging Tips

```tsx
// Check if mobile view
const isMobile = window.innerWidth < 768;
console.log('Is mobile:', isMobile);

// Check touch support
const hasTouch = 'ontouchstart' in window;
console.log('Has touch:', hasTouch);

// Check device pixel ratio
const dpr = window.devicePixelRatio;
console.log('Device pixel ratio:', dpr);

// Monitor viewport changes
useEffect(() => {
  const handleResize = () => {
    console.log('Viewport:', window.innerWidth, 'x', window.innerHeight);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## 📝 Checklist for New Mobile Features

- [ ] Minimum 44px touch targets
- [ ] Touch feedback on interactions
- [ ] RTL/LTR compatibility
- [ ] Responsive breakpoints (< 768px)
- [ ] Test on real mobile devices
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] Accessibility (ARIA labels)
- [ ] Test IDs added
- [ ] Performance optimized
- [ ] Documentation updated

## 🔗 Quick Links

- **Full Docs**: [MOBILE_FEATURES.md](MOBILE_FEATURES.md)
- **Deployment**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Architecture**: [replit.md](replit.md)
- **Design System**: [design_guidelines.md](design_guidelines.md)

---

💡 **Tip**: Keep this file open while developing mobile features for quick reference!
