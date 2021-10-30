<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本配置</span>
          <el-form :inline="true">
            <el-form-item label="role名称">
              <el-input v-model="name" />
            </el-form-item>
            <el-form-item label="命名空间">
              <el-select v-model="namespace" placeholder="请选择命名空间">
                <el-option
                  v-for="item in namespaceData"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>资源授权  <i class="ii el-icon-circle-plus" @click="addRole" /></span>
          <el-form v-for="(rule,ruleindex) in rules" :inline="true" style="margin-top: 20px">
            <el-form-item>
              <el-select
                v-model="rule.groupVersion"
                filterable
                default-first-option
                placeholder="Api组"
                @change="(v)=>selectChanged(v,ruleindex)"
              >
                <el-option-group
                  v-for="(group,index) in resources"
                  :key="group.group+index"
                  :label="group.group"
                  :value="group.group"
                >
                  <el-option
                    v-for="item in group.resources"
                    :key="item.name+index"
                    :label="item.name"
                    :value="group.group+':'+item.name"
                  />
                </el-option-group>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-select
                v-model="rule.verbs"
                style="width: 300px"
                multiple
                placeholder="权限"
              >
                <el-option
                  v-for="v in rule.verbsCopy"
                  :label="v"
                  :value="v"
                />
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="rmRule(ruleindex)">
              <i class="el-icon-minus" /></el-button>
          </el-form>

        </div>
        <el-button type="primary" @click="saveRole">保存</el-button>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { getNamespaceList } from '@/api/ns'
import { getResourceList } from '@/api/resource'
import { createRoles } from '@/api/role'

export default {
  data() {
    return {
      name: '',
      namespace: '',
      namespaceData: [],
      rules: [ // 前端所使用的rule
        { groupVersion: '', verbs: [], verbsCopy: [] }
      ],
      // 提交用的
      postRules: [],
      resources: [] // 从后端 请求 /resources 得到所有 group 和 资源 列表
    }
  },
  created() {
    getNamespaceList().then(response => {
      this.namespaceData = response.data
    })
    getResourceList().then(rsp => {
      this.resources = rsp.data
    })
  },
  methods: {
    addRole() {
      this.rules.unshift({ groupVersion: '', verbs: [] })
    },
    selectChanged(v, index) {
      // v 包含了  group 和 resourcename .需要拆开 ,然后去 resource对象中寻找verbs
      var gv = v.split(':')
      console.log(gv)
      var verbs = []
      this.resources.forEach((item) => {
        if (item.group === gv[0]) {
          item.resources.forEach((res) => {
            if (res.name === gv[1]) {
              verbs = res.verbs
            }
          })
        }
      })
      console.log(verbs)
      this.rules[index].verbs = []
      this.rules[index].verbsCopy = verbs
    },
    rmRule(index) {
      this.rules.splice(index, 1)
    },
    concatRules() {
      // 合并成这样:{apiGroups:[],resources:[],verbs:[]}
      this.postRules = []
      this.rules.forEach((rule) => {
        var gv = rule.groupVersion.split(':')
        var g = gv[0]
        var v = gv[1]
        if (g === 'core') { g = '' }
        this.postRules.push({ apiGroups: [g], resources: [v], verbs: rule.verbs })
      })
    },
    saveRole() {
      this.concatRules()
      const postData = { metadata: { name: this.name, namespace: this.namespace }, rules: this.postRules }
      console.log(postData)
      createRoles(postData).then(rsp => {
        alert('成功')
      })
    }
  }
}
</script>

<style scoped>

</style>
