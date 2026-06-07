import { useEffect, useState } from "react";
import "./App.css";

//const API_BASE = "http://localhost:5000/api/assistant";
const API_BASE = "https://smart-student-assistant-cz2r.onrender.com/api/assistant";
export default function App() {
  const [topics, setTopics] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [planSubjects, setPlanSubjects] = useState("Mathematics, Science, Language");
  const [planHours, setPlanHours] = useState(12);
  const [planDays, setPlanDays] = useState(5);
  const [studyPlan, setStudyPlan] = useState(null);
  const [loadingChat, setLoadingChat] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/topics`)
      .then((res) => res.json())
      .then((data) => setTopics(data.topics || []))
      .catch(() => setTopics([]));
  }, []);

  const handleChatSubmit = async (event) => {
    event.preventDefault();
    if (!chatInput.trim()) return;

    setLoadingChat(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to get a response.");
      }

      setChatHistory((prev) => [
        { role: "user", text: chatInput },
        { role: "assistant", text: data.answer },
        ...prev,
      ]);
      setChatInput("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingChat(false);
    }
  };

  const handlePlanSubmit = async (event) => {
    event.preventDefault();
    setLoadingPlan(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjects: planSubjects.split(",").map((item) => item.trim()).filter(Boolean),
          totalHours: planHours,
          days: planDays,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to create a study plan.");
      }

      setStudyPlan(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingPlan(false);
    }
  };

  return (
    <div className="app">
      <div className="hero">
        <div>
          <h1>Smart Student Assistant</h1>
          <p>Advanced study support with chat guidance, a dynamic plan builder, and actionable learning tips.</p>
        </div>
        <div className="hero__badge">Backend AI-ready · Study planner · Daily focus</div>
      </div>

      <div className="grid-layout">
        <section className="panel panel--accent">
          <h2>AI Study Assistant</h2>
          <p>Ask for study strategies, exam tips, or subject guidance.</p>
          <form onSubmit={handleChatSubmit} className="form-row">
            <input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder="Ask a study question..."
              aria-label="Chat message"
            />
            <button type="submit" disabled={loadingChat}>
              {loadingChat ? "Thinking..." : "Send"}
            </button>
          </form>

          <div className="chat-window">
            {chatHistory.length === 0 && <p className="muted">Your assistant responses will appear here.</p>}
            {chatHistory.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chat-message chat-message--${message.role}`}>
                <strong>{message.role === "user" ? "You" : "Assistant"}:</strong>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Smart study plan</h2>
          <p>Generate a study schedule from your subjects, target hours, and available days.</p>
          <form onSubmit={handlePlanSubmit} className="form-grid">
            <label>
              Subjects
              <input
                value={planSubjects}
                onChange={(event) => setPlanSubjects(event.target.value)}
                placeholder="Math, Science, Language"
              />
            </label>
            <label>
              Total hours
              <input
                type="number"
                min="1"
                value={planHours}
                onChange={(event) => setPlanHours(event.target.value)}
              />
            </label>
            <label>
              Days available
              <input
                type="number"
                min="1"
                value={planDays}
                onChange={(event) => setPlanDays(event.target.value)}
              />
            </label>
            <button type="submit" disabled={loadingPlan}>
              {loadingPlan ? "Building plan..." : "Create plan"}
            </button>
          </form>

          {studyPlan && (
            <div className="plan-result">
              <h3>{studyPlan.summary}</h3>
              <ul>
                {studyPlan.plan.map((item) => (
                  <li key={item.day}>
                    <strong>{item.day}</strong>: {item.focus}
                    <div className="plan-tip">Tip: {item.tip}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="panel panel--topics">
          <h2>Study boosters</h2>
          <div className="topics-grid">
            {topics.map((topic) => (
              <article key={topic.subject} className="topic-card">
                <h3>{topic.subject}</h3>
                <p>{topic.description}</p>
                <div className="topic-tip">Tip: {topic.tip}</div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {error && <div className="error-banner">{error}</div>}
    </div>
  );
}
