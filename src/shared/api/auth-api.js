import instance from "./instance";

export const register = async (payload) => {
  const { data } = await instance.post("/auth/register", payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await instance.post("/auth/login", payload);
  return data;
};

export const logout = async (refreshToken) => {
  const { data } = await instance.post("/auth/logout", { refreshToken });
  return data;
};

export const getCurrent = async (accessToken) => {
  const { data } = await instance.get("/auth/current", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};
