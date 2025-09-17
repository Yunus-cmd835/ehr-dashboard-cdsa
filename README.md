# 🩺 EHR Dashboard – CDSA Submission

A responsive, dark-themed Electronic Health Record (EHR) dashboard built for the Clinical Dashboard Submission Assignment (CDSA). Features include modular UI, mock API integration, chart filters, clinical timeline, and centralized styling.

---

## 🚀 Live Demo

🔗 [View Dashboard](https://ehr-dashboard-cdsa.vercel.app)

Hosted on Vercel with HTTPS and optimized production build.

---

## 🧪 Postman Collection

📁 [`EHR-Mock-Collection.json`](./postman/EHR-Mock-Collection.json)

Simulated endpoints for:

- Patient Management  
- Appointment Scheduling  
- Clinical Notes  
- Billing

Includes sample requests, responses, and error cases. No live server required.

---

## 🛠️ Tech Stack

- ⚛️ Next.js 15  
- 🎨 Tailwind CSS  
- 📊 Chart.js  
- 🧠 Zustand  
- 🌙 Dark Mode  
- 🧩 Modular Components  
- 🧪 Postman Mock API

---

## 📦 Features

- 📈 Metric Cards with CountUp animation  
- 📊 Chart Filters (date range, type)  
- 🧬 Clinical Timeline with notes and vitals  
- 🧠 Zustand-based global state  
- 🧼 Centralized dark theme styling  
- 🔐 Credentials input field (mocked)  
- 📄 Postman API simulation  
- 📁 Documentation package included

---
ehr-dashboard/ ├── src/ │   ├── components/ │   ├── pages/ │   ├── services/ │   ├── utils/ │   └── styles/ ├── public/ ├── postman/ │   └── EHR-Mock-Collection.json ├── README.md ├── next.config.js └── .env.local

---

## 📄 Setup Instructions

```bash
git clone https://github.com/Yunus-cmd835/ehr-dashboard-cdsa.git
cd ehr-dashboard-cdsa
npm install
npm run dev


Create .env.local:
NEXT_PUBLIC_API_BASE_URL=https://ehr.mock.local/api


📬 Contact
Built by Benny for CDSA submission.
For questions or feedback, reach out via GitHub.

🧠 Notes
This dashboard uses mock APIs for simulation. Real EHR credentials can be integrated with minimal changes.


## 📁 Folder Structure

