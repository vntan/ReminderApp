import { useState } from "react";

import styles from "./MyProjectsComponent.module.css";

import { Menu } from "antd";
import List from "./List/List";
import Calendar from "./Calendar/Calendar";
import ProjectSelector from "../ProjectSelector/ProjectSelector";

import { InfoCircleTwoTone } from "@ant-design/icons";

const MyProjectsComponent = () => {
  const [isList, setList] = useState(true);

  const showList = () => {
    setList(true);
  };

  const showCalendar = () => {
    setList(false);
  };

  const showInfo = () => {
    console.log("showInfo");
  };
  return (
    <>
      <div className={styles.subnav}>
        <div className={styles.project}>
          <ProjectSelector/>
          <InfoCircleTwoTone className={styles.info} onClick={showInfo} />
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["list"]}
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
      {isList && <List />}
      {!isList && <Calendar />}
    </>
  );
};

export default MyProjectsComponent;
