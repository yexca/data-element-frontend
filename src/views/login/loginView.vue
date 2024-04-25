<template>
  <div class="login-container">
    <el-form ref="loginForm" @submit.native.prevent="handleLogin" class="form">
      <h2 class="title">员工登录</h2>
      <el-form-item label="用户名" label-width="70px">
        <el-input 
          v-model="loginForm.username" 
          placeholder="请输入用户名" 
          @keyup.enter.native="handleLogin"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="70px">
        <el-input 
          v-model="loginForm.password" 
          type="password" 
          placeholder="请输入密码" 
          @keyup.enter.native="handleLogin"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="handleLogin" round>登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { empLogin } from '@/api/employee';

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    handleLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$message.error('用户名和密码不能为空');
        return;
      }
      empLogin(this.loginForm).then(res => {
          // 登录成功
          localStorage.setItem('adminRole', res.data.data.role);
          localStorage.setItem('adminToken', res.data.data.token);
          this.$message.success('登录成功！');
          // 检查是否有重定向的目标页面，如果有，登录后跳转到该页面
          const redirect = this.$route.query.redirect || '/admin/dashboard'; // 如果没有指定重定向页面，默认跳转到管理仪表板
          this.$router.push(redirect);
      }).catch(() => {
        // this.$message.error('登录失败: ' + error.message);
        return;
      });
    }
  }
}
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('@/assets/pic/adminLogin.webp');
  background-size: cover;
  background-position: center;
}

.form {
  padding: 20px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.el-form-item {
  margin-bottom: 16px; /* Ensure adequate spacing between form items */
}
</style>
