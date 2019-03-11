<template>
  <div class="hello">
    <mt-header title="个人中心">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="user_info">
      <img :src="userInfo.head_img?userInfo.head_img  :'../assets/img/card_photo.png'" alt="">
      <p>{{userInfo.user_name?userInfo.user_name:'归零'}}</p>
      <p class="mes"><span>电话:{{userInfo.phone?userInfo.phone:'无'}}</span><span>到期时间:{{endTime?endTime:'已到期'}}</span></p>
    </div>
    <div class="user_jinbi">
      <span class="gold_number">金币数：<span class="number">{{userInfo.money}}</span>金币</span>
      <mt-button class="vip" @click="go('/levelup')">成为VIP</mt-button>
      <mt-button class="change" @click="go('/personalduihuan')">金币兑换</mt-button>
    </div>
    <div class="line"></div>
    <div class="lists_box">
      <div @click="go('/personalmessage')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_mes">我的资料</span>
        </span>
        <span slot="right">
          <span class="go">&nbsp;</span>
        </span>
        </mt-header>
      </div>
      <div @click="go('/personalcustomer')">
        <mt-header title="">
        <span slot="left">
          <span class="user_base user_cus">我的客户</span>
        </span>
        <span slot="right">
          <span class="go">&nbsp;</span>
        </span>
        </mt-header>
      </div>
      <div @click="go('/personallookhistory')">
        <mt-header  title="">
        <span slot="left">
          <span class="user_base user_look">谁看过我</span>
        </span>
        <span slot="right">
          <span class="go">&nbsp;</span>
        </span>
        </mt-header>
      </div>
      <div @click="go('/show')">
        <mt-header  title="">
        <span slot="left">
          <span class="user_base user_show">我的海报</span>
        </span>
        <span slot="right">
          <span class="go">&nbsp;</span>
        </span>
        </mt-header>
      </div>
      <div @click="go('/personalhelp')">
        <mt-header  title="">
        <span slot="left">
          <span class="user_base user_help">新手指南</span>
        </span>
        <span slot="right">
          <span class="go">&nbsp;</span>
        </span>
        </mt-header>
      </div>
      <div @click="go('/personalsuggests')">
        <mt-header  title="">
        <span slot="left">
          <span class="user_base user_suggest">意见反馈</span>
        </span>
        <span slot="right">
          <span class="go">&nbsp;</span>
        </span>
        </mt-header>
      </div>
    </div>
    <div class="copyright_box">
      <BottomCopyright></BottomCopyright>
    </div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import BottomCopyright from './publicComponents/BottomCopyright';
import {mapState,mapActions} from "vuex";
export default {
  name: 'PersonalCenter',
  components:{
    BottomCopyright
  },
  computed:{
      ...mapState(['userInfo','userToken']),
      endTime:function () {
          return this.userInfo.vip_time
      }
  },
  methods:{
      ...mapActions(['setUserInfo']),
    go(path="/"){
      this.$router.push({path:path})
    },
     goback(){
      this.$router.go(-1);
    }
  },
  created() {
      //获取会员中心数据
      this.$http({method:'post',url:"/index.php/index/user/get_user_index",data:JSON.parse(window.localStorage.userToken)})
          .then(res=>{
              if(res.data.code==200){
                  console.log(res)
                  this.setUserInfo(res.data.data);
              }else {
                  this.$toast(res.data.msg)
              }
          })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.user_info{
  padding-top: 20px;
  text-align: center;
  height: 175px;
  color: #ffffff;
  background: url('../assets/img/userinfo_bg.png') no-repeat center/100% 100%;
  img{
    height: 60px;
    width: 60px;
    border-radius: 50%;
    margin-bottom: 20px;
  }
  p{
    line-height: 1.5em;
    font-size: 1rem;
  }
  .mes{
    font-size: 0.8rem;
    margin:0.5rem 1rem;
    span{
      display: inline-block;
      width: 50%;
      box-sizing: border-box;
    }
  }
}
.user_jinbi{
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  font-size: 14px;
  .gold_number{
    display: inline-block;
    margin-right: 20px;
    .number{
      font-size: 20px;
      color: #FA4913
    }
  }
  .mint-button{
    height: 26px;
    font-size: 12px;
  }
  .vip{
    background: #FA4913;
    margin-right: 10px;
    color: #fff;
  }
  .change{
    border:1px solid #C5C5C5;
  }
}
.line{
    height: 8px;
    background-color: #f8f8f8;
  }
.lists_box{
  padding: 10px;
  .mint-header{
    padding:0 10px;
    border-bottom: 1px solid #e3e3e3;
  }
  .user_base{
    display: inline-block;
    padding-left: 30px;
    box-sizing: border-box;
  }
  .user_mes{
    background: url('../assets/img/user_info.png') no-repeat left/22px 22px;
  }
  .user_cus{
    background: url('../assets/img/user_cus.png') no-repeat left/22px 22px;
  }
  .user_look{
    background: url('../assets/img/user_look.png') no-repeat left/22px 22px;
  }
  .user_show{
    background: url('../assets/img/user_show.png') no-repeat left/22px 22px;
  }
  .user_help{
    background: url('../assets/img/user_help.png') no-repeat left/22px 22px;
  }
  .user_suggest{
    background: url('../assets/img/user_suggest.png') no-repeat left/22px 22px;
  }
  .go{
    display: inline-block;
    width: 20px;
    background: url('../assets/img/go.png') no-repeat center/20px 20px;
  }
}
</style>
