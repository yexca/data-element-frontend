<template>
  <div>
    用户名
    <el-input v-model="loginForm.username" style="width: 100px;"></el-input>
    密码
    <el-input v-model="loginForm.password" style="width: 100px;"></el-input>
    <el-button @click="handleLogin" type="primary">登录</el-button>
  </div>
</template>

<script>
import {empLogin} from '@/api/employee'
import router from '@/router';

// import request from '@/utils/request'
// import axios from 'axios'


export default {
  data() {
    return {
      loginForm: {
        username: 'yexca',
        password: '123456'
      }
    }
  },
  methods: {
    handleLogin(){
      empLogin(this.loginForm).then(res => {
        // console.log(res.data.data.token);
        localStorage.setItem('token', res.data.data.token);
        router.push('/dashboard')
      })
      // axios.post("/api/admin/employee/login", this.loginForm).then(res => {
      //   console.log(res.data)
      // })
    }
  }
}
</script>

<style>

</style>