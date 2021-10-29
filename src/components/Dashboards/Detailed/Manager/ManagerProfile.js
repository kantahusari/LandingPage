/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import "./ManagerStyles.css"
import Modal from "react-modal"
import { useHistory } from "react-router-dom"
import axios from "axios"
import SecureLS from "secure-ls"

export default function ManagerProfile() {
    const securestorage = new SecureLS();
    const history = useHistory()
    //user information
    const [serverFname, setserverFname] = useState("")
    const [serverLname, setserverLname] = useState("")
    const [serverPhone, setserverPhone] = useState("")
    const [serverEmail, setserverEmail] = useState("")
    const [serverPassword, setserverPassword] = useState("")
    //catch userdata from the server
    useEffect(() => {
        const user = {
            // "email": localStorage.getItem("user"),
            "email": securestorage.get("user"),
        }
        axios.post("http://localhost:8080/users/getuser", user)
            .then(res => {
                const userData = res.data[0]
                setserverFname(userData.first_name)
                setserverLname(userData.last_name)
                setserverPhone(userData.phone)
                setserverEmail(userData.email)
                setserverPassword(userData.password)
            })
    }, [serverFname, serverLname, serverPhone, serverEmail, serverPassword])



    //Manager Data Catch
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")

    const [updateProfileModalError, setupdateProfileModalError] = useState("")

    //modal State
    const [managerModal, setmanagerModal] = useState(false)

    function closeManagerProfile(e) {
        //do updates 
        //do update changes  !!! 
        e.preventDefault()
        const userToUpdate = {
            "first_name": fname,
            "last_name": lname,
            "phone": phone,
            "email": email,
            "password": password,
            "authlevel": "manager"
        }
        const currentEmail = serverEmail
        if (fname === "" || lname === "" || phone === "" || email === "" || password === "" || repassword === "") {
            setupdateProfileModalError("Please Fill all fields")
        } else {
            if (password === repassword) {
                //do update here
                axios.post("http://localhost:8080/users/update", [userToUpdate, currentEmail])
                    .then(res => {
                        const userData = res.data
                        console.log(userData)
                        let errors = res.data.errors
                        let errorReport = []
                        for (const property in errors) {
                            console.log(`${property}: ${errors[property].message}`);
                            errorReport.push(`${property}: ${errors[property].message}`)
                        }
                        setupdateProfileModalError(errorReport)
                        if (errorReport.length === 0) {
                            //history.push('/')
                            setmanagerModal(false)
                            localStorage.clear();
                            history.push('/')
                        }
                    })
            } else {
                setupdateProfileModalError("Password does not match")
            }
        }
    }

    function openManagerProfile() {
        setmanagerModal(true)
    }

    function renderPassword(word) {
        let newword = ""
        for (let i = 0; i <= word.length; i++) {
            if (i <= 2) {
                newword = newword + `${word[i]}`
            } else {
                newword = newword + '*'
            }
        }
        return newword
    }



    return (
        <div>
            <div className="mprofile">
                <div className="userprofileDiv">
                    <br />
                    <br />
                    <table style={{ width: "40%", margin: "auto", fontSize: "25px" }}>
                        <tbody>
                            <tr>
                                <th>First Name</th>
                                <td>{serverFname}</td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td>{serverLname}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{serverPhone}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{serverEmail}</td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td>{
                                    renderPassword(serverPassword)
                                }</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <br />
                    <button className="btn btn-primary" onClick={openManagerProfile}>Edit Profile</button>
                    <br />
                    <br />
                </div>
            </div>
            <div>
                <Modal
                    isOpen={managerModal}
                    onRequestClose={() => setmanagerModal(false)}
                    style={
                        {
                            overlay: {
                                backgroundColor: 'ActiveCaption',
                            },
                            content: {
                                color: 'MenuText',
                                width: '50%',
                                height: '50%',
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)'
                            },
                        }
                    }
                >
                    <div className="col-sm-6 offset-sm-3">
                        <h1>Update Profile</h1>
                        <input type="text" className="form-control" placeholder={serverFname} onChange={(e) => setFname(e.target.value)} value={fname} /><br />
                        <input type="text" className="form-control" placeholder={serverLname} onChange={(e) => setLname(e.target.value)} value={lname} /><br />
                        <input type="text" className="form-control" placeholder={serverPhone} onChange={(e) => setPhone(e.target.value)} value={phone} /><br />
                        <input type="text" className="form-control" placeholder={serverEmail} onChange={(e) => setEmail(e.target.value)} value={email} /><br />
                        <input type="password" className="form-control" placeholder={renderPassword(serverPassword)} onChange={(e) => setPassword(e.target.value)} value={password} /><br />
                        <input type="password" className="form-control" placeholder="Re-Password" onChange={(e) => setRepassword(e.target.value)} value={repassword} /><br />
                        <button onClick={closeManagerProfile} className="btn btn-primary">Update</button>
                    </div>
                    <br />
                    <br />
                    <h3>{updateProfileModalError}</h3>
                </Modal>
            </div>
        </div>
    )
}