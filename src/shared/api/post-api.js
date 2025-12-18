import instance from "./instance";

const API_URL = import.meta.env.VITE_API_URL;

export const getPostById = async (postId) => {
  const { data } = await instance.get(`/posts/${postId}`);
  return {
    ...data,
    imageUrl: `${API_URL}${data.imageUrl}`,
  };
};

export const getPostsByUsername = async (username) => {
  const { data } = await instance.get(`/posts/user/${username}`);
  return data.map((post) => ({
    ...post,
    imageUrl: `${API_URL}${post.imageUrl}`,
  }));
};

export const getExplorePosts = async () => {
  const { data } = await instance.get("/posts/explore");

  const normalized = data.map((post) => ({
    ...post,
    imageUrl: `${API_URL}${post.imageUrl}`,
  }));

  return normalized;
};

export const likePost = async (postId) => {
  const { data } = await instance.post(`/posts/${postId}/like`);
  return data;
};

export const unlikePost = async (postId) => {
  const { data } = await instance.post(`/posts/${postId}/unlike`);
  return data;
};

export const createPost = async (imageFile, caption = "") => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("caption", caption);

  const { data } = await instance.post("/posts/create-new-post", formData);
  return data;
};

export const addCommentToPost = async (postId, text, token) => {
  const res = await instance.post(
    `${API_URL}/posts/${postId}/comments`,
    { text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const deletePost = async (postId, token) => {
  const res = await instance.delete(`${API_URL}/posts/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const editPost = async (postId, caption, token) => {
  const res = await instance.put(
    `${API_URL}/posts/${postId}`,
    { caption },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const likeComment = async (postId, commentId, token) => {
  const { data } = await instance.post(
    `${API_URL}/posts/${postId}/comments/${commentId}/like`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const unlikeComment = async (postId, commentId, token) => {
  const { data } = await instance.post(
    `${API_URL}/posts/${postId}/comments/${commentId}/unlike`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};
