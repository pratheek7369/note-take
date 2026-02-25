export const setToken = (token, username) => {
  localStorage.setItem('jwt_token', token);
  if (username) localStorage.setItem('user_id', username);
};

export const getToken = () => localStorage.getItem('jwt_token');
export const removeToken = () => {
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('user_id');
};
export const getUserId = () => localStorage.getItem('user_id');
export const isAuthenticated = () => !!getToken();