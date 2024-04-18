<template>
    <div class="register-container">

      <!-- <el-form ref="registerForm" @submit.native.prevent="register" class="register-form">
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
      </el-form> -->

      <div v-if="!type">
        <el-form ref="personalForm" :model="form" :rules="personalRules" label-width="100px" size="mini" class="register-form">
          <h2 class="form-title">个人用户注册</h2>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              show-password
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input v-model="form.checkPassword" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname" placeholder="请输入昵称，默认用户名" />
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入电子邮箱" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="form.phone" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 国家或地区选择 -->
          <el-form-item label="国家或地区" prop="countryId">
            <el-select v-model="form.countryId" filterable clearable placeholder="请选择国家或地区">
              <el-option
                v-for="country in countries"
                :key="country.countryId"
                :label="country.name"
                :value="country.countryId"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="身份证号" prop="nin">
            <el-input v-model="form.nin" placeholder="请输入国家身份证号" />
          </el-form-item>

          <el-form-item label="切换注册">
            <el-switch
              v-model="type"
              active-color="#C4E1EB"
              inactive-color="#13ce66"
              inactive-text="个人注册"
              active-text="企业注册">
            </el-switch>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="register" round>注册</el-button>
            <el-button type="text" @click="goToLogin" class="login-button">已有账号？返回登录</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-else>
        <el-form ref="enterpriseForm" status-icon :model="form" :rules="enterpriseRules" label-width="100px" size="mini" class="register-form">
          <h2 class="form-title">企业用户注册</h2>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" show-password placeholder="请输入密码"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input v-model="form.checkPassword" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="企业名" prop="enterpriseName">
            <el-input v-model="form.enterpriseName" placeholder="请输入企业名称" />
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入电子邮箱" />
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入电话号码" />
          </el-form-item>

          <el-form-item label="企业证明" prop="evidence">
            <el-upload
              class="upload-demo"
              :file-list="fileList"
              :http-request="customUpload"
              :before-upload="beforeUpload"
              :before-remove="beforeRemove"
              :on-remove="handleRemove"
              :limit="1"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">文件大小不超过 10MB</div>
            </el-upload>
          </el-form-item>

          <!-- 国家或地区选择 -->
          <el-form-item label="国家或地区" prop="countryId">
            <el-select v-model="form.countryId" filterable clearable placeholder="请选择国家或地区">
              <el-option
                v-for="country in countries"
                :key="country.countryId"
                :label="country.name"
                :value="country.countryId"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="切换注册">
            <el-switch
              v-model="type"
              active-color="#C4E1EB"
              inactive-color="#13ce66"
              inactive-text="个人注册"
              active-text="企业注册">
            </el-switch>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="register" round>注册</el-button>
            <el-button type="text" @click="goToLogin" class="login-button">已有账号？返回登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  import { listAllCountry } from "@/api/userCountry";
  import { personalUserRegister, enterpriseUserRegister } from '@/api/userRegister'

  export default {
    data() {
      // 密码确认--开始
      var validatePassPersonal = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPassword !== '') {
            this.$refs.personalForm.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePassEnterprise = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPassword !== '') {
            this.$refs.enterpriseForm.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePassCheck = (rules, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      // 密码确认--结束
      return {
        form: {},
        // 国家或地区信息表
        countries: [],
        // 用于选中的国家或地区ID
        selectedCountryId: null,
        type: false,
        personalRules :{
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}, // 触发方式为失去焦点
            {pattern: /^[A-Za-z0-9]+$/, message: '用户名只能使用字母和数字', trigger: 'blur'},
            {min: 5, message: '用户名至少五个字符', trigger: 'blur'}
          ],
          password: [
            { validator: validatePassPersonal, trigger: 'blur' },
            {pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '密码至少包含字母和数字且最低八位', trigger: 'blur'}
          ],
          checkPassword: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
          nickname: [
            { pattern: /^[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7afA-Za-z0-9\s]+$/, message: '仅允许汉字、字母、数字、日文和韩文', trigger: 'blur'}
          ],
          email: [
            {pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请输入正确的邮箱格式', trigger: 'blur'}
          ],
          phone: [
            { pattern: /^\d{6,11}$/, message: '手机号必须为数字且为 6-11 位数字', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          countryId: [
            {required: true, message: '请选择国家或地区', trigger: 'change'}
          ],
          nin: [
            {required: true, message: '请输入身份证号', trigger: 'blur'},
            {min: 6, message: '身份证号最短6个字符'}
          ]
        },
        enterpriseRules :{
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}, // 触发方式为失去焦点
            {pattern: /^[A-Za-z0-9]+$/, message: '用户名只能使用字母和数字', trigger: 'blur'},
            {min: 5, message: '用户名至少五个字符', trigger: 'blur'}
          ],
          password: [
            { validator: validatePassEnterprise, trigger: 'blur' },
            {pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '密码至少包含字母和数字且最低八位', trigger: 'blur'}
          ],
          checkPassword: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
          enterpriseName: [
            {required: true, message: '请输入企业名称', trigger: 'blur'},
            { pattern: /^[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7afA-Za-z0-9\s]+$/, message: '仅允许汉字、字母、数字、日文和韩文', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请输入正确的邮箱格式', trigger: 'blur'}
          ],
          phone: [
            { pattern: /^\d{6,11}$/, message: '电话号码必须为数字且为 6-11 位数字', trigger: 'blur'}
          ],
          // evidenceType: [
          //   {required: true, message: '请选择提交证明材料方式', trigger: 'blur'}
          // ],
          evidence: [
            {required: true, message: '请输入企业证明', trigger: 'blur'},
            {pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|ftp:\/\/|hdfs:\/\/)[a-zA-Z0-9\-.]+(\.[a-zA-Z]{2,})?(:[0-9]{1,5})?(\/.*)?$/, message: '请输入正确的链接', trigger: 'blur'}
          ],
          countryId: [
            {required: true, message: '请选择国家或地区', trigger: 'change'}
          ]
        }
      };
    },
    created(){
      // 获取国家或地区信息
      listAllCountry().then((res) => {
        if(res && res.data && res.data.data){
          this.countries = res.data.data;
        }else{
          return;
        }
      });
    },
    methods: {
      register() {
        if (this.type){
          // 企业用户
          this.$refs.enterpriseForm.validate(valid => {
            if(valid){
              // 规则校验成功
              enterpriseUserRegister(this.form).then(res => {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
                // 注册成功后返回登录数据
                localStorage.setItem('role', res.data.data.role);
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('userId', res.data.data.userId);
                // 检查是否有重定向的目标页面，如果有，登录后跳转到该页面
                const redirect = this.$route.query.redirect || '/user/enterprise/' + res.data.data.userId; // 如果没有指定重定向页面，默认跳转到管理仪表板
                this.$router.push(redirect);
              }).catch(error => {
                this.$message.error('注册失败: ' + error.message);
              });
            }else{
              this.$message({
                message: '请检查必填项',
                type: 'warning'
              });
            }
          })
        }else {
          // 个人用户
          this.$refs.personalForm.validate(valid => {
            if(valid){
              // 规则校验成功
              personalUserRegister(this.form).then(res => {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
                // 注册成功后返回登录数据
                localStorage.setItem('role', res.data.data.role);
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('userId', res.data.data.userId);
                // 检查是否有重定向的目标页面，如果有，登录后跳转到该页面
                const redirect = this.$route.query.redirect || '/user/personal/' + res.data.data.userId; // 如果没有指定重定向页面，默认跳转到管理仪表板
                this.$router.push(redirect);
              }).catch(error => {
                this.$message.error('注册失败: ' + error.message);
              });
            }else{
              this.$message({
                message: '请检查必填项',
                type: 'warning'
              });
            }
          })
        }
        // if (this.password !== this.confirmPassword) {
        //   this.$message.error('密码和确认密码不匹配');
        //   return;
        // }
        // console.log(`注册尝试：用户名=${this.username} 邮件=${this.email} 密码=${this.password}`);
        // this.$message.success('注册成功！');
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
  