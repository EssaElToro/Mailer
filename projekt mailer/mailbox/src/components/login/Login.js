import React from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const response = await axios.post("/api/login", data);

    if (response.data.success) {
      sessionStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }
  };

  return (
    <div className="Login-container">
      <h1>Mailer Login</h1>
      <form>
        <input ref={emailRef} type="text" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button onClick={loginHandler}>Login</button>
      </form>
    </div>
  );
};

export default Login;
