<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本配置</span>
        <el-form :inline="true">
          <el-form-item label="角色名称">
            <el-input v-model="Name" :disabled="isupdate" />
          </el-form-item>
          <el-form-item label="命名空间">
            <el-select v-model="NameSpace" :disabled="isupdate">
              <el-option
                v-for="ns in nslist "
                :label="ns.name"
                :value="ns.name"
              />
            </el-select>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>资源授权  <i class="ii el-icon-circle-plus" @click="addRole" />
          <p style="font-size: 14px;color:gray">提示:对于group是*的，格式为 *:pods 这种形式</p>
        </span>
        <el-form v-for="(rule,ruleindex) in rules" :inline="true" style="margin-top: 20px">
          <el-form-item>
            <el-select
              v-model="rule.groupversion"
              allow-create
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
              allow-create
              filterable
              multiple
              placeholder="权限"
            >
              <el-option
                v-for="v in rule.verbscopy"
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
  </div>
</template>
<script>
import { getNamespaceList as getNsList } from '@/api/ns'
import { getResourceList as getResources } from '@/api/resource'
import { getRoleDetail, updateRole } from '@/api/role'

const defaultVerbs = ['create', 'delete', 'get', 'list', 'patch', 'update', 'watch', 'deletecollection']
export default {
  data() {
    return {
      Name: '',
      NameSpace: '',
      nslist: [],
      rules: [ // 前端所使用的rule
        // {groupversion:'',verbs:[],verbscopy:[]}    //这里做了修改，不再默认有一个空对象
      ],
      // 提交用的
      postRules: [
        // {apiGroups:[],resources:[],verbs:[]}
      ],
      resources: [], // 从后端 请求 /resources 得到所有 group 和 资源 列表
      isupdate: false // 代表是否是编辑
    }
  },
  created() {
    getNsList().then(rsp => {
      this.nslist = rsp.data
    })
    getResources().then(rsp => {
      this.resources = rsp.data
      // 下面代码，如果是编辑，则会有参数传过来
      const ns = this.$route.params.ns
      const name = this.$route.params.name
      if (ns !== undefined && name !== undefined) {
        this.Name = name
        this.NameSpace = ns
        this.loadDetail()
        this.isupdate = true // 代表本界面是编辑
      }
    })
  },
  methods: {
    // 根据group 和resource名称，寻找verbs 。如果找不到 则跳过
    getVerbsByGroupResource(group, resource) {
      group = group.replace(/^\s+|\s+$/gm, '')
      group = group === '' ? 'core' : group // 这是我们故意把空字符显示为core .防止界面显示很奇怪
      var verbs = []
      this.resources.forEach(item => {
        if (item.group === group) {
          item.resources.forEach((res) => {
            if (res.name === resource) {
              verbs = res.verbs
            }
          })
        }
      })
      return verbs
    },
    // 拼凑 {groupversion:'',verbs:[],verbscopy:[]}
    loadDetail() { // 编辑状态  要执行这个函数 ,主要是用来填充权限框
      getRoleDetail(this.NameSpace, this.Name).then(rsp => {
        rsp.data.rules.forEach(rule => {
          rule.apiGroups.forEach(group => {
            // 每一个group，要去 this.resources 中遍历 ，得到 对应的verbs.防止前端创建时 乱填
            rule.resources.forEach((res) => {
              if (group === '*') { // 如果是 *  代表全部，这不作处理 直接加
                this.rules.push({
                  groupversion: '*:' + res,
                  verbs: rule.verbs,
                  verbscopy: defaultVerbs // 使用默认的全部权限列表
                })
                return
              }
              var getVerbs = this.getVerbsByGroupResource(group, res)
              if (getVerbs.length > 0) {
                // 取到的verbs 要和资源本身的verbs进行求交集，防止创建时瞎写
                var rule_verbs = rule.verbs.filter(function(v) {
                  return getVerbs.indexOf(v) !== -1
                })
                group = group === '' ? 'core' : group
                this.rules.push({
                  groupversion: group + ':' + res,
                  verbs: rule_verbs,
                  verbscopy: getVerbs // 存到复制品种
                })
              }
            })
          })
        })
      })
    },
    addRole() {
      this.rules.unshift({ groupversion: '', verbs: [] })
    },
    selectChanged(v, index) {
      // v 包含了  group 和 resourcename .需要拆开 ,然后去 resource对象中寻找verbs
      var gv = v.split(':')
      var verbs = []
      this.resources.forEach((item) => {
        if (item.group === gv[0]) {
          item.resources.forEach((res) => {
            if (res.Name === gv[1]) {
              verbs = res.verbs
            }
          })
        }
      })
      this.rules[index].verbs = []
      this.rules[index].verbscopy = verbs
    },
    rmRule(index) {
      this.rules.splice(index, 1)
    },
    // 拼接
    concatRules() {
      // 合并成这样:{apiGroups:[],resources:[],verbs:[]}
      this.postRules = []
      this.rules.forEach((rule) => {
        var gv = rule.groupversion.split(':') // 切割 。 第一段group 第二段 resourcename，如果碰到是core ，则就是空字符串
        var g = gv[0]
        var v = gv[1]
        if (g === 'core') { g = '' }
        this.postRules.push({ apiGroups: [g], resources: [v], verbs: rule.verbs })
      })
    },
    saveRole() {
      this.concatRules() // 拼接rule对象
      const postData = { metadata: { name: this.Name, namespace: this.NameSpace }, rules: this.postRules }
      console.log(postData)
      if (this.isupdate) { // 代表是编辑模式
        updateRole(this.NameSpace, this.Name, postData).then(rsp => {
          alert('更新成功')
        })
      }
    }
  }

}

</script>
<style>
.ii {
  font-size: 18px
}
</style>
