import { createSlice } from "@reduxjs/toolkit";
import { fetchPostsByUsername, addNewPost } from "./posts-thunks";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  shouldReloadPosts: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPosts(state) {
      state.posts = [];
      state.error = null;
      state.loading = false;
    },
    setShouldReloadPosts(state, action) {
      state.shouldReloadPosts = action.payload;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsByUsername.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostsByUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addNewPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        state.loading = false;
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPosts, setShouldReloadPosts } = postsSlice.actions;
export default postsSlice.reducer;
