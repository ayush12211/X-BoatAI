import React, { useState } from "react";
import "./Modal.css";

export default function Modal({ onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
    onSubmit({ rating, feedback });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <button className="btn-close" onClick={onClose}>×</button>

        <h3>💡 Provide Additional Feedback</h3>

        <div className="rating-row">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "star selected" : "star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>

        <div className="modal-actions">
          <button className="btn btn-submit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
