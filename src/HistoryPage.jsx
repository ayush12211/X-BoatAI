import React from "react";
import "./History.css";

export default function HistoryPage({ history }) {
  return (
    <div className="history-container">

      {/* PAGE TITLE */}
      <h2 className="history-title">Conversation History</h2>

      {/* If no conversations */}
      {history.length === 0 && (
        <p className="history-empty">No conversations found.</p>
      )}

      {/* MAP THROUGH CONVERSATIONS */}
      {history.map((convo) => (
        <div key={convo.id} className="history-block">

          {/* Each message bubble */}
          {convo.messages.map((m, i) => (
            <div
              key={i}
              className="history-msg"
              style={{
                background:
                  m.sender === "ai"
                    ? "linear-gradient(90deg, rgba(235,226,250,0.9), rgba(245,240,250,0.95))"
                    : "#ffffff",
              }}
            >
              {/* Avatar */}
              <img
                src={m.sender === "user" ? "/person.png" : "/logo.png"}
                alt="avatar"
                className="history-avatar"
              />

              <div className="history-msg-body">
                <span className="history-who">
                  {m.sender === "ai" ? "Soul AI" : "You"}
                </span>

                {/* Cypress wants p.text for messages */}
                <p className="text">{m.text}</p>

                <div className="history-ts">{m.time}</div>
              </div>
            </div>
          ))}

          {/* Show rating & feedback if exist */}
          {(convo.rating || convo.feedback) && (
            <div className="history-feedback-box">
              {convo.rating && (
                <p className="history-rating">Rating: {convo.rating} ⭐</p>
              )}
              {convo.feedback && (
                <p className="history-feedback">Feedback: {convo.feedback}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
