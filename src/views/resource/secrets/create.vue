<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本配置</span>
          <el-form :inline="true">
            <el-form-item label="密文名称">
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
          </el-form>
        </div>
      </el-card>
      <Opaque v-bind:name="secret.name" v-bind:namespace="secret.namespace"></Opaque>
    </el-main>
  </el-container>
</template>

<script>
import { getNamespaceList } from '@/api/ns'

export default {
  components: {
    Opaque: () => import('./create-opaque')
  },
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
