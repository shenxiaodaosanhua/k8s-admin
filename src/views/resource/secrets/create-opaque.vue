<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>自定义类型

        </span>
      </div>
      <div>
        <el-form v-for="(item,itemindex) in kvs" :inline="true" label-width="80px">
          <el-form-item label="key">
            <el-input v-model="item.key" />
          </el-form-item>
          <el-form-item label="value">
            <el-input v-model="item.value" />
          </el-form-item>
          <el-button
            v-show="itemindex>0"
            type="primary"
            icon="el-icon-minus"
            circle
            @click="rmKV(itemindex)"
          />
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addKV">添加密文</el-button>

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
          key: '',
          value: ''
        }
      ],
      errorMsg: ''
    }
  },
  methods: {
    addKV() {
      this.kvs.push({ key: '', value: '' })
    },
    rmKV(index) {
      this.kvs.splice(index, 1)
    },
    Save() {
      // 把kv数组整合成一个大对象
      const postData = {}
      this.kvs.forEach((item) => {
        postData[item.key] = item.value // 给对对象赋值 包含(key ,value)
      })

      const postModel = {
        name: this.$props.name,
        namespace: this.$props.namespace,
        type: 'Opaque',
        data: postData
      }

      createSecret(postModel)
        .then(rsp => {
          alert('创建成功')
        }).catch((error) => {
          if (error.response) {
            this.errorMsg = JSON.stringify(error.response.data)
          } else {
            this.errorMsg = JSON.stringify(error.message)
          }
        })
    }
  }
}
</script>
