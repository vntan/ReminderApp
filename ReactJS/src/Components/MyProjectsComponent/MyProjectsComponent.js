import { useState } from "react";

import styles from "./MyProjectsComponent.module.css";

import ProjectSelector from "../ProjectSelector/ProjectSelector";
import { Menu } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";

import { useNavigate, Outlet } from "react-router-dom";

const MyProjectsComponent = () => {
  const [project, setProject] = useState("- All Projects -");

  const handleChangeProject = (project) => {
    setProject(project);
  };

  const navigate = useNavigate();

  const showList = () => {
    navigate("./list");
  };

  const showCalendar = () => {
    navigate("./calendar");
  };

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
          items={[
            { label: "List", key: "list", onClick: showList },
            {
              label: "Calendar",
              key: "calendar",
              onClick: showCalendar,
            },
          ]}
        />
      </div>
      <Outlet context={project} />
    </>
  );
};

export default MyProjectsComponent;
