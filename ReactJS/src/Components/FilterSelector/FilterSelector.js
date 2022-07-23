import styles from './FilterSelector.module.css';

import { Menu, Popover } from "antd";

const FilterSelector = (props) => {
  const menuFilter = [
    {
      key: "name",
      label: <div>Task</div>,
    },
    {
      key: "duaDate",
      label: <div>Deadline</div>,
    },
    {
      key: "notification",
      label: <div>Notification</div>,
    },
    {
      key: "status",
      label: <div>Status</div>,
    },
    {
      key: "nameProject",
      label: <div>Project</div>,
    },
    {
      key: "nameList",
      label: <div>List</div>,
    },
  ];

  const clickFilter = (e) => {
    console.log(e)
    props.clickFilter(e.key)
  }

  return (
    <Menu
      items={menuFilter}
      onSelect={(e) => clickFilter(e)}
      style={{ border: "none" }}
    />
  );
};

export default FilterSelector;
