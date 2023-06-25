import { useState } from "react";
import "./Register.css";

const Register = () => {
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  };

  const handleClick =(e)=>{
    e.preventDefault()
  }

  return (
    <div className="reg-container">
      <div className="reg-wrapper">
        <h1 className="reg-title">CREATE AN ACCOUNT</h1>
        <form className="reg-form">
          <input
            className="reg-input"
            placeholder="name"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="reg-input"
            placeholder="last name"
            name="lastname"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="reg-input"
            placeholder="username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="reg-input"
            placeholder="email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="reg-input"
            placeholder="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="reg-input"
            placeholder="confirm password"
            name="confirm-password"
            onChange={(e) => handleChange(e)}
          />
          <div className="reg-agreement">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </div>
          <button className="reg-button" onClick={e=>handleClick(e)}>CREATE</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
