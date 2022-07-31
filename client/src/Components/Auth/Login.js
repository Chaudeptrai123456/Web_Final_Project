import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style/Log.css";
import AuthContext from "../context/AuthProvider";
const LOGIN_URL = '/login';
const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [userName, setUser] = useState("");
  const [userPassword, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [userName, userPassword]);

  const { setAuth } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/user/login',
        JSON.stringify({ userName,userPassword  }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ userName, userPassword, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (

      <div className="container">
        <div className="forms">
          <div className="form login">
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Enter user name"
                  required
                  id="user"
                  ref={userRef}
                  value={userName}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                ></input>
                <i className="uil uil-envelope icon"></i>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  required
                  onChange={(e) => setPwd(e.target.value)}
                  value={userPassword}
                ></input>
                <i className="uil uil-lock icon"></i>
              </div>

              <div className="checkbox-text">
                <div className="checkbox-content">
                  <input type="checkbox" id="logCheck"></input>
                  <label for="logCheck" className="text">
                  Organization
                  </label>
                </div>
                <a href="#" className="text">
                  Forgot password?
                </a>
              </div>
              <div className="input-field button">
                <Link to="/detail/:projectsId">
                  <input type="button" value="Login"></input>
                </Link>
              </div>
            </form>

            <div className="login-signup">
              <span className="text">
                Not a member?
                <a href="/Register" className="text signup-text">
                  {" "} Sign up
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
  );
}
export default Login;
