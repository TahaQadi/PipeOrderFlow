# Mobile-First Navigation and Components

## Overview

This document describes the mobile-first navigation and component system implemented for the Al Qadi Client Portal ordering page. The implementation provides a native app-like experience on mobile devices while maintaining full functionality and accessibility.

## Features Implemented

### 1. Mobile Navigation Drawer (`MobileNavigation.tsx`)

A slide-in navigation drawer optimized for mobile devices with the following features:

- **RTL/LTR Support**: Automatically adapts to Arabic (right-to-left) and English (left-to-right) layouts
- **Touch-Optimized**: All interactive elements meet the minimum 44px touch target requirement
- **Sections**:
  - Main Navigation (Home, Cart, Templates, Price Requests, History)
  - Admin Navigation (for admin users only)
  - Notifications
  - User Profile & Logout

#### Usage

```tsx
import { MobileNavigation } from '@/components/MobileNavigation';

<MobileNavigation
  cartItemCount={5}
  notificationCount={3}
  onPriceRequestClick={() => handlePriceRequest()}
  onTabChange={(tab) => setActiveTab(tab)}
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `cartItemCount` | `number` | Number of items in shopping cart (displays badge) |
| `notificationCount` | `number` | Number of unread notifications (displays badge) |
| `onPriceRequestClick` | `() => void` | Callback when price request is clicked |
| `onTabChange` | `(tab: string) => void` | Optional callback for tab changes |

### 2. Bottom Navigation Bar (`BottomNavigation.tsx`)

A fixed bottom navigation bar providing quick access to key features:

- **Always Visible**: Fixed to bottom of screen on mobile devices (hidden on desktop)
- **5 Primary Actions**:
  - My LTAs (LTA products)
  - All Products
  - Shopping Cart (with item count badge)
  - Templates
  - Profile (with notification badge)
- **Active State**: Highlights current tab with primary color
- **Touch-Optimized**: 44px minimum height with proper spacing

#### Usage

```tsx
import { BottomNavigation } from '@/components/BottomNavigation';

<BottomNavigation
  activeTab="lta-products"
  onTabChange={(tab) => setActiveTab(tab)}
  cartItemCount={5}
  notificationCount={2}
  onPriceRequestClick={() => handlePriceRequest()}
  onCartOpen={() => setCartOpen(true)}
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `activeTab` | `string` | Currently active tab ID |
| `onTabChange` | `(tab: string) => void` | Callback when tab changes |
| `cartItemCount` | `number` | Number of items in cart |
| `notificationCount` | `number` | Number of notifications |
| `onPriceRequestClick` | `() => void` | Price request callback |
| `onCartOpen` | `() => void` | Optional cart open callback |

### 3. Mobile Product Card (`MobileProductCard.tsx`)

A mobile-optimized product card with enhanced touch interactions:

- **Responsive Design**: Full-width on mobile, grid layout on larger screens
- **Touch Feedback**: Visual feedback on press with scale animations
- **Image Display**: Aspect-ratio-controlled product images with fallback
- **Price Display**: Prominent pricing with badge overlay
- **Actions**:
  - Add to Cart (for products with prices)
  - Request Price (for products without prices)
  - View Details (optional quick action)
- **Bilingual Support**: Displays names and descriptions in Arabic or English

#### Usage

```tsx
import { MobileProductCard } from '@/components/MobileProductCard';

<MobileProductCard
  id="product-123"
  nameEn="Industrial Widget"
  nameAr="قطعة صناعية"
  descriptionEn="High-quality industrial component"
  descriptionAr="مكون صناعي عالي الجودة"
  price="150.00"
  currency="SAR"
  sku="IW-123"
  imageUrl="/products/widget.jpg"
  hasPrice={true}
  onAddToCart={() => handleAddToCart()}
  onRequestPrice={() => handleRequestPrice()}
  onViewDetails={() => handleViewDetails()}
/>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | Unique product identifier |
| `nameEn` | `string` | Yes | Product name in English |
| `nameAr` | `string` | Yes | Product name in Arabic |
| `descriptionEn` | `string` | No | Description in English |
| `descriptionAr` | `string` | No | Description in Arabic |
| `price` | `string` | Yes | Product price |
| `currency` | `string` | Yes | Currency code (e.g., "SAR") |
| `sku` | `string` | Yes | Stock keeping unit |
| `imageUrl` | `string` | No | Product image URL |
| `hasPrice` | `boolean` | Yes | Whether product has a price |
| `onAddToCart` | `() => void` | Yes | Add to cart callback |
| `onRequestPrice` | `() => void` | Yes | Request price callback |
| `onViewDetails` | `() => void` | No | View details callback |
| `className` | `string` | No | Additional CSS classes |

### 4. Mobile Shopping Cart (`MobileShoppingCart.tsx`)

A full-screen slide-in shopping cart optimized for mobile:

- **Full-Screen Panel**: Slides in from right (LTR) or left (RTL)
- **Item Management**:
  - Quantity controls (+ / -)
  - Remove individual items
  - Clear entire cart
- **Order Summary**:
  - Subtotal
  - Tax calculation (15%)
  - Total with prominent display
- **Actions**:
  - Submit Order
  - Save as Template
- **Empty State**: Friendly message when cart is empty
- **Sticky Header & Footer**: Header and summary stay visible during scroll

#### Usage

```tsx
import { MobileShoppingCart } from '@/components/MobileShoppingCart';

<MobileShoppingCart
  items={cartItems}
  open={isCartOpen}
  onOpenChange={setIsCartOpen}
  onUpdateQuantity={(id, qty) => updateQuantity(id, qty)}
  onRemoveItem={(id) => removeItem(id)}
  onClearCart={() => clearCart()}
  onSubmitOrder={() => submitOrder()}
  onSaveTemplate={() => saveTemplate()}
  currency="SAR"
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `items` | `CartItem[]` | Array of cart items |
| `open` | `boolean` | Cart open state |
| `onOpenChange` | `(open: boolean) => void` | Open state change callback |
| `onUpdateQuantity` | `(id: string, qty: number) => void` | Update item quantity |
| `onRemoveItem` | `(id: string) => void` | Remove item callback |
| `onClearCart` | `() => void` | Clear cart callback |
| `onSubmitOrder` | `() => void` | Submit order callback |
| `onSaveTemplate` | `() => void` | Save template callback |
| `currency` | `string` | Currency code |

#### CartItem Interface

```typescript
interface CartItem {
  productId: string;
  nameEn: string;
  nameAr: string;
  price: string;
  quantity: number;
  sku: string;
}
```

## Mobile Utilities (`mobile-utils.ts`)

A comprehensive set of utilities for mobile-optimized development:

### Touch Target Sizes

Ensures all interactive elements meet WCAG 2.1 accessibility guidelines (minimum 44×44px):

```typescript
touchTargetSizes = {
  sm: 'h-11 w-11 min-h-[44px] min-w-[44px]',
  md: 'h-12 w-12 min-h-[44px] min-w-[44px]',
  lg: 'h-14 w-14 min-h-[44px] min-w-[44px]',
  xl: 'h-16 w-16 min-h-[44px] min-w-[44px]',
}
```

### Button Classes

Pre-configured button styles optimized for mobile:

```typescript
mobileButtonClasses = {
  primary: 'h-12 px-6 text-base font-medium min-h-[44px]',
  secondary: 'h-12 px-6 text-base font-medium min-h-[44px]',
  icon: 'h-12 w-12 min-h-[44px] min-w-[44px]',
  small: 'h-10 px-4 text-sm font-medium min-h-[40px]',
}
```

### Helper Functions

#### `getTouchFeedbackClasses()`

Provides visual feedback for touch interactions:

```typescript
getTouchFeedbackClasses()
// Returns: 'transition-all duration-150 active:scale-95 active:bg-primary/10 hover:scale-105 hover:bg-primary/5'
```

Usage:
```tsx
<Button className={getTouchFeedbackClasses()}>
  Click Me
</Button>
```

#### `getMobileButtonClasses(variant, additionalClasses?)`

Gets mobile-optimized button classes:

```typescript
getMobileButtonClasses('primary', 'w-full')
// Returns: 'h-12 px-6 text-base font-medium min-h-[44px] w-full'
```

#### `getMobileSpacing(size)`

Returns mobile-optimized spacing:

```typescript
getMobileSpacing('md') // Returns: 'p-4'
```

### Responsive Grids

Pre-configured responsive grid layouts:

```typescript
mobileGrids = {
  'responsive': 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
  'responsive-sm': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  'responsive-lg': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}
```

## Design Principles

### 1. Touch Target Optimization

All interactive elements follow WCAG 2.1 Level AAA guidelines:
- **Minimum Size**: 44×44px for all touchable elements
- **Spacing**: Adequate spacing between touch targets (minimum 8px)
- **Visual Feedback**: Immediate visual response on touch

### 2. RTL/LTR Support

All components automatically adapt to language direction:
- **Navigation Drawers**: Slide from appropriate side (right for Arabic, left for English)
- **Icons**: Mirror directionally (chevrons, arrows)
- **Layout**: Proper alignment and spacing in both directions

### 3. Performance

- **Smooth Animations**: 60fps transitions using transform and opacity
- **Lazy Loading**: Images load progressively with blur-up effect
- **Optimized Re-renders**: Memoization for expensive components

### 4. Accessibility

- **Semantic HTML**: Proper ARIA labels and roles
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Descriptive labels for all actions
- **Color Contrast**: WCAG AA compliant contrast ratios

## Best Practices

### 1. Using Mobile Components

```tsx
// Import mobile components
import { MobileNavigation } from '@/components/MobileNavigation';
import { BottomNavigation } from '@/components/BottomNavigation';
import { MobileProductCard } from '@/components/MobileProductCard';
import { MobileShoppingCart } from '@/components/MobileShoppingCart';

// Use mobile utilities
import { getTouchFeedbackClasses, getMobileButtonClasses } from '@/lib/mobile-utils';

// Apply to buttons
<Button className={cn(
  getMobileButtonClasses('primary'),
  getTouchFeedbackClasses()
)}>
  Add to Cart
</Button>
```

### 2. Responsive Display

Hide/show components based on screen size:

```tsx
// Show only on mobile
<div className="md:hidden">
  <BottomNavigation {...props} />
</div>

// Show only on desktop
<div className="hidden md:block">
  <DesktopNavigation {...props} />
</div>
```

### 3. Touch Interactions

Always provide visual feedback for touch:

```tsx
const [isPressed, setIsPressed] = useState(false);

<div
  onTouchStart={() => setIsPressed(true)}
  onTouchEnd={() => setIsPressed(false)}
  className={cn(
    "transition-all",
    isPressed && "scale-95 shadow-md"
  )}
>
  Content
</div>
```

### 4. Testing Mobile Features

```tsx
// Test IDs are provided for all interactive elements
data-testid="button-mobile-menu"
data-testid="nav-item-cart"
data-testid="bottom-nav-templates"
data-testid="button-add-to-cart-SKU123"
data-testid="cart-item-SKU123"
```

## Integration with OrderingPage

The mobile components are integrated into the `OrderingPage.tsx`:

1. **Conditional Rendering**: Mobile components show on screens < 768px
2. **State Management**: Shared state between mobile and desktop components
3. **Responsive Breakpoints**: Uses Tailwind's responsive utilities
4. **Performance**: Lazy loads mobile components when needed

Example integration:

```tsx
// Mobile Navigation in Header
<div className="md:hidden">
  <MobileNavigation
    cartItemCount={cartItemCount}
    notificationCount={notificationCount}
    onPriceRequestClick={handlePriceRequest}
    onTabChange={setActiveTab}
  />
</div>

// Bottom Navigation (always hidden on desktop)
<BottomNavigation
  activeTab={activeTab}
  onTabChange={setActiveTab}
  cartItemCount={cartItemCount}
  notificationCount={notificationCount}
  onPriceRequestClick={handlePriceRequest}
  onCartOpen={() => setMobileCartOpen(true)}
/>

// Mobile Product Grid
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
  {products.map(product => (
    <MobileProductCard key={product.id} {...product} />
  ))}
</div>

// Mobile Shopping Cart
<MobileShoppingCart
  items={cartItems}
  open={mobileCartOpen}
  onOpenChange={setMobileCartOpen}
  {...cartHandlers}
/>
```

## Browser Compatibility

All mobile features are tested and supported on:

- **iOS Safari**: 13.0+
- **Chrome Mobile**: 90+
- **Firefox Mobile**: 90+
- **Samsung Internet**: 14+

## Performance Metrics

Target performance metrics:
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Touch Response**: < 100ms
- **Scroll Performance**: 60fps

## Future Enhancements

Planned improvements:
1. **Offline Support**: PWA capabilities with service workers
2. **Swipe Gestures**: Swipe to delete, swipe to navigate
3. **Pull to Refresh**: Native-like refresh interaction
4. **Haptic Feedback**: Vibration on important actions (where supported)
5. **Voice Search**: Voice-activated product search
6. **Dark Mode Improvements**: Enhanced dark mode for OLED screens

## Troubleshooting

### Common Issues

**Problem**: Touch targets not responding
- **Solution**: Ensure minimum 44px size with `min-h-[44px] min-w-[44px]`

**Problem**: Drawer not sliding from correct side
- **Solution**: Check language context and RTL/LTR configuration

**Problem**: Bottom navigation covering content
- **Solution**: Add `pb-16` padding to page content for mobile

**Problem**: Cart animations stuttering
- **Solution**: Use `transform` and `opacity` for animations, avoid layout-shifting properties

## Resources

- [WCAG 2.1 Touch Target Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [Material Design Mobile Patterns](https://m3.material.io/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)

## Contributing

When adding new mobile features:

1. Follow touch target size guidelines (minimum 44px)
2. Test on real devices (iOS and Android)
3. Ensure RTL/LTR compatibility
4. Add appropriate test IDs
5. Update this documentation
6. Consider performance impact
7. Maintain accessibility standards

## Support

For questions or issues with mobile features:
- Check this documentation first
- Review `design_guidelines.md` for design system details
- Consult `replit.md` for system architecture
- Test on actual mobile devices, not just browser DevTools
