
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./loginPage.css";

// icons
import { Icon } from "react-icons-kit";
import { eyeOff, eye } from "react-icons-kit/feather";

const Login = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post(
        `${process.env.REACT_APP_base_url}/api/users/login`,
        {
          email: form.email,
          password: form.password,
        }
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/");
    } catch (err) {
      console.log("problem", err);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (userData.user) navigate("/");
  }, [userData.user, navigate]);

  const HandleIconChange = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="loginMissionContainer">
        <div className="login-form-container">
          {/* Left side: Form */}
          <div className="login-form">
            <h2 className="title">Login to your account</h2>
            <p className="subtitle">
              Don’t have an account?{" "}
              <Link to="/signup" className="link">
                Create a new account
              </Link>
            </p>

            <form onSubmit={handleSubmit}>
              <input
                className="input"
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
              <div className="password-wrapper">
                <input
                  className="input"
                  type={type}
                  name="password"
                  onChange={handleChange}
                  placeholder="Your Password"
                  required
                />
                <span onClick={HandleIconChange} className="showHide">
                  <Icon icon={icon} size={20} />
                </span>
              </div>

              <button className="btn">Login</button>
            </form>
          </div>
        </div>
        <div className="mission-container">
          {/* Right side: Info */}
          <div className="login-info">
            <h2>Welcome to Ajibar High School Forum</h2>
            <p>
              At Ajibar High School Forum, we believe in fostering a vibrant and
              collaborative educational community. Our platform serves as a
              dedicated space where students can engage in meaningful
              discussions, ask questions, and connect with their peers,
              teachers, and classmates!
            </p>
            <h2>Our Mission</h2>
            <p>
              Ajibar High School Forum is committed to enhancing the educational
              experience by promoting collaboration, curiosity, and
              knowledge-sharing among students. We believe that everyone in our
              school community plays a crucial role in the learning process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

