# Deployment Guide for Replit

## Overview

This guide covers deploying the Al Qadi Client Portal on Replit, including setup, configuration, and best practices.

## Prerequisites

- Replit account with appropriate permissions
- Neon PostgreSQL database credentials
- Basic understanding of Node.js and React

## Environment Setup

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Session Configuration
SESSION_SECRET=your-secure-session-secret-here

# Server Configuration
NODE_ENV=production
PORT=5000

# Optional: Email Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
```

### 2. Replit Configuration

The project includes a `.replit` file that should contain:

```toml
run = "npm run dev"

[nix]
channel = "stable-22_11"

[deployment]
run = ["sh", "-c", "npm run build && npm start"]
deploymentTarget = "cloudrun"

[[ports]]
localPort = 5000
externalPort = 80
```

## Installation Steps

### 1. Initial Setup

```bash
# Install dependencies
npm install

# Run database migrations
npm run db:push

# (Optional) Seed initial data
npm run db:seed
```

### 2. Database Configuration

Ensure your Neon PostgreSQL database is set up:

1. Create a database on [Neon](https://neon.tech)
2. Copy the connection string
3. Add it to your `.env` file as `DATABASE_URL`
4. Run migrations: `npm run db:push`

### 3. Build for Production

```bash
# Build client and server
npm run build

# Start production server
npm start
```

## Replit-Specific Configuration

### File Storage

The application uses local file storage for:
- Product images: `attached_assets/products/`
- LTA documents: `attached_assets/lta-documents/`

**Note**: Replit has limited persistent storage. For production, consider:
- AWS S3
- Cloudflare R2
- Azure Blob Storage

### Session Storage

Sessions are stored in PostgreSQL using `connect-pg-simple`. This ensures sessions persist across Replit container restarts.

### Development vs Production

**Development** (Replit IDE):
```bash
npm run dev
```
- Hot reload enabled
- Development logging
- Source maps available

**Production** (Replit Deployment):
```bash
npm start
```
- Optimized builds
- Production logging
- No source maps

## Mobile Features on Replit

The mobile-first features work seamlessly on Replit:

1. **Responsive Design**: Automatically adapts to screen size
2. **Touch Support**: Full touch event handling
3. **PWA Ready**: Can be installed as a web app on mobile devices
4. **Performance**: Optimized for mobile networks

### Testing Mobile Features

On Replit, test mobile features using:

1. **Browser DevTools**:
   - Open Chrome DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Select mobile device preset

2. **Real Device Testing**:
   - Share your Replit app URL
   - Open on actual mobile device
   - Test touch interactions, navigation, and cart

3. **Responsive Breakpoints**:
   - Mobile: < 768px (md breakpoint)
   - Tablet: 768px - 1024px
   - Desktop: > 1024px

## Common Issues and Solutions

### Issue: "Cannot connect to database"
**Solution**: 
- Verify `DATABASE_URL` in `.env`
- Check Neon database is active
- Ensure SSL mode is enabled

### Issue: "Session not persisting"
**Solution**:
- Verify `SESSION_SECRET` is set
- Check PostgreSQL session table exists
- Clear browser cookies and retry

### Issue: "Images not loading"
**Solution**:
- Verify `attached_assets` directory exists
- Check file permissions
- Ensure image paths are correct

### Issue: "Mobile components not showing"
**Solution**:
- Clear browser cache
- Verify screen width < 768px
- Check responsive class names (md:hidden)

### Issue: "Build fails on Replit"
**Solution**:
```bash
# Clear node_modules and rebuild
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

## Performance Optimization

### 1. Enable Compression

The server automatically enables gzip compression for:
- HTML responses
- JSON API responses
- Static assets

### 2. Image Optimization

Recommended image formats:
- WebP for product images (with JPG fallback)
- Maximum size: 5MB
- Recommended dimensions: 800×800px

### 3. Caching Strategy

Static assets are cached for:
- Client bundle: 1 year
- Images: 30 days
- API responses: Cache-Control headers

### 4. Mobile Performance

Mobile optimizations:
- Lazy loading for product images
- Virtualized lists for large catalogs
- Debounced search inputs
- Optimized animations (transform/opacity only)

## Monitoring and Logging

### Server Logs

View logs in Replit console:
```bash
# Development
npm run dev

# Production
npm start
```

### Error Logging

Errors are logged to `server/error-logger.ts`:
- Request errors
- Database errors
- Authentication failures
- File upload errors

### Performance Monitoring

Monitor key metrics:
- Response times (logged per request)
- Database query performance
- Memory usage
- Active sessions

## Security Best Practices

### 1. Environment Variables

Never commit:
- Database credentials
- Session secrets
- API keys
- Email passwords

### 2. Session Security

Configure sessions securely:
```typescript
{
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // HTTPS only
    httpOnly: true, // No client-side access
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  }
}
```

### 3. File Upload Security

Validate uploads:
- File type checking
- Size limits (5MB for images, 10MB for documents)
- Sanitize filenames
- Scan for malware (if possible)

### 4. SQL Injection Prevention

Using Drizzle ORM prevents SQL injection:
- Parameterized queries
- Type-safe schema
- Prepared statements

## Backup and Recovery

### Database Backups

Neon provides automatic backups. Additional steps:

```bash
# Export database
npm run db:backup

# Restore from backup
npm run db:restore backup_file.sql
```

### File Backups

Backup attached assets regularly:
```bash
# Create archive
tar -czf assets_backup.tar.gz attached_assets/

# Restore from archive
tar -xzf assets_backup.tar.gz
```

## Scaling Considerations

### Horizontal Scaling

For high traffic:
1. Use external object storage (S3, R2)
2. Implement Redis for session storage
3. Add load balancer
4. Deploy multiple Replit containers

### Database Scaling

Neon PostgreSQL autoscales:
- Automatic connection pooling
- Read replicas for queries
- Serverless architecture

### CDN Integration

For better mobile performance:
1. Serve static assets via CDN
2. Cache API responses at edge
3. Optimize image delivery

## Deployment Checklist

Before deploying to production:

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Initial data seeded (if needed)
- [ ] Production build tested locally
- [ ] Mobile features tested on real devices
- [ ] Error logging configured
- [ ] Backup strategy in place
- [ ] Session storage configured
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Performance monitoring setup
- [ ] Documentation updated

## Support Resources

- **Project Documentation**: See `replit.md`, `MOBILE_FEATURES.md`, `design_guidelines.md`
- **Replit Documentation**: [docs.replit.com](https://docs.replit.com)
- **Neon Documentation**: [neon.tech/docs](https://neon.tech/docs)
- **Troubleshooting**: Check `server/error-logger.ts` for detailed errors

## Continuous Deployment

### Git Integration

1. Connect Replit to GitHub repository
2. Enable auto-deploy on push to main branch
3. Configure build command: `npm run build`
4. Set start command: `npm start`

### Environment-Specific Configs

Use different configurations per environment:

```javascript
// config.ts
export const config = {
  development: {
    apiUrl: 'http://localhost:5000',
    debug: true
  },
  production: {
    apiUrl: process.env.API_URL,
    debug: false
  }
}[process.env.NODE_ENV];
```

## Mobile-Specific Deployment Notes

### PWA Configuration

The app can be installed as a PWA. To enable:

1. Create `manifest.json` in `client/public/`:
```json
{
  "name": "Al Qadi Client Portal",
  "short_name": "Al Qadi",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/logo.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

2. Add service worker (optional)

### Mobile Testing URLs

Share these URLs for mobile testing:
- Production: `https://your-repl.replit.app`
- Development: Share via Replit's device preview

### Mobile Performance Targets

Ensure these metrics on mobile:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Mobile Score: > 90

## Conclusion

This deployment guide covers the essentials for running the Al Qadi Client Portal on Replit, with special attention to mobile features and performance. For detailed feature documentation, see:
- `MOBILE_FEATURES.md` - Mobile components and utilities
- `design_guidelines.md` - Design system and patterns
- `replit.md` - System architecture overview
