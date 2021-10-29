/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import "../User/UserStyles.css"
//Modal
import Modal from "react-modal"
import { useHistory } from "react-router-dom"
import axios from "axios"
import SecureLS from "secure-ls"

export default function Profile() {
    const securestorage = new SecureLS();
    const history = useHistory()
    const [pageRefresh, setpageRefresh] = useState(0)

    //user information
    const [serverFname, setserverFname] = useState("")
    const [serverLname, setserverLname] = useState("")
    const [serverPhone, setserverPhone] = useState("")
    const [serverEmail, setserverEmail] = useState("")
    const [serverPassword, setserverPassword] = useState("")

    //card information
    const [userCards, setuserCards] = useState([])
    //catch userdata from the server
    useEffect(() => {
        const user = {
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


    //catch user cards
    useEffect(() => {
        const user = {
            "email": securestorage.get("user"),
        }
        axios.post("http://localhost:8080/cards", user)
            .then(res => {
                const cardData = res.data
                console.log(cardData)
                setuserCards([...cardData])
            })

    }, [pageRefresh])

    function handleCardTablesetActive(cardId) {
        const cardToUpdate = {
            _id: cardId._id,
            cardstatus: "Active",
            card_holder: cardId.card_holder,
            cardnumber: cardId.cardnumber,
            cardexpiryMonth: cardId.cardexpiryMonth,
            cardexpiryYear: cardId.cardexpiryYear,
            cardsec: cardId.cardsec,
            email: cardId.email
        }
        axios.post('http://localhost:8080/card/update', cardToUpdate)
            .then(res => {
                console.log(res)
                // history.push('/dashboardUser')
                // window.location.reload(false);
                setpageRefresh(pageRefresh + 1)

            })
    }
    function handleCardTablesetDelete(cardId) {
        console.log(cardId._id)
        const cardToDelete = {
            _id: cardId._id
        }
        axios.post('http://localhost:8080/card/delete', cardToDelete)
            .then(res => {
                // console.log(res)
                // history.push('/dashboardUser')
                // window.location.reload(false);
                setpageRefresh(pageRefresh + 1)

            })
    }
    function displayCards() {
        /*----------------------------------*/

        /*----------------------------------*/
        if (userCards.length === 0) {
            return (
                <h1>No cards to show</h1>
            )
        } else {
            return (
                <table>
                    <tbody>
                        <tr>
                            <th>Card Holder</th>
                            <th>Expiry Month</th>
                            <th>Expiry Year</th>
                            <th>Card Number</th>
                            <th>Security Code</th>
                            <th>Card Status</th>
                            <th>Set Active</th>
                            <th>Delete</th>
                        </tr>
                        {
                            userCards.map(
                                item =>
                                    <tr key={item._id}>
                                        <td>{item.card_holder}</td>
                                        <td>{item.cardexpiryMonth}</td>
                                        <td>{item.cardexpiryYear}</td>
                                        <td>{item.cardnumber}</td>
                                        <td>{item.cardsec}</td>
                                        <td>{item.cardstatus}</td>
                                        <td><button className="btn btn-primary" onClick={() => handleCardTablesetActive(item)}>Set Active</button></td>
                                        <td><button className="btn btn-primary" onClick={() => handleCardTablesetDelete(item)}>delete</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            )
        }
    }


    //use states:
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")

    //card use state
    const [cardHolderName, setCardHolderName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cardExpMonth, setCardExpMonth] = useState("")
    const [cardExpYear, setCardExpYear] = useState("")
    const [cardSecCode, setcardSecCode] = useState("")


    //update profile MOdal
    const [profilemodal, setProfilemodal] = useState(false)
    const [addcardmodal, setAddcardmodal] = useState(false)

    //modal Errors
    const [updateProfileModalError, setupdateProfileModalError] = useState("")
    const [cardModalError, setcardModalError] = useState("")


    //Modal functionality
    //Profile Modal
    const closeAndUpdateProfile = (e) => {
        //do update changes  !!! 
        e.preventDefault()
        const userToUpdate = {
            "first_name": fname,
            "last_name": lname,
            "phone": phone,
            "email": email,
            "password": password,
            "authlevel": "user"
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
                            setProfilemodal(false)
                            localStorage.clear();
                            history.push('/')
                        }

                    })

            } else {
                setupdateProfileModalError("Password does not match")
            }
        }
    }

    function openToUpdateProfile() {
        //catch user information and put them in the place holder !!!
        //make re-password place holder empty
        setProfilemodal(true)
    }


    //card modal

    const closeAddCard = (e) => {
        //do update changes
        e.preventDefault();
        const card = {
            cardstatus: "InActive",
            card_holder: cardHolderName,
            cardnumber: cardNumber,
            cardexpiryMonth: cardExpMonth,
            cardexpiryYear: cardExpYear,
            cardsec: cardSecCode,
            email: serverEmail
            // holder_email: localStorage.getItem("user")
            // email: "mikeadams@fadvishor.ca"
        }
        if (cardHolderName === "" || cardNumber === "" || cardExpMonth === "" || cardExpYear === "" || cardSecCode === "") {
            setcardModalError("Please Fill all Fields")
        } else {
            axios.post('http://localhost:8080/card', card)
                .then(res => {
                    console.log(res)
                    let errors = res.data.errors
                    let errorReport = []
                    console.log(`errors are here ${errors}`)
                    for (const property in errors) {
                        console.log(`${property}: ${errors[property].message}`);
                        errorReport.push(`${property}: ${errors[property].message}`)
                    }
                    setcardModalError(errorReport)
                    if (errorReport.length === 0) {
                        console.log(cardModalError)
                        setCardHolderName("")
                        setCardNumber("")
                        setCardExpMonth("")
                        setCardExpYear("")
                        setcardSecCode("")
                        setAddcardmodal(false)
                        setpageRefresh(pageRefresh + 1)
                    } else {
                        setcardModalError("something went wrong")
                    }
                }).catch(err =>
                    console.log(err)
                )

        }


    }

    function openAddCard() {
        //catch user card information and put them in place holder and hide security number
        setAddcardmodal(true)
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

            <div className="profile">
                <div className="userprofileDiv" >
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
                    <button className="btn btn-primary" onClick={openToUpdateProfile}>Edit Profile</button>
                    <br />
                    <br />
                </div>
                <br />
                <div className="userprofileDiv">
                    <h1>Cards</h1>
                    <br />
                    <br />
                    {/* <h1>Card Holder: </h1>
                    <h1>Card Number: </h1>
                    <h1>Cards Expiary: </h1>
                    <h1>Security Code: </h1> */}
                    <div>{displayCards()}</div>
                    <br />
                    <br />
                    <button className="btn btn-primary" onClick={openAddCard}>Add Card</button>
                    <br />
                    <br />
                </div>

            </div>


            {/*Modals you can change styles of the modal in */}
            {/*Profile*/}
            <div>
                <Modal
                    isOpen={profilemodal}
                    onRequestClose={() => setProfilemodal(false)}
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
                        <button onClick={closeAndUpdateProfile} className="btn btn-primary">Update</button>
                    </div>
                    <br />
                    <br />
                    <h3>{updateProfileModalError}</h3>
                </Modal>

                {/*Card*/}
                <Modal
                    isOpen={addcardmodal}
                    onRequestClose={() => setAddcardmodal(false)}
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
                    <h1>Update Card</h1>
                    <input type="text" className="form-control" placeholder="Holder Name" onChange={(e) => setCardHolderName(e.target.value)} value={cardHolderName} /><br />
                    <input type="text" className="form-control" placeholder="Card Number" onChange={(e) => setCardNumber(e.target.value)} value={cardNumber} /><br />
                    <input type="text" min="1" max="12" className="form-control" placeholder="Expiary Month" onChange={(e) => setCardExpMonth(e.target.value)} value={cardExpMonth} /><br />
                    <input type="text" className="form-control" placeholder="Expiary Year" onChange={(e) => setCardExpYear(e.target.value)} value={cardExpYear} /><br />
                    <input type="password" className="form-control" placeholder="Secret Code" onChange={(e) => setcardSecCode(e.target.value)} value={cardSecCode} /><br />
                    <button onClick={closeAddCard} className="btn btn-primary">Add Card</button>
                    <br />
                    <br />
                    <h3>{cardModalError}</h3>
                </Modal>
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}
