<template>
  <div class="logs">
    {{ logs }}
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      logs: ''
    }
  },
  created() {
    request({
      url: '/v1/pod-logs?ns=' + this.$route.params.ns + '&pname=' + this.$route.params.pname + '&cname=' + this.$route.params.cname,
      method: 'GET',
      onDownloadProgress: e => {
        this.logs += e.currentTarget.response
      }
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
