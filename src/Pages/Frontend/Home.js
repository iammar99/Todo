import { message } from 'antd'
import React from 'react'

export default function Home() {
  let displayTodo = []
  displayTodo = JSON.parse(localStorage.getItem("todos")) || []
  console.log(displayTodo)

  // if(displayTodo == 0) {
  //   document.getElementById("error-find").style = "diplay:block;"
  // }
  // else{
  //   document.getElementById("error-find").style = "diplay:none;"
  // }
  return (
    <main>
      <div className="container" id='todo-box'>
        <div className="row">
          <div className="col">
            <h1 className="text-center text-white my-5">
              Home
            </h1>
            <h2 className="text-center text-white my-5">
              Todo List
            </h2>
            <h3 className={`text-center text-white my-5 d-${(displayTodo == 0) ? "block" : "none"}`}>
              No Todo Found
            </h3>

            {
              displayTodo.map((displayTodo, i) => {
                const todoId = `todo-${i}`
                const handleDelete = () => {
                  console.log(i)
                  let delTodo = JSON.parse(localStorage.getItem("todos"))
                  // console.log(delTodo[i])
                  delTodo.splice(i, 1)
                  localStorage.setItem("todos", JSON.stringify(delTodo));
                  document.getElementById(i).style = "display:none;"
                  message.error("Deleted Successfully")

                }

                return (

                  <div className="tr" key={i} id={i} >
                    <div className="container" >
                      <div className="row">
                        <div className="col">
                          <div><div><b>Name :- </b></div> {displayTodo.name}</div>
                          <div><div><b>Time :- </b></div> {displayTodo.time}</div>
                        </div>
                        <div className="col">
                          <div> <div><b>Location :- </b></div> {displayTodo.location}</div>
                          <div><div><b>Description :- </b></div> {displayTodo.description}</div>
                          <button className='btn btn-danger mt-3' onClick={handleDelete} >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </main>
  )
}
