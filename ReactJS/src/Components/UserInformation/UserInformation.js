import React, { useEffect } from "react";

import styles from "./UserInformation.module.css";

import { Form, Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

import { connect } from "react-redux";
import { MD5 } from "crypto-js";

import { changePassword } from "../../Models/accountReducer";

const UserInformation = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (values.password !== values.repassword) {
      message.error("Re-enter password incorrect! Please enter again", 3);
      return;
    }

    values.password = MD5(values.password).toString();

    const id = props.user.idAccount;
    const name = values.fullName;
    const password = values.password;
    const urlImage = "";

    props.changePassword({ id, name, password, urlImage }, (result) => {
      if (result.onSuccess) {
        message.success("Change password complete!", 3);
        props.setIsModalVisible(false);
        form.resetFields();
      } else {
        message.error("Can not change password!", 3);
      }
    });
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Avatar size={50}>{props.user.name[0]}</Avatar>
        <div style={{ fontSize: "20px" }}>{props.user.name}</div>
      </div>
      <Form
        form={form}
        name="form_login"
        className={styles.login - form}
        onFinish={onFinish}
      >
        <Form.Item>
          <div className={styles.Email}>
            <MailOutlined className={[styles.email_icon]} /> {props.user.email}
          </div>
        </Form.Item>

        <Form.Item
          name="fullName"
          validateTrigger={["onSubmit", "onBlur"]}
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Fullname"
            defaultValue={props.user.name}
            className="rounded"
          />
        </Form.Item>

        <Form.Item
          name="password"
          validateTrigger={["onSubmit", "onBlur"]}
          rules={[
            {
              validator: async (_, password) => {
                if (!password) {
                  return Promise.reject(
                    new Error("Please input your new password")
                  );
                }
              },
            },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
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
              required: true,
              message: "Please confirm your password!",
            },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
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
            className="login-form-button w-100 my-1 rounded"
          >
            Cập nhập thông tin tài khoản
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.account.account,
});

const mapActionToProps = {
  changePassword,
};

export default connect(mapStateToProps, mapActionToProps)(UserInformation);
