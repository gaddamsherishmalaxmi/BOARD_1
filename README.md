# Board. - Analytics & Management Dashboard

A high-fidelity React + Vite replica of the **Board.** 2-screen dashboard design, featuring Google Authentication, KPI metric cards, interactive Activities charts, Top Products donut breakdown, and Executive Schedule management.

---

## 🚀 How to Run in Visual Studio Code (VS Code)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version **18.0.0** or higher) and **npm** installed on your computer.

Verify installation in your terminal:
```bash
node -v
npm -v
```

---

### Step 1: Open the Project in VS Code
1. Open **Visual Studio Code**.
2. Click **File > Open Folder...** (or press `Ctrl+K Ctrl+O` on Windows/Linux, `Cmd+O` on macOS).
3. Select this project root folder (the folder containing `package.json`).

---

### Step 2: Open the Integrated Terminal
Open the terminal inside VS Code:
- Press `` Ctrl + ` `` (or `Cmd + \`` on macOS)
- Or click **Terminal > New Terminal** from the top menu.

---

### Step 3: Install Dependencies
Run the following command in the VS Code terminal to install all required packages:

```bash
npm install
```

---

### Step 4: Start the Development Server
Run:

```bash
npm run dev
```

You will see output similar to:
```text
  VITE v8.3.0  ready in 250 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://0.0.0.0:3000/
  ➜  press h + enter to show help
```

---

### Step 5: View the App in Your Browser
- Hold `Ctrl` (or `Cmd` on macOS) and click `http://localhost:3000` in the terminal.
- Or open your browser and navigate to:
  ```
  http://localhost:3000
  ```

---

## 🛠️ Available npm Scripts

| Script | Command | Description |
|---|---|---|
| **Development** | `npm run dev` | Starts Vite dev server with hot module reloading on port 3000 |
| **Production Build** | `npm run build` | Compiles and bundles TypeScript & Tailwind into `dist/` |
| **Preview Build** | `npm run preview` | Previews the production build locally |
| **TypeScript Lint** | `npm run lint` | Runs TypeScript compiler checks without emitting files (`tsc --noEmit`) |

---

## 📱 Features & Highlights

1. **Screen 1: Sign In & Authentication**
   - Split layout with bold black `Board.` branding hero.
   - **Google Sign-In**: Interactive Google Account Chooser with preset accounts (`tnithinbabu@gmail.com` or custom Google login).
   - Apple Sign-In and Email/Password Sign-In/Register toggle with instant validation.
   - Session persistence in browser `localStorage`.

2. **Screen 2: Analytics Dashboard**
   - **Curved Black Sidebar**: Distinctive `rounded-[30px]` dark sidebar with tabs (*Dashboard, Transactions, Schedules, Users, Settings*) and mobile slide-over drawer.
   - **4 KPI Metric Cards**:
     - *Total Revenues* (`$2,129,430`) in Soft Green (`#DDEFE0`)
     - *Total Transactions* (`1,520`) in Soft Sand (`#F4ECDD`)
     - *Total Likes* (`9,721`) in Soft Rose (`#EFDADA`)
     - *Total Users* (`892`) in Soft Lavender (`#DEE0EF`)
   - **Activities Chart**: Responsive SVG multi-line/bar chart for *Guest* (`#E9A0A0`) and *User* (`#9BDD7C`) with hover tooltips and dynamic date filters (*May - June 2021*).
   - **Top Products Donut Chart**: Visual distribution (*Basic Tees 55%*, *Custom Short Pants 31%*, *Super Hoodies 14%*) with center values and legends.
   - **Today's Schedule**: Accent-bordered cards for *"Meeting with suppliers from Kuta Bali"* and *"Check operation at Giga Factory 1"* with an Add Schedule modal.
   - **Axios Integration**: Centralized data service in `src/services/api.ts` with live sync and public API fallback.
   - **Reviewer Toolbar**: Top floating toolbar to instantly toggle between Screen 1 and Screen 2 during evaluation.

---

## 📂 Project Structure

```text
├── index.html               # Main HTML entry with Montserrat & Lato Google fonts
├── package.json             # Scripts & dependencies (React 19, Vite, Tailwind v4, Axios)
├── jsconfig.json            # JavaScript project configuration
├── vite.config.js           # Vite + Tailwind plugin config in JavaScript
├── src/
│   ├── main.jsx             # React DOM root entry (JS)
│   ├── index.css            # Tailwind CSS & typography utilities
│   ├── App.jsx              # Root coordinator & 2-screen navigation switcher (JSX)
│   ├── services/
│   │   └── api.js           # Axios client for fetching dashboard data (JS)
│   ├── context/
│   │   └── AuthContext.jsx  # Google Auth & session management (JSX)
│   └── components/
│       ├── SignInScreen.jsx     # Screen 1: Sign In & Registration (JSX)
│       ├── DashboardScreen.jsx  # Screen 2: Board. Analytics Dashboard (JSX)
│       ├── GoogleAuthModal.jsx  # Interactive Google Account Chooser (JSX)
│       ├── Navbar.jsx           # Top header bar (Search, Bell, Sync, Avatar) (JSX)
│       ├── Sidebar.jsx          # Curved black navigation sidebar (JSX)
│       ├── MetricCards.jsx      # 4 Pastel KPI stat cards (JSX)
│       ├── ActivitiesChart.jsx  # Activities spline/bar SVG chart (JSX)
│       ├── TopProductsCard.jsx  # Top products donut SVG chart (JSX)
│       └── ScheduleCard.jsx     # Today's schedule with left accents (JSX)
```
