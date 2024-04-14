<template>
    <div class="login-container">
        <el-form ref="loginForm" @submit.native.prevent="login" class="login-form">
        <h2 class="form-title">登录</h2>
        <el-form-item>
            <el-input v-model="username" placeholder="用户名" clearable></el-input>
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
            <el-button type="primary" @click="login" round>登录</el-button>
            <el-button type="text" @click="goToRegister" class="register-button">没有账号？注册一个</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
export default {
data() {
    return {
    username: '',
    password: ''
    };
},
methods: {
    login() {
    console.log(`登录尝试：用户名=${this.username} 密码=${this.password}`);
    this.$message.success('登录成功！');
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
background-image: url('@/static/pic/103918972_p2.jpg');
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
  