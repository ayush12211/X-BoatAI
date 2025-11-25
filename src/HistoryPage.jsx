import React, { useState } from "react";
import "./History.css";

export default function HistoryPage({ history }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="history-root">
      {/* SIDEBAR */}
      <aside className="history-list">
        <h2>Past Conversations</h2>

        {history.map((h) => (
          <div
            key={h.id}
            className={`history-item ${selected?.id === h.id ? "active" : ""}`}
            onClick={() => setSelected(h)}
          >
            Conversation {h.id}
          </div>
        ))}
      </aside>

      {/* RIGHT PANEL */}
      <div className="history-right">
        <h1 className="history-title">Conversation History</h1>
        <h3 className="history-subtitle">Today's Chats</h3>

        {!selected && (
          <p className="history-empty">Select a conversation to view.</p>
        )}

        {selected && (
          <div className="conversation-card">
            {selected.messages.map((msg, i) => (
              <div key={i} className="history-msg">

                {/* AVATAR */}
                <img
                  src={
                    msg.sender === "user"
                      ? "/person.png"
                      : "/logo.png"
                  }
                  alt="avatar"
                  className="history-avatar"
                />

                {/* TEXT BODY */}
                <div className="history-msg-body">
                  <p className="who">{msg.sender === "user" ? "You" : "Soul AI"}</p>
                  <p className="msg-text">{msg.text}</p>
                  <p className="timestamp">{msg.time}</p>

                  {/* Like/Dislike Icons ONLY for AI messages */}
                  {msg.sender === "ai" && (
                    <div className="msg-actions">
                      <span>👍</span>
                      <span>👎</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Rating + Feedback */}
            <div className="rating-box">
              <p className="rating-line">
                <strong>Rating:</strong>{" "}
                {selected.rating ? "★".repeat(selected.rating) : "No rating"}
              </p>
              <p className="feedback-line">
                <strong>Feedback:</strong>{" "}
                {selected.feedback || "No feedback provided"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
