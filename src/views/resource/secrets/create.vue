<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本配置</span>
          <el-form :inline="true">
            <el-form-item label="密文名称">
              <el-input v-model="secret.name" />
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
              <el-select v-model="currentValue" placeholder="请选择命名空间" @change="currentType">
                <el-option
                  v-for="item in secretTypes"
                  :key="item.key"
                  :label="item.key"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <Component :is="currentValue" v-bind:name="secret.name" v-bind:namespace="secret.namespace"></Component>
    </el-main>
  </el-container>
</template>

<script>
import { getNamespaceList } from '@/api/ns'

export default {
  components: {
    Opaque: () => import('./create-opaque'),
    Tls: () => import('./create-tls')
  },
  data() {
    return {
      namespaceData: null,
      secretTypes: [
        { key: '通用', value: 'Opaque' },
        { key: 'tls证书', value: 'Tls' }
      ],
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
