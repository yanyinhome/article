<template>
  <div>
    <div class="header">首页</div>
    <div class="swiper_box">
      <mt-swipe :show-indicators="false" :auto='5000'>
        <template v-for="(item,index) in BannerList">
          <mt-swipe-item :key="index"><img :src="item.image" alt=""></mt-swipe-item>
        </template>
      </mt-swipe>
      <div class="bottom_show">
            <span class="username">{{userInfo.user_name}}</span>
            <span class="content" @click="outImage">【买保险微我】</span>
      </div>
      <div class="qr_box_bg"  v-show="qrShow">
        <div class="qr_box">
          <p>长按图片加我微信，免费咨询 <span @click="closeImage" class="qr_Show_close"><i class="fa fa-close closeicon"></i></span></p>
          <div class="img_box">
            <img :src="userInfo.qrcode" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="vip_info" v-if="vip_info.show" @click="tolevup">
      {{vip_info.message}}
    </div>
    <div class="nav_bar">
      <div :style="auto_width">
        <span class="nav_list_box" :style="auto_son_width" @click="go(index)" v-for="(item,index) in navArry" v-bind:key="index"><span
          class="nav_list">{{item.name}}</span></span>
      </div>
    </div>
    <div class="article">
      <div class="article_title">
        <span>以下文章都已带上您的名片</span>
      </div>
      <ArticleLists v-bind:article-lists="ArticleLists"></ArticleLists>
    </div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import ArticleLists from './publicComponents/ArticleLists';
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return{
        qrShow:false,
        navArry:[],
        BannerList:[],
        ArticleLists:[],
      }
    },
    computed:{
      ...mapState(['userToken','userInfo']),
        vip_info(){
          console.log(this.userInfo.vip_time)
          console.log(parseInt(new Date().getTime()/1000))
            if(this.userInfo.vip_time<Math.floor(new Date().getTime()/1000)+5*24*60*60){
                let dayNumber=Math.ceil((this.userInfo.vip_time-new Date().getTime()/1000)/60/60/24);
                if(this.userInfo.vip_time<Math.floor(new Date().getTime()/1000)){
                    return{
                        message:'您的会员已到期,立即升级VIP！',
                        show:true
                    }
                }else {
                    return{
                        message:`你的会员还有${dayNumber}天到期，立即升级VIP！`,
                        show:true
                    }
                }
            }else {
                return{
                    message:'',
                    show:false
                }
            }

        },
        auto_width(){
          let len=this.navArry.length;
          if(len<=4){
              return {
                  width:'100%'
              }
          }else {
              let width=25*len;
              return{
                  width:`${width}%`
              }
          }
        },
        auto_son_width(){
          let len=this.navArry.length;
          if(len<=4){
              return{
                  width:'25%'
              }
          }else {
              let width=100/len;
              return{
                  width:`${width}%`
              }
          }
        }
    },
    name: 'Home',
    created(){
        this.$http({method:"post",url:'/index.php/index/index/get_banner',data:this.userToken}).
        then(res=>{
            if(res.data.code==200){
                this.BannerList=res.data.data;
            }else {
                this.$toast(res.data.msg)
            }
        })
        this.$http({method:"post",url:'/index.php/index/index/get_article_cat',data:this.userToken}).
        then(res=>{
            if(res.data.code==200){
                this.navArry=res.data.data;
            }else {
                this.$toast(res.data.msg)
            }
        })
        this.$http({method:"post",url:'/index.php/index/index/get_article_index',data:this.userToken}).
        then(res=>{
            if(res.data.code==200){
                this.ArticleLists=res.data.data
            }else {
                this.$toast(res.data.msg)
            }
        })
        this.$http({method:'post',url:"/index.php/index/user/get_user_info",data:JSON.parse(window.localStorage.userToken)})
            .then(res=>{
                if(res.data.code==200){
                    this.setUserInfo(res.data.data);
                }else {
                    this.$toast(res.data.msg)
                }
            })
    },
    methods:{
        ...mapActions(["SetActiveArticleNav",'setUserInfo']),
        tolevup(){
            this.$router.push('/levelup')
        },
        outImage(){
            if(this.userInfo.qrcode){
                this.qrShow=true;
                return
            }
            else {
                this.$toast('尚未设置二维码')
            }
        },
        closeImage(){
          this.qrShow=false
        },
        go(index){
            this.$router.push({path:'/myarticles'});
            this.SetActiveArticleNav(index)
            window.localStorage.ActiveArticleNav=index;
        }
    },
    components:{
        ArticleLists
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header{
  text-align-last: center;
  color: #333333;
  padding: 15px 0;
  font-size: 16px
}
.swiper_box{
  height: 220px;
  position: relative;
  .mint-swipe{
    img{
      height: 100%;
      width: 100%;
    }
  }
  .bottom_show{
    z-index: 999;
    font-size: 14px;
    position: absolute;
    bottom: 0;
    width: 100%;
    height:35px;
    line-height: 35px;
    padding: 0 20px;
    background:rgba(0,0,0,0.5);
    box-sizing: border-box;
    .username{
      color: #FFB000;
      padding-right: 20px;
    }
    .content{
      color: #f5f5f5;
    }
  }
}
.vip_info{
  text-align: center;
  background: #f9cfc2;
  height: 2.5rem;
  padding: 0.5rem 0;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  box-sizing: border-box;
  color: #eb7101;
}
.qr_box_bg{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  padding:0.9rem;
  z-index: 9999;
  box-sizing: border-box;
  .qr_box{
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    text-align: center;
    padding-bottom: 3rem;
    p{
      padding: 20px;
      font-size: 1.05rem;
      text-align: left;
      .closeicon{
        position: absolute;
        right: 1.9rem;
        color: #c1bebe;
      }
    }
    img{
      width: 70%;
    }
  }
}
.nav_bar{
  overflow: auto;
  height: 48px;
  line-height: 48px;
  margin: 0.3rem 0;
  .nav_list_box{
    display: inline-block;
    width: 25%;
    box-sizing: border-box;
    padding: 0 0.35rem;
    .nav_list{
      color: #333333;
      font-size: 0.9rem;
      text-align: center;
      display: inline-block;
      border: 1px solid #999999;
      border-radius: 13px;
      height: 26px;
      line-height: 26px;
      width: 100%;
    }
  }
}
.article{
  padding-bottom: 60px;
  .article_title{
    background:url('../assets/img/line.png') repeat-x center;
    margin: 0px 0px 10px;
    text-align: center;
    color: #FA4913FF;
    font-size: 14px;
    box-sizing: border-box;
    span{
      display: inline-block;
      padding: 0 10px;
      background: #cccccc;
      border-radius: 4px;
      color: #eb7101;
    }
  }
}
</style>
