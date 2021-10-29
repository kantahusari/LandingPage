import React, { useState } from 'react'
import axios from "axios"
import Balance_Sheet from '../../../ServiceData/Balance_Sheet.xlsx';
import Budget_Sheet from '../../../ServiceData/Balance_Sheet.xlsx';
import fileDownload from 'js-file-download'
import xlsx from 'xlsx'
import SecureLS from "secure-ls"
export default function Update() {
    const securestorage = new SecureLS();
    const [filetoDownload, setfiletoDownload] = useState("")
    const [fileuploadoption, setfileuploadoption] = useState("")
    const [filetoupload, setfiletoupload] = useState("")
    const [error, seterror] = useState("")
    function downloadfile(e) {
        e.preventDefault();
        if (filetoDownload === "") {
            seterror('No file was selected')
        } else {
            seterror('')
            if (filetoDownload === "Balance_Sheet") {
                axios.get(Balance_Sheet, {
                    responseType: 'blob',
                })
                    .then((res) => {
                        fileDownload(res.data, 'Balance_Sheet.xlsx')
                    })
            }
            if (filetoDownload === "Budget_Sheet") {
                axios.get(Budget_Sheet, {
                    responseType: 'blob',
                })
                    .then((res) => {
                        fileDownload(res.data, 'Budget_Sheet.xlsx')
                    })
            }

        }
        // console.log("submit")
    }
    function uploadfile(e) {
        e.preventDefault();
        // 
        if (fileuploadoption === "") {
            seterror("Please select a file")
        } else {
            if (filetoupload === "" || filetoupload === null || filetoupload === undefined) {
                seterror("No file was selected")
            } else {
                if (fileuploadoption === filetoupload.target.files[0].name) {
                    // console.log(filetoupload.target.files[0])
                    console.log('upload correct')

                    //do file operations here
                    //--------------------------------------------------
                    const data = new FormData()
                    data.append('file', filetoupload.target.files[0])
                    axios.post('http://localhost:8080/userfileupload', data)
                        .then(res => {
                            // console.log(res.data)
                            setfileuploadoption("")
                            setfiletoupload("")
                            console.log(res.data)
                        })
                    //--------------------------------------------------
                    seterror("")
                } else {
                    seterror(`Please Upload ${fileuploadoption}`)
                }
            }
        }

    }
    return (
        <div className="profile">
            <div className="userprofileDiv">
                <br />
                <br />
                {/*----------------------------------------*/}
                <h1>1- Step One: Select a template to download</h1>
                <div className="col-sm-6 offset-sm-3">
                    {/*to be  changed later*/}
                    <form onSubmit={downloadfile}>
                        <select
                            onChange={e =>
                                setfiletoDownload(e.target.value)
                            }

                        >
                            <option value="">Select an Option</option>
                            <option value="Balance_Sheet">Balance Sheet</option>
                            <option value="Budget_Sheet">Budget Sheet</option>
                        </select>
                        <input type="submit" value="Download" className="btn btn-primary" />
                    </form>
                </div>
                {/*----------------------------------------*/}
                <br />
                <br />
            </div>
            <br />
            <div className="userprofileDiv">
                <br />
                <br />
                <h1>2- Step Two: Fill up the template and upload</h1>
                <div className="col-sm-6 offset-sm-3">
                    <form onSubmit={uploadfile}>
                        <select
                            onChange={e =>
                                setfileuploadoption(e.target.value)
                            }
                        >
                            <option value="">Select an Option</option>
                            <option value="Balance_Sheet.xlsx">Balance Sheet</option>
                            <option value="Budget_Sheet.xlsx">Budget Sheet</option>
                        </select>
                        <input type="file" id="myFile" name="filename" onChange={e => setfiletoupload(e)} />
                        <input type="submit" className="btn btn-primary" />
                    </form>
                </div>
                <br />
                <br />
            </div>
            <br />
            <div>
                {error}
            </div>
            <br />
            <br />
        </div>
    )
}
