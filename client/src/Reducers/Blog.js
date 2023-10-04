import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("AllBlogsRequest", (state) => {
      state.loading = true;
    })
    .addCase("AllBlogsSuccess", (state, action) => {
      state.loading = false;
      state.allBlog = action.payload;
    })
    .addCase("AllBlogsFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("BlogRequest", (state) => {
      state.loading = true;
    })
    .addCase("BlogSuccess", (state, action) => {
      state.loading = false;
      state.userBlog = action.payload;
    })
    .addCase("BlogFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("ViewRequest", (state) => {
      state.loading = true;
    })
    .addCase("ViewSuccess", (state, action) => {
      state.loading = false;
      state.view = action.payload;
    })
    .addCase("ViewFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("PopularBlogsRequest", (state) => {
      state.loading = true;
    })
    .addCase("PopularBlogsSuccess", (state, action) => {
      state.loading = false;
      state.popularBlog = action.payload;
    })
    .addCase("PopularBlogsFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("SavedBlogsRequest", (state) => {
      state.loading = true;
    })
    .addCase("SavedBlogsSuccess", (state, action) => {
      state.loading = false;
      state.savedBlog = action.payload;
    })
    .addCase("SavedBlogsFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("likeBlogRequest", (state) => {
      state.loading = true;
    })
    .addCase("likeBlogSuccess", (state, action) => {
      state.loading = false;
      state.like = action.payload;
    })
    .addCase("likeBlogFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })


    .addCase("BookmarkBlogRequest", (state) => {
      state.loading = true;
    })
    .addCase("BookmarkBlogSuccess", (state, action) => {
      state.loading = false;
      state.bookmark = action.payload;
    })
    .addCase("BookmarkBlogFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("FollowingBlogsRequest", (state) => {
      state.loading = true;
    })
    .addCase("FollowingBlogsSuccess", (state, action) => {
      state.loading = false;
      state.followingBlog = action.payload;
    })
    .addCase("FollowingBlogsFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("CategoryRequest", (state) => {
      state.loading = true;
    })
    .addCase("CategorySuccess", (state, action) => {
      state.loading = false;
      state.category = action.payload;
    })
    .addCase("CategoryFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  });
