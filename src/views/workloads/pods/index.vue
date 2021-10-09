<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="2">请选择命名空间：</el-col>
          <el-col :span="10">
            <el-select v-model="defaultValue" @change="loadPods" placeholder="请选择命名空间">
              <el-option
                v-for="item in namespaceData"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <el-container>
      <el-main>
        <el-table
          :data="pods"
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
      namespaceData: null,
      pods: null,
      defaultValue: ''
    }
  },
  created() {
    getList().then(response => {
      this.namespaceData = response.data // namespace 列表
    })
  },
  methods: {
    loadPods(ns) {
      getPodsByNs(ns).then(rsp => {
        this.pods = rsp.data
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
