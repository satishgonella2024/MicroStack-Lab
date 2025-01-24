import React, { useState } from "react";
import { registerUser } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await registerUser({ username, email, password });
    setMessage(response.message || "Registration successful!");
  };

  return (
    <div className="card shadow-sm p-3">
      <h3 className="card-title text-center">Register</h3>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-100">
            <FontAwesomeIcon icon={faUserPlus} /> Register
        </button>
      </form>
      {message && <p className="text-success text-center mt-2">{message}</p>}
    </div>
  );
};

export default RegisterForm;