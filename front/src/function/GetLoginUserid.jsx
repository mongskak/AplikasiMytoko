export const GetUserId = () => {
  return document.cookie.split("=")[1];
};
