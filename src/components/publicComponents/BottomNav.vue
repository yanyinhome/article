<template>
  <div class="bottom_nav">
    <div class="nav_list" v-for="(item,index) in navlists" @click="to(item.path)" :key='index'>
      <img :src='item.src'  alt=""><br>
      <span>{{item.title}}</span>
    </div>
    <div class="user_phpto" @click="test">
      <img :src='userInfo.head_img' @click="to('/home')" alt="">
    </div>
  </div>
</template>

<script>
import  {mapState,mapActions} from 'vuex';
export default {
  name: 'HelloWorld',
  data () {
    return {
      navlists:[
        {title:'开通vip',path:'/levelup',src:require('../../assets/img/bottom_nav_vip.png')},
        {title:'展示海报',path:'/show',src:require('../../assets/img/bottom_nav_show.png')},
        {title:'首页',path:'/home',src:null},
        {title:'我的文库',path:'/myarticles',src:require('../../assets/img/bottom_nav_article.png')},
        {title:'个人中心',path:'/personalcenter',src:require('../../assets/img/bottom_nav_personal.png')}
      ]
    }
  },
  computed:{
      ...mapState(['userInfo'])
  },
  methods:{
      ...mapActions(['SetActiveArticleNav']),
      test(){
          console.log(1)
      },
    to(path){
        if(path==="/myarticles"){
            this.SetActiveArticleNav(0)
        }
        this.$router.push({path:path})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.bottom_nav{
  border-radius: 2px;
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #FA4913;
  box-sizing: border-box;
  .user_phpto{
    left: calc(50% - 27px);
    top:-33px;
    position: absolute;
    text-align: center;
    box-sizing: border-box;
    img{
      width: 54px;
      height: 54px;
      border-radius: 27px;
      border: 3px solid #FA4913;
      box-sizing: border-box;
    }
  }
  .nav_list{
    z-index: 9999;
    padding-top: 3px;
    font-size: 10px;
    color: #ffffff;
    height: 46px;
    line-height: 20px;
    width: 20%;
    text-align: center;
    display: inline-block;

  }
}

</style>
