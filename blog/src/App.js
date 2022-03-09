
import './App.css';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Posts from './components/Posts';
import PostsDetails from './components/PostsDetails';
import CreatePosts from './components/CreatePosts';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';


function App() {
  return (
    <BrowserRouter>
      <div className="container">


        <Header/>
      <Routes>
      <Route path="/" element={<Posts />} />
          <Route path='/post/:id' element ={<PostsDetails/>} />
          <Route path='/create'element ={<CreatePosts/>} />
          <Route path='/login' element = {<Login/>} />

          <Route path='/register' exact component={<Register/>} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
