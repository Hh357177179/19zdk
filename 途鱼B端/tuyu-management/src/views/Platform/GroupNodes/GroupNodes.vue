<template>
  <div class="group_nodes">
    <Breadcrumb></Breadcrumb>
    <el-card class="mt20">
      <p class="title">用户组权限列表</p>
      <div class="mt20">
        <el-checkbox
          class="check_list"
          v-for="(item, index) in nodes"
          :key="index"
          :checked="data.includes(item.node)"
          @change="handleChange($event, item.node)">
          {{item.title}}
        </el-checkbox>
      </div>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { getNodeList, authNodes, authAddNode, authDelNode } from '@/api/user/user.js'
export default {
  data () {
    return {
      data: [],
      nodes: []
    }
  },
  created () {
    this.getAreadly()
  },
  methods: {
     // 获取符合条件的
    getAreadly () {
      let params = {
        id: this.$route.params.id,
        token: sessionStorage.getItem('token')
      }
      authNodes(params).then(res => {
        console.log(res)
        if (res) {
          this.data = res.nodes
          this.getAllList()
        }
      })
    },

    getAllList () {
      let params = {
        token: sessionStorage.getItem('token')
      }
      getNodeList(params).then(res => {
        console.log(res)
        this.nodes = res.map(item => ({ ...item, ...{ value: item.node } }));
      })
    },

    // 增加节点
    addNodes (node) {
      let params = {
        id: this.$route.params.id,
        node: node,
        token: sessionStorage.getItem('token')
      }
      authAddNode(params).then(res => {
        if (res) {
          this.$message({
            message: '增加节点页面成功！',
            type: 'success',
            duration: 1000
          });
        }
      })
    },

    // 删除节点
    delNodes (node) {
      let params = {
        id: this.$route.params.id,
        node: node,
        token: sessionStorage.getItem('token')
      }
      authDelNode(params).then(res => {
        if (res) {
          this.$message({
            message: '删除节点页面成功！',
            type: 'success',
            duration: 1000
          });
        }
      })
    },

    handleChange (e, item) {
      console.log(e, item)
      if (e == true) {
        this.addNodes(item)
      } else {
        this.delNodes(item)
      }
    }
  },
  components: { Breadcrumb }
}
</script>

<style lang="less">
  .group_nodes{
    .title{
      color: #333;
      font-weight: bold;
    }
    .check_list{
      margin-bottom: 20px;
      margin-right: 60px;
    }
  }
</style>
