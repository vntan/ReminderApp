import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styles from "./CreateTaskStyle.module.css";

import "antd/dist/antd.css";
import {
  Button,
  Modal,
  Checkbox,
  Row,
  Col,
  Form,
  Input,
  Avatar,
  DatePicker,
  List,
  Select,
  Tag,
  Tooltip,
  message,
} from "antd";
import {
  DeleteFilled,
  FolderOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
  LineChartOutlined,
  HourglassOutlined,
  BellOutlined,
  CloseOutlined,
  TagsOutlined,
  PlusOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import {
  today,
  disabledDate,
  dateFormat,
  moment,
} from "../../../Helper/DateMoment";

import { getAllProject } from "../../../Models/projectReducer";
import { resetList } from "../../../Models/listReducer";
import { showList } from "../../../Models/listReducer";
import AddList from "../../AddList/AddList";
import { forwardRef } from "react";
import FormContext from "rc-field-form/es/FormContext";

import { addTask, addNotification, addTag, addSubTask, getTasks } from "../../../Models/tasksReducer";

const { Option } = Select;
const { TextArea } = Input;

const CreateTask = (props) => {
  const {
    showCreateTask,
    closeCreateTask,
    addTask,
    addTag,
    addNotification,
    addSubTask,
    project,
    list,
    userID,
  } = props;

  const [notification, setNotification] = useState([]);
  const [subTask, setSubTask] = useState([]);
  const [showAddList, setShowAddList] = useState(false);

  const [reload, setReload] = useState(false);
  const [form] = Form.useForm();

  const [inputNotification, setInputNotification] = useState();
  const [addSubtask, setAddSubtask] = useState();

  const [tags, setTags] = useState([]);
  const [inputTag, setAddTag] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const tagRef = useRef(null);

  useEffect(() => {
    if (inputTag) {
      tagRef.current?.focus();
    }
  }, [inputTag]);

  useEffect(() => {
    props.getAllProject({ userID }, (result) => {
      if (result) {
        props.showList({ userID });
      }
    });
  }, []);

  const submitTask = () => {
    form.submit();
  };

  const statusToColor = (status) => {
    const findStatus = props.filterStatus.find((s) => s.nameStatus === status);
    return findStatus ? { ...findStatus.style } : { color: "000" };
  };

  const handleCancelAddList = () => {
    setShowAddList(false);
  };

  const changeProject = () => {
    form.setFieldsValue({
      list: -1,
    });
    setReload(!reload);
  };


  const deleteNotification = (index) => {
    const noti = [...notification];
    noti.splice(index, 1);
    setNotification(noti);
    console.log(noti);
  };

  const submitNotification = () => {
    if (!inputNotification) {
      message.error("Cannot add your notification! Please select again!");
      return;
    }

    if (
      notification.find((item) => {
        return item.format(dateFormat) === inputNotification.format(dateFormat);
      })
    ) {
      message.error("Cannot add the same notification");
      return;
    }

    const noti = [...notification];
    noti.push(inputNotification);
    setNotification(noti);
    setInputNotification(null);
    console.log(noti);
  };

  const changeSubtask = (e) => {
    setSubTask(e.target.value);
  };

  const submitSubtask = () => {
    const sub = [...subTask];
    sub.push({
      nameSubTask: addSubtask,
      status: false,
    });
    setSubTask(sub);
    setAddSubtask(null);
  };

  const deleteSubtask = (index) => {
    const sub = [...subTask];
    sub.splice(index, 1);
    setSubTask(sub);
  };

  const tickSubTask = (status, index) => {
    const sub = [...subTask];
    sub[index].status = status;
    setSubTask(sub);
  };

  const handleInputConfirm = () => {
    if (tagInput && tags.indexOf(tagInput) === -1) {
      setTags([...tags, tagInput]);
    }

    console.log(tags)

    setAddTag(false);
    setTagInput("");
  };

  const onFinish = (values) => {
    console.log(values, tags, notification, subTask);

    const taskInfo = {
      userID: userID,
      projectID: values.project,
      listID: values.list,
      nameTask: values.nameTask,
      status: values.progress,
      descriptionTask: values.description,
      dueDateTask: values.deadline.format(dateFormat),
    };

    // console.log(taskInfo);
    // console.log("Tags", tags);
    // console.log("Notificaton", notification.map(items => items.format(dateFormat)));
    // console.log("Subtasks", subTask);

    props.addTask(taskInfo, tags, notification.map(items => items.format(dateFormat)), subTask, (value)=>{
        if (value){
          props.getTasks(userID, ()=>{
            closeCreateTask();
          })
        }
        else message.error("Cannot add the task!");
    });
  };

  return (
    <>
      <div>
        <Modal
          title="Add Task"
          visible={showCreateTask}
          onOk={submitTask}
          onCancel={closeCreateTask}
          maskClosable={false}
          width={800}
          bodyStyle={{
            maxHeight: 500,
            overflowY: "auto",
            maxHeight: "calc(100vh - 200px)",
          }}
          centered
          destroyOnClose
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name="nameTask"
              rules={[
                { required: true, message: "Please input your task name!" },
              ]}
            >
              <Input placeholder="Enter Name of Task" />
            </Form.Item>

            <Row style={{ marginBottom: "-20px" }}>
              <Col span={12}>
                <Form.Item
                  name="project"
                  label={
                    <>
                      <FolderOutlined style={{ fontSize: "25px" }} /> &nbsp;
                      Project
                    </>
                  }
                  labelCol={{ span: 24 }}
                  style={{ marginRight: "60px", marginBottom: 0 }}
                  initialValue={-1}
                >
                  <Select
                    listHeight={130}
                    onChange={changeProject}
                  >
                    <Option value={-1}>None</Option>
                    {project &&
                      project.map((item, index) => (
                        <Option key={item.idProject} value={item.idProject}>
                          {item.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <>
                      <UnorderedListOutlined style={{ fontSize: "25px" }} />{" "}
                      &nbsp;List
                    </>
                  }
                  labelCol={{ span: 24 }}
                  style={{ marginRight: "60px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Form.Item
                      name="list"
                      style={{ width: "100%" }}
                      rules={[
                        {
                          message: "Please choose the list",
                          validator: (_, value) => {
                            if (value && value >= 0) return Promise.resolve();
                            else
                              return Promise.reject("Please choose the list");
                          },
                        },
                      ]}
                      initialValue={-1}
                    >
                      <Select listHeight={130} defaultValue={-1}>
                        <Option value={-1}>- Select a list -</Option>
                        {list &&
                          list
                            .filter((item) => {
                              console.log(form.getFieldValue("project"))

                              return form.getFieldValue("project") !== -1
                                ? item.idProject ===
                                    form.getFieldValue("project")
                                : item.idProject === null;
                            })
                            .map((item) => (
                              <Option key={item.idList} value={item.idList}>
                                {item.name}
                              </Option>
                            ))}
                      </Select>
                    </Form.Item>

                    <PlusCircleOutlined 
                      style={{ marginLeft: "12px", marginTop: "12px" }}
                      onClick={() => {setShowAddList(true)}}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="deadline"
              label={
                <>
                  <HourglassOutlined style={{ fontSize: "25px" }} />
                  &nbsp;Deadline
                </>
              }
            >
              <DatePicker
                showTime
                inputReadOnly={true}
                disabledDate={disabledDate}
              />
            </Form.Item>

            <Form.Item
              name="progress"
              initialValue={"To do"}
              label={
                <>
                  <LineChartOutlined style={{ fontSize: "25px" }} />
                  &nbsp;Progress
                </>
              }
            >
              <Select
                style={{ ...statusToColor(form.getFieldValue("progress")), width: "205px" }}
                showArrow={false}
              >
                {props.filterStatus.map((status, index) => {
                  return (
                    <Option
                      key={index}
                      value={status.nameStatus}
                      style={{ textAlign: "center", ...status.style }}
                    >
                      {status.nameStatus}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              name={"description"}
              label={
                <>
                  <FileTextOutlined style={{ fontSize: "25px" }} />{" "}
                  &nbsp;Description
                </>
              }
              labelCol={{ span: 24 }}
            >
              <TextArea
                showCount
                maxLength={100}
                style={{ height: 120 }}
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  <TagsOutlined style={{ fontSize: "25px" }} /> &nbsp;Tag
                </>
              }
            >
              {tags.map((tagItem, index) => {
                return (
                  <Tag
                    closable
                    onClose={() => {
                      const newTags = tags.filter((tag) => tag !== tagItem);
                      setTags(newTags);
                    }}
                  >
                    <span>{tagItem}</span>
                  </Tag>
                );
              })}

              {inputTag && (
                <Input
                  ref={tagRef}
                  type="text"
                  size="small"
                  style={{
                    width: "78px",
                    marginRight: "8px",
                    verticalAlign: "top",
                  }}
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                  }}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              )}

              {!inputTag && (
                <Tag
                  style={{ background: "#fff", borderStyle: "dashed" }}
                  onClick={() => {
                    setAddTag(true);
                  }}
                >
                  <PlusOutlined /> New Tag
                </Tag>
              )}
            </Form.Item>

            <Form.Item
              label={
                <>
                  <BellOutlined style={{ fontSize: "25px" }} />{" "}
                  &nbsp;Notification
                </>
              }
              labelCol={{ span: 24 }}
            >
              <Row justify="center">
                <Col>
                  <DatePicker
                    showTime
                    disabledDate={disabledDate}
                    value={inputNotification}
                    onChange={(value) => setInputNotification(value)}
                  />
                  <Button
                    type="primary"
                    style={{ marginLeft: "20px", borderRadius: "10px" }}
                    onClick={() => submitNotification()}
                  >
                    Add
                  </Button>
                </Col>
                <Col span={24}>
                  <List
                    dataSource={notification}
                    renderItem={(item, index) => (
                      <Row justify="center">
                        <List.Item
                          actions={[
                            <Button
                              type="danger"
                              onClick={() => deleteNotification(index)}
                            >
                              Delete
                            </Button>,
                          ]}
                          key={index}
                        >
                          {item.format(dateFormat)}

                          {/* {console.log(item.format(dateFormat))} */}
                        </List.Item>
                      </Row>
                    )}
                  />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              label={
                <>
                  <UnorderedListOutlined style={{ fontSize: "25px" }} />{" "}
                  &nbsp;Subtask
                </>
              }
              labelCol={{ span: 24 }}
            >
              <Row justify="center">
                <Col>
                  <Row>
                    <Col>
                      <Input
                        value={addSubtask}
                        placeholder="Add new subtask"
                        onChange={(e) => setAddSubtask(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        style={{ marginLeft: "20px", borderRadius: "10px" }}
                        onClick={() => submitSubtask()}
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <List
                    dataSource={subTask}
                    renderItem={(item, index) => (
                      <Row justify="center" align="middle">
                        <Col span={12}>
                          <List.Item
                            actions={[
                              <Col span={12}>
                                <Button
                                  type="text"
                                  onClick={() => deleteSubtask(index)}
                                  icon={<DeleteFilled />}
                                ></Button>
                              </Col>,
                            ]}
                          >
                            <Checkbox
                              onChange={(e) =>
                                tickSubTask(e.target.checked, index)
                              }
                            >
                              {item.nameSubTask}
                            </Checkbox>
                          </List.Item>
                        </Col>
                      </Row>
                    )}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <Modal
        title="Add new list"
        visible={showAddList}
        footer={null}
        onCancel={handleCancelAddList}
        maskClosable={false}
        width={500}
        centered
        destroyOnClose
      >
        <AddList
          handleCancelAddList={handleCancelAddList}
          projectID={ form.getFieldValue("project")}
          userID={userID}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  filterStatus: state.statusTask,
  userID: state.account.account ? state.account.account.idAccount : -1,
  project: state.project.listProject,
  list: state.list.list,
});

const mapActionToProps = {
  getAllProject,
  resetList,
  showList,
  addTask,
  addTag,
  addNotification,
  addSubTask,
  getTasks,
};

export default connect(mapStateToProps, mapActionToProps)(CreateTask);
