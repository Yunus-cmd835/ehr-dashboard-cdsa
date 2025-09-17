# 🧠 API Discovery Document

## Overview
This document outlines the mock API endpoints used in the EHR dashboard and how they simulate real-world EHR capabilities.

---

## 📋 Endpoints

### 👤 Patients
- `GET /patients`
  - Returns list of patient profiles
  - Includes demographics, allergies, conditions, medications, immunizations

### 📅 Appointments
- `GET /appointments`
  - Returns all appointments
  - Includes provider, date, status
- Conflict detection handled client-side via Zustand

### 🧠 Clinical Notes
- `GET /clinical`
  - Returns clinical notes per patient
  - Includes vitals, labs, medications, diagnoses (ICD-10), procedures (CPT)

### 💳 Billing
- `GET /billing`
  - Returns billing records
  - Includes insurance, balance, payments, billing codes, fee schedule

---

## ⚙️ Capabilities
- Full CRUD simulated via Zustand
- Advanced logic: conflict detection, provider availability, CPT fee mapping

## 🚫 Limitations
- No real-time sync with external EHR APIs
- No authentication or role-based access
- No audit trail or versioning

## 🧱 Integration Strategy
- Replace mock fetch with real API service (`ehrService.ts`)
- Use `.env` for credentials (`NEXT_PUBLIC_EHR_API_KEY`)
- Add credential input field in each dashboard for testing