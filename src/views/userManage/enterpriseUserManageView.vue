<template>
  <div class="app-container">
    <!-- header -->
    <!-- <div class="content-header" style="display: flex; "> -->
      <div class="content-header-search" style="display: flex; align-items: center;">
        <span style="margin-left: 10px;">用户名：</span>
        <el-input v-model="queryParams.username" placeholder="请输入用户名" clearable @@keyup.enter.native="handleSearch" style="width: 200px;"></el-input>
        <span style="margin-left: 10px;">企业名：</span>
        <el-input v-model="queryParams.enterpriseName" placeholder="请输入企业名" clearable @keyup.13="handleSearch" style="width: 200px;"></el-input>
        <span style="margin-left: 10px">邮箱：</span>
        <el-input v-model="queryParams.email" placeholder="请输入邮箱" clearable style="width: 200px"></el-input>
        
        <el-button circle style="margin-left: 5px;" @click="showAdditionalFields"><i v-show="showAdditionalFieldsFlag" class="el-icon-arrow-up"></i><i v-show="!showAdditionalFieldsFlag" class="el-icon-arrow-down"></i></el-button>
        <el-button style="margin-left: 10px;" @click="handleSearch">搜索</el-button>  
      </div>
      <!-- <div class="content-header-button" style="margin-right: 10px">
        <el-button @click="handleAdd">新增</el-button>
      </div> -->
    <!-- </div> -->

    <!-- 额外的输入框，默认不显示 -->
    <div v-show="showAdditionalFieldsFlag">
    <div style="display: flex; align-items: center; margin-top: 10px;">
      <span style="margin-left: 10px;">ID：</span>
      <el-input v-model="queryParams.userId" placeholder="请输入ID" clearable style="width: 15%;"></el-input>
      <span style="margin-left: 10px;">国家或地区：</span>
      <!-- <el-input v-model="queryParams.countryId" placeholder="请输入国家" clearable style="width: 11%;"></el-input> -->
      <el-select v-model="queryParams.countryId" filterable clearable placeholder="请选择国家或地区" style="width: 15%;">
        <el-option
          v-for="country in countries"
          :key="country.countryId"
          :label="country.name"
          :value="country.countryId">
        </el-option>
      </el-select>
      <span style="margin-left: 10px;">电话号：</span>
      <el-input v-model="queryParams.phone" placeholder="请输入电话号" clearable style="width: 15%;"></el-input>
      <span style="margin-left: 10px;">状态：</span>
      <!-- <el-input v-model="queryParams.status" placeholder="请输入状态" clearable style="width: 11%;"></el-input> -->
      <el-select v-model="queryParams.status" clearable placeholder="请选择状态" style="width: 15%;">
        <el-option label="启用" value="0"></el-option>
        <el-option label="禁用" value="1"></el-option>
      </el-select>
    </div></div>
    <el-divider></el-divider>

    <!-- 表格 -->
    <div class="content-main">
      <!-- 表格主体 -->
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
      >
        <el-table-column prop="userId" label="ID" width="60" sortable fixed="left">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120" sortable>
        </el-table-column>
        <el-table-column prop="enterpriseName" label="企业名" width="100" sortable>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="170">
        </el-table-column>
        <el-table-column prop="countryName" label="国家或地区" width="100" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="电话号" width="120">
        </el-table-column>
        <el-table-column prop="evidence" label="证明材料" width="200">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80" fixed="right" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == '启用'"
              >启用</el-tag
            >
            <el-tag type="danger" v-if="scope.row.status == '禁用'"
              >禁用</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260" fixed="right">
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
              style="margin-left: 0;"
              type="success"
              size="mini"
              icon="el-icon-circle-check"
              @click="handleStatus(scope.row, 0)"
              >启用</el-button
            >
            <el-button
              size="mini"
              icon="el-icon-search"
              @click="handleDataSearch(scope.row)"
              ></el-button
            >
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              ></el-button
            >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              ></el-button
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

    <!-- 添加或修改员工信息右侧抽屉 -->
    <el-drawer
      :title="dialogTitle"
      :visible.sync="openDialog"
      width="500px"
      append-to-body
    >
      <el-form ref="form" status-icon :model="form" :rules="rules" label-width="100px" class="drawer-form">
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

        <!-- <el-form-item label="企业证明" prop="evidenceType">
          <el-radio-group v-model="form.evidenceType">
            <el-radio :label="0">输入链接</el-radio>
            <el-radio :label="1">上传文件</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="输入链接" prop="evidence" v-show="form.evidenceType === 0">
          <el-input v-model="form.evidence" placeholder="请输入企业证明" />
        </el-form-item>
        <el-form-item label="上传文件" prop="evidence" v-show="form.evidenceType === 1">
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
        </el-form-item> -->
        

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

      </el-form>
      <div class="demo-drawer__footer" style="display: flex; justify-content: space-around;">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button type="info" @click="resetForm">重 置</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { listEnterpriseUser, getEnterpriseUser, addEnterpriseUser, updateEnterpriseUser, delEnterpriseUser } from '@/api/enterpriseUser';
import { listAllCountry } from "@/api/country";
import { upload,deleteFile } from '@/api/file'
export default {
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
      // 展示更多搜索框
      showAdditionalFieldsFlag: false,
      // 上传文件列表
      fileList: [],
      loading: true,
      queryParams: {
        page: 1,
        pageSize: 5,
        userId: null,
        username: null,
        enterpriseName: null,
        email: null,
        phone: null,
        countryId: null,
        status: null
      },
      tableData: [],
      total: null,
      // 是否显示右侧抽屉
      openDialog: false,
      // 右侧抽屉标题
      dialogTitle: "",
      // 右侧抽屉表单参数
      form: {},
      // 国家或地区信息表
      countries: [],
      // 用于选中的国家或地区ID
      selectedCountryId: null,
      // 表单规则
      rules :{
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
    this.fetchList();
  },
  mounted(){
    // 获取国家或地区信息
    listAllCountry().then(res => {
      this.countries = res.data.data;
    })
  },
  methods: {
    fetchList() {
      this.loading = true;
      listEnterpriseUser(this.queryParams).then((res) => {
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
        this.loading = false;
      });
    },
    // 展示更多搜索框
    showAdditionalFields() {
      this.showAdditionalFieldsFlag = !this.showAdditionalFieldsFlag;
    },
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.fetchList();
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.fetchList();
    },
    // 搜索
    handleSearch(){
      this.fetchList();
    },
    // 表单重置
    reset() {
      this.form = {
        userId: null,
        username: null,
        password: null,
        checkPassword: null,
        enterpriseName: null,
        email: null,
        phone: null,
        countryId: null,
        status: null,
        // evidenceType: 0, // 证明方式，默认链接
        evidence: null
      };
      this.fileList = [];
    },
    // 右侧抽屉取消
    cancel() {
      this.openDialog = false;
      this.reset();
    },
    // 右侧抽屉内容重置
    resetForm() {
      this.reset();
    },
    // 查看当前用户数据
    handleDataSearch(row){
      const userId = row.userId;
      this.$store.commit('setentErpriseUserId', userId);
      this.$router.push('/admin/data/enterprise')
    },
    // 修改按钮操作
    handleUpdate(row) {
      this.reset();
      const userId = row.userId;
      getEnterpriseUser(userId).then((res) => {
        this.form = res.data.data;
        // 填充文件链接到fileList
        this.fileList.push(
          {
            name: this.form.enterpriseName + '证明材料',
            url: this.form.fileLink
          }
        )
        //证明材料
        // this.form.evidenceType = 0
        // console.log(this.form)
        // 显示右侧抽屉
        this.dialogTitle = "修改企业用户信息";
        this.openDialog = true;
      });
    },
    // 新增按钮操作
    handleAdd(){
      this.reset();
      this.dialogTitle = "新增企业用户";
      this.openDialog = true
    },
    // 删除按钮操作
    handleDelete(row){
      const userId = row.userId;
      delEnterpriseUser(userId).then(() => {
        // 成功提醒弹窗
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      });
    },
    // 弹窗提交按钮
    submitForm() {
      this.$refs.form.validate(valid => {
        if(valid){
          // 规则校验成功
          if (this.form.userId != null){
            updateEnterpriseUser(this.form.userId, this.form).then(() => {
            // 成功提醒弹窗
            this.$message({
            message: '修改成功',
            type: 'success'
          });
          // 关闭弹窗
          this.openDialog = false;
          this.fetchList();
        })
      }else {
        addEnterpriseUser(this.form).then(() => {
          // 成功提醒弹窗
          this.$message({
          message: '新增成功',
          type: 'success'
          });
          // 关闭弹窗
          this.openDialog = false;
          this.fetchList();
        })
      }
        }else{
          this.$message({
          message: '请检查必填项',
          type: 'warning'
        });
        }
      })
    },
    // 状态禁用或启用
    handleStatus(row, status){
      this.reset();
      this.form.status = status;
      updateEnterpriseUser(row.userId, this.form).then(() => {
        // 成功提醒弹窗
        this.$message({
            message: '修改成功',
            type: 'success'
          });
        // 重新获取列表
        this.fetchList();
      });
    },
    // 上传文件
    customUpload(file){
      upload(file).then(res => {
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success',
          duration: 1000
        })
        console.log(res.data.data);
        this.form.evidence = res.data.data;
      })
    },
    // 删除文件的逻辑
    handleRemove() {
      if (!this.form.fileLink) {
        return this.$notify({
          title: '警告',
          message: '没有文件可以删除',
          type: 'warning',
          duration: 1500
        });
      }else{
        this.$notify({
          title: '消息',
          message: '文件删除中',
          duration: 1500
        })
        deleteFile({file: this.form.fileLink}).then(() => {
          this.$notify({
          title: '成功',
          message: '文件删除成功',
          type: 'success',
          duration: 1000
        });
        this.form.fileLink = null;  // 清空fileLink
        }).catch(() => {
        this.$notify({
          title: '错误',
          message: '删除失败',
          type: 'error',
          duration: 1000
        });
      });
      }
    },
    // 上传文件前
    // beforeUpload(file){
    beforeUpload(){
      this.$notify({
        title: '消息',
        message: '文件上传中',
        duration: 1000
      })
    },
    // 在移除文件前
    // beforeRemove(file, fileList){
    beforeRemove(file){
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  },
}
</script>

<style>

</style>