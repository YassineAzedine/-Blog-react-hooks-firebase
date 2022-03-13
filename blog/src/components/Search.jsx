import React,{useState} from 'react'
import firebase from '../firebase';
import {link, NavLink , Link} from 'react-router-dom';


function Search() {
    const [posts,setPosts] = useState([]);
    const [search,setSearch] = useState("");
    const handleFormSubmit = (event)=>{
       event.preventDefault();
       const searchQuery = search.toLowerCase();
     firebase.collection("posts").onSnapshot(snapshot =>{
         const posts = snapshot.docs.map(doc =>{
             return {id:doc.id,...doc.data()};

         });
         const foundPosts = posts && posts.filter(post => {
             return(
                 post.title.toLowerCase().includes(searchQuery)||
                 post.body.toLowerCase().includes(searchQuery)   ||
                 post.postedBy.name. toLowerCase().includes(searchQuery)

             )
         });
         setPosts(foundPosts);
         console.log(foundPosts);
         setSearch("")
     });
    };
    const renderPosts = ()=>{
        return (     posts && posts.map((post,index)=>(
                  <div key={index} className='posts'>
        <div className="posts">
                          <div className="post">
                              <div className="post-image img">
                                  <img src={post.image} alt=""     ></img>
                              </div>
                              <div className="post-content">
                                  <h3 className="post-title"> 
                                   <Link to = {`/post/${post.id}` }>  
                                    <h3 className='post-title'>{post.title} </h3>
                                    </Link>               </h3>
                                  <h5 className="post-details">
                                      <span className="posted-by">
                                        {post.postedBy.name}
                                      </span>
      
          
      
                                  </h5>
                                  <p className="post-body">
      
                                      {post.body}
      
      
                                  </p>
                         
      
                              </div>
                          </div>
      
                      </div>
                  </div>
              ))
        )
          }

  return (
    <div>
      <div className="form-container">
          <h2 className='register-form-title'>

              <form onSubmit = {handleFormSubmit } >
              <input type="search" value={search}
                className="form-control"
                  onChange= {(event) => setSearch(event.target.value)}
placeholder="recherche..."
                  />
                
                  <button type='submit' className='btn btn-primary'> Valider </button>
         

              </form>
            
          </h2>
      </div>
<div className="form-container">
<div className="posts">
    {renderPosts()}
</div>
</div>
    </div>
  )
}

export default Search