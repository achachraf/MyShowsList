import { useState, useEffect } from "react";
import "./App.css";
import {getRandomId} from './utils/generators'

const App = () => {

    let initShow = {
      id: null,
      title: "",
      status: "Watching...",
      rate: 0
    }

    const [show, setShow] = useState(initShow)
    const [shows, setShows] = useState([])

    useEffect(()=>{
      if(localStorage.getItem("shows") === null){
        localStorage.setItem("shows",JSON.stringify([]))
      }
      else{
        let stringShows = localStorage.getItem("shows");
        setShows(JSON.parse(stringShows))
      }
    },[])

    
    const handleChange = (e)=>{
      let value = e.target.value;
      console.log("we are changing the field: "+e.target.id)
      setShow({
        ...show,
        [e.target.id]: value
      })
    }

    const handleSubmit  = (e)=>{
      e.preventDefault();
      if(show.title !== ""){
        
        let updatedShows = [...shows, {...show,id: getRandomId(10)}]

        // add to localstorage
        localStorage.setItem("shows", JSON.stringify(updatedShows))

        //add to state
        setShows(updatedShows)

        //cleanning the actual state
        setShow(initShow)

        //close Modal
        document.getElementById("closeModal").click();

      }
    }

    const handleDelete = (id)=>{

      let updatedShows = shows.filter((show)=>(show.id !== id))

      //remove from localstorage
      localStorage.setItem("shows", JSON.stringify(updatedShows))

      //remove from state
      setShows(updatedShows)

    }

    return (
        <div className="container">
            <div className="row">
                <div className="offset-md-2 col-md-8 text-center">
                    <h1>Welcome to MyShowsList</h1>
                    <h4>You want to add a show? </h4>
                    <button className="btn btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#addShowModal">Click me ;)</button>
                </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#Id</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Rate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shows.map((show)=>{
                      return (
                        <tr key={show.id}>
                          <td>{show.id}</td>
                          <td>{show.title}</td>
                          <td>{show.status}</td>
                          <td>{show.rate}</td>
                          <td>
                            <button onClick={()=>{handleDelete(show.id)}} className="btn btn-danger">Delete</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div
                class="modal fade"
                id="addShowModal"
                tabindex="-1"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                  <form onSubmit={handleSubmit}>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Modal title
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label htmlFor="#title">Title</label>
                            <input value={show.title} onChange={handleChange} className="form-control" type="text" id="title"/>
                            <label className="mt-3" htmlFor="#status">Status</label>
                            <select value={show.status} onChange={handleChange} className="form-select" name="status" id="status">
                              <option value="watching">Watching...</option>
                              <option value="planning">Planning to watching</option>
                              <option value="finished">Finished</option>
                            </select>
                            <label  className="mt-3" htmlFor="#rate">Rate</label>
                            <input value={show.rate} onChange={handleChange} type="number" className="form-control" id="rate"/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="closeModal">
                                Close
                            </button>
                            <button type="submit" class="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default App;
