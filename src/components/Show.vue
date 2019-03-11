<template>
  <div>
    <mt-header title="展示海报">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <hr>
    <div class="show_box">
      <div class="show_nav">
        <div class="swiper-slide" v-for="(item,index) in navArry" :key="index">
          <div @click="changeActive(index)" class="nav_item" :class="{NavActive:index==NavActive}">{{item}}</div>
        </div>
        <!--<div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in navArry" :key="index">
              <div @click="changeActive(index)" class="nav_item" :class="{NavActive:index==NavActive}">{{item}}</div>
            </div>
          </div>
        </div>-->
      </div>
      <div class="showList_box">
        <div class="showItem_box" v-for="(item,index) in showList" :key="index" @click="getImage(item.id)">
          <div class="bg_info">{{item.name.slice(0,3)}}</div>
          <div class="img_box">
            <img :src="item.image" alt="">
          </div>
        </div>
      </div>
     <div class="show_bg_box" v-show="flag">
       <div class="show_box" >
         <div class="head">
           <mt-button v-bind:class="left" v-on:click="go('/levelup')">升级</mt-button>
           <mt-button v-bind:class="right" v-on:click="go('/personalmessage')">修改名片</mt-button>
           <i class="fa fa-close closeicon" @click="close()"></i>
         </div>
         <div class="img_box">
           <img :src="showSrc" alt="">
         </div>
         <p>长按图片保存</p>
       </div>
     </div>
    </div>
    <BottomNav></BottomNav>
  </div>

</template>

<script>
// import Swiper from "swiper";
// import 'swiper/dist/css/swiper.min.css';
import  {mapState}  from 'vuex';
export default {
  name: 'Show',
  data () {
    return {
      flag:false,
      NavActive:"0",
      navArry:[],
      showList:[],
      showSrc:null,
      left:"left",
      right:"right"
    }
  },
  computed:{
      ...mapState(['userToken','userInfo'])
  },
  methods:{
      changeActive(item){
        this.NavActive=item;
        this.getShowByType(parseInt(item)+1)
    },
      go(path){
          this.$router.push({path:path})
      },
      getImage(id){
          const _this=this;
          this.$http({method:'post',url:"/index.php/index/poster/img_qrcode",data:Object.assign({},this.userToken,{p_id:id} )})
              .then(res=>{
                  if(res.data.code==200){
                      this.flag=true;
                      _this.showSrc=res.data.data;
                  }else {
                      _this.$messagebox.confirm('',{
                          message: '您还没有上传二维码，无法生成海报！',
                          title: '温馨提示',
                          confirmButtonText: '立即上传',
                          cancelButtonText: '取消'
                      }).then(action => {
                          if (action == 'confirm') {     //确认的回调
                              _this.$router.push('/personalmessage');
                          }
                      }).catch(err => {
                          if (err == 'cancel') {     //取消的回调
                              console.log(2);
                          }
                      })
                  }
              })
      },
      close(){
          this.flag=false
      },
      getShowByType(type){
          this.$http({method:'post',url:"/index.php/index/poster/get_poster_list",data:Object.assign({},this.userToken,{type:type})})
              .then(res=>{
                  if(res.data.code==200){
                      this.showList=res.data.data;
                  }else {
                      this.$toast(res.data.msg)
                  }
              })
      }
  },
  created(){
      this.$http({method:'post',url:"/index.php/index/poster/get_poster_type",data:this.userToken})
          .then(res=>{
              if(res.data.code==200){
                 this.navArry=res.data.data;
              }else {
                  this.$toast(res.data.msg)
              }
          })
     /* this.$http({method:'post',url:"/index.php/index/poster/img_qrcode",data:Object.assign({},this.userToken,{p_id:1})})
          .then(res=>{
              if(res.data.code==200){
                  this.showItem.src=res.data.data;
              }else {
                  this.$toast(res.data.msg)
              }
          })*/
      this.getShowByType(1)
  },
  mounted() {
      // setTimeout(function () {
      //     var mySwiper = new Swiper(".swiper-container", {
      //         slidesPerView: 4,
      //         loop: true,
      //     });
      // },1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/*@import "../../node_modules/swiper/dist/css/swiper.css";*/
/*.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  !* Center slide text vertically *!
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}*/

.mint-header{
  background-color: #fff;
  color: #333333;
  font-size: 1rem;
}
.show_box{
  padding: 0 0.6rem;
  .show_nav{
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    .swiper-slide{
      width: 20%;
      text-align: center;
      float: left;
    }
    .NavActive{
      color: #FA4913;
    }
    .nav_item{
      font-size: 1rem;
    }
  }
}
.showList_box{
  overflow: hidden;
  .showItem_box{
    position: relative;
    width: 33.3%;
    box-sizing: border-box;
    text-align: center;
    float: left;
    .bg_info{
      position: absolute;
      width: 100%;
      bottom: 0;
      background:rgba(255,255,255,0.5);
      text-align: center;
      box-sizing: border-box;
      label{
        font-size: 0.8rem;
      }
    }
    .img_box{
      padding:0 0.3rem;
      img{
        width: 100%;
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
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    text-align: center;
    padding-bottom: 1rem;
    .head{
      overflow: hidden;
      clolor:#fff;
      border-bottom: 1px solid #e4d8d8;
      margin-bottom: 0.8rem;
      padding: 1rem 0 0.5rem 0;
      .left{
        margin-left: 5%;
        float: left;
        background: rgba(250, 73, 19, 1);
        color: #fff;
        height: 1.8rem;
        font-size: 0.9rem;
      }
      .right{
        margin-right: 10%;
        float: right;
        background: rgba(228, 199, 4, 1);
        color: #fff;
        height: 1.8rem;
        font-size: 0.9rem;
      }
      .closeicon{
        position: absolute;
        top:1.3rem;
        right: 1.5rem;
        color: #c1bebe;
      }
    }
    p{
      padding: 0.8rem 0 0.5rem 0;
      font-size: 1.05rem;
      text-align: center;
      color: #eb7101;
    }
    img{
      width: 85%;
    }
  }
}
</style>
