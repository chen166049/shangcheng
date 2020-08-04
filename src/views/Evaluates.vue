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
    <div style="display: flex;">
      <div>
        <img :src="arr.image_path" style="width:100px; height:100px; margin-left: 30px;" />
      </div>
      <div style="margin-left: 20px;">
        <div style="margin-top:10px;">商品评分</div>
        <div style="margin-top:18px;">
          <van-rate v-model="value" :size="25" color="red" void-icon="star" void-color="#eee" />
        </div>
      </div>
    </div>
    <div>
      <van-field
        v-model="message"
        rows="5"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="说说你的购买感受吧~~~"
        show-word-limit
        style="background:#F7F7F7"
      />
    </div>
    <div style="margin-left:10px; margin-top:10px;">
      <van-uploader :after-read="afterRead" v-model="fileList" multiple />
    </div>
    <div>
      <van-checkbox v-model="checked">匿名评价</van-checkbox>
    </div>
    <div style="padding:20px;">
      <van-button type="primary" size="large" @click="submit">提交</van-button>
    </div>
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
      arr: "", //接收需要评价商品的数据
      value: 0, //评分星星默认数量
      message: "", //评论内容
      fileList: [], //评价图片预览
      checked: false, //是否匿名评价
    };
  },
  //监听方法  click事件等
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    //提交评论
    submit() {
      this.$api
        .getcomment({
          id: this.arr.cid,
          rate: this.value,
          content: this.message,
          anonymous: this.checked,
          _id: this.arr._id,
          order_id: this.arr.order_id,
          image: [],
        })
        .then((res) => {
          Toast(res.msg);
           this.$router.back(-1)
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  //调用
  mounted() {
    this.arr = this.$route.query.item;
    console.log(this.arr, "接收需要评价商品的数据");
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