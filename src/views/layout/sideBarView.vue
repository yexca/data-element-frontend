<template>
  <el-menu
    default-active="/"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    router
  >
  <el-menu-item index="/dashboard">
      <i class="el-icon-menu"></i>
      <span slot="title">dashboard</span>
    </el-menu-item>

    <el-menu-item index="/employee">
      <i class="el-icon-menu"></i>
      <span slot="title">员工管理</span>
    </el-menu-item>

    <el-submenu index="/user">
        <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">用户管理</span>
      </template>
      <el-menu-item index="/users/personal">个人用户</el-menu-item>
      <el-menu-item index="/users/enterprise">企业用户</el-menu-item>
    </el-submenu>

    <el-submenu index="/data">
        <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">数据管理</span>
      </template>
      <el-menu-item index="/data/personal">个人数据</el-menu-item>
      <el-menu-item index="/data/enterprise">企业数据</el-menu-item>
    </el-submenu>

    <el-menu-item index="/test">
      <i class="el-icon-menu"></i>
      <span slot="title">测试</span>
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
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