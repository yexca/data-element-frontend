<template>
  <div class="main">
    <div class="userInfo">
        <el-form :model="form" label-width="100px">
          <el-form-item label="userId" disabled="false" prop="userId"></el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import { getPersonalUser } from '@/api/userPersonalUser'

export default {
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
        form: null
    }
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      const userId = this.userId;
      getPersonalUser(userId).then((res) => {
        if(res && res.data && res.data.data){
            this.form = res.data.data;
        }else{
            return
        }
        
      });
    },
  }
}
</script>

<style>

</style>