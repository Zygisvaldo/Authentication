import { redirect } from "react-router-dom";

export function storeAuthToken(token) {
  localStorage.setItem("token", token);
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
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
