import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Login
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.message === 'Login successful!') {
        setFeedbackMessage('Login successful!');
        const profileResponse = await fetch(`http://localhost:5001/profile?username=${username}`);
        const profileData = await profileResponse.json();
        setUserId(profileData.id); // Save user ID
        fetchFeedbacks(profileData.id); // Fetch feedback
      } else {
        setFeedbackMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Submit feedback
  const submitFeedback = async (e) => {
    e.preventDefault();
    if (!userId) {
      setFeedbackMessage('Please login to submit feedback.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5002/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, message }),
      });
      const data = await response.json();
      setFeedbackMessage(data.message);
      setMessage('');
      fetchFeedbacks(userId); // Refresh feedback list
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  // Fetch feedbacks
  const fetchFeedbacks = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5002/feedback?user_id=${userId}`);
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Microservices Sample App</h1>

        {/* Login */}
        <div>
          <h3>Login</h3>
          <form onSubmit={login}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>

        {/* Feedback Form */}
        <div>
          <h3>Submit Feedback</h3>
          <form onSubmit={submitFeedback}>
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit">Submit Feedback</button>
          </form>
          {feedbackMessage && <p>{feedbackMessage}</p>}
        </div>

        {/* Feedback List */}
        <div>
          <h3>Your Feedback</h3>
          {feedbacks.length > 0 ? (
            <ul>
              {feedbacks.map((fb, index) => (
                <li key={index}>
                  {fb.message} <small>({new Date(fb.created_at).toLocaleString()})</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No feedback yet!</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;