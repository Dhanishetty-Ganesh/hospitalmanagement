# 🏥 Hospital & Appointment Management System

A comprehensive role-based hospital and appointment management system built with React. This project was created as part of an interview assignment and demonstrates user role handling, appointment booking, data tracking, and revenue management logic.

---

## 🚀 Features

### 🔐 Authentication
- Role-based login/logout (Hospital Admin, Doctor, Patient)
- State managed using LocalStorage

### 🏥 Hospital Admin
- Register and manage hospitals
- Create and manage hospital departments
- View all associated doctors
- Track:
  - Total consultations
  - Hospital revenue
  - Revenue per doctor
  - Revenue per department

### 👨‍⚕️ Doctor
- Register with name, qualifications, specializations, and experience
- Associate with hospitals based on specialization
- Set availability (non-conflicting time slots per hospital)
- Set different consultation fees per hospital
- View total consultations and earnings (per hospital and overall)

### 🧑‍⚕️ Patient
- Register with personal details and unique ID
- Search/filter doctors by specialization, hospital, and availability
- Book appointments (slot locking handled)
- View complete consultation history

### 💸 Revenue Sharing
- 60% of consultation fee goes to doctor
- 40% goes to hospital
- Revenue calculations reflected in respective dashboards

---

## 🛠️ Tech Stack

- **Frontend:** React.js, React Icons, CSS
- **State Management:** useState, useEffect, LocalStorage
- **Data Persistence:** JS-Cookies (for appointment data)
