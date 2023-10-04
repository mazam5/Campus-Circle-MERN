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
        payload: error.response
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

export const updateUser = (formData) => async(dispatch)=> {
  try {
    dispatch({
      type:"updateUserRequest"
    })

    const { data } = await axios.put('/users/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(data)
    dispatch({
      type: "updateUserSuccess", 
      payload: data
    })
  } catch (error) {
    dispatch({
      type: "updateUserFailure", 
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


export const searchUser = (q) => async(dispatch)=> {
  try {
    dispatch({
      type:"findUserRequest"
    })
    const {data} = await axios.get(`/users?search=${q}`);
    dispatch({
      type: "findUserSuccess",
      payload:data
    })
    
  } catch (error) {
    dispatch({
      type: "findUserFailure",
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

// follow / unfollow User
export const addRemoveUser = (id) => async(dispatch)=> {
  try {
    dispatch({
      type: "addRemoveUserRequest"
    })

    const {data} = await axios.put(`/users/${id}`);

    dispatch({
      type:"addRemoveUserSuccess",
      payload:data
    })

  } catch (error) {
    dispatch({
      type:"addRemoveUserFailure",
      payload: error.response
    })
  }
}


export const RemoveUserFromFollowers = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "removeFollowerRequest",
    });

    const { data } = await axios.put(`/users/${id}/remove`);
    
    dispatch({
      type: "removeFollowerSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "removeFollowerFailure",
      payload: error.response.data
    });
  }
}
export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });

    const { data } = await axios.get(`/users/${id}`);
    
    dispatch({
      type: "userProfileSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response
    });
  }
}


export const getSuggFollow = () => async(dispatch) => {
  try {
    dispatch({
      type: "SuggestedFollowRequest"
    })
    
    const {data} = await axios.get('/users/follow/suggestions')

    dispatch({
      type: "SuggestedFollowSuccess",
      payload: data
    })
  } catch (error) {
    dispatch({
      type:"SuggestedFollowFailure",
      payload:error.response
    })    
  }

}
