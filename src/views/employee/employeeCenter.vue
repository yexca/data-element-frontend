<template>
    <div class="profile-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        <el-form ref="formRef" :rules="rules" :model="userInfo" class="user-form">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="员工ID">
                        <el-input v-model="userInfo.employeeId" disabled></el-input>
                    </el-form-item>
                </el-col>
                
                <el-col :span="12">
                    <el-form-item label="昵称">
                        <el-input v-model="userInfo.nickname"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="用户名">
                        <el-input v-model="userInfo.username" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="密码">
                        <el-input type="password" v-model="userInfo.password" show-password placeholder="不填不更新密码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="电子邮箱">
                        <el-input v-model="userInfo.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话">
                        <el-input v-model="phoneNumber">
                            <template slot="prepend">{{ phonePrefix }}</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item label="性别">
                        <el-input v-model="userInfo.gender" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="国家或地区">
                        <el-input v-model="userInfo.countryName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="身份证号">
                        <el-input v-model="userInfo.nin" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="状态">
                        <el-input v-model="userInfo.status" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="角色">
                        <el-input v-model="userInfo.roleName" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

          <el-form-item>
            <el-button type="primary" @click="updateProfile">更新信息</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
import { getMyself, updateEmployee } from '@/api/employee'

  export default {
    data() {
        var validatePass = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPassword !== '') {
            this.$refs.formRef.validateField('checkPassword');
          }
          callback();
        }
      };
      return {
        userInfo: {
          employeeId: null,
          username: null,
          password: null,
          nickname: null,
          email: null,
          phone: null,
          gender: null,
          countryName: null,
          nin: null,
          status: null,
          roleName: null
        },
        form: {
            nickname: null,
            email: null,
            phone: null,
            password: null
        },
        rules: {
            password: [
                { validator: validatePass, trigger: 'blur' },
                {pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '密码至少包含字母和数字且最低八位', trigger: 'blur' }
            ],
            email: [
                { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
            ],
            phone: [
                { pattern: /^\d{6,11}$/, message: '电话号码必须为数字且为 6-11 位数字', trigger: 'blur' }
            ],
        }
      };
    },
    computed: {
        phonePrefix() {
            const parts = this.userInfo.phone.split(' ');
            return parts[0]; // '+86'
        },
        phoneNumber() {
            const parts = this.userInfo.phone.split(' ');
            return parts[1] || ''; // '155225'
        }
    },
    mounted(){
        this.fetchProfile();
    },
    methods: {
      fetchProfile() {
        getMyself().then(res => {
            if(res && res.data && res.data.data){
                this.userInfo = res.data.data;
            }else{
                return;
            }
        })
      },
      updateProfile(){
        this.$refs.formRef.validate(valid => {
            if(valid){
                // 规则校验成功
                if(this.userInfo.password != null){
                    this.form.password = this.userInfo.password;
                }
                this.form.nickname = this.userInfo.nickname;
                this.form.phone = this.phoneNumber;
                this.form.email = this.userInfo.email;
                updateEmployee(0, this.form).then(() => {
                    // 成功提醒弹窗
                    this.$message({
                    message: '修改成功',
                    type: 'success'});
                })
            }else{
                this.$message({
                    message: '请检查必填项',
                    type: 'warning'
                    });
            }
        })
      }
    }
  };
  </script>
  
  <style scoped>
  
  .profile-container {
    display: flex;
  justify-content: center;  /* 水平居中 */
    margin: 20px;
  }
  .box-card {
    width: 600px;
  }
  </style>
  