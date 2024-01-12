import { message } from 'antd'
import { collection, getDocs, query, where, doc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore/lite";
import { fireStore } from "../../Config/firebase"
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from 'Contexts/AuthContext';

export default function TodoHome() {
  // ----------- Processings ----------- 
  const [isDeleteProcessing, setIsDeleteProcessing] = useState(false)
  const [isUpdateProcessing, setIsUpdateProcessing] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  // ----------- Todos -----------
  const [displayTodo, setDisplayTodo] = useState([])
  const [selectedTodo, setSelectedTodo] = useState({})


  const { user } = useContext(AuthContext)
  let ID = user.uid
  const fetchData = useCallback(async () => {
    setIsProcessing(true)
    let array = []
    const q = query(collection(fireStore, "todos"), where("createdBy", "==", ID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
      setIsProcessing(false)
    });
    console.log('array', array)

    setDisplayTodo(array)
  })
  useEffect(() => {
    fetchData()
  }, [])

  // ----------- Delete ----------- 

  const handleDelete = async (todo) => {

    setIsDeleteProcessing(true)
    await deleteDoc(doc(fireStore, "todos", todo.id));
    message.error("Todo Deleted")
    let newTodos = displayTodo.filter((newTodo) => {
      return todo.id !== newTodo.id
    })
    setDisplayTodo(newTodos)
    setIsDeleteProcessing(false)
    console.log('newTodos', newTodos)
  }

  // ----------- Edit ----------- 
  const handleChange = (e) => {
    setSelectedTodo(s => ({ ...s, [e.target.name]: [e.target.value] }))
  }
  const handleUpdate = async () => {
    setIsUpdateProcessing(true)
    let email = user.email
    console.log(email)
    let updatedTodo = { ...selectedTodo }
    updatedTodo.dateModified = serverTimestamp()
    updatedTodo.modifiedBy = email
    await setDoc(doc(fireStore, "todos", updatedTodo.id), updatedTodo, { merge: true });
    let newTodo = displayTodo.map((doc) => {
      if (doc.id === selectedTodo.id) {
        return updatedTodo
      } else {
        return doc
      }
    })
    setDisplayTodo(newTodo)
    console.log(selectedTodo)
    setIsUpdateProcessing(false)
  }

  const myStyle =
  {
    "height": "62px",
    "margin": "09% 0%",
    "border": "1px solid black"
  }

  return (
    <main>
      <h1 className="text-center text-light my-5 py-5">
        Todo List
      </h1>
      <h3 className={`text-center text-white my-5 d-${(displayTodo == 0) ? "block" : "none"}`}>
        No Todo Found
      </h3>


      {
        isProcessing
          ?
          <div className="loader"></div>
          :
          <>
            {
              displayTodo.map((displayTodo, i) => {
                return (
                  <div className="tr" key={i} >
                    <div className="container" >
                      <div className="row">
                        <div className="col">
                          <div><div><b>Name :- </b></div> {displayTodo.name}</div>
                          <div><div><b>Date :- </b></div> {displayTodo.time}</div>
                        </div>
                        <div className="col">
                          <div> <div><b>Location :- </b></div> {displayTodo.location}</div>
                          <div><div><b>Description :- </b></div> {displayTodo.description}</div>
                          <div className="button d-flex align-items-center">
                            {/* -------- Delete -------- */}
                            <button className='btn btn-danger mt-3' onClick={() => { handleDelete(displayTodo) }} >
                              {
                                isDeleteProcessing
                                  ?
                                  <div className="spinner-border spinner-border-sm" role="status">
                                  </div>
                                  : "Delete"
                              }
                            </button>
                            &nbsp; | &nbsp;
                            {/* --------- Edit --------- */}
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-info mt-3' onClick={() => { setSelectedTodo(displayTodo) }} >
                              {
                                isUpdateProcessing
                                  ?
                                  <div className="spinner-border spinner-border-sm" role="status">
                                  </div>
                                  : "Edit"
                              }
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </>
      }
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content px-3">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update TODO</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div >
                <input style={myStyle} type="text" placeholder="Todo Name" className="form-control" name="name" id="name" value={selectedTodo.name} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <input style={myStyle} type="text" placeholder="Location" className="form-control" name="location" id="location" value={selectedTodo.location} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <input style={myStyle} type='date' placeholder="Date And Time" className="form-control" name="time" id="time" value={selectedTodo.time} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <input style={myStyle} type="text" placeholder="Description" className="form-control" name="description" id="description" value={selectedTodo.description} onChange={handleChange} />
              </div>
            </div>
            <div className="modal-footer">
              <input type="reset" className="btn btn-danger" value='Clear' />
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
