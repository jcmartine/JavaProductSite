// login
function login() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  // Validate inputs
    const username = document.getElementById("username").value.trim();
    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }
  
  console.log(`Logging in with email: ${email}`);
  
    // admin backdoor
      if (username === "admin" && password === "password") {
      setUser({ username: 'admin' });
    alert("Login successful!");
    // Clear form
      document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    // Redirect to products page
    window.location.href = "Products.html";
      return;
    }

    // check stored users - AI
    const users = getUsers();
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      setUser({ username: found.username, email: found.email });
      alert('Login successful!');
        document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      window.location.href = "Products.html";
    } else {
      alert("Invalid email or password.");
    }
}

    // set and get for user
    function setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    }

    function getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
    }

    // Logout script AI
    function logout() {
    localStorage.removeItem("user");
    window.location.href = "Index.html";
    }

    // users list helpers
    function getUsers() {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    }

    function addUser(user) {
      const users = getUsers();
      if (users.some(u => u.email === user.email)) {
        return false; 
      }
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }



// register
function register() {
  const usernameEl = document.getElementById('username');
  const emailEl = document.getElementById('email');
  const passwordEl = document.getElementById('password');
  const confirmEl = document.getElementById('confirm-password');

  const username = usernameEl ? usernameEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const password = passwordEl ? passwordEl.value : '';
  const confirmPassword = confirmEl ? confirmEl.value : '';

  if (!username) {
    alert('Please enter a username.');
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  if (!password || password.length < 6) {
    alert('Password must be at least 6 characters.');
    return;
  }
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

    const ok = addUser({ username, email, password });
    if (!ok) {
      alert('A user with that email already exists.');
      return;
    }

    console.log(`Registering user: ${username} <${email}>`);
    alert('Registration successful! You can now log in.');
    if (usernameEl) usernameEl.value = '';
    if (emailEl) emailEl.value = '';
    if (passwordEl) passwordEl.value = '';
    if (confirmEl) confirmEl.value = '';
    window.location.href = 'Login.html';
}