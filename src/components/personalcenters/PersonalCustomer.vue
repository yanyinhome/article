<template>
  <div class="hello">
    <mt-header title="我的客户">
      <span @click="goback" slot="left">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="list_box">
      <div class="list_item" v-for="(item,index) in customersArry" :key="index">
        <img :src="item.head_img" alt="">
        <p class="username">{{item.user_name.length>4?item.user_name.slice(0,3)+"..":item.user_name}}</p>
        <p class="time">{{item.create_time}}</p>
      </div>
    </div>
    <BottomCopyright></BottomCopyright>
   <BottomNav></BottomNav>
  </div>
</template>

<script>
import BottomCopyright from '../publicComponents/BottomCopyright';
import {mapState} from 'vuex';
export default {
  name: 'PersonalCustomer',
  data () {
    return {
      customersArry:[]
    }
  },
  computed:{
      ...mapState(["userToken"]),
  },
  components:{
    BottomCopyright
  },
  created(){
      this.$http({method:'post',url:"/index.php/index/user/get_son",data:this.userToken})
          .then(res=>{
              if(res.data.code==200){
                  this.customersArry=res.data.data;
              }
          })
  },
  methods:{
    goback(){
      this.$router.go(-1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.list_box{
  padding: 20px 5px 0;
  .list_item{
    margin-bottom: 15px;
    display: inline-block;
    width: 33%;
    text-align: center;
    box-sizing: border-box;
    .username{
      font-size: 14px;
      color: #333;
    }
    .time{
      font-size: 12px;
      color:#999999;
    }
    img{
      width: 60px;
      height: 60px;
      margin-bottom: 10px;
    }
  }
}
</style>
