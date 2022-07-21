import React from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";

function PrivateProject({ children, ...rest }) {
    
    const defaultID = 1;
    const location = useLocation();
    const {projectID} = useParams();

    console.log(location)

    if (!isNaN(projectID)) return children;
    else return <Navigate to= {defaultID.toString()} />;

}

export default PrivateProject;
