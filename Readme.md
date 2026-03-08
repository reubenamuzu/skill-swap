# SkillSwap - A Capstone Project

A peer-to-peer skill-exchange platform where users trade expertise with each other — no money, just knowledge. Teach what you know, learn what you want.

---

## Live Pages

| Page | File | Description |
| --- | --- | --- |
| Home | `index.html` | Landing page with hero, how-it-works, featured skills, testimonials, FAQ |
| Explore | `explore.html` | Browse and search skills with filtering, sorting, and pagination |
| Dashboard | `dashboard.html` | User profile, skills, incoming requests, and upcoming sessions |
| Login | `login.html` | Sign in to an existing account |
| Sign Up | `signup.html` | Create a new account |
| Create Profile | `create-profile.html` | Complete profile after sign-up (school, degree, skills, photo) |
| Request Skill | `request-skill.html` | Send a swap proposal to an instructor |

---

## Features

### Authentication

- Sign up with name, email, and password
- Email format and uniqueness validation
- Login with session persistence via `localStorage`
- Auth guards redirect unauthenticated users to login
- Profile completion step after sign-up
- Logout clears session

### User Profile

- Profile photo upload (max 2MB, stored as base64)
- School/university and degree fields
- Tag-based skill management (skills to teach and skills to learn)
- Avatar with initials fallback when no photo is set

### Skill Discovery (Explore Page)

- 16 skills across 8 categories: Design, Development, Language, Photography, Music, Cooking, Marketing, Data Science
- Real-time search across skill title, description, and instructor name
- Category filter tabs with mobile collapsible overflow
- Sort by: Best Rated, Most Reviews, Newest
- Paginated grid (8 per page desktop, 6 mobile) with ellipsis navigation
- "More Details" modal with full skill and instructor info

### Dashboard

- Dynamic display of user's skills to teach and skills to learn
- Incoming swap requests with accept/decline actions
- Upcoming sessions with status (Confirmed / Pending) and join call button
- Sidebar navigation with notification badge

### UI & Responsiveness

- Fully responsive across mobile, tablet, and desktop
- Dark / light theme toggle with `localStorage` persistence — no flash on reload
- Animated burger menu (slide-down + fade) on mobile, narrows to 240px right-aligned dropdown
- Expandable search bar in the explore header on mobile/tablet
- Sticky header with hide-on-scroll behaviour on desktop
- Smooth CSS transitions throughout

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
├── index.html
├── explore.html
├── dashboard.html
├── login.html
├── signup.html
├── create-profile.html
├── request-skill.html
│
├── js/
│   ├── auth.js          # Auth helpers: get/save users, session, initials
│   └── explore.js       # Skill data, filtering, sorting, pagination, modal
│
├── stylesheet/
│   ├── style.css        # Global styles, header, nav, dark mode, responsive
│   ├── auth.css         # Login & signup page layouts
│   ├── explore.css      # Skill grid, cards, modal, filters, pagination
│   ├── dashboard.css    # Sidebar, profile card, request & session cards
│   ├── create-profile.css  # Profile form, photo upload, tag inputs
│   └── request-skill.css   # Proposal form, skill info card
│
├── script.js            # Dark mode, burger menu, FAQ, auth forms, dashboard
│
└── assets/              # Images: logo, skill thumbnails, UI icons
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
                              Explore Skills
                                       |
                              Request a Skill
                                       |
                         Incoming Requests (Dashboard)
                                       |
                          Accept → Upcoming Sessions
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
| `>= 1024px` | Desktop — full nav visible, inline search bar, sidebar layout |
| `768px – 1023px` | Tablet — burger menu, expandable search icon, sidebar row layout |
| `< 768px` | Mobile — burger menu, stacked layout, collapsible nav dropdown |
