# Professional Portfolio Website

A modern, fully responsive portfolio website with dark/light mode, smooth animations, and all essential sections.

## ✨ Features

- 🎨 Modern UI with gradient animations
- 🌓 Dark/Light mode with theme persistence
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Smooth scroll navigation
- 🎭 Framer Motion animations
- 💼 Professional sections (Hero, About, Skills, Projects, Experience, Education, Contact)
- 📧 Contact form
- 🔗 Social media integration
- 📄 Resume download functionality

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📋 Requirements Completed

✅ Responsive navigation bar with dark/light mode toggle  
✅ Professional designation and photo display  
✅ Resume download button  
✅ Social media links (GitHub, LinkedIn, Twitter, Facebook)  
✅ Detailed About Me section  
✅ Skills section with visual progress bars  
✅ Educational qualifications timeline  
✅ Professional experience section  
✅ 3+ Projects with detailed modal view  
✅ Contact information (Email, Phone, WhatsApp)  
✅ Professional footer  
✅ Fully responsive design  

## 🎨 Color Scheme

**Dark Mode:**
- Background: #323647
- Text: #eef4f7
- Action: #dbb97b
- Paragraph: #bfc2c7

**Light Mode:**
- Background: #f9fafb
- Text: #0f172b
- Action: #dbb97b

## 📝 Customization

See `SETUP_INSTRUCTIONS.md` for detailed customization guide.

Quick customization files:
- `src/components/Hero.jsx` - Personal info, photo, resume
- `src/components/About.jsx` - About me content
- `src/components/Skills.jsx` - Skills and levels
- `src/components/Projects.jsx` - Project details
- `src/components/Experience.jsx` - Work experience
- `src/components/Education.jsx` - Education details
- `src/components/Contact.jsx` - Contact information

## 🛠️ Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- Framer Motion
- Lucide React Icons
- React Router DOM

## 📦 Project Structure

```
src/
├── components/
│   ├── Header.jsx       # Navigation bar
│   ├── Hero.jsx         # Hero section
│   ├── About.jsx        # About section
│   ├── Skills.jsx       # Skills section
│   ├── Projects.jsx     # Projects section
│   ├── Experience.jsx   # Experience section
│   ├── Education.jsx    # Education section
│   ├── Contact.jsx      # Contact section
│   └── Footer.jsx       # Footer
├── pages/
│   └── Home.jsx         # Home page
├── App.jsx              # Main app component
└── index.css            # Global styles
```

## 🚀 Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload 'dist' folder to Netlify
```

## 📄 License

MIT License - feel free to use this for your personal portfolio!

## 🎉 Ready to Use

This portfolio is production-ready. Just customize the content with your information and deploy!
