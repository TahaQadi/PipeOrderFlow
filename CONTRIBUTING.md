# Contributing Guide

Thank you for your interest in contributing to the Al Qadi Client Portal! This guide will help you get started.

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/al-qadi-portal.git
cd al-qadi-portal

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/al-qadi-portal.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment

```bash
# Copy environment template
cp .env.example .env

# Configure your database and other settings
# Edit .env with your values
```

### 4. Run Development Server

```bash
npm run dev
```

## 📋 Development Workflow

### Creating a Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/your-bug-fix
```

### Making Changes

1. **Write Code**
   - Follow existing code style
   - Use TypeScript strict mode
   - Add proper type definitions

2. **Test Your Changes**
   - Test on desktop browsers
   - Test on mobile devices (real devices preferred)
   - Test RTL (Arabic) and LTR (English) modes
   - Test light and dark themes

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new mobile component"
   ```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Build process or auxiliary tool changes

**Examples:**
```bash
feat(mobile): add swipe gesture support to cart
fix(auth): resolve session expiration issue
docs(mobile): update MobileNavigation documentation
style(components): format ProductCard component
refactor(utils): simplify mobile utility functions
```

## 🎨 Code Style Guidelines

### TypeScript

```typescript
// ✅ Good
interface ProductCardProps {
  id: string;
  nameEn: string;
  nameAr: string;
  price: string;
  onAddToCart: () => void;
}

export function ProductCard({ 
  id, 
  nameEn, 
  nameAr, 
  price, 
  onAddToCart 
}: ProductCardProps) {
  // Component logic
}

// ❌ Bad
export function ProductCard(props: any) {
  // Component logic
}
```

### React Components

```typescript
// ✅ Good - Named export, clear props
export function MobileCard({ title, content }: MobileCardProps) {
  return (
    <div className="mobile-card">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

// ❌ Bad - Default export, unclear props
export default ({ title, content }) => (
  <div>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);
```

### CSS/Tailwind

```typescript
// ✅ Good - Use cn() utility, organized classes
import { cn } from '@/lib/utils';

<Button
  className={cn(
    "h-12 px-6 text-base",
    "transition-all duration-200",
    "hover:bg-primary/10",
    isActive && "bg-primary text-primary-foreground",
    className
  )}
>
  {children}
</Button>

// ❌ Bad - String concatenation
<Button
  className={"h-12 px-6 text-base transition-all duration-200 hover:bg-primary/10 " + 
             (isActive ? "bg-primary text-primary-foreground " : "") + 
             className}
>
  {children}
</Button>
```

## 📱 Mobile Development Guidelines

### 1. Touch Targets

Always ensure minimum 44×44px touch targets:

```typescript
// ✅ Good
<Button className="min-h-[44px] min-w-[44px]">
  <Icon />
</Button>

// ❌ Bad
<Button className="h-8 w-8">
  <Icon />
</Button>
```

### 2. Touch Feedback

Add visual feedback to all interactive elements:

```typescript
// ✅ Good
import { getTouchFeedbackClasses } from '@/lib/mobile-utils';

<Button className={getTouchFeedbackClasses()}>
  Add to Cart
</Button>

// ❌ Bad
<Button>Add to Cart</Button>
```

### 3. Responsive Design

Use mobile-first approach:

```typescript
// ✅ Good - Mobile first
<div className="p-4 md:p-6 lg:p-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {items.map(item => <Item key={item.id} {...item} />)}
  </div>
</div>

// ❌ Bad - Desktop first
<div className="p-8 sm:p-6 xs:p-4">
  <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
    {items.map(item => <Item key={item.id} {...item} />)}
  </div>
</div>
```

### 4. RTL/LTR Support

Always consider both directions:

```typescript
// ✅ Good
const { language } = useLanguage();
const isArabic = language === 'ar';

<Sheet side={isArabic ? 'right' : 'left'}>
  <div className="flex items-center gap-2">
    <Icon className={isArabic ? 'ml-2' : 'mr-2'} />
    <span>{isArabic ? textAr : textEn}</span>
  </div>
</Sheet>

// ❌ Bad
<Sheet side="left">
  <div className="flex items-center gap-2">
    <Icon className="mr-2" />
    <span>{text}</span>
  </div>
</Sheet>
```

## 🧪 Testing Guidelines

### Component Testing

```typescript
// Add test IDs to components
<Button data-testid="button-add-to-cart">
  Add to Cart
</Button>

<div data-testid={`product-card-${sku}`}>
  {/* Product content */}
</div>
```

### Manual Testing Checklist

Before submitting a PR:

- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile device (iOS or Android)
- [ ] Test in Arabic (RTL) mode
- [ ] Test in English (LTR) mode
- [ ] Test in light theme
- [ ] Test in dark theme
- [ ] Test all interactive elements
- [ ] Test loading states
- [ ] Test error states
- [ ] Verify accessibility (keyboard navigation)

## 📝 Documentation

### When to Update Documentation

Update docs when you:
- Add new components
- Modify component APIs
- Change mobile utilities
- Add new features
- Fix important bugs

### Which Files to Update

| Change | Update |
|--------|--------|
| New mobile component | `MOBILE_FEATURES.md`, `QUICK_REFERENCE.md` |
| New utility function | `MOBILE_FEATURES.md`, `QUICK_REFERENCE.md` |
| Architecture change | `replit.md` |
| Design system change | `design_guidelines.md` |
| Deployment change | `DEPLOYMENT.md` |
| General feature | `README.md` |

### Documentation Style

```markdown
## Component Name

Brief description of what the component does.

### Usage

\`\`\`tsx
import { Component } from '@/components/Component';

<Component
  prop1="value"
  prop2={true}
  onAction={() => {}}
/>
\`\`\`

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| prop1 | string | Yes | Description |
| prop2 | boolean | No | Description |

### Examples

\`\`\`tsx
// Example 1: Basic usage
<Component prop1="basic" />

// Example 2: Advanced usage
<Component 
  prop1="advanced"
  prop2={true}
  onAction={handleAction}
/>
\`\`\`
```

## 🔍 Code Review Process

### Submitting a PR

1. **Update Your Branch**
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Push Your Changes**
   ```bash
   git push origin your-branch
   ```

3. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill out the PR template
   - Add screenshots for UI changes
   - Add mobile screenshots if applicable

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested RTL/LTR
- [ ] Tested light/dark themes

## Screenshots
[Add screenshots here]

## Related Issues
Closes #123
```

### Review Criteria

Your PR will be reviewed for:

1. **Code Quality**
   - Follows style guidelines
   - Proper TypeScript usage
   - No console.log statements

2. **Functionality**
   - Works as intended
   - No breaking changes
   - Proper error handling

3. **Mobile Optimization**
   - Touch targets are adequate
   - Responsive design works
   - RTL/LTR support

4. **Performance**
   - No unnecessary re-renders
   - Images are optimized
   - Animations are smooth

5. **Documentation**
   - Code is well-commented
   - Documentation is updated
   - Examples are provided

## 🐛 Reporting Bugs

### Before Reporting

1. Check existing issues
2. Test on latest version
3. Verify it's not a configuration issue

### Bug Report Template

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., iOS 16, Android 13]
- Browser: [e.g., Safari, Chrome]
- Device: [e.g., iPhone 14, Samsung Galaxy S21]
- Screen Size: [e.g., 390x844]

## Screenshots
[Add screenshots]

## Additional Context
Any other relevant information
```

## 💡 Feature Requests

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem It Solves
What problem does this solve?

## Proposed Solution
How should this work?

## Alternatives Considered
Other solutions you've thought about

## Additional Context
Any mockups, examples, or references
```

## 📚 Resources

### Documentation
- [README.md](README.md) - Project overview
- [MOBILE_FEATURES.md](MOBILE_FEATURES.md) - Mobile components
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick reference
- [replit.md](replit.md) - System architecture
- [design_guidelines.md](design_guidelines.md) - Design system

### External Resources
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🤝 Community

### Communication Channels
- GitHub Issues: Bug reports and feature requests
- GitHub Discussions: Questions and general discussion
- Pull Requests: Code contributions

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow project guidelines

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to the Al Qadi Client Portal! 🚀
