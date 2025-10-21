# Al Qadi Client Portal

A bilingual (Arabic/English) mobile-first web application for managing and fulfilling Long-Term Agreement (LTA) based product orders. Built with React, TypeScript, and PostgreSQL, optimized for both desktop and mobile devices.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended)
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd al-qadi-client-portal

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

The application will be available at `http://localhost:5000`

## 📱 Mobile-First Features

This application includes comprehensive mobile optimizations:

- **Mobile Navigation**: Drawer menu and bottom navigation bar
- **Touch-Optimized Components**: 44px minimum touch targets (WCAG 2.1 compliant)
- **Mobile Shopping Cart**: Full-screen slide-in cart with gesture support
- **Responsive Product Cards**: Optimized for mobile browsing
- **RTL/LTR Support**: Seamless Arabic and English experience

See **[MOBILE_FEATURES.md](MOBILE_FEATURES.md)** for detailed documentation.

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[replit.md](replit.md)** | System architecture, technology stack, and database schema |
| **[MOBILE_FEATURES.md](MOBILE_FEATURES.md)** | Mobile components, utilities, and best practices |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Deployment guide for Replit and production environments |
| **[design_guidelines.md](design_guidelines.md)** | Design system, UI patterns, and styling guidelines |
| **[SEO_GUIDE.md](SEO_GUIDE.md)** | SEO optimization and best practices |

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter
- **State Management**: TanStack Query + React Context
- **UI Library**: Shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS with custom design tokens
- **Internationalization**: i18next (Arabic/English)

### Backend
- **Runtime**: Node.js with Express
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Drizzle
- **Authentication**: Passport.js (Local Strategy)
- **Session Storage**: PostgreSQL with connect-pg-simple

### Mobile Stack
- **Navigation**: Custom drawer + bottom navigation
- **Touch Optimization**: Mobile utility library
- **Accessibility**: WCAG 2.1 Level AAA compliant
- **Responsive Design**: Mobile-first approach

## 🎨 Key Features

### For Clients
- ✅ Browse products from assigned LTAs
- ✅ Mobile-optimized product catalog
- ✅ Real-time shopping cart
- ✅ Order templates for quick reordering
- ✅ Order history and tracking
- ✅ Price request system
- ✅ Bilingual interface (Arabic/English)
- ✅ Dark/Light theme support

### For Administrators
- ✅ LTA management (CRUD operations)
- ✅ Product catalog management
- ✅ Client management and assignment
- ✅ Bulk product import via CSV
- ✅ Document upload/management
- ✅ Order processing and tracking

## 🔧 Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npm run db:push

# Generate database client
npm run db:generate

# Seed initial data
npm run db:seed
```

### Project Structure

```
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── MobileNavigation.tsx
│   │   │   ├── BottomNavigation.tsx
│   │   │   ├── MobileProductCard.tsx
│   │   │   ├── MobileShoppingCart.tsx
│   │   │   └── ui/        # Shadcn/ui components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and helpers
│   │   │   ├── mobile-utils.ts
│   │   │   └── utils.ts
│   │   └── App.tsx
│   └── index.html
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── auth.ts            # Authentication
│   ├── db.ts              # Database connection
│   ├── error-logger.ts    # Error logging
│   └── index.ts
├── shared/                # Shared types and schemas
│   └── schema.ts
├── attached_assets/       # File uploads
│   ├── products/          # Product images
│   └── lta-documents/     # Contract documents
└── docs/                  # Documentation
```

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:pass@host/db

# Session
SESSION_SECRET=your-secret-key

# Server
NODE_ENV=development
PORT=5000

# Optional: Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
```

## 📱 Mobile Development

### Testing Mobile Features

1. **Browser DevTools**:
   ```
   Chrome: F12 → Toggle Device Toolbar (Ctrl+Shift+M)
   ```

2. **Real Device**:
   - Share development URL
   - Test on actual iOS/Android devices

3. **Responsive Breakpoints**:
   - Mobile: < 768px
   - Tablet: 768px - 1024px
   - Desktop: > 1024px

### Mobile Utilities

```typescript
import { 
  getTouchFeedbackClasses,
  getMobileButtonClasses,
  touchTargetSizes 
} from '@/lib/mobile-utils';

// Apply touch feedback
<Button className={getTouchFeedbackClasses()}>
  Click Me
</Button>

// Use mobile-optimized button
<Button className={getMobileButtonClasses('primary')}>
  Add to Cart
</Button>
```

See **[MOBILE_FEATURES.md](MOBILE_FEATURES.md)** for complete API reference.

## 🚀 Deployment

### Replit Deployment

1. Fork/import project to Replit
2. Configure environment variables in Replit Secrets
3. Run `npm install`
4. Run `npm run build`
5. Deploy using Replit's deployment feature

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for detailed instructions.

### Production Deployment

```bash
# Build application
npm run build

# Set environment to production
export NODE_ENV=production

# Start server
npm start
```

## 🔒 Security

- ✅ Session-based authentication with secure cookies
- ✅ Password hashing with scrypt
- ✅ SQL injection prevention via Drizzle ORM
- ✅ File upload validation and sanitization
- ✅ HTTPS enforcement in production
- ✅ CSRF protection
- ✅ Rate limiting on API endpoints

## 🌐 Internationalization

The application supports:
- **English (LTR)**: Default language
- **Arabic (RTL)**: Full RTL layout support

Language switching:
- Automatic direction change (LTR/RTL)
- Localized content and UI elements
- Proper text alignment and spacing
- Mirrored navigation and icons

## 🎯 Browser Support

### Desktop
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

### Mobile
- iOS Safari 13+
- Chrome Mobile 90+
- Firefox Mobile 90+
- Samsung Internet 14+

## 📊 Performance

Target metrics:
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: > 90
- **Mobile Touch Response**: < 100ms

## 🤝 Contributing

1. Follow TypeScript strict mode guidelines
2. Use provided mobile utilities for consistency
3. Test on real mobile devices
4. Ensure RTL/LTR compatibility
5. Maintain accessibility standards (WCAG 2.1)
6. Update documentation as needed

## 📝 License

[Your License Here]

## 👥 Team

[Your Team Information]

## 📞 Support

For issues and questions:
- Check documentation in `/docs`
- Review [MOBILE_FEATURES.md](MOBILE_FEATURES.md) for mobile-specific issues
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment problems
- Consult [replit.md](replit.md) for architecture details

## 🗺️ Roadmap

### Completed ✅
- Mobile-first navigation system
- Touch-optimized components
- Responsive product catalog
- Mobile shopping cart
- RTL/LTR support

### In Progress 🚧
- PWA capabilities
- Offline support
- Performance optimizations

### Planned 📋
- Voice search
- Swipe gestures
- Haptic feedback
- Push notifications
- Advanced analytics

---

Built with ❤️ for efficient B2B ordering
