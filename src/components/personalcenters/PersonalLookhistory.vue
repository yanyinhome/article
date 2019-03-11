<template>
  <div class="hello">
    <mt-header title="谁看过我">
      <span @click="goback" slot="left">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="bg_box"></div>
    <div class="history_box">
        <div class="history_item" v-for="(item,index) in historyArry" :key="index">
          <div class="article" @click="go(item.article_id)">
            <div class="img_box"><img :src="item.image" alt=""></div>
            <div class="right_box">
              <p class="article_title">{{item.title.length>30?item.title.slice(0,28)+'..':item.title}}</p>
              <p class="article_time">时间：{{item.create_time}}</p>
            </div>
          </div>
          <div class="info_box">
          <span class="info">"{{item.user_name.length>4?item.user_name.slice(0,4)+"..":item.user_name}}"看了您的文章</span>
          <mt-button>
            谁看了？
          </mt-button>
        </div>
      </div>
    </div>
    <BottomCopyright></BottomCopyright>
    <div class="show_bg_box" v-show="vipstate">
      <div class="show_box" >
        <div class="head">
         <div class="item">
           <span>最近看了</span><br>
           <span>{{new_count}}</span>
         </div>
          <div class="item">
           <span>看我总数</span><br>
            <span>{{count}}</span>
         </div>
        </div>
        <div class="info_box">
          <p>你已错过{{count}}签单机会</p>
          <p>开通会员，即可查看意向客户信息</p>
          <mt-button v-bind:class="btn" @click="to('/levelup')">立即开通</mt-button>
        </div>
      </div>
    </div>
   <BottomNav></BottomNav>
  </div>
</template>

<script>
import BottomCopyright from '../publicComponents/BottomCopyright';
import {mapState} from 'vuex';
export default {
  name: 'PersonalLookhistory',
  data () {
    return {
      count:0,
      historyArry:[],
      new_count:0,
      btn:"btn"
    }
  },
  computed:{
      ...mapState(["userToken","userInfo"]),
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
    BottomCopyright
  },
  created(){
      this.$http({method:'post',url:'/index.php/index/user/get_read',data:this.userToken})
          .then(res=>{
              if(res.data.code==200){
                  console.log(res)
                  this.historyArry=res.data.data.list;
                  this.count=res.data.data.count;
                  this.new_count=res.data.data.new_count
              }else{
                  this.$toast(res.data.msg)
              }
          })
  },
  methods:{
    to(path){
        this.$router.push({path:path})
    },
    goback(){
      this.$router.go(-1);
    },
    go(ar_id){
        this.$router.push({path:'/articledetails',query:{ar_id:ar_id}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.bg_box{
  height: 125px;
  background: url('../../assets/img/lookhistory_bg.png') no-repeat center/100% auto;
}
.history_box{
  padding: 30px 15px 0;
  background: #f9f9f9;
  .history_item{
    border-bottom: 1px solid #EBEBEB;
    box-sizing: border-box;
    margin-bottom: 0.5rem;
    color: #333;
    .article{
      overflow: hidden;
      background: #fff;
      padding: 15px;
      box-sizing: border-box;
      .img_box{
        box-sizing: border-box;
        text-align: center;
        width: 23%;
        float: left;
        img{
          height: 60px;
          width: 60px;
        }
      }
      .article_title{
        font-size: 14px;
        line-height: 1.5em;
      }
      .article_time{
        font-size: 12px;
      }
      .right_box{
        padding-left: 15px;
        box-sizing: border-box;
        width: 76%;
        float: left;
      }
    }
    .info_box{
      background: #fff;
      height: 1.8rem;
      line-height: 1.8rem;
      color: #333333;
      font-size: 12px;
      .mint-button{
        float: right;
        margin-right: 15px;
        background: #FD6435;
        height: 1.8rem;
        color: #fff;
        font-size: 0.7rem;
      }
    }
  }
}
.show_bg_box{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  padding:0.9rem;
  z-index: 9999;
  box-sizing: border-box;
  .show_box{
    margin-top: 3rem;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    text-align: center;
    padding-bottom: 1rem;
    .head{
      overflow: hidden;
      clolor:#fff;
      border-bottom: 1px solid #e4d8d8;
      margin-bottom: 45%;
      padding: 1rem 0 0.5rem 0;
      .item{
        width: 50%;
        float: left;
        span:last-child{
          color: #eb7101;
          font-weight: bold;
          font-size: 1.5em;
        }
      }
      .item:last-child{
        box-sizing: border-box;
        border-left: 1px solid #e4d8d8;
      }
      .item:first-child{
        box-sizing: border-box;
        border-right: 1px solid #e4d8d8;
      }
    }
    .btn{
      margin-top: 2rem;
      background:#eb7101;
      color: #fff;
      border: 1px solid #eb7101;
      height: 1.9rem;
      font-size: 0.9rem;
      width: 75%;
      margin-bottom: 2rem;
      font-weight: 600;
      border-radius: 0.95rem;
    }
    p{
      padding: 0.5rem 0;
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      color: #eb7101;
    }
  }
}
</style>
