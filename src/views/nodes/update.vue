<template>
  <el-main>
    <el-descriptions title="POD信息" direction="vertical" :column="2" border>
      <el-descriptions-item label="名称">{{ node.name }}</el-descriptions-item>
      <el-descriptions-item label="IP">{{ node.ip }}</el-descriptions-item>
    </el-descriptions>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>标签(系统标签请谨慎修改)<i class="ii el-icon-circle-plus" @click="addLabel" /></span>
      </div>
      <template v-for="(item, itemIndex) in labels">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="item.key" placeholder="标签key" />
          </el-form-item>
          <el-form-item label="=">
            <el-input v-model="item.value" placeholder="标签值" />
          </el-form-item>
          <el-form-item>
            <i class=" ii el-icon-remove-outline" @click="rmLabel(itemIndex)" />
          </el-form-item>
        </el-form>
      </template>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>污点<i class="ii el-icon-circle-plus" @click="addTaint" /></span>
      </div>
      <template v-for="(item, itemIndex) in taints">
        <el-form :inline="true">
          <el-form-item label="键">
            <el-input v-model="item.key" placeholder="key" />
          </el-form-item>
          <el-form-item label="值">
            <el-input v-model="item.value" placeholder="值" />
          </el-form-item>
          <el-form-item label="影响">
            <el-select v-model="item.effect">
              <el-option label="不调度" value="NoSchedule" />
              <el-option label="尽量不调度" value="PreferNoSchedule" />
              <el-option label="不调度+驱逐" value="NoExecute" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <i class=" ii el-icon-remove-outline" @click="rmTaint(itemIndex)" />
          </el-form-item>
        </el-form>
      </template>
    </el-card>
    <div style="text-align: center;margin-top: 20px">
      <el-button type="primary" @click="updateNode">保存</el-button>
    </div>
  </el-main>
</template>
<script>
import { getNodeDetail, updateNode } from '@/api/node'

export default {
  data() {
    return {
      node: {},
      labels: [],
      taints: []
    }
  },
  created() {
    getNodeDetail(this.$route.params.name).then(res => {
      this.node = res.data
      for (const key in this.node.origin_labels) {
        this.labels.push({ key: key, value: this.node.origin_labels[key] })
      }
      if (this.node.origin_taints !== null) {
        this.node.origin_taints.forEach(item => {
          this.taints.push({ key: item.key, value: item.value, effect: item.effect })
        })
      }
      this.$forceUpdate()
    })
  },
  mounted() {

  },
  methods: {
    addLabel() {
      this.labels.unshift({ Key: '', Value: '' })
    },
    rmLabel(objIndex) {
      this.labels.forEach((item, itemKey) => {
        if (itemKey === objIndex) {
          this.labels.splice(objIndex, 1)
        }
      })
    },
    addTaint() {
      this.taints.unshift({ Key: '', Value: '', Effect: '' })
    },
    rmTaint(objIndex) {
      this.taints.forEach((item, itemIndex) => {
        if (itemIndex === objIndex) {
          this.taints.splice(objIndex, 1)
        }
      })
    },
    updateNode() {
      const saveLabels = {}
      this.labels.forEach(item => {
        saveLabels[item.key] = item.value
      })
      console.log(saveLabels)
      const node = { name: this.node.name, origin_labels: saveLabels, origin_taints: this.taints }
      updateNode(node).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style>
.ii {
  cursor: pointer;
  font-size: 28px
}
</style>
