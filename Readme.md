# SkillSwap - A Capstone Project

A peer-to-peer skill-exchange platform where users trade expertise with each other — no money, just knowledge. Teach what you know, learn what you want.

---

## Live Pages

| Page | File | Description |
| --- | --- | --- |
| Home | `index.html` | Landing page with hero, how-it-works, featured skills, testimonials, FAQ |
| Explore | `pages/explore.html` | Browse and search skills with filtering, sorting, and pagination |
| Dashboard | `pages/dashboard.html` | User profile, skills, incoming requests, and swap stats |
| Suggested Matches | `pages/suggested-matches.html` | AI-style peer matches based on complementary skills |
| Exchange History | `pages/exchange-history.html` | Record of past skill swaps |
| Settings | `pages/settings.html` | Change password and account preferences |
| Login | `pages/login.html` | Sign in to an existing account |
| Sign Up | `pages/signup.html` | Create a new account |
| Create Profile | `pages/create-profile.html` | Complete profile after sign-up (school, degree, skills, photo) |
| Edit Profile | `pages/edit-profile.html` | Update name, photo, school, degree, and skills |
| Request Skill | `pages/request-skill.html` | Send a swap proposal to an instructor |
| Reset Password | `pages/forgot-password.html` | Reset account password |

---

## Features

### Authentication

- Sign up with name, email, and password
- Email format and uniqueness validation
- Login with session persistence via `localStorage`
- Auth guards redirect unauthenticated users to login
- Profile completion step enforced after sign-up — users cannot skip to the dashboard
- Logout clears session from all nav entry points
- Password visibility toggle on all password fields

### User Profile

- Profile photo upload (max 2MB, stored as base64)
- School/university and degree fields
- Tag-based skill management (skills to teach and skills to learn)
- Avatar with initials fallback when no photo is set
- Full profile editing after creation

### Skill Discovery (Explore Page)

- 16 skills across 8 categories: Design, Development, Language, Photography, Music, Cooking, Marketing, Data Science
- Real-time search across skill title, description, and instructor name
- Category filter tabs with mobile collapsible overflow
- Sort by: Best Rated, Most Reviews, Newest
- Paginated grid (8 per page desktop, 6 mobile) with ellipsis navigation
- "More Details" modal with full skill and instructor info
- Profile photo and dropdown in the explore navbar for logged-in users

### Dashboard

- Dynamic display of user's skills to teach and skills to learn
- Incoming swap requests with accept / decline actions
- Swap completion count
- Sidebar navigation with links to all inner pages

### Suggested Matches

- Matches peers whose skills to learn overlap with your skills to teach (and vice versa)
- Match score percentage based on skill overlap
- Dedicated full page replacing the old in-dashboard section

### Navigation & Access Control

- Desktop navbar profile chip with dropdown: Edit Profile + Logout
- Mobile burger menu dynamically injects Edit Profile + Logout (logged in) or Join Now (logged out)
- Dashboard link intercepted for guests — modal prompts account creation before navigating
- Profile photo hidden in navbar when burger menu is active (< 768px)

### UI & Responsiveness

- Fully responsive across mobile, tablet, and desktop
- Dark / light theme toggle with `localStorage` persistence — no flash on reload
- Animated burger menu (slide-down + fade) on mobile, 240px right-aligned dropdown
- Expandable search bar in the explore header on mobile/tablet
- Sticky header with hide-on-scroll behaviour
- Smooth CSS transitions and modal animations throughout

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Markup | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox, transitions) |
| Logic | Vanilla JavaScript (ES6+) |
| Icons | Material Symbols Outlined, Font Awesome 6 |
| Fonts | Manrope (Google Fonts) |
| Storage | `localStorage` (no backend required) |

---

## Project Structure

```text
SkillSwap-capstone-project/
├── index.html                  # Landing page (root)
├── README.md
│
├── pages/
│   ├── login.html
│   ├── signup.html
│   ├── create-profile.html
│   ├── edit-profile.html
│   ├── dashboard.html
│   ├── suggested-matches.html
│   ├── exchange-history.html
│   ├── settings.html
│   ├── explore.html
│   ├── request-skill.html
│   └── forgot-password.html
│
├── js/
│   ├── auth.js          # Auth helpers: get/save users, session, initials
│   ├── script.js        # Dark mode, burger menu, nav guards, all page inits
│   └── explore.js       # Skill data, filtering, sorting, pagination, modal
│
├── stylesheet/
│   ├── style.css           # Global styles, header, nav, dark mode, modal, responsive
│   ├── auth.css            # Login, signup, forgot-password layouts
│   ├── explore.css         # Skill grid, cards, modal, filters, pagination
│   ├── dashboard.css       # Sidebar, profile card, request cards, nav dropdown
│   ├── create-profile.css  # Profile form, photo upload, tag inputs
│   ├── edit-profile.css    # Edit profile form overrides and back-button bar
│   └── request-skill.css   # Proposal form and skill info card
│
└── assets/                  # Images: logo, skill thumbnails, UI icons
```

---

## Data Model

User objects are stored as JSON in `localStorage` under the key `ss_users`. The active session ID is stored under `ss_current_user`.

```json
{
  "id": "usr_1700000000000",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "plaintext123",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "school": "Stanford University",
  "degree": "B.S. Computer Science",
  "skillsToTeach": ["UI/UX Design", "Figma"],
  "skillsToLearn": ["Python", "Photography"],
  "profileComplete": true,
  "photoUrl": "data:image/png;base64,..."
}
```

---

## Getting Started

No build step or server required. Open any HTML file directly in a browser:

```bash
# Clone the repo
git clone <repo-url>
cd SkillSwap-capstone-project

# Open in browser
open index.html
```

Or use a local dev server (e.g. VS Code Live Server extension) for the best experience.

---

## User Flow

```text
Guest → Sign Up → Create Profile → Dashboard
                                       |
                              Suggested Matches
                                       |
                              Explore Skills
                                       |
                              Request a Skill Swap
                                       |
                         Incoming Requests (Dashboard)
                                       |
                          Accept → Exchange History
```

---

## Limitations

- **Client-side only** — all data lives in the browser's `localStorage`. Data does not sync across devices or browsers.
- **Passwords stored in plain text** — not suitable for production. A real backend with hashed passwords is needed.
- **Static skill data** — the 16 skills in the explore page are hardcoded in `js/explore.js`.
- **No real messaging or video** — the "Join Video Call" and messaging features are UI placeholders.
- **Single-device sessions** — logging out on one device does not affect other devices.

---

## Responsive Breakpoints

| Breakpoint | Behaviour |
| --- | --- |
| `>= 1024px` | Desktop — full nav, profile dropdown, inline search bar, sidebar layout |
| `768px – 1023px` | Tablet — burger menu, expandable search icon, sidebar row layout |
| `< 768px` | Mobile — burger menu, stacked layout, profile chip hidden, auth items in nav |
