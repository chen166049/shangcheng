<template>
  <div>
    <div
      style="position: relative;display: flex;justify-content: center; font-size: 20px; padding: 10px; border-bottom:1px solid #ddd"
    >
      <div>评价中心</div>
      <div style="position: absolute; left:10px;" @click="$router.back(-1)">
        <!-- 返回上一级 -->
        <van-icon name="arrow-left" size="25px" />
      </div>
    </div>
    <div style="display:flex; margin-top:10px;">
      <div style="margin-left:50px;">
        <van-rate v-model="arr.rate" :size="20" color="#ffd21e" void-icon="star" void-color="#eee" />
      </div>
      <div style="margin-left:20px; line-height: 24px;">{{arr.comment_time}}</div>
    </div>
    <div style="width:90%; height:180px; margin-top:10px; margin-left:20px;">{{arr.content}}</div>
    <div style="display:flex; align-items: center;" v-for="(item,index) in commodity" :key="index">
      <img :src="item.image_path" style="width:60px; height:60px; margin-left:20px;" />
      <div
        style="width:60%; line-height: 60px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
      >{{item.name}}</div>
      <div @click="buy" style="width:40px; height:40px; background:#EB7B65; border-radius:20px;display: flex;justify-content: center;align-items: center;">
        <div>
          <van-icon name="cart" />
        </div>
      </div>
    </div>
    <div style="padding:20px; margin-top:80px;"><van-button type="primary" size="large" @click="back">返回</van-button></div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      arr: "", //商品评价详情的数据
      commodity: "", //商品的数据
    };
  },
  //监听方法  click事件等
  methods: {
      //返回
      back(){
          this.$router.back(-1)
      },
      //再次购买
      buy(){
        //   console.log(item.id)
          this.$api.getaddshop(this.arr.cid).then(res =>{
              Toast(res.msg);
              console.log(res)
          }).catch(err =>{
              console.log(err)
          })
      }
  },
  //调用
  mounted() {
    this.arr = this.$route.query.item1;
    this.value = this.arr.rate;
    this.commodity = this.arr.goods;
    console.log(this.arr, "商品评价详情的数据");
    console.log(this.commodity, "商品的数据");
  },
  watch: {},
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  line-height: 29px;
  white-space: howrap;
  overflow: hidden;
  text-align: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 10px;
  align-items: center;
  display: flex;justify-content: center;align-items: center;
}
</style>