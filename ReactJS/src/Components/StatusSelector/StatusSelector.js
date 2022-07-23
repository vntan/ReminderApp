import { useState } from "react";

import styles from "./StatusSelector.module.css";

import { completeColor, onGoingColor, toDoColor } from "../../Utilities/Color";

import { connect } from "react-redux";

import { Select } from "antd";

const { Option } = Select;

const StatusSelector = (props) => {
  const [status, setStatus] = useState(props.task.status);

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
        if (value !== props.task.status) props.onChangeValue(props.task, value);
      }}
      defaultValue={props.task.status}
      style={{ color: statusToColor[status] }}
      showArrow={false}
      bordered={false}
    >
      {props.filterStatus.map((status, index) => {
        return (
          <Option
            key={index}
            value={status.nameStatus}
            style={{ textAlign: "center", ...status.style }}
          >
            {status.nameStatus}
          </Option>
        );
      })}
    </Select>
  );
};

const mapStateToProps = (state) => ({
  filterStatus: state.statusTask,
});

export default connect(mapStateToProps, null)(StatusSelector);
