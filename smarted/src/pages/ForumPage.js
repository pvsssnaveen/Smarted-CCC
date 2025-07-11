import { useState, useEffect, useRef } from "react";
import "./ForumPage.css"; // 👈 Ensure this CSS file exists

export default function ForumPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://smartedbackend.onrender.com/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const botMessage = { role: "bot", text: data.answer || "No response." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Error contacting AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="forum-container">
      <header className="forum-header">💬 Doubt Forum</header>

      <div className="chat-area">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role === "user" ? "user" : "bot"}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="typing-indicator">🤖 Agent is typing...</div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Fixed input at bottom */}
      <div className="input-area-fixed">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Ask your doubt..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
