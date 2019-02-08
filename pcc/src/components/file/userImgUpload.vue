<template>
  <el-upload
    class="flex-column flex-center text-left"
    :action="uploadUrl"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :onSuccess="uploadSuccess"
    :before-upload="beforeUpload"
    :multiple="false"
    :show-file-list="false"
    :on-exceed="handleExceed"
  >
    <el-button size="small" type="primary" v-if="!hideButton">上传头像</el-button>
  </el-upload>
</template>

<script>
  export default {
    name: 'userImgUpload',
    props: {
      hideButton: {
        default: false
      }
    },
    data() {
      return {
        uploadUrl: '/pcc/file/upload',
        file: {}
      }
    },
    mounted() {
    },
    watch: {
    },
    methods: {
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      handleExceed(files, fileList) {
      },
      beforeUpload: function(file) {
        let isImage = file.type.indexOf('image/') === 0

        if(!isImage) {
          this.$message.warning('仅允许上传图片，请重新选择文件')
        }

        return isImage
      },
      beforeRemove(file, fileList) {
      },
      uploadSuccess(response, file, fileList) {
        if(response.code === 200) {
          this.$emit('uploadSuccess', response.data[0])
        }
        else {
          fileList.remove(file)
          this.$message.warning(response.message)
        }
      }
    }
  }
</script>

<style scoped>

</style>
