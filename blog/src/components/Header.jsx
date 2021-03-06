import React from 'react';
import {withRouter,NavLink} from "react-router-dom";
import AuthContext from '../components/AuthContext';

function Header() {
  const {authUser,firebaseAuth} = React.useContext(AuthContext);
    
  const logout = async ()=>{
    await firebaseAuth.signOut();
  }
  return (
  <div className="header">
  <div className="main-nav">
  <img src="https://cdn.pixabay.com/photo/2014/02/13/07/28/security-265130_1280.jpg" alt="" className='logo' />
<NavLink to ='/' className="link">Accueil </NavLink>
<NavLink to ='/search' className="link">Search </NavLink>
{
  authUser ? (
    <>
    <div className="link"> 
    {authUser.displayName}
    </div>

    <div className="link logout" onClick = {()=>logout()}> 
      Déconnecxion
    </div>
    </>
  ):(
    <div>
    <NavLink to ='/login ' className="link">Connexion </NavLink>
    <NavLink to ='/register' className="link">Inscription </NavLink> 
    </div>
  ) 
}

</div>

      
      </div>

  )
}

export default Header