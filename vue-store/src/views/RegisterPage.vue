<template>
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="register" class="register-form">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>
        <label for="age">Age:</label>
        <input type="number" id="age" v-model="age" required>
        <label for="tel">Tel:</label>
        <input type="tel" id="tel" v-model="tel" required>
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="address" required>
        <label for="gender">Gender</label>
        <select id="gender" v-model="gender" required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required>
        <!-- Additional fields -->
        <button type="submit" class="register-button">Register</button>
      </form>
      <router-link to="/login" class="login-link">Already have an account? Login here</router-link>
    </div>
</template>
  <script>
  import axios from 'axios';
  export default {
    name: 'RegisterPage',
    data() {
      return {
        username: '',
        password: '',
        name: '',
        age: null,
        tel: '',
        address: '',
        gender: '',
        email: '',
      };
    },
    methods: {
      async register() {
        const registerData = {
            username: this.username,
            password: this.password,
            name: this.name,
            age: this.age,
            tel: this.tel,
            address: this.address,
            gender: this.gender,
            email: this.email,
        }
        try{
            const response = await axios.post('/api/register', registerData)
            console.log(response.data)
            if (response.status === 400 && response.data.message === 'Username is already taken') {
                // Display an error message to the user indicating that the username is already taken
                alert('Username is already taken. Please choose a different username.');
            } else {
                // Registration was successful
                alert('Registration successful');
            }
        } catch (error) {
            // Handle registration errors
            if (error.response) {
                console.log(error.response.data); // Handle the error response data
            } else {
                console.error(error); // Log any other errors that occurred during the registration process
            }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .register-form {
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
  
  button.register-button {
    margin-top: 20px;
    padding: 8px 16px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button.register-button:hover {
    background-color: #3a9d7c;
  }
  
  .login-link {
    margin-top: 20px;
    text-decoration: none;
    color: #42b983;
  }
  </style>