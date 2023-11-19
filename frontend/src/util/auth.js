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
