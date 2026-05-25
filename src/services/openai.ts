import axios from "axios";
import { MeetingResult, Task } from "../App";

const ENDPOINT = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
const KEY = import.meta.env.VITE_AZURE_OPENAI_KEY;
const DEPLOYMENT = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT;

const PROMPT = `You are a meeting intelligence assistant.
Analyze the meeting transcript and return ONLY a valid JSON object with no extra text, no markdown, no backticks.

Return exactly this structure:
{
  "summary": ["point 1", "point 2", "point 3"],
  "decisions": ["decision 1", "decision 2"],
  "followups": ["question 1", "question 2"],
  "tasks": [
    { "id": "1", "title": "task title", "owner": "person name or Unassigned", "status": "todo" }
  ],
  "healthScore": 8,
  "healthReason": "reason why this score"
}`;

export const analyzeMeeting = async (
  transcript: string,
): Promise<MeetingResult> => {
  console.log("ENDPOINT:", import.meta.env.VITE_AZURE_OPENAI_ENDPOINT);
  console.log("KEY:", import.meta.env.VITE_AZURE_OPENAI_KEY);
  const url = `${ENDPOINT}openai/deployments/${DEPLOYMENT}/chat/completions?api-version=2024-08-01-preview`;
  const response = await axios.post(
    url,
    {
      messages: [
        { role: "system", content: PROMPT },
        { role: "user", content: `Meeting transcript:\n${transcript}` },
      ],
      max_tokens: 1000,
      temperature: 0.3,
    },
    {
      headers: {
        "api-key": KEY,
        "Content-Type": "application/json",
      },
    },
  );

  const raw = response.data.choices[0].message.content;
  const parsed: MeetingResult = JSON.parse(raw);

  // ensure all tasks have correct status type
  parsed.tasks = parsed.tasks.map((t: Task) => ({
    ...t,
    status: "todo" as const,
  }));

  return parsed;
};
