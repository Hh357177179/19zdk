<template>
  <div class="add_node">
     <el-dialog :title="title" :visible.sync="visible" width="600px;" :before-close="handleClose" :close-on-click-modal="false">
      <div class="dialog_main">
        <el-form :model="addForm" status-icon :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="节点名称" prop="title">
              <el-select v-model="addForm.title" placeholder="请选择节点页面" @change="changeNode">
                <el-option
                  v-for="item in options"
                  :key="item.path"
                  :label="item.title"
                  :value="item.title">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="节点标识">
            <el-input type="text" disabled v-model="addForm.node" autocomplete="off" placeholder="请输入节点名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitAddEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth.js'
import { addNode } from '@/api/user.js'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "新增"
    }
  },
  data () {
    return {
      routerList: [],
      options: [],
      addForm: {
        title: '',
        node: ''
      },
      nodeArr: [],
       rules: {
        title: [
          { required: true, message: '请输入节点名称', trigger: 'blur' },
        ]
      }
    }
  },
  created () {
    let routerLists = this.$router.options.routes
    this.routerList = routerLists.filter(x => x.alwaysShow == true)
    console.log('所有',  this.routerList)
    for (let a in this.routerList) {
      this.options = this.options.concat(this.routerList[a].children)
    }
    // console.log('全部',this.options)
    this.options = this.options.filter(item => !item.hidden)
    // console.log('符合条件',this.options)
  },
  methods: {
    changeNode (e) {
      this.addForm.node = this.options.filter(x => x.title == e)[0].path
      console.log(this.options.filter(x => x.title == e))
    },
    // 关闭弹窗，直接修改父组件的属性
    handleClose () {
      this.$refs.addForm.resetFields()
      this.addForm.node = ''
      this.$nextTick(() => {
        this.$emit('update:visible', false); // 直接修改父组件的属性
      })
    },
    // 确认添加或修改
    submitAddEdit () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.sendAdd()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    sendAdd () {
      let params = {
        token: getToken(),
        title: this.addForm.title,
        node: this.addForm.node
      }
      addNode(params).then(res => {
        console.log(res)
        if (res) {
          this.$emit('updateAll')
          this.handleClose()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .add_node{
    .dialog_main{
      // width: 500px;
      margin: 0 auto;
      .el-select{
        width: 100%;
      }
    }
  }
</style>
