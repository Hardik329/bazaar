import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { publicRequest } from "../useFetch";
// import { login } from "../redux/apiCalls";
import "./ForgotPassword.css";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const code = useParams().code;

  const handleClick = async (e) => {
    e.preventDefault();
    const { email, error } = await verifyCode();
    if (error) setError(error);

    publicRequest
      .put("/users/reset/password", { email, password })
      .then((res) => setIsSuccess(true))
      .catch((err) => setError(err));

    // login(dispatch, { username, password });
  };

  const verifyCode = async () => {
    console.log(code);
    try {
      const res = await publicRequest.post("/auth/verifyCode", { code });
      const email = res.data;
      return { error: null, email };
    } catch (error) {
      console.log(error);
      return { error, email: null };
    }
  };

  useEffect(() => {
    // verifyCode();
  }, [location]);

  if (isSuccess)
    return (
      <div className="login-container">
        <div className="login-wrapper">
          <span className="login-box">
            <h2>RESET PASSWORD</h2>
          </span>
          Password reset successfully
        </div>
      </div>
    );

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="login-title">RESET PASSWORD</h1>
        <form className="login-form">
          <input
            className="login-input"
            placeholder="new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login-button"
            onClick={handleClick}
            // disabled={isLoading}
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
