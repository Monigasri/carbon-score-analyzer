# 🌍 GreenCode AI  
## ML-Based Digital Carbon Emission Predictor & Optimization Platform

---

## 📌 Overview

GreenCode AI is an AI-driven sustainability intelligence platform that predicts and analyzes the carbon emissions of web applications based on architectural and usage metrics.

The platform estimates digital carbon impact, forecasts future trends, identifies key contributing factors, and enables interactive optimization planning to reduce environmental footprint.

---

## 🚨 Problem Statement

As digital infrastructure grows rapidly, web applications consume increasing energy through data transfer, server load, and resource-heavy architecture.

However, most developers and organizations:

- Do not measure digital carbon emissions  
- Lack visibility into performance-related environmental impact  
- Have no structured optimization planning tools  

GreenCode AI addresses this gap by providing intelligent carbon prediction and sustainability insights.

---

## 🎯 Objectives

- Predict carbon emissions using Machine Learning  
- Forecast future emission trends  
- Identify major contributing factors  
- Provide actionable optimization suggestions  
- Enable interactive sustainability simulation  

---

## 🧠 Machine Learning Approach

### Model Used:
RandomForestRegressor (Supervised Learning)

### Input Features:
- Page Size (MB)
- API Calls
- Number of Images
- Monthly Users
- Session Time (minutes)
- Server Response Time (ms)

### Model Outputs:
- Predicted Carbon Emission (kg/month)
- Energy Usage (kWh)
- Green Score (0–100)
- Sustainability Rating
- 6-Month Emission Forecast
- Feature Importance Analysis

### Why Random Forest?
- Handles nonlinear relationships
- Provides strong predictive performance
- Offers feature importance for explainability
- Robust and reliable for structured data

---

## 🔮 Key Features

### ✅ Carbon Emission Prediction
Predicts monthly CO₂ emissions based on web application metrics.

### ✅ 6-Month Forecasting
Simulates emission growth trends over time.

### ✅ Feature Importance Analysis
Identifies which architectural factors contribute most to emissions.

### ✅ Optimization Suggestions
Provides actionable recommendations to reduce digital carbon footprint.

### ✅ Optimization Simulation
Interactive comparison of current vs optimized metrics.

### ✅ Sustainability Benchmarking
Compares results against predefined efficiency thresholds.

---

## 🏗 Tech Stack

### Frontend
- React (Vite + TypeScript)
- Axios
- Recharts
- CSS

### Backend
- Python
- FastAPI
- scikit-learn
- pandas
- numpy
- joblib

---

## 📊 Example Usage

### Input:
- Page Size: 2.5 MB  
- API Calls: 50  
- Images: 15  
- Monthly Users: 10,000  
- Session Time: 5 minutes  
- Server Response Time: 200 ms  

### Output:
- 35.63 kg CO₂ per month  
- 14.96 kWh energy usage  
- Green Score: 29/100  
- Sustainability Rating: Poor  
- Feature Importance breakdown  
- 6-Month Forecast graph  
- Optimization recommendations  

---

## 📁 Project Structure

carbon-score-analyzer/

├── public/

│ ├── greencode_ai_favicon.ico

│ └── robots.txt

├── src/

│ ├── components/

│ ├── pages/

│ ├── hooks/

│ ├── lib/

│ ├── App.tsx

│ ├── main.tsx

│ └── index.css

├── backend/

│ ├── main.py

│ ├── model_training.py

│ └── carbon_model.pkl

└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone <repository-url>
cd carbon-score-analyzer


### 2️⃣ Frontend Setup

npm install
npm run dev

Frontend runs on:

http://localhost:5173

### 3️⃣ Backend Setup

cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs on:

http://localhost:8000

---

## 📈 Future Enhancements

- Real-time carbon tracking integration  
- Multi-project portfolio comparison  
- CI/CD sustainability checks  
- Enterprise ESG reporting module  
- Cloud deployment carbon analytics  

---

## 🌱 Impact

GreenCode AI enables:

- Developers to build environmentally efficient applications  
- Organizations to track digital sustainability  
- Data-driven climate-conscious decisions  
- Reduction of digital carbon footprint  

---

## 👩‍💻 Author

- Monigasri M 

- Jayamuguntha P