<template>
  <div>
    <div style="width:100%; height:40px; text-align: center;line-height: 40px;">会员中心</div>
    <!--             头像            -->
    <div
      style="height: 200px; width:100%; background: #e30c7b; display: flex;justify-content: center; position: relative;"
    >
      <div v-if="flag===false">
        <div style="margin-top:20px">
          <van-image round width="80px" height="80px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div style="color:white; margin-top:10px;" @click="login">登录/注册</div>
        </div>
      </div>
      <div v-if="flag===true">
        <div style="margin-top:20px">
          <van-image round width="80px" height="80px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div style="color:white; margin-top:10px;">欢迎您,{{user.username}}</div>
          <div style="color:white; margin-top:10px;" @click="out">退出登录</div>
          <div style="position: absolute;top: 10px;right: 10px;" @click="personal">
            <van-icon name="setting" color="white" size="25" />
          </div>
        </div>
      </div>
    </div>
    <!--        待付款待发货。。。                   -->
    <div>
      <van-grid :column-num="5">
        <van-grid-item icon="paid" text="待付款" />
        <van-grid-item icon="send-gift-o" text="待发货" />
        <van-grid-item icon="logistics" text="待收货" />
        <van-grid-item icon="records" text="评价" @click="evaluate" />
        <van-grid-item icon="points" text="已完成 " />
      </van-grid>
    </div>
    <!--        全部订单收藏商品地址。。。           -->
    <div>
      <div>
        <van-cell title="全部订单" icon="cart-circle-o" is-link @click="myorder" />
      </div>
      <div style="margin-top:20px;">
        <van-cell title="收藏商品" icon="points" is-link @click="collection" />
      </div>
      <div>
        <van-cell title="地址管理" icon="aim" is-link @click="addressmanagement" />
      </div>
      <div>
        <van-cell title="最近浏览" icon="tosend" is-link @click="browse" />
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
      flag: false,
      user: "",
    };
  },
  //监听方法  click事件等
  methods: {
    //点击登录注册
    login() {
      this.$router.push("/login");
    },
    //点击退出登录
    out() {
      this.$api.getloginout().then(res =>{
        console.log(res)
        localStorage.removeItem("user");
        this.$store.commit('getgetCard')
        this.flag = false;
      }).catch(err =>{
        console.log(err)
      })
    },
    //点击跳转个人资料设置
    personal() {
      this.$router.push("/personal");
    },
    //点击地址管理跳转
    addressmanagement() {
      this.$router.push("/address");
    },
    //点击全部订单跳转
    myorder(){
      this.$router.push('/myorder')
    },
    //点击我的收藏跳转
    collection(){
      this.$router.push('/collection')
    },
    //点击评价跳转
    evaluate(){
      this.$router.push('/evaluate')
    },
    //点击浏览历史跳转
    browse(){
      this.$router.push('/browse')
    }
  },
  //调用
  mounted() {
    if (JSON.parse(localStorage.getItem("user"))) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.flag = true;
    }
  },
  watch: {},
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  background: #e30c7b;
  position: relative;
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid red;
}
</style>