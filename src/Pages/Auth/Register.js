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
               setDoc(doc(fireStore, "users", user.uid), { email, username , id:user.uid });
              // console.log("Document written with ID: ", user.uid);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
            // ...
          })
          .catch((error) => {
            setIsProccessing(false)
            message.error("Some Error occuring")
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
  // let firstString;
  // const handleFocus = () => {
  //   let length = 8;
  //   firstString = ""
  //   let secondString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  //   let thirdString = "abcdefghijklmnopqrstuvwxyz"
  //   let fourthString = "0123456789"
  //   let finalString = firstString + secondString + thirdString + fourthString
  //   for (let i = 0; i < length; i++) {
  //     let randomNumber = Math.random()
  //     firstString += finalString.charAt(Math.floor(randomNumber * finalString.length))
  //   }
  //   let password = document.getElementById("password").value
  //   let cpassword = document.getElementById("cpassword").value
  //   if (!password && !cpassword) {
  //     document.getElementById("suggest-box").style = "display:block;"
  //     document.getElementById("suggest").innerHTML = firstString
  //     document.getElementById("password").value = firstString
  //     document.getElementById("cpassword").value = firstString
  //     password = firstString
  //     cpassword = firstString
  //   }
  //   console.log(firstString)
  // }

  // Show Password
  // const showPassword = () => {
  //   var x = document.getElementById('password');
  //   var btn = document.getElementById('password-btn');
  //   if (btn.checked == true) {
  //     x.type = 'text';
  //   }
  //   else {
  //     x.type = 'password';
  //   }
  // }


  // Show  confirm Password
  // const showcPassword = () => {
  //   var y = document.getElementById('cpassword');
  //   var btn = document.getElementById('cpassword-btn');
  //   if (btn.checked == true) {
  //     y.type = 'text';
  //   }
  //   else {
  //     y.type = 'password';
  //   }
  // }

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
                    <input type="password" style={myStyle} placeholder='Password' className="form-control" id="password" name="password" onBlur={handleBlur} onChange={handleChange} />
                    &nbsp;&nbsp;
                    {/* <input type="checkbox" name="password-btn" id="password-btn" onClick={showPassword} /> */}
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
                    <input type="password" style={myStyle} placeholder='Confirm Password' className="form-control" id="cpassword " name="cpassword" onChange={handleChange} />
                    &nbsp;&nbsp;
                    {/* <input type="checkbox" name="password-btn" id="cpassword-btn" onClick={showcPassword} /> */}
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
