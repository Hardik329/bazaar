import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../redux/apiCalls";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, isLoading, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser]);

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="login-title">SIGN IN</h1>
        <form className="login-form">
          <input
            className="login-input"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login-button"
            onClick={handleClick}
            disabled={isLoading}
          >
            LOGIN
          </button>
          {error && (
            <span className="login-error">Something went wrong...</span>
          )}
          <Link style={{ color: "black", textDecoration: "none" }}>
            <span className="login-link">FORGOT PASSWORD?</span>
          </Link>
          <Link
            to="/register"
            style={{ color: "black", textDecoration: "none" }}
          >
            <span className="login-link">CREATE A NEW ACCOUNT</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
