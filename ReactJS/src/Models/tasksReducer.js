import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "taskReducer",
  initialState: initialState,
  reducers: {
    getTasksSuccess(state, action) {
      let task = action.payload.data;
      let info = [];
      console.log("bẠN ƠI:", task);
      task.TaskInformation &&
        task.TaskInformation.map((taskInfo) => {
          const participant = [];
          const notification = [];
          const tag = [];
          const subtask = [];

          participant.push(
            ...task.TaskParticipant.filter(
              (item) => item.idTask === taskInfo.idTask
            )
          );
          notification.push(
            ...task.TaskNotification.filter(
              (item) => item.idTask === taskInfo.idTask
            )
          );
          tag.push(
            ...task.Tags.filter((item) => item.idTask === taskInfo.idTask)
          );
          subtask.push(
            ...task.SubTasks.filter((item) => item.idTask === taskInfo.idTask)
          );

          info = [
            ...info,
            {
              taskInfo: taskInfo,
              participant: participant,
              notification: notification,
              subtask: subtask,
              tag: tag,
            },
          ];
        });

      state.tasks = info;
      console.log(state.tasks);
    },

    addNotificationSuccess(state, action) {
      let index = state.tasks.findIndex(
        (item) => item.taskInfo.idTask === action.payload.idTask
      );
      state.tasks[index].notification.push(action.payload.data);
      // state.notification.push(action.payload.data)
    },
    deleteNotificationSuccess(state, action) {
      // let notice = state.notification
      // notice = notice.filter(item => item.taskID !== action.payload.data.taskID && item.userID !== action.payload.data.userID && item.reminder !== action.payload.data.reminder)
      // state.notification = notice
    },
    addTagSuccess(state, action) {},
    addSubTaskSuccess(state, action) {
      let index = state.tasks.findIndex(
        (item) => item.taskInfo.idTask === action.payload.idTask
      );
      state.tasks[index].subtask.push(action.payload.data);
    },
    deleteTagSuccess(state, action) {
      let index = state.tasks.findIndex(
        (item) => item.taskInfo.idTask === action.payload.idTask
      );
      state.tasks[index].tag.push(action.payload.data);
    },
    deleteSubtaskSuccess(state, action) {},
    updateStatusSuccess(state, action) {
      let index = state.tasks.findIndex(
        (item) => item.taskInfo.idTask === action.payload.taskID
      );
      if (index >= 0)
        state.tasks[index].taskInfo.status = action.payload.status;
    },
    deleteTasksSuccess(state, action){
      let index = state.tasks.findIndex(
        (item) => item.taskInfo.idTask === action.payload.taskID
      );

      state.tasks.splice(index, 1)
    }
  },
});

const { getTasksSuccess } = taskSlice.actions;

export const getTasks = (userID, cb) => async (dispatch) => {
  console.log("Redux: ", userID);
  axios
    .post("/tasks/showUserTasks", { userID })
    .then((response) => {
      const data = response.data;
      console.log(data["result"]);
      if (data["onSuccess"]) {
        dispatch(getTasksSuccess({ data: data["result"] }));
        cb && cb();
      } else console.log(data["error"]);
    })
    .catch((error) => {
      console.log(error);
    });
};


const { addNotificationSuccess } = taskSlice.actions;

export const addNotification = (notification, cb) => async (dispatch) => {
  console.log("Redux add notification: ", notification);
  axios
    .post("/tasks/addNotification", {
      taskID: notification.taskID,
      userID: notification.userID,
      reminder: notification.reminder,
    })
    .then((response) => {
      const data = response.data;
      if (data["onSuccess"]) {
        dispatch(
          addNotificationSuccess({
            data: data["data"],
            idTask: notification.taskID,
          })
        );
        cb && cb(data["onSuccess"]);
      } else console.log(data["error"]);
    })
    .catch((error) => {
      console.log(error);
      cb(false);
    });
};

const { deleteNotificationSuccess } = taskSlice.actions;

export const deleteNotification = (notification, cb) => async (dispatch) => {
  axios
    .post("/tasks/deleteNotification", {
      taskID: notification.taskID,
      userID: notification.userID,
      reminder: notification.reminder,
    })
    .then((response) => {
      const data = response.data;
      console.log("Result add notification: ", data);
      if (data["onSuccess"]) {
        dispatch(
          deleteNotificationSuccess({
            data: notification,
            idTask: notification.taskID,
          })
        );
        cb && cb();
      } else console.log(data["error"]);
    })
    .catch((error) => {
      console.log(error);
    });
};

const { addSubTaskSuccess } = taskSlice.actions;

export const addSubTask = (subtask, cb) => async (dispatch) => {
  console.log("Redux add subtask: ", subtask);
  axios
    .post("/tasks/addSubtasks", {
      taskID: subtask.taskID,
      nameSubTask: subtask.nameSubTask,
      statusSubtask: subtask.statusSubtask,
    })
    .then((response) => {
      const data = response.data;
      console.log("Result add subtask: ", data);
      console.log(data);
      if (data["onSuccess"]) {
        dispatch(
          addSubTaskSuccess({ data: data["data"], idTask: subtask.taskID })
        );
        cb && cb(data["onSuccess"]);
      } else console.log(data["error"]);
    })
    .catch((error) => {
      console.log(error);
      cb(false);
    });
};

export const addTask =
  (task, tag, notification, subtask, cb) => async (dispatch) => {
    console.log("Redux: ", task, notification, subtask, tag);
    axios
      .post("/tasks/addTasks", {
        userID: task.userID,
        projectID: task.projectID,
        listID: task.listID,
        nameTask: task.nameTask,
        status: task.status,
        descriptionTask: task.descriptionTask,
        dueDateTask: task.dueDateTask,
      })
      .then((response) => {
        const data = response.data;
        if (data["onSuccess"]) {
          for (let tg of tag) {
            console.log({ taskID: data["data"].taskID, nameTag: tg });
            dispatch(addTag({ taskID: data["data"].taskID, nameTag: tg }));
          }

          for (let notice of notification) {
            dispatch(
              addNotification(
                {
                  taskID: data["data"].taskID,
                  userID: task.userID,
                  reminder: notice,
                },
                (result) => {
                  if (!result) {
                    return;
                  }
                }
              )
            );
          }
          for (let sub of subtask) {
            dispatch(
              addSubTask(
                {
                  taskID: data["data"].taskID,
                  nameSubTask: sub.nameSubTask,
                  statusSubtask: sub.status,
                },
                (result) => {
                  if (!result) {
                    return;
                  }
                }
              )
            );
          }

          setTimeout(() => {
            dispatch(getTasks(task.userID));
            cb && cb(true);
          }, 1000);
        } else console.log(false);
      })
      .catch((error) => {
        console.log(error);
        cb(false);
      });
  };

const { addTagSuccess } = taskSlice.actions;

export const addTag = (tag, cb) => async (dispatch) => {
  axios
    .post("/tasks/addTag", { taskID: tag.taskID, nameTag: tag.nameTag })
    .then((response) => {
      const data = response.data;
      console.log("Result add Tag: ", data);
      if (data["onSuccess"]) {
        dispatch(addTagSuccess({ data: data["result"], idTask: tag.taskID }));
        cb && cb(data["onSuccess"]);
      } else console.log(data["error"]);
    })
    .catch((error) => {
      console.log(error);
      cb(false);
    });
};

const { deleteTagSuccess } = taskSlice.actions;

export const deleteTag = (tagID, cb) => async (dispatch) => {
  axios
    .post("/tasks/deleteTag", { tagID: tagID })
    .then((response) => {
      const data = response.data;
      console.log("Result add Tag: ", data);
      if (data["onSuccess"]) {
        // dispatch(deleteTagSuccess({ data: tag }));
        cb && cb(data["onSuccess"]);
      } else console.log(data["error"]);
    })
    .catch((error) => {
      console.log(error);
      cb(false);
    });
};

const { deleteSubtaskSuccess } = taskSlice.actions;

export const deleteSubtask = (subTaskID, cb) => async (dispatch) => {
  axios
    .post("/tasks/deleteSubtasks", { subTaskID: subTaskID })
    .then((response) => {
      const data = response.data;
      console.log("Result add Tag: ", data);
      if (data["onSuccess"]) {
        // dispatch(deleteSubtaskSuccess({ data: tag }));
        cb && cb(data["onSuccess"]);
      } else console.log(data["error"]);
    })
    .catch((error) => {
      console.log(error);
      cb(false);
    });
};

const { updateStatusSuccess } = taskSlice.actions;

export const updateStatusTask = (taskID, status, cb) => async (dispatch) => {
  axios
    .post("/tasks/updateTaskStatus", { taskID: taskID, status: status })
    .then((response) => {
      const data = response.data;

      if (data["onSuccess"]) {
        dispatch(updateStatusSuccess({ taskID: taskID, status: status }));
        cb && cb(data["onSuccess"]);
      } else cb(false);
    })
    .catch((error) => {
      console.log(error);
      cb(false);
    });
};

export const updateTask =
  (task, tag, notification, subtask, cb) => async (dispatch) => {
    console.log(task.taskID);
    axios
      .post("/tasks/deleteTasks", { taskID: task.taskID })
      .then((response) => {
        const data = response.data;

        if (data.onSuccess) {
          dispatch(
            addTask(task, tag, notification, subtask, (res) => {
              if (res) cb(true);
              else cb(false);
            })
          );
        } else cb(false);
      })
      .catch((error) => {
        console.log(error);
        cb(false);
      });
  };


  const { deleteTasksSuccess } = taskSlice.actions;

export const deleteTask = (taskID, cb) => async (dispatch) => {
  axios
    .post("/tasks/deleteTasks", { taskID })
    .then((response) => {
      const data = response.data;
      dispatch(deleteTasksSuccess(taskID))
      cb && cb(data.onSuccess);
    })
    .catch((error) => {
      console.log(error);
      cb && cb(false);
    });
};

export default taskSlice.reducer;
