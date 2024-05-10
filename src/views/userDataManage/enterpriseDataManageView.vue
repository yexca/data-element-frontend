<template>
  <div class="app-container">
    <!-- header -->
    <!-- <div class="content-header" style="display: flex; "> -->
      <div class="content-header-search" style="display: flex; align-items: center;">
        <span style="margin-left: 10px;">{{ $t('form.id') }}：</span>
        <el-input v-model="queryParams.dataId" :placeholder="$t('placeholder.id')" clearable style="width: 200px;"></el-input>
        <span style="margin-left: 10px">{{ $t('form.name') }}：</span>
        <el-input :placeholder="$t('placeholder.name')" v-model="queryParams.name" clearable style="width: 200px"></el-input>
        <span style="margin-left: 10px">{{ $t('form.description') }}：</span>
        <el-input :placeholder="$t('placeholder.description')" v-model="queryParams.description" clearable style="width: 200px"></el-input>
        
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
      <span style="margin-left: 10px;">{{ $t('form.userId') }}：</span>
      <el-input v-model="queryParams.userId" :placeholder="$t('placeholder.userId')" clearable style="width: 15%;"></el-input>
      <span style="margin-left: 10px;">{{ $t('form.category') }}：</span>
      <!-- <el-input v-model="queryParams.countryId" placeholder="请输入国家" clearable style="width: 11%;"></el-input> -->
      <el-select v-model="queryParams.categoryId" :placeholder="$t('placeholder.category')" clearable filterable style="width: 15%;">
        <el-option
          v-for="category in categories"
          :key="category.categoryId"
          :label="category.name"
          :value="category.categoryId">
        </el-option>
      </el-select>
      <span style="margin-left: 10px;">{{ $t('form.status') }}：</span>
      <!-- <el-input v-model="queryParams.status" placeholder="请输入状态" clearable style="width: 11%;"></el-input> -->
      <el-select v-model="queryParams.status" :placeholder="$t('placeholder.status')" clearable style="width: 15%;">
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
        <el-table-column prop="dataId" :label="$t('form.id')" width="60" sortable fixed="left">
        </el-table-column>
        <el-table-column prop="name" :label="$t('form.name')" width="100" sortable>
        </el-table-column>
        <el-table-column prop="description" :label="$t('form.description')" width="400">
        </el-table-column>
        <el-table-column prop="categoryName" :label="$t('form.category')" width="100" align="center">
        </el-table-column>
        <el-table-column prop="username" :label="$t('form.username')" width="120" sortable>
        </el-table-column>
        <el-table-column prop="sampleFileLink" :label="$t('form.sampleFileLink')" width="170">
        </el-table-column>
        <el-table-column prop="fileLink" :label="$t('form.fileLink')" width="170">
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
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="drawer-form">
        <el-form-item :label="$t('form.name')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('placeholder.name')" />
        </el-form-item>
        <el-form-item :label="$t('form.userId')" prop="userId">
          <el-input v-model="form.userId" :placeholder="$t('placeholder.userId')" />
        </el-form-item>
        <el-form-item :label="$t('form.description')" prop="description">
          <el-input v-model="form.description" :placeholder="$t('placeholder.description')" />
        </el-form-item>

        <!-- 分类选择 -->
        <el-form-item :label="$t('form.category')" prop="categoryId">
          <el-select v-model="form.categoryId" filterable clearable :placeholder="$t('placeholder.category')">
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

        <el-form-item :label="$t('form.fileDraw')" prop="fileLink">
          <el-input v-model="form.fileLink" :placeholder="$t('placeholder.fileLink')"></el-input>
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
          { required: true, message: this.$t('errorMessage.name'), trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7afA-Za-z0-9\s]+$/, message: this.$t('errorMessage.nickname'), trigger: 'blur'}
        ],
        userId: [
          {required: true, message: this.$t('errorMessage.userId'), trigger: 'blur'},
          { pattern: /^[0-9]+$/, message: this.$t('errorMessage.userIdLimit'), trigger: 'blur' }
        ],
        categoryId: [
          {required: true, message: this.$t('errorMessage.category'), trigger: 'change'}
        ],
        sampleFileLink: [
          {required: true, message: this.$t('errorMessage.sampleFile'), trigger: 'change'}
        ],
        fileLink: [
          {required: true, message: this.$t('errorMessage.fileLink'), trigger: 'blur'},
          {pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|ftp:\/\/|hdfs:\/\/)[a-zA-Z0-9\-.]+(\.[a-zA-Z]{2,})?(:[0-9]{1,5})?(\/.*)?$/, message: this.$t('errorMessage.fileLinkLimit'), trigger: 'blur'}
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
      if(res && res.data && res.data.data){
        this.categories = res.data.data;
      }else{
        return;
      }
      
      // console.log(this.categories)
    })
  },
  methods: {
    fetchList() {
      this.loading = true;
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
        this.dialogTitle = this.$t('formTitle.updateEnterpriseData');
        this.openDialog = true;
      });
    },
    // 新增按钮操作
    handleAdd(){
      this.reset();
      this.dialogTitle = this.$t('formTitle.addEnterpriseData');
      this.openDialog = true
    },
    // 删除按钮操作
    handleDelete(row){
      const dataId = row.dataId;
      delEnterpriseData(dataId).then(() => {
        // 成功提醒弹窗
        this.$message({
          message: this.$t('successMessage.delete'),
          type: 'success'
        });
      });
      this.fetchList();
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
            message: this.$t('successMessage.update'),
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
      updateEnterpriseData(row.dataId, this.form).then(() => {
        // 成功提醒弹窗
        this.$message({
            message: this.$t('successMessage.update'),
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
          title: this.$t('notifyTitle.success'),
          message: this.$t('notifyMessage.uploadSuccess'),
          type: 'success',
          duration: 1000
        })
        console.log(res.data.data);
        this.form.sampleFileLink = res.data.data;
      }).catch(() => {
      this.$notify({
        title: this.$t('notifyTitle.error'),
        message: this.$t('notifyMessage.uploadFail'),
        type: 'error',
        duration: 1000
      });
    });
    },
    // 删除文件的逻辑
    handleRemove() {
      if (!this.form.sampleFileLink) {
        return this.$notify({
          title: this.$t('notifyTitle.warn'),
          message: this.$t('notifyMessage.noFileToDelete'),
          type: 'warning',
          duration: 1500
        });
      }else{
        this.$notify({
          title: this.$t('notifyTitle.message'),
          message: this.$t('notifyMessage.fileDeleting'),
          duration: 1500
        })
        deleteFile({file: this.form.sampleFileLink}).then(() => {
          this.$notify({
          title: this.$t('notifyTitle.success'),
          message: this.$t('notifyMessage.fileDeleteSuccess'),
          type: 'success',
          duration: 1000
        });
        this.form.sampleFileLink = null;  // 清空fileLink
        }).catch(() => {
        this.$notify({
          title: this.$t('notifyTitle.error'),
          message: this.$t('notifyMessage.fileDeleteFail'),
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
        title: this.$t('notifyTitle.message'),
        message: this.$t('notifyMessage.fileUploading'),
        duration: 1000
      })
    },
    // 在移除文件前
    // beforeRemove(file, fileList){
    beforeRemove(file){
      const message = this.$t('confirm.remove', { filename: file.name });
      return this.$confirm(message);
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