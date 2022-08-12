import React,{useState} from "react";

import styles from "./MainPage.module.css";
import "./MainPageGlobal.css";

import { Layout, Menu, Avatar, Dropdown } from "antd";
import { Button, Modal } from 'antd';
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { logout } from "../../Models/accountReducer";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

import UserInformation from "../../Components/UserInformation/UserInformation";

const { Header, Content } = Layout;

const MainPage = ({ state, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const mainMenuItem = [
    {
      label: "My tasks",
      key: "mytasks",
      onClick: () => { navigate('mytasks'); }
    },
    {
      label: "Projects",
      key: "projects",
      style: { marginLeft: "8%" },
      onClick: () => { navigate('projects'); },
    },
  ]

  const selectedKey = () => {
    const url = location.pathname.toLowerCase();
    console.log(url);
    for (const item of mainMenuItem)
      if (url.includes(item.key.toLowerCase()))
        return item.key;

    return '';
  }

  const handleLogout = () => {
    console.log("Log out");
    logout();
    navigate('/login', {replace: true});
  };

  const userMenu = (
    <Menu
      items={[
        {
          key: "Information",
          label: (
            <div className={styles.inforDiv} onClick={showModal}>
              <UserOutlined style={{ fontSize: "22px" }} />
              <p style={{ margin: 0, paddingLeft: "10px" }}>User Information</p>
            </div>
          ),
        },
        {
          key: "SignOut",
          label: (
            <div className={styles.inforDiv} onClick={handleLogout}>
              <LogoutOutlined style={{ fontSize: "22px" }} />
              <p style={{ margin: 0, paddingLeft: "10px" }}>Sign out</p>
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <>
      <Layout>
        <Header className={styles.header}>
          <div style={{ width: '24vw', maxWidth: '160px' }}></div>
          <Menu
            theme="light"
            mode="horizontal"
            className={styles.menu}
            selectedKeys={[selectedKey()]}
            items={mainMenuItem}
          />
          <Dropdown overlay={userMenu} trigger="click">
            <div className={styles.profile}>
              {true && "Carrot"}
              <Avatar
                size={42}
                src="https://www.partyanimalsgame.com/static/avatars-07_Carrot.png"
                style={{ marginLeft: "8%" }}
              />
            </div>
          </Dropdown>
        </Header>
        <Content style={{ backgroundColor: '#fff' }}>
          <Outlet />
          <Modal title="User Information" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} maskClosable={false} centered style={{transform:'translateY(-5px)'}}>
            <UserInformation setIsModalVisible={setIsModalVisible}/>
          </Modal>
        </Content>
      </Layout>

    </>
  );
};

const mapStateToProps = (state) => {
  return { state };
};

const mapActionToProps = {
  logout,
};

export default connect(mapStateToProps, mapActionToProps)(MainPage);
