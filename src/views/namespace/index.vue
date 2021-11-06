<template>
  <el-main>
    <el-container>
      <el-header>
        <el-col :span="5">
          <router-link :to="{name: 'namespace-create'}">新增配置</router-link>
        </el-col>
      </el-header>
    </el-container>
    <el-table
      :data="namespaces"
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
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteNamespace(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>

import { getNamespaceList, deleteNamespaceByName } from '@/api/ns'

export default {
  data() {
    return {
      namespaces: []
    }
  },
  created() {
    getNamespaceList().then(res => {
      this.namespaces = res.data
    })
  },
  methods: {
    deleteNamespace(namespace) {
      deleteNamespaceByName(namespace.name).then(res => {
        alert('删除成功')
      })
    }
  }
}
</script>

<style scoped>

</style>
