<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="2">请选择命名空间：</el-col>
        <el-col :span="5">
          <el-select v-model="defaultValue" placeholder="请选择命名空间" @change="loadRoles">
            <el-option
              v-for="item in namespaceData"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <router-link :to="{name: 'role-create'}">新增规则</router-link>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        :data="roles"
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
                name: 'role-detail',
                params: {
                  name: scope.row.name,
                  ns: scope.row.namespace
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
      </el-table>
    </el-main>
  </el-container>
</template>

<script>

import { getNamespaceList } from '@/api/ns'
import { NewClient } from '@/utils/ws'
import { getRolesByNs } from '@/api/role'

export default {
  data() {
    return {
      roles: null,
      namespaceData: null,
      defaultValue: 'default',
      wsClient: null
    }
  },
  created() {
    getNamespaceList().then(response => {
      this.namespaceData = response.data
    })
    getRolesByNs('default').then(res => {
      this.roles = res.data
    })
    this.wsClient = NewClient()
    this.wsClient.onmessage = (e) => {
      if (e.data !== 'ping') {
        const result = JSON.parse(e.data)
        if (result.type === 'roles' && result.result.namespace === this.defaultValue) {
          this.roles = result.result.data
          this.$forceUpdate()
        }
      }
    }
  },
  methods: {
    loadRoles(ns) {
      this.defaultValue = ns
      getRolesByNs(ns).then(res => {
        this.roles = res.data
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
