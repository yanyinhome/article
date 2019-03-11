<template>
  <div>
    <mt-header title="">
      <span @click="goback" slot="left">
        <mt-button size="small" icon="back">返回</mt-button>
      </span>
    </mt-header>
    <h5>{{articleDetail.title}}</h5>
    <div class="user_info_box">
      <img :src="userInfo.head_img" alt="">
      <span class="name_box">{{vipstate?userInfo.user_name.slice(0,1)+'***':userInfo.user_name.slice(0,8)}}</span>
      <div class="button_box">
        <mt-button key="1" @click="gomore()">{{vipstate?'升级vip':'更多文章'}}</mt-button>
      </div>
    </div>
    <div class="content_box" v-html="articleDetail.content"></div>
    <Card></Card>
    <div class="button——box">
        <mt-button key="2" @click="go(vipstate?'/levelup':'/personalmessage')">{{vipstate?'我要升级':'完善我的名片'}}</mt-button>
    </div>
    <BottomCopyright></BottomCopyright>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import BottomCopyright from './publicComponents/BottomCopyright';
import {mapState} from 'vuex'
import Card from './publicComponents/Card';
import wx from 'weixin-js-sdk'
export default {
  name: 'ArticleDetails',
  data () {
    return {
      articleDetail:{}
    }
  },
  computed:{
      ...mapState(['userToken','userInfo']),
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
          this.$router.go(-1)
      },
      gomore(){
          if(this.vipstate){
              this.$router.push('/levelup')
          }else {
              this.$router.push('/myarticles')
          }
      },
      go(path){
        this.$router.push(path)
      },
      getArticleDetial(ar_id,pid){
          this.$http({method:'post',url:"/index.php/index/article/get_article_info",data:Object.assign({},this.userToken,{ar_id:ar_id,pid:pid?pid:""})})
              .then(res=>{
                  if(res.data.code==200){
                      console.log(res,"articledetail")
                      this.articleDetail=res.data.data
                  }else {
                      this.$toast(res.data.msg)
                  }
              })
      },
      share(){
          console.log(window.location.href)
          this.$http({method:"post",url:"/index.php/index/article/get_share_url",data:Object.assign({},this.userToken,{link:window.location.href+"&pid="+this.userInfo.user_id})})
                  .then((res) => {
                      console.log(res)
                      this.wxInit(res.data.data);
                          });
      },
      wxInit(sd){
          // alert(window.location.href)
          const _this=this;
          let ar_id=this.$route.query.ar_id
          this.$http({method:'post',url:"/index.php/index/article/get_article_info",data:Object.assign({},this.userToken,{ar_id:ar_id,pid:""})})
              .then(res=>{
                  if(res.data.code==200){
                      // let links=window.location.href+"&pid="+_this.userInfo.user_id;  //分享出去的链接
                      let links="http://wk.cadhx.com/?from=singlemessage#/articledetails?ar_id="+ar_id+"&pid="+_this.userInfo.user_id;  //分享出去的链接
                      let title='向您推荐：'+res.data.data.title;  //分享的标题
                      let desc='向您推荐:'+res.data.data.description; //分享的详情介绍
                      let imgUrl=res.data.data.image;
                      wx.config({
                          debug: false,
                          appId: sd.appId,
                          timestamp: sd.timestamp,
                          nonceStr: sd.nonceStr,
                          signature: sd.signature,
                          jsApiList: [
                              'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'
                          ]
                      });
                      wx.ready(function () {
                          wx.onMenuShareTimeline({
                              title: title, // 分享标题
                              desc: desc, // 分享描述
                              link:links, // 分享链接
                              imgUrl: imgUrl, // 分享图标
                              success: function () {
                                  // alert("分享到朋友圈成功")
                                  _this.$toast({
                                      message: "成功分享到朋友圈"
                                  });
                              },
                              cancel: function () {
                                  // alert("分享失败,您取消了分享!")
                                  _this.$toast({
                                      message: "分享失败,您取消了分享!"
                                  });
                              }
                          });
                          //微信分享菜单测试
                          wx.onMenuShareAppMessage({
                              title:title, // 分享标题
                              desc: desc, // 分享描述
                              link: links, // 分享链接
                              imgUrl: imgUrl, // 分享图标
                              success: function () {
                                  // alert("成功分享给朋友")
                                  _this.$toast({
                                      message: "成功分享给朋友"
                                  });
                              },
                              cancel: function () {
                                  // alert("分享失败,您取消了分享!")
                                  _this.$toast({
                                      message: "分享失败,您取消了分享!"
                                  });
                              }
                          });

                          wx.onMenuShareQQ({
                              title:title, // 分享标题
                              desc: desc, // 分享描述
                              link:links, // 分享链接
                              imgUrl: imgUrl, // 分享图标
                              success: function () {
                                  // alert("成功分享给QQ")
                                  _this.$toast({
                                      message: "成功分享到QQ"
                                  });
                              },
                              cancel: function () {
                                  // alert("分享失败,您取消了分享!")
                                  _this.$toast({
                                      message: "分享失败,您取消了分享!"
                                  });
                              }
                          });
                          wx.onMenuShareWeibo({
                              title:title, // 分享标题
                              desc: desc, // 分享描述
                              link: links, // 分享链接
                              imgUrl: imgUrl, // 分享图标
                              success: function () {
                                  // alert("成功分享给朋友")
                                  _this.$toast({
                                      message: "成功分享到腾讯微博"
                                  });
                              },
                              cancel: function () {
                                  // alert("分享失败,您取消了分享!")
                                  _this.$toast({
                                      message: "分享失败,您取消了分享!"
                                  });
                              }
                          });
                          wx.onMenuShareQZone({
                              title:title, // 分享标题
                              desc: desc, // 分享描述
                              link: links, // 分享链接
                              imgUrl: imgUrl, // 分享图标
                              success: function () {
                                  // alert("成功分享给朋友")
                                  _this.$toast({
                                      message: "成功分享到QQ空间"
                                  });
                              },
                              cancel: function () {
                                  // alert("分享失败,您取消了分享!")
                                  _this.$toast({
                                      message: "分享失败,您取消了分享!"
                                  });
                              }
                          });
                      });
                      wx.error(function(res){
                          // alert("error")
                          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                      });
                  }else {
                      this.$toast(res.data.msg)
                  }
              })
      }
  },
  created() {
      console.log(window.location.href)
      console.log(this.$route.query)
      let ar_id=this.$route.query.ar_id
      let pid=this.$route.query.pid
      if(pid){
          this.getArticleDetial(ar_id,pid)
      }else {
          this.getArticleDetial(ar_id)
      }
  },
  mounted() {
      this.share();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h5{
    text-align: center;
    margin: 0.5rem 0;
    font-size: 1.5rem;
  }
.content_box{
  padding: 0 15px;
  margin-bottom: 3rem;
}
.user_info_box{
  padding: 0.5rem 0.7rem;
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
.button——box{
    text-align: center;
    .mint-button{
        width: 70%;
        height: 40px;
        border-radius: 20px;
        background: #F0961D;
        //background: linear-gradient(right,#F0961D,#F2BE4F);
        background: linear-gradient(270deg,#F0961D 0%,#F2BE4F 100%);
        //background: linear-gradien(90deg,#F2BE4F 0%,#F0961D 100%);
        /* background: -o-linear-gradient(right,#F0961D,#F2BE4F);
        background: -webkit-linear-gradient(right,#F0961D,#F2BE4F);
        background: -webkit-gradient(right,#F0961D,#F2BE4F);
        background: -moz-linear-gradient(right,#F0961D,#F2BE4F);  */
        color: #ffffff;
        font-size: 14px;
    }
}
</style>
