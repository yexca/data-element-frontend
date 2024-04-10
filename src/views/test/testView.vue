<template>
  <div>
    <el-upload
        class="upload-demo"
        drag
        :http-request="customUpload"
        :before-remove="beforeRemove"
     >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">文件大小不超过 10MB</div>
    </el-upload>
  </div>
</template>

<script>
import { upload } from '@/api/common'
export default {
    data() {
        return {
            
        }
    },
    methods: {
        customUpload(file){
            upload(file).then(res => {
                console.log(res.data.data)
            })
        }
    }
}
</script>

<style>

</style>