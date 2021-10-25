<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="2">请选择命名空间：</el-col>
          <el-col :span="10">
            <el-select v-model="defaultValue" placeholder="请选择命名空间" @change="getDeployment">
              <el-option
                v-for="item in namespaceData"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
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
            <p v-html="getStatus(scope.row)" />
            <p v-show="!scope.row.is_complete" class="el-message--error">{{ getMessage(scope.row) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <router-link
              :to="{
                name: 'deployments-show',
                params: {
                  ns: scope.row.namespace,
                  name: scope.row.name
                }
              }"
            >{{ scope.row.name }}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="命名空间">
          <template slot-scope="scope">
            {{ scope.row.namespace }}
          </template>
        </el-table-column>
        <el-table-column label="镜像">
          <template slot-scope="scope">
            {{ scope.row.images }}
          </template>
        </el-table-column>
        <el-table-column label="可用副本数">
          <template slot-scope="scope">
            <span class="el-message--info">{{ scope.row.replicas[0] }}</span>/
            <span class="el-message--success">{{ scope.row.replicas[1] }}</span>/
            <span class="el-message--error">{{ scope.row.replicas[2] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.created_at }}
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<script>
import { getDeploymentList } from '@/api/deployments'
import { getNamespaceList } from '@/api/ns'
import { NewClient } from '@/utils/ws'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      wsClient: null,
      namespaceData: null,
      defaultValue: 'default'
    }
  },
  created() {
    getNamespaceList().then(response => {
      this.namespaceData = response.data // namespace 列表
    })
    getDeploymentList(this.defaultValue).then(res => {
      this.list = res.data
      this.listLoading = false
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
      getDeploymentList(ns).then(res => {
        this.list = res.data
        this.listLoading = false
        this.defaultValue = ns
      })
    },
    getStatus(row) {
      if (row.is_complete) {
        return '<span class="el-message--success">Active</span>'
      }
      return '<span class="el-message--error">Waiting</span>'
    },
    getMessage(row) {
      if (!row.is_complete) {
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
