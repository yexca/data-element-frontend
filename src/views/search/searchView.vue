<template>
  <div class="main-container">
    <div class="overlay" v-show="isActive || isLoading"></div>
    <div class="search-and-details-container">
      <div class="search-container" :class="{ 'top-search': searchPerformed }">
        <!-- 现有的搜索框和结果列表 -->
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
        <div v-if="searchPerformed">
          <div v-if="searchResults.length" class="results-container">
            <div v-for="item in paginatedResults" :key="item.dataId" @click="selectItem(item)" class="result-item">
              <h3 v-html="highlightText(item.name)"></h3>
              <p v-html="highlightText(item.description)"></p>
              <div class="additional-info">
                <span>用户名: {{ item.username }}</span> |
                <span>分类: {{ item.categoryName || '未分类' }}</span> |
                <span>创建时间: {{ item.createTime }}</span> |
                <span>修改时间: {{ item.updateTime }}</span>
              </div>
            </div>
            <pagination-controls :current-page="currentPage" :total-pages="totalPages" @change-page="changePage" />
          </div>
          <div v-else class="results-container no-results">
            <div class="result-item">没有找到结果</div>
          </div>
        </div>
      </div>
      <div class="details-container" v-if="selectedItem">
        <h2>{{ selectedItem.name }}</h2>
        <p>{{ selectedItem.description }}</p>
        <p>用户名: <router-link :to="'/user/personal/' + selectedItem.userId">{{ selectedItem.username }}</router-link></p>
        <p>分类: <router-link :to="'/category/' + selectedItem.categoryId">{{ selectedItem.categoryName }}</router-link></p>
        <p>状态: {{ selectedItem.status }}</p>
        <p>文件链接: <a :href="selectedItem.fileLink" target="_blank">{{ selectedItem.fileLink }}</a></p>
        <img v-if="isImage(selectedItem.fileLink)" :src="selectedItem.fileLink" class="image-preview" />
      </div>
    </div>
  </div>
</template>

<script>
import { search } from '@/api/search';
import PaginationControls from '@/components/PaginationControls';

export default {
  components: {
    PaginationControls
  },
  data() {
    return {
      searchQuery: '',
      isActive: false,
      searchResults: [],
      isLoading: false,
      searchPerformed: false,
      totalResults: 0,
      currentPage: 1,
      resultsPerPage: 10,
      selectedItem: null
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalResults / this.resultsPerPage);
    },
    paginatedResults() {
      const start = (this.currentPage - 1) * this.resultsPerPage;
      return this.searchResults.slice(start, start + this.resultsPerPage);
    }
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
          this.totalResults = response.data.data.total;
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
      this.$router.push({ path: routePath, query: { id: item.dataId }, target: '_blank' });
    },
    activateSearch() {
      this.$refs.searchInput.focus();
      window.scrollTo(0, 0);
    },
    handleGlobalKeyUp(event) {
      if (event.key === ' ') {
        this.activateSearch();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    selectItem(item) {
      this.selectedItem = item;
    },
    isImage(link) {
      return /\.(jpeg|jpg|gif|png)$/.test(link);
    },
    changePage(newPage) {
      this.currentPage = newPage;
    }
  }
}
</script>


<style scoped>
.details-container {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 300px; /* Adjust width as needed */
  overflow-y: auto; /* Enable scrolling if content is long */
}

.main-container {
  background-image: url('@/static/pic/104578537_p0.png');
  background-size: cover;
  background-attachment: fixed;  /* 确保背景图片固定 */
  min-height: 100vh;
  display: flex;
  justify-content: center; /* 确保主容器内容水平居中 */
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
  min-height: 100vh;
  width: 100%; /* 确保搜索容器占满整个可视区域宽度 */
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
  position: fixed;
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
  position: relative;
  top: 0;
  width: 100%;
  max-width: 800px;
  text-align: center;
  background: rgba(255, 255, 255, 0.8); /* 应用半透明背景 */
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.result-item {
  background: rgba(255, 255, 255, 0.9);
  margin: 10px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: background-color 0.3s, transform 0.3s; /* 添加平滑过渡效果 */
  user-select: none; /* 防止文本被选择 */
  cursor: pointer; /* 显示可以点击的指针 */
}

.result-item:hover {
  background-color: #f0f0f0; /* 鼠标悬停时改变背景色 */
  transform: translateY(-5px); /* 轻微向上移动 */
  box-shadow: 0 4px 6px rgba(0,0,0,0.2); /* 加深阴影效果 */
}

.result-item:active {
  background-color: #e0e0e0; /* 鼠标点击时改变背景色 */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* 恢复原始阴影效果 */
}

.additional-info {
  font-size: 0.85em;
  margin-top: 10px;
  color: #666;
}

.pagination-container {
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-button:hover {
  background-color: #0056b3;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-size: 1rem;
  color: #333;
}

.total-results {
  font-size: 1rem;
  color: #333;
}

.no-results {
  text-align: center;
  font-size: 1.5rem;
  color: #666;
}

/* .highlight {
  background-color: #ff0;
  color: black;
} */
</style>