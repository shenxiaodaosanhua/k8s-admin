<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="2">请选择命名空间：</el-col>
        <el-col :span="5">
          <el-select v-model="defaultValue" placeholder="请选择命名空间" @change="loadConfigMap">
            <el-option
              v-for="item in namespaceData"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <router-link :to="{name: 'ConfigMap-Create'}">新增配置</router-link>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        :data="configMap"
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
            <p><router-link
              :to="{
                name: 'ConfigMap-Info',
                params: {
                  name: scope.row.name,
                  namespace: scope.row.namespace
                }
              }"
            >{{ scope.row.name }}</router-link></p>
          </template>
        </el-table-column>
        <el-table-column label="命名空间" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.namespace }}</p>
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
import { deleteConfigMap, getConfigMapByNs } from '@/api/configMap'
import { NewClient } from '@/utils/ws'

export default {
  data() {
    return {
      configMap: null,
      namespaceData: null,
      defaultValue: 'default',
      wsClient: null
    }
  },
  created() {
    getNamespaceList().then(response => {
      this.namespaceData = response.data // namespace 列表
    })
    getConfigMapByNs('default').then(res => {
      this.configMap = res.data
    })
    this.wsClient = NewClient()
    this.wsClient.onmessage = (e) => {
      if (e.data !== 'ping') {
        const result = JSON.parse(e.data)
        if (result.type === 'config-map' && result.result.namespace === this.defaultValue) {
          this.configMap = result.result.data
          this.$forceUpdate()
        }
      }
    }
  },
  methods: {
    loadConfigMap(ns) {
      this.defaultValue = ns
      getConfigMapByNs(ns).then(res => {
        this.configMap = res.data
      })
    },
    deleteIngress(configMap) {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteConfigMap({
          name: configMap.name,
          namespace: configMap.namespace
        }).then(res => {
          this.$message.error(res.data)
        })
      })
    },
    addSecret() {
      this.$router.replace({
        path: '/resource/configmap/create'
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
