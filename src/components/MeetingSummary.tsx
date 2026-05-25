import { MeetingResult } from "../App";

interface Props {
  result: MeetingResult;
}

const scoreColor = (score: number) => {
  if (score >= 8) return "#22c55e";
  if (score >= 5) return "#f59e0b";
  return "#ef4444";
};

export default function MeetingSummary({ result }: Props) {
  return (
    <div className="summary-grid">
      {/* Health Score */}
      <div className="card health-card">
        <h2>💯 Meeting Health Score</h2>
        <div
          className="score-circle"
          style={{ borderColor: scoreColor(result.healthScore) }}
        >
          <span style={{ color: scoreColor(result.healthScore) }}>
            {result.healthScore}
          </span>
          <small>/10</small>
        </div>
        <p className="health-reason">{result.healthReason}</p>
      </div>

      {/* Summary */}
      <div className="card">
        <h2>📝 Summary</h2>
        <ul>
          {result.summary.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Decisions */}
      <div className="card">
        <h2>✅ Decisions Made</h2>
        {result.decisions.length === 0 ? (
          <p className="empty">No decisions recorded</p>
        ) : (
          <ul>
            {result.decisions.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Follow-ups */}
      <div className="card">
        <h2>❓ Follow-up Questions</h2>
        {result.followups.length === 0 ? (
          <p className="empty">No follow-ups recorded</p>
        ) : (
          <ul>
            {result.followups.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
