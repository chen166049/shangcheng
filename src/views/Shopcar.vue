<template>
  <div>
    <div>
      <div
        style="width:100%; height:40px; text-align: center;line-height: 40px; border-bottom:1px solid #ddd;"
      >购物车</div>
    </div>
    <!--              未登录状态的购物车              -->
    <div v-if="flag===true">
      <div style="hieght:270px; width:100%;">
        <img src="../assets/order.gif" style="width:100%; hieght:100%;" />
      </div>
      <div style="text-align: center; font-size: 22px">登录后才能查看订单</div>
      <div style="display: flex;justify-content: center;">
        <van-button type="primary" @click="login">请先登录</van-button>
      </div>
    </div>
    <!--             已登录状态的购物车              -->
    <div v-else>
      <!--                 购物车为空                 -->
      <div v-show="shopList.length === 0">
        <div
          style="width:100%; height:250px; display: flex;justify-content: center;align-items: center;"
        >
          <div
            style="width:190px; height:190px; border-radius: 50%; display: flex;justify-content: center;align-items: center; background: #E5E7E6;"
          >
            <img src="../assets/shop.png" />
          </div>
        </div>
        <div style="text-align: center; font-size: 20px; color:#7B7D7C">您的购物车还是空的</div>
        <div style="margin-top:20px; display: flex;justify-content: center;align-items: center; ">
          <div
            @click="goshop"
            style="width:100px; height:30px; border-radius: 20px; border:1px solid #7B7D7C; color:#7B7D7C; text-align: center; line-height:30px; font-size:20px;"
          >去购物</div>
        </div>
      </div>
      <!--                 购物车不为空               -->
      <div v-show="shopList.length !== 0">
        <div style="display: flex; justify-content: space-between; border-bottom:1px solid #ddd">
          <!--      删除结算         -->
          <div style="margin-left: 10px;">
            <van-checkbox v-model="checked" @click="checkeds">全选</van-checkbox>
          </div>
          <div>
            <div style="display: flex;">
              合计:
              <div style="color:red; margin-left:10px;">￥{{price | toFixed}}</div>
            </div>
            <div style="font-size: 15px; margin-bottom:20px;">请确认订单</div>
            <div style="display: flex; justify-content: flex-end; margin-bottom:5px;">
              <div style="margin-right:10px;">
                <van-button type="primary" @click="settlement">结算</van-button>
              </div>
              <div style="margin-right:20px;">
                <van-button type="primary" @click="deletes">删除</van-button>
              </div>
            </div>
          </div>
        </div>
        <!--                    商品详情                  -->
        <div
          style="width:100%; height:130px; border-bottom:1px solid #ddd; display: flex;justify-content: space-between;align-items: center;"
          v-for="(item,index) in shopList"
          :key="index"
        >
          <div style="width:5%; margin-left: 10px;">
            <van-checkbox v-model="item.check" @click="checkedss"></van-checkbox>
          </div>
          <div
            style="width:85%; height:130px; display: flex;justify-content: center;align-items: center;"
          >
            <div style="width:100%; height:100px; display:flex;">
              <div style="width:40%">
                <img
                  :src="item.image_path"
                  style="width:100px; height:100px; border:1px solid #ddd"
                />
              </div>
              <div style="width:200px;">
                <div style="width:100%; color:red; margin-top: 10px;">{{item.name}}</div>
                <div
                  style="width:100%; display:flex; justify-content: space-between; margin-top:25px;"
                >
                  <div style="width:30%; color:red;">￥{{item.mallPrice}}</div>
                  <div style="width:50%;">
                    <van-stepper
                      v-model="item.count"
                      theme="round"
                      button-size="20"
                      disable-input
                      @plus="plus(item)"
                      @minus="minus(item)"
                    />
                  </div>
                </div>
              </div>
            </div>
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
      checked: false,
      flag: true,
      flag1: false,
      shopList: [], //商品数据
      cid: [], //删除商品的id
      spin: "", //订单结算的商品
    };
  },
  //监听方法  click事件等
  methods: {
    //登录
    login(){
      this.$router.push('/login')
    },
    //点击去订单结算页面
    settlement() {
      this.spin = this.shopList.filter((item) => {
        return item.check === true;
      });
      console.log(this.spin);
      if (this.spin.length > 0) {
        // this.$router.push({path:'/settlement',query:{spin:this.spin}})
        this.$router.push("/settlement");
        localStorage.setItem("spin", JSON.stringify(this.spin));
      }
    },
    //全选反选
    checkeds() {
      this.shopList.map((item) => {
        item.check = this.checked;
        // console.log(item.check)
      });
    },
    //单选
    checkedss() {
      this.checked = this.shopList.every((item) => {
        return item.check === true;
      });
    },
    //获取购物车所有商品
    getCard() {
      this.$api
        .getCard()
        .then((res) => {
          this.shopList = res.shopList;
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //商品单项增加数量
    plus(item) {
      item.count++;
      // console.log(item)
      this.$api
        .geteditCart({
          count: item.count,
          id: item.cid,
          mallPrice: item.mallPrice,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //商品单项减少数量
    minus(item) {
      item.count--;
      // console.log(item)
      this.$api
        .geteditCart({
          count: item.count,
          id: item.cid,
          mallPrice: item.mallPrice,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除商品
    deletes() {
      this.arr = this.shopList.filter((item) => {
        //选择选中的商品
        return item.check === true;
      });
      this.shopList = this.shopList.filter((item) => {
        //显示的商品减少
        return item.check === false;
      });
      this.arr.map((item) => {
        //选中商品的id
        this.cid.push(item.cid);
      });
      // console.log(this.cid)
      this.$api
        .getdeleteShop(this.cid)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.$store.commit("getgetCard");
    },
    goshop() {
      this.$router.push("/shopping");
    },
  },
  //调用
  mounted() {
    this.getCard();
    if(localStorage.getItem('user')){
      this.flag = false
    }else{
      this.flag = true
    }
  },
  watch: {},
  //计算
  computed: {
    price() {
      let prices = 0;
      console.log(this.shopList);
      this.shopList.map((item) => {
        if (item.check === true) {
          prices += item.count * item.mallPrice;
        }
      });
      return prices;
    },
  },
  filters: {
    toFixed(val) {
      return Number(val).toFixed(2);
    },
  },
};
</script>

<style scoped lang='scss'>
</style>