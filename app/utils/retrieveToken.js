import { parseCookies, destroyCookie } from "nookies";

export const getToken = () => {
  const cookies = parseCookies();
  const token = cookies.token;

  if (!token) {
    return null;
  }

  return token;
};

export const getRefresh = () => {
  const cookies = parseCookies();
  const user = cookies.refresh;

  if (!user) {
    return null;
  }

  return user;
};


export const removeToken = () => {
  destroyCookie(null, "token", { path: "/" });
  destroyCookie(null, "refresh", { path: "/" });
  // destroyCookie(null, "user", { path: "/" });
};
