# 2COMS Connect: Project Blueprint
**Target:** Unified Enterprise Corporate Intranet Ecosystem
**Architecture:** Cloud-Synced / AI-First / Modular

---

## 1. Platform Ecosystem
The project delivers three distinct access points, all connected to a single source of truth (Firebase Cloud):
1.  **Web Console (Desktop):** Full-featured command center for employees and admins.
2.  **Mobile PWA (Browser):** Optimized cross-platform experience (iOS/Android) with 100dvh viewport locking.
3.  **Android APK (Native):** Lightweight (4MB) Capacitor-wrapped binary for native installation.

---

## 2. Core Pillars (Business Logic)

### **A. Alignment & Vision (The "Compass")**
*   **Strategic Vision Card:** Top-down leadership communication.
*   **Slide-Up Roadmaps:** Detailed Q3/Q4 transparency for organizational goals.
*   **Pulse Feed:** Real-time stream of company news and leadership messages.

### **B. Control & Moderation (The "Safety")**
*   **Admin Command Center:** Exclusive dashboard for HR/Admins.
*   **Moderation Queue:** One-click "Approve" or "Trash" logic for flagged culture content.
*   **Global Publisher:** Instant broadcast capability to reach all employees (Web + Mobile).

### **C. Silo Breaking (The "Connection")**
*   **Expert Directory:** Search-by-skill logic to find specialists instantly.
*   **Two-Way Instant Messenger:** Live chat drawers for immediate collaboration.
*   **Department Footprints:** Visibility of specific team "Project Wins."

### **D. Recognition & Gamification (The "Energy")**
*   **Leaderboard Podium:** High-fidelity Gold/Silver/Bronze visualization of top contributors.
*   **Peer Appreciation Wall:** Dedicated kudos history on every employee profile.
*   **Reaction Toggles:** One-member, one-vote logic (🚀, 🔥, 👏) on all pulse updates.

### **E. Knowledge Hub (The "Vault")**
*   **Categorized Policy Vault:** Handbooks and guides with real-time download simulation (Blobs).
*   **Media Gallery:** Visual celebrates milestones with high-fidelity lightbox previews.

---

## 3. Technical Standards (Why it Wins)

### **Enterprise-Grade Architecture**
*   **Feature-Sliced Design (FSD):** Strictly decoupled folders (`features/auth`, `features/dashboard`).
*   **Factory Pattern (Service Layer):** Asynchronous `AuthService` and `ContentService` classes manage all data, simulating a professional API environment.
*   **Atomic Design:** Centralized UI atoms (Buttons, Cards, Badges) ensure 100% style consistency.
*   **Multi-Tenancy:** Real-time filtering logic based on the user's `department` attribute.

### **Tech Stack**
*   **Frontend:** React 18, TypeScript, Tailwind CSS v4.
*   **Backend:** Firebase Firestore (Real-time Cloud Sync).
*   **Mobile Bridge:** Capacitor v6.
*   **Icons:** Lucide React.

---

## 4. Assessment Compliance Mapping

| Demand Note Keyword | Implementation Detail |
| :--- | :--- |
| **"Unified Pool"** | Both Web and APK sync to the same Firebase instance in real-time. |
| **"Two-Way Exchange"** | Forum threads, replies, and "Say Welcome" interactions. |
| **"Easily Downloadable"** | Real JavaScript Blob generation for document saves. |
| **"Clutter-free / Moderate"** | Functional Admin queue for HR content control. |
| **"Simple yet Powerful UX"** | Clutter-free 2COMS Navy UI with clear info hierarchy. |

---

**Certified by the Senior AI Architect for the 2COMS 48-Hour Challenge.**
