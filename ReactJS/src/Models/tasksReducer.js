import axios from "axios";
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    tasks: []
    // taskInfo: null,
    // tag: null,
    // notification: null,
    // subTask: null
};


const taskSlice = createSlice({
    name: 'taskReducer',
    initialState: initialState,
    reducers: {
        getTasksSuccess(state, action) {
            let task = action.payload.data;
            let info = []
            console.log(task)
            task.TaskInformation && task.TaskInformation.map(taskInfo => {
                const participant = []
                const notification = []
                const tag = []
                const subtask = []
                task.TaskParticipant && task.TaskParticipant.map(item => {
                    if (item.idTask === taskInfo.idTask) {
                        participant.push(item)
                    }
                })
                task.Tags && task.Tags.map(item => {
                    if (item.idTask === taskInfo.idTask) {
                        tag.push(item)
                    }
                })
                task.TaskNotification && task.TaskNotification.map(item => {
                    if (item.idTask === taskInfo.idTask) {
                        notification.push(item)
                    }
                })
                task.SubTasks && task.SubTasks.map(item => {
                    if (item.idTask === taskInfo.idTask) {
                        subtask.push(item)
                    }
                })
                info = [
                    ...info,
                    {
                        taskInfo: taskInfo,
                        participant: participant,
                        notification: notification,
                        subtask: subtask,
                        tag: tag
                    }

                ]
            })
            state.tasks = info
            console.log(state.tasks)
        },
        deleteTasksSuccess(state, action) {
            let task = state.taskInfo
            task = task.filter(item => item.idTask !== item.idTask)
            state.taskInfo = task
        },
        addTasksSuccess(state, action) {
            // state.taskInfo.push({action.payload.data})
        },
        addNotificationSuccess(state, action) {
            let index = state.tasks.findIndex(item => item.taskInfo.idTask === action.payload.idTask)
            state.tasks[index].notification.push(action.payload.data)
            // state.notification.push(action.payload.data)
        },
        deleteNotificationSuccess(state, action) {
            // let notice = state.notification
            // notice = notice.filter(item => item.taskID !== action.payload.data.taskID && item.userID !== action.payload.data.userID && item.reminder !== action.payload.data.reminder)
            // state.notification = notice
        },
        addTagSuccess(state, action) {

        },
        addSubTaskSuccess(state, action) {
            let index = state.tasks.findIndex(item => item.taskInfo.idTask === action.payload.idTask)
            state.tasks[index].subtask.push(action.payload.data)
        },
        deleteTagSuccess(state, action) {
            let index = state.tasks.findIndex(item => item.taskInfo.idTask === action.payload.idTask)
            state.tasks[index].tag.push(action.payload.data)
        },
        deleteSubtaskSuccess(state, action) {

        }
    }
})

const { getTasksSuccess } = taskSlice.actions;

export const getTasks = (userID, cb) => async dispatch => {
    console.log("Redux: ", userID)
    axios.post('/tasks/showUserTasks', { userID })
        .then((response) => {
            const data = response.data;
            console.log(data["result"])
            if (data["onSuccess"]) {
                dispatch(getTasksSuccess({ data: data["result"] }));
                cb && cb();
            }
            else console.log(data["error"]);

        })
        .catch((error) => {
            console.log(error);
        });
}

const { deleteTasksSuccess } = taskSlice.actions;

export const deleteTasks = (taskID, cb) => async dispatch => {
    axios.post('/tasks/deleteTasks', { taskID })
        .then((response) => {
            const data = response.data;
            if (data["onSuccess"]) {
                dispatch(deleteTasksSuccess({ data: taskID }));
                cb && cb();
            }
            else console.log(data["error"]);

        })
        .catch((error) => {
            console.log(error);
        });
}

const { addNotificationSuccess } = taskSlice.actions;

export const addNotification = (notification, cb) => async dispatch => {
    console.log("Redux add notification: ", notification)
    axios.post('/tasks/addNotification', { taskID: notification.taskID, userID: notification.userID, reminder: notification.reminder })
        .then((response) => {
            const data = response.data;
            if (data["onSuccess"]) {
                dispatch(addNotificationSuccess({ data: data["data"], idTask: notification.taskID }))
                cb && cb(data["onSuccess"]);
            }
            else console.log(data["error"]);

        })
        .catch((error) => {
            console.log(error);
            cb(false)
        });
}

const { deleteNotificationSuccess } = taskSlice.actions;

export const deleteNotification = (notification, cb) => async dispatch => {
    axios.post('/tasks/deleteNotification', { taskID: notification.taskID, userID: notification.userID, reminder: notification.reminder })
        .then((response) => {
            const data = response.data;
            console.log("Result add notification: ", data)
            if (data["onSuccess"]) {
                dispatch(deleteNotificationSuccess({ data: notification, idTask: notification.taskID }));
                cb && cb();
            }
            else console.log(data["error"]);

        })
        .catch((error) => {
            console.log(error);
        });
}

const { addSubTaskSuccess } = taskSlice.actions;

export const addSubTask = (subtask, cb) => async dispatch => {
    console.log("Redux add subtask: ", subtask)
    axios.post('/tasks/addSubtasks', { taskID: subtask.taskID, nameSubTask: subtask.nameSubTask, statusSubtask: subtask.statusSubtask })
        .then((response) => {
            const data = response.data;
            console.log("Result add subtask: ", data)
            console.log(data)
            if (data["onSuccess"]) {
                dispatch(addSubTaskSuccess({ data: data["data"], idTask: subtask.taskID }))
                cb && cb(data["onSuccess"]);
            }
            else console.log(data["error"]);

        })
        .catch((error) => {
            console.log(error);
            cb(false)
        });
}

const { addTagSuccess } = taskSlice.actions;

export const addTag = (tag, cb) => async dispatch => {
    console.log("Redux add tag: ", tag)
    axios.post('/tasks/addTag', { taskID: tag.taskID, nameTag: tag.nameTag })
        .then((response) => {
            const data = response.data;
            console.log("Result add Tag: ", data)
            if (data["onSuccess"]) {
                dispatch(addTagSuccess({ data: data["result"], idTask: tag.taskID }));
                cb && cb(data["onSuccess"]);
            }
            else console.log(data["error"]);

        })
        .catch((error) => {
            console.log(error);
            cb(false)
        });
}

const { addTasksSuccess } = taskSlice.actions;

export const addTask = (task, tag, notification, subtask, cb) => async dispatch => {
    // console.log("Redux: ", task, notification, subtask, tag)
    axios.post('/tasks/addTasks', { userID: task.userID, projectID: task.projectID, listID: task.listID, nameTask: task.nameTask, status: task.status, descriptionTask: task.descriptionTask, dueDateTask: task.dueDateTask })
        .then((response) => {
            const data = response.data;
            if (data["onSuccess"]) {
                // console.log("Result: ", data["data"].taskID)
                // dispatch(addTasksSuccess({ data: task }));
                for (let tg of tag) {
                    addTag({ taskID: data["data"].taskID, nameTag: tg }, result => {
                        if (!result) {
                            return;
                        }
                    })
                }
                for (let notice of notification) {
                    addNotification({ taskID: data["data"].taskID, userID: task.userID, reminder: notice.reminder }, result => {
                        if (!result) {
                            return;
                        }
                    })
                }
                for (let sub of subtask) {
                    addSubTask({ taskID: data["data"].taskID, nameSubTask: sub.name, statusSubtask: sub.checked }, result => {
                        if (!result) {
                            return;
                        }
                    })
                }
                // getTasks(task.userID)

                cb && cb(data["data"].taskID);
            }
            else console.log(data["error"]);

        })
        .catch((error) => {
            console.log(error);
            cb(-1)
        });
}

const { deleteTagSuccess } = taskSlice.actions;

export const deleteTag = (tagID, cb) => async dispatch => {
    axios.post('/tasks/deleteTag', { tagID: tagID })
        .then((response) => {
            const data = response.data;
            console.log("Result add Tag: ", data)
            if (data["onSuccess"]) {
                // dispatch(deleteTagSuccess({ data: tag }));
                cb && cb(data["onSuccess"]);
            }
            else console.log(data["error"]);

        })
        .catch((error) => {
            console.log(error);
            cb(false)
        });
}

const { deleteSubtaskSuccess } = taskSlice.actions;

export const deleteSubtask = (subTaskID, cb) => async dispatch => {
    axios.post('/tasks/deleteSubtasks', { subTaskID: subTaskID })
        .then((response) => {
            const data = response.data;
            console.log("Result add Tag: ", data)
            if (data["onSuccess"]) {
                // dispatch(deleteSubtaskSuccess({ data: tag }));
                cb && cb(data["onSuccess"]);
            }
            else console.log(data["error"]);

        })
        .catch((error) => {
            console.log(error);
            cb(false)
        });
}


export default taskSlice.reducer;