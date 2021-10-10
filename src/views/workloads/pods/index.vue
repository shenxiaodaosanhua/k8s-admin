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
          :data="getPodsList(pods)"
          border
          fit
          highlight-current-row
          :summary-method="getCount"
          show-summary
        >
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <p v-html="getStatus(scope.row.is_ready)"></p>
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
              <p>{{ scope.row.message }}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.created_at }}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="getPodsTotal(pods)"
          :page-size="5"
          :current-page="1"
          :hide-on-single-page="true"
          @current-change="(current)=>changePage(defaultValue, current)"
        >
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getList } from '@/api/ns'
import { getPodsByNs } from '@/api/pod'
import { NewClient } from '@/utils/ws'

export default {
  data() {
    return {
      namespaceData: null,
      pods: null,
      defaultValue: ''
    }
  },
  computed: {
    getPodsTotal(pods) {
      return (pods) => {
        if (typeof (pods) === undefined || pods == null) {
          return 0
        }
        return pods.total
      }
    },
    getPodsList(pods) {
      return (pods) => {
        if (typeof (pods) === undefined || pods == null) {
          return null
        }
        return pods.data
      }
    }
  },
  created() {
    getList().then(response => {
      this.namespaceData = response.data // namespace 列表
    })
    this.wsClient = NewClient()
    this.wsClient.onmessage = (e) => {
      if (e.data !== 'ping') {
        const result = JSON.parse(e.data)
        if (result.type === 'pods' && result.result.namespace === this.defaultValue) {
          this.pods = result.result.data
          this.$forceUpdate()
        }
      }
    }
  },
  methods: {
    loadPods(ns, current) {
      this.defaultValue = ns
      if (typeof (current) === undefined || current == null) {
        current = 1
      }
      getPodsByNs(ns, current).then(rsp => {
        this.pods = rsp.data
      })
    },
    getStatus(IsReady) {
      if (IsReady) {
        return '<span class="el-badge__content--success">Active</span>'
      }
      return '<span class="el-badge__content--danger">Waiting</span>'
    },
    changePage(ns, current) {
      this.loadPods(ns, current)
    },
    getCount(param) {
      const { data } = param
      const sum = []
      sum[0] = 'pods合计'
      if (data !== null && data.length > 0) {
        if (typeof (this.pods) === undefined || this.pods == null) {
          sum[1] = 0
        } else {
          sum[1] = this.pods.total
        }
      } else {
        sum[1] = 0
      }
      return sum
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
