# Conference Attendance System & Barcode Generator

## Overview
This project contains two tools:

1. **Conference Attendance Application** (Electron-based)
   - Scan barcodes to mark/check attendance from an Excel list.
   - Tracks check-in and re-entry, prevents duplicate cards.
   - Data is persistent between sessions.

2. **Barcode Generator** (Web-based)
   - Generate and print barcodes for any number.
   - Simple, standalone HTML tool.

---

## 1. Attendance Application

### **Features**
- Import attendee list from Excel (`.xlsx`/`.xls`).
- Scan barcodes to check in/out attendees.
- Prevents duplicate/invalid cards.
- Remembers attendance and attendee list between sessions.
- Simple, modern UI.

### **Requirements**
- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [Git](https://git-scm.com/) (for cloning)

### **Installation & Setup**

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd barcode
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the application:**
   ```sh
   npm start
   ```

4. **Usage:**
   - Load your Excel file (first column: card number, second: name, third: role/company [optional]).
   - Scan barcodes using your scanner.
   - Attendance and attendee list are saved automatically.

### **Build a Windows EXE**

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
3. **Build:**
   ```sh
   npm run dist
   ```
   The installer will be in the `dist/` folder.

---

## 2. Barcode Generator

### **Features**
- Enter any number to generate a barcode.
- Print the barcode directly from your browser.

### **Usage**
1. Open `barcode-generator.html` in any web browser (no server needed).
2. Enter the number and click **Generate Barcode**.
3. Click **Print Barcode** to print.

---

## Project Structure

```
barcode/
  index.html              # Main Electron app UI
  main.js                 # Electron main process
  renderer.js             # Electron renderer (UI logic)
  preload.js              # Electron preload (IPC bridge)
  barcode-generator.html  # Standalone barcode generator UI
  barcode-generator.js    # Logic for barcode generator
  package.json            # Project metadata and scripts
  .gitignore              # Git ignore rules
  README.md               # This file
```

---

## Notes
- **Assets:** Place any images/logos in an `assets/` folder (ignored by git by default).
- **Data Persistence:** Attendance and attendee list are stored in your user profile (via `electron-store`).
- **Excel Format:** First row should be headers. First column: card number, second: name, third: role/company (optional).