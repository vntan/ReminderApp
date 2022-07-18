import styles from "./StatusSelector.module.css";
import { completeColor, onGoingColor, toDoColor } from "../../Utilities/Color";
import { useState } from "react";
import { Select } from "antd";
const { Option } = Select;

const StatusSelector = (props) => {
  const [status, setStatus] = useState(props.status);

  const statusToColor = {
    Complete: completeColor,
    "On going": onGoingColor,
    "To do": toDoColor,
  };

  return (
    <Select
      className={styles.status}
      onChange={(value) => {
        setStatus(value);
      }}
      defaultValue={props.status}
      style={{ color: statusToColor[status] }}
      showArrow={false}
      bordered={false}
    >
      <Option
        value="Complete"
        style={{ textAlign: "center", color: statusToColor["Complete"] }}
      >
        Complete
      </Option>
      <Option
        value="On going"
        style={{ textAlign: "center", color: statusToColor["On going"] }}
      >
        On going
      </Option>
      <Option
        value="To do"
        style={{ textAlign: "center", color: statusToColor["To do"] }}
      >
        To do
      </Option>
    </Select>
  );
};

export default StatusSelector;
