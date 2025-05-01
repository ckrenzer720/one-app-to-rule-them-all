import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mockAPI = {
    users: [
      { username: "gandalf", password: "mellon" },
      { username: "frodo", password: "bagginses" },
    ],
    login: ({ username, password }) => {
      const user = mockAPI.users.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) {
        alert("I have no memory of those credentials...");
        return null;
      }
      return { token: "mock-token" };
    },
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const payload = mockAPI.login({
      username: username.trim(),
      password: password.trim(),
    });
    if (payload) {
      localStorage.setItem("token", payload.token);
      navigate("/books");
    }
  };

  const isDisabled = () => {
    return username.trim().length < 5 || password.trim().length < 5;
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            placeholder="What is your name?"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            placeholder="(Elvish for friend)"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button disabled={isDisabled()} type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
