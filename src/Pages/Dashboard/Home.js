import { message } from 'antd'
import { fireStore } from 'Config/firebase'
import { doc, setDoc } from "firebase/firestore/lite";
import { AuthContext } from 'Contexts/AuthContext';
import React, { useContext, useState } from 'react'


export default function Home() {

  const {user} = useContext(AuthContext)
  const [isProceessing , setIsProceessing] = useState(false)
  let name, time, description, location,  dateModified = ""
  const handleIn = () => {
    document.getElementById("todo-input-container").style = "display:block;"
    // document.getElementById("main").style = "display:block;"
    document.getElementById("main-container").style = "display:none;"
  }
  const handleOut = () => {
    document.getElementById("todo-input-container").style = "display:none;"
    // document.getElementById("main").style = "display:none;"
    document.getElementById("main-container").style = "display:block;"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !time || !location || !description) {
      message.error("Fill All the Fields")
    }
    else {
    let randomID = Math.random().toString(36).slice(2)
      let todo = {
        name,
        time,
        description,
        location,
        createdBy : user.uid,
        id : randomID , 
        dateModified
      }
      setIsProceessing(true)
      await setDoc(doc(fireStore, "todos", randomID), todo);
      setIsProceessing(false)

      message.success("New Todo")
    }
  }

  const myStyle =
  {
    "height": "62px",
    "margin": "09% 0%",
    "border": "1px solid black"
  }


  return (
    <>
      <main className='dashboard-main'>
        <div className="container mt-5 pt-3 text-center" id='main-container'>
          <h1 className='mt-5'>Welcome</h1>
          <h2 className='mb-5'>Create New Todos</h2>
          <button className=" mt-5 btn btn-success " onClick={handleIn}>
            Crete New Todo
          </button>
        </div>
        {/* Todo Input  Box  */}
        <div className="container mt-5" id='todo-input-container'>
          <button className='border-0 arrow' onClick={handleOut}>
            <i className="fa-solid fa-arrow-left" ></i>
          </button>
          <form >
            <h1 className='mt-5'>
              Create New Todo
            </h1>
            <br />
            <div >
              <input style={myStyle} type="text" placeholder="Todo Name" className="form-control" id="name" onChange={(e) => name = e.target.value} />
            </div>
            <div className="mb-3">
              <input style={myStyle} type="text" placeholder="Location" className="form-control" id="location" onChange={(e) => location = e.target.value} />
            </div>
            <div className="mb-3">
              <input style={myStyle} type='date' placeholder="Date And Time" className="form-control" id="time" onChange={(e) => time = e.target.value} />
            </div>
            <div className="mb-3">
              <input style={myStyle} type="text" placeholder="Description" className="form-control" id="description" onChange={(e) => description = e.target.value} />
            </div>

            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              {
                isProceessing
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
      </main>
    </>
  )
}
