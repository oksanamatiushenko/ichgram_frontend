import instance from "./instance";

export const getUserById = async (userId, token) => {
  const { data } = await instance.get(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getUserByUsername = async (username) => {
  const token = localStorage.getItem("accessToken");

  const { data } = await instance.get(`/users/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const updateUserProfile = async (username, formData) => {
  const token = localStorage.getItem("accessToken");
  const { data } = await instance.patch(`/users/${username}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.user;
};

export const searchUsers = async (query) => {
  const token = localStorage.getItem("accessToken");

  const { data } = await instance.get("/users/search", {
    params: { query },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const followUser = async (userId) => {
  const token = localStorage.getItem("accessToken");
  const { data } = await instance.post(`/users/${userId}/follow`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const unfollowUser = async (userId) => {
  const token = localStorage.getItem("accessToken");
  const { data } = await instance.post(`/users/${userId}/unfollow`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
