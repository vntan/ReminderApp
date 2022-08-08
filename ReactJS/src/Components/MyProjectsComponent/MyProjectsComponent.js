import { useState,useEffect } from "react";

import styles from "./MyProjectsComponent.module.css";

import { connect } from "react-redux";

import ProjectSelector from "../ProjectSelector/ProjectSelector";
import { Menu, message } from "antd";
import { Button, Modal } from 'antd';
import { InfoCircleTwoTone,PlusCircleFilled} from "@ant-design/icons";

import { useNavigate, useLocation, useParams, Outlet } from "react-router-dom";

import ProjectList from './ProjectList/ProjectList'
import ProjectCalendar from './ProjectCalendar/ProjectCalendar'

import ProjectInformation from "../ProjectInformation/ProjectInformation";

import { showProjectInformation } from '../../Models/projectReducer';


const MyProjectsComponent = (props) => {
  const location = useLocation();
  const paramsURL = useParams();
  const [projectID, setProject] = useState(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  

  useEffect(()=>{
    setProject(-1);
  },[]);

  const menuProjectsView = [
    {
      label: "List",
      key: "list",
      component: <ProjectList projectID =  {projectID}/>,
      onClick: ()=> {
        const ID = paramsURL.projectID;
        navigate(ID+'/list')
      },
    },
    {
      label: "Calendar",
      key: "calendar",
      component: <ProjectCalendar projectID =  {projectID}/>,
      onClick: ()=> {
        const ID = paramsURL.projectID;
        navigate(ID+'/calendar')
      },
    },
  ]



  const showModal = () => {
    props.showProjectInformation({userID:props.account.idAccount, projectID: projectID})
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectedKey = () => {
    const url = location.pathname.toLowerCase();

    for (const item of menuProjectsView)
      if (url.includes(item.key.toLowerCase()))
        return item.key;

    return '';
  }

  const handleChangeProject = (projectID) => {
    setProject(projectID);
  };


  const showAddProject = ()=>{
    console.log('Add project')
  }
 
  
  return (
    <>
      {console.log('MyProjectComponent')}
      <div className={styles.subnav}>
        <div className={styles.project}>
          <ProjectSelector
            handleChangeProject={(projectID) => handleChangeProject(projectID) }
          />
           {
              projectID === -1 ?  <PlusCircleFilled className={styles.info} onClick={showAddProject} />
              :  <InfoCircleTwoTone className={styles.info} onClick={showModal} />
           }
          
           
          
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          className={styles.menu}
          selectedKeys={[selectedKey()]}
          items={menuProjectsView}
        />
        
      </div>
      <Outlet/>
      <Modal title="Project Information" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} maskClosable={false} width={1000} centered >
         <ProjectInformation />
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

export default connect(mapStateToProps,mapActionToProps)(MyProjectsComponent)
