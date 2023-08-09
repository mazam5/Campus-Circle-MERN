import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoginRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoginSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("LoginFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase("RegisterRequest", (state) => {
      state.loading = true;
    })
    .addCase("RegisterSuccess", (state, action) => {
      state.loading = false;
      state.isRegistered = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("RegisterFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })


    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("LoadUserFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("LogoutRequest",(state) => {
      state.loading = true;
    })
    .addCase("LogoutSuccess", (state)=> {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    }) 
    .addCase("LogoutFailure", (state, action) => {
      state.loading= false;
      state.error = action.payload;
      state.isAuthenticated = true;
    })
    
    .addCase("friendRequest", (state, action)=> {
      state.loading = true;
    })
    .addCase("friendsSuccess", (state, action) => {
      state.loading = false;
      state.friend = action.payload;
    })
    .addCase("friendFailure", (state, action) => {
      state.loading= true;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    .addCase("toFollowRequest", (state)=> {
      state.loading=true;
    })
    .addCase("toFollowSuccess", (state, action)=> {
      state.loading = false;
      state.followList = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("toFollowFailure", (state, action) => {
      state.loading = true;
      state.error = action.payload;
      state.isAuthenticated = false;
    })


    .addCase("userRequest", (state)=> {
      state.loading=true;
    })
    .addCase("userSuccess", (state, action)=> {
      state.loading = false;
      state.getAccount = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("userFailure", (state, action) => {
      state.loading = true;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    
});















































// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {};

// export const userReducer = createReducer(initialState, {
//     LoginRequest: (state) => {
//     state.loading = true;
//   },
//   LoginSuccess: (state, action) => {
//     state.loading = false;
//     state.user = action.payload;
//     state.isAuthenticated = true;
//   },
//   LoginFailure: (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//     state.isAuthenticated = false;
//   },

//   RegisterRequest: (state) => {
//     state.loading = true;
//   },
//   RegisterSuccess: (state, action) => {
//     state.loading = false;
//     state.user = action.payload;
//     state.isAuthenticated = true;
//   },
//   RegisterFailure: (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//     state.isAuthenticated = false;
//   },

//   LoadUserRequest: (state) => {
//     state.loading = true;
//   },
//   LoadUserSuccess: (state, action) => {
//     state.loading = false;
//     state.user = action.payload;
//     state.isAuthenticated = true;
//   },
//   LoadUserFailure: (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//     state.isAuthenticated = false;
//   },


// })
