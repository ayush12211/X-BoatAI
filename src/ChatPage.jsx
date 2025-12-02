import React, { useState } from "react";
import "./ChatPage.css";
import Modal from "./Modal";
import qaData from "./data/qa.json"; 

export default function ChatPage({ history, setHistory }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  // ⭐ Unified Reply Finder
  function getReply(text) {
  if (!text) return "Sorry, Did not understand your query!";

  const cleaned = text.toLowerCase().trim();

  
  if (cleaned.includes("restful"))
    return qaData["what are restful apis"];

 
  if (qaData[cleaned]) return qaData[cleaned];

  // partial fallback
  for (const key of Object.keys(qaData)) {
    if (cleaned.includes(key)) return qaData[key];
  }

  return "Sorry, Did not understand your query!";
}


  // ⭐ Send Handler
  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const botMsg = {
      sender: "ai",
      text: getReply(input),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      liked: null
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  // Starter cards condition
  const STARTER_CARDS = [
    { id: 1, title: "Hi", subtitle: "Get immediate AI response" },
    { id: 2, title: "Hello", subtitle: "Quick greeting response" },
    { id: 3, title: "How are you", subtitle: "Ask about AI status" },
    { id: 4, title: "Help", subtitle: "Get assistance" }
  ];

  const handleStarterClick = (card) => {
    setInput(card.title);
    setTimeout(() => handleSend(), 50);
  };

  // Thumbs Like/Dislike
  const toggleLike = (index, value) => {
    setMessages((prev) => {
      const updated = [...prev];
      updated[index].liked = value;
      return updated;
    });
  };

  // Save & Feedback
  const handleFeedbackSubmit = ({ rating, feedback }) => {
    const convo = {
      id: Date.now(),
      messages,
      rating,
      feedback
    };
    setHistory([...history, convo]);
  };

  return (
    <div className="chat-area">
      
      {/* HERO Section */}
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
            
            {/* Avatar */}
            <img
              src={m.sender === "user" ? "/person.png" : "/logo.png"}
              alt="avatar"
              className="msg-avatar"
            />

            {/* BODY */}
            <div className="msg-body">
              <span className="who">
                {m.sender === "ai" ? "Soul AI" : "You"}
              </span>

             
              <p className="text">{m.text}</p>

              <p className="ts">{m.time}</p>

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

        <button type="submit" className="btn-ask">Ask</button>

        <button
          type="button"
          className="btn-save"
          onClick={() => setShowModal(true)}
        >
          Save
        </button>
      </form>

      {/* MODAL */}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
}
