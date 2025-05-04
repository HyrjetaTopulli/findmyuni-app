# 🎓 FindMyUni App

**FindMyUni** is an engaging and intelligent platform built to help Albanian high school students explore university options in a personalized and interactive way. Through quizzes, games, a university browser, and informative articles, it empowers students to discover their future based on who they are and what they care about.

---

## 🚀 Features Overview

### 🔍 University Browser

* Browse through a list of universities.
* Click a university to view full details including programs, location, and more.
* Integrated with a 360° virtual tour button to explore campuses.
* Filter options available for customized exploration.

### 🧠 Quizzes

Each quiz consists of 15 thoughtfully crafted multiple-choice questions.

* **First Quiz (InterestsQuiz.tsx)**: Helps students discover their passions and inclinations.
* **Personality Quiz (BachelorsQuiz.tsx)**: Analyzes traits and learning preferences.
* **Career Quiz (UniversityQuiz.tsx)**: Aligns students with ideal working styles (remote, hybrid, flexible).
* **Study Preferences Quiz (BachelorsSelection.tsx)**: Identifies best-suited environments and study programs.
* **Quiz Results Dashboard (QuizResults.tsx)**: Displays personalized insights after each quiz.

### 🎮 Games: "Mirror of the Future"

* **MirrorGame.tsx / MirrorGameIntro.tsx / MirrorGameEnd.tsx**
* A creative and reflective game experience that encourages students to explore their aspirations in a fun way.

### 📅 Calendar

* Interactive calendar interface.
* Allows students to view important academic dates such as university fairs, deadlines, and events.

### 📚 Articles Section

* Access curated articles that provide guidance on university applications, career paths, and studying tips.
* Supports article detail view for in-depth reading.

### 💬 Live Chat

* Real-time chat interface with potential for integration with a chatbot or support system.

### 👤 User Profile

* Review quiz history and update personal preferences.
* Central place to manage student identity within the app.

### 📊 Dashboard

* Personalized feed with quiz insights, recommended paths, and updates.
* Acts as a launchpad to explore different features.

---

## 📂 Sidebar Navigation

| Menu Item                  | Functionality                                                   |
| -------------------------- | --------------------------------------------------------------- |
| 🏠 **Dashboard**           | View overall progress, quiz results, and recommended next steps |
| 🏛️ **University Browser** | Search and explore university listings and details              |
| 📝 **Quizzes**             | Choose and take any of the four smart quizzes                   |
| 🎮 **Games**               | Access gamified experiences like "Mirror of the Future"         |
| 📅 **Calendar**            | Stay updated on events and important dates                      |
| 📰 **Articles**            | Browse educational and motivational articles                    |
| 💬 **Live Chat**           | Start a live conversation        |
| 👤 **Profile**             | Manage your personal information               |

---

## 🛠️ Tech Stack

### Frontend

* **React.js** (TypeScript)
* **Tailwind CSS** for styling
* **React Router** for navigation
* **Redux** for state management

### Folder Structure Highlights

* `src/components`: Contains modular UI components organized by feature
* `src/redux`: Global state management logic
* `src/services`: API logic
* `src/types`: TypeScript interfaces and types

---

## 📦 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/HyrjetaTopulli/findmyuni-app.git
cd findmyuni-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **View the app**
   Open `http://localhost:5173` in your browser.

---
