import "./App.css";

import "antd/dist/antd.css";

import { Provider } from "react-redux";
import store from "./Models/store";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./Pages/LoginPage/LoginPage";
import MainPage from "./Pages/MainPage/MainPage";
import ProvideAuth from "./middleware/ProvideAuth";
import PrivateProject from "./middleware/ProvideIDProject";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";


import MyProjectsComponent from "./Components/MyProjectsComponent/MyProjectsComponent";
import ProjectList from "./Components/MyProjectsComponent/ProjectList/ProjectList";
import ProjectCalendar from "./Components/MyProjectsComponent/ProjectCalendar/ProjectCalendar";

import MyTasksComponent from "./Components/MyTasksComponent/MyTasksComponent";
import TaskList from "./Components/MyTasksComponent/TaskList/TaskList";
import TaskCalendar from "./Components/MyTasksComponent/TaskCalendar/TaskCalendar";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/" element={<ProvideAuth>  <MainPage /> </ProvideAuth>}>
              <Route path="" element={<Navigate to="mytasks" />} />
              <Route path="mytasks" element={<MyTasksComponent />}>
                <Route path="" element={<Navigate to="list" />} />
                <Route path="list" />
                <Route path="calendar" />
              </Route>

              <Route path="projects" element={<PrivateProject> <MyProjectsComponent /> </PrivateProject>} >
                <Route path=":projectID">
                  <Route path="" element={<Navigate to="list" />} />
                  <Route path="list" />
                  <Route path="calendar"  />
                </Route>
              </Route>
            </Route>


          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
