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
        { uri: 'http://wj.zhaodaka.vip/s/aIrQRj/', title: '小学生行为量表（请家长填写，适用于小学生行为测试）'},
        { uri: 'http://wj.zhaodaka.vip/s/3Y7zqq9/', title: '家长培养孩子注意力 的测试表(家长自测用表)' },
        { uri: 'http://wj.zhaodaka.vip/s/iAbia2G/', title: '教师职业倦怠检测量表' },
        { uri: 'http://wj.zhaodaka.vip/s/bE7BVjt/', title: '自测健康评定量表' },
        { uri: 'http://wj.zhaodaka.vip/s/vYjuiaO/', title: '学生自尊测量表' },
        { uri: 'http://wj.zhaodaka.vip/s/RRf6fyj/', title: '儿童多动症教师评定用量表（由教师填写问卷）针对3—17岁儿童' },
        { uri: 'http://wj.zhaodaka.vip/s/bURB32/', title: '家庭氛围测量表' },
        { uri: 'http://wj.zhaodaka.vip/s/bANbm2/', title: '儿童多动症检测量表（由父母填写问卷）适用于3~17岁儿童 '},
        { uri: 'http://wj.zhaodaka.vip/s/eIv6ja2/', title: '家庭教养方式测评表' },
        { uri: 'http://wj.zhaodaka.vip/s/QZjqQr/', title: '儿童多元智能测试表' },
        { uri: 'http://wj.zhaodaka.vip/s/3Q7f2yK/', title: '小学生学习能力测试（小学一、二年级)' },
        { uri: 'http://wj.zhaodaka.vip/s/rEfu2mL/', title: '家庭功能评定测量表' },
        { uri: 'http://wj.zhaodaka.vip/s/aq26vqJ/', title: '亲子关系问卷量表' },
        { uri: 'http://wj.zhaodaka.vip/s/Vf6b6rF/', title: '学生自我意识测表（用于8-16岁学生）' },
        { uri: 'http://wj.zhaodaka.vip/s/m6Nzy2f/', title: '学生考试焦虑测量表' },
        { uri: 'http://wj.zhaodaka.vip/s/aAjMvyH/', title: '家庭亲密度测量表' },
        { uri: 'http://wj.zhaodaka.vip/s/6Zb6Fr/', title: '儿童感觉统合能力发展评定量表' },
        { uri: 'http://wj.zhaodaka.vip/s/YnqeAbS/', title: '家庭适应性测量表' },
        { uri: 'http://wj.zhaodaka.vip/s/qMJVvq/', title: '个人安全感测量表' },
        { uri: 'http://wj.zhaodaka.vip/s/feaYjyh/', title: '家长个人自信心测试' },
        { uri: 'http://wenjuan.zhaodaka.vip/index/question/sas.html', title: 'SAS焦虑自测量表'},
        { uri: 'http://wenjuan.zhaodaka.vip/index/question/sds.html', title: 'SDS抑郁自评量表'},
        { uri: 'http://wj.zhaodaka.vip/s/nueqUvG/', title: '小学生学习能力测试（小学三、四、五年级）'},
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


