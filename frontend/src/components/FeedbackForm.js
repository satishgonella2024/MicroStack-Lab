import React, { useState } from "react";
import { submitFeedback } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const FeedbackForm = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleFeedback = async (e) => {
    e.preventDefault();
    const response = await submitFeedback({ user_id: userId, message });
    setResponseMessage(response.message || "Feedback submitted!");
  };

  return (
    <div className="card shadow-sm p-3">
      <h3 className="card-title text-center">Submit Feedback</h3>
      <form onSubmit={handleFeedback}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Your feedback"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100">
          <FontAwesomeIcon icon={faPaperPlane} /> Submit
        </button>
        {responseMessage && (
          <p className="text-success text-center mt-3">{responseMessage}</p>
        )}
      </form>
    </div>
  );
};

export default FeedbackForm;