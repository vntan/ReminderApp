import styles from "./ListSelector.module.css";

import { Select } from "antd";

const { Option } = Select;

const ListSelector = (props) => {
    const handleOnChange = (value) => { 
        console.log(value);
        if (props.handleChangeList) props.handleChangeList(value);
    }

  return (
    <Select
      showSearch
      className={styles.list}
      onChange={(value) => {
        handleOnChange(value);
      }}
      defaultValue="- All Lists -"
      bordered={false}
      size='large'
    >
      <Option
        key={"All"}
        value="- All Lists -"
        style={{ textAlign: "center" }}
      >
        - All Lists -
      </Option>
      <Option
      key={"List 1"}
        value="List 1"
        style={{ textAlign: "center" }}
      >
        List 1
      </Option>
      <Option
      key={"List 2"}
        value="List 2"
        style={{ textAlign: "center" }}
      >
        List 2
      </Option>
      <Option
      key={"List 3"}
        value="List 3"
        style={{ textAlign: "center" }}
      >
        List 3
      </Option>
    </Select>
  );
};

export default ListSelector;
