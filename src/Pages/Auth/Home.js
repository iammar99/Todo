import React from 'react'
import '../../Scss/_mediaqueries.scss'
import { Link } from 'react-router-dom'
import '../../Scss/_mediaqueries.scss'

export default function Home() {
    return (
        <>
            <main className="form">
                <div className="container form-container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="box">
                                    <h1>
                                        Login
                                    </h1>
                                    <Link to={"/login"}>
                                        <button className="btn btn-info text-white" style={{ "width": "60%", "margin": "20px" }}>
                                            Login
                                        </button>
                                    </Link> 
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="box">
                                    <h1>
                                        Sign Up
                                    </h1>
                                    <Link to={"/register"}>
                                        <button className="btn btn-danger text-white" style={{ "width": "60%", "margin": "20px" }}>
                                            Register
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
