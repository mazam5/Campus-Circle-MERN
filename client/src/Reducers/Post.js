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
    state.loading = false
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
      state.loading = false
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
      state.loading = false;
      state.error = action.payload;
    })
    
    .addCase("likeRequest", (state)=> {
      state.loading = true
    })
    .addCase("likeSuccess", (state, action)=> {
      state.loading = false
      state.like = action.payload
    })
    .addCase("likeFailure", (state, action)=> {
      state.loading = false
      state.error = action.payload
    })

    .addCase("addCommentRequest", (state)=> {
      state.loading = true
    })
    .addCase("addCommentSuccess", (state, action)=> {
      state.loading = false
      state.message = action.payload
    })
    .addCase("addCommentFailure", (state, action)=> {
      state.loading = false
      state.error = action.payload
    })

    .addCase("removeCommentRequest", (state)=> {
      state.loading = true
    })
    .addCase("removeCommentSuccess", (state, action)=> {
      state.loading = false
      state.message = action.payload
    })
    .addCase("removeCommentFailure", (state, action)=> {
      state.loading = false
      state.error = action.payload
    })
    
  });
  