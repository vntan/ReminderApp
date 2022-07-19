import styles from "./TableRow.module.css";
import "../../../Helper/DisableResponsive.css";

import StatusSelector from "../../StatusSelector/StatusSelector";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar } from "antd";


const TableRow = (props) => {
  const task = props.task;
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

  return (
    <tr onClick={props.handleViewTask}>
      <td className={styles.taskList}>{task.taskname}</td>
      <td style={{ color: dateToColor(task.deadline) }}>{task.deadline}</td>
      <td className="tablet">{task.notification || "-"}</td>
      <td onClick={props.handleEditStatus}>
        <StatusSelector status={task.status} />
      </td>
      <td className="mobile">
        {task.assignees ? (
          <Avatar.Group
            style={{ verticalAlign: "middle" }}
            maxCount={3}
            maxStyle={{ color: "#000000", backgroundColor: "#D9D9D9" }}
          >
            {task.assignees.map((assignee) => {
              return <Avatar key={assignee} src={assignee} />;
            })}
          </Avatar.Group>
        ) : (
          "-"
        )}
      </td>
      <td className="tablet">{task.subtask || "-"}</td>
      <td className={styles.actionList}>
        <FormOutlined
          className={styles.actionElement}
          onClick={props.handleEditTask}
          style={{ paddingRight: "8%" }}
        />
        <DeleteOutlined
          className={styles.actionElement}
          onClick={props.handleDelete}
        />
      </td>
    </tr>
  );
};

export default TableRow;
