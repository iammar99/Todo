import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { AuthContext } from '../../Contexts/AuthContext'
import '../../Scss/_mediaqueries.scss'


export default function Register() {

  const { dispatch } = useContext(AuthContext)

  let email, username, password, cpassword = ""

  let users = []

  const handleSubmit = (e) => {

    e.preventDefault()
    
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
        users.push(user)
        localStorage.setItem("users", JSON.stringify(users));
        message.success("Registered")
        console.log(users)
        dispatch({ type: "Set_Logged_In", payload: { user } })
      }

    }

  }



  // For Password Suggestion



  const handleBlur = () => {
    document.getElementById("suggest").innerHTML = ""
    document.getElementById("suggest-box").style = "display:none;"
  }
  let firstString;
  const handleFocus = () => {
    let length = 8;
    firstString = ""
    let secondString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let thirdString = "abcdefghijklmnopqrstuvwxyz"
    let fourthString = "0123456789"
    let finalString = firstString + secondString + thirdString + fourthString
    for (let i = 0; i < length; i++) {
      let randomNumber = Math.random()
      firstString += finalString.charAt(Math.floor(randomNumber * finalString.length))
    }
    let password = document.getElementById("password").value
    let cpassword = document.getElementById("cpassword").value
    if(!password && !cpassword){
      document.getElementById("suggest-box").style = "display:block;"
      document.getElementById("suggest").innerHTML = firstString
      document.getElementById("password").value = firstString
      document.getElementById("cpassword").value = firstString
      password = firstString
      cpassword = firstString
    }
    console.log(firstString)
  }

  // Show Password
  const showPassword = () => {
    var x = document.getElementById('password');
    if (x.type == 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    };
  }


  // Show  confirm Password
  const showcPassword = () => {
    var y = document.getElementById('cpassword');
    if (y.type == 'password') {
      y.type = 'text';
    } else {
      y.type = 'password';
    };
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
                <Link to={"/"} style={{ "color": "#ffffff", "textAlign": "left", "marginTop": "13px", "fontSize": "x-large" }}>
                  <i className="fa-solid fa-arrow-left" ></i>
                </Link>
                <form>
                  <h1>
                    Sign Up
                  </h1>
                  <br />
                  <div className="mb-3">
                    <input type="email" style={myStyle} placeholder='Email' className="form-control" id="Email1" onChange={(e) => email = e.target.value} />
                  </div>
                  <div className="mb-3">
                    <input type="text" style={myStyle} placeholder='UserName' className="form-control" id="username" onChange={(e) => username = e.target.value} />
                  </div>
                  <div className="mb-3 d-flex">
                    <input type="password" style={myStyle} placeholder='Password' className="form-control" id="password" onFocus={handleFocus} onBlur={handleBlur} onChange={(e) => password = e.target.value} />
                    &nbsp;&nbsp;
                    <input type="checkbox" name="password-btn" id="password-btn" onClick={showPassword} />
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
                    <input type="password" style={myStyle} placeholder='Confirm Password' className="form-control"  id="cpassword" onChange={(e) => cpassword = e.target.value}  />
                    &nbsp;&nbsp;
                    <input type="checkbox" name="password-btn" id="password-btn" onClick={showcPassword} />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
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
