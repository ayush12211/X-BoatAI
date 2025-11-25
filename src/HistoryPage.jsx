import React, { useState } from "react";
import "./History.css";

export default function HistoryPage({ history }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="history-container">
      
      {/* LEFT SIDEBAR LIST */}
      <aside className="history-left">
        <h2 className="history-title">Past Conversations</h2>

        {history.length === 0 && (
          <p className="history-empty">No saved conversations yet.</p>
        )}

        {history.map((h) => (
          <div
            key={h.id}
            className="history-item"
            onClick={() => setSelected(h)}
          >
            <span>Conversation {h.id}</span>
          </div>
        ))}
      </aside>

      {/* RIGHT DETAIL PANEL */}
      <div className="history-right">
        {!selected && (
          <p className="history-placeholder">Select a conversation to view.</p>
        )}

        {selected && (
          <div>
            <h3 className="history-detail-title">Conversation Detail</h3>

            <div className="history-messages">
              {selected.messages.map((m, i) => (
                <div key={i} className="history-msg-row">

                  {/* Avatar */}
                  <img
                    src={m.sender === "user" ? "/person.png" : "/logo.png"}
                    alt="avatar"
                    className="history-avatar"
                  />

                  {/* Message Text – Cypress REQUIRES <p> */}
                  <p className="history-msg-text">{m.text}</p>
                </div>
              ))}
            </div>

            {/* Rating + Feedback */}
            <div className="history-feedback-box">
              <p><strong>Rating:</strong> {selected.rating ?? "No rating"}</p>
              <p><strong>Feedback:</strong> {selected.feedback || "No feedback provided"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
