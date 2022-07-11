import './App.css';

import 'antd/dist/antd.css';

import { Provider } from 'react-redux'
import store from './Models/store'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './Pages/LoginPage/LoginPage';
import MainPage from './Pages/MainPage/MainPage';
import ProvideAuth from './middleware/ProvideAuth';


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProvideAuth>
                  <MainPage />
                </ProvideAuth>
              }
            />

          </Routes>
        </div>
      </BrowserRouter>

    </Provider >

  );
}

export default App;
