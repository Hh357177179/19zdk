<template>
  <div class="vote">
    <div class="vote_main" v-for="(item, index) in items" :key="index">
      <div class="vote_list">
        <div class="avatar">
          <img :src="item.avatar" alt>
        </div>
        <div class="name">{{item.name}}</div>
        <div>
          <span class="num">{{item.like_num}}</span>票
        </div>
        <div class="like" @click="sendLick(item.id)">
          <div class="like_pic">
            <img src="../assets/img/like_pic.png" alt>
          </div>
          <div class="like_text">投他一票</div>
        </div>
      </div>
    </div>
    <van-popup v-model="show">内容</van-popup>
  </div>
</template>

<script>
import { getVoteList, isFollow, doVotes } from "@/api/index.js";
export default {
  data() {
    return {
      show: false,
      items: [],
      page: 1,
      pagesize: 10,
      count: 0,
      state: -1
    };
  },
  created() {
    this.getList();
    // this.getFollow()
  },
  methods: {
    sendLick (id) {
    // let params = {
    //     token: localStorage.getItem('tokenns')
    //   }
      // isFollow(params).then(res => {
      //   if (!res) {
      //     this.show = true
      //   } else {
      //     this.show = false
          let param = {
            token: localStorage.getItem('tokenns'),
            id: id
          }
          doVotes(param).then(res => {
            console.log(res)
            if (res) {
              this.$toast.success('投票成功！');
              this.getList();
            }
          })
      //   }
      // })
    },
    getFollow () {
      let params = {
        token: localStorage.getItem('tokenns')
      }
      isFollow(params).then(res => {
        if (!res) {
          this.show = true
        } else {
          this.show = false
        }
      })
    },
    getList() {
      let params = {
        page: this.page,
        pagesize: this.pagesize
      };
      getVoteList(params).then(res => {
        console.log(res);
        this.count = res.count;
        this.items = res.list;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.vote {
  padding: 10px;
  .vote_list {
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 15px;
    color: #333;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      width: 180px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
    .num {
      font-weight: bold;
    }
    .like {
      margin-left: 30px;
      .like_pic {
        width: 25px;
        height: 25px;
        margin: 0 auto 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .like_text {
        font-size: 12px;
      }
    }
  }
}
</style>
