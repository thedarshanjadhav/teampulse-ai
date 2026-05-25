import { useState } from "react";
import MeetingInput from "./components/MeetingInput";
import MeetingSummary from "./components/MeetingSummary";
import TaskBoard from "./components/TaskBoard";
import { analyzeMeeting } from "./services/openai";
import "./App.css";

export interface Task {
  id: string;
  title: string;
  owner: string;
  status: "todo" | "inprogress" | "done";
}

export interface MeetingResult {
  summary: string[];
  decisions: string[];
  followups: string[];
  tasks: Task[];
  healthScore: number;
  healthReason: string;
}

function App() {
  const [result, setResult] = useState<MeetingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (transcript: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await analyzeMeeting(transcript);
      setResult(data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Check your API key and try again. ");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = (updatedTasks: Task[]) => {
    if (result) setResult({ ...result, tasks: updatedTasks });
  };

  return (
    <div className="app">
      <header>
        <h1>🧠 TeamPulse AI</h1>
        <p>Turn your meetings into action</p>
      </header>
      <main>
        <MeetingInput onAnalyze={handleAnalyze} loading={loading} />
        {error && <div className="error">{error}</div>}
        {result && (
          <>
            <MeetingSummary result={result} />
            <TaskBoard tasks={result.tasks} onUpdate={handleTaskUpdate} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
