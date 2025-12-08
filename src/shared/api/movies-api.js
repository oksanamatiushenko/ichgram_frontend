import instance from "./instance";
import { store } from "../../redux/store";

export const getMovies = async () => {
  try {
    const { data } = await instance.get("/movies");
    return data;
  } catch (error) {
    if (error.status === 401 && error.message === "accessToken expired") {
      const { auth } = store.getState();
      const { data } = await instance.post("/auth/refresh", {
        refreshToken: auth.refreshToken,
      });
      instance.defaults.headers["Autorization"] = `Bearer ${data.accessToken}`
    }
  }
};
