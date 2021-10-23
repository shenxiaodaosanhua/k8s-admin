<template>
  <el-main>
    <el-descriptions class="margin-top" title="带边框列表" :column="2" border>
      <template slot="extra">
        <el-button type="primary" size="small">操作</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          命名空间
        </template>
        {{ namespace }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          名称
        </template>
        {{ name }}
      </el-descriptions-item>
    </el-descriptions>
    <el-table
      :data="configMaps"
      border
    >
      <el-table-column
        label="Key名"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.key }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="value值"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.value }}</p>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import { getConfigMapByNsInfo } from '@/api/configMap'

export default {
  data() {
    return {
      name: '',
      namespace: '',
      configMaps: []
    }
  },
  created() {
    this.name = this.$route.params.name
    this.namespace = this.$route.params.namespace
    getConfigMapByNsInfo(this.namespace, this.name).then(res => {
      for (const key in res.data.data) {
        this.configMaps.push(
          { key, value: res.data.data[key] }
        )
      }
    })
  }
}
</script>

<style scoped>

</style>
