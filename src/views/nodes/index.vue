<template>
  <el-main>
    <el-table
      :data="nodes"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="节点名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="节点IP" align="center">
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import { getNodes } from '@/api/node'

export default {
  data() {
    return {
      nodes: []
    }
  },
  created() {
    getNodes().then(res => {
      this.nodes = res.data
    })
  }
}
</script>

<style scoped>

</style>
