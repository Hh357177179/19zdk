<template>
  <div class="handle_withdraw">
    <el-dialog :title="title" :visible.sync="visible" width="800px" :before-close="handleClose">
      <div class="search_main">
        <div>
          <p class="main_list">会员昵称：{{row.nickname}}</p>
          <p class="main_list">会员卡号：{{row.card_no}}</p>
        </div>
        <div>
          <p class="main_list">会员姓名：{{row.name}}</p>
          <p class="main_list">会员手机号：{{row.phone}}</p>
        </div>
      </div>
      <div class="fish_coin">鱼币数量：{{row.coin}}</div>
      <div class="fish_coin_num">
        <span>鱼币数量：</span>
        <span class="input_num">
          <el-input placeholder="请输入鱼币数量" v-model.number="num"></el-input>
        </span>
      </div>
      <div class="adjustment">
        <span>调整鱼币数量：</span>
        <span>
          <el-select v-model="value" placeholder="请选择增加或减少" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitAddEdit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { rushVipFish } from '@/api/fish/fish.js'
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
      row: {},
      value: "",
      options: [
        {
          value: "1",
          label: "增加"
        },
        {
          value: "2",
          label: "减少"
        }
      ],
      num: ""
    };
  },
  methods: {
    getParentData(row) {
      console.log(row);
      this.row = row;
    },
    handleClose() {
      this.value = ''
      this.num = ''
      this.$nextTick(() => {
        this.$emit("update:visible", false); // 直接修改父组件的属性
      })
    },
    submitAddEdit() {
      let params = {
        id: this.row.id,
        type: this.value,
        coin: this.num,
        token: sessionStorage.getItem('token')
      }
      rushVipFish(params).then(res => {
        if (res) {
          this.$emit('updateAll')
          this.handleClose()
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.handle_withdraw {
  .search_main {
    padding: 0 100px;
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    .main_list {
      margin-bottom: 20px;
    }
  }
  .fish_coin {
    font-size: 15px;
    padding: 0 100px;
  }
  .adjustment {
    margin-top: 20px;
    font-size: 15px;
    padding: 0 100px;
  }
  .fish_coin_num{
    margin-top: 20px;
    font-size: 15px;
    padding: 0 100px;
    .input_num{
      display: inline-block;
      width: 200px;
    }
  }
}
</style>

