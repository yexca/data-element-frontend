<template>
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">上一页</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">下一页</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    },
    methods: {
      changePage(page) {
        this.$emit('change-page', page);
      }
    }
  }
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  button {
    margin: 0 5px;
    padding: 5px 10px;
  }
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>
  