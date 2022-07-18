import { useState } from "react";

import styles from "./MyTasksComponent.module.css";

import { Menu } from "antd";
import List from "./List/List";
import Calendar from "./Calendar/Calendar";

const MyTasksComponent = () => {
  const [isList, setList] = useState(true);

  const showList = () => {
    setList(true);
  };

  const showCalendar = () => {
    setList(false);
  };
  return (
    <>
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
      {isList && <List />}
      {!isList && <Calendar />}
    </>
  );
};

export default MyTasksComponent;
