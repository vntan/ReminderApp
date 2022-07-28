import React, { useState } from "react";

import 'antd/dist/antd.css';
import {
    Button, Modal, Row, Col,
    Form, Input, Avatar, DatePicker,
    List, Select, Checkbox
} from 'antd';
import {
    EditFilled, DeleteFilled,
    FolderFilled, CheckOutlined,
    FileTextFilled, UnorderedListOutlined,
    HourglassFilled, BellFilled, CloseOutlined, TagsFilled
} from '@ant-design/icons'

import { today, dateFormat, moment } from "../../../Helper/DateMoment";

const TaskInfo = (props) => {
    const { showTaskInfo, closeTaskInfo, task } = props
    console.log('task: ', task)

    const closeModal = () => {
        props.closeTaskInfo()
    }

    const handleEditTask = () => {
        props.handleEditTask(task)
    }

    const handleDeleteTask = () => {
        props.handleDeleteTask(task)
    }

    const [taskInfo, setTaskInfo] = useState({
        // name: task.name,
        // nameProject: task.nameProject,
        // nameList: task.nameList,
        // dueDate: task.dueDate,
        // status: task.status,
        // description: task.description,

        notification: [task.notification],
        subTask: [
            { checked: false, name: 'SubTask 1' },
            { checked: true, name: 'SubTask 2' },
            { checked: false, name: 'SubTask 3' },
        ]
    })

    const [urlPhoto, setUrlPhoto] = useState([
        'D', 'K', 'A', 'H', 'N'
    ])

    return (
        <>
            <Modal
                title={[
                    <Row>
                        <Col span={21}>
                            {task.name}
                        </Col>
                        <Col span={3}>
                            <Row>
                                <Col span={8}><Button type="text" icon={<DeleteFilled />} onClick={() => handleDeleteTask()} /></Col>
                                <Col span={8} onClick={() => handleEditTask()}><Button type="text" icon={<EditFilled />} /></Col>
                                <Col span={8} onClick={closeTaskInfo}><Button type="text" icon={<CloseOutlined />} /></Col>
                            </Row>
                        </Col>

                        <Col>
                            <Avatar.Group>
                                {urlPhoto.map(item => (
                                    <Avatar>{item}</Avatar>
                                ))}
                            </Avatar.Group>
                        </Col>
                    </Row>
                ]}
                centered
                visible={showTaskInfo}
                closable={false}
                width={800}
                footer={[]} >
                <Form layout={'vertical'} >
                    <Row>
                        <Col span={12}>

                            <Form.Item label={
                                <><FolderFilled /> &nbsp;Project</>
                            }>
                                <div>{task.nameProject}</div>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={
                                <><UnorderedListOutlined /> &nbsp;List</>
                            }>
                                <div>{task.nameList}</div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <Form layout="horizontal">
                    <Form.Item label={
                        <><HourglassFilled /> &nbsp;Deadline</>
                    }>
                        <div>{task.dueDate}</div>
                    </Form.Item>
                </Form>

                <Form layout="horizontal">
                    <Form.Item label={
                        <><HourglassFilled /> &nbsp;Progress</>
                    }>
                        <div>{task.status}</div>
                    </Form.Item>
                </Form>

                <Form layout="horizontal">
                    <Form.Item label={
                        <><TagsFilled /> &nbsp;Tag</>
                    }>
                        <div>{task.tag}</div>

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
                                    bordered={false}
                                    disabled={true} />
                                <Button type="primary" disabled={true}>Add</Button>
                            </Col>
                            <Col span={24}>
                                <List
                                    dataSource={taskInfo.notification}
                                    renderItem={(item) => (
                                        <Row justify="center">
                                            <List.Item
                                                actions={[
                                                    <Button disabled={true}>Delete</Button>
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

                    <Form layout="horizontal">
                        <Form.Item label={<><FileTextFilled /> &nbsp;Description</>}>
                            <div>{task.description}</div>
                        </Form.Item>
                    </Form>
                </Form>

                <Form layout="vertical">
                    <Form.Item label={
                        <><UnorderedListOutlined /> &nbsp;Subtask</>
                    }>
                        <Row justify="center">
                            <Col>
                                <Row>
                                    <Col><Input disabled={true} bordered={false} /></Col>
                                    <Col><Button type="primary" disabled={true} >Add</Button></Col>
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
                                                        <Col span={12}>
                                                            <Button type="text" disabled={true} icon={<DeleteFilled />}></Button>
                                                        </Col>
                                                    ]}
                                                >
                                                    <Col>
                                                        <Checkbox checked={item.checked} disabled={true}>{item.name}</Checkbox>
                                                    </Col>

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

export default TaskInfo;