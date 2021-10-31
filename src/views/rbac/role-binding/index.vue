<template>
  <el-main>
    <el-header>
      <el-row>
        <el-col :span="2">请选择命名空间：</el-col>
        <el-col :span="5">
          <el-select v-model="defaultValue" placeholder="请选择命名空间" @change="loadRoleBinding">
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
    <el-table
      :data="roleBindings"
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
          <p><el-tag v-for="sub in scope.row.subjects" :key="sub" :type="getTagType(sub.kind)">{{ sub.name }}({{ sub.kind }})</el-tag></p>
        </template>
      </el-table-column>
      <el-table-column label="命名空间" align="center">
        <template slot-scope="scope">
          {{ scope.row.namespace }}
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
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import {getNamespaceList} from "@/api/ns";
import {getRoleBindingByNs} from "@/api/role";

export default {
  data() {
    return {
      roleBindings: [],
      defaultValue: 'default',
      namespaceData: []
    }
  },
  created() {
    getNamespaceList().then(response => {
      this.namespaceData = response.data // namespace 列表
    })
    getRoleBindingByNs(this.defaultValue).then(res => {
      this.roleBindings = res.data
    })
  },
  methods: {
    loadRoleBinding() {
      getRoleBindingByNs(this.defaultValue).then(res => {
        this.roleBindings = res.data
      })
    },
    getTagType(type) {
      if (type === 'User') {
        return 'success'
      }
      return 'danger'
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
