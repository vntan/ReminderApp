import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { LockOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import "../../../Helper/WHResponsive.css";
import styles from "./GetCodeForm.module.css";

import { connect } from "react-redux";

const GetCodeForm = ({ handleGoBackFromCode, handleGetCode, emailCode }) => {
  const onFinish = async (values) => {
    handleGetCode();
  };

  return (
    <div>
      <Form name="form_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="code"
          validateTrigger={["onSubmit"]}
          rules={[
            {
              validator: async (_, code) => {
                if (!code || code.length != 8) {
                  return Promise.reject(new Error("Code in 8-digit format!"));
                }
                if (code !== emailCode) {
                  return Promise.reject(new Error("Invalid code!"));
                }
              },
            },
          ]}
        >
          <Input
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Code"
            className="rounded"
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
        onClick={() => handleGoBackFromCode()}
        className="w-100 my-1 rounded"
      >
        Go back!
      </Button>
    </div>
  );
};

const mapActionToProps = {};

export default connect(null, mapActionToProps)(GetCodeForm);
