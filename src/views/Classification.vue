<template>
  <div>
    <div style="text-align: center;">商品分类</div>
    <div class="box">
      <div>
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            :title="item.mallCategoryName"
            v-for="(item, index) in category"
            :key="index"
            @click="onChange"
          />
        </van-sidebar>
      </div>
      <div>
        <van-tabs v-model="active" :ellipsis="false" @click="onClick">
          <van-tab :title="item.mallSubName" v-for="(item,index) in bxMallSubDto" :key="index"></van-tab>
        </van-tabs>
        <div style="height: 500px; overflow: auto;">
          <div v-for="(item,index) in dataList" :key="index" class="dataList" @click="$details(item.id)">
            <div class="dataList1">
              <img :src="item.image" />
            </div>
            <div class="dataList2">
              <div>{{item.name}}</div>
              <div style="display:flex; margin-top:10px">
                <div style>¥{{item.present_price}}</div>
                <div
                  style="margin-left:20px; color:#666; text-decoration:line-through"
                >{{item.orl_price}}</div>
              </div>
            </div>
          </div>
          <div v-if="dataList.length == 0">暂无数据</div>
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
      activeKey: 0, //侧边导航栏的默认项
      active: 0, //标签页的默认项
      category: "", //侧边栏数据
      bxMallSubDto: "", //标签页数据
      mallSubId: "", //默认分类的ID
      dataList: "" //商品数据
    };
  },
  //监听方法  click事件等
  methods: {
    //标签页的点击事件
    onClick(name, title) {
      this.mallSubId = this.bxMallSubDto[name].mallSubId; //根据点击标签页的每一项获取每一项默认分类的ID
      this.getData(this.mallSubId); //根据ID请求商品数据
    },
    //侧边导航的点击事件
    onChange(index) {
      this.bxMallSubDto = this.category[index].bxMallSubDto; //侧边导航栏的变化获取标签页的数据
      this.active = 0; //标签页默认项清0
      this.mallSubId = this.bxMallSubDto[this.active].mallSubId; //侧边栏变化的默认分类的ID
      this.getData(this.mallSubId); //根据ID请求商品数据
    },

    //默认分类数据
    getData(id) {
      this.$api
        .getdataList(id)
        .then(res => {
          // console.log(res);
          //请求到的商品赋值
          this.dataList = res.dataList;
          console.log(this.dataList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //首页数据
    getHomeData() {
      this.$api
        .getHomeData()
        .then(res => {
          // console.log(res);
          // console.log(res.data.category);
          this.category = res.data.category; //获取侧边栏数据
          this.bxMallSubDto = this.category[this.activeKey].bxMallSubDto; //获取标签页的数据
          this.mallSubId = this.bxMallSubDto[this.active].mallSubId; //获取标签页默认分类的ID(初始进来默认显示商品分类的ID)
          this.getData(this.mallSubId); // 根据ID获取具体的商品
          // console.log(this.bxMallSubDto);
          // console.log(this.mallSubId);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  //调用
  mounted() {
    if (this.$route.query.indexid) {
      this.activeKey = this.$route.query.indexid;
    }
    this.getHomeData(); //请求首页数据
  },
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  display: flex;
}
.dataList {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 7px;
  border-bottom: 1px solid #eee;
}
.dataList1 {
  width: 30%;
  height: 80px;
  img {
    width: 100%;
    height: 80px;
    border: 1px solid #ddd;
  }
}
.dataList2 {
  width: 65%;
  margin-top: 13px;
  font-size: 14px;
  color: red;
}
</style>