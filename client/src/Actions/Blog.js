import axios from "axios"

export const getBlogs = (search) => async(dispatch) => {
    try {
      dispatch({
        type: "AllBlogsRequest"
      })
      console.log(search)
        const {data} = await axios.get(`/blog/all/blogs/${search? search : ''}`)
      dispatch({
        type: "AllBlogsSuccess",
        payload: data
      })
    } catch (error) {
      dispatch({
        type:"AllBlogsFailure",
        payload:error.response
      })    
    }
}

export const getSpecificBlog = (id) => async(dispatch) => {
    try {
      dispatch({
        type: "BlogRequest"
      })
      
      const {data} = await axios.get(`/blog/${id}`)

      dispatch({
        type: "BlogSuccess",
        payload: data
      })
    } catch (error) {
      dispatch({
        type:"BlogFailure",
        payload:error.response
      })    
    }
}

export const views = (id) => async(dispatch) => {
    try {
      dispatch({
        type: "ViewRequest"
      })
      
      const {data} = await axios.get(`/blog/${id}/increment/view`)
      dispatch({
        type: "ViewSuccess",
        payload: data
      })
    } catch (error) {
      dispatch({
        type:"ViewFailure",
        payload:error.response
      })    
    }
}

export const getPopularBlogs = () => async(dispatch) => {
    try {
      dispatch({
        type: "PopularBlogsRequest"
      })
      
      const {data} = await axios.get('/blog/popular/trend')

      dispatch({
        type: "PopularBlogsSuccess",
        payload: data
      })
    } catch (error) {
      dispatch({
        type:"PopularBlogsFailure",
        payload:error.response
      })    
    }
}

export const getSavedBlogs = (id) => async(dispatch) => {
    try {
      dispatch({
        type: "SavedBlogsRequest"
      })
      
      const {data} = await axios.get(`/blog/saved/all`)

      dispatch({
        type: "SavedBlogsSuccess",
        payload: data
      })
    } catch (error) {
      dispatch({
        type:"SavedBlogsFailure",
        payload:error.response
      })    
    }
}
export const getFollowingBlogs = (id) => async(dispatch) => {
    try {
      dispatch({
        type: "FollowingBlogsRequest"
      })
      
      const {data} = await axios.get('/blog/following/blogs')

      dispatch({
        type: "FollowingBlogsSuccess",
        payload: data
      })
    } catch (error) {
      dispatch({
        type:"FollowingBlogsFailure",
        payload:error.response
      })    
    }
}

export const getCategories = (id) => async(dispatch) => {
    try {
      dispatch({
        type: "CategoryRequest"
      })
      
      const {data} = await axios.get('/category')

      dispatch({
        type: "CategorySuccess",
        payload: data
      })
    } catch (error) {
      dispatch({
        type:"CategoryFailure",
        payload:error.response
      })    
    }
}

export const LikeBlog = (id) => async(dispatch)=> {
  try {
    dispatch({
      type:"likeBlogRequest",
    })

    const {data} = await axios.put(`blog/${id}/like`);
    dispatch({
      type:"likeBlogSuccess",
      payload: data
    })
  } catch (error) {
    dispatch({
      type: "likeBlogFailure",
      payload:error.response
    })
  }
} 

export const bookmarkBlog = (id) => async(dispatch)=> {
  try {
    dispatch({
      type:"BookmarkBlogRequest",
    })

    const {data} = await axios.get(`blog/${id}/saved/blog`);
    dispatch({
      type:"BookmarkBlogSuccess",
      payload: data
    })
  } catch (error) {
    dispatch({
      type: "BookmarkBlogFailure",
      payload:error.response
    })
  }
} 
