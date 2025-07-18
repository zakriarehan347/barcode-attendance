# Conference Attendance System & Barcode Generator

> **Professional conference attendance tracking with barcode scanning and Excel integration. Built with Electron for cross-platform desktop deployment.**

## Overview

This project contains two powerful tools for conference and event management:

1. **Conference Attendance Application** (Electron-based)
   - Scan barcodes to mark/check attendance from an Excel list.
   - Tracks check-in and re-entry, prevents duplicate cards.
   - Data is persistent between sessions.
   - Perfect for conferences, events, and meetings.

2. **Barcode Generator** (Web-based)
   - Generate and print barcodes for any number.
   - Simple, standalone HTML tool.
   - CODE128 format for maximum scanner compatibility.

---

## 🚀 Features

### Attendance System
- ✅ **Excel Integration**: Import attendee lists from `.xlsx`/`.xls` files
- ✅ **Barcode Scanning**: Compatible with most barcode scanners (Honeywell, etc.)
- ✅ **Smart Attendance Logic**: Handles check-in, re-entry, and prevents duplicates
- ✅ **Data Persistence**: Remembers attendance and attendee lists between sessions
- ✅ **Cross-Platform**: Works on Windows, macOS, and Linux
- ✅ **Modern UI**: Clean, professional interface

### Barcode Generator
- ✅ **Instant Generation**: Create barcodes for any number instantly
- ✅ **Print Ready**: Direct printing from browser
- ✅ **CODE128 Format**: Industry standard for maximum compatibility
- ✅ **Standalone**: No installation required, works in any browser

---

## 📋 Requirements

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [Git](https://git-scm.com/) (for cloning)
- Barcode scanner (optional, for attendance tracking)

---

## 🛠️ Installation & Setup

### Quick Start

1. **Clone the repository:**
   ```sh
   git clone https://github.com/zakriarehan347/barcode-attendance.git
   cd barcode-attendance
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the application:**
   ```sh
   npm start
   ```

### Usage Guide

#### Attendance Application
1. **Load Excel File**: Click "Choose File" and select your attendee list
   - **Format**: First column = card number, Second column = name, Third column = role/company (optional)
   - **Headers**: First row should contain column headers
2. **Scan Barcodes**: Use your barcode scanner to check in attendees
3. **Monitor Status**: View real-time attendance status in the table
4. **Data Persistence**: All data is automatically saved and restored on restart

#### Barcode Generator
1. **Open**: Double-click `barcode-generator.html` in any web browser
2. **Generate**: Enter a number and click "Generate Barcode"
3. **Print**: Click "Print Barcode" to print directly

---

## 📦 Building for Distribution

### Create Windows EXE

1. **Install electron-builder:**
   ```sh
   npm install --save-dev electron-builder
   ```

2. **Add build scripts to `package.json`:**
   ```json
   "scripts": {
     "start": "electron .",
     "pack": "electron-builder --dir",
     "dist": "electron-builder"
   }
   ```

3. **Build the installer:**
   ```sh
   npm run dist
   ```
   The Windows installer will be created in the `dist/` folder.

---

## 📁 Project Structure

```
barcode-attendance/
├── index.html              # Main Electron app UI
├── main.js                 # Electron main process
├── renderer.js             # Electron renderer (UI logic)
├── preload.js              # Electron preload (IPC bridge)
├── barcode-generator.html  # Standalone barcode generator UI
├── barcode-generator.js    # Logic for barcode generator
├── package.json            # Project metadata and scripts
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

---

## 🔧 Configuration

### Excel File Format
Your Excel file should have the following structure:
```
| Card Number | Name        | Role/Company |
|-------------|-------------|--------------|
| 12345       | John Doe    | Developer    |
| 67890       | Jane Smith  | Manager      |
```

### Data Storage
- **Location**: User profile directory (e.g., `%APPDATA%/barcode-attendance/`)
- **Format**: JSON files managed by `electron-store`
- **Backup**: Data persists between app restarts and updates

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Electron](https://www.electronjs.org/) for cross-platform desktop apps
- Uses [JsBarcode](https://github.com/lindell/JsBarcode) for barcode generation
- Excel parsing powered by [SheetJS](https://sheetjs.com/)
- Data persistence via [electron-store](https://github.com/sindresorhus/electron-store)

---

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/zakriarehan347/barcode-attendance/issues) page
2. Create a new issue with detailed information
3. Include your operating system and Node.js version

---

**Made with ❤️ for better conference management**