<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>TLS类型</span>
      </div>
      <div>
        <el-form label-width="80px">
          <el-form-item label="私钥Key">
            <el-input
              v-model="kvs[0].key"
            />
          </el-form-item>
          <el-form-item label="私钥内容">
            <el-input
              v-model="kvs[0].value"
              type="textarea"
            />
            <a href="javascript:" class="file">从文件导入
              <input ref="fileKey" type="file" accept=".txt,.pem,.key,.pkey" @change="()=>fileChange('fileKey')">
            </a>
          </el-form-item>

          <el-form-item label="证书Key">
            <el-input
              v-model="kvs[1].key"
            />
          </el-form-item>
          <el-form-item label="证书内容">
            <el-input
              v-model="kvs[1].value"
              type="textarea"
              placeholder="-----BEGIN CERTIFICATE-----"
            />
            <a href="javascript:" class="file">从文件导入
              <input ref="fileCrt" type="file" accept=".txt,.pem,.crt,.cert" @change="()=>fileChange('fileCrt')">
            </a>
          </el-form-item>
        </el-form>

        <el-button type="primary" icon="el-icon-success" @click="Save">保存</el-button>
      </div>
      <div style="text-align: center;margin-top: 20px;color:red">
        {{ errorMsg }}
      </div>
      <div />
    </el-card>
  </div>
</template>
<script>
import { createSecret } from '@/api/secret'

export default {
  props: ['name', 'namespace'],
  data() {
    return {
      kvs: [
        {
          key: 'tls.key',
          value: ''
        },
        {
          key: 'tls.crt',
          value: ''
        }
      ],
      errorMsg: ''
    }
  },
  methods: {
    fileChange(fileName) {
      console.log(this.$refs[fileName])
      if (this.$refs[fileName].value !== '') {
        const reader = new FileReader()
        reader.readAsText(this.$refs[fileName].files[0], 'UTF-8')
        reader.onload = (e) => {
          if (fileName === 'fileKey') {
            this.kvs[0].value = e.target.result
          } else {
            this.kvs[1].value = e.target.result
          }
        }
      }
    },
    Save() {
      // 把kv数组整合成一个大对象
      const postData = {}
      this.kvs.forEach((item) => {
        postData[item.key] = item.value
      })
      const postModel = {
        name: this.$props.name,
        namespace: this.$props.namespace,
        type: 'kubernetes.io/tls',
        data: postData
      }
      createSecret(postModel)
        .then(rsp => {
          alert('创建成功')
        }).catch((error) => {
          if (error.response) {
            this.errorMsg = JSON.stringify(error.response.data.error)
          } else {
            this.errorMsg = JSON.stringify(error.message)
          }
        })
    }
  }
}
</script>
<style>
.file {
  position: relative;
  display: inline-block;
  background: #D0EEFF;
  border: 1px solid #99D3F5;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1E88C7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #AADFFD;
  border-color: #78C3F3;
  color: #004974;
  text-decoration: none;
}
</style>
