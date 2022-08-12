import { useState, useEffect } from "react";

import styles from "./MyProjectsComponent.module.css";

import { connect } from "react-redux";

import ProjectSelector from "../ProjectSelector/ProjectSelector";
import { Menu, message } from "antd";
import { Button, Modal } from 'antd';
import { InfoCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";

import { useNavigate, useLocation, useParams, Outlet } from "react-router-dom";

import ProjectList from './ProjectList/ProjectList'
import ProjectCalendar from './ProjectCalendar/ProjectCalendar'

import ProjectInformation from "../ProjectInformation/ProjectInformation";

import { showProjectInformation } from '../../Models/projectReducer';

import AddNewProject from "../AddNewProject/AddNewProject";


const MyProjectsComponent = (props) => {
  const location = useLocation();
  const [projectID, setProject] = useState(-1);
  const [isModalVisibleProjectInfo, setIsModalVisibleProjectInfo] = useState(false);
  const [isModalVisibleAddProject, setIsModalVisibleAddproject] = useState(false);
  const navigate = useNavigate();

  const menuProjectsView = [
    {
      label: "List",
      key: "list",
      component: <ProjectList projectID={projectID} />,
      onClick: () => {
        navigate('list')
      },
    },
    {
      label: "Calendar",
      key: "calendar",
      component: <ProjectCalendar projectID={projectID} />,
      onClick: () => {
        navigate('calendar')
      },
    },
  ]



  const showModalProjectInfo = () => {
    setIsModalVisibleProjectInfo(true);
  };

  const showAddProject = () => {
    setIsModalVisibleAddproject(true);
  };

  const handleOkProjectInfo = () => {
    setIsModalVisibleProjectInfo(false);
  };

  const handleCancelProjectInfo = () => {
    setIsModalVisibleProjectInfo(false);
  };

  const handleOkAddProject = () => {
    setIsModalVisibleAddproject(false);
  };

  const handleCancelAddProject = () => {
    setIsModalVisibleAddproject(false);
  };

  const selectedKey = () => {
    const url = location.pathname.toLowerCase();

    for (const item of menuProjectsView)
      if (url.includes(item.key.toLowerCase()))
        return item.key;

    return '';
  }

  const handleChangeProject = (projectID) => {
    if (projectID > -1)
      props.showProjectInformation({ userID: props.account.idAccount, projectID: projectID })
    setProject(projectID);
  };



  return (
    <>
      <div className={styles.subnav}>
        <div className={styles.container_project_page}>
          <div className={styles.project}>
            <ProjectSelector
              handleChangeProject={(projectID) => handleChangeProject(projectID)}
            />
            {
              projectID === -1 ? <PlusCircleTwoTone className={styles.info} onClick={showAddProject} />
                : <InfoCircleTwoTone className={styles.info} onClick={showModalProjectInfo} />
            }
          </div>

          <Menu
            theme="light"
            mode="horizontal"
            className={styles.menu}
            selectedKeys={[selectedKey()]}
            items={menuProjectsView}
            style={{ minWidth: 0, flex: "1 0 41%", justifyContent: 'end' }}
          />
        </div>







      </div>
      <Outlet />
      <Modal title="Project Information"
        visible={isModalVisibleProjectInfo}
        onOk={handleOkProjectInfo}
        onCancel={handleCancelProjectInfo}
        footer={null}
        maskClosable={false}
        width={800}
        bodyStyle={{ maxHeight: 500 }}
        centered 
        destroyOnClose>
        <ProjectInformation project={projectID} handleCancel={handleCancelProjectInfo} />
      </Modal>

      <Modal title="New Project"
        visible={isModalVisibleAddProject}
        onOk={handleOkAddProject}
        onCancel={handleCancelAddProject}
        footer={null}
        maskClosable={false}
        width={800}
        bodyStyle={{ maxHeight: 500 }}
        centered
        destroyOnClose >
        <AddNewProject handleCancel={handleCancelAddProject} />
      </Modal>

      {
        menuProjectsView.find(menu => menu.key === selectedKey()) ?
          menuProjectsView.find(menu => menu.key === selectedKey()).component
          : null
      }


    </>
  );
};

const mapStateToProps = (state) => ({
  projectInfo: state.project.projectInfo,
  account: state.account.account,
});

const mapActionToProps = {
  showProjectInformation,

}

export default connect(mapStateToProps, mapActionToProps)(MyProjectsComponent)
