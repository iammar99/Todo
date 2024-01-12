import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { useAuthContext } from '../../Contexts/AuthContext'
import { auth } from 'Config/firebase'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import '../../Scss/_mediaqueries.scss'


export default function Login() {
  let email, password = ""
  const [isProccessing, setIsProccessing] = useState(false)
  const { dispatch, user } = useAuthContext()
  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) {
      message.error("Please Fill All The Fields")
    }
    else {
      setIsProccessing(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          message.success("Logged In")
          dispatch({ type: "Set_Logged_In", payload: { user } })
          localStorage.setItem("Token", "true")
          localStorage.setItem("User", JSON.stringify(user))
          setIsProccessing(false)
          // ...
        })
        .catch((error) => {
          setIsProccessing(false)
          message.error("Username or Password Invalid")
          console.log('error', error)
        });
    }


  }


  const myStyle =
  {
    "height": "62px",
    "margin": "11% 0%",
  }


  return (
    <>
      <main className="form">
        <div className="container form-container">
          <div className="row">
            <div className="col-md-6">
              <div className="card" style={{ "minHeight": "70vh", "padding": "7px 23px", "marginTop": "23%" }}>
                <Link to={"/"} style={{ "color": "black", "textAlign": "left", "marginTop": "13px", "fontSize": "x-large" }}>
                  <i className="fa-solid fa-arrow-left" ></i>
                </Link>
                <form >
                  <h1>
                    Login
                  </h1>
                  <br />
                  <div >
                    <input style={myStyle} type="email" placeholder="Email" className="form-control" id="Email1" onChange={(e) => { email = e.target.value }} />
                  </div>
                  <div className="mb-3 d-flex">
                    <input style={myStyle} type="password" placeholder="Password" className="form-control" id="password" onChange={(e) => { password = e.target.value }} />
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
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
                    <Link to={"/verfiy"}>
                      Forgot Password
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card" style={{ "height": "54vh" }}>
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
