import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux'
import styles from './CreateTaskStyle.module.css'

import 'antd/dist/antd.css';
import {
    Button, Modal, Checkbox, Row,
    Col, Form, Input, Avatar,
    DatePicker, List, Select, Tag, Tooltip,
    message
} from 'antd';
import {
    DeleteFilled,
    FolderOutlined,
    FileTextOutlined, UnorderedListOutlined, LineChartOutlined,
    HourglassOutlined, BellOutlined, CloseOutlined, TagsOutlined, PlusOutlined, UserOutlined
} from '@ant-design/icons'

import { today, disabledDate, dateFormat, moment } from "../../../Helper/DateMoment";

import { getAllProject } from "../../../Models/projectReducer";
import { resetList } from "../../../Models/listReducer";
import { showList } from "../../../Models/listReducer";
import { deleteTag, deleteNotification, deleteSubtask } from "../../../Models/tasksModels";
import AddList from "../../AddList/AddList";

const { Option } = Select;

const EditTask = (props) => {
    const { showEditTask, closeEditTask, addNewTask, project, list, userID } = props
    const [notification, setNotification] = useState('')
    const [subTask, setSubTask] = useState('')
    const [showAddList, setShowAddList] = useState(false)

    useEffect(() => {
        props.getAllProject({ userID }, (result) => {
            if (result) {
                props.showList({ userID })
            }
        })
    }, [])

    const [taskInfo, setTaskInfo] = useState({
        name: '',
        idProject: -1,
        idList: -1,
        dueDate: moment(today, dateFormat),
        status: 'To do',
        tag: '',
        notification: [],
        description: '',
        subTask: []
    })

    const submitTask = () => {
        if (taskInfo.name == "") {
            message.error('Please input your task name!');
            return;
        }

        if (taskInfo.idProject == -1 && taskInfo.idList == -1) {
            message.error('Please select the project');
            return;
        }

        if (taskInfo.idProject > -1 && taskInfo.idList == -1) {
            message.error('Please select the list');
            return;
        }

        props.handleOk({
            userID: userID,
            projectID: taskInfo.idProject,
            listID: taskInfo.idList,
            nameTask: taskInfo.name,
            status: taskInfo.status,
            descriptionTask: taskInfo.description,
            dueDateTask: taskInfo.dueDate
        }, taskInfo.notification, taskInfo.subTask, tags)
    }

    const [urlPhoto, setUrlPhoto] = useState([])

    const statusToColor = (status) => {
        const findStatus = props.filterStatus.find(s => s.nameStatus === status);
        return findStatus ? { ...findStatus.style } : { color: "000" };
    };

    const handleCancel = () => {
        setShowAddList(false)
    }

    const handleAddParticipant = () => {
        console.log('Add participant')
    }

    const handleSubmitTask = () => {
        props.addNewTask(taskInfo)
    }

    const changeName = (e) => {
        setTaskInfo({ ...taskInfo, name: e.target.value })
    }

    const changeProject = (value) => {
        setTaskInfo({ ...taskInfo, idProject: value, idList: -1 })
    }

    const changeList = (value) => {
        console.log(value)
        setTaskInfo({ ...taskInfo, idList: value })
        if (value === -1) {
            setShowAddList(true)
        }

    }

    const changeDueDate = (value, dateString) => {
        setTaskInfo({ ...taskInfo, dueDate: dateString })
    }

    const changeStatus = (value) => {
        setTaskInfo({ ...taskInfo, status: value })
    }

    const changeTag = (e) => {
        setTaskInfo({ ...taskInfo, tag: e.target.value })
    }

    const changeNotification = (value, dateString) => {
        setNotification(dateString)
    }

    const deleteNotification = (notification) => {
        let listNotification = taskInfo.notification;
        listNotification = listNotification.filter(item => item.id !== notification.id)
        setTaskInfo({ ...taskInfo, notification: listNotification })
        console.log(taskInfo.notification)
    }

    const submitNotification = () => {
        console.log("Add Notification")
        if (!notification) {
            return;
        }
        let listNotification = taskInfo.notification
        let objIndex = listNotification.findIndex((item => item.reminder === notification))
        if (objIndex >= 0) {
            return;
        }
        listNotification.push({
            id: Math.floor(Math.random() * 9999) + 1000,
            reminder: notification
        })
        setTaskInfo({ ...taskInfo, notification: listNotification })
    }

    const changeDescription = (e) => {
        setTaskInfo({ ...taskInfo, description: e.target.value })
    }

    const changeSubtask = (e) => {
        setSubTask(e.target.value)
    }

    const deleteSubtask = (subtask) => {
        let listSubtask = taskInfo.subTask;
        listSubtask = listSubtask.filter(item => item.id !== subtask.id)
        setTaskInfo({ ...taskInfo, subTask: listSubtask })
        console.log(taskInfo.subTask)
    }

    const submitSubtask = () => {
        if (!subTask) {
            return;
        }
        let listSubtask = taskInfo.subTask;
        let objIndex = listSubtask.findIndex((item => item.name === subTask))
        if (objIndex >= 0) {
            return;
        }
        listSubtask.push({
            id: Math.floor(Math.random() * 9999) + 1000,
            checked: false,
            name: subTask
        });
        setTaskInfo({ ...taskInfo, subTask: listSubtask })
        setSubTask('')

    }

    const tickSubTask = (subtask) => {
        // Need id of each subtask to do that
        let listSubtask = taskInfo.subTask;
        let objIndex = listSubtask.findIndex((item => item.name === subtask.name))
        listSubtask[objIndex].checked = !listSubtask[objIndex].checked
        setTaskInfo({ ...taskInfo, subTask: listSubtask })
    }

    const [tags, setTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);
    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);
    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);

    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        console.log(newTags);
        setTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }

        setInputVisible(false);
        setInputValue('');
    };

    const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value);
    };

    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        setEditInputIndex(-1);
        setInputValue('');
    };

    return (
        <>
            <div>
                <Modal
                    title="Edit Task"
                    visible={showEditTask}
                    onOk={submitTask}
                    onCancel={props.handleCancel}
                    maskClosable={false}
                    width={800}
                    bodyStyle={{ maxHeight: 500, overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
                    centered
                    destroyOnClose

                >
                    <Form>
                        <Form.Item name="nameTask" rules={[{ required: true, message: 'Please input your task name!' }]}>
                            <Input value={taskInfo.name} placeholder='Enter Name of Task' onChange={(e) => changeName(e)} />
                        </Form.Item>
                    </Form>


                    {/* <Form layout="vertical">
                        <Form.Item label={
                            <><TeamOutlined
                                style={{
                                    fontSize: '25px',
                                }} />
                                &nbsp;Participant</>
                        }>
                            <Avatar.Group>
                                {urlPhoto.map(item => (
                                    <Avatar>{item}</Avatar>
                                ))}
                                <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => handleAddParticipant()}></Button>
                            </Avatar.Group>
                        </Form.Item>
                    </Form> */}

                    <Form layout={'vertical'}
                    >
                        <Row>
                            <Col span={12}>

                                <Form.Item label={
                                    <><FolderOutlined
                                        style={{ fontSize: '25px', }}
                                    /> &nbsp;Project</>
                                }
                                    style={{ marginRight: '60px', }}>
                                    <Select
                                        listHeight={130}
                                        // defaultValue={taskInfo.idProject}
                                        onChange={changeProject}
                                    >
                                        <Option value={-1}>None</Option>
                                        {project && project.map((item, index) => (
                                            <Option key={item.idProject} value={item.idProject}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={
                                    <><UnorderedListOutlined
                                        style={{ fontSize: '25px', }}
                                    /> &nbsp;List</>
                                }
                                    style={{ marginRight: '60px', }}>

                                    <Select
                                        listHeight={130}
                                        onChange={changeList}
                                        // defaultValue={taskInfo.idList}
                                        value={taskInfo.idList === -1 || !list ? '- Choose the list -' : list.find((item) => item.idList === taskInfo.idList).name}
                                    >
                                        <Option value={-1}>Add List</Option>
                                        {
                                            list && list.filter((item) => {
                                                return taskInfo.idProject !== -1 ?
                                                    item.idProject === taskInfo.idProject
                                                    :
                                                    item.idProject === null
                                            }).map((item) => (
                                                <Option key={item.idList} value={item.idList}>{item.name}</Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>

                    <Form layout="horizontal">
                        <Form.Item label={
                            <><HourglassOutlined
                                style={{ fontSize: '25px', }}
                            /> &nbsp;Deadline</>
                        }>
                            <DatePicker
                                showTime
                                inputReadOnly={true}
                                defaultValue={taskInfo.dueDate}
                                disabledDate={disabledDate}
                                onChange={changeDueDate} />
                        </Form.Item>
                    </Form>

                    <Form layout="horizontal">
                        <Form.Item label={
                            <><LineChartOutlined
                                style={{ fontSize: '25px', }}
                            /> &nbsp;Progress</>
                        }>
                            <Select
                                defaultValue={taskInfo.status}
                                onChange={changeStatus}
                                value={taskInfo.status}
                                style={{ ...statusToColor(taskInfo.status), width: '205px' }}
                                showArrow={false}
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
                        </Form.Item>
                    </Form>

                    <Form layout="horizontal">
                        <Form.Item label={
                            <><TagsOutlined style={{ fontSize: '25px', }}
                            /> &nbsp;Tag</>
                        }>
                            <>
                                {tags.map((tag, index) => {
                                    if (editInputIndex === index) {
                                        return (
                                            <Input
                                                ref={editInputRef}
                                                key={tag}
                                                size="small"
                                                className="tag-input"
                                                value={editInputValue}
                                                onChange={handleEditInputChange}
                                                onBlur={handleEditInputConfirm}
                                                onPressEnter={handleEditInputConfirm}
                                            />
                                        );
                                    }

                                    const isLongTag = tag.length > 20;
                                    const tagElem = (
                                        <Tag
                                            className={styles.editTag}
                                            key={tag}
                                            closable={index !== 0}
                                            onClose={() => handleClose(tag)}
                                        >
                                            <span
                                                onDoubleClick={(e) => {
                                                    if (index !== 0) {
                                                        setEditInputIndex(index);
                                                        setEditInputValue(tag);
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                            </span>
                                        </Tag>
                                    );
                                    return isLongTag ? (
                                        <Tooltip title={tag} key={tag}>
                                            {tagElem}
                                        </Tooltip>
                                    ) : (
                                        tagElem
                                    );
                                })}
                                {inputVisible && (
                                    <Input
                                        ref={inputRef}
                                        type="text"
                                        size="small"
                                        className={styles.tagInput}
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onBlur={handleInputConfirm}
                                        onPressEnter={handleInputConfirm}
                                    />
                                )}
                                {!inputVisible && (
                                    <Tag className={styles.siteTagPlus} onClick={showInput}>
                                        <PlusOutlined /> New Tag
                                    </Tag>
                                )}
                            </>
                        </Form.Item>
                    </Form>
                    <Form layout="vertical">
                        <Form.Item label={
                            <><BellOutlined style={{ fontSize: '25px', }}
                            /> &nbsp;Notification</>
                        }>
                            <Row justify="center">
                                <Col>
                                    <DatePicker
                                        showTime
                                        defaultValue={moment(today, dateFormat)}
                                        disabledDate={disabledDate}
                                        onChange={changeNotification} />
                                    <Button type="primary" style={{ marginLeft: '20px', borderRadius: '10px' }} onClick={() => submitNotification()}>Add</Button>
                                </Col>
                                <Col span={24}>
                                    <List
                                        dataSource={taskInfo.notification}
                                        renderItem={(item) => (
                                            <Row justify="center">
                                                <List.Item
                                                    actions={[
                                                        <Button type="danger" onClick={() => deleteNotification(item)}>Delete</Button>
                                                    ]}
                                                >
                                                    {item.reminder}
                                                </List.Item>
                                            </Row>
                                        )}
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>

                    <Form layout="vertical">
                        <Form.Item label={
                            <><UnorderedListOutlined
                                style={{ fontSize: '25px', }}
                            /> &nbsp;Subtask</>
                        }>
                            <Row justify="center">
                                <Col>
                                    <Row>
                                        <Col><Input value={subTask} placeholder="Add new subtask" onChange={(e) => changeSubtask(e)} /></Col>
                                        <Col><Button type="primary" style={{ marginLeft: '20px', borderRadius: '10px' }} onClick={() => submitSubtask()}>Add</Button></Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <List
                                        dataSource={taskInfo.subTask}
                                        renderItem={(item) => (
                                            <Row justify="center" align="middle">
                                                <Col span={12}>
                                                    <List.Item
                                                        actions={[
                                                            <Col span={12} >
                                                                <Button type="text" onClick={() => deleteSubtask(item)} icon={<DeleteFilled />}></Button>
                                                            </Col>
                                                        ]}
                                                    >

                                                        <Checkbox onClick={() => tickSubTask(item)}>{item.name}</Checkbox>
                                                    </List.Item>
                                                </Col>


                                            </Row>
                                        )}
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>

                    <Form layout="vertical">
                        <Form.Item label={
                            <><FileTextOutlined
                                style={{ fontSize: '25px', }}
                            /> &nbsp;Description</>}>
                            <Input value={taskInfo.description} placeholder="Add more description" onChange={(e) => changeDescription(e)} />
                        </Form.Item>
                    </Form>



                </Modal>
            </div>

            <Modal
                title="Add new list"
                visible={showAddList}
                footer={null}
                onCancel={handleCancel}
                maskClosable={false}
                width={500}
                centered
                destroyOnClose
            >
                <AddList handleCancel={handleCancel} projectID={taskInfo.idProject} userID={userID} />
            </Modal>

        </>
    )
}

const mapStateToProps = (state) => ({
    filterStatus: state.statusTask,
    userID: state.account.account ? state.account.account.idAccount : -1,
    project: state.project.listProject,
    list: state.list.list
});

const mapActionToProps = {
    getAllProject,
    resetList,
    showList,
    deleteNotification,
    deleteSubtask,
    deleteTag
}

export default connect(mapStateToProps, mapActionToProps)(EditTask);
