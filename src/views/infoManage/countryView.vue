<template>
  <div class="app-container">
    <!-- header -->
    <!-- <div class="content-header" style="display: flex; "> -->
      <div class="content-header-search" style="display: flex; align-items: center;">
        <span style="margin-left: 10px;">{{ $t('form.id') }}：</span>
        <el-input v-model="queryParams.countryId" :placeholder="$t('placeholder.id')" clearable style="width: 110px;"></el-input>
        <span style="margin-left: 10px;">{{ $t('form.name') }}：</span>
        <el-input v-model="queryParams.name" :placeholder="$t('placeholder.name')" clearable style="width: 160px;"></el-input>
        <span style="margin-left: 10px">{{ $t('form.phoneCode') }}：</span>
        <el-input :placeholder="$t('placeholder.phoneCode')" v-model="queryParams.phone" clearable style="width: 150px"></el-input>
        
        <span style="margin-left: 10px;">{{ $t('form.status') }}：</span>
        <!-- <el-input v-model="queryParams.status" placeholder="请输入状态" clearable style="width: 11%;"></el-input> -->
        <el-select v-model="queryParams.status" clearable :placeholder="$t('placeholder.status')" style="width: 11%;">
          <el-option :label="$t('option.enable')" value="0"></el-option>
          <el-option :label="$t('option.disable')" value="1"></el-option>
        </el-select>

        <!-- <el-button circle style="margin-left: 5px;" @click="showAdditionalFields"><i v-show="showAdditionalFieldsFlag" class="el-icon-arrow-up"></i><i v-show="!showAdditionalFieldsFlag" class="el-icon-arrow-down"></i></el-button> -->
        <el-button style="margin-left: 10px;" @click="handleSearch">{{ $t('common.search') }}</el-button>  
      </div>
    <el-divider></el-divider>
    
    <!-- 表格 -->
    <div class="content-main">
      <!-- 表格主体 -->
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
      >
        <el-table-column prop="countryId" :label="$t('form.id')" width="60" sortable fixed="left">
        </el-table-column>
        <el-table-column prop="name" :label="$t('form.name')" width="180" sortable align="center">
        </el-table-column>
        <el-table-column prop="phone" :label="$t('form.phoneCode')" width="100" sortable align="center">
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('form.createTime')" width="200" sortable>
        </el-table-column>
        <el-table-column prop="updateTime" :label="$t('form.updateTime')" width="200" sortable>
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
        <el-table-column label="操作" width="260" fixed="right">
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

    <!-- 添加或修改员工信息右侧抽屉 -->
    <el-drawer
      :title="dialogTitle"
      :visible.sync="openDialog"
      width="500px"
      append-to-body
    >
      <el-form ref="formRef" status-icon :model="form" :rules="rules" label-width="100px" class="drawer-form">
        <el-form-item :label="$t('form.name')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('placeholder.name')" />
        </el-form-item>
        
        <el-form-item :label="$t('form.phoneCode')" prop="phone">
          <el-input v-model="form.phone" :placeholder="$t('placeholder.phoneCode')" />
        </el-form-item>
        
        <el-form-item :label="$t('form.status')" prop="status">
          <el-select v-model="form.status" :placeholder="$t('placeholder.status')">
            <el-option :label="$t('option.enable')" value="0"></el-option>
            <el-option :label="$t('option.disable')" value="1"></el-option>
          </el-select>
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
import { listCountry, getCountry, addCountry, updateCountry, delCountry } from "@/api/country";

export default {
  data() {
    return {
      loading: true,
      queryParams: {
        page: 1,
        pageSize: 5,
        countryId: null,
        phone: null,
        name: null,
        status: null,
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
      // 表单规则
      rules :{
        name: [
          {required: true, message: this.$t('errorMessage.name'), trigger: 'blur'},
          { pattern: /^[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7afA-Za-z0-9\s]+$/, message: '仅允许汉字、字母、数字、日文和韩文', trigger: 'blur' }
        ],
        phone: [
          {required: true, message: this.$t('errorMessage.phoneCode'), trigger: 'blur'},
          { pattern: /^[0-9]+$/, message: this.$t('errorMessage.phoneCodeLimit'), trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = true;
      listCountry(this.queryParams).then((res) => {
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
        countryId: null,
        phone: null,
        name: null,
        status: null
      };
      // this.$refs.formRef.resetFields(); // 重置表单字段和验证状态
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
    // 修改按钮操作
    handleUpdate(row) {
      this.reset();
      const countryId = row.countryId;
      getCountry(countryId).then((res) => {
        this.form = res.data.data;
        // console.log(this.form)
        // 显示右侧抽屉
        this.dialogTitle = this.$t('formTitle.updateCountry');
        this.openDialog = true;
      });
    },
    // 新增按钮操作
    handleAdd(){
      this.reset();
      this.dialogTitle = this.$t('formTitle.addCountry');
      this.openDialog = true
    },
    // 删除按钮操作
    handleDelete(row){
      const countryId = row.countryId;
      delCountry(countryId).then(() => {
        // 成功提醒弹窗
        this.$message({
          message: this.$t('successMessage.delete'),
          type: 'success'
        });
      }).catch(() => {
        return;
      });
    },
    // 弹窗提交按钮
    submitForm() {
      this.$refs.formRef.validate(valid => {
        if(valid){
          // 规则校验成功
          if (this.form.countryId != null){
            updateCountry(this.form.countryId, this.form).then(() => {
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
        addCountry(this.form).then(() => {
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
      updateCountry(row.countryId, this.form).then(() => {
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
};
</script>

<style>
.drawer-form {
  padding-left: 20px;
  padding-right: 20px;
}
</style>