<template>
  <div class="main-container">
    <div class="overlay" v-show="isActive || isLoading"></div>
    <!-- 添加遮罩层，点击时隐藏详情 -->
    <!-- <div class="overlay overlay-active" v-show="selectedItem" @click="selectedItem = null"></div> -->
    <div class="details-container" :class="{ show: selectedItem }" v-if="selectedItem">
        <div v-if="selectedItem.userRole == 101">
          <h2 v-html="highlightText(selectedItem.name)"></h2>
          <p v-html="highlightText(selectedItem.description)"></p>
          <el-divider></el-divider>
          <p>{{ $t('search.username') }}：<router-link :to="'/user/personal/' + selectedItem.userId">{{ selectedItem.username }}</router-link></p>
          <p>{{ $t('search.category') }}: {{ selectedItem.categoryName }}</p>
          <p>{{ $t('search.fileLink') }}: <a :href="selectedItem.fileLink" target="_blank">{{ $t('search.download') }}</a></p>
          <el-divider></el-divider>
          <p v-if="isImage(selectedItem.fileLink)">{{ $t('search.filePreview') }}：</p>
          <img v-if="isImage(selectedItem.fileLink)" :src="selectedItem.fileLink" class="image-preview" />
          <!-- <el-button type="primary" @click="handleCloseResult">关闭</el-button> -->
          <div class="tips">{{ $t('search.tips') }}</div>
        </div>
        <div v-else>
          <h2 v-html="highlightText(selectedItem.name)"></h2>
          <p v-html="highlightText(selectedItem.description)"></p>
          <el-divider></el-divider>
          <p>{{ $t('search.enterprise') }}: <router-link :to="'/user/personal/' + selectedItem.userId">{{ selectedItem.username }}</router-link></p>
          <p>{{ $t('search.category') }}: {{ selectedItem.categoryName }}</p>
          <p>{{ $t('search.sampleFile') }}: <a :href="selectedItem.sampleFileLink" target="_blank">{{ $t('search.download') }}</a></p>
          <p>{{ $t('search.file') }}: <a :href="selectedItem.fileLink" target="_blank">{{ $t('search.download') }}</a></p>
          <el-divider></el-divider>
          <p v-if="isImage(selectedItem.sampleFileLink)">{{ $t('search.sampleFilePreview') }}：</p>
          <img v-if="isImage(selectedItem.sampleFileLink)" :src="selectedItem.sampleFileLink" class="image-preview" />
          <!-- <el-button type="primary" @click="handleCloseResult">关闭</el-button> -->
          <div class="tips">{{ $t('search.tips') }}</div>
        </div>
    </div>
    <div class="search-container" :class="{ 'top-search': searchPerformed }">
      <div class="search-box-container">
        <input
          class="search-box"
          ref="searchInput"
          v-model="searchQuery"
          @keyup.enter="performSearch"
          @focus="isActive = true"
          @blur="isActive = false"
          :placeholder="$t('search.searchPlaceholder')"
        />
        <button @click="performSearch" class="search-button">{{ $t('common.search') }}</button>
      </div>
      <div v-if="isLoading" class="loading">{{ $t('search.loading') }}</div>
      <div v-if="searchPerformed">
        <div v-if="searchResults.length" class="results-container">
          <div v-for="item in paginatedResults" :key="item.dataId" @click="selectItem(item)" class="result-item">
            <div v-if="item.userRole == 101">
              <h3 v-html="highlightText(item.name)" target="_blank"></h3>
              <p v-html="highlightText(item.description)" target="_blank"></p>
              <div class="additional-info">
                <span>{{ $t('search.username') }}: {{ item.username }}</span> |
                <span>{{ $t('search.category') }}: {{ item.categoryName || $t('search.noCategoty') }}</span> |
                <span>{{ $t('search.createTime') }}: {{ item.createTime }}</span> |
                <span>{{ $t('search.updateTime') }}: {{ item.updateTime }}</span>
              </div>
            </div>
            <div v-else>
              <h3 v-html="highlightText(item.name)" target="_blank"></h3>
              <p v-html="highlightText(item.description)" target="_blank"></p>
              <div class="additional-info">
                <span>{{ $t('search.enterprise') }}: {{ item.username }}</span> |
                <span>{{ $t('search.category') }}: {{ item.categoryName || $t('search.noCategoty') }}</span> |
                <span>{{ $t('search.createTime') }}: {{ item.createTime }}</span> |
                <span>{{ $t('search.updateTime') }}: {{ item.updateTime }}</span>
              </div>
            </div>
          </div>
          <div class="pagination-container">
            <div class="pagination">
              <button @click="previousPage" :disabled="currentPage <= 1" class="pagination-button">{{ $t('search.pre') }}</button>
              <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
              <button @click="nextPage" :disabled="currentPage >= totalPages" class="pagination-button">{{ $t('search.next') }}</button>
            </div>
            <div class="total-results">{{ $t('search.total') }}: {{ totalResults }}</div>
          </div>
        </div>
        <div v-else class="results-container no-results">
          <div class="result-item">{{ $t('search.noResult') }}</div>
        </div>
      </div>
      <div class="auth-buttons" v-if="!loginFlag">
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
        <button @click="login" class="auth-button">{{ $t('common.login') }}</button>
        <button @click="register" class="auth-button">{{ $t('common.register') }}</button>
      </div>
      <div class="auth-buttons" v-else>
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
        <button @click="my" class="auth-button">{{ $t('common.my') }}</button>
        <button @click="logout" class="auth-button">{{ $t('common.logout') }}</button>
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
      searchPerformed: false,
      totalResults: 0,
      currentPage: 1,
      resultsPerPage: 10,
      selectedItem: null,
      drawer: false,
      userRole: null,
      // loginFlag: false
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalResults / this.resultsPerPage);
    },
    paginatedResults() {
      const start = (this.currentPage - 1) * this.resultsPerPage;
      return this.searchResults.slice(start, start + this.resultsPerPage);
    },
    loginFlag(){
      const token = localStorage.getItem('token');
      if(token != null){
        return true;
      }else{
        return false;
      }
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
      this.$router.push({
        path: '/login',
        query: {redirect: '/search'}
      });
    },
    register() {
      this.$router.push({
        path: '/register',
        query: {redirect: '/search'}
      });
    },
    logout() {
      localStorage.removeItem('token');
      this.$message.success(this.$t('successMessage.logout'));
      this.$router.go(0);
    },
    my(){
      const currentUserId = localStorage.getItem("userId");
      const userRole = localStorage.getItem('role');
      if(userRole == '101'){
        this.$router.push('/user/personal/' + currentUserId);
      }else{
        this.$router.push('/user/enterprise/' + currentUserId);
      }
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
          alert(response.data.msg || this.$t('errorMessage.search'));
        }
      } catch (error) {
        this.$notify({
          title: this.$t('notifyTitle.error'),
          message: this.$t('notifyMessage.searchFail'),
          type: 'error',
          duration: 1000
        });
      }
      this.isLoading = false;
      this.isActive = false;
      this.$refs.searchInput.blur();
    },
    highlightText(text) {
      return text.replace(/<em>(.*?)<\/em>/g, '<span class="highlight" style="background-color: #ff0; color: black;">$1</span>');
    },
    selectItem(item) {
      // const routePath = item.type === 1 ? '/data/personal' : '/data/enterprise';
      // this.$router.push({ path: routePath, query: { id: item.dataId }, target: '_blank' });
      console.log("Item selected:", item);
      this.selectedItem = item;
      console.log("selected Item:", item);
      this.drawer = true;
    },
    isImage(link) {
      return /\.(jpeg|jpg|gif|png|webp)$/.test(link);
    },
    activateSearch() {
      this.$refs.searchInput.focus();
      window.scrollTo(0, 0);
    },
    handleGlobalKeyUp(event) {
      if (event.key === ' ') {
        this.activateSearch();
        this.selectedItem = null;
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
    // handleCloseResult(){
    //   this.selectedItem = null;
    // }
    handleTranslate(command){
      this.$store.commit('setLocale', command);
      this.$i18n.locale = command;
      localStorage.setItem('locale', command);
    }
  }
}
</script>


<style scoped>
.main-container {
  background-image: url('@/assets/pic/search.webp');
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

.image-preview{
  width: 80%;
  max-height: 300px;
}

/* 点击结果后的样式 */
/* .details-container {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 300px;  
  overflow-y: auto;
}  */
.details-container {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%; /* 高度占满整个视窗高度 */
  width: 300px; /* 定义宽度，例如300px */
  overflow-y: auto; /* 如果内容超过视窗高度，允许滚动 */
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-right: 1px solid #ccc;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1000; /* 确保抽屉在其他内容上方 */
  display: flex; /* 使用 Flexbox */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  flex-direction: column; /* 子元素垂直排列 */
}

.details-container.show {
  transform: translateX(0); /* 当显示时，移动到视图内 */
}

.tips {
  text-align: center;
  color: #555;
  margin-top: 20px;
}
/* .highlight {
  background-color: #ff0;
  color: black;
} */
</style>