# 🧠 TeamPulse AI
> Turn your meetings into action — powered by Azure OpenAI

## 🚀 Live Demo
[teampulse-ai-two.vercel.app](https://teampulse-ai-two.vercel.app)

## 🎯 Problem
Teams lose hours every week in unproductive meetings where action items get lost, decisions go undocumented, and follow-through is inconsistent.

## ✅ Solution
TeamPulse AI analyzes any meeting transcript and instantly produces:
- 📝 Smart meeting summary
- ✅ Decisions made
- 🗂 Action items with owners on a Kanban board
- 💯 Meeting health score with reasoning
- 📧 AI-drafted follow-up email

## 🛠 Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| AI | Azure OpenAI (GPT-4o) |
| Deployment | Vercel |
| Version Control | GitHub |

## 🤖 AI Tools Used
- **Azure OpenAI GPT-4o** — meeting analysis, health scoring, email generation
- **GitHub Copilot** — code assistance during development

## ⚙️ Local Setup
1. Clone the repo
```bash
   git clone https://github.com/thedarshanjadhav/teampulse-ai.git
   cd teampulse-ai
```
2. Install dependencies
```bash
   npm install
```
3. Create `.env` file in root:
```env
   VITE_AZURE_OPENAI_ENDPOINT=your_endpoint
   VITE_AZURE_OPENAI_KEY=your_key
   VITE_AZURE_OPENAI_DEPLOYMENT=gpt-4o
```
4. Run locally
```bash
   npm run dev
```

## 📸 Features
### Meeting Analysis
Paste any meeting transcript → get instant AI-powered insights

### Task Board
Auto-extracted action items appear as draggable kanban cards

### Meeting Health Score
AI rates your meeting quality 1-10 with specific reasoning

### Follow-up Email
One-click AI-drafted follow-up email ready to send to your team

## 👤 Team
- **Darshan Jadhav** — Full Stack + AI Integration

## 🏆 Microsoft Build AI Hackathon 2026
Theme: AI at Work