import StatusSelector from "../../StatusSelector/StatusSelector";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";

import { Avatar } from "antd";

import styles from "./Row.module.css";

const Row = (props) => {
  const dateToColor = (deadline) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    var date = deadline.split("/");
    date = date[2] + "-" + date[1] + "-" + date[0];
    const deadlineDate = new Date(date);
    deadlineDate.setHours(0, 0, 0, 0);
    if (deadlineDate > today) return "black";
    else return "red";
  };

  const handleViewTask = () => {
    console.log("View task");
  };

  const handleEditStatus = (e) => {
    e.stopPropagation();
  };

  const handleEditTask = (e) => {
    e.stopPropagation();
    console.log("Edit task");
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log("Delete");
  };

  return (
    <tr onClick={handleViewTask}>
      <td className={styles.taskList}>{props.task}</td>
      <td style={{ color: dateToColor(props.deadline) }}>{props.deadline}</td>
      <td>{props.notification || "-"}</td>
      <td onClick={handleEditStatus}>
        <StatusSelector status={props.status} />
      </td>
      <td>
        {props.assignees ? (
          <Avatar.Group
            style={{ verticalAlign: "middle" }}
            maxCount={3}
            maxStyle={{ color: "#000000", backgroundColor: "#D9D9D9" }}
          >
            {props.assignees.map((assignee) => 
              {return <Avatar key={assignee} src={assignee} />}
            )}
          </Avatar.Group>
        ) : (
          "-"
        )}
      </td>
      <td>{props.subtask || "-"}</td>
      <td className={styles.actionList}>
        <FormOutlined
          className={styles.actionElement}
          onClick={handleEditTask}
          style={{ paddingRight: "8%" }}
        />
        <DeleteOutlined
          className={styles.actionElement}
          onClick={handleDelete}
        />
      </td>
    </tr>
  );
};

export default Row;
