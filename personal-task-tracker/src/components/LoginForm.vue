<template>
    <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <input v-model="username" placeholder="Username" required />
          <input v-model="password" type="password" placeholder="Password" required />
          <button type="submit">Login</button>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: ''
      };
    },
    methods: {
      handleLogin() {
        console.log("LoginForm: Login attempted with", this.username, this.password);
        if (this.username === 'admin' && this.password === '1234') {
          console.log("LoginForm: emitting login-success");
          this.$emit('login-success', this.username);

        } else {
          this.error = 'Invalid credentials';
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to right, #ece9e6, #ffffff);
  }
  
  .login-box {
    background-color: #fff;
    padding: 2rem 2.5rem;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 320px;
  }
  
  h2 {
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 0.6rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
  }
  
  button {
    width: 100%;
    padding: 0.6rem;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    margin-top: 0.8rem;
    color: red;
    font-size: 0.9rem;
  }
  </style>
  