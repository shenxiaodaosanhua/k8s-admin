<template>
  <el-container>
    <el-main>
      <el-form ref="form" :model="secret" label-width="100px">
        <el-form-item label="名称">
          <el-input v-model="secret.name"></el-input>
        </el-form-item>
        <el-form-item label="命名空间">
          <el-select v-model="secret.namespace" placeholder="请选择命名空间">
            <el-option
              v-for="item in namespaceData"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="密文类型">
          <el-select v-model="currentValue" placeholder="请选择密文类型" @change="currentType">
            <el-option
              v-for="item in typeData"
              :key="item.key"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { getNamespaceList } from '@/api/ns'

export default {
  data() {
    return {
      namespaceData: null,
      currentValue: '',
      secret: {
        name: '',
        namespace: ''
      },
      typeData: [
        {
          key: 'Opaque',
          value: '通用'
        }
      ]
    }
  },
  created() {
    getNamespaceList().then(response => {
      this.namespaceData = response.data // namespace 列表
    })
  },
  methods: {
    currentType() {
      console.log(111)
    }
  }
}
</script>

<style scoped>

</style>
