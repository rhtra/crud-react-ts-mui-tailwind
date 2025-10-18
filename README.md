# ⚡ React + TypeScript CRUD (RESTful-API.dev)

A fully responsive **CRUD (Create, Read, Update, Delete)** web app built using **React**, **TypeScript**, **Material UI (MUI)**, and **Tailwind CSS**, integrated with the free public API — [RESTful-API.dev](https://restful-api.dev/).

This project demonstrates clean architecture, reusable UI components, theming (light/dark), and modern data handling using React hooks.

---

## 🚀 Features

✅ **Modern Tech Stack**
- ⚛️ React 18 + TypeScript
- 🎨 Tailwind CSS + Material UI
- 🌗 Light / Dark Theme toggle  
- 📱 Fully responsive (mobile + desktop)

✅ **Functional CRUD**
- Read live data from [RESTful-API.dev](https://restful-api.dev/)
- Create new items dynamically
- Update and delete your own added items
- Sort items by clicking **table headers**
- Search items by name
- Original API items are read-only (disabled edit/delete)

✅ **UX Enhancements**
- Smooth hover effects
- Inline “+” button beside **Actions** header
- Confirmation dialog for deletes
- Reusable modal and dialog components
- Accessible color contrast (WCAG-friendly)

---

## 🧩 Project Structure

```bash
src/
├── components/
│   ├── common/
│   │   ├── ConfirmDialog.tsx
│   │   ├── ModalWrapper.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ThemeToggle.tsx
│   ├── layout/
│   │   └── Header.tsx
│   ├── ItemForm.tsx
│   ├── ItemList.tsx
│
├── hooks/
│   └── useItems.ts         # CRUD logic using RESTful-API.dev
│
├── service/
│   └── itemService.ts      # Business logic layer wrapping API
│
├── api/
│   └── restfulApi.ts       # RESTful-API.dev requests
│
├── types/
│   └── Item.ts             # Type definitions
│
├── App.tsx
└── main.tsx

```
---

## 🛠️ Installation & Setup

### 1️⃣ Clone this repository
```bash
git clone https://github.com/rhtra/crud-react-ts-mui-tailwind.git
cd <your folder>
```
2️⃣ Install dependencies
```bash
npm install
⚠️ If you see Node version warnings, ensure you’re using Node 20+.
```
3️⃣ Initialize TailwindCSS
If not already done:

```bash
npx tailwindcss init -p
```
4️⃣ Run the app
```bash
npm run dev
```
Then open your browser to:
http://localhost:5173

🧠 API Reference
This app uses RESTful-API.dev — a free demo API that stores data in-memory.

Example API endpoints:

GET all items → https://api.restful-api.dev/objects

POST new item → https://api.restful-api.dev/objects

PUT update item → https://api.restful-api.dev/objects/{id}

DELETE remove item → https://api.restful-api.dev/objects/{id}

Original items from the API are locked (you can’t edit or delete them).
Only newly added items via the UI can be modified.

🎨 Theming
This app supports both light 🌞 and dark 🌙 modes.

You can toggle the theme using the switch at the top-left corner.

🧰 Tech Stack
Technology	Purpose
⚛️ React	Front-end library
🧠 TypeScript	Type safety
💅 Tailwind CSS	Utility-first styling
🧩 Material UI	Components and dialogs
🌐 RESTful-API.dev	Public CRUD backend
🧱 Vite	Fast bundling and dev server

🧠 Reusable Components
Component	Description
SearchBar	Unified search field with icon
ModalWrapper	Reusable modal for Add/Edit
ConfirmDialog	Generic confirmation dialog
ThemeToggle	Light/Dark mode switch
Header	App title + Add button layout
ItemList	Sortable, responsive CRUD table

🧹 Scripts
Command	Description
npm run dev	Start development server
npm run build	Build production-ready code
npm run preview	Preview the production build
npm run lint	Run ESLint checks

🧑‍💻 Author
Arthur Buenaventura
Software Developer | Full Stack Engineer
📧 arthur.a.buenaventura@gmail.com

🪄 License
This project is open source and available under the MIT License.

