import instance from "./instance";

export const getNotifications = async () => {
  const { data } = await instance.get("/notifications");
  return data;
};

export const markAllNotificationsAsRead = async () => {
  const { data } = await instance.patch("/notifications/read");
  return data;
};

export const deleteNotification = async (notificationId) => {
  const { data } = await instance.delete(`/notifications/${notificationId}`);
  return data;
};

export const deleteOldNotifications = async () => {
  const { data } = await instance.delete("/notifications/cleanup");
  return data;
};
