import styles from "./TableTasks.module.css";
import { Avatar } from "antd";
import { Space, Table, } from 'antd';

import { connect } from 'react-redux'
import { getTasks } from '../../Models/tasksReducer'

import { FormOutlined, DeleteOutlined, SearchOutlined, ConsoleSqlOutlined } from "@ant-design/icons";
import StatusSelector from "../StatusSelector/StatusSelector";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import moment from 'moment';

import { Button, Input, } from 'antd';
import Highlighter from 'react-highlight-words';

const TableTasks = ({ tasks, loading, statusInfo, handleViewTask, handleEditTask, handleEditStatusTask, handleDeleteTask }) => {

    // const [data, setData] = useState([]);
    const [columnsTable, setColumnsTable] = useOutletContext();


    const handleClickTask = (task) => {
        handleViewTask && handleViewTask(task);

    }

    const handleDelete = (task) => {
        handleDeleteTask && handleDeleteTask(task);
    };

    const handleEdit = (task) => {
        handleEditTask && handleEditTask(task);
    };

    const onChangeValue = (task, newStatus) => {
        handleEditStatusTask && handleEditStatusTask(task, newStatus);
        //Must return the result of updating the status
        return true;
    }


    const columns = [
        {
            title: "Task", isVisible: true, ellipsis: true, fixed: true, dataIndex: "nameTask",
        },

        {
            title: "Deadline", width: "12%", isVisible: true, ellipsis: true, dataIndex: "dueDate",
            defaultSortOrder: 'ascend',
            sorter: (task1, task2) => new moment(task1.dueDate, 'DD/MM/YYYY') - new moment(task2.dueDate, 'DD/MM/YYYY')
        },

        {
            title: "Notification", width: "12%", isVisible: true, ellipsis: true, dataIndex: "notification",
            sorter: (task1, task2) => new moment(task1.notification, 'DD/MM/YYYY') - new moment(task2.notification, 'DD/MM/YYYY')
        },
        {
            title: "Status", isVisible: true, width: "10%", dataIndex: "status", ellipsis: true,
            filters: statusInfo.map((status) => { return { "text": status.nameStatus, value: status.nameStatus } }),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record["status"] === value,
            render: (text, record) => (
                <div onClick={(e)=>{e.stopPropagation();}}>
                    <StatusSelector task={record} onChangeValue={onChangeValue} />
                </div>
                
            )
        },
        { title: "Project", width: "8%", isVisible: true, ellipsis: true, dataIndex: "nameProject" },
        { title: "List", width: "8%", isVisible: true, ellipsis: true, dataIndex: "nameList" },
        {
            title: "Assignees", isVisible: true, width: "12%", ellipsis: true, dataIndex: "assignees",
            render: (text, record) => {
                return record.assignees ? (
                    <Avatar.Group
                        style={{ verticalAlign: "middle" }}
                        maxCount={3}
                        maxStyle={{ color: "#000000", backgroundColor: "#D9D9D9" }}
                    >
                        {record.assignees.map((assignee) => {
                            return <Avatar key={assignee} src={assignee} />;
                        })}
                    </Avatar.Group>
                ) : (
                    "-"
                )
            }
        },
        { title: "Subtask", isVisible: true, width: "10%", dataIndex: "subtasks" },
        {
            title: "Action", width: "8%", isVisible: true, fixed: true, fixed: 'right', render: (_, record) => (
                <div style={{ display: 'flex', }}>
                    <FormOutlined className={styles.actionElement} onClick={(e) => { e.stopPropagation(); handleEdit(record) }} style={{ paddingRight: '5px' }} />
                    <DeleteOutlined className={styles.actionElement} onClick={(e) => { e.stopPropagation(); handleDelete(record) }} />
                </div>
            )
        },

    ];




    useEffect(() => {
        setColumnsTable(columns);

        // const task = [];
        // for (var i = 0; i < 3; i++) {
        //     task.push({
        //         nameTask: 'Task ' + (i + 1),
        //         status: (i % 3 == 0 ? 'Complete' : (i % 3 == 1 ? 'To do' : 'On going')),
        //         dueDate: new moment().add(100 + i + 1, 'days').format("DD/MM/YYYY"),
        //         notification: new moment().subtract(100 + i + 1, 'days').format("DD/MM/YYYY")

        //     });
        // }

        // // setData([...task]);


    }, []);



    return (
        <div >
            <Table
                scroll={{ scrollToFirstRowOnChange: true, x: 1300, y: 'calc(100vh - 104px - 40px)' }}
                size="small"
                pagination={false}
                dataSource={tasks}
                loading={loading}
                columns={columnsTable.filter(c => c.isVisible)}
                onRow={(record) => {
                    return {
                        onClick: (e) => { e.stopPropagation(); handleClickTask(record) }, // click row
                    }
                }}
            >
            </Table>
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        statusInfo: state.statusTask,
    }
}

export default connect(mapStateToProps, null)(TableTasks);
