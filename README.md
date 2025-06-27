# 📊 Expense Tracker & Receipt Scanner (GCP Powered)

This is a cloud-based **smart expense tracker** that uses OCR and AI to scan receipts (paper or digital), extract key data (amount, date, merchant, etc.), and store everything in a centralized dashboard for analytics and budgeting.

> 🚀 Built as a full-stack cloud-native project using Google Cloud Platform (GCP) services.

---

## 🔧 Features

- 📷 Upload receipts (JPG, PNG, PDF)
- 🧠 Automatically extract data using **Google Document AI**
- ☁️ Store receipt files in **Google Cloud Storage**
- 🔐 User authentication with **Firebase Authentication**
- 📊 View structured expense data in real-time using **Firestore**
- 📈 Visualize monthly spending, category-wise charts (coming soon)
- 🌐 Frontend built with **React + Tailwind CSS**
- 🧩 Backend on **Cloud Run** using Express.js
- ☁️ Auto-trigger backend via **Cloud Functions**

---

## ☁️ Cloud Services Used (Google Cloud Platform)

| GCP Service                  | Purpose |
|-----------------------------|---------|
| **Cloud Storage (GCS)**     | Store uploaded receipt images |
| **Document AI**             | OCR + entity extraction from receipts |
| **Firestore**               | Real-time NoSQL database for structured expense data |
| **Cloud Functions**         | Trigger on new file in GCS, extract + process using Document AI |
| **Cloud Run**               | Host Express.js backend API for frontend |
| **Firebase Authentication** | Handle user sign up/login & restrict access |

---

## ⚙️ Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Cloud Deployment:** Google Cloud Run
- **OCR & Parsing:** Document AI (pre-trained receipt model)
- **Database:** Firestore
- **Storage:** Google Cloud Storage
- **Authentication:** Firebase Auth (email/password or Google login)
- **Misc:** Git, GitHub, VS Code, Google Cloud Shell

---

## 📁 Folder Structure
receipt-dashboard/
├── backend/ # Express backend for Cloud Run
│ └── index.js # Handles receipt upload, data APIs
├── cloud-function/ # Cloud Function to process GCS triggers
│ └── index.js # Invokes Document AI and saves to Firestore
├── src/ # React frontend
│ ├── components/ # Auth, Dashboard, Upload components
│ └── firebase.js # Firebase config
├── public/
└── README.md


---

## 🚀 How It Works

1. User logs in via Firebase Auth
2. Uploads a receipt (image)
3. Image is stored in Google Cloud Storage
4. A Cloud Function is triggered on file upload
5. Function sends the file to Document AI
6. Extracted fields are saved in Firestore with the user's UID
7. React dashboard fetches and displays expenses filtered by UID

---

## 🔐 Auth & Security

- Authenticated users only can upload/view their receipts
- All receipts tagged with UID
- Firestore rules ensure data isolation per user

---

## 🧪 Future Enhancements

- Add manual expense input
- Budget alerts & savings insights
- Export data as CSV
- PWA Support for mobile

---

## 👩‍💻 Author

**Nidhi Bhawari**  
[GitHub: @Anomaly28](https://github.com/Anomaly28)  
Project developed as part of Cloud Computing learning on GCP.

---

## 📝 License

MIT License


