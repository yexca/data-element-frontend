<template>
  <div class="app-container">
    <!-- header -->
    <!-- <div class="content-header" style="display: flex; "> -->
      <div class="content-header-search" style="display: flex; align-items: center;">
        <span style="margin-left: 10px;">ID：</span>
        <el-input v-model="queryParams.categoryId" placeholder="请输入ID" clearable style="width: 110px;"></el-input>
        <span style="margin-left: 10px;">分类名称：</span>
        <el-input v-model="queryParams.name" placeholder="请输入分类名称" clearable style="width: 160px;"></el-input>
        <span style="margin-left: 10px">分类描述：</span>
        <el-input placeholder="请输入分类描述" v-model="queryParams.description" clearable style="width: 150px"></el-input>
        
        <span style="margin-left: 10px;">状态：</span>
        <!-- <el-input v-model="queryParams.status" placeholder="请输入状态" clearable style="width: 11%;"></el-input> -->
        <el-select v-model="queryParams.status" clearable placeholder="请选择状态" style="width: 11%;">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>

        <!-- <el-button circle style="margin-left: 5px;" @click="showAdditionalFields"><i v-show="showAdditionalFieldsFlag" class="el-icon-arrow-up"></i><i v-show="!showAdditionalFieldsFlag" class="el-icon-arrow-down"></i></el-button> -->
        <el-button style="margin-left: 10px;" @click="handleSearch">搜索</el-button>  
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
        <el-table-column prop="categoryId" label="ID" width="60" sortable fixed="left">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="180" sortable align="center">
        </el-table-column>
        <el-table-column prop="description" label="描述" width="100" sortable align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期" width="200" sortable>
        </el-table-column>
        <el-table-column prop="updateTime" label="修改日期" width="200" sortable>
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

    <!-- 添加或修改员工信息右侧抽屉 -->
    <el-drawer
      :title="dialogTitle"
      :visible.sync="openDialog"
      width="500px"
      append-to-body
    >
      <el-form ref="formRef" status-icon :model="form" :rules="rules" label-width="100px" class="drawer-form">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        
        <el-form-item label="描述" prop="phone">
          <el-input v-model="form.description" placeholder="描述" />
        </el-form-item>
        
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="启用" value="0"></el-option>
            <el-option label="禁用" value="1"></el-option>
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
import { listCategory, getCategory, addCategory, updateCategory, delCategory } from "@/api/category";

export default {
  data() {
    return {
      loading: true,
      queryParams: {
        page: 1,
        pageSize: 5,
        categoryId: null,
        name: null,
        description: null,
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
          {required: true, message: '请输入名称', trigger: 'blur'},
          { pattern: /^[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7afA-Za-z0-9\s]+$/, message: '仅允许汉字、字母、数字、日文和韩文', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入描述', trigger: 'blur'},
          { pattern: /^[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7afA-Za-z0-9\s]+$/, message: '仅允许汉字、字母、数字、日文和韩文', trigger: 'blur'}
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
      listCategory(this.queryParams).then((res) => {
        if(res && res.data && res.data.data){
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        }else{
          this.tableData = [];
          this.total = null;
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
        categoryId: null,
        name: null,
        description: null,
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
      const categoryId = row.categoryId;
      getCategory(categoryId).then((res) => {
        this.form = res.data.data;
        // console.log(this.form)
        // 显示右侧抽屉
        this.dialogTitle = "修改分类信息";
        this.openDialog = true;
      });
    },
    // 新增按钮操作
    handleAdd(){
      this.reset();
      this.dialogTitle = "新增分类";
      this.openDialog = true
    },
    // 删除按钮操作
    handleDelete(row){
      const categoryId = row.categoryId;
      delCategory(categoryId).then(() => {
        // 成功提醒弹窗
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      });
    },
    // 弹窗提交按钮
    submitForm() {
      this.$refs.formRef.validate(valid => {
        if(valid){
          // 规则校验成功
          if (this.form.categoryId != null){
            updateCategory(this.form.categoryId, this.form).then(() => {
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
        addCategory(this.form).then(() => {
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
      updateCategory(row.categoryId, this.form).then(() => {
        // 成功提醒弹窗
        this.$message({
            message: '修改成功',
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