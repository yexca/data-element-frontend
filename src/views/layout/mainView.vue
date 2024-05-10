<template>
  <div class="main-content" :style="{width: windowWidth + 'px'}">
    <!-- header -->
    <div class="header" style="display: flex; justify-content: space-between; background-color: #D7E9FD; ">
      <div class="header-left"></div>
      <el-header>
      <!-- 右侧内容 -->
      <!-- 下拉菜单 -->
      <el-dropdown style="margin: 25px 5px; text-align: right" @command="handleTranslate">
        <span class="el-dropdown-link">
          {{ $t('selectLanguage') }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="en">English</el-dropdown-item>
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="jp">日本語</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown style="margin: 25px 5px; text-align: right" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>个人中心</el-dropdown-item> -->
          <el-dropdown-item command="logout">{{ $t('common.logout') }}</el-dropdown-item>
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
export default {
  data() {
    return {
      // 窗口宽度
      windowWidth: null,
    }
  },
  mounted(){
    // 获取宽度
    // window.onresize = () => {
    //   return (() => {
    //     this.windowWidth = document.body.clientWidth - 200;
    //   })()
    // }
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.updateWindowWidth);
  },
  methods: {
    updateWindowWidth() {
      this.windowWidth = document.body.clientWidth - 200;
    },
    handleCommand(command){
      if(command == 'logout'){
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminRole');
        this.$router.push('/admin/login');
      }
    },
    handleTranslate(command){
      this.$store.commit('setLocale', command);
      this.$i18n.locale = command;
      localStorage.setItem('locale', command);
    }
  }
};
</script>

<style>
.main-content {
  width: 85%;
  height: 100%;
}
</style>