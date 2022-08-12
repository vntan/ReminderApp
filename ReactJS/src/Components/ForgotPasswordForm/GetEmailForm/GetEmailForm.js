import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input, Button} from "antd";
import "../../../Helper/WHResponsive.css";
import styles from "./GetEmailForm.module.css";

import { connect } from "react-redux";

import { validEmail } from "../../../Utilities/rules";
import { Link } from "react-router-dom";

const GetEmailForm = ({ handleGetEmail }) => {

  const onFinish = async (values) => {
    handleGetEmail(values.email);

  };

  return (
    <div>
      <Form name="form_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="email"
          validateTrigger={["onSubmit", "onBlur"]}
          rules={[
            {
              validator: async (_, username) => {
                if (!username || !validEmail.exec(username)) {
                  return Promise.reject(new Error("Email is incorrect"));
                }
              },
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            className={styles.rounded}
          />
        </Form.Item>

        <Form.Item className="m-0">
          <Button
            size={"large"}
            type="primary"
            htmlType="submit"
            className="login-form-button w-100 my-1 rounded"
          >
            Send code to my email!
          </Button>
        </Form.Item>
      </Form>

      <div className="mt-3">
        {" "}
        Nah I remembered! <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
};

const mapActionToProps = {

};

export default connect(null, mapActionToProps)(GetEmailForm);
