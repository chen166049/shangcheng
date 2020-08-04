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
    <div>
      <img src="../assets/evaluate.jpg" style="width:100%;" />
    </div>
    <div style="width:90%; position: relative; left:18px; top:-30px;">
      <van-tabs v-model="active">
        <van-tab title="待评价">
          <div
            v-for="(item,index) in evaluate"
            :key="index"
            style="display:flex; padding:10px; border-bottom:1px solid #ddd"
          >
            <div style="margin-left:35px;">
              <img :src="item.image_path" style="width:80px; height:80px;" />
            </div>
            <div style="width:100%; margin-left: 20px;">
              <div>{{item.name}}</div>
              <div style="display:flex; justify-content: flex-end; margin-top:20px;">
                <div
                  style="padding:5px; border-radius: 15px; width:80px; height:20px; border:1px solid red;"
                  @click="evaluates(item)"
                >
                  <van-icon name="chat-o" color="red" />评价晒单
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已评价">
          <div
            v-for="(item,index) in evaluate1"
            :key="index"
          >
            <div v-for="(item1,index1) in item.goods" :key="index1" style="display:flex; padding:10px; border-bottom:1px solid #ddd">
              <div style="margin-left:35px;">
                <img :src="item1.image_path" style="width:80px; height:80px;" />
              </div>
              <div style="width:100%; margin-left: 20px;">
                <div>{{item1.name}}</div>
                <div style="display:flex; justify-content: flex-end; margin-top:20px;">
                  <div
                    style="padding:5px; border-radius: 15px; width:70px; height:20px; border:1px solid #ddd; text-align:center"
                    @click="looks(item)"
                  >评价晒单</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
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
      active: 0, //标签默认项
      evaluate: "", //待评价数据
      evaluate1: "", //已评价数据
    };
  },
  //监听方法  click事件等
  methods: {
    //跳转去评价商品
    evaluates(item) {
      // console.log(item);
      this.$router.push({ path: "/evaluates", query: { item: item } });
    },
    //跳转到查询商品
    looks(item){
      this.$router.push({ path: "/evaluated", query: { item1: item } });
    },
    //所有未评价商品
    getDate() {
      this.$api
        .gettobeEvaluated()
        .then((res) => {
          console.log(res, "待评价商品");
          this.evaluate = res.data.list;
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //所有已评价商品
    getDate2() {
      this.$api
        .getalreadyEvaluated()
        .then((res) => {
          console.log(res, "已评价商品");
          this.evaluate1 = res.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  //调用
  mounted() {
    this.getDate();
    this.getDate2();
  },
  watch: {},
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  position: relative;
  position: absolute;
  border-radius: 10px;
  justify-content: flex-end;
  text-align: center;
}
</style>