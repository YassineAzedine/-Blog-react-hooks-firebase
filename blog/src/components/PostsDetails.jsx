import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import firebase from '../firebase';
import moment from 'moment'
import AuthContext from '../components/AuthContext';
import {NavLink} from 'react-router-dom';


 
function PostsDetails(props) {
    const [post, setPost] = useState();
    const [comment, setComment] = useState();

    const { id } = useParams();
    const postId = id;
    const postRef = firebase.collection("posts").doc(postId);
    const {authUser} = React.useContext(AuthContext);
  

    useEffect(() => {
        let isSubscribed = true;
        
       postRef.get().then(doc => {
        if(isSubscribed){
           setPost({
               ...doc.data(), id:doc.id 
           });
        }
       })
       return  ()=>(isSubscribed = false)
             
        
        getPost();

    }, [post,postRef]);
    const getPost = () => {
        postRef.get().then(doc => {
            setPost({ ...doc.data(), id: doc.id })
        })
    }
    const voteUp = postId => {
        const post = firebase.collection("posts").doc(postId);

        post.get().then(doc => {
            if (doc.exists) {
                const previousVoteCount = doc.data().vote_count;
                post.update({ vote_count: previousVoteCount + 1 })
            }
        })
    }
    const voteDown = postId => {
        const post = firebase.collection("posts").doc(postId);
        post.get().then(doc => {
            if (doc.exists) {
                const previousVoteCount = doc.data().vote_count;
                post.update({ vote_count: previousVoteCount - 1 })
            }
        })
    }
    const addComment = ()=>{
postRef.get().then(doc => {
    if(doc.exists){
        const previousComments = doc.data().comments || [];
        const commentText = {
            postedBy : {id : authUser.uid , name: authUser.displayName},
            created : Date.now(),
            text:comment
        }
        const commentsUpdated = [...previousComments,commentText];
        postRef.update({comments : commentsUpdated});
        setPost(prevState=> ({
            ...prevState, comments : commentsUpdated
        }));
        setComment("");
    }
    
});
    };
    const renderPosts = () => {
        return (post && (
            <div className='posts'>
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
                                    <div className="up" onClick={() => voteUp(post.id)} >
                                        &#8593;
                                    </div>
                                    <div className="down" onClick={() => voteDown(post.id)}>
                                        &#8595;
                                    </div>
                                    <div className='count'>{post.vote_count}</div>

                                </div>

                            </div>

                        


                        </div>
                        
                    </div>
                    <div className="comments">

<h3>  Commentaires :  {post.comments && post.comments.length} </h3>
</div>
{
        authUser ? (
            <Fragment>
            <div>
   
            <textarea name="" id="" cols="25" rows="5" placeholder='commentaire' value={comment} onChange={(event)=>setComment(event.target.value)} className='form-control'>
            
            </textarea>
            </div>
            <div>
            <button onClick={() => addComment()} className='btn btn-primary'>Ajouter </button>
            </div>  
            </Fragment>

        )
        :(
      
            <NavLink to="/login" >Connectez vous pour connecter </NavLink>

        )
    }

{
post.comments && post.comments.map((comment, index) => (
    <div key={index} >
        
        <p className='comment-author'>

            {comment.postedBy.name} | {" "}
            {
                moment(comment.created).locale('fr')
                    .format('MMM Do YYYY , h:mm:ss a')

            }
            <p className='comment '>{comment.text}  </p>
        </p>

    </div>
))
}
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