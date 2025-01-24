import React, { useState } from "react";
import { getFeedbackByUser } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const FeedbackList = () => {
  const [userId, setUserId] = useState("");
  const [feedback, setFeedback] = useState([]);

  const fetchFeedback = async () => {
    const response = await getFeedbackByUser(userId);
    setFeedback(response);
  };

  return (
    <div className="card shadow-sm p-3">
      <h3 className="card-title text-center">Feedback List</h3>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={fetchFeedback} className="btn btn-primary w-100 mt-2">
          <FontAwesomeIcon icon={faSearch} /> Fetch Feedback
        </button>
      </div>
      <ul className="list-group mt-3">
        {feedback.map((item) => (
          <li
            className="list-group-item d-flex flex-column align-items-start"
            key={item.id}
          >
            <p className="mb-1">{item.message}</p>
            <small className="text-muted">
              Submitted at: {item.created_at}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;