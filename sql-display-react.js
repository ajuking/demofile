import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Display() {
  const navigate=useNavigate();
    const[data,setData]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:8080/display",{data})
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    })

    // modal la data va show panna vaikka
    const[newvalue,newChange]=useState({
      Name:"",
      Email:"",
      Pass:""
    })
    const hget=((Email)=>{
      axios.get("http://localhost:8080/up"+Email)
      .then(res=>newChange(res.data[0]))
      .catch(err=>console.log(err))
    })
//delete code
    const hdelete=(Email)=>{
      const confirm=window.confirm("Would you like to Delete?"+Email);
      if(confirm)
      {
        axios.post('http://localhost:8080/tabledel/'+Email)
        .then(res=>{navigate(0)})
        .catch(err=>console.log(err));
     }
    }


    //next modal la show aagura details ah edit pannanu like update use panni atha kondupoi sql la marupadiyum add pannuanu
  function uhandlechange(evt){
    newChange({...newvalue,[evt.target.name]:evt.target.value})
  }
  const hsubmit=((e)=>{
    e.preventDefault();
    console.log(newvalue);
    axios.put("http://localhost:8080/update",{newvalue})
    .then(res=>alert("updated sucessfully"))
    .then(res=>navigate(0))
    .catch(err=>console.log(err))
  });
    return (
    <>
    <table className='table table-striped table-hover'>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th colSpan="2">Action</th>
      </tr>
      
        <tbody>
          {
            data.map((x,index)=>{
              return<tr key={index}>
                <td>{x.Name}</td>
                <td>{x.Email}</td>
                <td>{x.Pass}</td>
                <td><button onClick={e2=>hget(x.Email)} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Edit
</button></td>
                <td><button className='btn btn-danger' onClick={e2=>hdelete(e2)}>Delete</button></td>
              </tr>
            })
          }
        </tbody>
      
    </table>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Changes</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={evt2=>hsubmit(evt2)}>
      <div class="modal-body">
      <div className='col-sm-12'>
            <div class="mb-3">
                <label  class="form-label" >Name</label>
                <input type="text" class="form-control"  name="Name" value={newvalue.Name} onChange={uhandlechange}/>
            </div>
      </div>

      <div className='col-sm-12'>
            <div class="mb-3">
                <label  class="form-label" >Email</label>
                <input type="text" class="form-control"  name="Email" value={newvalue.Email} readOnly/>
            </div>
      </div>

      <div className='col-sm-12'>
            <div class="mb-3">
                <label  class="form-label" >Password</label>
                <input type="text" class="form-control"  name="Pass" value={newvalue.Pass} onChange={uhandlechange}/>
            </div>
      </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
      </form>
    </div>
  </div>
</div>
    </>
  )
}
