import axios from "axios";
import { createSlice } from '@reduxjs/toolkit'
import updateListSuccess from './listReducer'

const initState = {
    listProject : null,
    projectInfo: null
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
        },
        addParticipantSuccess(state,action){
            state.projectInfo = action.payload.data
        }
        
    }
})

const {getAllProjectSuccess,showProjectInformationSuccess,editProjectSuccess,addParticipantSuccess} = projectSlice.actions


export const getAllProject = (projectInfo) => async dispacth => {
    axios.post('/projects/showAllProject',projectInfo)
    .then((res)=>{
        if(res.data.onSuccess){
            dispacth(getAllProjectSuccess({data:res.data.result}))
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const showProjectInformation = (projectInfo,cb) => async dispacth => {
    axios.post('/projects/showProjectInfomation',projectInfo)
    .then((res) => {
        console.log(res.data)
        if(res.data.onSuccess){
            dispacth(showProjectInformationSuccess({data:{projectInfo:res.data.result.projectInfo,participants:res.data.result.participants}}))
            cb({listInformation:res.data.result.listInformation})
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const editProject = (projectInfo,cb) => async dispacth => {
    axios.post('/projects/editProject',projectInfo)
    .then((res)=> {
        if(res.data.onSuccess){
            dispacth(editProjectSuccess({data:res.data.result}))
        }
        cb(res.data.onSuccess);
    })
    .catch(function (error) {
        console.log(error);
        cb(error)
    });
}

export const addParticipant = (projectInfo,cb) => async dispacth => {
    axios.post('/projects/addParticipantToProject',projectInfo)
    .then((res)=> {
        if(res.data.onSuccess){
            dispacth(addParticipantSuccess({data:res.data.result}))
        }
        cb(res.data.onSuccess);
    })
    .catch(function (error) {
        console.log(error);
        cb(error)
    });
}

export default projectSlice.reducer