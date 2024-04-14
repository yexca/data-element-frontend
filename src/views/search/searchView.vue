<template>
  <div class="main-container">
    <div class="overlay" v-show="isActive || isLoading"></div>
    <div class="search-container" :class="{ 'top-search': searchPerformed }">
      <div class="search-box-container">
        <input
          class="search-box"
          ref="searchInput"
          v-model="searchQuery"
          @keyup.enter="performSearch"
          @focus="isActive = true"
          @blur="isActive = false"
          placeholder="按空格键开始搜索"
        />
        <button @click="performSearch" class="search-button">搜索</button>
      </div>
      <div v-if="isLoading" class="loading">正在加载...</div>
      <div v-if="searchResults.length" class="results-container">
        <div v-for="item in searchResults" :key="item.dataId" @click="navigate(item)" class="result-item">
          <h3 v-html="highlightText(item.name)"></h3>
          <p v-html="highlightText(item.description)"></p>
          <div class="additional-info">
            <span>用户名: {{ item.username }}</span> |
            <span>分类: {{ item.categoryName || '未分类' }}</span> |
            <span>创建时间: {{ item.createTime }}</span> |
            <span>修改时间: {{ item.updateTime }}</span>
          </div>
        </div>
      </div>
      <div class="auth-buttons">
        <button @click="login" class="auth-button">登录</button>
        <button @click="register" class="auth-button">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { search } from '@/api/search'

export default {
  data() {
    return {
      searchQuery: '',
      isActive: false,
      searchResults: [],
      isLoading: false,
      searchPerformed: false
    };
  },
  mounted() {
    window.addEventListener('keyup', this.handleGlobalKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleGlobalKeyUp);
  },
  methods: {
    login() {
      this.$router.push('/login');
    },
    register() {
      this.$router.push('/register');
    },
    async performSearch() {
      if (!this.searchQuery) return;
      this.isLoading = true;
      try {
        const response = await search({ kw: this.searchQuery });
        if (response.data.code === 1) {
          this.searchResults = response.data.data.records.filter(item => item.status !== 2);
          this.searchPerformed = true;
        } else {
          alert(response.data.msg || '搜索失败');
        }
      } catch (error) {
        console.error('搜索错误:', error);
        alert('搜索请求失败');
      }
      this.isLoading = false;
      this.isActive = false;
      this.$refs.searchInput.blur();
    },
    highlightText(text) {
      return text.replace(/<em>(.*?)<\/em>/g, '<span class="highlight" style="background-color: #ff0; color: black;">$1</span>');
    },
    navigate(item) {
      const routePath = item.type === 1 ? '/data/personal' : '/data/enterprise';
      this.$router.push({ path: routePath, query: { id: item.dataId } });
    },
    activateSearch() {
      this.$refs.searchInput.focus();
      window.scrollTo(0, 0);
    },
    handleGlobalKeyUp(event) {
      if (event.key === ' ') {
        this.activateSearch();
      }
    }
  }
}
</script>


<style scoped>
.main-container {
  background-image: url('@/static/pic/104578537_p0.png');
  background-size: cover;
  background-attachment: fixed;  /* 确保背景图片固定 */
  min-height: 100vh;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  z-index: 1;
}

.search-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;  /* 保证最小高度为视窗高度 */
}

.top-search {
  justify-content: flex-start;
  padding-top: 20px;
}

.search-box-container {
  background: rgba(255, 255, 255, 0.8);
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
}

.search-box {
  border: none;
  outline: none;
  width: 300px;
  padding: 10px;
}

.search-button {
  background-color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  margin-left: 10px;
}

.auth-buttons {
  position: absolute;
  top: 10px;
  right: 10px;
}

.auth-button {
  background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  border: none;
  border-radius: 20px;
  color: white;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.auth-button:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.loading {
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: white;
}

.results-container {
  position: absolute;
  top: 120px;
  width: 100%;
  max-width: 800px; /* Set a max-width for results */
  text-align: center;
}

.result-item {
  background: rgba(255, 255, 255, 0.8);
  margin: 10px auto; /* Center items */
  padding: 20px;
  border-radius: 10px;
  cursor: pointer; /* Indicates item is clickable */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Soft shadow for depth */
}

.additional-info {
  font-size: 0.85em;
  margin-top: 10px;
  color: #666;
}

/* .highlight {
  background-color: #ff0;
  color: black;
} */
</style>
