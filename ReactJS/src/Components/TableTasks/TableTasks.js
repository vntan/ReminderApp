import styles from "./TableTasks.module.css";
import { Avatar } from "antd";
import { Space, Table, Tag } from 'antd';

import { connect } from 'react-redux'
import { getTasks } from '../../Models/tasksReducer'

import { FormOutlined, DeleteOutlined, SearchOutlined, ConsoleSqlOutlined } from "@ant-design/icons";
import StatusSelector from "../StatusSelector/StatusSelector";
import { useEffect, useRef, useState } from "react";


import { resetColumns } from "../../Models/columnsTableReducer";

import moment from 'moment';

import { Button, Input, } from 'antd';
import Highlighter from 'react-highlight-words';

const TableTasks = ({ tasks, loading, statusInfo, handleViewTask, handleEditTask, handleEditStatusTask, handleDeleteTask, resetColumns, columnsTable, defaultHideColumns }) => {


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
            title: "Task", width: '15%', isVisible: true, ellipsis: true, fixed: true, dataIndex: "name",
        },

        {
            title: "Deadline", isVisible: true, ellipsis: true, dataIndex: "dueDate",
            defaultSortOrder: 'ascend',
            sorter: (task1, task2) => {
                return new moment(task1.dueDate, 'DD/MM/YYYY') - new moment(task2.dueDate, 'DD/MM/YYYY')
            }
        },

        {
            title: "Notification", isVisible: true, ellipsis: true, dataIndex: "notification",
            sorter: (task1, task2) => {
                return new moment(task1.notification, 'DD/MM/YYYY') - new moment(task2.notification, 'DD/MM/YYYY')
            }
        },
        {
            title: "Status", isVisible: true, dataIndex: "status", ellipsis: true,
            filters: statusInfo.map((status) => { return { "text": status.nameStatus, value: status.nameStatus } }),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record["status"] === value,
            render: (text, record) => (
                <div onClick={(e) => { e.stopPropagation(); }}>
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
        { title: "Subtasks", isVisible: true, width: "10%", dataIndex: "subtasks" },
        {
            title: 'Tags',
            key: 'tag',
            isVisible: true,
            dataIndex: 'tag',
            render: (_, { tags }) => (
                <>
                    {tags && tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
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
        resetColumns(columns.map(col => {
            col.isVisible = !defaultHideColumns
                || (defaultHideColumns && !defaultHideColumns.map(p => p.toLowerCase()).includes(col.title.toLowerCase()))
            return col;
        }));

    }, [defaultHideColumns]);


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
        columnsTable: state.columnsTable,
        statusInfo: state.statusTask,
    }
}

const mapActionToProps = {
    resetColumns,
}

export default connect(mapStateToProps, mapActionToProps)(TableTasks);
