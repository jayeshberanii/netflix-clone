import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";


function Login() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = async () => {
    try {
      const { email, password } = formValue;
      await signInWithEmailAndPassword(firebaseAuth, email, password)
    } catch (error) {
      // console.error(error.message);
    }
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    currentUser && navigate("/");
  });
  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login={false} />
        <div className="form-container d-flex flex-column align-items-center justify-content-center">
          <div className="form d-flex flex-column align-items-center justify-content-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container d-flex flex-column">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValue.email}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValue.password}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <button onClick={handleLogIn}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;

export default Login;
