<template>
  <div class="box">
    <div class="top">
      <div
        class="location"
        style="text-align: center; height:50px;line-height: 50px;"
        @click="location"
      >{{city}}</div>
      <van-search
        class="searchs"
        v-model="search"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearchs">搜索</div>
        </template>
      </van-search>
    </div>
    <div v-show="flag===true">
      <div v-for="(item,index) in spin" :key="index" style="background:white; padding: 10px;">
        <div v-html="item.name"></div>
      </div>
    </div>
    <div v-show="flag===false">
      <!--          轮播图            -->
      <div>
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img class="picture" v-lazy="image.image" @click="$details(image.goodsId)" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--         商品分类          -->
      <div class="category">
        <van-grid :border="false" :column-num="5">
          <van-grid-item v-for="(item, index) in category" :key="index" @click="categorys(index)">
            <van-image :src="item.image" />
            <div class="category1">{{item.mallCategoryName}}</div>
          </van-grid-item>
        </van-grid>
        <div class="advertesPicture">
          <img :src="advertesPicture.PICTURE_ADDRESS" />
        </div>
      </div>
      <!--     商品推荐          -->
      <div>
        <div>商品推荐</div>
        <div class="recommend" ref="recommendss">
          <div class="recommend1">
            <div v-for="(item, index) in recommend" :key="index" class="recommend2">
              <img :src="item.image" @click="$details(item.goodsId)" />
              <div class="goodsName" @click="$details(item.goodsId)">{{item.goodsName}}</div>
              <div class="prices" @click="$details(item.goodsId)">
                <div class="mallPrice">¥{{item.mallPrice}}</div>
                <div class="price">{{item.price}}</div>
              </div>
              <div class="look">
                <div class="look1" @click="buy(item)">
                  <van-icon name="shopping-cart-o" />
                </div>
                <div class="look2" @click="$details(item.goodsId)">查看详情</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <floor :floor="floor1" :floorName="floorName.floor1"></floor>
      <floor :floor="floor2" :floorName="floorName.floor2"></floor>
      <floor :floor="floor3" :floorName="floorName.floor3"></floor>
      <!--          热销商品          -->
      <div class="hotcommodity">
        <div class="hotcommodity1">
          <div>热销商品</div>
        </div>
        <div>
          <van-grid :border="true" :column-num="2">
            <van-grid-item
              v-for="(item,index) in hotGoods"
              :key="index"
              class="hotcommodity2"
              @click="$details(item.goodsId)"
            >
              <van-image :src="item.image" />
              <div class="hotcommodity3">{{item.name}}</div>
              <div class="prices">
                <div class="mallPrice">¥{{item.mallPrice}}</div>
                <div class="price" style="color:red;">{{item.price}}</div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant"; //轻提示
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
import BScroll from "better-scroll";
import floor from "../components/floors/floor1.vue";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {
    floor,
  },
  // 定义变量
  data() {
    return {
      city: "", //定位
      search: "", //搜索的内容
      images: [], //轮播图图片
      category: "", //分类商品
      advertesPicture: "", //广告
      recommend: "", //商品推荐
      floor1: [], //休闲食品 1F
      floor2: [], //休闲食品 2F
      floor3: [], //休闲食品 3F
      floorName: "", //1F2F3F名字
      hotGoods: "", //热销商品
      flag: false, //搜索内容显示隐藏
      spin: "", //搜索到的数据
    };
  },
  //监听方法  click事件等
  methods: {
    //定位跳转城市列表
    location() {
      this.$router.push({path:"/location",query:{cityss:this.city}});
    },
    //回车搜索商品
    onSearch(value) {
      this.getspin(value);
    },
    //点击搜索搜索商品
    onSearchs() {
      this.getspin(this.search);
    },
    //搜索商品请求
    getspin(value) {
      this.$api
        .getsearch({ value: value })
        .then((res) => {
          this.spin = res.data.list;
          this.spin.map((item) => {
            item.name = item.name.replace(
              this.search,
              `<span style="color: red;">${this.search}</span>`
            );
          });
          console.log(this.spin, "搜索到的数据");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //商品分类跳转
    categorys(index) {
      console.log(index);
      this.$router.push({
        path: "/classification",
        query: { indexid: index },
      });
    },
    //直接加入购物车
    buy(item) {
      // console.log(item);
      this.$api
        .getaddshop(item.goodsId)
        .then((res) => {
          console.log(res);
          Toast(res.msg);
          this.$store.commit('getgetCard')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取首页数据
    getHomeData() {
      this.$api
        .getHomeData()
        .then((res) => {
          // console.log(res,'所有商品数据');
          this.images = res.data.slides; //轮播图图片赋值
          // console.log(this.images,'所有轮播图商品的数据');
          this.category = res.data.category; //分类商品
          // console.log(this.category)
          this.advertesPicture = res.data.advertesPicture; //广告
          //   console.log(this.advertesPicture);
          this.recommend = res.data.recommend; //商品推荐
          // console.log(this.recommend);
          this.floor1 = res.data.floor1; // 休闲食品
          // console.log(this.floor1);
          this.floor2 = res.data.floor2; // 新鲜水果
          // console.log(this.floor2);
          this.floor3 = res.data.floor3; // 营养奶品
          // console.log(this.floor3);
          this.floorName = res.data.floorName; //1F2F3F 名字
          // console.log(this.floorName);
          this.hotGoods = res.data.hotGoods; //热销商品
          // console.log(this.hotGoods)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取用户信息
    getDate() {
      this.$api
        .getqueryUser()
        .then((res) => {
          console.log(res, "用户信息");
          if (res.userInfo) {
            // this.userInfo = res.userInfo; //用户信息
            localStorage.setItem(
              "username",
              JSON.stringify(res.userInfo.username)
            ); //储存用户不可更改的昵称
          }
          // console.log(this.userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  //调用
  mounted() {
    this.getDate();
    this.getHomeData();
    //平滑
    // let wrapper = document.querySelector(".recommend");
    let wrapper = this.$refs.recommendss;
    let scroll = new BScroll(wrapper, {
      scrollX: true,
      click: true,
    });
    //定位
    if (sessionStorage.getItem("city")) {//定位选择
      let a = JSON.parse(sessionStorage.getItem("city"));
      console.log(sessionStorage.getItem("city"), "选择的城市");
      this.city = a.name;
    } else {
      let _this = this;
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB",
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息

          _this.city = data.addressComponent.city;
          console.log(_this.city);
          console.log(data);
          console.log(data.addressComponent.city);
        }

        function onError(data) {
          // 定位出错
        }
      });
    }
  },
  watch: {
    search() {
      if (this.search !== "") {
        this.flag = true;
      } else {
        this.flag = false;
        this.spin = [];
      }
    },
  },
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  background: #ededed;
}
.top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .location {
    flex: 2;
  }
  .searchs {
    flex: 8;
  }
}
//  轮播图
.picture {
  width: 100%;
  height: 200px;
}
//  商品分类
.category {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
.category1 {
  font-size: 10px;
}
.advertesPicture {
  margin-top: 10px;
  margin-bottom: 5px;
  img {
    width: 100%;
  }
}
// 商品推荐
.recommend {
  width: 100%;
  overflow: hidden;
}
.recommend1 {
  display: flex;
  float: left;
}
.recommend2 {
  width: 125px;
  img {
    width: 125px;
  }
  .goodsName {
    margin-left: 5px;
    height: 30px;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.prices {
  height: 15px;
  display: flex;
  align-items: flex-end;
  margin-left: 5px;
  .mallPrice {
    font-size: 15px;
    margin-right: 10px;
  }
  .price {
    font-size: 12px;
    color: #9d9d9d;
    text-decoration: line-through;
  }
}
.look {
  display: flex;
  margin-top: 10px;
  margin-left: 5px;
  .look1 {
    width: 25px;
    color: white;
    text-align: center;
    background: #feca3a;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .look2 {
    width: 70px;
    font-size: 13px;
    color: white;
    text-align: center;
    background: #ff4c38;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
//  热销商品
.hotcommodity1 {
  width: 100%;
  color: red;
  display: flex;
  justify-content: center;
  padding: 15px;
}
.hotcommodity3 {
  width: 171px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>