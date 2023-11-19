import { redirect } from "react-router-dom";

export function storeAuthToken(token) {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1); // 1h in the future
  localStorage.setItem("token", token);
  localStorage.setItem("expiration", expiration.toISOString());
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null; // must NOT just 'return' becaus it will be undefined
  }

  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate); // restore from ISOString to a new Date object
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime(); // .getTime() returns time in ms
  return duration;
}

export function tokenLoader() {
  return getAuthToken();
}

// route protection, so that e.x. '/events/new or /edit', would redirect to '/auth' if no token
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}
