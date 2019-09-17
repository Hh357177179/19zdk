<template>
  <div class="handle_withdraw">
    <el-dialog :title="title" :visible.sync="visible" width="800px" :before-close="handleClose">
      <div class="search_main">
        <div>
          <p class="search_list">会员名称：{{row.name}}</p>
          <p class="search_list">提现金额：{{row.money}}</p>
          <p class="search_list">会员手机：{{row.user_phone}}</p>
          <p class="search_list">会员卡号：{{row.user_card_no}}</p>
          <p class="search_list">会员身份：{{row.user_role == 1 ? '会员' : '钓场主'}}</p>
        </div>
        <div>
          <p class="search_list">银行卡号：{{row.bank_code}}</p>
          <p class="search_list">提现银行：{{row.bank_name}}</p>
          <p class="search_list">用户姓名：{{row.user_name}}</p>
          <p class="search_list">转账状态：{{row.status == 2 ? '已转账' : '待转账'}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitAddEdit">处理转账</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { handleWithdraw } from "@/api/withdraw/withdraw.js";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      row: {}
    };
  },
  methods: {
    getParentData(row) {
      this.row = row;
    },
    handleClose() {
      this.$emit("update:visible", false); // 直接修改父组件的属性
    },
    submitAddEdit() {
      console.log("处理转账");
      this.$confirm("是否确认转账?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: this.row.id,
            token: sessionStorage.getItem('token')
          }
          handleWithdraw(params).then(res => {
            if (res) {
              this.$message({
                type: "success",
                message: "处理成功!",
                duration: 2000
              });
              this.handleClose()
              this.$emit('updateAll')
            }
          })
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.handle_withdraw {
  .search_main {
    display: flex;
    justify-content: space-between;
    padding: 0 100px;
    .search_list {
      font-size: 16px;
      margin-bottom: 20px;
      // color: #333;
    }
  }
}
</style>

