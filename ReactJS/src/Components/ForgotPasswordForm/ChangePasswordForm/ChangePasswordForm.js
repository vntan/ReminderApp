import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { LockOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";
import "../../../Helper/WHResponsive.css";
import styles from "./ChangePasswordForm.module.css";

import { connect } from "react-redux";
import { updatePassword } from "../../../Models/accountReducer";
import { useNavigate } from "react-router-dom";
import { MD5 } from "crypto-js";

const ChangePasswordForm = ({ userEmail, updatePassword }) => {
  let navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.repassword) {
      message.error(
        "Retype password is not correct! Please check it again!",
        3
      );
      return;
    }

    values.password = MD5(values.password).toString();

    const email = userEmail;
    const password = values.password;

    console.log("Received values of form: ", values);
    updatePassword({ email, password }, (result) => {
      console.log(result);
      if (result) message.success("Change password successfully!", 3);
      else message.error("Change password failed! Please try again!", 3);
      navigate("/login", { replace: true });
    });
  };

  return (
    <div>
      <Form name="form_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="password"
          validateTrigger={["onSubmit", "onBlur"]}
          rules={[
            {
              validator: async (_, password) => {
                if (!password) {
                  return Promise.reject(new Error("Password is incorrect"));
                }
              },
            },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            className="rounded"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item
          name="repassword"
          validateTrigger={["onSubmit", "onBlur"]}
          rules={[
            {
              validator: async (_, password) => {
                if (!password) {
                  return Promise.reject(new Error("Password is incorrect"));
                }
              },
            },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Retype Password"
            className="rounded"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item className="m-0">
          <Button
            size={"large"}
            type="primary"
            htmlType="submit"
            className="w-100 my-1 rounded"
          >
            Confirm!
          </Button>
        </Form.Item>
      </Form>

      <Button
        size={"large"}
        type="primary"
        style={{
          color: "black",
          backgroundColor: "white",
          border: "none",
          boxShadow: "0px 0px 2px #ababab",
        }}
        onClick={() => {
          navigate("/login", { replace: true });
        }}
        className="w-100 my-1 rounded"
      >
        I remembered my password!
      </Button>
    </div>
  );
};

const mapActionToProps = {
  updatePassword,
};

export default connect(null, mapActionToProps)(ChangePasswordForm);
