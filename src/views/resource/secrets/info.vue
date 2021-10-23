<template>
  <el-main>
    <el-descriptions class="margin-top" title="带边框列表" :column="2" border>
      <template slot="extra">
        <el-button type="primary" size="small">操作</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          命名空间
        </template>
        {{ ns }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          名称
        </template>
        {{ name }}
      </el-descriptions-item>
    </el-descriptions>
    <div style="text-align: center">
      <el-table
        v-show="ext_data.length>0"
        :data="ext_data"
        border
        style="width: 100%"
      >
        <el-table-column
          label="Key名"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.key }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="value值"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.value }}</p>
          </template>
        </el-table-column>

      </el-table>
      <el-table
        :data="secrets"
        border
      >
        <el-table-column
          label="Key名"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.key }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="value值"
        >
          <template slot-scope="scope">
            <p
              :ref="scope.row.key"
              @mousedown="()=>b64Decode(scope.row.value,scope.row.key)"
              @mouseup="()=>showStr(scope.row.value,scope.row.key)"
            >{{ scope.row.value }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-main>
</template>

<script>
import { getSecretInfo } from '@/api/secret'

export default {
  data() {
    return {
      ns: '',
      name: '',
      secrets: [],
      ext_data: []
    }
  },
  created() {
    this.ns = this.$route.params.ns
    this.name = this.$route.params.name
    getSecretInfo(this.ns, this.name).then(res => {
      for (const key in res.data.data) {
        this.secrets.push(
          { key, value: res.data.data[key] }
        )
      }
      for (const key in res.data.ext_data) {
        this.ext_data.push(
          { key, value: res.data.ext_data[key] }
        )
      }
    })
  },
  methods: {
    b64Decode(str, ref) {
      this.$refs[ref].innerHTML = decodeURIComponent(atob(str))
    },
    showStr(str, ref) {
      this.$refs[ref].innerHTML = str
    }

  }
}
</script>

<style scoped>

</style>
