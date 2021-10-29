import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Navbar from "../Navbar"
import axios from "axios"
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SecureLS from "secure-ls"
// var ls = new SecureLS();



function Login() {
  const securestorage = new SecureLS();
  //-----------------------------------
  const history = useHistory()
  const [error, seterror] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const logIn = e => {
    e.preventDefault();
    let user = {
      "email": email,
      "password": password
    }
    if (user.email === "" || user.password === "") {
      seterror("Some fields are empty")
    } else {
      axios.post("#", user)
        .then(res => {
          //console.log(res)
          const resLen = res.data.length
          if (resLen === 0) {
            //this response is for all users
            seterror('No User Found Please register')
          } else {
            //catch response info and analyse them
            const resInfo = res.data[0]
            if (resInfo.password === user.password) {
              const userTostore = {
                "first_name": resInfo.first_name,
                "last_name": resInfo.last_name,
                "phone": resInfo.phone,
                "email": resInfo.email,
                "password": resInfo.password,
              }
              if (localStorage.getItem("LoginAuthLevel") !== null) {
                seterror('A user is already loggedin On this browser')
              } else {
                if (resInfo.authlevel === "manager") {
                  securestorage.set('user', resInfo.email)
                  securestorage.set('LoginStatus', true)
                  securestorage.set('LoginAuthLevel', resInfo.authlevel)
                  history.push('/dashboardManager')
                } else {
                  if (resInfo.authlevel === "consult") {
                    securestorage.set('user', resInfo.email)
                    securestorage.set('LoginStatus', true)
                    securestorage.set('LoginAuthLevel', resInfo.authlevel)
                    history.push('/dashboardCon')
                  } else {
                    if (resInfo.authlevel === "user") {
                      securestorage.set('user', resInfo.email)
                      securestorage.set('LoginStatus', true)
                      securestorage.set('LoginAuthLevel', resInfo.authlevel)
                      history.push('/dashboardUser')
                    }
                  }
                }
              }
            } else {
              seterror("Incorrect Password")
            }
          }
        }
        )
    }
  }

  //-----------------------------------
  return (
    <div>

      <Navbar />
      <div className="col-sm-6 offset-sm-3">
        <br />
        <br />
        <br />
        <input type="text" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} /><br />
        <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} /><br />
        <button onClick={logIn} className="btn btn-primary">Login</button>
        <br />
        <br />
        <br />
        <div>
          <h1>{error}</h1>
        </div>
      </div>
    </div>
  )
}

export default Login