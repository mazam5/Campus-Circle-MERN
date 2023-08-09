import axios from "axios"

export const LoginUser = (email, password) => async(dispatch) => {
    try {
        dispatch({
            type: "LoginRequest"
        })
        
        const {data} = await axios.post('/auth/login', {email, password}, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type:"LoginSuccess",
            payload: data.user
        }) 
    } catch (error) {
        dispatch({
            type:"LoginFailure",
            payload: error 
        })
    }
} 

export const LoadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadUserRequest",
      });
  
      const { data } = await axios.get("/users/me");
      
      dispatch({
        type: "LoadUserSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "LoadUserFailure",
        payload: error.response,
      });
    }
}

export const Logout = () => async(dispatch)=> {
  try {
    dispatch({
      type:"LogoutRequest"
    });
  
    await axios.get("/auth/logout")
    dispatch({
      type:"LogoutSuccess",
    });
  } catch (error) {
    dispatch({
      type:"LogoutFailure",
      payload:error.response
    })  
  }
}  

export const RegisterUser = (formData) => async(dispatch)=> {
  try {
    dispatch({
      type: "RegisterRequest"
    })
    const {data} = await axios.post('/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({
      type:"RegisterSuccess",
      payload: data
    })
  } catch (error) {
    dispatch({
      type: "RegisterFailure",
      payload: error.response
    })    
  }
}

export const getFriends = () => async(dispatch)=> {
  try {
    dispatch({
      type:"friendRequest"
    })
    const {data} = await axios.get('/users/friends/all');
    dispatch({
      type: "friendsSuccess",
      payload:data
    })
    
  } catch (error) {
    dispatch({
      type: "friendsFailure",
      payload:error.response
    })
  }
}

export const toFollow = () => async(dispatch)=> {
  try {
    dispatch({
      type: "toFollowRequest"
    })

    const {data} = await axios.get('/users/follow/user')

    dispatch({
      type: "toFollowSuccess",
      payload: data
    })
  } catch (error) {
    dispatch({
      type:"toFollowFailure",
      payload:error.response
    })    
  }
}
export const getUser = (id) => async(dispatch)=> {
  try {
    dispatch({
      type: "userRequest"
    })
    
    const {data} = await axios.get(`/users/${id}`)

    dispatch({
      type: "userSuccess",
      payload: data
    })
  } catch (error) {
    dispatch({
      type:"userFailure",
      payload:error.response
    })    
  }
}
