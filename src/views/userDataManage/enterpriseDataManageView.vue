<template>
  <div class="app-container">
    <!-- header -->
    <!-- <div class="content-header" style="display: flex; "> -->
      <div class="content-header-search" style="display: flex; align-items: center;">
        <span style="margin-left: 10px;">ID：</span>
        <el-input v-model="queryParams.dataId" placeholder="请输入数据ID" clearable style="width: 200px;"></el-input>
        <span style="margin-left: 10px">名称：</span>
        <el-input placeholder="请输入名称" v-model="queryParams.name" clearable style="width: 200px"></el-input>
        <span style="margin-left: 10px">描述：</span>
        <el-input placeholder="请输入描述" v-model="queryParams.description" clearable style="width: 200px"></el-input>
        
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
      <span style="margin-left: 10px;">企业ID：</span>
      <el-input v-model="queryParams.userId" placeholder="请输入用户ID" clearable style="width: 15%;"></el-input>
      <span style="margin-left: 10px;">分类：</span>
      <!-- <el-input v-model="queryParams.countryId" placeholder="请输入国家" clearable style="width: 11%;"></el-input> -->
      <el-select v-model="queryParams.categoryId" placeholder="请选择分类" clearable filterable style="width: 15%;">
        <el-option
          v-for="category in categories"
          :key="category.categoryId"
          :label="category.name"
          :value="category.categoryId">
        </el-option>
      </el-select>
      <span style="margin-left: 10px;">状态：</span>
      <!-- <el-input v-model="queryParams.status" placeholder="请输入状态" clearable style="width: 11%;"></el-input> -->
      <el-select v-model="queryParams.status" placeholder="请选择状态" clearable style="width: 15%;">
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
        <el-table-column prop="dataId" label="ID" width="60" sortable fixed="left">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="100" sortable>
        </el-table-column>
        <el-table-column prop="description" label="描述" width="400">
        </el-table-column>
        <el-table-column prop="categoryName" label="分类" width="100" align="center">
        </el-table-column>
        <el-table-column prop="username" label="企业" width="120" sortable>
        </el-table-column>
        <el-table-column prop="fileLink" label="文件链接" width="170">
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
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="drawer-form">
        <el-form-item label="数据名" prop="name">
          <el-input v-model="form.name" placeholder="请输入数据名" />
        </el-form-item>
        <el-form-item label="企业" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入企业ID" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入描述" />
        </el-form-item>

        <!-- 分类选择 -->
        <el-form-item label="分类" prop="categoryId">
          <el-select v-model="form.categoryId" filterable clearable placeholder="请选择分类">
            <el-option
              v-for="category in categories"
              :key="category.categoryId"
              :label="category.name"
              :value="category.categoryId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="样本数据文件" prop="sampleFileLink">
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

        <el-form-item label="文件链接" prop="fileLink">
          <el-input v-model="form.fileLink" placeholder="请输入文件链接"></el-input>
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
import { listEnterpriseData, getEnterpriseData, addEnterpriseData, updateEnterpriseData, delEnterpriseData } from '@/api/enterpriseData';
import { listAllCategory } from '@/api/category';
import { upload, deleteFile } from '@/api/file'
export default {
  data() {
    return {
      loading: true,
      queryParams: {
        page: 1,
        pageSize: 5,
        dataId: null,
        userId: null,
        name: null,
        description: null,
        categoryId: null,
        // fileLink: null,
        status: null
      },
      // 额外搜索框
      showAdditionalFieldsFlag: false,
      // 上传文件列表
      fileList: [],
      tableData: [],
      total: null,
      // 是否显示右侧抽屉
      openDialog: false,
      // 右侧抽屉标题
      dialogTitle: "",
      // 右侧抽屉表单参数
      form: {},
      // 分类信息表
      categories: [],
      // 用于选中的分类ID
      selectedCategoryId: null,
      // 表单规则
      rules :{
        name: [
          { required: true, message: '请输入数据名', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7afA-Za-z0-9\s]+$/, message: '仅允许汉字、字母、数字、日文和韩文', trigger: 'blur'}
        ],
        userId: [
          {required: true, message: '请输入用户ID', trigger: 'blur'},
          { pattern: /^[0-9]+$/, message: '仅允许输入数字', trigger: 'blur' }
        ],
        categoryId: [
          {required: true, message: '请选择分类', trigger: 'change'}
        ],
        sampleFileLink: [
          {required: true, message: '请上传样本文件', trigger: 'change'}
        ],
        fileLink: [
          {required: true, message: '请输入文件链接', trigger: 'blur'},
          {pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|ftp:\/\/|hdfs:\/\/)[a-zA-Z0-9\-.]+(\.[a-zA-Z]{2,})?(:[0-9]{1,5})?(\/.*)?$/, message: '请输入正确的链接', trigger: 'blur'}
        ]
      }
    };
  },
  created(){
    // 判断vuex是否有enterpriseUserId
    if(this.$store.state.enterpriseUserId != null){
      this.queryParams.userId = this.$store.state.enterpriseUserId;
      this.$store.commit('setentErpriseUserId', 'null');
      this.showAdditionalFieldsFlag = true;
    }
    this.fetchList();
    // this.tableWidth = document.body.clientWidth - 250;
  },
  mounted(){
    // 获取分类信息
    listAllCategory().then(res => {
      this.categories = res.data.data;
      // console.log(this.categories)
    })
  },
  methods: {
    fetchList() {
      this.loading = true;
      listEnterpriseData(this.queryParams).then((res) => {
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
        dataId:null,
        userId: null,
        name: null,
        description: null,
        categoryId: null,
        sampleFileLink: null,
        fileLink: null,
        status: null,
      };
    },
    // 右侧抽屉取消
    cancel() {
      this.openDialog = false;
      this.reset();
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
        this.fileList.push(
          {
            name: this.form.name,
            url: this.form.sampleFileLink
          }
        )
        // console.log(this.form)
        // 显示右侧抽屉
        this.dialogTitle = "修改企业数据信息";
        this.openDialog = true;
      });
    },
    // 新增按钮操作
    handleAdd(){
      this.reset();
      this.dialogTitle = "新增企业数据";
      this.openDialog = true
    },
    // 删除按钮操作
    handleDelete(row){
      const dataId = row.dataId;
      delEnterpriseData(dataId).then(() => {
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
          if (this.form.dataId != null){
            updateEnterpriseData(this.form.dataId, this.form).then(() => {
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
        addEnterpriseData(this.form).then(() => {
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
      updateEnterpriseData(row.dataId, this.form).then(() => {
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
        this.form.sampleFileLink = res.data.data;
      }).catch(() => {
      this.$notify({
        title: '错误',
        message: '上传失败',
        type: 'error',
        duration: 1000
      });
    });
    },
    // 删除文件的逻辑
    handleRemove() {
      if (!this.form.sampleFileLink) {
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
        deleteFile({file: this.form.sampleFileLink}).then(() => {
          this.$notify({
          title: '成功',
          message: '文件删除成功',
          type: 'success',
          duration: 1000
        });
        this.form.sampleFileLink = null;  // 清空fileLink
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
.drawer-form {
  padding-left: 20px;
  padding-right: 20px;
}
</style>