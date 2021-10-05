<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>
      <el-table-column label="命名空间">
        <template slot-scope="scope">
          {{ scope.row.Namespace }}
        </template>
      </el-table-column>
      <el-table-column label="镜像">
        <template slot-scope="scope">
          {{ scope.row.Images }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/deployments'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList("myweb").then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
