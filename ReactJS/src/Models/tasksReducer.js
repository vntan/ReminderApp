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
            state.taskInfo = action.payload.data;
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

        }
    }
})

const { getTasksSuccess } = taskSlice.actions;

export const getTasks = (userID, cb) => async dispatch => {
    console.log("Redux: ", userID)
    axios.post('/tasks/showUserTasks', { userID })
        .then((response) => {
            const data = response.data;
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

const { addTasksSuccess } = taskSlice.actions;

export const addTask = (task, tag, notification, subtask, cb) => async dispatch => {
    console.log("Redux: ", task, notification, subtask, tag)
    axios.post('/tasks/addTasks', { userID: task.userID, projectID: task.projectID, listID: task.listID, nameTask: task.nameTask, status: task.status, descriptionTask: task.descriptionTask, dueDateTask: task.dueDateTask })
        .then((response) => {
            const data = response.data;
            if (data["onSuccess"]) {
                console.log("Result: ", data)
                dispatch(addTasksSuccess({ data: task }));
                cb && cb(data["result"]);
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
    console.log(notification)
    axios.post('/tasks/addNotification', { taskID: notification.taskID, userID: notification.userID, reminder: notification.reminder })
        .then((response) => {
            const data = response.data;
            if (data["onSuccess"]) {
                dispatch(addNotificationSuccess({ data: notification }));
                cb && cb();
            }
            else console.log(data["error"]);

        })
        .catch((error) => {
            console.log(error);
        });
}

const { deleteNotificationSuccess } = taskSlice.actions;

export const deleteNotification = (notification, cb) => async dispatch => {
    axios.post('/tasks/deleteNotification', { taskID: notification.taskID, userID: notification.userID, reminder: notification.reminder })
        .then((response) => {
            const data = response.data;
            if (data["onSuccess"]) {
                dispatch(deleteNotificationSuccess({ data: notification }));
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
    axios.post('/tasks/addSubtasks', { taskID: subtask.taskID, nameSubTask: subtask.nameSubTask, statusSubtask: subtask.statusSubtask })
        .then((response) => {
            const data = response.data;
            if (data["onSuccess"]) {
                dispatch(addSubTaskSuccess({ data: subtask }));
                cb && cb();
            }
            else console.log(data["error"]);

        })
        .catch((error) => {
            console.log(error);
        });
}

const { addTagSuccess } = taskSlice.actions;

export const addTag = (tag, cb) => async dispatch => {
    axios.post('/tasks/addSubtasks', { taskID: tag.taskID, nameTag: tag.nameTag })
        .then((response) => {
            const data = response.data;
            if (data["onSuccess"]) {
                dispatch(addTagSuccess({ data: tag }));
                cb && cb();
            }
            else console.log(data["error"]);

        })
        .catch((error) => {
            console.log(error);
        });
}


export default taskSlice.reducer;