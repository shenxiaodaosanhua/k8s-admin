<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="2">请选择命名空间：</el-col>
          <el-col :span="10">
            <el-select v-model="defaultValue" @change="getDeployment" placeholder="请选择命名空间">
              <el-option
                v-for="item in namespaceData"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <el-container>
      <el-table
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
    </el-container>
  </div>
</template>

<script>
import { getList } from '@/api/deployments'
import { getNamespaceList } from '@/api/ns'
import { NewClient } from '@/utils/ws'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      wsClient: null,
      namespaceData: null,
      defaultValue: ''
    }
  },
  created() {
    getNamespaceList().then(response => {
      this.namespaceData = response.data // namespace 列表
    })
    this.wsClient = NewClient()
    this.wsClient.onmessage = (e) => {
      if (e.data !== 'ping') {
        const result = JSON.parse(e.data)
        if (result.type === 'deployments' && result.result.namespace === this.defaultValue) {
          this.list = result.result.data
          this.$forceUpdate()
        }
      }
    }
  },
  methods: {
    getDeployment(ns) {
      getList(ns).then(res => {
        this.list = res.data
        this.listLoading = false
        this.defaultValue = ns
      })
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

<style scoped>
.el-header, .el-footer {
  background-color: #7cd1c0;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
</style>
