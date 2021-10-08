<template>
  <div>
    <el-container v-for="ns in nslist" :key="ns.$index">
      <el-header>{{ ns.namespace }}</el-header>
      <el-main>
        <el-table
          :data="pods[ns.namespace]"
          border
          fit
          :row-key="ns.namespace"
          highlight-current-row
        >
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>

          <el-table-column label="名称">
            <template slot-scope="scope">
              <p>{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column label="镜像" align="center">
            <template slot-scope="scope">
              <p>{{ scope.row.images }}</p>
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
  </div>
</template>

<script>
import { getList } from '@/api/ns'
import { getPodsByNs } from '@/api/pod'

export default {
  data() {
    return {
      nslist: null,
      pods: {}
    }
  },
  created() {
    getList().then(response => {
      this.nslist = response.data // namespace 列表
      this.nslist.forEach(ns => { // 循环获取pods
        this.loadPods(ns.namespace)
      })
    })
    console.log(this.nslist, this.pods)
  },
  methods: {
    loadPods(ns) {
      getPodsByNs(ns).then(rsp => {
        this.pods[ns] = rsp.data
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
