<template>
  <div class="main-container">
    <div class="overlay" v-show="isActive"></div>
    <div class="search-container">
      <div class="search-box-container">
        <input
          class="search-box"
          ref="searchInput"
          v-model="searchQuery"
          @keyup.enter="performSearch"
          @focus="isActive = true"
          @blur="isActive = false"
          placeholder="Search Google or type a URL"
        />
        <button @click="performSearch" class="search-button">搜索</button>
      </div>
      <div class="auth-buttons">
        <button @click="login" class="auth-button">登录</button>
        <button @click="register" class="auth-button">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      isActive: false
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
      // 实现登录逻辑
      alert('登录功能待实现');
    },
    register() {
      // 实现注册逻辑
      alert('注册功能待实现');
    },
    performSearch() {
      // 用来处理搜索逻辑
      alert(`搜索内容: ${this.searchQuery}`);
      this.isActive = false;
      this.$refs.searchInput.blur();
    },
    activateSearch() {
      this.$refs.searchInput.focus();
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
height: 100vh;
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
  height: 100vh;
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
</style>
