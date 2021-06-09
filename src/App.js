import React, { useState, useEffect } from "react";
import './css/uifont.css';
import './css/App.css';
import './css/props.css';
//Module specific css files
import './css/CourseDetails.css';
import './css/Home.css';
import './css/SideBar.css';
import './css/RightBar.css';
import axios from 'axios';

//Left and Right Sidebar
import SideBar from "./SideBar/SideBar";
import RightBar from "./SideBar/RightBar";
//common Utils
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { getToken, removeUserSession, setUserSession } from "./Utils/Common";
import CourseDetails from "./components/Common/CourseDetails";
//Component Pages
import HomePage from "./components/Home/Home";
import AllCourses from "./components/AllCourses/AllCourses";
import MyCourses from "./components/Mycourses/MyCourses";
import WishList from "./components/Wishlist/Wishlist";
//Login
import Login from "./components/Login/Login";

import {
  Route,
  HashRouter
} from "react-router-dom";


function App() {
//Check User authentication also show Loading till User gets authenticated
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

//Check User authentication and set loading to false on success
    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  //Loading message while checking authentication
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App flex">
      <HashRouter>
        <SideBar />
          <div className="app-cotent">
            {/* PublicRoute URL is available without Login but for PrivateRout User needs to login First  */}
            <PrivateRoute path="/home" component={HomePage} />
            <Route exact path="/" component={Login} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/course/:courseid" component={CourseDetails} />
            <PrivateRoute path="/allcourses" component={AllCourses} />
            <PrivateRoute path="/my-courses" component={MyCourses} />
            <PrivateRoute path="/wishlist" component={WishList} />
          </div>
      </HashRouter>
      <RightBar />
    </div>
  );
}

export default App;
