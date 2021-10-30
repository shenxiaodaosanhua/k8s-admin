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
          <p><el-tag v-for="label in scope.row.labels" :key="label" type="success">{{ label }}</el-tag></p>
          <p><el-tag v-for="taint in scope.row.taints" :key="taint" type="danger">{{ taint }}</el-tag></p>
        </template>
      </el-table-column>
      <el-table-column label="节点IP" align="center">
        <template slot-scope="scope">
          {{ scope.row.ip }}
        </template>
      </el-table-column>
      <el-table-column label="CPU" align="center">
        <template slot-scope="scope">
          {{ Math.round(scope.row.usage.cpu*100) }}% / {{ scope.row.capacity.cpu }}核
        </template>
      </el-table-column>
      <el-table-column label="内存" align="center">
        <template slot-scope="scope">
          {{ Math.round(scope.row.usage.memory*100) }}% / {{ Math.round(scope.row.capacity.memory/1000/1000/1000) }}G
        </template>
      </el-table-column>
      <el-table-column label="Pods" align="center">
        <template slot-scope="scope">
          {{ scope.row.usage.pods }}/{{ scope.row.capacity.pods }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="{name:'node-update', params:{name:scope.row.name}}">
            <el-button type="text">编辑</el-button>
          </router-link>
          <router-link :to="{name:'node-shell', params:{name:scope.row.name}}">
            <el-button type="text">远程Shell</el-button>
          </router-link>
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
