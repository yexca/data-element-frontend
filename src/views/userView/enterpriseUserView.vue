<template>
    <!-- <div class="main">
      <div class="userInfo">
          <el-form :model="form" label-width="100px">
            <el-form-item label="userId" disabled="false" prop="userId"></el-form-item>
          </el-form>
      </div>
    </div> -->
    <div class="layout-container">
      <!-- 基本信息 -->
      <el-card class="info-card" shadow="hover">
        <div slot="header" class="header">{{ $t('userView.enterpriseTitle') }}</div>
        <el-divider content-position="left">{{ $t('userView.baseInfo') }}</el-divider>
        <el-row :gutter="20">
          <el-col :span="8"
            ><strong>{{ $t('userView.userId') }}</strong> {{ userInfo.userId }}</el-col
          >
          <el-col :span="8"
            ><strong>{{ $t('userView.username') }}</strong> {{ userInfo.username }}</el-col
          >
          <el-col :span="8"
            ><strong>{{ $t('userView.enterprise') }}</strong> {{ userInfo.enterpriseName }}</el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-divider>{{ $t('userView.otherInfo') }}</el-divider>
          <el-col :span="8"
            ><strong>{{ $t('userView.country') }}</strong> {{ userInfo.countryName }}</el-col
          >
          <el-col :span="8"><strong>{{ $t('userView.status') }}</strong> {{ userInfo.status == '启用' ? $t('option.enable') : $t('option.disable') }}</el-col>
        </el-row>
  
        <el-divider content-position="right">{{ $t('userView.concatInfo') }}</el-divider>
        <el-row :gutter="20">
          <el-col :span="12"
            ><strong>{{ $t('userView.phone') }}</strong> {{ userInfo.phone || $t('userView.noInfo') }}</el-col
          >
          <el-col :span="12"
            ><strong>{{ $t('userView.email') }}</strong> {{ userInfo.email || $t('userView.noInfo') }}</el-col
          >
        </el-row>
  
        <el-row v-if="isCurrentUser">
          <el-divider></el-divider>
          <el-col :span="24">
            <el-button @click="handleUpdateUserInfo" type="primary"
              >{{ $t('userView.editInfo') }}</el-button
            >
          </el-col>
        </el-row>
      </el-card>
  
      <!-- 个人信息修改弹窗 -->
      <el-dialog :title="$t('formTitle.updateEnterpriseUser')" :visible.sync="openDialog">
        <el-form
          ref="userForm"
          :model="userForm"
          :rules="userRules"
          label-width="80px"
        >
          <el-form-item :label="$t('form.username')" prop="username">
            <el-input v-model="userForm.username" :placeholder="$t('placeholder.username')" />
          </el-form-item>
          <el-form-item :label="$t('form.password')" prop="password">
            <el-input
              v-model="userForm.password"
              type="password"
              show-password
              :placeholder="$t('placeholder.password')"
            />
          </el-form-item>
          <el-form-item :label="$t('form.checkPassword')" prop="checkPassword">
            <el-input
              v-model="userForm.checkPassword"
              :placeholder="$t('placeholder.checkPassword')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('form.enterpriseName')" prop="enterpriseName">
            <el-input
              v-model="userForm.enterpriseName"
              :placeholder="$t('placeholder.enterpriseName')"
            />
          </el-form-item>
          <el-form-item :label="$t('form.email')" prop="email">
            <el-input v-model="userForm.email" :placeholder="$t('placeholder.email')" />
          </el-form-item>
          <el-form-item :label="$t('form.phone')" prop="phone">
            <el-input
              v-model.number="userForm.phone"
              :placeholder="$t('placeholder.phone')"
            />
          </el-form-item>

          <el-form-item :label="$t('form.evidence')" prop="evidence">
          <el-upload
            class="upload-demo"
            :file-list="fileList"
            :http-request="customUpload"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :limit="1"
          >
            <el-button size="small" type="primary">{{ $t('formOperation.upload') }}</el-button>
            <div slot="tip" class="el-upload__tip">{{ $t('placeholder.upload') }}</div>
          </el-upload>
        </el-form-item>
  
      <!-- 国家或地区选择 -->
          <el-form-item :label="$t('form.country')" prop="countryId">
            <el-select
              v-model="userForm.countryId"
              filterable
              clearable
              :placeholder="$t('placeholder.country')"
            >
              <el-option
                v-for="country in countries"
                :key="country.countryId"
                :label="country.name"
                :value="country.countryId"
              ></el-option>
            </el-select>
          </el-form-item>
  
        </el-form>
        <div class="dialog-footer" slot="footer">
          <el-button type="primary" @click="submitUserForm">{{ $t('drawOperation.submit') }}</el-button>
          <el-button type="info" @click="resetUserForm">{{ $t('drawOperation.reset') }}</el-button>
          <el-button @click="cancelUserForm">{{ $t('drawOperation.cancel') }}</el-button>
        </div>
      </el-dialog>
  
      
  
      <!-- CRUD 操作表格部分 -->
      <el-card class="crud-table">
        <div slot="header" class="header">{{ $t('userView.userData') }}</div>
        <!-- 表格和相关操作按钮放在这里 -->
        <div class="content-main">
          <!-- 表格主体 -->
          <el-table :data="tableData" v-loading="loading" stripe>
            <el-table-column
              prop="dataId"
              label="ID"
              width="60"
              sortable
              fixed="left"
            >
            </el-table-column>
            <el-table-column prop="name" :label="$t('form.name')" width="100" sortable>
            </el-table-column>
            <el-table-column prop="description" :label="$t('form.description')" width="400">
            </el-table-column>
            <el-table-column
              prop="categoryName"
              :label="$t('form.category')"
              width="100"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="username" :label="$t('form.username')" width="120" sortable>
            </el-table-column>
            <el-table-column prop="fileLink" :label="$t('form.fileLink')" width="170">
              <template slot-scope="scope">
                <a :href="scope.row.fileLink" target="_blank">{{ $t('search.download') }}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              :label="$t('form.status')"
              width="80"
              fixed="right"
              align="center"
              v-if="isCurrentUser"
            >
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status == '启用'"
                  >{{ $t('option.enable') }}</el-tag
                >
                <el-tag type="danger" v-if="scope.row.status == '禁用'"
                  >{{ $t('option.disable') }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="260"
              fixed="right"
              v-if="isCurrentUser"
            >
              <template slot="header">
                <el-button @click="handleAdd">{{ $t('formOperation.add') }}</el-button>
              </template>
              <template slot-scope="scope">
                <el-button
                  v-show="scope.row.status == '启用'"
                  type="info"
                  size="mini"
                  icon="el-icon-circle-close"
                  @click="handleStatus(scope.row, 1)"
                  >{{ $t('option.disable') }}</el-button
                >
                <el-button
                  v-show="scope.row.status == '禁用'"
                  style="margin-left: 0"
                  type="success"
                  size="mini"
                  icon="el-icon-circle-check"
                  @click="handleStatus(scope.row, 0)"
                  >{{ $t('option.enable') }}</el-button
                >
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                  >{{ $t('option.edit') }}</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                  >{{ $t('option.delete') }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="content-footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-card>
  
      <!-- 添加或修改员工信息右侧抽屉 -->
      <el-drawer
        :title="drawerTitle"
        :visible.sync="openDrawer"
        width="500px"
        append-to-body
      >
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="100px"
          class="drawer-form"
        >
          <el-form-item :label="$t('form.name')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('placeholder.name')" />
        </el-form-item>
        <!-- <el-form-item label="企业" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入企业ID" />
        </el-form-item> -->
        <el-form-item :label="$t('form.description')" prop="description">
          <el-input v-model="form.description" :placeholder="$t('placeholder.description')" />
        </el-form-item>
  
          <!-- 分类选择 -->
          <el-form-item :label="$t('form.category')" prop="categoryId">
            <el-select
              v-model="form.categoryId"
              filterable
              clearable
              :placeholder="$t('placeholder.category')"
            >
              <el-option
                v-for="category in categories"
                :key="category.categoryId"
                :label="category.name"
                :value="category.categoryId"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('form.sampleFile')" prop="sampleFileLink">
          <el-upload
            class="upload-demo"
            :file-list="fileList"
            :http-request="customUpload"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :limit="1"
          >
            <el-button size="small" type="primary">{{ $t('formOperation.upload') }}</el-button>
            <div slot="tip" class="el-upload__tip">{{ $t('placeholder.upload') }}</div>
          </el-upload>
        </el-form-item>
  
        <el-form-item :label="$t('form.fileLink')" prop="fileLink">
          <el-input v-model="form.fileLink" :placeholder="$t('placeholder.fileLink')"></el-input>
        </el-form-item>
        
        </el-form>
        <div
          class="demo-drawer__footer"
          style="display: flex; justify-content: space-around"
        >
          <el-button type="primary" @click="submitForm">{{ $t('drawOperation.submit') }}</el-button>
          <el-button type="info" @click="resetForm">{{ $t('drawOperation.reset') }}</el-button>
          <el-button @click="cancel">{{ $t('drawOperation.cancel') }}</el-button>
        </div>
      </el-drawer>
  
    </div>
  </template>
  
  <script>
  import {
    getEnterpriseUser,
    getEnterpriseUserUpdate,
    updateEnterpriseUser,
  } from "@/api/userEnterpriseUser";
  import {
    addEnterpriseData,
    delEnterpriseData,
    listEnterpriseData,
    updateEnterpriseData,
    getEnterpriseData,
  } from "@/api/userEnterpriseData";
  import { upload, deleteFile } from "@/api/userFile";
  import { listAllCategory } from "@/api/userCategory";
  import { listAllCountry } from "@/api/userCountry";
  
  export default {
    props: {
      userId: {
        type: Number,
        required: true,
      },
    },
    data() {
      // 密码确认--开始
      var validatePass = (rules, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('placeholder.password')));
          } else {
            if (this.form.checkPassword !== '') {
              this.$refs.form.validateField('checkPassword');
            }
            callback();
          }
        };
        var validatePass2 = (rules, value, callback) => {
          if (value === '') {
            callback(new Error(this.$t('placeholder.checkPassword')));
          } else if (value !== this.form.password) {
            callback(new Error(this.$t('errorMessage.checkPassword')));
          } else {
            callback();
          }
        };
      // 密码确认--结束
      return {
        userInfo: null,
        userForm: {},
        // 个人数据
        loading: true,
        queryParams: {
          page: 1,
          pageSize: 5,
          dataId: null,
          userId: null,
          name: null,
          description: null,
          categoryId: null,
          fileLink: null,
          status: null,
        },
        // 上传文件列表
        fileList: [],
        tableData: [],
        total: null,
        // 是否显示右侧抽屉
        openDrawer: false,
        // 右侧抽屉标题
        drawerTitle: "",
        // 是否显示弹窗
        openDialog: false,
        // 右侧抽屉表单参数
        form: {},
        // 分类信息表
        categories: [],
        // 用于选中的分类ID
        selectedCategoryId: null,
        // 国家或地区信息表
        countries: [],
        // 用于选中的国家或地区ID
        selectedCountryId: null,
        // 表单规则
        rules: {
          name: [
            { required: true, message: this.$t('errorMessage.name'), trigger: "blur" },
            {
              pattern: /^[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7afA-Za-z0-9\s]+$/,
              message: this.$t('errorMessage.nickname'),
              trigger: "blur",
            },
          ],
          userId: [
            { required: true, message: this.$t('errorMessage.userId'), trigger: "blur" },
            { pattern: /^[0-9]+$/, message: this.$t('errorMessage.userIdLimit'), trigger: "blur" },
          ],
          categoryId: [
            { required: true, message: this.$t('errorMessage.category'), trigger: "change" },
          ],
          sampleFileLink: [
            {required: true, message: this.$t('errorMessage.sampleFile'), trigger: 'change'}
          ],
          fileLink: [
            { required: true, message: this.$t('errorMessage.fileLink'), trigger: "blur" },
            {
              pattern:
                /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|ftp:\/\/|hdfs:\/\/)[a-zA-Z0-9\-.]+(\.[a-zA-Z]{2,})?(:[0-9]{1,5})?(\/.*)?$/,
              message: this.$t('errorMessage.fileLinkLimit'),
              trigger: "blur",
            },
          ],
        },
        // 个人信息表单规则
        userRules: {
          username: [
            {required: true, message: this.$t('errorMessage.username'), trigger: 'blur'}, // 触发方式为失去焦点
            {pattern: /^[A-Za-z0-9]+$/, message: this.$t('errorMessage.usernameLimit'), trigger: 'blur'},
            {min: 5, message: this.$t('errorMessage.usernameLong'), trigger: 'blur'}
          ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            {pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: this.$t('errorMessage.password'), trigger: 'blur'}
          ],
          checkPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          nickname: [
            { pattern: /^[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7afA-Za-z0-9\s]+$/, message: this.$t('errorMessage.nickname'), trigger: 'blur'}
          ],
          email: [
            {pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: this.$t('errorMessage.email'), trigger: 'blur'}
          ],
          phone: [
            { pattern: /^\d{6,11}$/, message: this.$t('errorMessage.phone'), trigger: 'blur'}
          ],
          gender: [
            {required: true, message: this.$t('errorMessage.gender'), trigger: 'change'}
          ],
          countryId: [
            {required: true, message: this.$t('errorMessage.country'), trigger: 'change'}
          ],
          nin: [
            {required: true, message: this.$t('errorMessage.nin'), trigger: 'blur'},
            {min: 6, message: this.$t('errorMessage.ninLong')}
          ]
        }
      };
    },
    created() {
      // 获取用户信息
      this.fetchUser();
      // 获取个人数据
      this.fetchList();
      // 检查当前用户
      this.checkCurrentUser();
      // 获取当前登录用户个人信息
      // this.fetchCurrentUser();
    },
    mounted() {
      // 获取分类信息
      listAllCategory().then((res) => {
        if(res && res.data && res.data.data){
          this.categories = res.data.data;
        }else{
          return;
        }
        // console.log(this.categories)
      });
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
      fetchUser() {
        getEnterpriseUser(this.userId).then((res) => {
          if (res && res.data && res.data.data) {
            this.userInfo = res.data.data;
          } else {
            return;
          }
        });
      },
      fetchList() {
        this.loading = true;
        this.queryParams.userId = this.userId;
        listEnterpriseData(this.queryParams).then((res) => {
          if(res && res.data && res.data.data){
            this.tableData = res.data.data.records;
            this.total = res.data.data.total;
          }else{
            return;
          }
          this.loading = false;
        });
      },
      fetchCurrentUser() {
        getEnterpriseUserUpdate().then((res) => {
          if (res && res.data && res.data.data) {
            this.userForm = res.data.data;
          } else {
            return;
          }
        });
      },
      handleSizeChange(val) {
        this.queryParams.pageSize = val;
        this.fetchList();
      },
      handleCurrentChange(val) {
        this.queryParams.page = val;
        this.fetchList();
      },
      checkCurrentUser() {
        if (localStorage.getItem('role') != '102'){
          this.isCurrentUser = false;
        }else {
          const currentUserId = localStorage.getItem("userId");
          this.isCurrentUser = this.userId.toString() === currentUserId;
        }
      },
      // 表单重置
      reset() {
        this.form.name = null;
        this.form.description = null;
        this.form.categoryId = null;
        this.form.fileLink = null
        // this.form = {
        //   dataId: null,
        //   userId: null,
        //   name: null,
        //   description: null,
        //   categoryId: null,
        //   fileLink: null,
        //   status: null,
        // };
      },
      // 弹窗表单重置
      resetUserForm() {
        this.fetchCurrentUser();
        // this.userForm = {
        //   userId: null,
        //   username: null,
        //   nickname: null,
        //   email: null,
        //   phone: null,
        //   gender: null,
        //   countryId: null,
        //   nin: null,
        // };
      },
      // 右侧抽屉取消
      cancel() {
        this.openDrawer = false;
        this.openDialog = false;
        this.reset();
        this.resetUserForm;
        this.fileList = [];
      },
      // 右侧抽屉内容重置
      resetForm() {
        this.reset();
      },
      // 修改按钮操作
      handleUpdate(row) {
        this.reset();
        const dataId = row.dataId;
        getEnterpriseData(dataId).then((res) => {
          this.form = res.data.data;
          // 填充文件链接到fileList
          this.fileList = [];
          this.fileList.push({
            name: this.form.name,
            url: this.form.fileLink,
          });
          // console.log(this.form)
          // 显示右侧抽屉
          this.drawerTitle = this.$t('formTitle.updateEnterpriseData');
          this.openDrawer = true;
        });
      },
      // 新增按钮操作
      handleAdd() {
        this.reset();
        this.drawerTitle = this.$t('errorMessage.addEnterpriseData');
        this.openDrawer = true;
      },
      // 删除按钮操作
      handleDelete(row) {
        const dataId = row.dataId;
        delEnterpriseData(dataId).then(() => {
          // 成功提醒弹窗
          this.$message({
            message: this.$t('successMessage.delete'),
            type: "success",
          });
        });
      },
      // 弹窗提交按钮
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            // 规则校验成功
            if (this.form.dataId != null) {
                updateEnterpriseData(this.form.dataId, this.form).then(() => {
                // 成功提醒弹窗
                this.$message({
                  message: this.$t('successMessage.update'),
                  type: "success",
                });
                // 关闭弹窗
                this.openDrawer = false;
                this.fetchList();
              });
            } else {
              addEnterpriseData(this.form).then(() => {
                // 成功提醒弹窗
                this.$message({
                  message: this.$t('successMessage.add'),
                  type: "success",
                });
                // 关闭弹窗
                this.openDrawer = false;
                this.fetchList();
              });
            }
          } else {
            this.$message({
              message: this.$t('errorMessage.validate'),
              type: "warning",
            });
          }
        });
      },
      // 状态禁用或启用
      handleStatus(row, status) {
        this.reset();
        this.form.status = status;
        updateEnterpriseData(row.dataId, this.form).then(() => {
          // 成功提醒弹窗
          this.$message({
            message: this.$t('successMessage.update'),
            type: "success",
          });
          // 重新获取列表
          this.fetchList();
        });
      },
      // 上传文件
      customUpload(file) {
        upload(file)
          .then((res) => {
            this.$notify({
              title: this.$t('notifyTitle.success'),
              message: this.$t('notifyMessage.uploadSuccess'),
              type: "success",
              duration: 1000,
            });
            console.log(res.data.data);
            this.form.fileLink = res.data.data;
          })
          .catch(() => {
            this.$notify({
              title: this.$t('notifyTitle.error'),
              message: this.$t('notifyMessage.uploadFail'),
              type: "error",
              duration: 1000,
            });
          });
      },
      // 删除文件的逻辑
      handleRemove() {
        if (!this.form.fileLink) {
          return this.$notify({
            title: this.$t('notifyTitle.warn'),
            message: this.$t('notifyMessage.noFileToDelete'),
            type: "warning",
            duration: 1500,
          });
        } else {
          this.$notify({
            title: this.$t('notifyTitle.message'),
            message: this.$t('notifyMessage.fileDeleting'),
            duration: 1500,
          });
          deleteFile({ file: this.form.fileLink })
            .then(() => {
              this.$notify({
                title: this.$t('notifyTitle.success'),
                message: this.$t('notifyMessage.fileDeleteSuccess'),
                type: "success",
                duration: 1000,
              });
              this.form.fileLink = null; // 清空fileLink
            })
            .catch(() => {
              this.$notify({
                title: this.$t('notifyTitle.error'),
                message: this.$t('notifyMessage.fileDeleteFail'),
                type: "error",
                duration: 1000,
              });
            });
        }
      },
      // 上传文件前
      // beforeUpload(file){
      beforeUpload() {
        this.$notify({
          title: this.$t('notifyTitle.message'),
          message: this.$t('notifyMessage.fileUploading'),
          duration: 1000,
        });
      },
      // 在移除文件前
      // beforeRemove(file, fileList){
      beforeRemove(file) {
        const message = this.$t('confirm.remove', { filename: file.name });
        return this.$confirm(message);
      },
      // 修改个人信息
      handleUpdateUserInfo() {
        this.fetchCurrentUser();
        this.openDialog = true;
      },
      submitUserForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            // 规则校验成功
            updateEnterpriseUser(this.userForm).then(() => {
              // 成功提醒弹窗
              this.$message({
                message: this.$t('successMessage.update'),
                type: "success",
              });
              // 关闭弹窗
              this.openDialog = false;
              this.fetchUser();
            });
          } else {
            this.$message({
              message: this.$t('errorMessage.validate'),
              type: "warning",
            });
          }
        });
      },
    },
  };
  </script>
  
  <style>
  .layout-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    background-image: url('@/assets/pic/enterprise.webp');
    background-size: cover;
    background-attachment: fixed;  /* 确保背景图片固定 */
    min-height: 100vh;
  }
  
  .info-card {
    width: 100%;
    max-width: 800px; /* 适当调整宽度 */
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.8);
  }
  
  .crud-table {
    width: 100%;
    max-width: 1000px; /* 适当调整宽度 */
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.8);
  }
  
  .header {
    font-size: 20px;
    color: #333;
  }
  </style>