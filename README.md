# Task Management App

An Angular 17+ Task Management Application built as part of a Skill Assessment for the Assistant Programmer position at Southeast University (ISDT). This application allows users to create, view, update, and delete tasks with validations, sorting, filtering, and status-based business rules.

---

## 🚀 Features

- ✅ **Reactive Forms** with validation (title, description, due date)
- ✅ **CRUD operations** using `angular-in-memory-web-api`
- ✅ **Priority-based sorting** (High > Medium > Low)
- ✅ **Status-based filtering** and validation rules
- ✅ **Overdue warnings** with badge
- ✅ **Responsive** UI with Tailwind CSS
- ✅ **CSV Export** and **search** by title/description
- ✅ **Confirmation dialog** before delete
- ✅ **NgRx** for state management
- ✅ **Angular Animations** on task create/delete

---

## 🧠 Approach

### 📦 Architecture
- **Modular structure**: `core`, `shared`, `tasks`, and `store`
- **State Management**: Implemented using NgRx with actions, reducers, effects, and selectors
- **Backend**: Simulated with `angular-in-memory-web-api`
- **Reusable Components**: For task form, task table, filter/search, dialogs

### 🎯 Assumptions
- `createdAt` is set automatically when a task is created
- Tasks with status `Completed` are locked from editing/deleting
- Due date must be at least today (past dates disabled)
- Sorting and filtering are handled via NgRx selectors

---

## 🧰 Tech Stack

- **Angular** v17+
- **TypeScript**
- **NgRx**
- **RxJS**
- **Tailwind CSS**
- **angular-in-memory-web-api**
- **uuid** (for unique task IDs)

---

## 🖥️ Screenshots

| Create Task | Task Table |
|-------------|------------|
| ![Form](screenshots/form.png) | ![Table](screenshots/table.png) |

---

## 📦 Installation & Setup

```bash
git clone https://github.com/rahat664/southeast-assesment.git
cd southeast-assesment

npm install
ng serve
