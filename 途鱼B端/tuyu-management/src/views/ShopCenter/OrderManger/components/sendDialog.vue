<template>
  <div class="send">
    <el-dialog :title="title" :visible.sync="visible" width="800px" :before-close="handleClose">
      <div>
        <el-form ref="sendForm" :model="sendForm" inline :rules="rules" label-width="120px">
          <el-form-item label="物流公司:" prop="express_title">
            <el-select v-model="sendForm.express_title" placeholder="请选择物流公司" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="物流单号:" prop="express_send_no">
            <el-input v-model="sendForm.express_send_no" placeholder="请输入用物流单号"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitAddEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { sendOrEdit } from "@/api/shop/shop.js";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "订单发货"
    }
  },
  data() {
    return {
      rowObj: {},
      sendForm: {
        express_title: '',
        express_send_no: ''
      },
      options: [
        {
          value: "1",
          label: "顺丰"
        },
        {
          value: "2",
          label: "申通"
        },
        {
          value: "3",
          label: "圆通"
        }
      ],
      rules: {
        express_title: [
          { required: true, message: '请输选择物流公司', trigger: 'change' },
        ],
        express_send_no: [
          { required: true, message: '请输入物流编号', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitAddEdit () {
      this.$refs.sendForm.validate((valid) => {
        if (valid) {
          this.sendList()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getParentData(row) {
      console.log(row);
      this.rowObj = row;
    },
    sendList() {
      let params = {
        id: this.rowObj.id,
        express_title: this.sendForm.express_title,
        express_send_no: this.sendForm.express_send_no,
        token: sessionStorage.getItem('token')
      };
      console.log(params)
      sendOrEdit(params).then(res => {
        console.log(res);
        if (res) {
          this.$message({
            message: "发货成功！",
            type: "success",
            duration: 2000
          });
          this.handleClose();
          this.$emit("updateAll");
        }
      });
    },
    // 关闭弹窗，直接修改父组件的属性
    handleClose() {
      this.$refs.sendForm.resetFields();
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    }
  }
};
</script>
