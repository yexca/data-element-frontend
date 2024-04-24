<template>
  <el-menu
    default-active="/admin/dashboard"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    router
  >
    <el-menu-item index="/admin/dashboard">
      <i class="el-icon-menu"></i>
      <span slot="title">dashboard</span>
    </el-menu-item>

    <el-menu-item index="/admin/center" v-if="role == 0 || role == 1">
      <i class="el-icon-user"></i>
      <span slot="title">个人中心</span>
    </el-menu-item>

    <el-menu-item index="/admin/employee" v-if="role == 0 || role == 1">
      <i class="el-icon-user"></i>
      <span slot="title">员工管理</span>
    </el-menu-item>

    <el-submenu index="/admin/user">
        <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item index="/admin/users/personal">个人用户</el-menu-item>
      <el-menu-item index="/admin/users/enterprise">企业用户</el-menu-item>
    </el-submenu>

    <el-submenu index="/data">
        <template slot="title">
        <i class="el-icon-s-data"></i>
        <span slot="title">数据管理</span>
      </template>
      <el-menu-item index="/admin/data/personal">个人数据</el-menu-item>
      <el-menu-item index="/admin/data/enterprise">企业数据</el-menu-item>
    </el-submenu>

    <el-submenu index="/info">
        <template slot="title">
        <i class="el-icon-info"></i>
        <span slot="title">信息管理</span>
      </template>
      <el-menu-item index="/admin/info/country">国家或地区</el-menu-item>
      <el-menu-item index="/admin/info/category">分类信息</el-menu-item>
      <!-- <el-menu-item index="/admin/info/role">角色信息</el-menu-item> -->
    </el-submenu>

    <!-- <el-menu-item index="/test">
      <i class="el-icon-menu"></i>
      <span slot="title">测试</span>
    </el-menu-item> -->

  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      role: null
    };
  },
  created(){
    this.role = localStorage.getItem("adminRole");
    // console.log(this.role)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>