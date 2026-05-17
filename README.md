# 2COMS Connect - "The Pulse"
### Enterprise Corporate Intranet Platform (AI-First Development)

2COMS Connect is a high-fidelity, unified corporate intranet designed to strengthen organizational culture, alignment, and engagement. Developed as a digital "social glue," it breaks silos through extreme visibility and peer recognition.

---

## 🚀 Live Deployment & Downloads
*   **Web Console (Desktop):** [https://2coms-connect-web.vercel.app](https://2coms-connect-web.vercel.app)
*   **Mobile App (PWA):** [https://2coms-connect-mobile.vercel.app](https://2coms-connect-mobile.vercel.app)
*   **Android App (APK):** [Download 2COMS_CONNECT_FINAL.apk](./2COMS_CONNECT_FINAL.apk) (Located in the root directory)

---

## 🔐 Credentials
| Role | Staff ID | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **HR Admin** | `ADMIN-2026` | `admin123` | Dashboard + Moderation + Global Publishing |
| **Employee** | `EMP-1045` | `pulse2026` | Culture Pulse + Directory + Forum + Knowledge Hub |

---

## 🛠️ Architecture & Technical Excellence
This platform was built following enterprise-grade architectural standards to ensure maintainability and scalability.

1.  **Unified Ecosystem:** Real-time cloud synchronization between Web and APK via Firebase Firestore.
2.  **Feature-Sliced Design (FSD):** Modular folder structure where logic is decoupled into functional slices (`auth`, `dashboard`, `knowledge`).
3.  **Factory Pattern (Service Layer):** All data operations are encapsulated in asynchronous `AuthService` and `ContentService` classes, simulating a production API environment.
4.  **Atomic Design:** Centralized UI atoms (Buttons, Badges, Cards) ensure 100% design consistency across the ecosystem.
5.  **Multi-Tenancy:** Dynamic visibility controls that filter content based on the user's department and role.
6.  **AI-First Workflow:** 80% of the logic was generated through iterative prompt engineering (documented in `prompts.txt`).

---

## ✨ Key Features

### **A. Alignment & Vision**
*   **Strategic Hero Card:** Interactive Management Vision with full-screen roadmap slide-ups.
*   **Engagement Ticker:** Dynamic "Next Event" countdown linked to a professional Culture Calendar.

### **B. Silo Breaker (Networking)**
*   **Expert Directory:** Search colleagues by name or specific skill tags.
*   **Instant Messenger:** Two-way message drawer for cross-functional collaboration.

### **C. Recognition & Culture**
*   **Leaderboard Podium:** High-fidelity Ranking system with Gold/Silver/Bronze podium visuals.
*   **Peer Appreciation Wall:** Dedicated kudos section on user profiles.
*   **Welcome Carousel:** Horizontal slider for new joinees with interactive "Say Welcome" actions.

### **D. Knowledge Hub & Control**
*   **Resource Vault:** Categorized document hub with real browser-triggerable downloads.
*   **Admin Console:** Mobile-first Command Center for content moderation and global announcements.
*   **Community Forum:** Threaded discussions with one-member-one-vote toggle logic.

---

## 📦 Setup & Installation (Local Development)

### **1. Web Console**
```bash
cd 2coms-connect/web-console
npm install
npm run dev
```

### **2. Mobile App**
```bash
cd 2coms-connect/mobile-app
npm install
npm run dev
```

### **3. Android APK**
The production APK is located in the root folder as `2COMS_CONNECT_FINAL.apk`. You can install it on any Android device by enabling "Install from Unknown Sources."

---

## 📜 Prompt Engineering Log
Detailed iterative prompts used to build this platform are documented in the root file: **`prompts.txt`**.

---

**Developed with ❤️ for the 2COMS 48-Hour Assessment.**
