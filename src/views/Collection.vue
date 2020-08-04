<template>
  <div>
    <div
      style="position: relative;display: flex;justify-content: center; font-size: 20px; padding: 10px; border-bottom:1px solid #ddd"
    >
      <div>我的收藏</div>
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
        <div style="color:red; margin-top:10px;">￥{{item.present_price}}</div>
        <div style="display: flex;justify-content:flex-end;">
          <van-icon name="close" @click="cancel(item)"/>
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
      arr: "", //已收藏商品数据
    };
  },
  //监听方法  click事件等
  methods: {
     //请求收藏商品
    getData() {
      this.$api
        .getshoucang()
        .then((res) => {
          console.log(res, "请求商品数据");
          this.arr = res.data.list;
          console.log(this.arr, "已收藏商品数据");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击×取消收藏
    cancel(item){
       this.$api.getcancelCollection(item.cid).then(res =>{
          this.getData()
          console.log(res)
       }).catch(err =>{
          console.log(err)
       })
    }
  },
  //调用
  mounted() {
    this.getData();
  },
  watch: {},
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  display: flex;
  justify-content: space-between;
}
</style>