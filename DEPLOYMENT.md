# Claude Code Component Library - Deployment

## Live Demo
🚀 **Auto-deployed on**: [Netlify](https://netlify.com) (URL will be provided after setup)

## Deployment Configuration

### Netlify Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18
- **Auto-Deploy**: Enabled on every commit to `main` branch

### Build Process
1. Netlify detects commits to the GitHub repository
2. Automatically triggers build using `npm run build`
3. Vite builds the React application to `/dist` folder
4. Netlify serves the static files with SPA routing support

### Environment
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design tokens
- **Storage**: localStorage (client-side persistence)
- **Routing**: SPA with client-side routing support

### Features Available in Production
- ✅ Interactive component library
- ✅ Live component previews
- ✅ Code viewing with syntax highlighting
- ✅ Component status editing
- ✅ Search and filtering
- ✅ Component management (add, delete, download)
- ✅ Design system integration
- ✅ Responsive design

### Performance Optimizations
- **Code Splitting**: Vite automatically optimizes bundle sizes
- **Tree Shaking**: Unused code eliminated in production build
- **Asset Optimization**: Images and fonts optimized for web
- **Gzip Compression**: Netlify enables compression by default

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Support**: Responsive design works on all device sizes
- **JavaScript Required**: SPA requires JavaScript enabled

## Local Development vs Production

### Local Development
- Hot module reloading with Vite dev server
- Source maps for debugging
- Development-optimized builds

### Production Build  
- Minified and optimized code
- Production-ready assets
- Performance monitoring available

## Monitoring
- **Netlify Analytics**: Pageviews, unique visitors, bandwidth
- **Build Logs**: Available in Netlify dashboard
- **Error Tracking**: Netlify provides basic error monitoring

## Custom Domain (Optional)
- Netlify provides free subdomain: `*.netlify.app`
- Custom domain can be configured in Netlify dashboard
- SSL certificates provided automatically

## Continuous Deployment Pipeline
1. **Commit** → Push to GitHub main branch
2. **Trigger** → Netlify webhook detects changes
3. **Build** → `npm run build` executed in Netlify environment
4. **Deploy** → New version automatically deployed
5. **Live** → Updated site available immediately

Perfect for rapid iteration and testing of new Claude Code components!