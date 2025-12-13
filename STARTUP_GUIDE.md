# ContractConnect Platform - Startup Guide

## Quick Start

### Option 1: Automated (Easiest)
Double-click: `start.bat` in the project folder

This will:
- Start the dev server automatically
- Open the platform in your browser
- Keep the server running

### Option 2: Manual Start via Terminal

```bash
cd C:\Users\CSS\OneDrive\Desktop\CSS\supplier-diversity
npm run dev
```

Then visit: **http://localhost:3001**

---

## What's New

### ✅ NACIS Updated
All references changed from NACE → NACIS throughout the platform

### ✅ Mobile-Friendly (App-Like)
- **Responsive Design**: Perfect on phone, tablet, and desktop
- **Mobile Navigation**: Hamburger menu for smaller screens  
- **Touch-Optimized**: Large tap targets, readable text sizes
- **Mobile-First Layout**: Stacked on mobile, side-by-side on desktop
- **App-Like UI**: Sticky navigation, optimized spacing, mobile messaging interface

### 📱 Works Great On:
- iPhone/Android phones (portrait & landscape)
- Tablets (iPad, etc.)
- Desktop browsers
- Any modern smartphone browser

---

## Platform Features

### 🏠 Homepage
- Mobile hamburger menu
- Hero section with search (responsive)
- "How It Works" for contractors & procurement officers
- Platform features showcase
- Call-to-action buttons

### 👷 Contractor Directory
- Filter by NACIS code, location, rating
- Mobile-optimized contractor cards
- Responsive grid layout

### 📋 Opportunities
- Browse or post opportunities
- Mobile tab interface
- Responsive opportunity cards with key details

### 💬 Messages
- Mobile-optimized messaging interface
- Toggle between conversation list and chat view on mobile
- Professional message threading

### 📅 Events
- Event listings and registration

---

## Access On Phone

**From Your Phone (on same WiFi network):**
1. Find your computer's IP address (Command Prompt: `ipconfig` - look for IPv4)
2. Visit: `http://<YOUR_IP>:3001`

**Example:** `http://192.168.1.100:3001`

---

## Troubleshooting

### Server Won't Start
- Make sure you're in the correct directory
- Check if port 3001 is already in use
- Try: `netstat -ano | findstr :3001`

### Can't Access localhost:3001
- Try `http://127.0.0.1:3001` instead
- Make sure npm run dev completed startup (wait 10-15 seconds)
- Check Windows Firewall isn't blocking Node.js

### Mobile Access Issues
- Make sure phone and computer are on same network
- Use IP address instead of localhost
- Check firewall settings

---

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)

---

## Next Steps
Once running, your client can:
- View the platform on their phone
- Test the responsive design
- Navigate all pages
- Try the messaging interface
- Browse contractor profiles
- Check opportunity listings

Enjoy! 🚀
