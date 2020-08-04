<template>
  <div>
    <div>
      <router-view></router-view>
    </div>
    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="wap-home" to="/shopping">首页</van-tabbar-item>
        <van-tabbar-item icon="wap-nav" to="/classification">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" to="/shopcar" :badge="$store.state.badges">购物车</van-tabbar-item>
        <van-tabbar-item icon="manager" to="/my">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      active: 0, //底部导航默认项
    };
  },
  //监听方法  click事件等
  methods: {},
  //调用
  mounted() {
    this.$store.commit('getgetCard')
    // axios
    //   .get("/api/recommend")
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
  watch: {},
  //计算
  computed: {
    name() {
      return this.$store.state.name;
    },
  },
};
</script>

<style scoped lang='scss'>
</style>