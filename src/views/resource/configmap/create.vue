<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本配置</span>
          <el-form :inline="true">
            <el-form-item label="密文名称">
              <el-input v-model="configmap.name" />
            </el-form-item>
            <el-form-item label="命名空间">
              <el-select v-model="configmap.namespace" placeholder="请选择命名空间">
                <el-option
                  v-for="item in namespaceData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>自定义类型</span>
        </div>
        <div>
          <el-form v-for="(item, itemKey) in configmap.data" :inline="true" label-width="80px">
            <el-form-item label="key">
              <el-input v-model="item.key" />
            </el-form-item>
            <el-form-item label="value">
              <el-input v-model="item.value" />
            </el-form-item>
            <el-button
              v-show="itemKey>0"
              type="primary"
              icon="el-icon-minus"
              circle
              @click="removeData(itemKey)"
            />
          </el-form>
          <el-button type="primary" icon="el-icon-plus" @click="addData">新增配置</el-button>
          <el-button type="primary" icon="el-icon-success" @click="Save">保存</el-button>
        </div>
        <div style="text-align: center;margin-top: 20px;color:red">
          {{ errorMsg }}
        </div>
        <div />
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { getNamespaceList } from '@/api/ns'
import { createConfigMap } from '@/api/configMap'

export default {
  data() {
    return {
      namespaceData: null,
      configmap: {
        name: '',
        namespace: '',
        data: [
          { key: '', value: '' }
        ]
      },
      errorMsg: ''
    }
  },
  created() {
    getNamespaceList().then(response => {
      this.namespaceData = response.data // namespace 列表
    })
  },
  methods: {
    addData() {
      this.configmap.data.push({ key: '', value: '' })
    },
    removeData(index) {
      this.configmap.data.splice(index, 1)
    },
    Save() {
      const createData = {}
      this.configmap.data.forEach((item) => {
        createData[item.key] = item.value // 给对对象赋值 包含(key ,value)
      })
      this.configmap.data = createData
      createConfigMap(this.configmap).then(res => {
        if (res.data === 'ok') {
          alert('新增成功')
        }
      }).catch(error => {
        if (error.response) {
          this.errorMsg = error.response
        } else {
          this.errorMsg = error
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
