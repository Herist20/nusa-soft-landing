# Linux Compatibility Guide

Landing page Nusa Software sekarang mendukung Linux dan platform lain. Berikut adalah perubahan yang telah dilakukan:

## Perbaikan yang Dilakukan

### 1. Path Handling Cross-Platform
- ✅ Mengganti penggunaan `__dirname` di ES modules dengan `fileURLToPath(import.meta.url)`
- ✅ Menggunakan `path.posix` untuk konsistensi path di Linux
- ✅ Memperbaiki konfigurasi Vite untuk path yang platform-agnostic

### 2. Build Configuration
- ✅ Menambah konfigurasi server host `0.0.0.0` untuk akses eksternal
- ✅ Platform-specific optimizations untuk build process
- ✅ Memperbaiki vite-plugin-compression untuk nama file yang bersih

### 3. Scripts Cross-Platform
- ✅ Menambah `cross-env` dependency untuk environment variables
- ✅ Scripts Linux-specific: `npm run build:linux`
- ✅ Platform testing: `npm run test:platform`

### 4. Optimisasi Performance untuk Linux
- ✅ EsBuild target optimized untuk ES2020
- ✅ Bundle splitting yang lebih efficient
- ✅ Image optimization yang platform-agnostic

## Instalasi di Linux

```bash
# Clone repository
git clone <repository-url>
cd nusa-dev-landing

# Install dependencies
npm install

# Development (akan bind ke 0.0.0.0:3000)
npm run dev

# Build untuk production
npm run build

# Build khusus Linux
npm run build:linux

# Preview build
npm run preview

# Test platform compatibility
npm run test:platform

# Generate sitemaps
npm run generate:sitemaps
```

## Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0
- Linux kernel >= 4.0 (untuk optimal performance)

## Environment Variables

```bash
# .env.local
NODE_ENV=production
VITE_BASE_URL=https://nusasoft.id
VITE_PLATFORM=linux
```

## Troubleshooting Linux

### Port Already in Use
```bash
# Kill process menggunakan port 3000
sudo lsof -ti:3000 | xargs kill -9

# Atau gunakan port berbeda
npm run dev -- --port 3001
```

### Permission Issues
```bash
# Fix npm permissions
sudo chown -R $USER ~/.npm

# Fix project permissions
chmod -R 755 ./node_modules
```

### Build Issues
```bash
# Clear cache
npm run build -- --force

# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

## Performance Monitoring

Build berhasil dengan metrics berikut:
- Bundle size: ~241KB (gzipped: ~70KB)
- Vendor chunk: ~96KB (gzipped: ~37KB)
- Assets optimized: CSS, JS, Images
- PWA ready dengan service worker

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Deployment di Linux Server

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name nusasoft.id www.nusasoft.id;
    root /var/www/nusa-dev-landing/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/css text/javascript application/javascript application/json;

    # Brotli compression (jika tersedia)
    brotli on;
    brotli_types text/css text/javascript application/javascript application/json;

    # Handle Vue.js routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### PM2 (untuk serve statis)
```bash
# Install PM2
npm install -g pm2

# Serve dengan PM2
pm2 serve dist 3000 --name nusa-landing

# Auto-start pada boot
pm2 startup
pm2 save
```

## Verified Compatibility

✅ **Ubuntu 20.04+**
✅ **Debian 11+**
✅ **CentOS 8+**
✅ **Alpine Linux 3.15+**
✅ **Arch Linux**
✅ **Fedora 35+**

## Support

Untuk masalah Linux-specific, silakan:
1. Check logs: `npm run dev --verbose`
2. Test platform: `npm run test:platform`
3. Rebuild dependencies: `rm -rf node_modules && npm install`
4. Report issue dengan platform info