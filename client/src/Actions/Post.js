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

export const getMyPost = () => async(dispatch) => {
  try {
    dispatch({
      type:"myPostsRequest"
    })

    const {data} = await axios.get('/post/my/posts')
    dispatch({
      type:"myPostsSuccess",
      payload: data
    })
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data
    })
  }
}

export const clearState = () => (dispatch)=>{
  try {
    dispatch({
      type:"clearStateRequest"
    })
    
    dispatch({
      type:"clearStateSuccess",
      payload: null
    })
  } catch (error) {
    dispatch({
      type: "clearStateFailure",
      payload: error.response.data
    })
  }
}


export const deletePost = (postId) => async(dispatch)=>{
  try {
    dispatch({
      type:"deletePostRequest"
    })

    const {data} = await axios.delete(`/post/${postId}`)

    dispatch({
      type:"deletePostSuccess",
      payload: data
    })
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data
    })
  }
}


export const updatePost = (postId, formData) => async(dispatch) => {
  try {
    dispatch({
      type:"updatePostRequest"
    })

    const {data} = await axios.put(`/post/${postId}`, formData, {
      headers: {
        "Content-Type": 'multipart/form-data',
      },
    })
    dispatch({
      type:"updatePostSuccess",
      payload: data
    })
  } catch (error) {
    dispatch({
      type: "updatePostFailure",
      payload: error.response.data
    })
  }
}


export const getUserPost = (userId) => async(dispatch) => {
  try {
    dispatch({
      type:"userPostRequest"
    })

    const {data} = await axios.get(`/post/${userId}`)
    dispatch({
      type:"userPostSuccess",
      payload: data
    })
  } catch (error) {
    dispatch({
      type: "userPostFailure",
      payload: error.response
    })
  }
}
