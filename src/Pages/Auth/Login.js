import React from 'react'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { useAuthContext } from '../../Contexts/AuthContext'
import '../../Scss/_mediaqueries.scss'


export default function Login() { 
  let email, password = ""
  const {dispatch , user} = useAuthContext()
  function handleSubmit(e) {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem("users"))
    if (!users) {
      message.error("No User Found")
    }
    else {
      if (!email || !password) {
        message.error("Please Fill All The Fields")
      }
      else{
        for (let i = 0; i < users.length; i++) {

          if (email === users[i].email) {
            if (password === users[i].password) {
              console.log("Logged in")
              message.success("Logged In")
              dispatch({type:"Set_Logged_In" , payload : {user}})
              break;
            }
  
            else {
              message.error("Invalid Password ")        
              break;
            }
  
          }
          else{
            message.error("Email Not Found ")
          }
        }
      }

    }
    console.log(email, password)
 

  }


  const showPassword = () => {
    var x = document.getElementById('password');
    if (x.type == 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    };
  }

  // Show Password

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
                <Link to={"/"} style={{ "color": "#ffffff", "textAlign": "left", "marginTop": "13px", "fontSize": "x-large" }}>
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
                    &nbsp;&nbsp;
                    <input type="checkbox" name="password-btn" id="password-btn" onClick={showPassword} />
                  </div>

                  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>
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
