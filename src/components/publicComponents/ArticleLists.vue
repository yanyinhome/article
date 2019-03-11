<template>
  <div class="article_box">
    <div class="article_item" v-for="(item,index) in ArticleLists" v-bind:key="index" @click="to('/articledetails',item.id)" >
      <div class="list_box" v-if="item.style_type==2">
        <p>{{item.title}}</p>
        <div class="img_box" v-for="(imgItem,index) in item.images" v-bind:key="index">
          <img  v-lazy="imgItem" alt="">
        </div>
        <span class="article_info">热门事件</span>
        <span class="article_type">保险意识</span>
      </div>
      <div class="list1_box" v-if="item.style_type==0">
        <div class="left_box">
          <p>{{item.title.length>=35?item.title.slice(0,31)+'..':item.title}}</p>
          <div class="bottom_box">
            <span class="article_info">热门事件</span>
            <span class="article_type">保险意识</span>
          </div>
        </div>
        <div class="right_box">
          <div class="img_box">
            <img  v-lazy="item.image" alt="">
          </div>
        </div>
      </div>
      <div class="list2_box" v-if="item.style_type==1">
        <p>{{item.title}}</p>
        <div class="img_box">
          <img v-lazy="item.image" alt="">
        </div>
        <span class="article_info">热门事件</span>
        <span class="article_type">保险意识</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props:{
      ArticleLists:{
          default:function () {
              return []
          }
      }
    },
  methods:{
    to(path,ar_id){
      this.$router.push({path:path,query:{ar_id:ar_id}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.article_box{
  padding: 0px 15px 10px;
  .article_item{
    padding: 10px 0;
    border-bottom: 1px solid #e2dfdf;
    p{
      line-height: 1.4rem;
      height: 1.4rem;
      font-size: 1rem;
      color: rgba(51, 51, 51, 1)
    }
    span{
      font-size: 0.6rem;
      height: 0.8rem;
      line-height: 0.8rem;
      display: inline-block;
      padding-bottom: 10px;
    }
    .article_info{
      color: #FA4913;
      padding-right: 5px;
    }
    .article_type{
      color: #999999;
    }
    .list_box{
      overflow: hidden;
      height: 7.5rem;
      .img_box{
        height: 4.3rem;
        line-height: 4.3rem;
        text-align: center;
        width: 33.2%;
        box-sizing: border-box;
        float: left;
        padding: 0 0.2rem;
        img{
          height: 100%;
          width: auto;
          max-width: 100%;
          overflow: hidden;
        }
        image[lazy=loading] {
          width: 6rem;
          height: 4rem;
          margin: auto;
        }
        img:nth-child(2){padding: 0 0.4%;}
      }
    }
    .list1_box{
      overflow: hidden;
      height: 6rem;
      .left_box{
        height: 100%;
        width:66%;
        float: left;
        position: relative;
        .bottom_box{
          position: absolute;
          left: 0;
          bottom: 0rem
        }
      }
      .right_box{
        height: 100%;
        width: 31%;
        float: right;
        .img_box{
          height: 100%;
          text-align: center;
          img{
            width: 100%;
          }
        }
      }
    }
    .list2_box{
      .img_box{
        text-align: center;
        img{
          width: 100%;
        }
      }
    }
  }
}
</style>
