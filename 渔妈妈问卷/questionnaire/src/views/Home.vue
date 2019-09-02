<template>
  <div class="home">
    <div v-for="(item, index) in questionList" :key="index">
      <a :href="item.uri">
        <div class="list_card">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionList: [
        { uri: 'https://www.wenjuan.top/s/iAbia2G/', title: '教师职业倦怠检测量表' },
        { uri: 'https://www.wenjuan.top/s/m6Nzy2f/', title: '学生考试焦虑测量表' },
        { uri: 'https://www.wenjuan.top/s/vYjuiaO/', title: '学生自尊测量表' },
        { uri: 'https://www.wenjuan.top/s/aq26vqJ/', title: '亲子关系问卷量表' },
        { uri: 'https://www.wenjuan.top/s/bE7BVjt/', title: '自测健康评定量表' },
        { uri: 'https://www.wenjuan.top/s/feaYjyh/', title: '家长个人自信心测试' },
        { uri: 'https://www.wenjuan.top/s/YnqeAbS/', title: '家庭亲密度与适应性量表中文版（FACESII-CV )之家庭适应性测量表' },
        { uri: 'https://www.wenjuan.top/s/aAjMvyH/', title: '家庭亲密度与适应性量表中文版（FACESII-CV )之家庭亲密度测量表' },
        { uri: 'https://www.wenjuan.top/s/eIv6ja2/', title: '家庭教养方式测评表' },
        { uri: 'https://www.wenjuan.top/s/rEfu2mL/', title: '家庭功能评定测量表' },
        { uri: 'https://www.wenjuan.top/s/qMJVvq/', title: '个人安全感测量表' },
        { uri: 'https://www.wenjuan.top/s/3Q7f2yK/', title: '小学生学习能力测试（小学一、二年级）' },
        { uri: 'https://www.wenjuan.top/s/3Y7zqq9/', title: '家长培养孩子注意力 的测试表(家长自测用表)' },
        { uri: 'https://www.wenjuan.top/s/q2MvAzm/', title: '渔妈妈心理测试-SDS抑郁自评量表' },
      ]
    };
  }
};
</script>

<style lang="less">
.home {
  padding: 20px 10px;
  min-height: 100vh;
  background: #f0f0f0;
  .list_card {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    font-size: 15px;
    margin-top: 10px;
  }
}
</style>


