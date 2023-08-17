import axios from "axios";

export const createPost = (formData) => async(dispatch)=> {
  try {
    dispatch({
      type: "mypostRequest"
    })

    const {data} = await axios.post('/post/new', formData, {
      headers: {
        "Content-Type": 'multipart/form-data',
      },
    })

    dispatch({
      type:"mypostSuccess",
      payload: data
    })

  } catch (error) {
    dispatch({
      type:"mypostFailure",
      payload: error.response
    })
  }
}

export const getFeed = () => async(dispatch) => {
    try {
      dispatch({
        type: "feedRequest"
      })
      
      const {data} = await axios.get('/post/feed/all')

      dispatch({
        type: "feedSuccess",
        payload: data
      })
    } catch (error) {
      dispatch({
        type:"feedFailure",
        payload:error.response
      })    
    }
  
  }

export const LikePost = (id) => async(dispatch)=> {
  try {
    dispatch({
      type:"likeRequest",
    })

    const {data} = await axios.put(`post/like/${id}`);
    dispatch({
      type:"likeSuccess",
      payload: data
    })
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload:error.response
    })
  }
} 

export const addComment = (id, comment) => async(dispatch)=> {
  try {
    dispatch({
      type: "addCommentRequest"
    })
    
    console.log(comment)
    const {data} = await axios.put(`/post/comment/${id}`, {comment: comment})

    console.log(data)
    dispatch({
      type:"addCommentSuccess",
      payload: {data}
    })

  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload:error.response
    })
  }
}

export const removeComment = (id, commentId) => async(dispatch)=> {
  try {
    dispatch({
      type: "removeCommentRequest"
    })
    
    console.log(commentId)
    const {data} = await axios.delete(`/post/comment/${id}`, {
      data: { commentId },
    })

    dispatch({
      type:"removeCommentSuccess",
      payload: {data}
    })

  } catch (error) {
    dispatch({
      type: "removeCommentFailure",
      payload:error.response.data
    })
  }
}