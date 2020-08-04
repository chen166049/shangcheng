<template>
  <div>
    <div
      style="position: relative;display: flex;justify-content: center; font-size: 20px; padding: 10px; border-bottom:1px solid #ddd"
    >
      <div>地址列表</div>
      <div style="position: absolute; left:10px;" @click="$router.back(-1)">
        <!-- 返回上一级 -->
        <van-icon name="arrow-left" size="25px" />
      </div>
    </div>
    <div v-if="list.length ===0">
      <div>暂无收货地址~~</div>
      <div>
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select="select"
        />
      </div>
    </div>
    <div v-else>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
      />
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
      chosenAddressId: "1",
      list: [],
    };
  },
  //监听方法  click事件等
  methods: {
    //选择默认地址
    select(item) {
      console.log(item);
      this.$api
        .getsetDefaultAddress(item.id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击前往编辑地址
    onAdd() {
      this.$router.push("/addressedit");
    },
    //修改地址
    onEdit(item, index) {
      console.log(item);
      this.$router.push({ path: "/addressedit", query: { arr: item } });
    },
    //查询用户所有地址
    getDate() {
      this.$api
        .getgetAddress()
        .then((res) => {
          if (res.code === 200) {
            // console.log(res);
            this.list = res.address;
            console.log(this.list);
            this.list.map((item, index) => {
              this.$set(item, "id", item._id);
              if (item.isDefault === true) {
                this.chosenAddressId = item._id;
              }
            });
          }
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
</style>