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
      data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

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