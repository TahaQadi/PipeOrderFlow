import { cn } from './utils';

/**
 * Mobile-optimized touch target sizes
 * Ensures minimum 44px touch targets for accessibility
 */
export const touchTargetSizes = {
  sm: 'h-11 w-11 min-h-[44px] min-w-[44px]', // 44px minimum
  md: 'h-12 w-12 min-h-[44px] min-w-[44px]', // 48px
  lg: 'h-14 w-14 min-h-[44px] min-w-[44px]', // 56px
  xl: 'h-16 w-16 min-h-[44px] min-w-[44px]', // 64px
} as const;

/**
 * Mobile-optimized button classes
 */
export const mobileButtonClasses = {
  primary: 'h-12 px-6 text-base font-medium min-h-[44px]',
  secondary: 'h-12 px-6 text-base font-medium min-h-[44px]',
  icon: 'h-12 w-12 min-h-[44px] min-w-[44px]',
  small: 'h-10 px-4 text-sm font-medium min-h-[40px]',
} as const;

/**
 * Mobile-optimized spacing
 */
export const mobileSpacing = {
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
} as const;

/**
 * Mobile-optimized text sizes
 */
export const mobileTextSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
} as const;

/**
 * Mobile-optimized grid layouts
 */
export const mobileGrids = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-2',
  '3': 'grid-cols-3',
  '4': 'grid-cols-4',
  'responsive': 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
  'responsive-sm': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  'responsive-lg': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
} as const;

/**
 * Mobile-optimized breakpoints
 */
export const mobileBreakpoints = {
  xs: 'xs:',
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
  '2xl': '2xl:',
} as const;

/**
 * Mobile-optimized component classes
 */
export const mobileComponentClasses = {
  card: 'p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm',
  button: 'h-12 px-6 text-base font-medium min-h-[44px] transition-all duration-200 active:scale-95',
  input: 'h-12 px-4 text-base min-h-[44px]',
  select: 'h-12 px-4 text-base min-h-[44px]',
  textarea: 'min-h-[120px] p-4 text-base',
} as const;

/**
 * Mobile-optimized animation classes
 */
export const mobileAnimations = {
  press: 'active:scale-95 transition-transform duration-150',
  hover: 'hover:scale-105 transition-transform duration-200',
  fade: 'transition-opacity duration-200',
  slide: 'transition-transform duration-300',
} as const;

/**
 * Mobile-optimized utility function
 */
export function getMobileClasses(
  baseClasses: string,
  mobileClasses: string,
  isMobile: boolean = true
): string {
  return cn(baseClasses, isMobile && mobileClasses);
}

/**
 * Mobile-optimized touch feedback
 */
export function getTouchFeedbackClasses(): string {
  return cn(
    'transition-all duration-150',
    'active:scale-95 active:bg-primary/10',
    'hover:scale-105 hover:bg-primary/5'
  );
}

/**
 * Mobile-optimized spacing utilities
 */
export function getMobileSpacing(size: keyof typeof mobileSpacing): string {
  return mobileSpacing[size];
}

/**
 * Mobile-optimized button utilities
 */
export function getMobileButtonClasses(
  variant: keyof typeof mobileButtonClasses,
  additionalClasses?: string
): string {
  return cn(mobileButtonClasses[variant], additionalClasses);
}