import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { MailOutlined } from '@ant-design/icons';

import { Form, Input, Button, Divider, message } from 'antd';
import "../../Helper/WHResponsive.css"
import "./RegisterForm.css"

import { connect } from 'react-redux';

import { MD5 } from "crypto-js";
import { validEmail } from '../../Utilities/rules'
import { signInWithGoogle } from '../../Helper/firebase'
import { register } from '../../Models/accountReducer'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterForm = ({ register }) => {

    const [isLoading, setLoading] = useState(false)
    let navigate = useNavigate();

    const signInGoogleClick = async () => {
        // setLoading(true);
        // const user = await signInWithGoogle();

        // if (user == null) {
        //     setLoading(false);
        //     message.error('Login failed! Please login this account again!', 3);
        //     return;
        // }

        // const name = user.displayName;
        // const email = user.email;
        // const password = "";
        // const urlImage = user.photoURL;

        // register({ name, email, password, urlImage }, (result) => {
        //     console.log(result);
        //     if (result) {
        //         message.success('Login successfully!', 3);
        //         navigate('/', { replace: true });
        //     }
        //     else message.error('Login failed! Please login this account again!', 3);
        // });
        // setLoading(false);

    }

    const onFinish = async (values) => {

        if (values.password != values.repassword) {
            message.error('Retype password is not correct! Please check it again!', 3);
            return;
        }

        values.password = MD5(values.password).toString();

        const name = values.fullName;
        const email = values.email;
        const password = values.password;
        const urlImage = "";


        console.log('Received values of form: ', values);
        register({ name, email, password, urlImage }, (result) => {
            console.log(result);
            if (result) {
                message.success('Register successfully!', 3);
                navigate('/', { replace: true });
            }
            else message.error('This account may be registered! Please change your account and try it again!', 3);
        });

    };

    return (
        <div>
            <Form
                name="form_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item name="fullName"
                           validateTrigger={["onSubmit", "onBlur"]}
                            rules={[{ required: true, message: 'Please input your full name!' }]}>
                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Fullname"
                        className='rounded' />
                </Form.Item>

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
                    <Input size="large" prefix={<MailOutlined  className="site-form-item-icon" />} placeholder="Email"
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

                <Form.Item
                    name="repassword"
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
                        placeholder="Retype Password"
                        className='rounded'
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />

                </Form.Item>

                <Form.Item className='m-0'>
                    <Button size={"large"} type="primary" htmlType="submit" className="login-form-button w-100 my-1 rounded">
                        Register
                    </Button>
                </Form.Item>
            </Form>


            <div className='mt-3'> Do you have an account! <Link to="/login">Sign In</Link>
            </div>
        </div >
    );
};

const mapActionToProps = {
    register
}

export default connect(null, mapActionToProps)(RegisterForm);