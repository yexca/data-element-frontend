<template>
    <div class="profile-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ $t('employeeCenter.personalInfo') }}</span>
        </div>
        <el-form ref="formRef" :rules="rules" :model="userInfo" class="user-form">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item :label="$t('form.employeeId')">
                        <el-input v-model="userInfo.employeeId" disabled></el-input>
                    </el-form-item>
                </el-col>
                
                <el-col :span="12">
                    <el-form-item :label="$t('form.nickname')">
                        <el-input v-model="userInfo.nickname"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item :label="$t('form.username')">
                        <el-input v-model="userInfo.username" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('form.password')" v-if="role > 0">
                        <el-input type="password" v-model="userInfo.password" show-password placeholder="不填不更新密码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item :label="$t('form.email')">
                        <el-input v-model="userInfo.email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('form.phone')">
                        <el-input v-model="phoneNumber">
                            <template slot="prepend">{{ phonePrefix }}</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-form-item :label="$t('form.gender')">
                        <el-input v-model="userInfo.gender" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item :label="$t('form.country')">
                        <el-input v-model="userInfo.countryName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('form.nin')">
                        <el-input v-model="userInfo.nin" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item :label="$t('form.status')">
                        <el-input v-model="userInfo.status" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="$t('form.role')">
                        <el-input v-model="userInfo.roleName" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

          <el-form-item>
            <el-button type="primary" @click="updateProfile">{{ $t('employeeCenter.updateInfo') }}</el-button>
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
          callback(new Error(this.$t('placeholder.password')));
        } else {
          if (this.form.checkPassword !== '') {
            this.$refs.formRef.validateField('checkPassword');
          }
          callback();
        }
      };
      return {
        role: null,
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
                {pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: this.$t('errorMessage.password'), trigger: 'blur' }
            ],
            email: [
                { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: this.$t('errorMessage.emailFormat'), trigger: 'blur' }
            ],
            phone: [
                { pattern: /^\d{6,11}$/, message: this.$t('errorMessage.phone'), trigger: 'blur' }
            ],
        }
      };
    },
    computed: {
        phonePrefix() {
            if(this.userInfo.phone){
                const parts = this.userInfo.phone.split(' ');
                return parts[0]; // '+86'
            }else{
                return '';
            }
            
        },
        phoneNumber() {
            if(this.userInfo.phone){
                const parts = this.userInfo.phone.split(' ');
                return parts[1] || ''; // '155225'
            }else{
                return '';
            }
            
        }
    },
    created(){
        this.role = localStorage.getItem("adminRole");
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
                    message: this.$t('successMessage.update'),
                    type: 'success'});
                })
            }else{
                this.$message({
                    message: this.$t('errorMessage.validate'),
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
  