import { useState, useEffect, useRef } from "react";

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
        { role: "bot", text: "Error contacting AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <h2 className="text-2xl font-bold p-4">💬 Doubt Forum</h2>

      {/* Chat area */}
      <div className="flex-1 bg-yellow overflow-y-auto px-4 space-y-2 flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs px-4 py-2 rounded-xl text-black  ${
              msg.role === "user"
                ? "bg-blue-600 self-end text-right"
                : "bg-blue-400 self-start text-left"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-600 italic">Gemini is typing...</div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input at bottom */}
      <div className="p-4 bg-white border-t flex items-center">
        <input
          type="text"
          placeholder="Ask your doubt..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 mr-2 focus:outline-none focus:ring focus:border-blue-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}
