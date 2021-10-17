<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="2">请选择命名空间：</el-col>
        <el-col :span="10">
          <el-select v-model="defaultValue" placeholder="请选择命名空间" @change="loadIngress">
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
    <el-main>
      <el-table
        :data="ingress"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="域名" align="center">
          <template slot-scope="scope">
            <p>
              <a target="_blank" :href="'http://' + scope.row.host">{{ scope.row.host }}</a>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="配置" align="center">
          <template slot-scope="scope">
            <p>
              <i :class="scope.row.ingress_options.is_cors ? 'el-icon-success' : 'el-icon-error'">跨域</i>
            </p>
            <p>
              <i :class="scope.row.ingress_options.is_rewrite ? 'el-icon-success' : 'el-icon-error'">重写</i>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.created_at }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteIngress(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>

import { getNamespaceList } from '@/api/ns'
import { getIngressList, deleteIngress } from '@/api/ingress'
import { NewClient } from '@/utils/ws'


export default {
  data() {
    return {
      ingress: null,
      namespaceData: null,
      defaultValue: '',
      wsClient: null
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
        if (result.type === 'ingress' && result.result.namespace === this.defaultValue) {
          this.ingress = result.result.data
          this.$forceUpdate()
        }
      }
    }
  },
  methods: {
    loadIngress(ns) {
      this.defaultValue = ns
      getIngressList(ns).then(res => {
        this.ingress = res.data
      })
    },
    deleteIngress(ingress) {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteIngress({
          name: ingress.name,
          namespace: ingress.namespace
        }).then(res => {
          console.log(res)
        })
      })
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
