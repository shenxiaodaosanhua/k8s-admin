<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本配置</span>
      </div>
      <el-form :inline="true">
        <el-form-item label="名称">
          <el-input v-model="ingress.name" placeholder="ingress名称" />
        </el-form-item>
        <el-form-item label="命名空间">
          <el-select v-model="ingress.namespace" placeholder="请选择命名空间" @change="onNsChange">
            <el-option
              v-for="item in namespaceData"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>标签</span>
      </div>
      <el-container>
        <el-input
          v-model="ingress.annotations"
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
        />
      </el-container>
      <Cors ref="cors" />
      <Rewrite ref="rewrite" />
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>规则</span>
      </div>
      <el-form v-for="(rule, ruleKey) in ingress.rules" v-model="ingress.rules">
        <el-form :inline="true">
          <el-form-item label="域名">
            <el-input v-model="rule.host" placeholder="填写域名" />
          </el-form-item>
          <el-button type="primary" @click="addPathCfg(ruleKey)">+</el-button>
        </el-form>
        <template v-for="(path, pathKey) in rule.paths">
          <el-form :inline="true">
            <el-form-item label="Path">
              <el-input v-model="path.path" placeholder="Path" />
            </el-form-item>
            <el-form-item label="服务名">
              <el-select v-model="path.service_name" placeholder="选择服务">
                <el-option
                  v-for="item in svcs"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="端口">
              <el-input v-model="path.port" placeholder="填写服务端口" />
            </el-form-item>
            <el-form-item>
              <el-button v-show="pathKey>0" type="primary" @click="rmPathCfg(ruleKey, pathKey)">-</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-form>
    </el-card>

    <div style="text-align: center;margin-top: 20px">
      <el-button type="primary" @click="postNew()">保存</el-button>
    </div>
  </div>
</template>
<script>
import { createIngress } from '@/api/ingress'
import { getNamespaceList } from '@/api/ns'
import { getSvcListByNs } from '@/api/svc'
import Cors from './cors'
import Rewrite from './rewrite'

export default {
  components: {
    Cors,
    Rewrite
  },
  data() {
    return {
      namespaceData: [],
      svcs: [],
      ingress: {
        name: '',
        namespace: '',
        annotations: '',
        rules: [
          {
            host: '',
            paths: [
              {
                path: '',
                service_name: '',
                port: ''
              }
            ]
          }
        ]
      }
    }
  },
  created() {
    getNamespaceList().then(response => {
      this.namespaceData = response.data // namespace 列表
    })
  },
  methods: {
    // 新增path 配置
    addPathCfg(index) {
      this.ingress.rules.forEach((item, key) => {
        if (key === index) {
          item.paths.push({
            path: '',
            service_name: '',
            port: ''
          })
        }
      })
    },
    // 删除path 配置
    rmPathCfg(ruleIndex, pathIndex) {
      this.ingress.rules.forEach((item, ruleKey) => {
        if (ruleIndex === ruleKey) {
          item.paths.forEach((path, pathKey) => {
            if (pathKey === pathIndex) {
              item.paths.splice(pathKey, 1)
            }
          })
        }
      })
    },
    postNew() {
      let annotations = this.ingress.annotations
      for (const ref in this.$refs) {
        annotations += this.$refs[ref].output()
      }
      this.ingress.annotations = annotations
      createIngress(this.ingress)
        .then((res) => {
          if (res.data === 'ok') {
            this.$message({
              message: '增加成功',
              type: 'success',
              onClose: e => {
                this.$router.replace({
                  path: '/ingress/index'
                })
              }
            })
          }
        })
    },
    onNsChange(ns) {
      getSvcListByNs(ns).then(res => {
        this.svcs = res.data
      })
    }
  }

}
</script>
