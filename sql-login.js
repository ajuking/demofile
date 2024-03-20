import { useState } from 'react';
import './App.css';
import axios  from 'axios'
function App() {
  const[state,setState]=useState({
    username:"",
    email:"",
    password:""
  })


  function handleChange(event){
    setState({...state,[event.target.name]:event.target.value})
  }

  const handlesubmit=((e)=>{
    e.preventDefault();
    console.log(state);
    axios.post("http://localhost:8080/signup",{state})
    .then(res=>alert("Signin Successfully"))
    .catch(err=>(console.log(err)))
  })
  
  function Clear()
  {
   
    setState({
      username:"",
      email:"",
      password:""   
    });
  }
 
  return (
    <>
    <div className='container'>
        <div className='row d-flex justify-content-center mt-5'>
            <div className='col-sm-4 border border-2 p-3 shadow-lg p-3 mb-5 bg-body rounded'>
            <form onSubmit={e=>handlesubmit(e)}>
            <header className="h3 text-center mb-3">Sign Up</header>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder='Enter Your Name' name='username' onChange={handleChange} value={state.username}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" aria-describedby="emailHelp" placeholder='Enter Your Email' name='email' onChange={handleChange} value={state.email}/>
                  </div>
                  <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control"  placeholder='Enter Your Password' name='password' onChange={handleChange} value={state.password}/>
                  </div>
                  <div className="mb-3 d-flex justify-content-center">
                     <button type="submit" className="btn btn-primary">Submit</button>
                  </div>   
                  
              
            </form>
                  <div className="d-flex justify-content-end ">
                    <button className='btn text-primary text-decoration-underline' onClick={Clear} >Clear</button>
                  </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default App;
