<template>
  <div style="position:relative;">
    <div style="position: absolute; left:10px; top:15px; z-index: 1;" @click="$router.back(-1)">
      <!-- 返回上一级 -->
      <van-icon name="arrow-left" size="25px" />
    </div>
    <div v-if="goodsOne.length===0">商品已下架</div>
    <div v-else class="box">
      <!--           商品图片        -->
      <div>
        <van-swipe
          class="my-swipe"
          :autoplay="3000"
          indicator-color="orange"
          style="width:100%; height:400px; border-bottom:1px solid #F1F1F1"
        >
          <van-swipe-item>
            <img :src="goodsOne.image" style="width:100%; height:100%;" @click="looks" />
          </van-swipe-item>
          <van-swipe-item>
            <img :src="goodsOne.image_path" style="width:100%; height:100%;" @click="looks" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--            商品名称            -->
      <div>
        <div style="margin-left: 20px">{{goodsOne.name}}</div>
        <div
          style="margin-left: 20px; margin-top: 5px; margin-bottom:10px; color:red"
        >¥{{goodsOne.present_price}}</div>
      </div>
      <!--            商品价格            -->
      <div
        style="display:flex; justify-content: space-between; padding:5px; color:#888; border-top: 1px solid #F1F1F1;border-bottom: 1px solid #F1F1F1;"
      >
        <div style="margin-left: 15px; width:25%;">运费:{{goodsOne.__v}}</div>
        <div style="width:30%;">剩余:{{goodsOne.amount}}</div>
        <div style="margin-right: 15px; width:25%; text-align: right;">
          <div v-show="collection===true">
            收藏:
            <van-icon name="like-o" @click="collections" />
          </div>
          <div v-show="collection===false">
            取消收藏:
            <van-icon name="like" color="red" @click="cancelCollection" />
          </div>
        </div>
      </div>
      <!--            进入店铺            -->
      <div style="margin-top:10px; border-top: 1px solid #F1F1F1;border-bottom: 1px solid #F1F1F1;">
        <van-cell value="进入店铺" is-link icon="shop-o" size="large">
          <template #title>
            <span class="custom-title">有赞的店</span>
            <van-tag type="danger">官方</van-tag>
          </template>
        </van-cell>
      </div>
      <!--             商品详情和评论                -->
      <div>
        <van-tabs v-model="active">
          <van-tab title="商品详情">
            <div v-html="goodsOne.detail" class="detail"></div>
          </van-tab>
          <van-tab title="商品评论">
            <div style="display: flex;" v-for="(item,index) in comment" :key="index">
              <div style="width:30%;">
                <img :src="item.comment_avatar" style="margin-left:20px;width:80px; height:80px;" />
              </div>
              <div style="width:68%;">
                <div style="width:100%;display:flex;justify-content: space-between;">
                  <div>{{item.comment_nickname}}</div>
                  <div>{{item.comment_time}}</div>
                </div>
                <div>
                  <van-rate
                    v-model="item.rate"
                    :size="13"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                  />
                </div>
                <div style="margin-top:15px;">内容:{{item.content}}</div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <!--             底部购买                 -->
      <div>
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" />
          <van-goods-action-icon icon="shop-o" text="购物车" :badge="$store.state.badges" />
          <van-goods-action-button color="#FF8855" text="加入购物车" @click="addtocart" />
          <van-goods-action-button color="#FF4444" text="立即购买" @click="buynow" />
        </van-goods-action>
        <van-popup
          v-model="show"
          closeable
          close-icon="close"
          position="bottom"
          :style="{ height: '38%' }"
        >
          <div>
            <div style="display: flex;">
              <div style="width:30%; margin-left:20px;">
                <img :src="goodsOne.image" style="width:90px; height:90px; border:1px solid #ddd;" />
              </div>
              <div style="width:50%; height:108px; margin-left:10px;">
                <div style="margin-top:10px;">{{goodsOne.name}}</div>
                <div style="color:red; margin-top: 10px;">￥{{goodsOne.present_price}}</div>
              </div>
            </div>
            <div
              style="width:100%; height:55px;border:1px solid #ddd; display: flex;justify-content: space-between;"
            >
              <div style="width:60%; height:50px; margin-left:20px;">
                <div>购买数量:</div>
                <div style="display: flex; margin-top:10px;">
                  <div style="color:#666;font-size:14px;">剩余 {{goodsOne.amount}}件</div>
                  <div style="margin-left:10px; color:red; font-size:14px;">每人限购50件</div>
                </div>
              </div>
              <div style="width:40%; height:50px;">
                <div style="margin-top:10px;">
                  <van-stepper v-model="value" />
                </div>
              </div>
            </div>
            <div style="margin-top:38px;">
              <van-button type="danger" size="large" @click="buynows">立即购买</van-button>
            </div>
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant"; //引入预览
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      value: 1, //步进器默认值
      active: 0, //商品详情和评论默认项
      collection: true, //商品是否收藏
      id: "", //商品id
      goodsOne: {}, //商品数据
      show: false, //弹出层默认状态
      goodstwo: {}, //立即购买的商品数据
      // goods: "",
      comment: "", //商品评论数据
    };
  },
  //监听方法  click事件等
  methods: {
    //收藏登录状态判定
    collections(){
      this.$utils.checkLogin(this.collections1, () => {
        this.$router.push("/login");
      });
    },
    //立即购买登录状态判定
    buynows() {
      this.$utils.checkLogin(this.buynows1, () => {
        this.$router.push("/login");
      });
    },
    //加入购物车登录状态判定
    addtocart() {
      this.$utils.checkLogin(this.addtocart1, () => {
        this.$router.push("/login");
      });
    },
    //点击收藏
    collections1() {
      this.$api
        .getcollection(this.goodsOne)
        .then((res) => {
          this.collection = false;
          console.log(this.collection, "55555555555");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //取消收藏
    cancelCollection() {
      console.log(this.id);
      this.$api
        .getcancelCollection(this.id)
        .then((res) => {
          this.collection = true;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查询商品是否已收藏
    getspins() {
      this.$api
        .getisCollection(this.id)
        .then((res) => {
          if (res.isCollection === 1) {
            this.collection = false;
          }
          console.log(res, "商品是否被收藏");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击加入购物车
    addtocart1() {
      this.$api
        .getaddshop(this.id)
        .then((res) => {
          console.log(res);
          this.$store.commit('getgetCard')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击立即购买显示弹出层
    buynow() {
      this.show = true;
    },
    //立即购买
    buynows1() {
      this.$api
        .getgoodsid(this.id)
        .then((res) => {
          this.goodstwo = res.goods.goodsOne;
          this.$set(this.goodstwo, "count", this.value); //添加购买商品数量
          console.log(this.goodstwo);
          this.$router.push("/settlement");
          // this.$router.push({path:'/settlement',query:{spin2:this.goodstwo}})
          localStorage.setItem("spin2", JSON.stringify(this.goodstwo));
          // console.log(res)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //图片预览
    looks() {
      ImagePreview({
        images: [this.goodsOne.image, this.goodsOne.image_path],
        closeable: true,
      });
    },
    //根据ID获取商品数据
    getData(id) {
      this.$api
        .getgoodsid(id)
        .then((res) => {
          // console.log(res, "商品数据");
          if (res.goods.comment) {
            this.comment = res.goods.comment; //商品评论数据
            // console.log(this.comment, "商品评论");
          }
          if (res.goods.goodsOne) {
            // this.goods = res.goods;
            this.goodsOne = res.goods.goodsOne; //商品数据赋值
            // console.log(this.goodsOne, "商品详情数据");
            let quname = JSON.parse(localStorage.getItem("username"));
            console.log(quname, "用户不可变的昵称");
            this.$utils.addColiction(quname, "collection", this.goodsOne);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  //调用
  mounted() {
    this.$store.commit('getgetCard')//计算购物车的微标
    this.id = this.$route.query.id; //接收传过来的数据
    this.getData(this.id); //请求商品数据
    console.log(this.id, "222222");
    this.getspins(this.id); //查询商品是否被收藏
  },
  watch: {},
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  height: 610px;
  overflow: auto;
}
.detail {
  display: flex;
  flex-wrap: wrap;
}
</style>