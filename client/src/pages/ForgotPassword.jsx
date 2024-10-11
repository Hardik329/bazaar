import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { publicRequest } from "../useFetch";
// import { login } from "../redux/apiCalls";
import "./ForgotPassword.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await publicRequest.post("/auth/resetPassword", { email });
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  if (isSuccess)
    return (
      <div className="login-container">
        <div className="login-wrapper">
          <span className="login-box">
            <span className="back-arrow" onClick={() => navigate(-1)}>
              <ArrowBackIcon style={{ color: "teal", fontSize: "30px" }} />
            </span>
            <h2>FORGOT PASSWORD</h2>
          </span>A password
          reset link has been sent to your email
        </div>
      </div>
    );

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="login-title">FORGOT PASSWORD</h1>
        <form className="login-form">
          <input
            className="fp-input"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="login-button"
            onClick={handleClick}
            disabled={isLoading}
          >
            RESET PASSWORD
          </button>
          {error && (
            <span className="login-error">Something went wrong...</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
