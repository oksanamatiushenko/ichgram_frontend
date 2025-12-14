export const selectAuthRequest = (store) => store.auth;
export const selectUser = (store) => store.auth.user;
export const selectToken = (store) => Boolean(store.auth.accessToken);
