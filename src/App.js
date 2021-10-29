/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component, useState, useEffect } from 'react';
//import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Services } from './components/pages/Services/Services';
import About from './components/pages/About';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import DashboardUser from "./components/Dashboards/DashboardUser"
import DashboardManager from "./components/Dashboards/DashboardManager"
import DashboardCon from "./components/Dashboards/DashboardCon"
import Modal, { contextType } from "react-modal"
import SecureLS from "secure-ls"



//fix browser modal error
Modal.setAppElement('#root')

function App() {

  const securestorage = new SecureLS();

  function checkLoginUser() {
    // if (isLoggedIn === false || isLoggedIn===null) {
    if (localStorage.getItem("LoginStatus") === null && localStorage.getItem("LoginAuthLevel") === null) {
      return <div>404 Page Not Found </div>
    } else {
      if (securestorage.get("LoginAuthLevel") === "user") {
        return <DashboardUser />
      } else {
        return (
          <div>Please Logout First</div>
        )
      }
    }
  }
  function checkLoginManager() {
    if (localStorage.getItem("LoginStatus") === null && localStorage.getItem("LoginAuthLevel") === null) {
      return <div>404 Page Not Found </div>
    } else {
      if (securestorage.get("LoginAuthLevel") === "manager") {
        return <DashboardManager />
      } else {
        <div>Please Logout First</div>
      }
    }
  }
  function checkLoginConsultant() {
    if (localStorage.getItem("LoginStatus") === null && localStorage.getItem("LoginAuthLevel") !== "consult") {
      return <div>404 Page Not Found </div>
    } else {
      if (securestorage.get("LoginAuthLevel") === "consult") {
        return <DashboardCon />
      } else {
        <div>Please Logout First</div>
      }
    }
  }
  return (
    <>
      <Router>
        {/*<Navbar />*/}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/dashboardUser' component={checkLoginUser} />
          <Route exact path='/dashboardManager' component={checkLoginManager} />
          <Route exact path='/dashboardCon' component={checkLoginConsultant} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
