<template>
  <el-main>
    <el-descriptions title="Deployment信息" direction="vertical" :column="2" border>
      <el-descriptions-item label="名称">
        {{ name }}
      </el-descriptions-item>
      <el-descriptions-item label="命名空间">{{ namespace }}</el-descriptions-item>
      <el-descriptions-item label="镜像">{{ deployment.images }}</el-descriptions-item>
      <el-descriptions-item label="状态">{{ deployment.is_complete }}</el-descriptions-item>
      <el-descriptions-item label="副本数">
        <div v-if="deployment.replicas">
          <el-tag type="info">副本数:{{ deployment.replicas[0] }}</el-tag>
          <el-tag type="success">可用:{{ deployment.replicas[1] }}</el-tag>
          <el-tag type="danger">不可用:{{ deployment.replicas[2] }}</el-tag>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </el-main>
</template>

<script>

import { getDeploymentInfo } from '@/api/deployments'

export default {
  data() {
    return {
      namespace: '',
      name: '',
      deployment: {}
    }
  },
  created() {
    this.name = this.$route.params.name
    this.namespace = this.$route.params.ns
    getDeploymentInfo(this.namespace, this.name).then(res => {
      this.deployment = res.data
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
.el-tag{
  margin: 0 10px;
}
</style>
