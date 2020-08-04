<template>
  <div>
    <div
      style="position: relative;display: flex;justify-content: center; font-size: 20px; padding: 10px; border-bottom:1px solid #ddd"
    >
      <div>最近浏览</div>
      <div style="position: absolute; left:10px;" @click="$router.back(-1)">
        <!-- 返回上一级 -->
        <van-icon name="arrow-left" size="25px" />
      </div>
    </div>
    <div
      v-for="(item,index) in arr"
      :key="index"
      style="padding:10px; display: flex;border-bottom:1px solid #ddd;"
    >
      <div>
        <img :src="item.image_path" style="width:90px; height:90px; border:1px solid #ddd;" />
      </div>
      <div style="margin-left:20px; width:70%;">
        <div>{{item.name}}</div>
        <div style="color:red; margin-top:10px; display:flex; ">
          <div>￥{{item.present_price}}</div>
          <div style="margin-top:3px; margin-left:10px; color:#666; text-decoration: line-through; ">{{item.orl_price}}</div>
        </div>
        <div style="display: flex;justify-content:flex-end;">
          <van-icon name="close" @click="cancel(item)" />
        </div>
      </div>
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
      arr: "", //浏览的数据
    };
  },
  //监听方法  click事件等
  methods: {
    cancel(item) {
      let a = this.arr.filter((item1) => {
        return item !== item1;
      });
      this.arr = a;
      console.log(a);
      let username = JSON.parse(localStorage.getItem("username"));
      // console.log(username)
      let user = username + "collection";
      console.log(user);
      localStorage.setItem(user, JSON.stringify(a));
    },
  },
  //调用
  mounted() {
    let username = JSON.parse(localStorage.getItem("username"));
    // console.log(username)
    let user = username + "collection";
    // console.log(user)
    if (localStorage.getItem(user)) {
      this.arr = JSON.parse(localStorage.getItem(user));
      // console.log(this.arr)
    }
  },
  watch: {},
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>