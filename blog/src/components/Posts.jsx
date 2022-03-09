import React, { useState, useEffect } from 'react'
import db from '../firebase';
import { Link } from 'react-router-dom';

import moment from 'moment';

import firebase from "../firebase"



function Posts() {
    const [posts, setPosts] = useState([]);


    useEffect(() => {

       
        getPosts();
    }, []);
    const getPosts =  () => {
   return firebase.collection("posts")
   .orderBy("created_at" , "desc")
   .onSnapshot(snapshot=>{
    
    const posts = snapshot.docs.map(doc=>{
        return {id:doc.id, ...doc.data()};

    })
    console.log("🚀 ~ file: Posts.jsx ~ line 28 ~ getPosts ~ posts", posts)
    setPosts(posts)
    
       
   })
    }

    const voteUp = postId =>{
        const post = firebase.collection("posts").doc(postId);
        console.log("🚀 ~ file: Posts.jsx ~ line 27 ~ Posts ~ post", post)

        post.get().then(doc=>{
            if(doc.exists){
                const previousVoteCount = doc.data().vote_count;
                post.update({vote_count: previousVoteCount + 1 })
            }
        })
    }
    const voteDown = postId =>{
        const post = firebase.collection("posts").doc(postId);
        post.get().then(doc=>{
            if(doc.exists){
                const previousVoteCount = doc.data().vote_count;
                post.update({vote_count: previousVoteCount - 1 })
            }
        })
    }
    const renderPosts = ()=>{
  return (     posts && posts.map((post,index)=>(
            <div key={index} className='posts'>
  <div className="posts">
                    <div className="post">
                        <div className="post-image img">
                            <img src={post.image} alt=""     ></img>
                        </div>
                        <div className="post-content">
      <button    > <Link to ={`/post/${post.id}` }>show</Link>  </button>
                            <h3 className="post-title">   {post.title}                </h3>
                            <h5 className="post-details">
                                <span className="posted-by">
                                  {post.postedBy.name}
                                </span>

                                <span className="date">{moment(post.created_at).local('fr').fromNow()}</span>


                            </h5>
                            <p className="post-body">

                                {post.body}


                            </p>
                            <div className="votes">
                                <div className="votes">
                                    <div className="up" onClick={()=>voteUp(post.id)} >
                                        &#8593;
                                    </div>
                                    <div className="down" onClick={()=>voteDown(post.id)}>
                                        &#8595;
                                    </div>
                                    <div className='count'>{post.vote_count}</div>

                                </div>

                            </div>


                        </div>
                    </div>

                </div>
            </div>
        ))
  )
    }
  
  return (
      <div className='posts'>
          {
                renderPosts()
          }
      </div>
  )
   
    // return (

    // )
}

export default Posts