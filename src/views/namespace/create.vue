<template>
  <el-main>
    <el-form ref="form" :model="namespace">
      <el-form-item label="名称">
        <el-input v-model="namespace.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import { createNamespace } from '@/api/ns'

export default {
  data() {
    return {
      namespace: {
        name: ''
      }
    }
  },
  methods: {
    onSubmit() {
      createNamespace(this.namespace).then(res => {
        alert('新增成功')
      })
    }
  }
}
</script>

<style scoped>

</style>
