import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./SignUp.css";

// icons
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const SignUp = () => {
  const [form, setForm] = useState({});
  const [userData, setUserData] = useContext(UserContext);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_base_url}/api/users`, form);
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
    } catch (error) {
      console.log("problem ==>", error.response.data.msg);
      alert(error.response.data.msg);
    }
  };

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
    <div className="signup-page">
      <div className="signup-card">
        <div className="form-section">
          <h2 className="title">Join The Community</h2>
          <p className="subtitle">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="form">
            <input
              className="input"
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Email"
            />

            <div className="name-fields">
              <input
                className="input"
                name="firstName"
                onChange={handleChange}
                type="text"
                placeholder="First Name"
              />
              <input
                className="input"
                name="lastName"
                onChange={handleChange}
                type="text"
                placeholder="Last Name"
              />
            </div>

            <input
              className="input"
              name="userName"
              onChange={handleChange}
              type="text"
              placeholder="User Name"
            />

            <div className="password-field">
              <input
                className="input"
                onChange={handleChange}
                name="password"
                type={type}
                placeholder="Password"
              />
              <span className="showHide">
                <Icon icon={icon} size={20} onClick={HandleIconChange} />
              </span>
            </div>

            <button className="btn">Agree and Join</button>
          </form>

          <p className="policy">
            I agree to the{" "}
            <Link to="" className="link">
              privacy policy
            </Link>{" "}
            and{" "}
            <Link to="" className="link">
              terms of service
            </Link>
            .
          </p>

          <Link to="/login" className="link alt-link">
            Already have an account?
          </Link>
        </div>

        <div className="info-section">
          <h1>Welcome to Ajibar High School Forum</h1>
          <h3>Key Features</h3>
          <div>
            <h4>I. Ask and Learn</h4>
            <p>
              Pose questions related to your studies, assignments, or any
              educational topic, and receive insightful responses from your
              fellow students, teachers, and classmates.
            </p>
          </div>
          <div>
            <h4>II. Community-driven Knowledge</h4>
            <p>
              Tap into the collective knowledge of Ajibar High School. Everyone
              has something valuable to contribute, creating a dynamic learning
              environment.
            </p>
          </div>
          <div>
            <h4>III. Supportive Network</h4>
            <p>
              Connect with your classmates and teachers outside the classroom.
              Strengthen the sense of community by sharing ideas, experiences,
              and helping each other grow academically.
            </p>
          </div>
          <h4>Get Started</h4>
          <p>
            Join the Ajibar High School Forum today and be part of a community
            where learning knows no bounds. Ask questions, share your insights,
            and embark on a journey of collaborative learning!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
