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
      <el-table-column label="状态">
        <template slot-scope="scope">
          <p v-html="getStatus(scope.row)"></p>
          <p v-show="!scope.row.IsComplete" class="el-message--error">{{ getMessage(scope.row) }}</p>
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
      <el-table-column label="可用副本数">
        <template slot-scope="scope">
          <span class="el-message--info">{{ scope.row.Replicas[0] }}</span>/
          <span class="el-message--success">{{ scope.row.Replicas[1] }}</span>/
          <span class="el-message--error">{{ scope.row.Replicas[2] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.CreatedAt }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/deployments'
import { NewClient } from '@/utils/ws'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      wsClient: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList('myweb').then(response => {
        this.list = response.data
        this.listLoading = false
      })
      this.wsClient = NewClient()
      this.wsClient.onmessage = (e) => {
        if (e.data !== 'ping') {
          this.list = JSON.parse(e.data)
          this.$forceUpdate()
        }
      }
    },
    getStatus(row) {
      if (row.IsComplete) {
        return '<span class="el-message--success">Active</span>'
      }
      return '<span class="el-message--error">Waiting</span>'
    },
    getMessage(row) {
      if (!row.IsComplete) {
        return row.Message
      }

      return ''
    }
  }
}
</script>
