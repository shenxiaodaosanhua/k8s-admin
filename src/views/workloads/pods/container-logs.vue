<template>
  <div class="logs">
    {{ logs }}
  </div>
</template>

<script>
import { getPodContainerLogs } from '@/api/pod'

export default {
  data() {
    return {
      logs: ''
    }
  },
  created() {
    getPodContainerLogs(this.$route.params.ns, this.$route.params.pname, this.$route.params.cname).then(res => {
      this.logs += res.data
    })
  }
}
</script>

<style scoped>
.logs {
  overflow: auto;

  margin: 10px auto;
  min-height: 200px;
  max-height: 400px;
  border: solid 1px black;
  background-color: #454545;
  padding: 10px;

  color: #27aa5e;
  line-height: 21pt;
  white-space: pre;
  width: 90%
}
</style>
