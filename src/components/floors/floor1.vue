<template>
  <div class="box">
    <div class="top">
      <div class="top1" v-if="floorName === '休闲食品'">1F</div>
      <div class="top1" v-if="floorName === '新鲜水果'">2F</div>
      <div class="top1" v-if="floorName === '营养奶品'">3F</div>
      <div class="top2">{{floorName}}</div>
    </div>
    <div>
      <div v-for="(item, index) in floor" :key="index" class="floor" @click="$details(item.goodsId)">
         <img :src="item.image" class="floor1" >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {
    floor: {
      type: Array
    },
    floorName: {
      type: String
    }
  },
  components: {},
  // 定义变量
  data() {
    return {};
  },
  //监听方法  click事件等
  methods: {},
  //调用
  mounted() {},
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 15px;
  .top1 {
    width: 20px;
    height: 20px;
    color: white;
    line-height: 20px;
    text-align: center;
    border-radius: 10px;
    background: red;
  }
  .top2 {
    color: red;
    margin-left: 5px;
  }
}
.box{
   height: 320px;
   margin-top: 20px;
}
.floor1{
   width: 186px;
   float: left;
}
</style>