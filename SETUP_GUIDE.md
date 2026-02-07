# Dharma Calendar 2026 - Setup Guide

## ✅ Kya-Kya Ho Gaya (What's Done)

### 1. **LongCat API Integration**

- ✅ API key configured: `ak_2Dp0mF5mT5Vp4YQ0Zh5vD6mA9HU9L`
- ✅ Created `longcatService.ts` for Panchang data aur spiritual chatbot
- ✅ Uses LongCat-Flash-Chat for Panchang
- ✅ Uses LongCat-Flash-Thinking-2601 for deep spiritual guidance

### 2. **Hinglish UI**

- ✅ All text ab Hinglish mein hai (English + Hindi mix)
- ✅ Notifications, buttons, labels sab updated
- ✅ Natural bilingual experience

### 3. **PWA Support (No APK Needed)**

- ✅ Works like an app on Android & iOS
- ✅ Install directly from browser
- ✅ Offline enabled by default

### 4. **2026 Festival Data**

- ✅ **Complete 2026 Hindu festival calendar** (100+ festivals)
- ✅ **All 12 months covered** - January to December
- ✅ **24 Ekadashi dates** throughout the year
- ✅ **12 Monthly Shivaratri** + Maha Shivaratri
- ✅ **12 Purnima** (Full Moon) dates
- ✅ **12 Amavasya** (New Moon) dates
- ✅ Major festivals: Holi, Diwali, Navratri, Janmashtami, Ganesh Chaturthi, etc.
- ✅ Regional festivals: Hanuman Jayanti, Guru Purnima, Raksha Bandhan, etc.

## 🚀 Kaise Chalaye (How to Run)

### **Option 1: Web App (Browser mein)**

```bash
npm install --legacy-peer-deps
npm run dev
```

Then open: http://localhost:3000

### **Option 2: Install as App (PWA)**

**Android (Chrome):**

1. Chrome mein open karein: `http://localhost:3000`
2. "Install App" button par click karein (Top Right)
3. Ya fir: Menu (⋮) → "Install app"

**iOS (Safari):**

1. Safari mein open karein
2. Share button click karein
3. "Add to Home Screen" select karein

**Desktop (Chrome/Edge):**

1. Omnibox (URL bar) mein install icon dikhega
2. Click karke install karein

## 📱 Features

### **Offline First**

- Pura calendar offline kaam karta hai
- 2026 ka complete festival data pre-loaded
- Internet sirf AI features ke liye chahiye

### **AI-Powered**

- **Panchang**: Daily Tithi, Nakshatra, Yoga, Karana
- **Spiritual Bot**: Ask anything about Hindu festivals, rituals, significance
- **Smart Notifications**: Festival reminders with sound

### **Hinglish Interface**

- Natural mix of Hindi aur English
- Easy to understand for Indian users
- Devanagari script support for festival names

## 🔧 Configuration

### **API Key Update**

File: `.env.local`

```
LONGCAT_API_KEY=ak_2Dp0mF5mT5Vp4YQ0Zh5vD6mA9HU9L
```

## 📦 File Structure

```
├── App.tsx                    # Main app (Hinglish UI)
├── services/
│   ├── festivalService.ts     # 2026 festival data
│   └── longcatService.ts      # LongCat API integration
├── components/
│   ├── FestivalCard.tsx
│   ├── NotificationPanel.tsx
│   └── SpiritualBot.tsx
├── .env.local                 # API key
├── capacitor.config.json      # Android config
└── package.json
```

## 🎯 Next Steps

1. **Test karo**: `npm run dev` se web app test karo
2. **Install karo**: Browser se "Install App" try karo
3. **Offline Check**: Internet off karke refresh karo
4. **Deploy karo**: Vercel/Netlify par host karo for public access

## 💡 Tips

- **Free Quota**: 500,000 tokens/day free hai LongCat API ka
- **Offline Mode**: Internet na ho tab bhi calendar kaam karega
- **Notifications**: Browser/Android permissions enable karna padega
- **Sound**: Temple bell aur chime sounds included hai

## 🐛 Troubleshooting

**npm install fail ho raha hai?**

```bash
npm install --legacy-peer-deps --force
```

**API not working?**

- `.env.local` file check karo
- API key correct hai ya nahi verify karo
- Internet connection check karo

---

**Made with ❤️ for Hindu Festival Tracking in 2026**
