import React, { useState } from "react";
import "./ChatPage.css";
import Modal from "./Modal";

// Smarter match dataset
const SAMPLE_QA = {
  hello: "Hi there! How can I assist you today?",
  "how are you": "I'm functioning at full capacity!",
  help: "Sure! Tell me what you need help with.",
  weather:
    "I don't have live weather data in this demo, but I can explain how to integrate a weather API.",
  location:
    "I cannot access your location here, but real apps can request location permission.",
  temperature:
    "Temperature is part of weather data. You can integrate a weather API to fetch it.",
};

const STARTER_CARDS = [
  {
    id: 1,
    title: "Hi, what is the weather",
    subtitle: "Get immediate AI generated response",
  },
  {
    id: 2,
    title: "Hi, what is my location",
    subtitle: "Get immediate AI generated response",
  },
  {
    id: 3,
    title: "Hi, what is the temperature",
    subtitle: "Get immediate AI generated response",
  },
  {
    id: 4,
    title: "Hi, how are you",
    subtitle: "Get immediate AI generated response",
  },
];

export default function ChatPage({ history, setHistory }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  function findReplyFor(text) {
    if (!text) return "Sorry, Did not understand your query!";
    const lower = text.toLowerCase();

    // exact match
    for (const key of Object.keys(SAMPLE_QA)) {
      if (lower === key) return SAMPLE_QA[key];
    }

    // partial match
    for (const key of Object.keys(SAMPLE_QA)) {
      if (lower.includes(key)) return SAMPLE_QA[key];
    }

    // fallback
    if (
      lower.includes("hi") ||
      lower.includes("hello") ||
      lower.includes("hey")
    )
      return SAMPLE_QA["hello"];

    if (lower.includes("how are")) return SAMPLE_QA["how are you"];

    if (lower.includes("help")) return SAMPLE_QA["help"];

    return "Sorry, Did not understand your query!";
  }

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    const botMsg = {
      sender: "ai",
      text: findReplyFor(input),
      time: new Date().toLocaleTimeString(),
      liked: null,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleStarterClick = (card) => {
    setInput(card.title);
    setTimeout(() => handleSend(), 20);
  };

  const toggleLike = (index, value) => {
    setMessages((prev) => {
      const updated = [...prev];
      updated[index].liked = value;
      return updated;
    });
  };

  const handleFeedbackSubmit = ({ rating, feedback }) => {
    const convo = {
      id: Date.now(),
      messages,
      rating,
      feedback,
    };
    setHistory([...history, convo]);
  };

  return (
    <div className="chat-area">
      {/* HERO — only when no messages */}
      {messages.length === 0 && (
        <section className="hero">
          <h1>How Can I Help You Today?</h1>
          <div className="avatar" />
        </section>
      )}

      {/* STARTER CARDS */}
      {messages.length === 0 && (
        <div className="cards-grid">
          {STARTER_CARDS.map((c) => (
            <article
              key={c.id}
              className="card"
              onClick={() => handleStarterClick(c)}
            >
              <h3>{c.title}</h3>
              <p>{c.subtitle}</p>
            </article>
          ))}
        </div>
      )}

      {/* MESSAGE LIST */}
      <div className="conv-list">
        {messages.map((m, i) => (
          <div key={i} className="msg">
            <img
      src={m.sender === "user" ? "/person.png" : "/logo.png"}
      alt="avatar"
      className="msg-avatar"
    />

            <div className="msg-body">
              <div className="who">{m.sender === "ai" ? "Soul AI" : "You"}</div>
              <p className="text">{m.text}</p>
              <div className="ts">{m.time}</div>

              {m.sender === "ai" && (
                <div className="msg-actions floating">
                  <button
                    className="action-btn"
                    onClick={() => toggleLike(i, true)}
                  >
                    👍
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => toggleLike(i, false)}
                  >
                    👎
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT BAR */}
      <form className="input-row" onSubmit={handleSend}>
        <input
          className="chat-input"
          placeholder="Message Bot AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit" className="btn-ask">
          Ask
        </button>

        <button
          type="button"
          className="btn-save"
          onClick={() => setShowModal(true)}
        >
          Save
        </button>
      </form>

      {/* FEEDBACK MODAL */}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
}
