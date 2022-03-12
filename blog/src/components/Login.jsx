import React, {useState} from 'react'
import {firebaseAuth} from '../firebase'
import { withRouter } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
 function Login(props) {


  const [submitted, setSubmitted] = useState(false)
  const[userCredentails,setUserCredentailes] = useState({
    email : '',
    password:''

  });
  const handeleInputChange = event =>{
    setUserCredentailes({
      ...userCredentails,[event.target.name] : event.target.value
    })
  }
  const onSubmited = event =>{
    event.preventDefault();
    setSubmitted(true);
    login(userCredentails)
    setUserCredentailes({
   
    email : '',
    password:''
    });
  };
  const login = ({
    email,password
  }) => 
  {
    const LoggedUser = firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(userLogged =>{
     
      return userLogged;
    })
    console.log("🚀 ~ file: Login.jsx ~ line 34 ~ Login ~ LoggedUser", LoggedUser)

  //  props.history.push('/')
    
  }
    return (
   <div className="form-container">
     <div className="register-form-title">
       Connexion
     </div>
      <form onSubmit={onSubmited} >


<input type="email"
 name ="email"
 required
 className='form-control'
 placeholder='email'
 autoComplete='off'
  onChange={handeleInputChange }
 value={userCredentails.email} />
 <input type="password"
 name ="password"
 required
 className='form-control'
 placeholder='password'
 autoComplete='off'
  onChange={handeleInputChange }
 value={userCredentails.password} />
 <div>
   <button className='btn btn-primary'
    type='submit'> Valider</button>
 </div>

      </form>
   </div>
  )
}

export default Login