import React, { useState, useEffect } from 'react'
import "./ManagerStyles.css"
import axios from "axios"
import moment from 'moment'
import SecureLS from "secure-ls"


export default function DashboardManagerDetails() {
    const securestorage = new SecureLS();
    const [usersRequests, setusersRequests] = useState([])
    const [pendingRequest, setpendingRequest] = useState([])
    const [consultantList, setconsultantList] = useState([])
    const [toUserRequests, settoUserRequests] = useState([])
    const [pageRefresh, setpageRefresh] = useState(0)
    const [seconds, setSeconds] = useState(0);
    const [ForwardTo, setForwardTo] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
            //-----------------------------------------
            axios.post("http://localhost:8080/consultants", "")
                .then(res => {
                    const consult = res.data
                    setconsultantList([...consult])
                    // console.log(consultantList)
                })
            //get requests
            axios.post("http://localhost:8080/managerrequests", "")
                .then(res => {
                    const resUsersRequests = res.data
                    setusersRequests([...resUsersRequests])
                    // console.log(usersRequests)
                })

            axios.post("http://localhost:8080/findAllconsultantrequests", "")
                .then(res => {
                    const resconsultantsRequests = res.data
                    setpendingRequest([...resconsultantsRequests])
                    // console.log(resconsultantsRequests)
                })

            // axios.post('http://localhost:8080/findconsultcompletedrequests', "")
            axios.post('http://localhost:8080/findrequestsdone', "")
                .then(res => {
                    const data = res.data
                    settoUserRequests([...data])
                    // console.log(toUserRequests)
                })

            //-----------------------------------------
            setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageRefresh])

    function displayUserRequests() {
        if (usersRequests.length === 0) {
            return (
                <h1>NO requests to show</h1>
            )
        } else {
            return (
                //-----------------------------------------
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>User</th>
                            <th>Topic</th>
                            <th>Urgency</th>
                            <th>Forward To</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        {
                            usersRequests.map(
                                item =>
                                    <tr key={item._id}>
                                        <td>{item.user_name}</td>
                                        <td>{item.topic}</td>
                                        <td>{item.urgency}</td>
                                        <td>
                                            <select
                                                className='DropList'
                                                onChange={
                                                    (e) => {
                                                        setForwardTo({ row: item._id, option: e.target.value })
                                                        return (ForwardTo)
                                                    }
                                                }
                                            >
                                                <option value="">Select Consultatnt</option>
                                                {
                                                    consultantList.map(
                                                        consult => <option key={consult._id} value={consult._id}>{`${consult.first_name} ${consult.last_name}`}</option>
                                                    )
                                                }
                                            </select>
                                        </td>
                                        <td>{moment(item.created).format("LLL")}</td>
                                        <td><button onClick={() => postfunction(item)} className="btn btn-primary">Post</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table >
                //-----------------------------------------
            )
        }
    }
    function showConsultant(value) {
        if (consultantList.length === 0) {
            return null
        } else {
            const result = consultantList.find(person => person._id === value)
            return (`${result.first_name} ${result.last_name}`)
        }
    }
    function displayPendingrRequests() {
        if (pendingRequest.length === 0) {
            return (
                <h1>NO requests pending</h1>
            )
        } else {
            return (
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>User</th>
                            <th>Topic</th>
                            <th>Urgency</th>
                            <th>Forwarded To</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                        {
                            pendingRequest.map(
                                data =>
                                    <tr key={data._id}>
                                        <td>{data.user}</td>
                                        <td>{data.topic}</td>
                                        <td>{data.urgency}</td>
                                        {
                                            <td>{showConsultant(data.consultant)}</td>
                                        }
                                        <td>{moment(data.date).format("LLL")}</td>
                                        <td>pending</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table >
            )
        }
    }
    function postfunction(item) {
        const row = {
            consultant: ForwardTo.option,
            user: item.user_name,
            topic: item.topic,
            urgency: item.urgency,
            description: item.description,
            user_email: item.email,
            originalrow: ForwardTo.row,
        }
        if (row.originalrow === "" || row.consultant === "" || row.consultant === undefined || row.originalrow === undefined) {
            window.alert("Please select a consultant")
            setForwardTo("")
        } else {
            //send request to consultant
            axios.post('http://localhost:8080/toconsultantrequest', row)
                .then(res => {
                    // console.log(res)
                })
            //delete from to manager requests
            axios.post('http://localhost:8080/deletetomanagerrequest', row)
                .then(res => {
                    // console.log(res)
                })
            setForwardTo("")
        }
    }
    function viewCompletedRequests() {
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
                            <th>Topic</th>
                            <th>Completed By</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                        {
                            toUserRequests.map(data =>
                                <tr key={data._id}>
                                    <td>{data.user}</td>
                                    <td>{data.topic}</td>
                                    <td>{showConsultant(data.consultant)}</td>
                                    <td>{moment(data.created).format("LLL")}</td>
                                    <td>Complete</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            )
        }
    }
    return (
        <div className="mprofile">
            {/*Received Here*/}
            <div className="userprofileDiv">
                <br />
                <br />
                <h1>Requests Received</h1>
                {displayUserRequests()}
                <br />
                <br />
            </div>
            <br />
            {/*Pending  Here*/}
            <div className="userprofileDiv">
                <br />
                <br />
                <h1>Requests Pending</h1>
                {displayPendingrRequests()}
                <br />
                <br />
            </div>
            <br />
            {/*Responds  Here*/}
            <div className="userprofileDiv">
                <br />
                <br />
                <h1>Responds</h1>
                {viewCompletedRequests()}
                <br />
                <br />
            </div>
            <br />
            <br />
        </div>
    )
}
