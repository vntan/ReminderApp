import styles from "./MyTasksComponent.module.css";

import { Menu, Popover, Button} from "antd";
import { FilterOutlined, AppstoreOutlined } from "@ant-design/icons";

import { useNavigate, useLocation, Outlet } from "react-router-dom";

import SelectColumnsMenu from "../MenuSelectColumns/MenuSelectColumns";
import FilterSelector from "../FilterSelector/FilterSelector";
import { connect } from "react-redux";
import { updateVisibleColumns } from "../../Models/columnsListTasksReducer";

const MyTasksComponent = ({ columnsTable, updateVisibleColumns }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuTasksView = [
    {
      label: "List",
      key: "list",
      onClick: () => navigate("list"),
    },
    {
      label: "Calendar",
      key: "calendar",
      onClick: () => navigate("calendar"),
    },
  ];

  const clickFilter = (key) => {
    console.log(key);
  };

  const selectedKey = () => {
    const url = location.pathname.toLowerCase();

    for (const item of menuTasksView)
      if (url.includes(item.key.toLowerCase())) return item.key;

    return "";
  };

  const handleAddTask = () => {
    console.log("Add Task");
  };

  return (
    <>
      <div className={styles.subnav}>
        <Menu
          theme="light"
          mode="horizontal"
          className={styles.menu}
          selectedKeys={[selectedKey()]}
          items={menuTasksView}
        />
        <div className={styles.groupControl}>
          <Popover
            content={
              <FilterSelector clickFilter={clickFilter}/>
            }
            trigger="click"
            placement="bottomLeft"
          >
            <FilterOutlined
              className={styles.icon}
              style={{ display: selectedKey() !== "list" ? "none" : "" }}
            />
          </Popover>

          <Popover
            content={
              <SelectColumnsMenu
                columnsTable={columnsTable}
                updateVisibleColumns={updateVisibleColumns}
              />
            }
            trigger="click"
            placement="bottomLeft"
          >
            <AppstoreOutlined
              className={styles.icon}
              style={{ display: selectedKey() !== "list" ? "none" : "" }}
            />
          </Popover>
        </div>
      </div>

      <Outlet />

      <Button className={styles.button} onClick={handleAddTask}>
        +
      </Button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    columnsTable: state.columnsListTask,
  };
};

const mapActionToProps = {
  updateVisibleColumns,
};

export default connect(mapStateToProps, mapActionToProps)(MyTasksComponent);
