import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { auth } from 'Config/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import '../../Scss/_mediaqueries.scss'

export default function Verify() {

    let email = ""
    const [isProccessing, setIsProccessing] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) {
            message.warning("Enter Email First")
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                message.success("Link Sent")
                // ..
            })
            .catch((error) => {
                console.log(error)
                // ..
            });
    }

    const myStyle =
    {
        "height": "62px",
        "margin": "11% 0%",
    }
    return (
        <>
            <>
                <main className="form">
                    <div className="container form-container">
                        <div className="row">
                            <div className="col-md-6 d-bloc mx-auto">
                                <div className="card" style={{ "minHeight": "50vh", "padding": "7px 23px", "marginTop": "23%" }}>
                                    <Link to={"/"} style={{ "color": "black", "textAlign": "left", "marginTop": "13px", "fontSize": "x-large" }}>
                                        <i className="fa-solid fa-arrow-left" ></i>
                                    </Link>
                                    <form >
                                        <h1>
                                            Email Verification
                                        </h1>
                                        <br />
                                        <div >
                                            <input style={myStyle} type="email" placeholder="Email" className="form-control" id="Email1" onChange={(e) => { email = e.target.value }} />
                                        </div>
                                            <button type="submit" className="mb-3 btn btn-primary" onClick={handleSubmit}>
                                                {
                                                    isProccessing
                                                        ?
                                                        <>
                                                            <div className="spinner-border spinner-border-sm"></div>
                                                        </>
                                                        :
                                                        "Submit"
                                                }
                                            </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        </>
    )
}
