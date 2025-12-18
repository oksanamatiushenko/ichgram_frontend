import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPostsByUsername, createPost } from "../../shared/api/post-api";

// Получение постов по username
export const fetchPostsByUsername = createAsyncThunk(
  "posts/fetchByUsername",
  async (username, thunkAPI) => {
    try {
      const posts = await getPostsByUsername(username);
      return posts;
    } catch (err) {console.error(err);
      return thunkAPI.rejectWithValue("Failed to load posts");
    }
  }
);

// Создание нового поста
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async ({ formData, token }, thunkAPI) => {
    try {
      const newPost = await createPost(formData, token);
      return newPost;
    } catch (err) {
        console.error(err);
      return thunkAPI.rejectWithValue("Failed to add post");
    }
  }
);
