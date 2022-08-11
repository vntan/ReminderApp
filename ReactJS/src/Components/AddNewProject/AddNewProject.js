import React from 'react'

import { connect } from 'react-redux';

import { addProject } from '../../Models/projectReducer'

import { Button, Checkbox, Form, Input } from 'antd';

const AddNewProject = (props) => {

  const onFinish = (value) => {
    const userID = props.account.idAccount
    const nameProject = value.name
    const description = value.description
    props.addProject({userID,nameProject,description},cb => {
      console.log(cb)
      props.handleCancel()
    })
  }
  return (
    <Form
    name="basic"
    onFinish={onFinish}>
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your name list !!!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Description"
      name="description"
      rules={[
        {
          required: true,
          message: 'Please input your description!!!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" >
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}

const mapStateToProps = (state) => ({
  account: state.account.account,
})

const mapActionToProps ={
  addProject,
}


export default connect(mapStateToProps,mapActionToProps)(AddNewProject)

