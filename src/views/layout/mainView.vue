<template>
  <div class="main-content">
    <!-- header -->
    <div class="header" style="display: flex; justify-content:flex-end; background-color: #D7E9FD;">
      <div class="header-left">left</div>
      <el-header>
      <!-- 右侧内容 -->
      <!-- 下拉菜单 -->
      <el-dropdown style="margin: 25px 5px; text-align: right">
        <span class="el-dropdown-link">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    </div>

    <div class="content" style="margin: 20px 20px 0 20px">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.main-content {
  width: 100%;
  height: 100%;
}
</style>