<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login" class="login-form">
        <label for="username">Username:</label>
        <input type="username" id="username" v-model="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
        <button type="submit" class="login-button">Login</button>
      </form>
      <router-link to="/register" class="register-link">Don't have an account? Register here</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async login() {
        const loginData = {
          username: this.username,
          password: this.password,
        };
        try{
            const response = await axios.post('/api/login', loginData);
            console.log(response.data);
            if (response.data.loggedIn) {
                this.$store.commit('setAuthenticated', true);
                this.$store.commit('setUserId', response.data.userId);
                this.$router.push('/products');
            }
            else if(response.status === 401) {
                alert('Username or password is incorrect');
            }
        } 
        catch (error) {
            console.log(error);
        }
        console.log('Login:', this.username, this.password);
      },
    },
  };
  </script>
  
  <style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

h2 {
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

label {
  margin-top: 10px;
}

input {
  padding: 8px;
  margin-top: 4px;
  width: 100%;
}

button.login-button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button.login-button:hover {
  background-color: #3a9d7c;
}

.register-link {
  margin-top: 20px;
  text-decoration: none;
  color: #42b983;
}
</style>