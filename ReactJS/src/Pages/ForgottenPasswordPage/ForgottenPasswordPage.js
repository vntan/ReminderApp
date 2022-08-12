import React, { useState, useEffect } from "react";

import { Col, Row } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Helper/WHResponsive.css";
import "./ForgottenPasswordPage.css";

import emailjs from "@emailjs/browser";
import GetEmailForm from "../../Components/ForgotPasswordForm/GetEmailForm/GetEmailForm";
import GetCodeForm from "../../Components/ForgotPasswordForm/GetCodeForm/GetCodeForm";
import ChangePasswordForm from "../../Components/ForgotPasswordForm/ChangePasswordForm/ChangePasswordForm";

import { useNavigate, useLocation } from "react-router-dom";
import { KEY_ACCOUNT_STATE } from "../../Utilities/Constants";

function ForgottenPasswordPage() {
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  let navigate = useNavigate();

  const [status, setStatus] = useState("get email");
  const [email, setEmail] = useState("thereisnoemailherelmao");
  const [emailCode, setEmailCode] = useState("thereisnocodeherelmao");

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem(KEY_ACCOUNT_STATE));
    if (account != null && account.isLogin) navigate(from, { replace: true });
  });

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleGetEmail = (email) => {
    setEmail(email);
    const code = makeid(8);
    setEmailCode(code);
    emailjs
      .send(
        "service_8aggr1e",
        "template_6qorkv8",
        {
          code: code,
        },
        "glNVNpMPMrejabgxK"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setStatus("get code");
  };

  const handleGetCode = () => {
    setStatus("change password");
  };

  const handleGoBackFromCode = () => {
    setStatus("get email");
  };

  return (
    <section className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <Row className="w-90 w-md-75 w-lg-60 h-70 wrapper">
        <Col xs={{ span: 0 }} md={{ span: 9 }}>
          <div className="imgWrapper">
            <img
              src="https://images.unsplash.com/photo-1518976024611-28bf4b48222e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80"
              alt="Reminder"
            ></img>
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          md={{ span: 15 }}
          className="d-flex flex-column justify-content-center p-3"
        >
          <h1>Reminder</h1>
          {status === "get email" && (
            <GetEmailForm handleGetEmail={handleGetEmail} />
          )}
          {status === "get code" && (
            <GetCodeForm
              handleGetCode={handleGetCode}
              handleGoBackFromCode={handleGoBackFromCode}
              emailCode={emailCode}
            />
          )}
          {status === "change password" && (
            <ChangePasswordForm userEmail={email} />
          )}
        </Col>
      </Row>
    </section>
  );
}

export default ForgottenPasswordPage;
