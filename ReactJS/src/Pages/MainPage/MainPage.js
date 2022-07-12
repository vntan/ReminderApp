import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../Models/accountReducer';
import { useNavigate } from "react-router-dom";

const MainPage = ({ state, logout }) => {

    const navigate = useNavigate();

    return (
        <div>
            This is main page
            {JSON.stringify(state)}
            <button onClick={() => {
                logout();
                navigate("/login")
            }}>Log out</button>
        </div>
    );
};


const mapStateToProps = (state) => {
    return { state }
}

const mapActionToProps = {
    logout,
}

export default connect(mapStateToProps, mapActionToProps)(MainPage);