import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const postReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("feedRequest", (state)=> {
      state.loading=true;
    })
    .addCase("feedSuccess", (state, action)=> {
      state.loading = false;
      state.feed = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("feedFailure", (state, action) => {
      state.loading = true;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    
});





