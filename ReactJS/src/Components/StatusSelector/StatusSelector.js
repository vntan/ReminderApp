import { useEffect, useState } from "react";

import styles from "./StatusSelector.module.css";
import { connect } from "react-redux";
import { Select, message } from "antd";


const { Option } = Select;
var onChange = false;

const StatusSelector = (props) => {
  const [status, setStatus] = useState("");

  const statusToColor = (status) => {
    const findStatus = props.filterStatus.find(s => s.nameStatus === status);
    return findStatus ? { ...findStatus.style } : { color: "000" };
  };

  useEffect(() => {
    if (!onChange) setStatus(props.task.status);
    else onChange = false;
  });

  return (
    <Select
      className={styles.status}
      onChange={(value) => {
        onChange = true;
        console.log(props.task)
        if (value !== props.task.status && props.onChangeValue) 
        {
            props.onChangeValue(props.task, value, (result)=>{
              if (result) setStatus(value);
              else {
                message.error(`Cannot update the status of ${props.task.name}!`);
                setStatus(props.task.status);
              }
            }); 
            
            
        }
        else setStatus(value)

      }}
      value={status}
      style={statusToColor(status)}
      showArrow={false}
      bordered={false}
    >
      {
        props.filterStatus.map((status, index) => {
          return (
            <Option
              key={index}
              value={status.nameStatus}
              style={{ textAlign: "center", ...status.style }}
            >
              {status.nameStatus}
            </Option>
          );
        })
      }
    </Select>
  );
};

const mapStateToProps = (state) => ({
  filterStatus: state.statusTask,
});

export default connect(mapStateToProps, null)(StatusSelector);
