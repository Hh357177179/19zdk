<template>
  <div class="search">
    <el-dialog :title="title" :visible.sync="visible" width="800px" :before-close="handleClose">
      <div>
        <div class="top_card">
          <div class="lefts">
            <el-card class="card_info">
              <p>姓名：{{searchObj.express_name}}</p>
              <p>联系方式：{{searchObj.express_phone}}</p>
              <p>收货地址：{{searchObj.express_province}}{{searchObj.express_city}}{{searchObj.express_area}}{{searchObj.express_address}}</p>
            </el-card>
          </div>
          <div class="rights">
            <el-card class="card_info">
              <p>订单状态：{{searchObj.express_state == 1 ? '已发货' : '未发货'}}</p>
              <p>订单编号：{{searchObj.order_no}}</p>
              <p>发货时间：{{searchObj.express_send_time | fromDate}}</p>
            </el-card>
          </div>
        </div>
        <div class="shop_details">
          <el-card class="mt10">
            <p>商品信息：{{searchObj.goods_title}}</p>
            <p>购买数量：{{searchObj.number}}</p>
            <p>商品单价：{{searchObj.coin_total}}</p>
          </el-card>
        </div>
        <el-form class="mt10" ref="sendForm" inline :model="sendForm" :rules="rules" label-width="120px">
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
import { sendOrEdit, searchOrder } from "@/api/shop/shop.js";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "查看订单"
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
      },
      searchObj: {}
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
      this.getDetail(row.id)
    },
    getDetail (id) {
      let params = {
        id: id,
        token: sessionStorage.getItem('token')
      }
      searchOrder(params).then(res => {
        console.log(res)
        this.sendForm.express_title = res.express_title
        this.sendForm.express_send_no = res.express_send_no
        this.searchObj = res
      })
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
            message: "修改成功！",
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
      this.searchObj = {}
      this.$refs.sendForm.resetFields();
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .top_card{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .lefts, .rights{
      width: 48%;
      .card_info{
        font-size: 15px;
        p{
          margin-bottom: 20px;
        }
      }
    }
  }
  .shop_details{
    font-size: 15px;
    p{
      margin-bottom: 20px;
    }
  }
</style>
