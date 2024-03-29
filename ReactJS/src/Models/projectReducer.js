import axios from "axios";
import { createSlice } from '@reduxjs/toolkit'
import {addListFromProject} from './listReducer'


const initState = {
    listProject: [],
    projectInfo: {
        projectSelect: [],
        participants: []
    },
}

const projectSlice = createSlice({
    name: 'project',
    initialState: initState,
    reducers:{
        getAllProjectSuccess(state,action){
            state.listProject = action.payload.data
        },
        showProjectInformationSuccess(state,action){
            state.projectInfo = action.payload.data
        },
        editProjectSuccess(state,action){
            state.projectInfo.projectSelect[0] = action.payload.data

            let index = -1
            if (state.listProject){

                index = state.listProject.findIndex((value)=>{
                    return value.idProject === action.payload.data.idProject
                });
            }
            
            if(index >= 0){
                state.listProject[index].name = action.payload.data.name
                state.listProject[index].description = action.payload.data.description
            }
            
        },
        addParticipantSuccess(state,action){
            state.projectInfo.participants = action.payload.data
        },
        deleteParticipantToProjectSuccess(state,action){
            let index = -1
            index = state.projectInfo.participants.findIndex(value => {
                return value.idUser === action.payload.userIDDelete
            })
            if(index > -1){
                state.projectInfo.participants.splice(index,1)
            }
        },
        updateParticipantToProjectSuccess(state,action){
            let index = -1
            index = state.projectInfo.participants.findIndex(value => {
                return value.idUser === action.payload.userIDUpdate
            })
            if(index > -1){
                state.projectInfo.participants[index].role = action.payload.role
            }
        },
        deleteProjectSuccess(state,action){
            let index = -1
            index = state.listProject.findIndex(value => {
                return value.idProject === action.payload.projectID
            })
            if(index > -1){
                state.listProject.splice(index,1)
                state.projectInfo.projectSelect = []
                state.projectInfo.participants = []
            }
        },
        leaveProjectSuccess(state,action){
            state.projectInfo.projectSelect = []
            state.projectInfo.participants = []
            let index = -1
            index = state.listProject.findIndex(value => {
                return value.idProject === action.payload.projectID
            })
            if(index > -1){
                state.listProject.splice(index,1)
            }
        },
        addProjectSuccess(state,action){
            state.listProject = action.payload.data
        }
    }
})

const {getAllProjectSuccess, showProjectInformationSuccess, editProjectSuccess, addParticipantSuccess,deleteParticipantToProjectSuccess,deleteProjectSuccess,leaveProjectSuccess,addProjectSuccess, updateParticipantToProjectSuccess} = projectSlice.actions


export const getAllProject = (projectInfo, cb) => async dispatch => {
    axios.post('/projects/showAllProject',projectInfo)
    .then((res)=>{
        if(res.data.onSuccess){
            dispatch(getAllProjectSuccess({data:res.data.result}))
            cb(res.data.result)
        }
    })
    .catch(function (error) {
        console.log(error);
        cb(false)
    });
}

export const showProjectInformation = (projectInfo) => async dispatch => {
    axios.post('/projects/showProjectInfomation',projectInfo)
    .then((res) => {
        console.log(res.data)
        if(res.data.onSuccess){
            dispatch(showProjectInformationSuccess({data:{projectSelect:res.data.result.projectInfo,participants:res.data.result.participants}}))
            dispatch(addListFromProject(res.data.result.listInformation))
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const editProject = (projectInfo,cb) => async dispatch => {
    axios.post('/projects/editProject',projectInfo)
    .then((res)=> {
        if(res.data.onSuccess){
            dispatch(editProjectSuccess({data:{idProject:projectInfo.projectID,userID:projectInfo.userID,name:projectInfo.nameProject,description: projectInfo.description}}))
        }
        cb(res.data.onSuccess);
    })
    .catch(function (error) {
        console.log(error);
        cb(error)
    });
}

export const addParticipant = (projectInfo,cb) => async dispatch => {
    axios.post('/projects/addParticipantToProject',projectInfo)
    .then((res)=> {
        console.log('project info',projectInfo)
        if(res.data.onSuccess){
            dispatch(addParticipantSuccess({data:res.data.participants}))
        }
        cb(res.data);
    })
    .catch(function (error) {
        console.log(error);
        cb(error)
    });
}

export const deleteParticipantToProject = (projectInfo,cb) => async dispatch => {
    axios.post('/projects/deleteParticipantToProject',projectInfo)
    .then((res) => {
        console.log(projectInfo)
        if(res.data.onSuccess){
            dispatch(deleteParticipantToProjectSuccess({userIDDelete:projectInfo.userIDDelete}))
        }
        cb(res.data.onSuccess)
    })
    .catch(function (error) {
        console.log(error);
        cb(error)
    });
}

export const updateParticipantToProject = (projectInfo,cb) => async dispatch => {
    axios.post('/projects/updateParticipantToProject',projectInfo)
    .then((res) => {
        console.log(projectInfo)
        if(res.data.onSuccess){
            dispatch(updateParticipantToProjectSuccess({userIDUpdate:projectInfo.userIDUpdate, role: projectInfo.role}))
        }
        cb(res.data.onSuccess)
    })
    .catch(function (error) {
        console.log(error);
        cb(error)
    });
}


export const deleteProject = (projectInfo,cb) => async dispatch => {
    axios.post('/projects/deleteProject',projectInfo)
    .then((res) => {
        if(res.data.onSuccess){
            dispatch(deleteProjectSuccess({projectID:projectInfo.projectID}))
        }
        cb(res.data.onSuccess)
    })
    .catch(function (error) {
        console.log(error);
        cb(error)
    });
}

export const addProject = (projectInfo,cb) => async dispatch => {
    axios.post('/projects/addProject',projectInfo)
    .then((res) => {
        if(res.data.onSuccess){
            dispatch(addProjectSuccess({data:res.data.result}))
        }
        cb(res.data.onSuccess)
    })
    .catch(function (error) {
        console.log(error);
        cb(error)
    });
}

export const leaveProject = (projectInfo,cb) => async dispatch => {
    axios.post('/projects/deleteParticipantToProject',projectInfo)
    .then((res) => {
        console.log(projectInfo)
        if(res.data.onSuccess){
            dispatch(leaveProjectSuccess({projectID:projectInfo.projectID}))
        }
        cb(res.data.onSuccess)
    })
    .catch(function (error) {
        console.log(error);
        cb(error)
    });
}


export default projectSlice.reducer