import { useState } from "react";

interface Props {
  onAnalyze: (transcript: string) => void;
  loading: boolean;
}

const SAMPLE = `John: Alright team, let's get started. We need to finalize the Q3 roadmap today.
Sarah: I think we should prioritize the mobile app redesign. Users have been complaining about the UI.
John: Agreed. Navjot, can you take ownership of that and have a plan ready by Friday?
Navjot: Sure, I'll have a proposal ready by Friday EOD.
John: Great. Also, Darshan, can you fix the login bug that's been reported? It's blocking several users.
Darshan: Yes, I'll fix it by tomorrow.
Sarah: We also need to decide on the new pricing model. Should we go freemium or subscription?
John: Let's go with freemium for now and revisit in Q4. That's decided.
Sarah: I'll update the pricing page accordingly this week.
John: Perfect. Any blockers anyone wants to flag?
Navjot: I need design assets from Sarah before I can start the redesign.
Sarah: I'll send those over today.
John: Alright, great meeting everyone!`;

export default function MeetingInput({ onAnalyze, loading }: Props) {
  const [transcript, setTranscript] = useState("");

  const handleSample = () => setTranscript(SAMPLE);

  return (
    <div className="card">
      <div className="card-header">
        <h2>📋 Meeting Transcript</h2>
        <button className="btn-secondary" onClick={handleSample}>
          Load Sample
        </button>
      </div>
      <textarea
        rows={10}
        placeholder="Paste your meeting transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />
      <button
        className="btn-primary"
        onClick={() => onAnalyze(transcript)}
        disabled={loading || !transcript.trim()}
      >
        {loading ? "⏳ Analyzing..." : "🚀 Analyze Meeting"}
      </button>
    </div>
  );
}
