import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { AuthContext } from '../../Contexts/AuthContext'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { auth, fireStore } from "../../Config/firebase"
import '../../Scss/_mediaqueries.scss'

export default function Register() {

  const { dispatch } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({ email: "", username: "", password: "", cpassword: "" })
  const [state, setState] = useState(currentUser)
  const handleChange = e => setCurrentUser(s => ({ ...s, [e.target.name]: e.target.value }))
  const [isProccessing, setIsProccessing] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isCPasswordCheckbox, setIsCPasswordCheckbox] = useState(false)



  const handleSubmit = async (e) => {

    e.preventDefault()
    let { email, username, password, cpassword } = currentUser
    // console.log('currentUser', currentUser)
    if (!email || !username || !password || !cpassword) {
      message.error("Please fill all the fields")
    }
    else {
      if (password !== cpassword) {
        message.error('Passwords do not match')
      }
      else {
        let user = {
          email,
          username,
          password,
          cpassword
        }
        setIsProccessing(true)
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // console.log('userCredential', userCredential)
            // console.log(user)
            message.success("Registered")
            // console.log(users)
            dispatch({ type: "Set_Logged_In", payload: { user } })
            localStorage.setItem("User", JSON.stringify(user))
            localStorage.setItem("Token", "true")
            setIsProccessing(false)
            try {
              setDoc(doc(fireStore, "users", user.uid), { email, username, id: user.uid });
              // console.log("Document written with ID: ", user.uid);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
            // ...
          })
          .catch((error) => {
            setIsProccessing(false)
            message.error("Some Error occuring !! Try Another Email")
            
            console.log('error', error)
            // ..
          });
      }

    }

  }



  // For Password Suggestion



  const handleBlur = () => {
    document.getElementById("suggest").innerHTML = ""
    document.getElementById("suggest-box").style = "display:none;"
  }

  const handleCheckbox = (e) => {
    setIsChecked(!isChecked)

  }
  const handleCPasswordCheckbox = () => {
    setIsCPasswordCheckbox(!isCPasswordCheckbox)
  }

  const myStyle =
  {
    "height": "62px",
    "margin": "1% 0%",
  }
  return (
    <>
      <main className="form">
        <div className="container form-container">
          <div className="row">
            <div className="col-md-6">
              <div className="card" style={{ "height": "37vh" }}>
                <div className="box">
                  <h1>
                    Login
                  </h1>
                  <Link to={"/login"} >
                    <button className="btn btn-info text-white" style={{ "width": "60%", "margin": "20px" }}>
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card" style={{ "minHeight": "78vh", "padding": "7px 23px", "marginTop": "19%" }}>
                <Link to={"/"} style={{ "color": "black", "textAlign": "left", "marginTop": "13px", "fontSize": "x-large" }}>
                  <i className="fa-solid fa-arrow-left" ></i>
                </Link>
                <form>
                  <h1>
                    Sign Up
                  </h1>
                  <br />
                  <div className="mb-3">
                    <input type="email" style={myStyle} placeholder='Email' className="form-control" id="Email1" name="email" onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <input type="text" style={myStyle} placeholder='UserName' className="form-control" id="username" name="username" onChange={handleChange} />
                  </div>
                  <div className="mb-3 d-flex">
                    <input
                      type={isChecked ? `text` : `password`}
                      style={myStyle}
                      placeholder='Password'
                      className="form-control"
                      id="password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange} />
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
                    {/* Suggestion box */}
                    <div className="suggestion-box" id="suggest-box">
                      <p className="text-primary fs-6 m-0 text-start">
                        <i className="fa-solid fa-key" style={{ "color": " #0400ff" }}></i>&nbsp;&nbsp;&nbsp;
                        Suggested Password
                      </p>
                      <br />
                      <p className="text-danger fs-6 m-0 text-start" id="suggest" style={{ "cursor": "pointer" }}>
                      </p>
                      <hr className='m-0 text-dark' />
                      <p className="text-dark">
                        You wont need too remember this password
                        Your <span className='text-info'>Google Password Manager</span>  will manage this </p>
                    </div>
                  </div>
                  <div className="mb-3 d-flex">
                    <input type={isCPasswordCheckbox ? `text` : `password`} style={myStyle} placeholder='Confirm Password' className="form-control" id="cpassword " name="cpassword" onChange={handleChange} />
                    <label className="checkbox-container">
                      <input type="checkbox" defaultChecked="checked" onChange={handleCPasswordCheckbox} />
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
                    &nbsp;&nbsp;
                  </div>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
