<template>
  <div class="app-container">
    <div style="margin-bottom: 20px;">编辑用户组节点</div>
     <el-card>
       <el-checkbox
        class="check_list"
        v-for="(item, index) in nodes"
        :key="index"
        :checked="data.includes(item.node)"
        @change="handleChange($event, item.node)">
        {{item.title}}
      </el-checkbox>
     </el-card>
  </div>
</template>

<script>
import { getInfo, authNodes, authAddNode, authDelNode } from '@/api/user.js'
import { getToken } from '@/utils/auth.js'
export default {
  data () {
    return {
      data: [],
      nodes: []
    }
  },
  created() {
    this.getAreadly()
  },
  methods: {
    // 获取符合条件的
    getAreadly () {
      let params = {
        // token: getToken(),
        id: this.$route.params.id
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
        token: getToken()
      }
      getInfo(params).then(res => {
        console.log(res)
        this.nodes = res.map(item => ({ ...item, ...{ value: item.node } }));
      })
    },

    // 增加节点
    addNodes (node) {
      let params = {
        id: this.$route.params.id,
        node: node
      }
      authAddNode(params).then(res => {
        if (res) {
          this.$message({
            message: '增加节点页面成功！',
            type: 'success'
          });
        }
      })
    },

    // 删除节点
    delNodes (node) {
      let params = {
        id: this.$route.params.id,
        node: node
      }
      authDelNode(params).then(res => {
        if (res) {
          this.$message({
            message: '删除节点页面成功！',
            type: 'success'
          });
        }
      })
    },

    handleChange (e, item) {
      console.log(e, item)
      if (e == true) {
        console.log('添加')
        this.addNodes(item)
      } else {
        console.log('删除')
        this.delNodes(item)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .check_list{
    margin: 20px 40px 0 0;
    font-size: 16px;
  }
</style>
