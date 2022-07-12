import React, { useEffect } from 'react';

import { Col, Row } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../Helper/WHResponsive.css"
import "./RegisterPage.css";
import RegisterForm from '../../Components/RegisterForm/RegisterForm'

import { useNavigate, useLocation } from "react-router-dom";
import { KEY_ACCOUNT_STATE } from '../../Utilities/Constants'

function RegisterPage() {

    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    let navigate = useNavigate();
    
    useEffect(() => {
        const account = JSON.parse(localStorage.getItem(KEY_ACCOUNT_STATE));
        if(account != null && account.isLogin)
            navigate(from, { replace: true });
    });

    return (
        <section className='vh-100 vw-100 d-flex justify-content-center align-items-center'>
            <Row className='w-90 w-md-75 w-lg-60 h-70 wrapper'>
                <Col xs={{ span: 0 }} md={{ span: 9 }}>
                    <div className='imgWrapper'>
                        <img src="https://images.unsplash.com/photo-1518976024611-28bf4b48222e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80"
                            alt="Reminder"></img>
                    </div>

                </Col>
                <Col xs={{ span: 24 }} md={{ span: 15 }} className="d-flex flex-column justify-content-center p-3">
                    <h1>Reminder</h1>
                    <RegisterForm></RegisterForm>
                </Col>
            </Row >
        </section >
    );
}

export default RegisterPage;