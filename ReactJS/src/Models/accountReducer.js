import axios from "axios";
import { createSlice } from '@reduxjs/toolkit'
import { KEY_ACCOUNT_STATE } from '../Utilities/Constants'


/* initial state */
const initialState = {
    isLogin: false,
    account: null,
};

//Reducer
const accountSlice = createSlice({
    name: 'account',
    initialState: JSON.parse(localStorage.getItem(KEY_ACCOUNT_STATE)) || initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isLogin = true;
            state.account = action.payload.data;
        },

        registerSuccess(state, action) {
            state.isLogin = true;
            state.account = action.payload.data;
        },

        logoutSuccess(state){
            state.isLogin = false;
            state.account = null;
        },
        changePasswordSuccess(state,action){
            state.isLogin = true;
            state.account = {...state.account, ...action.payload.data};
            localStorage.setItem(KEY_ACCOUNT_STATE, JSON.stringify(state));
        },
    }
});


const { loginSuccess, registerSuccess, logoutSuccess, changePasswordSuccess,getUserIDSuccess} = accountSlice.actions

export const login = ({ email, password }, cb) => async dispatch => {
    axios.post('/accounts/login', { email, password })
        .then((response) => {
            console.log(response.data);
            if (response.data.onSuccess) {
                localStorage.setItem(KEY_ACCOUNT_STATE, JSON.stringify({ isLogin: true, account: response.data.result[0] }));
                dispatch(loginSuccess({ data: response.data.result[0] }))
            }
            cb(response.data.onSuccess);
        })
        .catch(function (error) {
            console.log(error);
            cb(false);
        });
}

export const loginGoogle = (userInfo, cb) => async dispatch => {

    axios.post('/accounts/loginGoogle', userInfo)
        .then((response) => {
            console.log(response.data);
            if (response.data.onSuccess) {
                localStorage.setItem(KEY_ACCOUNT_STATE, JSON.stringify({ isLogin: true, account: response.data.result[0] }));
                dispatch(registerSuccess({ data: response.data.result[0] }))
            }
            cb(response.data.onSuccess);
        })
        .catch(function (error) {
            console.log(error);
            cb(false);
        });

}

export const register = (userInfo, cb) => async dispatch => {

    axios.post('/accounts/register', userInfo)
        .then((response) => {
            console.log(response.data);
            if (response.data.onSuccess) {
                localStorage.setItem(KEY_ACCOUNT_STATE, JSON.stringify({ isLogin: true, account: response.data.result[0] }));
                dispatch(registerSuccess({ data: response.data.result[0] }))
            }
            cb(response.data.onSuccess);
        })
        .catch(function (error) {
            console.log(error);
            cb(false);
        });

}

export const changePassword = (userInfo, cb) => async dispatch => {
    axios.post('/accounts/updateUser', {
        id:userInfo.id,
        name:userInfo.name,
        password:userInfo.password,
        urlImage:userInfo.urlImage,
    })
    .then((res) => {
        if(res.data.onSuccess){
            dispatch(changePasswordSuccess({ data: {
                id:userInfo.idAccount,
                name:userInfo.name,
                urlImage:userInfo.urlImage,
            }}))
        }
        cb(res.data.onSuccess)
    })
    .catch(function (error) {
        console.log(error);
        cb({onSuccess:false});
    });

}

export const getUserID = (userInfo,cb) => async dispatch => {
    axios.post('/accounts/getUserID', userInfo)
    .then((res) => {
        cb(res.data.onSuccess, res.data.result[0].idAccount)
    })
    .catch(function (error) {
        console.log(error);
        cb(false, null);
    });
}


export const updatePassword = ({ email, password }, cb) => async dispatch => {
    axios.post('/accounts/updateUserPassword', { email, password })
        .then((response) => {
            console.log(response.data);
            cb(response.data.onSuccess);
        })
        .catch(function (error) {
            console.log(error);
            cb(false);
        });
}

export const logout =() => async dispatch => {
    localStorage.removeItem(KEY_ACCOUNT_STATE);
    dispatch(logoutSuccess());
};   

export default accountSlice.reducer;


