import styles from "./ProjectSelector.module.css";

import { Select } from "antd";

const { Option } = Select;

const ProjectSelector = (props) => {
  const handleOnChange = (value) => {
    console.log(value);
    if (props.handleChangeProject) props.handleChangeProject(value);
  };

  return (
    <Select
      className={styles.project}
      onChange={(value) => {
        handleOnChange(value);
      }}
      defaultValue="- All Projects -"
      showArrow={false}
      bordered={false}
      size="large"
    >
      <Option value="- All Projects -" style={{ textAlign: "center" }}>
        - All Projects -
      </Option>
      <Option value="Project 1" style={{ textAlign: "center" }}>
        Project 1
      </Option>
      <Option value="Project 2" style={{ textAlign: "center" }}>
        Project 2
      </Option>
      <Option value="Project 3" style={{ textAlign: "center" }}>
        Project 3
      </Option>
    </Select>
  );
};

export default ProjectSelector;
