<template>
  <div>
  <div
      style="position: relative;display: flex;justify-content: center; font-size: 20px; padding: 10px; border-bottom:1px solid #ddd"
    >
      <div>编辑地址</div>
      <div style="position: absolute; left:10px;" @click="$router.back(-1)"><!-- 返回上一级 -->
        <van-icon name="arrow-left" size="25px" />
      </div>
    </div>
    <div>
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
        :address-info="addressinfo"
      />
    </div>
  </div>
</template>

<script>
import areaList from '../http/area'
import { Toast } from "vant";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      areaList,   //地区列表	
      searchResult: [],  //详细地址搜索结果
      addressinfo:{},  //点击修改的默认地址
    };
  },
  //监听方法  click事件等
  methods: {
    //编辑地址
    onSave(content) {
      Toast("save");
      console.log(content)
      this.$api.getaddress({
          name:content.name,
          tel:content.tel,
          address:content.province + content.city + content.county + content.addressDetail,
          isDefault:content.isDefault,
          province:content.province,
          city:content.city,
          county:content.county,
          addressDetail:content.addressDetail,
          areaCode:content.areaCode,
          id:content._id,
      }).then(res =>{
          if(res.msg ==='添加成功'){
              this.$router.go(-1)
              Toast("添加成功");
          }
          if(res.msg ==='修改成功'){
              this.$router.go(-1)
              Toast("修改成功");
          }
          console.log(res)
      }).catch(err =>{
          console.log(err)
      })
    },
    //确认删除
    onDelete(content) {
      
      this.$api.getdeleteAddress(content._id).then(res =>{
          if(res.msg ==='删除成功'){
              this.$router.go(-1)
              Toast("删除成功");
          }
          console.log(res)
      }).catch(err =>{
          console.log(err)
      })
    },
    //取消删除
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
  //调用
  mounted() {
    //默认地址数据
    this.addressinfo = this.$route.query.arr
    // console.log(this.addressinfo)
  },
  watch: {},
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
</style>