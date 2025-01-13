import { setCookie } from "nookies";

export const saveToken = (access, refresh) => {
  const maxAge = 1800; // Token expiry time in seconds
  const maxAge2 = 86400; // Token expiry time in seconds
  setCookie(null, "token", access, {
    maxAge,
    path: "/", // Token accessible throughout the app
    httpOnly: false, // Set true if using server-to-client only
  });

  setCookie(null, "refresh", refresh, {
    maxAge:maxAge2,
    path: "/", // Token accessible throughout the app
    httpOnly: false, // Set true if using server-to-client only
  });

};
