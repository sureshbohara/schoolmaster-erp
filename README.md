# 🏫 SchoolMaster ERP System

<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
</p>

<p align="center">
  <a href="https://laravel.com" target="_blank"><img src="https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel" alt="Laravel"></a>
  <a href="https://reactjs.org" target="_blank"><img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react" alt="React"></a>
  <a href="https://tailwindcss.com" target="_blank"><img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS"></a>
  <a href="https://php.net" target="_blank"><img src="https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php" alt="PHP"></a>
  <a href="https://github.com/sureshbohara/schoolmaster-erp/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License"></a>
</p>

---

## 📖 About The Project

**SchoolMaster ERP** is a modern, multi-tenant, and feature-rich School Management System designed to streamline academic, administrative, and financial operations for educational institutions with single or multiple branches. Built with **Laravel 11**, **React (Inertia.js)**, and **Tailwind CSS**, it offers a seamless, real-time, and highly secure user experience.

---

## ✨ Key Features

### 🏢 Multi-Tenancy & Security
- **Dynamic Data Isolation:** Automatic data filtering per Organization and Branch using robust Global Scopes (`OrganizationScope`, `BranchScope`).
- **Granular RBAC:** Fine-tuned Role-Based Access Control (Super Admin, Branch Admin, Teacher, Accountant, Parent, Student).
- **Secure Auth:** Session-based authentication with CSRF protection and password hashing.

### 📚 Comprehensive Core Modules
- **Academics:** Academic Years, Classes, Sections, Subjects, and Student Categories.
- **Student Management:** Complete admission workflow, profile management, document handling, and status tracking.
- **Human Resources:** Employee lifecycle, Departments, Designations, Leave Applications, Salary Structures, and Payroll.
- **Finance & Fees:** Dynamic Fee Structures, Auto-Invoicing, Payment Collection, Incomes, Expenses, and Bank Account management.
- **Examinations:** Exam Types, Scheduling, Grading Systems, and centralized Marks Entry.
- **Daily Attendance:** Bulk, class-wise attendance marking for both Students and Staff.
- **Library:** Book categories, inventory tracking, and Issue/Return management.
- **Transport:** Vehicle types, Fleet management, Routes, and Student assignments.
- **Hostel:** Hostel management, Room capacity tracking, and Student allocations.

### ⚡ Advanced Automation & Enterprise Features
- **Global Search (Cmd/Ctrl + K):** Lightning-fast, debounced search across Students, Staff, Fees, and Exams.
- **Automated Cron Jobs:** 
  - Auto-marks students as 'Absent' at 11:59 PM if no attendance is recorded.
  - Auto-generates pending fee invoices for all active students on the 1st of every month.
- **Robust Excel Import/Export:** Bulk data import with row-level error reporting and validation (Laravel Excel).
- **Professional PDF Generation:** High-quality templates for Student ID Cards, Fee Receipts, and Exam Marksheets.
- **Modern UI/UX:** Fully responsive design, Dark/Light mode toggle, and an interactive Dashboard with CSS-based analytics charts.
- **Comprehensive Reporting:** 30+ specialized reports (Academic, Financial, Staff, Examination, Library, Transport, Hostel).

---

## 🏗️ System Architecture

```text
schoolmaster-erp/
├── app/
│   ├── Console/Commands/       # Automated Tasks (Auto Absent, Auto Invoice)
│   ├── Http/Controllers/       # Core business logic & Resource Controllers
│   ├── Http/Middleware/        # Custom Middleware (SetTenantContext, HandleInertia)
│   ├── Models/                 # Eloquent models with Global Scopes
│   ├── Models/Scopes/          # OrganizationScope & BranchScope
│   └── Support/                # TenantContext for multi-tenancy state management
├── database/
│   ├── migrations/             # Database schema definitions
│   └── seeders/                # Production-ready dummy data generators
├── resources/
│   └── js/
│       ├── Components/         # Reusable React UI components (Forms, Tables, Modals)
│       ├── Hooks/              # Custom React hooks (e.g., useStudentForm)
│       ├── Layouts/            # AppLayout, Sidebar, Header
│       └── Pages/              # Inertia page components (Dashboard, Modules, Reports)
└── routes/
    ├── web.php                 # Comprehensive authenticated & guest routing (See below)
    └── console.php             # Scheduled task definitions