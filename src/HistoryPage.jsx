import React, { useState } from "react";
import "./History.css";

export default function HistoryPage({ history }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="history-root">

      {/* LEFT SIDEBAR LIST */}
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

      {/* RIGHT PANEL CONTENT */}
      <div className="history-right">

        <h1 className="history-title">Conversation History</h1>
        <h3 className="history-subtitle">Today's Chats</h3>

        {!selected && (
          <p className="history-empty">Select a conversation to view details.</p>
        )}

        {selected && (
          <div className="conversation-card">

            {selected.messages.map((msg, i) => (
              <div key={i} className="history-msg">
                
                {/* Avatar */}
                <div className="avatar"></div>

                <div className="msg-body">
                  <p className="who">{msg.sender === "ai" ? "Soul AI" : "You"}</p>
                  <p className="msg-text">{msg.text}</p>
                  <p className="timestamp">{msg.time}</p>
                </div>

              </div>
            ))}

            {/* Rating + Feedback */}
            <div className="rating-box">
              <p className="rating-line">
                <strong>Rating:</strong>{" "}
                <span className="stars">
                  {selected.rating ? "★".repeat(selected.rating) : "No rating"}
                </span>
              </p>

              <p className="feedback-line">
                <strong>Feedback:</strong> {selected.feedback || "No feedback provided"}
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
