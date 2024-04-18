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
      <div slot="header" class="header">个人用户信息</div>
      <el-divider content-position="left">基本信息</el-divider>
      <el-row :gutter="20">
        <el-col :span="8"
          ><strong>用户ID:</strong> {{ userInfo.userId }}</el-col
        >
        <el-col :span="8"
          ><strong>用户名:</strong> {{ userInfo.username }}</el-col
        >
        <el-col :span="8"
          ><strong>昵称:</strong> {{ userInfo.nickname }}</el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-divider>个人信息</el-divider>
        <el-col :span="8"><strong>性别:</strong> {{ userInfo.gender }}</el-col>
        <el-col :span="8"
          ><strong>国家:</strong> {{ userInfo.countryName }}</el-col
        >
        <el-col :span="8"><strong>状态:</strong> {{ userInfo.status }}</el-col>
      </el-row>

      <el-divider content-position="right">联系方式</el-divider>
      <el-row :gutter="20">
        <el-col :span="12"
          ><strong>电话:</strong> {{ userInfo.phone || "未填写" }}</el-col
        >
        <el-col :span="12"
          ><strong>电子邮件:</strong> {{ userInfo.email || "未填写" }}</el-col
        >
      </el-row>

      <el-row v-if="isCurrentUser">
        <el-divider></el-divider>
        <el-col :span="24">
          <el-button @click="handleUpdateUserInfo" type="primary"
            >修改信息</el-button
          >
        </el-col>
      </el-row>
    </el-card>

    <!-- 个人信息修改弹窗 -->
    <el-dialog title="修改个人信息" width="30%" :visible.sync="openDialog" >
      <el-form
        ref="userForm"
        :model="userForm"
        :rules="userRules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="userForm.password"
            type="password"
            show-password
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input
            v-model="userForm.checkPassword"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="userForm.nickname"
            placeholder="请输入昵称，默认用户名"
          />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入电子邮箱" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model.number="userForm.phone"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="userForm.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>

    <!-- 国家或地区选择 -->
        <el-form-item label="国家或地区" prop="countryId">
          <el-select
            v-model="userForm.countryId"
            filterable
            clearable
            placeholder="请选择国家或地区"
          >
            <el-option
              v-for="country in countries"
              :key="country.countryId"
              :label="country.name"
              :value="country.countryId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="身份证号" prop="nin">
          <el-input v-model="userForm.nin" placeholder="请输入国家身份证号" />
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button type="primary" @click="submitUserForm">确 定</el-button>
        <el-button type="info" @click="resetUserForm">重 置</el-button>
        <el-button @click="cancelUserForm">取 消</el-button>
      </div>
    </el-dialog>

    

    <!-- CRUD 操作表格部分 -->
    <el-card class="crud-table">
      <div slot="header" class="header">用户数据</div>
      <!-- 表格和相关操作按钮放在这里 -->
      <div class="content-main">
        <!-- 表格主体 -->
        <el-table :data="tableData" v-loading="loading" stripe >
          <el-table-column
            prop="dataId"
            label="ID"
            width="60"
            sortable
            fixed="left"
          >
          </el-table-column>
          <el-table-column prop="name" label="名称" width="100" sortable>
          </el-table-column>
          <el-table-column prop="description" label="描述" width="400">
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="分类"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="120" sortable>
          </el-table-column>
          <el-table-column prop="fileLink" label="文件链接" width="170">
            <template slot-scope="scope">
              <a :href="scope.row.fileLink" target="_blank">点击下载<!--{{ scope.row.name }}--></a>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="80"
            fixed="right"
            align="center"
            v-if="isCurrentUser"
          >
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.status == '启用'"
                >启用</el-tag
              >
              <el-tag type="danger" v-if="scope.row.status == '禁用'"
                >禁用</el-tag
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
              <el-button @click="handleAdd">新增</el-button>
            </template>
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.status == '启用'"
                type="info"
                size="mini"
                icon="el-icon-circle-close"
                @click="handleStatus(scope.row, 1)"
                >禁用</el-button
              >
              <el-button
                v-show="scope.row.status == '禁用'"
                style="margin-left: 0"
                type="success"
                size="mini"
                icon="el-icon-circle-check"
                @click="handleStatus(scope.row, 0)"
                >启用</el-button
              >
              <el-button
                size="mini"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                >删除</el-button
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
        <el-form-item label="数据名" prop="name">
          <el-input v-model="form.name" placeholder="请输入数据名" />
        </el-form-item>
        <el-form-item label="用户" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description" placeholder="请输入描述" />
        </el-form-item>

        <!-- 分类选择 -->
        <el-form-item label="分类" prop="categoryId">
          <el-select
            v-model="form.categoryId"
            filterable
            clearable
            placeholder="请选择分类"
          >
            <el-option
              v-for="category in categories"
              :key="category.categoryId"
              :label="category.name"
              :value="category.categoryId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="数据文件" prop="fileLink">
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
      </el-form>
      <div
        class="demo-drawer__footer"
        style="display: flex; justify-content: space-around"
      >
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button type="info" @click="resetForm">重 置</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import {
  getPersonalUser,
  getPersonalUserUpdate,
  updatePersonalUser,
} from "@/api/userPersonalUser";
import {
  addPersonalData,
  delPersonalData,
  listPersonalData,
  updatePersonalData,
  getPersonalData,
} from "@/api/userPersonalData";
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
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPassword !== '') {
            this.$refs.form.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rules, value, callback) => {
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
          { required: true, message: "请输入数据名", trigger: "blur" },
          {
            pattern: /^[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7afA-Za-z0-9\s]+$/,
            message: "仅允许汉字、字母、数字、日文和韩文",
            trigger: "blur",
          },
        ],
        userId: [
          { required: true, message: "请输入用户ID", trigger: "blur" },
          { pattern: /^[0-9]+$/, message: "仅允许输入数字", trigger: "blur" },
        ],
        categoryId: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
        fileLink: [
          { required: true, message: "请上传数据", trigger: "blur" },
          {
            pattern:
              /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|ftp:\/\/|hdfs:\/\/)[a-zA-Z0-9\-.]+(\.[a-zA-Z]{2,})?(:[0-9]{1,5})?(\/.*)?$/,
            message: "请输入正确的链接",
            trigger: "blur",
          },
        ],
      },
      // 个人信息表单规则
      userRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}, // 触发方式为失去焦点
          {pattern: /^[A-Za-z0-9]+$/, message: '用户名只能使用字母和数字', trigger: 'blur'},
          {min: 5, message: '用户名至少五个字符', trigger: 'blur'}
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
          {pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: '密码至少包含字母和数字且最低八位', trigger: 'blur'}
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
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
      }
    };
  },
  created() {
    this.fetchInfo();
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
  watch: {
    '$route.params.userId': {
      handler(newUserId, oldUserId){
        if(newUserId !== oldUserId){
          this.fetchInfo();
        }
      },
      immediate: true
    }
  },
  methods: {
    fetchInfo(){
      // 获取用户信息
      this.fetchUser();
      // 获取个人数据
      this.fetchList();
      // 检查当前用户
      this.checkCurrentUser();
      // 获取当前登录用户个人信息
      // this.fetchCurrentUser();
    },
    fetchUser() {
      getPersonalUser(this.userId).then((res) => {
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
      listPersonalData(this.queryParams).then((res) => {
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
      getPersonalUserUpdate().then((res) => {
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
      if (localStorage.getItem('role') != '101'){
        this.isCurrentUser = false;
      }else {
        const currentUserId = localStorage.getItem("userId");
        this.isCurrentUser = this.userId.toString() === currentUserId;
      }
    },
    // 表单重置
    reset() {
      this.form = {
        dataId: null,
        userId: null,
        name: null,
        description: null,
        categoryId: null,
        fileLink: null,
        status: null,
      };
    },
    // 弹窗表单重置
    resetUserForm() {
      this.userForm = {
        userId: null,
        username: null,
        nickname: null,
        email: null,
        phone: null,
        gender: null,
        countryId: null,
        nin: null,
      };
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
      getPersonalData(dataId).then((res) => {
        this.form = res.data.data;
        // 填充文件链接到fileList
        this.fileList = [];
        this.fileList.push({
          name: this.form.name,
          url: this.form.fileLink,
        });
        // console.log(this.form)
        // 显示右侧抽屉
        this.drawerTitle = "修改个人数据信息";
        this.openDrawer = true;
      });
    },
    // 新增按钮操作
    handleAdd() {
      this.reset();
      this.drawerTitle = "新增个人数据";
      this.openDrawer = true;
    },
    // 删除按钮操作
    handleDelete(row) {
      const dataId = row.dataId;
      delPersonalData(dataId).then(() => {
        // 成功提醒弹窗
        this.$message({
          message: "删除成功",
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
            updatePersonalData(this.form.dataId, this.form).then(() => {
              // 成功提醒弹窗
              this.$message({
                message: "修改成功",
                type: "success",
              });
              // 关闭弹窗
              this.openDrawer = false;
              this.fetchList();
            });
          } else {
            addPersonalData(this.form).then(() => {
              // 成功提醒弹窗
              this.$message({
                message: "新增成功",
                type: "success",
              });
              // 关闭弹窗
              this.openDrawer = false;
              this.fetchList();
            });
          }
        } else {
          this.$message({
            message: "请检查必填项",
            type: "warning",
          });
        }
      });
    },
    // 状态禁用或启用
    handleStatus(row, status) {
      this.reset();
      this.form.status = status;
      updatePersonalData(row.dataId, this.form).then(() => {
        // 成功提醒弹窗
        this.$message({
          message: "修改成功",
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
            title: "成功",
            message: "上传成功",
            type: "success",
            duration: 1000,
          });
          console.log(res.data.data);
          this.form.fileLink = res.data.data;
        })
        .catch(() => {
          this.$notify({
            title: "错误",
            message: "上传失败",
            type: "error",
            duration: 1000,
          });
        });
    },
    // 删除文件的逻辑
    handleRemove() {
      if (!this.form.fileLink) {
        return this.$notify({
          title: "警告",
          message: "没有文件可以删除",
          type: "warning",
          duration: 1500,
        });
      } else {
        this.$notify({
          title: "消息",
          message: "文件删除中",
          duration: 1500,
        });
        deleteFile({ file: this.form.fileLink })
          .then(() => {
            this.$notify({
              title: "成功",
              message: "文件删除成功",
              type: "success",
              duration: 1000,
            });
            this.form.fileLink = null; // 清空fileLink
          })
          .catch(() => {
            this.$notify({
              title: "错误",
              message: "删除失败",
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
        title: "消息",
        message: "文件上传中",
        duration: 1000,
      });
    },
    // 在移除文件前
    // beforeRemove(file, fileList){
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
          updatePersonalUser(this.userForm).then(() => {
            // 成功提醒弹窗
            this.$message({
              message: "修改成功",
              type: "success",
            });
            // 关闭弹窗
            this.openDialog = false;
            this.fetchUser();
          });
        } else {
          this.$message({
            message: "请检查必填项",
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
  background-image: url('@/static/pic/104578537_p0.png');
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

.el-table,
    .el-table__expanded-cell {
        background-color: #3f5c6d2c;
    }

.header {
  font-size: 20px;
  color: #333;
}
</style>