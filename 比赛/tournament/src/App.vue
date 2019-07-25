<template>
  <div id="app">
    <router-view/>
    <TableBar></TableBar>
  </div>
</template>

<script>
import TableBar from '@/components/TableBar'
export default {
  data () {
    return{}
  },
  methods: {
    
  },
  components: { TableBar }
}
</script>

<style lang="less">
  .change_lang{
    font-size: 14px;
    position: absolute;
    right: 10px;
    top: 18px;
    line-height: 25px;
    color: #76A1FF;
    border: 1px solid #76A1FF;
    width: 60px;
    text-align: center;
    border-radius: 3px;
  }
</style>
