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
        :data="secrets"
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
        <el-table-column label="命名空间" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.namespace }}</p>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.type }}</p>
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
import { getSecretListByNs, deleteSecret } from '@/api/secret'

export default {
  data() {
    return {
      secrets: null,
      namespaceData: null,
      defaultValue: ''
    }
  },
  created() {
    getNamespaceList().then(response => {
      this.namespaceData = response.data // namespace 列表
    })
  },
  methods: {
    loadIngress(ns) {
      this.defaultValue = ns
      getSecretListByNs(ns).then(res => {
        this.secrets = res.data
      })
    },
    deleteIngress(secret) {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSecret({
          name: secret.name,
          namespace: secret.namespace
        }).then(res => {
          this.$message.error(res.data)
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
