import React, { useState } from "react";
import "./Feedback.css";

export default function FeedbackPage({ history }) {
  const allFeedback = history.filter((h) => h.rating !== null);
  const [filter, setFilter] = useState(0);

  const filtered =
    filter === 0
      ? allFeedback
      : allFeedback.filter((f) => f.rating === filter);

  return (
    <div className="feedback-root">
      
      {/* Header Row */}
      <div className="feedback-header">
        <h2>All Feedback</h2>

        <div className="feedback-controls">
          <label>Filter by Rating:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(Number(e.target.value))}
            className="filter-select"
          >
            <option value={0}>All</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} Stars
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Feedback Items */}
      <div className="feedback-list">
        {filtered.map((f) => (
          <div key={f.id} className="feedback-card">
            <h4>Conversation {f.id}</h4>

            <p>
              Rating: <span className="pill">{f.rating}★</span>
            </p>

            <p className="meta">Feedback: {f.feedback}</p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="feedback-empty">No feedback found.</p>
      )}
    </div>
  );
}
