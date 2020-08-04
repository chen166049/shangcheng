<template>
  <div class="box">
    <div style="position: absolute; left:10px; top:20px; " @click="$router.back(-1)">
        <!-- 返回上一级 -->
        <van-icon name="arrow-left" size="25px" />
      </div>
    <div class="login">
      <div class="top">登录/注册</div>
      <div>
        <van-cell-group>
          <van-field v-model="username" placeholder="USENAME" class="username" />
          <van-field v-model="password" placeholder="USENAME" class="password" />
          <van-field v-model="phone" label="手机号码" placeholder="仅注册需要" class="phone" />
          <van-field v-model="shortmessage" center clearable label="短信验证码" placeholder="仅注册需要">
            <template #button>
              <van-button size="small" type="primary" @click="sendout"  ref="sendouts" >发送验证码</van-button>
            </template>
          </van-field>
          <div class="middle">
            <van-field v-model="verify" label="验证码" placeholder="请输入验证码" class="middle1" />
            <div v-html="verifys" class="middle2" @click="getverifyDate"></div>
          </div>
        </van-cell-group>
      </div>
      <div class="buttom">
        <van-button type="primary" class="buttom1" @click="login">登录</van-button>
        <van-button type="danger" @click="register">注册</van-button>
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
      username: "",
      password: "",
      phone: "",
      shortmessage: "",
      verify: "",
      verifys: ""
    };
  },
  //监听方法  click事件等
  methods: {
    //点击注册
    register(){
      this.$api.getregister({
        nickname:this.username,
        password:this.password,
        verify:this.verify
      }).then(res =>{
        console.log(res)
        //轻提示
        this.$toast(res.msg);
      }).catch(err =>{
        console.log(err)
      })
    },
    //点击登录
    login(){
      this.$api.getlogin({
        nickname:this.username,
        password:this.password,
        verify:this.verify
      }).then(res =>{
        console.log(res)
        //轻提示
        this.$toast(res.msg);
        if(res.code===200){
          this.$router.push('/')
        }
        let obj = {
          username:this.username,
          password:this.password,
        }
        localStorage.setItem('user',JSON.stringify(obj))
      }).catch(err =>{
        console.log(err)
      })
    },
    //点击发送短信验证码
    sendout(){
      let a = 60
      //定时器
      let time = setInterval(() => {
        a--
        this.$refs.sendouts.disabled = true
        this.$refs.sendouts.innerText = `${a}s后重新发送`
        if(a == 0){
          clearInterval(time)
          this.$refs.sendouts.disabled = false
          this.$refs.sendouts.innerText = `重新发送`
        }
      },1000)
    },
    //获取验证码图片
    getverifyDate() {
      this.$api.getverifyData().then(res =>{
        // console.log(res)
        this.verifys=res
      }).catch(err =>{
        console.log(err)
      })
    }
  },
  //调用
  mounted() {
    this.getverifyDate()
  },
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: 100%;
  height: 667px;
  background: url("../assets/login.jpg");
  position: relative;
}
.login {
  background: white;
  position: absolute;
  bottom: 15px;
  left: 15px;
  right: 15px;
}
.top {
  font-size: 23px;
  margin-top:10px;
  margin-left:10px;
}
.username {
  margin-top: 20px;
}
.password {
  margin-top: 20px;
}
.phone {
  margin-top: 20px;
}
.middle {
  display: flex;
  margin-top: 10px;
  .middle1 {
    flex: 6;
  }
  .middle2 {
    flex: 4;
  }
}
.buttom {
  margin-top: 30px;
  margin-bottom: 40px;
  padding: 10px;
  .buttom1 {
    margin-right: 20px;
  }
}
</style>