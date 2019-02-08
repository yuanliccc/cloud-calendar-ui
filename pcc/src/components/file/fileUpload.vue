<template>
  <el-upload
    class="text-left"
    :action="uploadUrl"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :onSuccess="uploadSuccess"
    multiple
    :limit="5"
    :on-exceed="handleExceed"
    :file-list="fileList"
  >
    <el-button size="small" type="primary" v-if="!hideButton">上传文件</el-button>
    <div slot="tip" class="el-upload__tip" style="display: inline-block; margin-left: 10px" v-if="!hideButton">
      可多次上传文件
    </div>
  </el-upload>
</template>

<script>
  export default {
    name: 'fileUpload',
    props: {
      hideButton: {
        default: false
      }
    },
    data() {
      return {
        uploadUrl: '/pcc/file/upload',
        fileList: [],
        files:[],
      }
    },
    mounted() {
    },
    watch: {
    },
    methods: {
      handleRemove(file, fileList) {
        // 执行数据库删除操作
        if (undefined !== file.response) {
          this.$store.commit('showLoading')
          // 请求
          this.$axios.post('/pcc/file/delete', file.response.data[0])
            .then(res => {
              const data = res.data
              if (data.data == null) {
                // 弹框
              }
              else {
                fileList.remove(file)
                this.files.remove(file.response.data[0])
                this.$emit('uploadSuccess', this.files)
              }
              this.$store.commit('hideLoading')
            })
            .catch(err => {
              this.$store.commit('hideLoading')
            })
        }
        else {
          //
        }
      },
      handlePreview(file) {
        this.$confirm('您确定要将文件下载？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('file:' + file.url.substring(0, 4))
          if (file.url.substring(0, 5) === 'blob:') {
            this.$confirm('请保存信息后再下载！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
            return false;
          } else {
            document.location.href = '/api/photoUpload/imgDownload?filePath=' + file.url + '&fileName=' + file.name;
          }
        });
      },
      handleExceed(files, fileList) {
        // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        // this.form.declarationAttachment = this.form.declarationAttachment.replace(file.url + ',', '');
        // console.log('删除文件前', this.form.declarationAttachment);
        // return this.$confirm(`确定移除 ${file.name}？`);
      },
      // 文件上传成功后
      uploadSuccess(response, file, fileList) {
        // 判断是否错误
        if(response.code === 200) {
          // 将返回的 file 列表添加到 this.files 中
          this.files = this.files.concat(response.data)
          this.$emit('uploadSuccess', this.files)
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
