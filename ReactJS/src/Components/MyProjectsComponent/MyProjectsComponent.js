import { useState } from "react";

import styles from "./MyProjectsComponent.module.css";

import ProjectSelector from "../ProjectSelector/ProjectSelector";
import { Menu } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";

import { useNavigate, useLocation, useParams, Outlet } from "react-router-dom";

import ProjectList from './ProjectList/ProjectList'
import ProjectCalendar from './ProjectCalendar/ProjectCalendar'

const MyProjectsComponent = () => {
  const location = useLocation();
  const paramsURL = useParams();

  const [projectID, setProject] = useState(-1);

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

  const navigate = useNavigate();

  const showInfo = () => {
    console.log("showInfo");
  };
  
  return (
    <>
      <div className={styles.subnav}>
        <div className={styles.project}>
          <ProjectSelector
            handleChangeProject={(projectID) => handleChangeProject(projectID)}
          />
          <InfoCircleTwoTone className={styles.info} onClick={showInfo} />
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

      {
          menuProjectsView.find(menu => menu.key === selectedKey()) ?
          menuProjectsView.find(menu => menu.key === selectedKey()).component 
            : null
      }


    </>
  );
};

export default MyProjectsComponent;
