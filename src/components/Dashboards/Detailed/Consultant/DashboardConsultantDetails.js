import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import "./ConsultantStyles.css"
import SecureLS from "secure-ls"
export default function DashboardConsultantDetails() {
    const securestorage = new SecureLS();
    const [consultant, setconsultant] = useState("")
    const [consultantId, setconsultantId] = useState("")
    const [consultantRequests, setconsultantRequests] = useState([])
    const [toUserRequests, settoUserRequests] = useState([])
    const [filetoupload, setfiletoupload] = useState("")
    const [seconds, setSeconds] = useState(0);
    const [pageRefresh, setpageRefresh] = useState(0)
    const [error, seterror] = useState("")

    useEffect(() => {
        const user = {
            "email": securestorage.get("user")
        }
        const interval = setInterval(() => {
            axios.post('http://localhost:8080/findconsult', user)
                .then(res => {
                    setconsultant(res)
                    setconsultantId({ consultantID: res.data[0]._id })
                    // console.log(consultantId)
                })
            axios.post('http://localhost:8080/findconsultantrequests', consultantId)
                .then(res => {
                    const data = res.data
                    setconsultantRequests([...data])
                    // console.log(consultantRequests)
                }).finally(
                    axios.post('http://localhost:8080/findconsultcompletedrequests', consultantId)
                        .then(res => {
                            const data = res.data
                            settoUserRequests([...data])
                            // console.log(toUserRequests)
                        })
                )
            setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageRefresh, consultantId])

    function displayconsultantrequests() {
        if (consultantRequests.length === 0) {
            return (
                <h1>No Requests To Work ON</h1>
            )
        } else {
            return (
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>User</th>
                            <th>Topic</th>
                            <th>Urgency</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Upload Report</th>
                            <th>Action</th>
                        </tr>
                        {
                            consultantRequests.map(data =>
                                <tr key={data._id}>
                                    <td>{data.user}</td>
                                    <td>{data.topic}</td>
                                    <td>{data.urgency}</td>
                                    <td>{data.description}</td>
                                    <td>{moment(data.date).format("LLL")}</td>
                                    <td>
                                        <input type="file" id="myFile" name="filename" onChange={e => setfiletoupload(e)} />
                                    </td>

                                    <td>
                                        <button onClick={e => postfile(e, data)} className="btn btn-primary">Post</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            )
        }
    }
    function postfile(e, postdata) {
        e.preventDefault();
        if (filetoupload === "" || filetoupload === null || filetoupload === undefined) {
            seterror("No file is uploaded")
            window.alert("no file is uploaded")
        } else {
            // console.log("file selected")
            const requesttosend =
            {
                originalfilename: filetoupload.target.files[0].name,
                consultant: postdata.consultant,
                date: postdata.date,
                description: postdata.description,
                originalrow: postdata.originalrow,
                topic: postdata.topic,
                urgency: postdata.urgency,
                user: postdata.user,
                user_email: postdata.user_email,
                _id: postdata._id
            }
            const requesttodelete = {
                consultant: postdata.consultant,
                user: postdata.user,
                topic: postdata.topic,
                urgency: postdata.urgency,
                description: postdata.description,
                user_email: postdata.user_email
            }

            // console.log(filetoupload.target.files[0].name)

            //upload data to server
            const data = new FormData()
            data.append('file', filetoupload.target.files[0])
            axios.post('http://localhost:8080/consultfileupload', data)
                .then(res => {
                    console.log(res.data)
                })
            axios.post('http://localhost:8080/donothing', "")
                .then(res => {
                    console.log(res)
                })
                .finally(
                    //rename file and post data to server
                    axios.post('http://localhost:8080/consulttouserreports', requesttosend)
                        .then(res => {
                            console.log(res.data)
                        })
                )
            //delete current request sent from consultant requests
            //deletetoConsult
            axios.post('http://localhost:8080/deletetoconsultrequest', requesttodelete)
                .then(res => {
                    console.log(res)
                })
            setfiletoupload("")
        }
    }
    function displayCompleted() {
        if (toUserRequests.length === 0) {
            return (
                <h1>No Requests Completed</h1>
            )
        } else {
            return (
                <table>
                    <tbody>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Topic</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                        {
                            toUserRequests.map(request =>
                                <tr key={request._id}>
                                    <td>{request.user}</td>
                                    <td>{request.email}</td>
                                    <td>{request.topic}</td>
                                    <td>{moment(request.created).format("LLL")}</td>
                                    <td>Completed</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            )
        }
    }

    return (
        <div className="cprofile">
            {/*Received Here*/}
            <div className="userprofileDiv">
                <br />
                <br />
                <h1>Requests Received</h1>
                {displayconsultantrequests()}
                <br />
                <br />
            </div>
            <br></br>

            {/*Responds  Here*/}
            <div className="userprofileDiv">
                <br />
                <br />
                <h1>Completed</h1>
                {displayCompleted()}
                <br />
                <br />
            </div>
            <br />
            <br />
        </div>
    )
}