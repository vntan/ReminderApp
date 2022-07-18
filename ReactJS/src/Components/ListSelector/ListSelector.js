import styles from "./ListSelector.module.css";
import { Select } from "antd";
const { Option } = Select;

const ListSelector = () => {
    const handleOnChange = (value) => { 
        console.log(value);
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
        value="- All Lists -"
        style={{ textAlign: "center" }}
      >
        - All Lists -
      </Option>
      <Option
        value="List 1"
        style={{ textAlign: "center" }}
      >
        List 1
      </Option>
      <Option
        value="List 2"
        style={{ textAlign: "center" }}
      >
        List 2
      </Option>
      <Option
        value="List 3"
        style={{ textAlign: "center" }}
      >
        List 3
      </Option>
    </Select>
  );
};

export default ListSelector;
