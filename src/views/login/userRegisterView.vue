<template>
    <div class="register-container">
      <el-form ref="registerForm" @submit.native.prevent="register" class="register-form">
        <h2 class="form-title">注册</h2>
        <el-form-item>
          <el-input v-model="username" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="email" placeholder="电子邮件" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            v-model="password"
            placeholder="密码"
            show-password
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            v-model="confirmPassword"
            placeholder="确认密码"
            show-password
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register" round>注册</el-button>
          <el-button type="text" @click="goToLogin" class="login-button">已有账号？返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      register() {
        if (this.password !== this.confirmPassword) {
          this.$message.error('密码和确认密码不匹配');
          return;
        }
        console.log(`注册尝试：用户名=${this.username} 邮件=${this.email} 密码=${this.password}`);
        this.$message.success('注册成功！');
      },
      goToLogin() {
        this.$router.push('/login');
      }
    }
  }
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('@/static/pic/103782674_p1.png');
    background-size: cover;
    backdrop-filter: blur(10px);
  }
  
  .register-form {
    padding: 20px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  .form-title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .login-button {
    margin-top: 10px; /* Adds spacing between register and login buttons */
  }
  </style>
  