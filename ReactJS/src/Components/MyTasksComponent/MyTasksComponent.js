import styles from "./MyTasksComponent.module.css";

import { Menu } from "antd";
import { FilterOutlined } from "@ant-design/icons";

import { useNavigate, Outlet } from "react-router-dom";

const MyTasksComponent = () => {
  const navigate = useNavigate();

  const showList = () => {
    navigate("./list");
  };

  const showCalendar = () => {
    navigate("./calendar");
  };

  const handleFilter = () => {
    console.log("Filter");
  };
  return (
    <>
      <div className={styles.subnav}>
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
        <div onClick={handleFilter} className={styles.filter}>
          <FilterOutlined style={{ verticalAlign: "middle" }} />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default MyTasksComponent;
