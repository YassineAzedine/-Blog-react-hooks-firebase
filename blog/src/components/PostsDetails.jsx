import React,{useState,useEffect } from 'react'
import { useParams } from 'react-router'
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
  
},[]);
const  getPost = () =>{
  postRef.get().then(doc=>{
    setPost({...doc.data(),id : doc.id})
  })
}
console.log(post);
  return (
    <div>PostsDetails</div>
    
    
    
  )
}

export default PostsDetails