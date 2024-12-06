import React, { useState } from "react";
import axios from "axios";
import { UNSAFE_NavigationContext, useNavigate } from "react-router-dom";
import PT from "prop-types";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mockAPI = {
    // Hardcoded users cause I could'nt figure out how to not
    users: [
      { username: "gandalf", password: "mellon" },
      { username: "frodo", password: "bagginses" },
    ],
    login: ({ username, password }) => {
      const user = mockAPI.users.find(
        (u) => u.username === username && u.password === password
      );
      console.log("Attempting login with:", username, password);
      if (!user) {
        console.error("Invalid credentials for username:", username);
        alert("I have no memory of those credentials...");
      }
      return { token: "mock-token" }; // Simulated token
    },
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const payload = mockAPI.login({
        username: username.trim(),
        password: password.trim(),
      });
      if (!payload) {
        navigate("/");
      } else if (payload) {
        localStorage.setItem("token", payload.token); // Save token
        navigate("/books"); // Redirect to books page
      }
    } catch (error) {
      alert(error.message);
    } // Show error message
  };

  const isDisabled = () => {
    return username.trim().length < 5 || password.trim().length < 5;
  };

  return (
    <>
      <h2>Login</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            placeholder="Thy name goes here"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            placeholder="(Elvish for friend)"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button disabled={isDisabled()} type="submit">
          Login
        </button>
      </form>
    </>
  );
};
export default Login;
