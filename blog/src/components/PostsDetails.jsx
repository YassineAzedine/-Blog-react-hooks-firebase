import React,{useState,useEffect } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import firebase from '../firebase';
import moment from 'moment'
function PostsDetails(props) {
  const [post,setPost]=useState();
  const { id } = useParams();
 console.log("🚀 ~ file: PostsDetails.jsx ~ line 8 ~ PostsDetails ~ id", id)
 const postId = id ;
 const  postRef = firebase.collection("posts").doc(postId);
  useEffect(()=>{
    getPost();
  
},[post]);
const  getPost = () =>{
  postRef.get().then(doc=>{
    setPost({...doc.data(),id : doc.id})
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
  return (     post && (
            <div  className='posts'>
  <div className="posts">
                    <div className="post">
                        <div className="post-image img">
                            <img src={post.image} alt=""     ></img>
                        </div>
                        <div className="post-content">
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
  
    }
  
  return (
      <div className='posts'>
          {
                renderPosts()
          }
      </div>
  )
    
    
    
  
}

export default PostsDetails