# SkillSwap — Product Documentation

> A peer-to-peer skill-exchange platform where users trade expertise with each other — no money, just knowledge.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Target Users](#2-target-users)
3. [User Flows](#3-user-flows)
4. [Features & Functionality](#4-features--functionality)
   - 4.1 [Authentication](#41-authentication)
   - 4.2 [Profile Management](#42-profile-management)
   - 4.3 [Skill Discovery](#43-skill-discovery)
   - 4.4 [Suggested Matches](#44-suggested-matches)
   - 4.5 [Skill Swap Requests](#45-skill-swap-requests)
   - 4.6 [Exchange History](#46-exchange-history)
   - 4.7 [Settings](#47-settings)
   - 4.8 [Navigation & Theming](#48-navigation--theming)
5. [Pages Reference](#5-pages-reference)
6. [Data Model](#6-data-model)
7. [Tech Stack](#7-tech-stack)
8. [Architecture](#8-architecture)
9. [Responsive Design](#9-responsive-design)
10. [Known Limitations](#10-known-limitations)
11. [Getting Started](#11-getting-started)

---

## 1. Product Overview

**SkillSwap** is a browser-based skill-exchange marketplace that connects people who want to learn with people who want to teach — in both directions simultaneously. Instead of paying for tutoring or courses, users offer their own expertise in return for someone else's.

**Core Value Proposition:**
- Teach what you know → Learn what you want
- No money changes hands; the currency is knowledge
- Peer-to-peer matching based on complementary skill sets

SkillSwap is a fully client-side application. All data is stored in the browser's `localStorage` — no backend server, database, or internet connection is required to use the app after the initial page load.

---

## 2. Target Users

| User Type | Description |
|-----------|-------------|
| **Students** | University or college students looking to exchange academic or practical skills with peers |
| **Professionals** | Early-career professionals who want to upskill without paying for courses |
| **Hobbyists** | Anyone with a niche skill (e.g., guitar, photography, cooking) who wants to learn something new in return |

---

## 3. User Flows

### 3.1 New User Onboarding

```
Land on Homepage
      ↓
Click "Get Started" / "Join Now"
      ↓
Sign Up (name, email, password)
      ↓
Complete Profile (photo, school, degree, skills to teach, skills to learn)
      ↓
Arrive at Dashboard
```

### 3.2 Finding and Requesting a Skill Swap

```
Dashboard / Explore / Suggested Matches
      ↓
Browse skills or view match recommendations
      ↓
Click "Request Swap" on a skill or match card
      ↓
Select one of your skills to offer in return
      ↓
Write a short message and submit the request
      ↓
Request appears as "pending" in the recipient's Dashboard
```

### 3.3 Accepting an Incoming Swap Request

```
Dashboard → Incoming Requests section
      ↓
View request card (sender, their skill, your skill, message)
      ↓
Click "Accept" or "Decline"
      ↓
Accepted requests move to Exchange History for both parties
```

### 3.4 Returning User Login

```
Click "Log In" from homepage or nav
      ↓
Enter email and password
      ↓
Redirect to Dashboard
```

---

## 4. Features & Functionality

### 4.1 Authentication

| Feature | Description |
|---------|-------------|
| **Sign Up** | Register with full name, email address, and password (8+ characters). Duplicate emails are rejected. |
| **Log In** | Authenticate with email and password. Invalid credentials show inline error messages. |
| **Profile Completion Guard** | After sign-up, users must complete their profile before accessing the dashboard. Attempting to skip redirects them back to the profile creation page. |
| **Forgot Password** | Enter a registered email to look up the account, then set a new password. |
| **Log Out** | Available from the profile dropdown (desktop) and the mobile menu on all authenticated pages. Clears the session immediately. |
| **Password Visibility Toggle** | Show/hide password content on all password input fields. |

> **Note:** Passwords are stored as plain text in `localStorage`. This is acceptable for a client-side capstone project but is not suitable for production use.

---

### 4.2 Profile Management

#### Create Profile (post sign-up)

After registering, users are taken to the profile creation page to fill in:

| Field | Details |
|-------|---------|
| **Profile Photo** | Upload an image (JPG, PNG, etc.). Max file size: 2 MB. Stored as base64. Falls back to initials avatar if no photo is uploaded. |
| **School / University** | Free-text input for the user's institution. |
| **Degree / Program** | Free-text input for the user's degree or area of study. |
| **Skills to Teach** | Tag-style input. Users type a skill and press Enter or comma to add it. Tags can be removed individually. |
| **Skills to Learn** | Same tag input as above. These are the skills the user wants to receive from swap partners. |

#### Edit Profile

All fields from the create-profile page are editable at any time from the Edit Profile page. Changes are saved to `localStorage` and reflected immediately across the app.

#### Dashboard Profile Card

The user's profile summary is displayed in the dashboard sidebar, showing:
- Profile photo (or initials avatar)
- Full name and email
- School and degree
- Skills to teach (as tags)
- Skills to learn (as tags)
- Swap count and rating

Users can update their profile photo directly from the dashboard by clicking the avatar overlay.

---

### 4.3 Skill Discovery

The **Explore** page lets users browse 16 curated skills across 8 categories.

#### Categories

| Category | Skills |
|----------|--------|
| Design | UI/UX Design, Figma Prototyping |
| Development | Python Programming, React Development |
| Language | Spanish for Beginners, French Conversation |
| Photography | Portrait Photography, Street Photography |
| Music | Guitar for Beginners, Music Theory |
| Cooking | Italian Cooking, Baking & Pastry |
| Marketing | Digital Marketing, SEO Fundamentals |
| Data Science | Data Analysis with R, Data Analysis with Python |

#### Search & Filter

| Control | Behaviour |
|---------|-----------|
| **Category tabs** | Filter the skill grid to a single category. Tap again to deselect (show all). On mobile, 4 categories are visible by default with a "Show more" toggle for the rest. |
| **Search bar** | Real-time search (300ms debounce) across skill title, description, and instructor name. |
| **Sort dropdown** | Sort results by: Best Rated, Most Reviews, or Newest. |

#### Pagination

- Desktop: 8 skills per page
- Mobile: 6 skills per page
- Pagination controls include first/last page, adjacent pages, and ellipsis for large result sets.
- Resets to page 1 whenever a new filter or search is applied.

#### Skill Detail Modal

Clicking a skill card opens a modal with:
- Skill title and category
- Full description
- Instructor name and avatar
- Star rating and review count
- A "Request Swap" button that links to the request page

---

### 4.4 Suggested Matches

The **Suggested Matches** page uses a scoring algorithm to surface the most compatible swap partners from the user pool.

#### Matching Algorithm

For each potential partner, a match score is calculated:

```
score = (skills they can teach me  ×  2)  +  (skills I can teach them)
```

- "Skills they can teach me" = intersection of their `skillsToTeach` and my `skillsToLearn`
- "Skills I can teach them" = intersection of my `skillsToTeach` and their `skillsToLearn`
- Receiving skills is weighted ×2 to prioritise learning opportunities
- Top 6 matches by score are displayed

#### Match Cards

Each card shows:
- Avatar / initials
- Name, school, and degree
- Skills they can teach you (highlighted)
- Skills you can teach them (highlighted)
- **Mutual Match** badge (both sides have overlapping skills) or **Partial Match** badge
- "Request Swap" button

> A small demo pool of 5 fictional users is always present to ensure the page shows content even when the user base is small.

---

### 4.5 Skill Swap Requests

#### Sending a Request

From the **Request Skill** page (linked from skill cards and match cards):

1. Select one of your "skills to teach" to offer in exchange
2. Optionally write a message to the recipient
3. Submit — the request appears in the recipient's dashboard

#### Incoming Requests (Dashboard)

Pending requests from other users appear as cards in the dashboard's request list. Each card shows:
- Sender's name and avatar
- The skill they are offering
- The skill they want from you
- Their message
- Accept / Decline action buttons

A **badge** on the dashboard nav link shows the count of pending incoming requests.

#### Request Statuses

| Status | Meaning |
|--------|---------|
| `pending` | Request has been sent; awaiting a response |
| `accepted` | Both parties have agreed to the swap |
| `declined` | The recipient declined the request |

Accepted requests move to **Exchange History**. Declined requests are removed from the active list.

> Two demo incoming requests are seeded the first time a new user visits the dashboard, so the interface is never empty on first use.

---

### 4.6 Exchange History

The **Exchange History** page shows all accepted swap requests for the current user:
- Swap partner's name and avatar
- Skills exchanged (what each party offered)
- Date the swap was accepted

If no swaps have been accepted yet, an empty-state message is displayed.

---

### 4.7 Settings

| Setting | Description |
|---------|-------------|
| **Change Password** | Enter current password for verification, then set a new one. |
| **Delete Account** | Permanently deletes the user's account and all associated swap requests from `localStorage`. Requires clicking a confirmation button. After deletion the user is logged out and returned to the homepage. |

---

### 4.8 Navigation & Theming

#### Navigation

- **Desktop (1024px+):** Horizontal top navbar with logo, page links (Home, Explore, Dashboard), a theme toggle, and a profile dropdown (Edit Profile / Logout).
- **Mobile / Tablet:** Burger menu icon opens a 240px right-aligned dropdown with the same links plus auth-aware actions (Login / Join Now for guests; Edit Profile / Logout for signed-in users).
- **Scroll behaviour:** The header hides on scroll down and reappears on scroll up, maximising screen space.
- **Dashboard guard:** Guests who click "Dashboard" are shown a prompt to create an account before being allowed access.

#### Dark / Light Theme

- Toggled via the sun/moon icon in the navbar.
- Preference is saved to `localStorage` and applied before the page renders (no flash of wrong theme on load).
- All pages respect the stored theme preference.

---

## 5. Pages Reference

| Page | URL | Auth Required | Purpose |
|------|-----|:---:|---------|
| Home | `index.html` | No | Landing page — hero, how-it-works, featured skills, testimonials, FAQ |
| Explore | `pages/explore.html` | No | Browse, search, and filter the skill catalogue |
| Dashboard | `pages/dashboard.html` | Yes | User hub — profile card, skills, incoming requests |
| Suggested Matches | `pages/suggested-matches.html` | Yes | Peer matching based on complementary skills |
| Exchange History | `pages/exchange-history.html` | Yes | Log of completed skill swaps |
| Request Skill | `pages/request-skill.html` | Yes | Send a swap proposal |
| Settings | `pages/settings.html` | Yes | Change password / delete account |
| Login | `pages/login.html` | No | Sign in |
| Sign Up | `pages/signup.html` | No | Create a new account |
| Create Profile | `pages/create-profile.html` | Yes* | Complete profile after sign-up |
| Edit Profile | `pages/edit-profile.html` | Yes | Update profile details |
| Forgot Password | `pages/forgot-password.html` | No | Reset account password |

*Accessible immediately after sign-up; users without a completed profile are redirected here.

---

## 6. Data Model

All data is persisted to the browser's `localStorage` under the following keys:

| Key | Type | Description |
|-----|------|-------------|
| `ss_users` | `User[]` | Array of all registered user objects |
| `ss_requests` | `Request[]` | Array of all swap request objects |
| `ss_current_user` | `string` | ID of the currently logged-in user |
| `theme` | `"dark" \| "light"` | User's theme preference |

### User Object

```json
{
  "id": "usr_1700000000000",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "plaintext123",
  "createdAt": "2024-01-15T10:30:00Z",
  "school": "Stanford University",
  "degree": "B.S. Computer Science",
  "skillsToTeach": ["UI/UX Design", "Figma"],
  "skillsToLearn": ["Python", "Photography"],
  "profileComplete": true,
  "photoUrl": "data:image/png;base64,..."
}
```

### Request Object

```json
{
  "id": "req_1234567890_123",
  "ownerId": "usr_1234567890",
  "direction": "incoming",
  "fromName": "David Chen",
  "fromAvatar": "https://example.com/avatar.jpg",
  "theirSkill": "Python Programming",
  "mySkill": "UI/UX Design",
  "message": "Hi! I would love to swap skills with you.",
  "status": "pending",
  "createdAt": "2024-01-20T14:30:00Z",
  "acceptedAt": null
}
```

---

## 7. Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 — custom properties, Grid, Flexbox, transitions |
| Logic | Vanilla JavaScript (ES6+) — no frameworks |
| Icons | Material Symbols Outlined, Font Awesome 6 |
| Fonts | Manrope (Google Fonts) |
| Storage | Browser `localStorage` |
| Browser APIs | FileReader API (image upload) |
| Build tools | None — open `index.html` directly |

---

## 8. Architecture

```
SkillSwap-capstone-project/
├── index.html                 # Homepage / entry point
├── pages/                     # All inner pages (11 HTML files)
├── js/
│   ├── auth.js                # Auth helpers, session management, storage utilities
│   ├── script.js              # Page-specific logic for all pages except Explore
│   └── explore.js             # Skill catalogue: filtering, sorting, pagination, modals
├── stylesheet/
│   ├── style.css              # Global styles, header, nav, dark mode variables
│   ├── auth.css               # Login, sign-up, forgot-password
│   ├── explore.css            # Explore page grid, cards, modal, pagination
│   ├── dashboard.css          # Dashboard sidebar and request cards
│   ├── create-profile.css     # Profile creation form
│   ├── edit-profile.css       # Edit profile overrides
│   └── request-skill.css      # Swap request form
└── assets/                    # Images, icons, logos
```

### Key Design Decisions

- **Single JS bundle per concern** — `auth.js` is a pure utility module, `explore.js` owns the catalogue page, and `script.js` handles everything else via named `init*()` functions called from a central `DOMContentLoaded` dispatcher.
- **localStorage as the database** — removes the need for any server infrastructure, keeping the project runnable offline from a single directory.
- **Demo data seeding** — a pool of 5 fictional users and 2 demo requests are injected on first login so the app always renders non-empty states.
- **Base64 image storage** — profile photos are encoded and stored directly in the user object, avoiding file system dependencies.

---

## 9. Responsive Design

The UI adapts across three breakpoints:

| Breakpoint | Range | Layout |
|-----------|-------|--------|
| **Mobile** | < 768px | Burger menu, stacked layout, 6 skills/page |
| **Tablet** | 768px – 1023px | Burger menu, expandable search, hybrid layout |
| **Desktop** | ≥ 1024px | Full horizontal nav, profile dropdown, 8 skills/page |

All pages are designed mobile-first and tested across all three breakpoints.

---

## 10. Known Limitations

These limitations are by design for a capstone/demo project and would need to be addressed before production use:

| Limitation | Details |
|-----------|---------|
| **Client-side only** | Data does not sync across browsers or devices. Clearing browser storage deletes all data. |
| **Plain-text passwords** | Passwords are stored without hashing. Never use real passwords. |
| **Static skill catalogue** | The 16 skills are hardcoded. There is no way for users to add new skills to the global catalogue. |
| **No real-time updates** | Accepting a request requires both users to refresh their dashboards. |
| **No messaging** | The swap request message is one-way; there is no back-and-forth chat. |
| **No notifications** | Users are not notified of new incoming requests unless they check the dashboard. |
| **Single-device sessions** | Logging in on a second browser does not log out the first session. |

---

## 11. Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- No internet connection required after the page loads
- No build step, package manager, or server required

### Run Locally

```bash
# Clone the repository
git clone <repository-url>
cd SkillSwap-capstone-project

# Open the homepage in your browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Alternatively, use the **Live Server** extension in VS Code for hot-reload during development.

### Creating a Test Account

1. Open `index.html`
2. Click **Get Started**
3. Sign up with any email and a password of 8+ characters
4. Complete your profile with at least one skill to teach and one to learn
5. Explore the dashboard, matches, and explore pages

---

*SkillSwap — Teach what you know. Learn what you want.*
