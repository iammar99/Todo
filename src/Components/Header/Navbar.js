import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Assets/logo.png'
import { useAuthContext } from '../../Contexts/AuthContext'
import { message } from 'antd'
import { auth } from 'Config/firebase'
import { signOut } from 'firebase/auth'

export default function Navbar() {


  const { dispatch } = useAuthContext()
  const handleLogout = (e) => {
    e.preventDefault()
    signOut(auth)
      .then(() => {
        message.success("Loggoed Out")
      })
      .catch((error) => {
        console.log('error', error)
        // ..
      });
    dispatch({ type: "Set_Logged_Out" })
    localStorage.setItem("Token", "false")
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand " style={{ "width": "3%" }} to={"/frontend/"}><img src={logo} className='image-fluid' /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/frontend/"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/dashboard"}>Add Todo</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/frontend/about"}>About Us</Link>
              </li>
              &nbsp;&nbsp;&nbsp;
            </ul>
            <form className="d-flex" >
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
}
