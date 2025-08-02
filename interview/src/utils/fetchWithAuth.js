export async function  fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });

  let data;
  try {
    data = await response.clone().json();
  } catch (err) {
    data = null;
  }

  if (response.status === 401 || data?.status === "Token is Expired") {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
    return;
  }

  return response;
}
