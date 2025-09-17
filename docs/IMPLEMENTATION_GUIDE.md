# 🛠️ Implementation Guide

## 🧱 Architecture
- Frontend: React + Next.js + TypeScript
- State: Zustand stores per module
- Mock API: `mockApi.ts` simulates backend
- Modular folder structure: `components/`, `store/`, `services/`, `pages/`

## ⚙️ Command Processing
- Forms trigger `addX()` or `updateX()` via Zustand
- Conflict detection and availability checks run before submission
- Billing updates recalculate balance and payments

## 🧠 State Management
- Zustand used for lightweight, modular state
- Each store handles its own CRUD and logic
- Shared via hooks like `useAppointmentStore()`

## ❗ Error Handling
- Form validation (e.g. empty fields, invalid dates)
- Conflict alerts (appointments)
- Payment limits (billing)
- Toast alerts (via `react-hot-toast`)

## 🚀 Performance Optimizations
- Local state avoids unnecessary re-renders
- Zustand selectors used for efficient updates
- Mock API allows fast iteration without backend bottlenecks