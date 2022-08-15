
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { Form, Input, Button } from 'antd';

import { addListByTaskToUser, addListByTaskToProject } from '../../Models/listReducer';

const AddList = (props) => {
    const [formChangeName] = Form.useForm();
    const { projectID, userID } = props

    console.log(projectID)

    const onFinish = (value) => {
        const nameList = value.list_name
        if (projectID !== -1) {
            props.addListByTaskToProject({ projectID, userID, nameList }, result => {
                if (result) {
                    formChangeName.resetFields()
                    props.handleCancelAddList()
                }

            })
        }
        else {
            props.addListByTaskToUser({ userID, nameList }, result => {
                if (result) {
                    formChangeName.resetFields()
                    props.handleCancelAddList()
                }

            })
        }
    }
    const buttonCancel = () => {
        formChangeName.resetFields()
        props.handleCancelAddList()
    }

    return (
        <div >
            <Form form={formChangeName} name="control-ref" onFinish={onFinish}  >

                <Form.Item
                    name='list_name'
                    rules={[
                        {
                            required: true,
                            message: 'Please input name for list'
                        },
                    ]}
                >
                    <Input type='text' />

                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType="submit">
                        Add New List
                    </Button>
                    <Button onClick={buttonCancel}>
                        Cancel
                    </Button>
                </Form.Item>

            </Form>
        </div>

    )
}

const mapStateToProps = (state) => ({
    list: state.list.listOfProject,

});

const mapActionToProps = {
    addListByTaskToUser,
    addListByTaskToProject
}

export default connect(mapStateToProps, mapActionToProps)(AddList)
