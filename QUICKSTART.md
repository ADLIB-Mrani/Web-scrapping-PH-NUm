# Quick Start Guide

## 🚀 Installation (5 minutes)

1. **Download the extension**
   ```bash
   git clone https://github.com/ADLIB-Mrani/Web-scrapping-PH-NUm.git
   cd Web-scrapping-PH-NUm
   ```

2. **Install in Chrome/Edge**
   - Open: `chrome://extensions/`
   - Enable: "Developer mode"
   - Click: "Load unpacked"
   - Select: This folder

3. **You're ready!** 🎉

## 📱 Usage (3 steps)

1. **Open WhatsApp Web** → Go to https://web.whatsapp.com
2. **Click a group** → Open group info (click group name)
3. **Extract numbers** → Click extension icon → "Extract Numbers"

## 💾 Export Options

- **📋 Copy All** - Copy to clipboard
- **📄 Export CSV** - Download spreadsheet
- **📦 Export JSON** - Download structured data

## 🎨 Extension Preview

```
┌─────────────────────────────────────┐
│  📱 WhatsApp Phone Scraper         │
│  Extract phone numbers from groups  │
├─────────────────────────────────────┤
│                                     │
│  How to use:                        │
│  1. Open a WhatsApp group          │
│  2. Click on the group name        │
│  3. Click "Extract Numbers"        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   Extract Numbers           │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   Open Group Info           │   │
│  └─────────────────────────────┘   │
│                                     │
│  ✅ Successfully extracted 25      │
│     phone number(s)!               │
│                                     │
│  Extracted Numbers (25)            │
│  ┌─────────────────────────────┐   │
│  │ +33612345678               │   │
│  │ +1234567890                │   │
│  │ +447123456789              │   │
│  │ ...                        │   │
│  └─────────────────────────────┘   │
│                                     │
│  [📋 Copy] [📄 CSV] [📦 JSON]      │
│                                     │
├─────────────────────────────────────┤
│ ⚠️ Make sure you're on WhatsApp Web│
└─────────────────────────────────────┘
```

## 📋 Example Output

### JSON Format
```json
{
  "extracted_at": "2026-02-10T09:00:00.000Z",
  "count": 3,
  "phone_numbers": [
    "+33612345678",
    "+1234567890",
    "+447123456789"
  ]
}
```

### CSV Format
```csv
Phone Number
+33612345678
+1234567890
+447123456789
```

## 🔐 Privacy & Security

✅ **100% Local** - No data sent to servers  
✅ **Open Source** - Verify the code yourself  
✅ **Secure** - 0 CodeQL vulnerabilities  
✅ **Minimal Permissions** - Only WhatsApp Web access  

## ⚠️ Important Notes

- Only works on WhatsApp Web (not mobile)
- Requires international format numbers (+XX...)
- Must have group info panel open
- Extracts visible participants only

## 🐛 Troubleshooting

**No numbers found?**
- Make sure group info is open
- Check participants are visible
- Try clicking "Open Group Info" first

**Extension not working?**
- Refresh WhatsApp Web page
- Reload extension in chrome://extensions/
- Check you're on https://web.whatsapp.com

## 📚 More Info

- Full README: [README.md](README.md)
- Testing Guide: [TESTING.md](TESTING.md)
- Installation Guide: Open `installation.html` in browser

## 🎯 Support

Found a bug? Have a suggestion?  
Open an issue on GitHub!

---

**Made with ❤️ for the community**
