import axios from "axios";
import { createSlice } from '@reduxjs/toolkit'
import { KEY_ACCOUNT_STATE } from '../Utilities/Constants'


/* initial state */
const initialState = {
    isLogin: false,
    account: null
};

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
    }
});


const { loginSuccess, registerSuccess } = accountSlice.actions

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

export const register = (userInfo, cb) => async dispatch => {

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


export default accountSlice.reducer;

