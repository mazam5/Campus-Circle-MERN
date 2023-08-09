import axios from "axios";

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
