# Course Management Dashboard

A production-quality Angular application for managing educational courses, built **twice** — once using **Angular 21+ Standalone architecture** and once using the **NgModule (Module) architecture** — within a single monorepo.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
  - [Standalone (Angular 21+)](#standalone-angular-21)
  - [Module (NgModule)](#module-ngmodule)
  - [Key Architectural Differences](#key-architectural-differences)
- [Features](#features)
- [Data Model](#data-model)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Building for Production](#building-for-production)
- [Mock API & Data Layer](#mock-api--data-layer)
- [Routing](#routing)
- [Reusable Components](#reusable-components)
- [Form Validation](#form-validation)
- [State Handling](#state-handling)
- [Testing](#testing)
- [Commit Convention](#commit-convention)
- [Bonus Features Implemented](#bonus-features-implemented)

---

## Overview

Administrators use this dashboard to:

- Browse, search, and filter all courses by name and status
- View full course details
- Create new courses via a validated reactive form
- Edit existing courses (form is pre-populated)
- Delete courses with a confirmation dialog
- See contextual loading, empty, and error states throughout

---

## Tech Stack

| Category            | Technology                                                                    |
| ------------------- | ----------------------------------------------------------------------------- |
| Framework           | Angular 21.1                                                                  |
| UI Components       | [spartan-ng](https://www.spartan.ng/) (Helm + Brain) (The best accessibility) |
| Icons               | `@ng-icons/lucide`                                                            |
| Styling             | Tailwind CSS v4                                                               |
| Toast Notifications | Sonner (via `@spartan-ng/brain/sonner`)                                       |
| Package Manager     | npm 11                                                                        |
| TypeScript          | ~5.9                                                                          |

---

## Project Structure

The repository contains **two separate Angular applications** configured inside a single `angular.json`:

```
.
├── src/
│   ├── app/                        # ── Standalone app (Angular 21+)
│   │   ├── app.ts                  # Root standalone component
│   │   ├── app.html
│   │   ├── app.css
│   │   ├── app.routes.ts           # Top-level route definitions
│   │   ├── app.config.ts           # ApplicationConfig + providers
│   │   ├── app.spec.ts
│   │   ├── core/
│   │   │   ├── interfaces/
│   │   │   │   ├── course.ts       # Course interface
│   │   │   │   └── error-info.ts
│   │   │   └── services/
│   │   │       ├── course-api.ts   # Mock CRUD service (signals + localStorage)
│   │   │       └── translation-api.ts
│   │   ├── shared/
│   │   │   ├── components/         # All reusable UI components (standalone)
│   │   │   │   ├── confirmation-modal/
│   │   │   │   ├── course-table/
│   │   │   │   ├── empty-state/
│   │   │   │   ├── error-state/
│   │   │   │   ├── loading-indicator/
│   │   │   │   ├── search-input/
│   │   │   │   ├── skeleton-detail/
│   │   │   │   ├── skeleton-table/
│   │   │   │   └── status-badge/
│   │   │   └── pipes/
│   │   │       └── translate.pipe.ts
│   │   └── features/
│   │       └── courses/
│   │           ├── routes.ts        # Lazy-loaded feature routes
│   │           └── pages/
│   │               ├── course-list/
│   │               ├── course-detail/
│   │               └── course-form/
│   │
│   ├── app-module/                  # ── Module app (NgModule)
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── core/
│   │   │   ├── core.module.ts
│   │   │   ├── interfaces/
│   │   │   └── services/
│   │   │       └── course-api.ts   # Same CRUD contract, RxJS-only
│   │   ├── shared/
│   │   │   ├── shared.module.ts    # Declares + exports all shared components
│   │   │   ├── components/
│   │   │   └── pipes/
│   │   └── features/
│   │       └── courses/
│   │           ├── courses.module.ts
│   │           ├── courses-routing.module.ts
│   │           └── pages/
│   │               ├── course-list/
│   │               ├── course-detail/
│   │               └── course-form/
│   │
│   ├── main.ts                      # Standalone app bootstrap
│   ├── styles.css                   # Global Tailwind styles
│   └── index.html
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## Architecture

### Standalone (Angular 21+)

Entry point: `src/main.ts` → bootstraps `App` with `appConfig`

Key characteristics:

- **Every component is standalone** — no `NgModule` declarations needed; each component lists its own `imports`
- **Route-level lazy loading** via `loadComponent()` — each page is only downloaded when navigated to
- **Angular Signals** (`signal`, `computed`, `effect`) replace `BehaviorSubject` for all local state
- **`OnPush` change detection** on every component for optimal performance
- **`inject()`** function used instead of constructor injection
- **Path aliases** configured in `tsconfig.json`: `@/` maps to `src/app/`, allowing clean imports like `@/core/services/course-api`

```
AppConfig (provideRouter, provideIcons)
  └── App (RouterOutlet + HlmToaster)
       └── [lazy] CourseList / CourseDetail / CourseForm
                    └── shared standalone components
```

### Module (NgModule)

Entry point: `src/app-module/main.ts` → bootstraps `AppModule`

Key characteristics:

- **Traditional NgModule pattern** — `AppModule` → `AppRoutingModule` → lazy `CoursesModule`
- **CoreModule** provides singleton services (`forRoot` pattern)
- **SharedModule** declares and exports all reusable components so feature modules import it once
- **No signals** — state is plain class properties, change detection triggered by `ChangeDetectorRef.markForCheck()`
- **Constructor injection** throughout
- **`*ngIf` / `*ngFor`** structural directives (not `@if` / `@for`)
- Same `course-api.ts` service contract (same `Observable<T>` signatures) as the standalone version

```
AppModule
  ├── CoreModule (singleton services)
  ├── SharedModule (reusable components/pipes)
  └── CoursesModule (lazy, via AppRoutingModule)
       ├── CourseList
       ├── CourseDetail
       └── CourseForm
```

### Key Architectural Differences

| Concern                  | Standalone (Angular 21+)             | Module (NgModule)                           |
| ------------------------ | ------------------------------------ | ------------------------------------------- |
| Component declaration    | `standalone: true` + own `imports[]` | `declarations[]` inside NgModule            |
| State management         | Angular Signals                      | Plain class properties                      |
| Reactivity               | `signal()` / `computed()`            | `ChangeDetectorRef.markForCheck()`          |
| Change detection trigger | Automatic (signals)                  | Manual `markForCheck()`                     |
| DI style                 | `inject()` function                  | Constructor parameters                      |
| Template control flow    | `@if` / `@for` (Angular 17+)         | `*ngIf` / `*ngFor`                          |
| Lazy loading             | `loadComponent()` per route          | `loadChildren()` → NgModule                 |
| Routing config           | `app.routes.ts` flat array           | `AppRoutingModule` + `CoursesRoutingModule` |

---

## Features

| Feature                                                       | Status |
| ------------------------------------------------------------- | ------ |
| Course listing (table + mobile cards)                         | ✅     |
| Search by course name (case-insensitive, partial match)       | ✅     |
| Filter by status (All / Active / Draft / Archived)            | ✅     |
| Combined search + status filter                               | ✅     |
| Course detail view                                            | ✅     |
| Create course (reactive form, full validation)                | ✅     |
| Edit course (pre-populated form, preserves createdDate)       | ✅     |
| Delete course (confirmation dialog, toast feedback)           | ✅     |
| Loading state (skeleton loader)                               | ✅     |
| Empty state (contextual messages + CTA)                       | ✅     |
| Error state (retry action)                                    | ✅     |
| Responsive layout (mobile cards / desktop table)              | ✅     |
| Toast notifications (Sonner)                                  | ✅     |
| Keyboard navigation + accessibility (ARIA labels, focus trap) | ✅     |
| i18n / RTL support (TranslatePipe)                            | ✅     |
| Skeleton detail loader                                        | ✅     |

---

## Data Model

```typescript
export interface Course {
  id: number;
  courseName: string;
  instructorName: string;
  category: string;
  duration: number; // hours
  price: number;
  status: 'Active' | 'Draft' | 'Archived';
  description?: string; // max 500 characters
  createdDate: string; // ISO date string YYYY-MM-DD
}
```

---

## Getting Started

### Prerequisites

| Tool        | Version               |
| ----------- | --------------------- |
| Node.js     | 20+ (LTS recommended) |
| npm         | 11+                   |
| Angular CLI | 21+                   |

Check your versions:

```bash
node -v
npm -v
npx ng version
```

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <repository-folder>

# Install dependencies
npm install
```

### Running the App

Both apps run independently on different ports.

**Standalone app (Angular 21+ — default):**

```bash
npm start
# or explicitly:
npm run serve:standalone
```

Opens at: `http://localhost:4200`

**Module app (NgModule):**

```bash
npm run serve:module
```

Opens at: `http://localhost:4200` (runs independently; stop the other server first or configure a different port via `--port`)

### Building for Production

```bash
# Standalone app
npm run build

# Module app
npm run build:module
```

Build output lands in `dist/`. Both builds use output hashing and apply Angular production optimisations (tree-shaking, minification).

---

## Mock API & Data Layer

There is **no backend server**. Both apps use an in-memory mock service that persists data to `localStorage`.

**Standalone:** `src/app/core/services/course-api.ts`  
**Module:** `src/app-module/core/services/course-api.ts`

Both expose the same public API:

```typescript
getCourses(): Observable<Course[]>
getCourseById(id: number): Observable<Course | undefined>
createCourse(course: Omit<Course, 'id' | 'createdDate'>): Observable<Course>
updateCourse(id: number, changes: Partial<Course>): Observable<Course | null>
deleteCourse(id: number): Observable<boolean>
searchCourses(query: string): Observable<Course[]>
filterByStatus(status: string): Observable<Course[]>
```

Each method simulates a real HTTP call using `of(...).pipe(delay(200–300))` so loading states are visible during development.

**Seeded data:** Eight sample courses are pre-loaded (spanning all three statuses) so the app is immediately usable without any setup. Data survives page refreshes via `localStorage`.

**Resetting data:** Open DevTools → Application → Local Storage → delete the `courses` key, then refresh. The seed data will be restored automatically.

---

## Routing

Both apps share the same URL structure:

| Path                | Component    | Description                            |
| ------------------- | ------------ | -------------------------------------- |
| `/`                 | redirect     | Redirects to `/courses`                |
| `/courses`          | CourseList   | Lists all courses with search + filter |
| `/courses/new`      | CourseForm   | Create new course                      |
| `/courses/:id`      | CourseDetail | View course details                    |
| `/courses/:id/edit` | CourseForm   | Edit existing course                   |

**Standalone** uses `loadComponent()` lazy loading — each page is a separate chunk.  
**Module** uses `loadChildren()` → `CoursesModule` which declares all three pages.

---

## Reusable Components

All shared components live in `src/app/shared/components/` (standalone) and `src/app-module/shared/components/` (module).

| Component           | Selector                                       | Purpose                                                |
| ------------------- | ---------------------------------------------- | ------------------------------------------------------ |
| `SearchInput`       | `app-search-input` / `app-module-search-input` | Controlled text input with search icon                 |
| `CourseTable`       | `app-course-table` / `app-module-course-table` | Responsive table (desktop) + card list (mobile)        |
| `StatusBadge`       | `app-status-badge` / `app-module-status-badge` | Coloured badge for Active / Draft / Archived           |
| `LoadingIndicator`  | `app-loading-indicator`                        | Full-area spinner                                      |
| `SkeletonTable`     | `app-skeleton-table`                           | Animated placeholder while table loads                 |
| `SkeletonDetail`    | `app-skeleton-detail`                          | Animated placeholder while detail loads                |
| `EmptyState`        | `app-empty-state`                              | Illustration + message + optional CTA                  |
| `ErrorState`        | `app-error-state`                              | Error message + retry button                           |
| `ConfirmationModal` | `app-confirmation-modal`                       | Accessible dialog with focus trap + Escape key support |

---

## Form Validation

The course form (`CourseForm`) uses **Reactive Forms** in both implementations.

| Field           | Rules                                  | Error Messages                                              |
| --------------- | -------------------------------------- | ----------------------------------------------------------- |
| Course Name     | Required, min 3 characters             | "Course name is required" / "Minimum 3 characters required" |
| Instructor Name | Required                               | "Instructor name is required"                               |
| Category        | Required                               | "Category is required"                                      |
| Duration        | Required, numeric, > 0                 | "Duration is required" / "Duration must be greater than 0"  |
| Price           | Required, numeric, ≥ 0                 | "Price is required" / "Price cannot be negative"            |
| Status          | Required, one of Active/Draft/Archived | "Status is required"                                        |
| Description     | Optional, max 500 characters           | "Maximum 500 characters"                                    |

Validation errors are shown only after the user has touched (blurred) each field. The submit button is disabled while the form is invalid or a save is in progress.

---

## State Handling

Every page handles three non-happy-path states:

**Loading state** — shown immediately on navigation while data is being fetched. Uses the `SkeletonTable` (list page) or `SkeletonDetail` (detail page) component, which mirrors the real layout's structure so the page doesn't jump when data arrives.

**Error state** — shown when the service call fails. Displays a title, message, and a **Retry** button that re-triggers `loadCourses()` / `loadCourse()`.

**Empty state** — shown when the service returns successfully but with zero results. The message is context-aware:

- "No courses yet. Add your first course." when no filter is active
- "No courses match your search." when a search or status filter is active

---

## Commit Convention

```
type(scope): summary

Types: feat | fix | docs | style | refactor | test | chore

Examples:
feat(course-list): add status filter with combined search support
feat(course-form): implement reactive form with full validation
fix(course-service): resolve update not persisting to localStorage
docs(readme): add setup and mock API instructions
test(course-list): add search and filter unit test scenarios
```

---

## Bonus Features Implemented

| Feature                                  | Notes                                                                                                                               |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Skeleton loaders**                     | `SkeletonTable` and `SkeletonDetail` replace plain spinners                                                                         |
| **Toast notifications**                  | Sonner toasts for create / update / delete success and error                                                                        |
| **i18n + RTL**                           | `TranslatePipe` supports English and Arabic; layout uses logical CSS properties (`ps-`, `me-`, `start-`) for full RTL compatibility |
| **Accessibility**                        | Focus trap in confirmation modal, Escape key dismissal, ARIA labels on all icon buttons, semantic HTML throughout                   |
| **Responsive design**                    | Table on `sm+` screens; card list on mobile                                                                                         |
| **Confirmation modal.**                  | Appears when You try to delete                                                                                                      |
| **Lazy-loaded feature module.**          | Applied in both standalone and module                                                                                               |
| **Reusable table component.**            | Applied in both standalone and module                                                                                               |
| **Clean and scalable folder structure.** | Applied in both standalone and module                                                                                               |
