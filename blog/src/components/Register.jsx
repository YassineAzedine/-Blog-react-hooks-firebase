import React, {useState} from 'react'
import {firebaseAuth} from '../firebase'
import { withRouter } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
 function Register(props) {


  const [submitted, setSubmitted] = useState(false)
  const[userCredentails,setUserCredentailes] = useState({
    name : '' , 
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
    register(userCredentails)
    setUserCredentailes({
      name : '' , 
    email : '',
    password:''
    })
  }
  const register = ({
    name,email,password
  }) =>{
    const newUser = firebaseAuth.createUserWithEmailAndPassword (email,password)
    .then(userCreated =>{
      userCreated.user.updateProfile({
        displayName : name
      });
      return userCreated;
    })

    console.log(newUser);
window.location = "/login";
  }
    return (
   <div className="form-container">
     <div className="register-form-title">
       Inscription
     </div>
      <form onSubmit={onSubmited} >
<input type="text"
 name ="name"
 required
 className='form-controle'
 placeholder='nom & prenom'
 autoComplete='off'
  onChange={handeleInputChange }
 value={userCredentails.name} />

<input type="email"
 name ="email"
 required
 className='form-controle'
 placeholder='email'
 autoComplete='off'
  onChange={handeleInputChange }
 value={userCredentails.email} />
 <input type="password"
 name ="password"
 required
 className='form-controle'
 placeholder='nom & prenom'
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

export default Register