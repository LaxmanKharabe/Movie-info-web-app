const AuthService = {
  signup: ({ username, email, password }) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  },

  login: ({ username, password }) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.username === username && u.password === password);
    return user;
  },
};

export default AuthService;




