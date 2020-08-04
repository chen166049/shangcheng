<template>
  <div>
    <div
      style="position: relative; display:flex; justify-content: center; padding:10px; border-bottom:1px solid #ddd;"
    >
      <div>个人资料</div>
      <div style="position: absolute; left:10px">
        <van-icon name="arrow-left" color="skyblue" size="22" />
      </div>
    </div>
    <div style="border-bottom:1px solid #ddd;">
      <div style="padding:10px; margin-left:10px;">github</div>
    </div>
    <!--                头像            -->
    <div
      style="display:flex; justify-content: space-between; border-bottom:1px solid #ddd; padding:10px;"
    >
      <div style="width:30%; line-height:64px; margin-left: 10px">头像</div>
      <div style="width:30%; display:flex; justify-content: space-between;">
        <van-image round width="60px" height="60px" :src="userInfo.avatar" />
        <van-icon name="arrow" size="22" style="margin-top:20px" />
      </div>
    </div>
    <!--         用户名昵称性别...         -->
    <div>
      <van-cell-group>
        <van-field v-model="userInfo.username" label="用户名" readonly />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="userInfo.nickname" label="昵称" placeholder="请输入昵称" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="userInfo.gender" label="性别" placeholder="请输入性别" />
      </van-cell-group>
      <van-cell-group>
        <van-field label="邮箱" placeholder="请输入邮箱" />
      </van-cell-group>
    </div>
    <!--            出生年月              -->
    <div>
      <van-cell-group @click="showPopup">
        <van-field v-model="data" label="出生年月" placeholder="请输入出生年月" />
      </van-cell-group>
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择日期"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirm"
        />
      </van-popup>
    </div>
    <!--            保存  取消                -->
    <div style="padding:30px">
      <van-button type="primary" size="large" @click="preservation">保存</van-button>
      <van-button type="default" size="large" style="margin-top:10px">取消</van-button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      minDate: new Date(2020, 0, 1), //时间选择
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      data: "", //出生年月
      year: '', //年
      month: '', //月
      day: '', //日
      show: false, //弹出层
      userInfo: "", //全部用户信息
    };
  },
  //监听方法  click事件等
  methods: {
    //时间选择器
    confirm(value) {
    //   console.log(value);
      this.year = dayjs(value).year()
    //   console.log(this.year)//年
      this.month = dayjs(value).month() + 1
    //   console.log(this.month)//月
      this.day = dayjs(value).date()
    //   console.log(this.year)//日
      this.data = dayjs(value).format("YYYY年MM月DD日");
      this.show = false;
    },
    //弹出层显示与隐藏
    showPopup() {
      this.show = true;
    },
    //修改用户信息
    preservation() {
      this.$api
        .getsaveUser({
          gender: this.userInfo.gender,
          year: this.year,
          month: this.month,
          day: this.day,
          id: this.userInfo._id,
          nickname: this.userInfo.nickname,
        })
        .then((res) => {
            this.userInfo = res.user
          console.log(res);
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
            console.log(res, '用户信息')
          if (res.userInfo) {
            this.userInfo = res.userInfo; //用户信息
            this.data = `${this.userInfo.year}年${this.userInfo.month}月${this.userInfo.day}日`;
            // console.log(this.data);
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
  display: flex;
  justify-content: center;
}
</style>