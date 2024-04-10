<template>
  <div class="app-container">
    <!-- header -->
    <div class="content-header" style="display: flex; justify-content: space-between;">
      <div class="content-header-search">
        <span style="margin-left: 10px;">用户名：</span>
        <el-input v-model="queryParams.username" placeholder="请输入用户名" clearable style="width: 200px;"></el-input>
        <el-button style="margin-left: 10px;" @click="handleSearch">搜索</el-button>
      </div>
      <div class="content-header-button" style="margin-right: 10px">
        <el-button @click="handleAdd">新增</el-button>
      </div>
    </div>

    <!-- 表格 -->
    <div class="content-main">
      <!-- 表格主体 -->
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        style="min-height: 400px"
      >
        <el-table-column prop="userId" label="ID" width="50">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="100">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="200">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="100">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="50">
        </el-table-column>
        <el-table-column prop="countryName" label="国家" width="100">
        </el-table-column>
        <el-table-column prop="nin" label="身份证" width="100">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == '启用'"
              >启用</el-tag
            >
            <el-tag type="success" v-if="scope.row.status == '禁用'"
              >禁用</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="mini"
              icon="el-icon-edit"
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
        :current-page="currentPage4"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 添加或修改员工信息对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="openDialog"
      width="500px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
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
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model.number="form.phone" placeholder="请输入电话号码" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 国家选择 -->
        <el-form-item label="国家" prop="countryId">
          <el-select v-model="form.countryId" placeholder="请选择国家">
            <el-option
              v-for="country in countries"
              :key="country.id"
              :label="country.name"
              :value="country.countryId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="身份证号" prop="nin">
          <el-input v-model="form.nin" placeholder="请输入国家身份证号" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button type="info" @click="resetForm">重 置</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listPersonalUser, getPersonalUser, addPersonalUser, updatePersonalUser, delPersonalUser } from '@/api/PersonalUser';
import { listCountry } from "@/api/country";
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
      loading: true,
      queryParams: {
        page: 1,
        pageSize: 5,
        username: null
      },
      tableData: [],
      total: null,
      // 是否显示弹窗
      openDialog: false,
      // 弹窗标题
      dialogTitle: "",
      // 弹窗表单参数
      form: {},
      // 国家信息表
      countries: [],
      // 用于选中的国家ID
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
        nickname: [
          { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '仅允许数字、字母和汉字', trigger: 'blur'}
        ],
        email: [
          {pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '请输入正确的邮箱格式', trigger: 'blur'}
        ],
        phone: [
          { pattern: /^\d{6,11}$/, message: '电话号码必须为数字且为 6-11 位数字', trigger: 'blur'}
        ],
        gender: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        countryId: [
          {required: true, message: '请选择国家', trigger: 'change'}
        ],
        nin: [
          {required: true, message: '请输入身份证号', trigger: 'blur'},
          {min: 6, message: '身份证号最短6个字符'}
        ]
      }
    };
  },
  created(){
    this.fetchList();
  },
  mounted(){
    // 获取国家信息
    listCountry().then(res => {
      this.countries = res.data.data;
    })
  },
  methods: {
    fetchList() {
      this.loading = true;
      listPersonalUser(this.queryParams).then((res) => {
        this.tableData = res.data.data.records;
        this.total = res.data.data.total;
        this.loading = false;
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
        nickname: null,
        email: null,
        phone: null,
        gender: null,
        countryId: null,
        nin: null,
        status: null,
      };
    },
    // 弹窗取消
    cancel() {
      this.openDialog = false;
      this.reset();
    },
    // 弹窗内容重置
    resetForm() {
      this.reset();
    },
    // 修改按钮操作
    handleUpdate(row) {
      this.reset();
      const userId = row.userId;
      getPersonalUser(userId).then((res) => {
        this.form = res.data.data;
        // console.log(this.form)
        // 显示弹窗
        this.dialogTitle = "修改个人用户信息";
        this.openDialog = true;
      });
    },
    // 新增按钮操作
    handleAdd(){
      this.reset();
      this.dialogTitle = "新增个人用户";
      this.openDialog = true
    },
    // 删除按钮操作
    handleDelete(row){
      const userId = row.userId;
      delPersonalUser(userId).then(() => {
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
            updatePersonalUser(this.form.userId, this.form).then(() => {
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
        addPersonalUser(this.form).then(() => {
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
    }
  },
}
</script>

<style>

</style>