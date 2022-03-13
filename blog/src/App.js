import React, {useState} from 'react'

import './App.css';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Posts from './components/Posts';
import PostsDetails from './components/PostsDetails';
import CreatePosts from './components/CreatePosts';
import Header from './components/Header';
import Register from './components/Register';
import Search from './components/Search';



import Login from './components/Login';
import {firebaseAuth} from  './firebase';
import AuthContext from './components/AuthContext';



function App() {

   const [authUser,setAuthUser] = useState(null);
   
React.useEffect(()=>{
  const unsubscribe = firebaseAuth.onAuthStateChanged(user=>{
    if(user){
      setAuthUser(user);
      console.log(user);
    }else{
      setAuthUser(null)
    }
  });
  return ()=>{
    unsubscribe()
  }
},[])
     return (
    <BrowserRouter>
      <div className="container">

     <AuthContext.Provider value={{authUser ,firebaseAuth }}>
        <Header/>
      <Routes>
      <Route path="/" element={<Posts />} />
          <Route path='/post/:id' element ={<PostsDetails/>} />
          <Route path='/create'element ={<CreatePosts/>} />
          <Route path='/login' element = {<Login/>} />
          <Route path='/register' element ={<Register/>} />
          <Route path='/search' element ={<Search/>} />

          </Routes>
          </AuthContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
