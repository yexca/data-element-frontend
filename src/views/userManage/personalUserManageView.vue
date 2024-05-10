<template>
  <div class="app-container">
    <!-- header -->
    <!-- <div class="content-header" style="display: flex; "> -->
      <div class="content-header-search" style="display: flex; align-items: center;">
        <span style="margin-left: 10px;">{{ $t('form.username') }}：</span>
        <el-input v-model="queryParams.username" :placeholder="$t('placeholder.username')" clearable style="width: 200px;"></el-input>
        <span style="margin-left: 10px">{{ $t('form.phone') }}：</span>
        <el-input :placeholder="$t('placeholder.phone')" v-model="queryParams.phone" clearable style="width: 200px"></el-input>
        <span style="margin-left: 10px">{{ $t('form.nin') }}：</span>
        <el-input :placeholder="$t('placeholder.nin')" v-model="queryParams.nin" clearable style="width: 200px"></el-input>
        
        <el-button circle style="margin-left: 5px;" @click="showAdditionalFields"><i v-show="showAdditionalFieldsFlag" class="el-icon-arrow-up"></i><i v-show="!showAdditionalFieldsFlag" class="el-icon-arrow-down"></i></el-button>
        <el-button style="margin-left: 10px;" @click="handleSearch">{{ $t('common.search') }}</el-button>  
      </div>
      <!-- <div class="content-header-button" style="margin-right: 10px">
        <el-button @click="handleAdd">新增</el-button>
      </div> -->
    <!-- </div> -->

    <!-- 额外的输入框，默认不显示 -->
    <div v-show="showAdditionalFieldsFlag">
    <div style="display: flex; align-items: center; margin-top: 10px;">
      <span style="margin-left: 10px;">{{ $t('form.id') }}：</span>
      <el-input v-model="queryParams.userId" :placeholder="$t('placeholder.id')" clearable style="width: 11%;"></el-input>
      <span style="margin-left: 10px;">{{ $t('form.nickname') }}：</span>
      <el-input v-model="queryParams.nickname" :placeholder="$t('placeholder.nickname')" clearable style="width: 11%;"></el-input>
      <span style="margin-left: 10px;">{{ $t('form.email') }}：</span>
      <el-input v-model="queryParams.email" :placeholder="$t('placeholder.email')" clearable style="width: 11%;"></el-input>
      <span style="margin-left: 10px;">{{ $t('form.country') }}：</span>
      <!-- <el-input v-model="queryParams.countryId" placeholder="请输入国家" clearable style="width: 11%;"></el-input> -->
      <el-select v-model="queryParams.countryId" :placeholder="$t('placeholder.country')" clearable filterable style="width: 11%;">
        <el-option
          v-for="country in countries"
          :key="country.countryId"
          :label="country.name"
          :value="country.countryId">
        </el-option>
      </el-select>
      <span style="margin-left: 10px;">{{ $t('form.gender') }}：</span>
      <!-- <el-input v-model="queryParams.gender" placeholder="请输入性别" clearable style="width: 11%;"></el-input> -->
      <el-select v-model="queryParams.gender" :placeholder="$t('placeholder.gender')" clearable style="width: 11%;">
        <el-option :label="$t('option.male')" value="1"></el-option>
        <el-option :label="$t('option.female')" value="2"></el-option>
        <el-option :label="$t('option.unknow')" value="0"></el-option>
      </el-select>
      <span style="margin-left: 10px;">{{ $t('form.status') }}：</span>
      <!-- <el-input v-model="queryParams.status" placeholder="请输入状态" clearable style="width: 11%;"></el-input> -->
      <el-select v-model="queryParams.status" :placeholder="$t('placeholder.status')" clearable style="width: 11%;">
        <el-option :label="$t('option.enable')" value="0"></el-option>
        <el-option :label="$t('option.disable')" value="1"></el-option>
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
        <el-table-column prop="userId" :label="$t('form.id')" width="60" sortable fixed="left">
        </el-table-column>
        <el-table-column prop="username" :label="$t('form.username')" width="120" sortable>
        </el-table-column>
        <el-table-column prop="nickname" :label="$t('form.nickname')" width="120" sortable>
        </el-table-column>
        <el-table-column prop="gender" :label="$t('form.gender')" width="70" align="center">
        </el-table-column>
        <el-table-column prop="countryName" :label="$t('form.country')" width="100" align="center">
        </el-table-column>
        <el-table-column prop="nin" :label="$t('form.nin')" width="170">
        </el-table-column>
        <el-table-column prop="email" :label="$t('form.email')" width="170">
        </el-table-column>
        <el-table-column prop="phone" :label="$t('form.phone')" width="120">
        </el-table-column>
        <el-table-column prop="status" :label="$t('form.status')" width="80" fixed="right" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == '启用'"
              >{{ $t('option.enable') }}</el-tag
            >
            <el-tag type="danger" v-if="scope.row.status == '禁用'"
              >{{ $t('option.disable') }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="290" fixed="right">
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
              style="margin-left: 0;"
              type="success"
              size="mini"
              icon="el-icon-circle-check"
              @click="handleStatus(scope.row, 0)"
              >{{ $t('option.enable') }}</el-button
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
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="drawer-form">
        <el-form-item :label="$t('form.username')" prop="username">
          <el-input v-model="form.username" :placeholder="$t('placeholder.username')" />
        </el-form-item>
        <el-form-item :label="$t('form.password')" prop="password">
          <el-input v-model="form.password" type="password" show-password :placeholder="$t('placeholder.password')" />
        </el-form-item>
        <el-form-item :label="$t('form.checkPassword')" prop="checkPassword">
          <el-input v-model="form.checkPassword" :placeholder="$t('placeholder.checkPassword')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.nickname')" prop="nickname">
          <el-input v-model="form.nickname" :placeholder="$t('placeholder.nickname')" />
        </el-form-item>
        <el-form-item :label="$t('form.email')" prop="email">
          <el-input v-model="form.email" :placeholder="$t('placeholder.email')" />
        </el-form-item>
        <el-form-item :label="$t('form.phone')" prop="phone">
          <el-input v-model.number="form.phone" :placeholder="$t('placeholder.phone')" />
        </el-form-item>
        <el-form-item :label="$t('form.gender')" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio :label="1">{{ $t('option.male') }}</el-radio>
            <el-radio :label="2">{{ $t('option.female') }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 国家或地区选择 -->
        <el-form-item :label="$t('form.country')" prop="countryId">
          <el-select v-model="form.countryId" filterable clearable :placeholder="$t('placeholder.country')">
            <el-option
              v-for="country in countries"
              :key="country.countryId"
              :label="country.name"
              :value="country.countryId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('form.nin')" prop="nin">
          <el-input v-model="form.nin" :placeholder="$t('placeholder.nin')" />
        </el-form-item>

      </el-form>
      <div class="demo-drawer__footer" style="display: flex; justify-content: space-around;">
        <el-button type="primary" @click="submitForm">{{ $t('drawOperation.submit') }}</el-button>
        <el-button type="info" @click="resetForm">{{ $t('drawOperation.reset') }}</el-button>
        <el-button @click="cancel">{{ $t('drawOperation.cancel') }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { listPersonalUser, getPersonalUser, addPersonalUser, updatePersonalUser, delPersonalUser } from '@/api/PersonalUser';
import { listAllCountry } from '@/api/country';
export default {
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
      loading: true,
      queryParams: {
        page: 1,
        pageSize: 5,
        userId: null,
        username: null,
        nickname: null,
        email: null,
        phone: null,
        gender: null,
        countryId: null,
        nin: null,
        status: null
      },
      // 额外搜索框
      showAdditionalFieldsFlag: false,
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
          {pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: this.$t('errorMessage.emailFormat'), trigger: 'blur'}
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
  created(){
    this.fetchList();
    // this.tableWidth = document.body.clientWidth - 250;
  },
  mounted(){
    // 获取国家或地区信息
    listAllCountry().then(res => {
      if(res && res.data && res.data.data){
        this.countries = res.data.data;
      }else{
        return;
      }
    })
  },
  methods: {
    fetchList() {
      this.loading = true;
      listPersonalUser(this.queryParams).then((res) => {
        if(res && res.data && res.data.data){
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        }else{
          return;
        }
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
        nickname: null,
        email: null,
        phone: null,
        gender: null,
        countryId: null,
        nin: null,
        status: null,
      };
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
      this.$store.commit('setPersonalUserId', userId);
      this.$router.push('/admin/data/personal')
    },
    // 修改按钮操作
    handleUpdate(row) {
      this.reset();
      const userId = row.userId;
      getPersonalUser(userId).then((res) => {
        this.form = res.data.data;
        // console.log(this.form)
        // 显示右侧抽屉
        this.dialogTitle = this.$t('formTitle.updatePersonaluser');
        this.openDialog = true;
      });
    },
    // 新增按钮操作
    handleAdd(){
      this.reset();
      this.dialogTitle = this.$t('formTitle.addPersonaluser');
      this.openDialog = true
    },
    // 删除按钮操作
    handleDelete(row){
      const userId = row.userId;
      delPersonalUser(userId).then(() => {
        // 成功提醒弹窗
        this.$message({
          message: this.$t('successMessage.delete'),
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
            message: this.$t('successMessage.update'),
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
          message: this.$t('successMessage.add'),
          type: 'success'
          });
          // 关闭弹窗
          this.openDialog = false;
          this.fetchList();
        })
      }
        }else{
          this.$message({
          message: this.$t('errorMessage.validate'),
          type: 'warning'
        });
        }
      })
    },
    // 状态禁用或启用
    handleStatus(row, status){
      this.reset();
      this.form.status = status;
      updatePersonalUser(row.userId, this.form).then(() => {
        // 成功提醒弹窗
        this.$message({
            message: this.$t('successMessage.update'),
            type: 'success'
          });
        // 重新获取列表
        this.fetchList();
      });
      
    }
  },
}
</script>

<style>
.drawer-form {
  padding-left: 20px;
  padding-right: 20px;
}
</style>