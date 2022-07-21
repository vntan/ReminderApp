import styles from "./TableRow.module.css";
import StatusSelector from "../../StatusSelector/StatusSelector";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";


const TableRow = (props) => {
  const task = props.task

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

  const handleViewTask = (e, task) => {
    e.stopPropagation();
    if (props.handleViewTask) props.handleViewTask(task);
  };

  const handleEditStatus = (task, newStatus) => {
    if (props.handleEditStatus) props.handleEditStatus(task, newStatus);
  };

 
  const handleEditTask = (e, task) => {
    e.stopPropagation();
    if (props.handleEditTask) props.handleEditTask(task);
  };

  const handleDelete = (e, task) => {
    e.stopPropagation();
    if (props.handleDelete) props.handleDelete(task);
  };

  return (
    <tr onClick={(e)=>handleViewTask(e, task)}>
      {props.columnsTable[0].isVisible && <td className={styles.taskList}>{task.taskname}</td>}
      {props.columnsTable[1].isVisible && <td style={{ color: dateToColor(task.deadline) }}>{task.deadline}</td>}


      {props.columnsTable[2].isVisible && <td>{task.notification || '-'}</td>}
      {props.columnsTable[3].isVisible && 
        <td onClick={(e)=>e.stopPropagation()}>
        
        <StatusSelector onChangeValue={handleEditStatus} task={task}/>
        </td>}
      {props.columnsTable[4].isVisible && <td>{task.project || '-'}</td>}
      {props.columnsTable[5].isVisible && <td>{task.list || '-'}</td>}
      {props.columnsTable[6].isVisible && <td>{task.subtask || '-'}</td>}
      {props.columnsTable[7].isVisible && 
        <td>
          <FormOutlined className={styles.actionElement} onClick={(e) => handleEditTask(e, task)} style={{ paddingRight: '8%' }} />
          <DeleteOutlined className={styles.actionElement} onClick={(e) => handleDelete(e, task)} />
        </td>
       }
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {
    columnsTable: state.columnsListTask
  }
}


export default connect(mapStateToProps, null)(TableRow);
