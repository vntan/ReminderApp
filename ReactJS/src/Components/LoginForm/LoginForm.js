import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Divider, message } from 'antd';
import "../../Helper/WHResponsive.css"
import "./LoginForm.css"

import { connect } from 'react-redux';


import { validEmail } from '../../Utilities/rules'
import { signInWithGoogle } from '../../Helper/firebase'
import { register } from '../../Models/accountReducer'
import { useNavigate, useLocation, Navigate, } from "react-router-dom";


const LoginForm = props => {

    const [isLoading, setLoading] = useState(false)
    let navigate = useNavigate();

    const signInGoogleClick = async () => {
        setLoading(true);
        const user = await signInWithGoogle();

        if (user == null) {
            setLoading(false);
            message.error('Login failed! Please login this account again!');
            return;
        }

        const name = user.displayName;
        const email = user.email;
        const password = "";
        const urlImage = user.photoURL;

        props.register({ name, email, password, urlImage }, (result) =>{
            console.log(result);
            if (result) {
                message.success('Login successfully!');
                navigate('/', { replace: true });
            }
            else message.error('Login failed! Please login this account again!');
        });
        setLoading(false);
       
    }

    const onSubmitFinish = async (values) => {

        props.onFinish(values, (result) => {
            if (result) {
                message.success('Login successfully!');
                navigate('/', { replace: true });
            }
            else message.error('Login failed! Please check your account!');
        })

    }

    return (
        <div>
            <Form
                name="form_login"
                className="login-form"
                onFinish={onSubmitFinish}
            >
                <Form.Item
                    name="email"
                    validateTrigger={["onSubmit", "onBlur"]}
                    rules={[
                        {
                            validator: async (_, username) => {
                                if (!username || !validEmail.exec(username)) {
                                    return Promise.reject(new Error('Email is incorrect'));
                                }
                            }
                        }
                    ]}
                >
                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email"
                        className='rounded' />
                </Form.Item>
                <Form.Item
                    name="password"
                    validateTrigger={["onSubmit", "onBlur"]}
                    rules={[
                        {
                            validator: async (_, password) => {
                                if (!password) {
                                    return Promise.reject(new Error('Password is incorrect'));
                                }
                            }
                        }
                    ]}
                >
                    <Input.Password
                        size="large"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                        className='rounded'
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />

                </Form.Item>
                {/* <Form.Item className='m-0'>

                    <a className="login-form-forgot w-100 d-block my-1" href="#" style={{ textAlign: 'right' }}>
                        Forgot password
                    </a>
                </Form.Item> */}

                <Form.Item className='m-0'>
                    <Button size={"large"} type="primary" htmlType="submit" className="login-form-button w-100 my-1 rounded">
                        Log in
                    </Button>

                </Form.Item>
                <Divider plain>OR</Divider>

            </Form>

            <Button size={"large"}
                type="primary"
                htmlType="submit"
                onClick={signInGoogleClick}
                loading={isLoading}
                className="login-form-button w-100 rounded btnGoogle">

                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                    alt="Reminder" className='google ' ></img>
                <span>Login with Google</span>

            </Button>

            <div className='mt-3'> Don't have an account! <a href="">Sign Up</a>
            </div>
        </div >
    );
};

const mapActionToProps = {
    register
}

export default connect(null, mapActionToProps)(LoginForm);