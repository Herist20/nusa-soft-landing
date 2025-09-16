# Nusa Software Landing Page

A professional landing page for web and mobile app development services built with Vue.js 3, Tailwind CSS, and EmailJS.

## 🚀 Features

- **Modern Design**: Clean, professional aesthetic with smooth animations
- **Fully Responsive**: Mobile-first design that works on all devices
- **Vue.js 3**: Built with Composition API for better performance
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **EmailJS Integration**: Contact form with email functionality
- **Smooth Scrolling**: Navigation with smooth scroll to sections
- **Interactive Components**: Modal dialogs, cards, and buttons
- **SEO Ready**: Optimized structure for search engines

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── Navigation.vue
│   ├── sections/
│   │   ├── Hero.vue
│   │   ├── Services.vue
│   │   ├── Portfolio.vue
│   │   ├── About.vue
│   │   ├── Process.vue
│   │   └── Contact.vue
│   └── ui/
│       ├── Button.vue
│       ├── Card.vue
│       └── Modal.vue
├── views/
│   └── Home.vue
├── router/
│   └── index.js
├── utils/
│   └── emailjs-config.js
├── assets/
├── App.vue
├── main.js
└── style.css
```

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/nusa-software-landing.git
cd nusa-software-landing
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure EmailJS**
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create an email service (Gmail, Outlook, etc.)
   - Create an email template with these variables:
     - `from_name`
     - `from_email`
     - `subject`
     - `service`
     - `message`
   - Get your Service ID, Template ID, and Public Key
   - Update `src/utils/emailjs-config.js` with your credentials

4. **Run the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```js
colors: {
  primary: '#3B82F6',   // Blue
  secondary: '#10B981', // Green
  accent: '#F59E0B',    // Orange
}
```

### Fonts
The project uses Inter and Poppins fonts. You can change them in:
- `tailwind.config.js` for the font family configuration
- `src/style.css` for the font imports

### Content
Update the content in each section component:
- Company info: `src/components/sections/Hero.vue`
- Services: `src/components/sections/Services.vue`
- Portfolio: `src/components/sections/Portfolio.vue`
- About: `src/components/sections/About.vue`
- Contact info: `src/components/sections/Contact.vue`

## 📧 EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Add your email service provider
3. Create an email template
4. Update the configuration in `src/utils/emailjs-config.js`

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Vercel
1. Connect your GitHub repository
2. Vercel will automatically build and deploy

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 Technologies Used

- **Vue.js 3** - Progressive JavaScript Framework
- **Vite** - Next Generation Frontend Tooling
- **Tailwind CSS** - Utility-First CSS Framework
- **Vue Router** - Official Router for Vue.js
- **EmailJS** - Email Service for JavaScript
- **PostCSS** - Tool for Transforming CSS
- **Autoprefixer** - PostCSS Plugin for Vendor Prefixes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Contact

For any questions or support, please contact:
- Email: hello@nusasoftware.com
- Phone: +62 812-3456-7890
- Website: [nusasoftware.com](https://nusasoftware.com)

---

Made with ❤️ by Nusa Software Team
