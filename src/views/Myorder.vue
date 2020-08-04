<template>
  <div>
    <div
      style="position: relative;display: flex;justify-content: center; font-size: 20px; padding: 10px; border-bottom:1px solid #ddd"
    >
      <div>我的订单</div>
      <div style="position: absolute; left:10px;" @click="$router.back(-1)">
        <!-- 返回上一级 -->
        <van-icon name="arrow-left" size="25px" />
      </div>
    </div>
    <div>
      <van-tabs v-model="active" swipe-threshold="5">
        <van-tab title="全部"></van-tab>
        <van-tab title="待支付"></van-tab>
        <van-tab title="待发货"></van-tab>
        <van-tab title="待收货"></van-tab>
        <van-tab title="已完成"></van-tab>
      </van-tabs>
      <div
        style="background: #F2F2F2;width:100%;display: flex;justify-content: center;"
        v-for="(item,index) in details"
        :key="index"
      >
        <div
          style="width:90%; background: white; margin-top:20px; padding:10px; border-radius:10px;"
        >
          <div style="display: flex;justify-content: space-between;font-size:15px;">
            <div>订单编号:{{item.order_id}}</div>
            <div style="color:#D2591B">交易完成</div>
          </div>
          <div
            v-for="(item1,index) in item.order_list"
            :key="index"
            style="display:flex; margin-top:20px;justify-content: space-between;"
          >
            <div>
              <img :src="item1.image_path" style="width:80px; height:80px; border:1px solid #ddd" />
            </div>
            <div style="margin-left:10px;">{{item1.name}}</div>
            <div style="text-align: end;">
              <div>￥{{item1.present_price}}</div>
              <div>X{{item1.count}}</div>
            </div>
          </div>
          <div style="text-align: end; font-size:15px;">
            <div>创建时间:{{item.add_time}}</div>
            <div>收货地址:{{item.address}}</div>
            <div>共{{item.order_list.length}}件商品 合计:{{item.mallPrice}}</div>
          </div>
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
      active: 0, //标签页默认项
      details: "", //订单数据
    };
  },
  //监听方法  click事件等
  methods: {
    getDate() {
      this.$api
        .getmyOrder()
        .then((res) => {
            //  console.log(res)
          this.details = res.list;
          console.log(this.details,'全部订单');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  //调用
  mounted() {
    this.getDate();
  },
  watch: {},
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  background: #f2f2f2;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  text-align: end;
}
</style>