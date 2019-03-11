<template>
  <div>
    <mt-header title="我的文库">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <hr>
    <div class="nav_bar">
        <span class="nav_list_box" @click="changeArticle(index)"  v-for="(item,index) in navArry" v-bind:key="index"><span class="nav_list" v-bind:class="{active:ActiveArticleNav==index}">{{item.name}}</span></span>
    </div>
    <div class="article">
        <div class="article_title">
          <span>以下文章都已带上您的名片</span>
        </div>
        <ArticleLists v-bind:article-lists="ArticleListsClass"></ArticleLists>
    </div>
    <div class="bottom_box">
      <div class="botton_box">
        <span><mt-button size="small" @click.native="handleClick('back')">上一页</mt-button></span>
        <span><mt-button size="small" @click.native="handleClick('next')">下一页</mt-button></span>
      </div>
    <BottomCopyright></BottomCopyright>
    </div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import ArticleLists from './publicComponents/ArticleLists';
import BottomCopyright from './publicComponents/BottomCopyright';
import {mapState,mapActions} from 'vuex'
export default {
  name: 'MyArticles',
  components:{
      ArticleLists,
      BottomCopyright
  },
  data () {
    return {
      navArry:[],
      ArticleListsClass:[],
      articlePage:1,
      count_page:null
    }
  },
  computed:{
      ...mapState(["ActiveArticleNav",'userToken'])
  },
  created(){
      this.$http({method:"post",url:'/index.php/index/index/get_article_cat',data:this.userToken}).
      then(res=>{
          if(res.data.code==200){
              this.navArry=res.data.data;
          }else {
              this.$toast(res.data.msg)
          }
      });
      this.getArticle(parseInt(this.ActiveArticleNav)+1)
  },
  methods:{
      ...mapActions(['SetActiveArticleNav']),
    handleClick(type){
        if(type=='back'){
            if(this.articlePage==1){
                this.$toast("已经是第一页")
                return
            }else {
                this.articlePage--
            }
        }
        if(type=='next'){
            if(this.articlePage==this.count_page){
                this.$toast("没有下一页啦")
                return
            }else {
                this.articlePage++
            }
        }
        this.getArticle(parseInt(this.ActiveArticleNav)+1,this.articlePage)
    },
    getArticle(id,page=1){
        this.$http({method:"post",url:'index/article/get_article_list',data:Object.assign({},this.userToken,{catid:id,page:page})}).
        then(res=>{
            if(res.data.code==200){
                this.ArticleListsClass=res.data.data.list;
                this.count_page=res.data.data.count_page
            }else {
                this.$toast(res.data.msg)
            }
        })
    },
    changeArticle(index){
        this.articlePage=1;
        this.SetActiveArticleNav(parseInt(index));
        this.getArticle(index+1)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.nav_bar{
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
    .active{
      border: 1px solid rgba(250, 73, 19, 1);
      color:rgba(250, 73, 19, 1);
    }
  }
}
.article{
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
.bottom_box{
  .botton_box{
    padding: 20px 0;
    span{
      text-align: center;
      display: inline-block;
      width: 49%;
      box-sizing: border-box;
      }
  }
}
</style>
