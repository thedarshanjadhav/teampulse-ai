import { useState } from "react";
import { MeetingResult } from "../App";
import { generateFollowUpEmail } from "../services/openai";

interface Props {
  result: MeetingResult;
}

export default function FollowUpEmail({ result }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const generated = await generateFollowUpEmail(result);
      setEmail(generated);
    } catch (err) {
      setEmail(`Failed to generate email. Please try again. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>📧 Follow-up Email</h2>
        <button
          className="btn-secondary"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "⏳ Generating..." : "✨ Generate Email"}
        </button>
      </div>

      {email && (
        <>
          <textarea
            rows={12}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <button className="btn-primary" onClick={handleCopy}>
            {copied ? "✅ Copied!" : "📋 Copy to Clipboard"}
          </button>
        </>
      )}

      {!email && (
        <p className="empty">
          Click "Generate Email" to draft a follow-up email for your team based
          on this meeting.
        </p>
      )}
    </div>
  );
}
