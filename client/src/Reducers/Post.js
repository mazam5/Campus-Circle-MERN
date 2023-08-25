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
    
    .addCase("myPostsRequest", (state)=> {
      state.loading = true;
    })
    .addCase("myPostsSuccess", (state, action)=> {
      state.loading = false;
      state.myposts = action.payload;
    })
    .addCase("myPostsFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })

    .addCase("clearStateRequest", (state)=> {
      state.loading = true;
    })
    .addCase("clearStateSuccess", (state, action)=> {
      state.loading = false;
      state.feed = action.payload;
      state.mypost = null;
      state.myposts = null;
    })
    .addCase("clearStateFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload
    })

    .addCase("deletePostRequest", (state)=> {
      state.loading = true;
    })
    .addCase("deletePostSuccess", (state, action)=> {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deletePostFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload
    })

    .addCase("updatePostRequest", (state)=> {
      state.loading = true;
    })
    .addCase("updatePostSuccess", (state, action)=> {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updatePostFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload
    })
  });
  
  
export const userPostReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("userPostRequest", (state)=> {
      state.loading = true;
    })
    .addCase("userPostSuccess", (state, action)=> {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase("userPostFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload
    })
  });
  