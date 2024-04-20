<template>
    <div class="login-container">
        <el-form ref="loginForm" @submit.native.prevent="login" class="login-form">
        <h2 class="form-title">登录</h2>
        <el-form-item label="用户名" label-width="70px">
            <el-input
             v-model="loginForm.username"
             placeholder="请输入用户名"
             clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px">
            <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            show-password
            clearable>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="personalLogin" round>个人登录</el-button>
            <el-button type="primary" @click="enterpriseLogin" round>企业登录</el-button>
            <el-button type="text" @click="goToRegister" class="register-button">没有账号？注册一个</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
import { personalUserLogin, enterpriseUserLogin } from '@/api/userLogin'

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
    personalLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$message.error('用户名和密码不能为空');
        return;
      }
      personalUserLogin(this.loginForm).then(res => {
        // 假设登录成功后后端会返回一个token和用户角色信息
        localStorage.setItem('role', res.data.data.role);
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem('userId', res.data.data.userId);
        this.$message.success('登录成功！');
        // 检查是否有重定向的目标页面，如果有，登录后跳转到该页面
        const redirect = this.$route.query.redirect || '/user/personal/' + res.data.data.userId; // 如果没有指定重定向页面，默认跳转到管理仪表板
        this.$router.push(redirect);
      }).catch(error => {
        this.$message.error('登录失败: ' + error.message);
      });
    },
    enterpriseLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        this.$message.error('用户名和密码不能为空');
        return;
      }
      enterpriseUserLogin(this.loginForm).then(res => {
        // 假设登录成功后后端会返回一个token和用户角色信息
        localStorage.setItem('role', res.data.data.role);
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem('userId', res.data.data.userId);
        this.$message.success('登录成功！');
        // 检查是否有重定向的目标页面，如果有，登录后跳转到该页面
        const redirect = this.$route.query.redirect || '/user/enterprise/' + res.data.data.userId; // 如果没有指定重定向页面，默认跳转到管理仪表板
        this.$router.push(redirect);
      }).catch(error => {
        this.$message.error('登录失败: ' + error.message);
      });
    },
    goToRegister() {
    this.$router.push('/register');
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
background-image: url('@/assets/pic/userLogin.png');
background-size: cover;
backdrop-filter: blur(10px);
}

.login-form {
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

.register-button {
  margin-left: 10px;
}
</style>
  