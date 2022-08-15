import styles from "./TableTasks.module.css";
import { Avatar, message } from "antd";
import { Space, Table, Tag, Modal } from "antd";

import { connect } from "react-redux";
import { getTasks } from "../../Models/tasksReducer";

import {
  FormOutlined,
  DeleteOutlined,
  SearchOutlined,
  ConsoleSqlOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import StatusSelector from "../StatusSelector/StatusSelector";
import { useEffect, useRef, useState } from "react";

import { resetColumns } from "../../Models/columnsTableReducer";

import moment from "moment";

import { Button, Input } from "antd";
import Highlighter from "react-highlight-words";
import { dateFormat } from "../../Helper/DateMoment";
import { updateStatusTask, updateTask } from "../../Models/tasksReducer";

import TaskInfo from "../TaskCommon/TaskInformation/TaskInfo";
import EditTask from "../TaskCommon/EditTask/EditTask";

import { deleteTask } from "../../Models/tasksReducer";

const { confirm } = Modal;

const TableTasks = ({
  tasks,
  loading,
  statusInfo,
  handleViewTask,
  handleEditTask,
  updateStatusTask,
  handleDeleteTask,
  resetColumns,
  columnsTable,
  defaultHideColumns,
  updateTask,
  deleteTask
}) => {
  const [showEditTask, setShowEditTask] = useState(false);
  const [taskCurrent, setTaskCurrent] = useState({});

  const columns = [
    {
      title: "Task",
      width: "15%",
      isVisible: true,
      ellipsis: true,
      fixed: true,
      dataIndex: "name",
    },

    {
      title: "Deadline",
      isVisible: true,
      ellipsis: true,
      dataIndex: "dueDate",
      defaultSortOrder: "ascend",
      sorter: (task1, task2) => {
        return (
          new moment(task1.dueDate).utc() - new moment(task2.dueDate).utc()
        );
      },
      render: (text, _) => {
        return moment(text).utc().format("DD/MM/YYYY");
      },
    },
    {
      title: "Notification",
      isVisible: true,
      ellipsis: true,
      dataIndex: "notification",
      sorter: (task1, task2) => {
        return (
          new moment(task1.notification, "DD/MM/YYYY") -
          new moment(task2.notification, "DD/MM/YYYY")
        );
      },
      render: (text, _) => {
        return moment(text).utc().format("DD/MM/YYYY");
      },
    },
    {
      title: "Status",
      isVisible: true,
      dataIndex: "status",
      ellipsis: true,
      filters: statusInfo.map((status) => {
        return { text: status.nameStatus, value: status.nameStatus };
      }),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record["status"] === value,
      render: (text, record) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <StatusSelector task={record} onChangeValue={onChangeValue} />
        </div>
      ),
    },
    {
      title: "Project",
      width: "8%",
      isVisible: true,
      ellipsis: true,
      dataIndex: "nameProject",
    },
    {
      title: "List",
      width: "8%",
      isVisible: true,
      ellipsis: true,
      dataIndex: "nameList",
    },
    {
      title: "Assignees",
      isVisible: true,
      width: "12%",
      ellipsis: true,
      dataIndex: "participant",
      render: (text, record) => {
        return (
          <Avatar.Group
            style={{ verticalAlign: "middle" }}
            maxCount={3}
            maxStyle={{ color: "#000000", backgroundColor: "#D9D9D9" }}
          >
            {record.participant.map((assignee, index) => {
              return (
                <Avatar key={index} src={assignee.urlImage}>
                  assignee.name
                </Avatar>
              );
            })}
          </Avatar.Group>
        );
      },
    },
    {
      title: "Subtasks",
      isVisible: true,
      width: "10%",
      dataIndex: "subtasks",
      render: (text, record) => {
        console.log(record);
        return (
          <span>
            {record.countCompleteTasks} / {record.countTasks}{" "}
          </span>
        );
      },
    },
    {
      title: "Tags",
      key: "tag",
      isVisible: true,
      dataIndex: "tag",
      render: (_, record) => (
        <>
          {record.tag &&
            record.tag.map((tag, index) => {
              return <Tag key={index}>{tag.nameTag}</Tag>;
            })}
        </>
      ),
    },
    {
      title: "Action",
      width: "8%",
      isVisible: true,
      fixed: true,
      fixed: "right",
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <FormOutlined
            className={styles.actionElement}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(record);
            }}
            style={{ paddingRight: "5px" }}
          />
          <DeleteOutlined
            className={styles.actionElement}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  const handleClickTask = (task) => {
    handleViewTask && handleViewTask(task);
  };

  const handleDelete = (task) => {
    // handleDeleteTask && handleDeleteTask(task);
    confirm({
      title: `Do you want to delete ${task.name} task `,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
        deleteTask(task.idTask, (result)=>{
            if(result) message.success( `Detele ${task.name} completed`)
            else message.error( `Detele ${task.name} error`)
        })
      },
  
      onCancel() {
        
      },
    });
  };

  const handleEdit = (task) => {
    setTaskCurrent(task);
    setShowEditTask(true);
    console.log("Edit task", task);
  };

  const onChangeValue = (task, newStatus, cb) => {
    updateStatusTask && updateStatusTask(task.idTask, newStatus, cb);
  };

  const closeEditTask = () => {
    setShowEditTask(false);
  };

  useEffect(() => {
    resetColumns(
      columns.map((col) => {
        col.isVisible =
          !defaultHideColumns ||
          (defaultHideColumns &&
            !defaultHideColumns
              .map((p) => p.toLowerCase())
              .includes(col.title.toLowerCase()));
        return col;
      })
    );
  }, [defaultHideColumns]);

  return (
    <div>
      {console.log(tasks)}
      <Table
        scroll={{
          scrollToFirstRowOnChange: true,
          x: 1300,
          y: "calc(100vh - 104px - 40px)",
        }}
        size="small"
        pagination={false}
        dataSource={tasks}
        loading={loading}
        columns={columnsTable.filter((c) => c.isVisible)}
        onRow={(record) => {
          return {
            onClick: (e) => {
              e.stopPropagation();
              handleClickTask(record);
            }, // click row
          };
        }}
      ></Table>

      {showEditTask && (
        <EditTask
          showEditTask={showEditTask}
          closeEditTask={closeEditTask}
          task={tasks.find((item) => item.idTask === taskCurrent.idTask)}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    columnsTable: state.columnsTable,
    statusInfo: state.statusTask,
  };
};

const mapActionToProps = {
  resetColumns,
  updateStatusTask,
  updateTask,
  deleteTask
};

export default connect(mapStateToProps, mapActionToProps)(TableTasks);
