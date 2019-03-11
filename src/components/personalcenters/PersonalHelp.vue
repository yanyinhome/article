<template>
  <div class="hello">
    <mt-header title="新手指南">
     <span @click="goback" slot="left">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="help_box">
      <h3>{{title}}</h3>
      <h3 v-if="!title">使用说明书</h3>
      <div class="user_info_box">
        <img :src="userInfo.head_img" alt="">
        <span class="name_box">{{vipstate?userInfo.user_name.slice(0,1)+'**':userInfo.user_name}}</span>
        <div class="button_box" @click="change">
          <mt-button key="1">{{vipstate?"立即升级":"更多文章"}}</mt-button>
        </div>
      </div>
      <div class="content_box" v-if="!content">
        文章内容
      </div>
      <div class="content_box" v-html="content">
        文章内容
      </div>
    </div>
    <Card></Card>
    <div class="button——box">
        <mt-button @click="go('/personalmessage')">完善我的名片</mt-button>
    </div>
    <BottomCopyright></BottomCopyright>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import Card from '../publicComponents/Card';
import BottomCopyright from '../publicComponents/BottomCopyright';
import  {mapState} from 'vuex';
export default {
  name: 'PersonalHelp',
  data () {
    return {
        content:null,
        title:null
    }
  },
  computed:{
      ...mapState(['userInfo','userToken']),
      vipstate:function () {
          if(this.userInfo.vip_time=="已过期"){
              return true
          }
          if(this.userInfo.vip_time<parseInt(new  Date().getTime()/1000)){
              return true
          }
          return false
      }
  },
  components:{
    BottomCopyright,
    Card
  },
  methods:{
    goback(){
      this.$router.go(-1);
    },
    go(path){
      this.$router.push(path);
    },
    change(){
        if(this.vipstate){
            this.go('/levelup')
        }else {
            this.go('/myarticles')
        }
    }
  },
  created() {
      this.$http({method:'post',url:"/index.php/index/article/get_article_info",data:Object.assign({},this.userToken,{ar_id:5})})
          .then(res=>{
              this.content=res.data.data.content
              this.title=res.data.data.title
          })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .user_info_box{
    padding: 0.5rem 0rem;
    img{
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    .name_box{
      display: inline-block;
      overflow: hidden;
      font-size: 0.8rem;
    }
    .button_box{
      float: right;
      width: 5rem;
      height: 1.5rem;
      box-sizing: border-box;
      margin-top: 0.75rem;
      .mint-button{
        background: #F0961D;
        color: #ffffff;
        height: 100%;
        width: 100%;
        border-radius: 0.75rem;
        font-size: 0.8rem;
      }
    }
  }
.help_box{
  padding: 0 20px;
  box-sizing: border-box;
  h3{
    text-align: center;
    font-size: 20px;
    color: #333333;
  }
  .user_info{
    margin-bottom: 20px;
    img{
      width: 53px;
      height: 53px;
      border-radius: 26.5px;
    }
    .mint-button{
      margin-left: 120px;
      background: #FD6435;
      height: 26px;
      width: 85px;
      border-radius: 10px;
      font-size: 12px;
      color: #ffffff;
      }
  }


}
.button——box{
    text-align: center;
    .mint-button{
        width: 70%;
        height: 40px;
        border-radius: 20px;
        background: #F0961D;
        background: linear-gradient(270deg,#F0961D 0%,#F2BE4F 100%);
/*         background: -o-linear-gradient(right,#F0961D,#F2BE4F);
        background: -webkit-linear-gradient(right,#F0961D,#F2BE4F);
        background: -webkit-gradient(right,#F0961D,#F2BE4F);
        background: -moz-linear-gradient(right,#F0961D,#F2BE4F); */

        color: #ffffff;
        font-size: 14px;
    }
}
</style>
