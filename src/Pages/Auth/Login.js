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
  const [isChecked, setIsChecked] = useState(false)
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


  const handleCheckbox = (e) => {
    setIsChecked(!isChecked)

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
                    <input
                      type={isChecked ? `text` : `password`}
                      style={myStyle}
                      placeholder='Password'
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={(e) => { password = e.target.value }}
                      />
                    &nbsp;&nbsp;
                    <label className="checkbox-container">
                      <input type="checkbox" defaultChecked="checked" onChange={handleCheckbox} />
                      <svg
                        className="eye"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                      >
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                      </svg>
                      <svg
                        className="eye-slash"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 640 512"
                      >
                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                      </svg>
                    </label>
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
