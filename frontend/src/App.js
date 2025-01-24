import React from "react";
import RegisterForm from "./components/RegisterForm";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

const App = () => {
  return (
    <div>
      <header className="hero-section">
        <h1 className="hero-title">MicroStack Lab</h1>
        <p className="hero-subtitle">Empowering feedback and user interaction.</p>
      </header>
      <main className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="custom-card p-4">
              <RegisterForm />
            </div>
          </div>
          <div className="col-md-4">
            <div className="custom-card p-4">
              <FeedbackForm />
            </div>
          </div>
          <div className="col-md-4">
            <div className="custom-card p-4">
              <FeedbackList />
            </div>
          </div>
        </div>
      </main>
      <footer className="footer-section">
        <p>© 2025 MicroStack Lab. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;