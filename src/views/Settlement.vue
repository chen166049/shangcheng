<template>
  <div>
    <div
      style="position: relative;display: flex;justify-content: center; font-size: 20px; padding: 10px; border-bottom:1px solid #ddd"
    >
      <div>订单结算</div>
      <div style="position: absolute; left:10px;" @click="back">
        <!-- 返回上一级 -->
        <van-icon name="arrow-left" size="25px" />
      </div>
    </div>
    <div>
      <div v-if="spin.length === ''"></div>
      <div v-else>
        <div
          style="width:100%; height:100px;display:flex;justify-content: center; align-items: center;"
        >
          <div style="width:100%;">
            <div style="text-align: center;" v-if="arr===null" @click="address">点击添加收货地址</div>
            <div style="display: flex;justify-content: space-between;position: relative;" v-else>
              <div
                style="width:10%;display: flex;justify-content: space-between;align-items: center;"
              >
                <div>
                  <van-icon name="location-o" size="40px" />
                </div>
              </div>
              <div style="width:75%;margin-right:30px">
                <div style="display: flex;justify-content: space-between;">
                  <div>收货人:{{arr.name}}</div>
                  <div>{{arr.tel}}</div>
                </div>
                <div>收货地址:{{arr.address}}</div>
                <div style="color: #FBD0B6">(收货不便时，可选择免费待收货测试)</div>
              </div>
              <div style="position: absolute; right:5px; top:30px;" @click="address">
                <van-icon name="arrow" size="25px" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <img src="../assets/caitiao.jpg" style="width:100%;height:5px;" />
        </div>
        <div
          style="width:100%; height:130px; border-bottom:1px solid #ddd; display: flex;justify-content: space-between;align-items: center;"
          v-for="(item,index) in spin"
          :key="index"
        >
          <div
            style="width:100%; margin-left:15px;height:130px; display: flex;justify-content: center;align-items: center;"
          >
            <div style="width:100%; height:100px; display:flex;">
              <div style="width:35%">
                <img
                  :src="item.image_path"
                  style="width:100px; height:100px; border:1px solid #ddd"
                />
              </div>
              <div style="width:250px;">
                <div style="width:100%; color:red; margin-top: 10px;">{{item.name}}</div>
                <div
                  style="width:100%; display:flex; justify-content: space-between; margin-top:25px;"
                >
                  <div style="width:30%; color:red;">￥{{item.present_price}}</div>
                  <div style="width:60%; text-align: end; margin-right:10px;">X{{item.count}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      spin: [], //购物车商品数据
      arr: "", //默认收货地址数据
      idDate: [], //所有商品的id
      price: 0, //总价格
      flag: "", //用来判断是购物车结算还是直接购买
    };
  },
  //监听方法  click事件等
  methods: {
    //返回上一级
    back() {
      this.$router.back(-1), localStorage.removeItem("spin");
    },
    //提交订单
    onSubmit() {
      this.$api
        .getorder({
          address: this.arr.address, //收货地址
          tel: this.arr.tel, //电话
          orderId: this.idDate, //所有商品的id(数组)
          totalPrice: this.price, //总价格
          idDirect: this.flag, //用来判断是购物车结算还是直接购买(直接购买为true,购物车结算为false)
          count: this.spin[0].count, //商品数量
        })
        .then((res) => {
          this.$router.back(-1);
          localStorage.removeItem("spin");
          localStorage.removeItem("spin2");
          console.log(res);
          Toast(res.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击添加收货地址跳转
    address() {
      this.$router.push("/address");
    },
    getData() {
      //获取默认收货地址数据
      this.$api
        .getgetDefaultAddress()
        .then((res) => {
          this.arr = res.defaultAdd; //默认地址
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  //调用
  mounted() {
    // this.spin = this.$route.query.spin;
    if (localStorage.getItem("spin")) {
      this.flag = false;
      // console.log(this.flag)
      this.spin = JSON.parse(localStorage.getItem("spin")); //获取购物车所有商品
      console.log(this.spin, 11111111);
      this.spin.map((item) => {
        this.idDate.push(item.cid); //所有商品的id
        this.price += item.count * item.present_price * 100; //总价格
      });
    } else {
      this.flag = true;
      // console.log(this.flag)
      // let spin2 = this.$route.query.spin2;
      // this.spin.push(spin2)
      this.spin.push(JSON.parse(localStorage.getItem("spin2"))); //获取购物车所有商品
      console.log(this.spin, 222222);
      this.spin.map((item) => {
        this.idDate.push(item.id); //所有商品的id
        this.price += item.count * item.present_price * 100; //总价格
      });
      console.log(this.spin);
      console.log(this.price);
    }

    // console.log(this.price)
    // console.log(this.idDate)
    // console.log(this.spin)
    this.getData(); //获取默认地址
  },
  watch: {},
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  border-radius: 50%;
  display: flex;
  justify-content: center;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-size: 25px;
  background: #e5e7e6;
  position: relative;
  position: absolute;
  text-align: end;
}
</style>