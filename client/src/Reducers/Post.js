import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const postReducer = createReducer(initialState, (builder) => {
  builder

    .addCase("mypostRequest", (state)=> {
      state.loading = true
    })
    .addCase("mypostSuccess", (state, action)=> {
      state.loading = false
      state.mypost = action.payload
    })
    .addCase("mypostFailure", (state, action)=> {
      state.loading = true
      state.error = action.payload
    })


    .addCase("userPostRequest", (state)=> {
      state.loading = true
    })
    .addCase("userPostSuccess", (state, action)=> {
      state.loading = false
      state.userPosts = action.payload
    })
    .addCase("userPostFailure", (state, action)=> {
      state.loading = true
      state.error = action.payload
    })


    .addCase("feedRequest", (state)=> {
      state.loading=true;
    })
    .addCase("feedSuccess", (state, action)=> {
      state.loading = false;
      state.feed = action.payload;
    })
    .addCase("feedFailure", (state, action) => {
      state.loading = true;
      state.error = action.payload;
    })

    
});



export const likeReducer = createReducer(initialState, (builder) => {
  builder

    .addCase("likeRequest", (state)=> {
      state.loading = true
    })
    .addCase("likeSuccess", (state, action)=> {
      state.loading = false
      state.likes = action.payload
    })
    .addCase("likeFailure", (state, action)=> {
      state.loading = true
      state.error = action.payload
    })
    
});


