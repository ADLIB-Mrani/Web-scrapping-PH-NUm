# WhatsApp Phone Number Scraper 📱

Une extension de navigateur web pour extraire les numéros de téléphone des groupes WhatsApp sur WhatsApp Web.

A browser extension to extract phone numbers from WhatsApp groups on WhatsApp Web.

## 🌟 Fonctionnalités / Features

- ✅ Extraction automatique des numéros de téléphone d'un groupe WhatsApp
- ✅ Interface utilisateur simple et intuitive
- ✅ Export des numéros en format CSV ou JSON
- ✅ Copie rapide dans le presse-papiers
- ✅ Compatible avec Chrome, Edge, et autres navigateurs basés sur Chromium

## 📋 Prérequis / Requirements

- Google Chrome, Microsoft Edge, ou un navigateur compatible Chromium
- Accès à WhatsApp Web (https://web.whatsapp.com)
- Un compte WhatsApp actif

## 🚀 Installation

### Option 1: Installation manuelle (Développement)

1. **Téléchargez ou clonez ce repository:**
   ```bash
   git clone https://github.com/ADLIB-Mrani/Web-scrapping-PH-NUm.git
   cd Web-scrapping-PH-NUm
   ```

2. **Ouvrez votre navigateur Chrome/Edge:**
   - Allez dans `chrome://extensions/` (ou `edge://extensions/`)
   - Activez le "Mode développeur" (Developer mode) en haut à droite
   
3. **Chargez l'extension:**
   - Cliquez sur "Charger l'extension non empaquetée" (Load unpacked)
   - Sélectionnez le dossier du projet `Web-scrapping-PH-NUm`
   
4. **L'extension est maintenant installée!** Vous verrez l'icône dans la barre d'outils.

## 📖 Utilisation / Usage

1. **Ouvrez WhatsApp Web:**
   - Allez sur https://web.whatsapp.com
   - Scannez le QR code avec votre téléphone
   
2. **Ouvrez un groupe WhatsApp:**
   - Cliquez sur un groupe dans la liste de conversations
   - Cliquez sur le nom du groupe en haut pour ouvrir les informations du groupe
   - Assurez-vous que la liste des participants est visible
   
3. **Extrayez les numéros:**
   - Cliquez sur l'icône de l'extension dans la barre d'outils
   - Cliquez sur le bouton "Extract Numbers"
   - Les numéros de téléphone seront automatiquement extraits
   
4. **Exportez les résultats:**
   - **Copier:** Cliquez sur "📋 Copy All" pour copier tous les numéros
   - **CSV:** Cliquez sur "📄 Export CSV" pour télécharger un fichier CSV
   - **JSON:** Cliquez sur "📦 Export JSON" pour télécharger un fichier JSON

## 🎯 Comment ça marche / How it works

L'extension utilise:
- **Content Script:** Injecté dans WhatsApp Web pour accéder au DOM
- **Extraction intelligente:** Détecte les numéros au format international (+XXX...)
- **Popup UI:** Interface utilisateur pour contrôler l'extraction
- **Export multiple:** Formats CSV et JSON disponibles

## 📁 Structure du projet / Project Structure

```
Web-scrapping-PH-NUm/
├── manifest.json       # Configuration de l'extension
├── content.js          # Script d'injection pour extraire les numéros
├── popup.html          # Interface utilisateur de l'extension
├── popup.css           # Styles de l'interface
├── popup.js            # Logique de l'interface
├── icons/              # Icônes de l'extension
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md           # Ce fichier
```

## 🔒 Confidentialité / Privacy

- ✅ Aucune donnée n'est envoyée à des serveurs externes
- ✅ Toutes les opérations sont effectuées localement dans votre navigateur
- ✅ Vos numéros de téléphone restent privés
- ✅ Code source ouvert et vérifiable

## ⚠️ Avertissement / Warning

- Cette extension est destinée à un usage personnel et éducatif
- Respectez la vie privée des membres du groupe
- Utilisez cette extension de manière responsable
- Assurez-vous d'avoir la permission d'extraire les numéros

## 🛠️ Développement / Development

### Technologies utilisées:
- Manifest V3 (dernière version des extensions Chrome)
- JavaScript vanilla (pas de dépendances)
- HTML5 & CSS3

### Pour contribuer:
1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 🐛 Problèmes connus / Known Issues

Si vous rencontrez des problèmes:
- Assurez-vous d'être sur WhatsApp Web (https://web.whatsapp.com)
- Rafraîchissez la page WhatsApp Web
- Rechargez l'extension dans `chrome://extensions/`
- Vérifiez que les participants du groupe sont visibles

## 📝 License

Ce projet est open source et disponible sous licence MIT.

## 👤 Auteur / Author

ADLIB-Mrani

## 🙏 Remerciements / Acknowledgments

- Merci à tous les contributeurs
- Inspiré par le besoin de gérer facilement les contacts de groupe WhatsApp

---

**Note:** Cette extension n'est pas affiliée, associée, autorisée, approuvée par, ou de quelque manière que ce soit officiellement connectée avec WhatsApp, Meta, ou l'une de leurs filiales ou affiliées.