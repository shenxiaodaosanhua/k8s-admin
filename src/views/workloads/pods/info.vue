<template>
  <el-main>
    <el-descriptions title="POD信息" direction="vertical" :column="2" border>
      <el-descriptions-item label="名称">{{ name }}</el-descriptions-item>
      <el-descriptions-item label="命名空间">{{ namespace }}</el-descriptions-item>
      <el-descriptions-item label="节点">{{ pod.node_name }}</el-descriptions-item>
      <el-descriptions-item label="镜像">{{ pod.images }}</el-descriptions-item>
      <el-descriptions-item label="IP地址">{{ pod.ip }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ pod.created_at }}</el-descriptions-item>
    </el-descriptions>
    <el-header>容器列表</el-header>
    <el-table
      :data="pod.containers"
    >
      <el-table-column
        label="名称"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="镜像"
      >
        <template slot-scope="scope">
          {{ scope.row.image }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <router-link
            :to="{
              name: 'pods-container-logs',
              params: {
                ns: pod.namespace,
                pname: pod.name,
                cname: scope.row.name,
              }
            }"
          >查看日志</router-link>
        </template>

      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>

import { getPodInfo } from '@/api/pod'

export default {
  data() {
    return {
      namespace: '',
      name: '',
      pod: {}
    }
  },
  computed: {

  },
  created() {
    this.name = this.$route.params.name
    this.namespace = this.$route.params.ns
    getPodInfo(this.namespace, this.name).then(res => {
      this.pod = res.data
    })
  },
  methods: {

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
