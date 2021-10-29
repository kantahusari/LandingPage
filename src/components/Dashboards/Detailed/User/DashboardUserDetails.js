import React, { useState, useEffect } from 'react'
import axios from "axios"
import moment from 'moment'
import dashBoardstyle from "../User/dashBoardstyle.css"
import Spinner from 'react-bootstrap/Spinner'
import SecureLS from "secure-ls"
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
    Legend,
    Bar,
    Line,
    PieChart,
    Pie,
    Cell

} from 'recharts';
// export default function DashboardUserDetails() {
class DashboardUserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverEmail: "",
            balanceSheetData: [],
            isLoading: true,
            isData: false,
        };
    }
    componentWillMount() {
        this.renderMyData();
    }
    renderMyData() {
        const securestorage = new SecureLS();
        // securestorage.get
        const user = {
            "email": securestorage.get("user"),
        }
        axios.post("http://localhost:8080/getuserbalances", user)
            .then(res => {
                console.log(res)
                if (res.data.length === 0) {
                    this.setState({
                        isData: false,
                        isLoading: false,
                    });
                } else {
                    this.setState({
                        serverEmail: res.data.email,
                        balanceSheetData: [...res.data],
                        isLoading: false,
                        isData: true
                    });
                }
                // console.log(this.state.balanceSheetData[0].year)
                return this.state.balanceSheetData
            })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        } else {
            if (this.state.isData) {
                const balanceSheetData = this.state.balanceSheetData
                const length = balanceSheetData.length - 1
                const balanceSheetDataGraphdate = []
                balanceSheetData.map(data =>
                    balanceSheetDataGraphdate.push({
                        year: data.year,
                        Accounts_Payable: data.Accounts_Payable,
                        Cash: data.Cash,
                        Accounts_Receivable: data.Accounts_Receivable,
                        Unearned_revenue: data.Unearned_revenue,
                        Retained_Earnings: data.Retained_Earnings
                    })
                )
                console.log(balanceSheetData)
                console.log(balanceSheetDataGraphdate)
                return (
                    <>
                        <div className="dashboardBody">
                            <br />
                            <Container className="dashcontainer">
                                <h1>{`${balanceSheetData[length].year} Major Indicators`}</h1>
                                <Row className="dashrow">
                                    <Col className="dashcolumn">
                                        <h1>Cash</h1>
                                        <h1>{`${balanceSheetData[length].Cash}.00`}</h1>
                                        <h1>{`CAD`}</h1>
                                    </Col>
                                    <Col className="dashcolumn">
                                        <h1>Accounts Payable</h1>
                                        <h1>{`${balanceSheetData[length].Accounts_Payable}.00`}</h1>
                                        <h1>{`CAD`}</h1>
                                    </Col>
                                    <Col className="dashcolumn">
                                        <h1>Accounts Receivable</h1>
                                        <h1>{`${balanceSheetData[length].Accounts_Receivable}.00`}</h1>
                                        <h1>{`CAD`}</h1>
                                    </Col>
                                    <Col className="dashcolumn">
                                        <h1>Accrued Expenses</h1>
                                        <h1>{`${balanceSheetData[length].Accrued_expenses}.00`}</h1>
                                        <h1>{`CAD`}</h1>
                                    </Col>
                                    <Col className="dashcolumn">
                                        <h1>Inventory</h1>
                                        <h1>{`${balanceSheetData[length].Inventory}.00`}</h1>
                                        <h1>{`CAD`}</h1>
                                    </Col>
                                </Row>
                                <h1>{`5 Years Historical Data`}</h1>
                                <Row className="dashrowTable">
                                    <Col className="dashcolumnTable">
                                        <table >
                                            <tbody>
                                                <tr >
                                                    <th>#</th>
                                                    {
                                                        balanceSheetData.slice(balanceSheetData.length - 5, balanceSheetData.length).map(data =>
                                                            <th key={data._id}>{`${data.year}`}</th>
                                                        )
                                                    }
                                                </tr>
                                                <tr>
                                                    <th>Cash</th>
                                                    {
                                                        balanceSheetData.slice(balanceSheetData.length - 5, balanceSheetData.length).map(data =>
                                                            <td key={data._id}>{`${data.Cash}.00`}</td>
                                                        )
                                                    }
                                                </tr>
                                                <tr>
                                                    <th>Accounts Payable</th>
                                                    {
                                                        balanceSheetData.slice(balanceSheetData.length - 5, balanceSheetData.length).map(data =>
                                                            <td key={data._id}>{`${data.Accounts_Payable}.00`}</td>
                                                        )
                                                    }
                                                </tr>
                                                <tr>
                                                    <th>Accounts Receivable</th>
                                                    {
                                                        balanceSheetData.slice(balanceSheetData.length - 5, balanceSheetData.length).map(data =>
                                                            <td key={data._id}>{`${data.Accounts_Receivable}.00`}</td>
                                                        )
                                                    }
                                                </tr>
                                                <tr>
                                                    <th>Accrued Expenses</th>
                                                    {
                                                        balanceSheetData.slice(balanceSheetData.length - 5, balanceSheetData.length).map(data =>
                                                            <td key={data._id}>{`${data.Accrued_expenses}.00`}</td>
                                                        )
                                                    }
                                                </tr>
                                                <tr>
                                                    <th>Inventory</th>
                                                    {
                                                        balanceSheetData.slice(balanceSheetData.length - 5, balanceSheetData.length).map(data =>
                                                            <td key={data._id}>{`${data.Inventory}.00`}</td>
                                                        )
                                                    }
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>
                                <Row className="dashrowTable">
                                    <Col className="dashcolumnTable">
                                        <h4>{`Accounts_Payable Vs Accounts_Receivable Vs Unearned_Revenue`}</h4>
                                        <ResponsiveContainer width={`100%`} height={300}>
                                            <AreaChart
                                                data={balanceSheetDataGraphdate}
                                                margin={{
                                                    top: 10,
                                                    right: 30,
                                                    left: 6,
                                                    bottom: 0,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="year" />
                                                <Tooltip />
                                                {/* <Area type="monotone" dataKey="Cash" stroke="#8884d8" fill="#4289fc" /> */}
                                                <Area type="monotone" dataKey="Accounts_Payable" stroke="#247bb5" fill="#42f0fc" />
                                                <Area type="monotone" dataKey="Accounts_Receivable" stroke="#247bb5" fill="#42fc8f" />
                                                {/* <Area type="monotone" dataKey="Retained_Earnings" stroke="#247bb5" fill="#d5cce8" /> */}
                                                <Area type="monotone" dataKey="Unearned_revenue" stroke="#247bb5" fill="#7a42fc" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </Col>
                                </Row>
                                <Row className="dashrowTable">
                                    <Col className="dashcolumnTable">
                                        <h4>{`Accounts_Payable Vs Accounts_Receivable`}</h4>
                                        <ComposedChart width={1000} height={350} data={balanceSheetDataGraphdate}>
                                            <XAxis dataKey="year" />
                                            <Tooltip />
                                            <Legend />
                                            <CartesianGrid stroke="#f5f5f5" />
                                            <Bar dataKey="Accounts_Payable" barSize={50} fill="#413ea0" />
                                            <Line type="monotone" dataKey="Accounts_Receivable" stroke="#a6508a" strokeWidth={3} />
                                        </ComposedChart>
                                    </Col>
                                </Row>

                            </Container>

                        </div>
                    </>
                )
            } else {
                return (
                    <h1 style={{ marginLeft: "45%", fontSize: "25px" }}> There is no data yet ...</h1>
                )
            }
        }
    }
}

export default DashboardUserDetails
