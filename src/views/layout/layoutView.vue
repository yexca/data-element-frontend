<template>
  <div class="layout" style="display: flex; justify-content: flex-start;">
    <!-- 左侧导航区域 -->
    <sideBarView class="menu"></sideBarView>
    <!-- 右侧内容区域 -->
    <mainView class="main"></mainView>
  </div>
</template>

<script>
import mainView from './mainView.vue';
import sideBarView from './sideBarView.vue';

export default {
  components: {
    mainView,
    sideBarView
  }
};
</script>

<style>

</style>