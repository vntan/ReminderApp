import React, { useState } from "react";

import 'antd/dist/antd.css';
import {
    Button, Modal, Checkbox, Row,
    Col, Form, Input, Avatar,
    DatePicker, List, Select
} from 'antd';
import {
    EditFilled, DeleteFilled,
    FolderFilled, CheckOutlined,
    FileTextFilled, UnorderedListOutlined,
    HourglassFilled, BellFilled, CloseOutlined, TagsFilled, PlusOutlined, UserOutlined
} from '@ant-design/icons'

import { today, disabledDate, dateFormat, moment } from "../../../Helper/DateMoment";

const { Option } = Select;

const CreateTask = (props) => {
    const { showCreateTask, closeCreateTask, addNewTask } = props
    const [notification, setNotification] = useState('')
    const [subTask, setSubTask] = useState('')

    const [taskInfo, setTaskInfo] = useState({
        name: '',
        nameProject: '',
        nameList: '',
        dueDate: '',
        status: '',
        tag: '',
        notification: [],
        description: '',
        subTask: []
    })

    const project = [
        'Project 1',
        'Project 2',
        'Project 3',
        'Project 6',
        'Project 9'
    ]

    const list = [
        'List 3',
        'List 4',
        'List 5',
        'List 7',
        'List 8'
    ]

    const [urlPhoto, setUrlPhoto] = useState([])

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
        if (value === 'None') {
            setTaskInfo({ ...taskInfo, nameProject: '' })
            return;
        }
        setTaskInfo({ ...taskInfo, nameProject: value })
    }

    const changeList = (value) => {
        if (value === 'None') {
            setTaskInfo({ ...taskInfo, nameList: '' })
            return;
        }
        setTaskInfo({ ...taskInfo, nameList: value })
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

    const submitNotification = () => {
        if (!notification) {
            return;
        }
        let listNotification = taskInfo.notification;
        listNotification.push(notification)
        setTaskInfo({ ...taskInfo, notification: listNotification })
    }

    const changeDescription = (e) => {
        setTaskInfo({ ...taskInfo, description: e.target.value })
    }

    const changeSubtask = (e) => {
        setSubTask(e.target.value)
    }

    const submitSubtask = () => {
        if (!subTask) {
            return;
        }
        let listSubtask = taskInfo.subTask;
        listSubtask.push({
            checked: false,
            name: subTask
        });
        setTaskInfo({ ...taskInfo, subTask: listSubtask })
        setSubTask('')

    }

    const tickSubTask = (e) => {
        // Need id of each subtask to do that
        console.log('Tick subtask: ', e.target.checked)
    }

    return (
        <>
            <Modal
                title={[
                    <Row>
                        <Col span={22}>
                            <Form.Item >
                                <Input value={taskInfo.name} placeholder='Enter name of Task' onChange={(e) => changeName(e)} />
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Row>
                                <Col span={12} onClick={() => handleSubmitTask()}><Button type="text" icon={<CheckOutlined />} /></Col>
                                <Col span={12} onClick={closeCreateTask}><Button type="text" icon={<CloseOutlined />} /></Col>
                            </Row>
                        </Col>

                        <Col>
                            <Avatar.Group>
                                {urlPhoto.map(item => (
                                    <Avatar>{item}</Avatar>
                                ))}
                                <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => handleAddParticipant()}></Button>
                            </Avatar.Group>

                        </Col>

                    </Row>
                ]}
                centered
                visible={showCreateTask}
                closable={false}
                width={800}
                footer={[]} >

                <Form layout={'vertical'} >
                    <Row>
                        <Col span={12}>

                            <Form.Item label={
                                <><FolderFilled /> &nbsp;Project</>
                            }>
                                <Select
                                    value={taskInfo.nameProject}
                                    onChange={changeProject}
                                    allowClear
                                >
                                    <Option value="None">None</Option>
                                    {project && project.map((item, index) => (
                                        <Option value={item}>{item}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={
                                <><UnorderedListOutlined /> &nbsp;List</>
                            }>

                                <Select
                                    value={taskInfo.nameList}
                                    onChange={changeList}
                                    allowClear
                                >
                                    <Option value="None">None</Option>
                                    {list && list.map((item, index) => (
                                        <Option value={item}>{item}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <Form layout="horizontal">
                    <Form.Item label={
                        <><HourglassFilled /> &nbsp;Deadline</>
                    }>
                        <DatePicker
                            showTime
                            defaultValue={moment(taskInfo.dueDate.length > 0 ? taskInfo.dueDate : today, dateFormat)}
                            disabledDate={disabledDate}
                            onChange={changeDueDate} />
                    </Form.Item>
                </Form>

                <Form layout="horizontal">
                    <Form.Item label={
                        <><HourglassFilled /> &nbsp;Progress</>
                    }>
                        <Select
                            value={taskInfo.status}
                            onChange={changeStatus}
                            allowClear
                        >
                            <Option value="To Do">To do</Option>
                            <Option value="On Going">On Going</Option>
                            <Option value="Complete">Complete</Option>
                        </Select>
                    </Form.Item>
                </Form>

                <Form layout="horizontal">
                    <Form.Item label={
                        <><TagsFilled /> &nbsp;Tag</>
                    }>
                        <Input value={taskInfo.tag} placeholder="Add more tag to your tag" onChange={(e) => changeTag(e)} />

                    </Form.Item>
                </Form>

                <Form layout="vertical">
                    <Form.Item label={
                        <><BellFilled /> &nbsp;Notification</>
                    }>
                        <Row justify="center">
                            <Col>
                                <DatePicker
                                    showTime
                                    defaultValue={moment(today, dateFormat)}
                                    disabledDate={disabledDate}
                                    onChange={changeNotification} />
                                <Button type="primary" onClick={() => submitNotification()}>Add</Button>
                            </Col>
                            <Col span={24}>
                                <List
                                    dataSource={taskInfo.notification}
                                    renderItem={(item) => (
                                        <Row justify="center">
                                            <List.Item
                                                actions={[
                                                    <Button type="danger">Delete</Button>
                                                ]}
                                            >
                                                {item}
                                            </List.Item>
                                        </Row>
                                    )}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>

                <Form layout="vertical">
                    <Form.Item label={<><FileTextFilled /> &nbsp;Description</>}>
                        <Input value={taskInfo.description} placeholder="Add more description" onChange={(e) => changeDescription(e)} />
                    </Form.Item>
                </Form>

                <Form layout="vertical">
                    <Form.Item label={
                        <><UnorderedListOutlined /> &nbsp;Subtask</>
                    }>
                        <Row justify="center">
                            <Col>
                                <Row>
                                    <Col><Input value={subTask} placeholder="Add new subtask" onChange={(e) => changeSubtask(e)} /></Col>
                                    <Col><Button type="primary" onClick={() => submitSubtask()}>Add</Button></Col>
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
                                                            <Button type="text" icon={<DeleteFilled />}></Button>
                                                        </Col>
                                                    ]}
                                                >

                                                    <Checkbox checked={item.checked} onChange={(e) => tickSubTask(e)}>{item.name}</Checkbox>
                                                </List.Item>
                                            </Col>


                                        </Row>
                                    )}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
}

export default CreateTask;
