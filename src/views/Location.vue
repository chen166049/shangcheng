<template>
  <div>
    <div
      style="position: relative;display: flex;justify-content: center; font-size: 20px; padding: 10px; border-bottom:1px solid #ddd"
    >
      <div>城市列表</div>
      <div style="position: absolute; left:10px;" @click="$router.back(-1)">
        <!-- 返回上一级 -->
        <van-icon name="arrow-left" size="25px" />
      </div>
    </div>
    <div style="width:100%;">
      <van-search v-model="value" placeholder="请输入搜索关键词" @input="input" />
    </div>
    <div v-show="flag===false" v-for="(item,index) in arr" :key="index">
      <div style="margin-left:10px;margin-top:15px;" @click="citys(item)">{{item.name}}</div>
    </div>
    <div v-show="flag===true">
      <div style="background: #F2F2F2;display: flex;flex-wrap: wrap;">
        <div style="width:100%;margin-top:10px; margin-left:10px;margin-bottom:10px;">当前城市</div>
        <div style="width:100%; background:white;padding:10px;">
          <div>{{cityss}}</div>
        </div>
        <div style="width:100%;margin-top:10px; margin-left:10px;margin-bottom:10px;">热门城市</div>
        <div
          style="width:100%;background:white;padding:0 10px 10px 10px; display: flex;flex-wrap: wrap;justify-content: space-between;"
        >
          <div
            v-for="(item,index) in hotCities"
            :key="index"
            style="width:28%; border:1px solid #ddd;margin-top:10px;text-align: center;padding:3px;"
          >
            <div @click="citys(item)">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div style="background: #F2F2F2;">
        <van-index-bar>
          <div v-for="(item,index) in cities" :key="index">
            <van-index-anchor :index="index" />
            <div v-for="(item1,index) in item" :key="index">
              <van-cell :title="item1.name" @click="citys(item1)" />
            </div>
          </div>
        </van-index-bar>
      </div>
    </div>
  </div>
</template>

<script>
import city from "../http/city";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      flag: true, //搜索显示隐藏
      value: "", //搜索栏的值
      arr: [], //搜索出来的内容
      cities: "", //所有城市
      hotCities: "", //热门城市
      cityss: "", //当前城市
    };
  },
  //监听方法  click事件等
  methods: {
    // hotCitiess(item) {
    //   console.log(item, "热门城市选择");
    // },
    // citiess(item1) {
    //   console.log(item1, "所有城市选择");
    // },
    //选择城市
    citys(item) {
      console.log(item, "城市");
      sessionStorage.setItem("city", JSON.stringify(item));
      this.$router.back(-1);
    },
    input() {
      if (/^[\u4e00-\u9fa5]+$/i.test(this.value)) {
        for (let a in this.cities) {
          this.cities[a].map((item) => {
            this.arr.push(item);
          });
          // console.log(this.arr);
        }
        this.arr = this.arr.filter((item) => {
          return item.name.includes(this.value);
        });
        //   console.log(this.arr)
      } else {
        for (let a in this.cities) {
          if (this.value.toUpperCase() === a) {
            this.arr = this.cities[a];
          }
        }
      }
    },
  },
  //调用
  mounted() {
    this.cityss = this.$route.query.cityss;
    console.log(this.cityss);
    console.log(city, "城市列表");
    this.hotCities = city.data.hotCities; //热门城市
    console.log(this.hotCities, "热门城市");
    this.cities = city.data.cities; //所有城市
    console.log(this.cities, "所有城市");
    // console.log(this.cities.A, "所有城市");
  },
  watch: {
    value() {
      if (this.value !== "") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
  },
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  background: #999;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  justify-content: space-between;
}
</style>