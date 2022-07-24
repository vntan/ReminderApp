import { useState } from "react";

import styles from "./MyProjectsComponent.module.css";

import ProjectSelector from "../ProjectSelector/ProjectSelector";
import { Menu } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";

import { useNavigate, useLocation, useParams, Outlet } from "react-router-dom";

const MyProjectsComponent = () => {
  const location = useLocation();
  const paramsURL = useParams();

  const [columnsTable, setColumnsTable] = useState([]);

  const [project, setProject] = useState("- All Projects -");

  const menuProjectsView = [
    {
      label: "List",
      key: "list",
      onClick: ()=> {
        const ID = paramsURL.projectID;
        navigate(ID+'/list')
      },
    },
    {
      label: "Calendar",
      key: "calendar",
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


  const handleChangeProject = (project) => {
    setProject(project);
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
            handleChangeProject={(project) => handleChangeProject(project)}
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
      <Outlet context={[columnsTable, setColumnsTable]}/>
    </>
  );
};

export default MyProjectsComponent;
