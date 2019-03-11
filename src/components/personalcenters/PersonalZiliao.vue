<template>
  <div class="hello">
    <mt-header title="保险品牌">
      <span @click="goback" slot="left">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="hot_box">
      <p>热门品牌</p>
      <div class="buttons_box">
        <span v-for="(item,index) in buttonsArry" :key="index">
          <mt-button>{{item.name}}</mt-button>
        </span>
      </div>
    </div>
    <div class="more_box">
      <p>更多品牌</p>
      <div class="more_buttons_box">
        <span class="more_button_item" v-for="(val,key) in moreArray" @click="chang({key:key,val:val})" :class="{active:key==ActiveFlag}" :style="{color:val.count==0?'#ccc':'#666'}"  :key="key">{{val.name}}</span>
      </div>
      <div class="role_list_box">
        <div class="role_item" @click="checkd(item)" v-for="(item,index) in roleArray" :key="index">
          {{item.name}}
        </div>
      </div>
    </div>
   <BottomNav></BottomNav>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  name: 'PersonalZiliao',
  data () {
    return {
      ActiveFlag:1,
      CheckdBrand:"",
      buttonsArry:[
        {name:"阳光保险"},
        {name:"阳光保险"},
        {name:"阳光保险"},
        {name:"阳光保险"},
        {name:"阳光保险"},
        {name:"阳光保险"},
        {name:"阳光保险"},
      ],
      moreArray:{
        1:{name:"All",fg_is:true,fg_active:1},
        2:{name:"All",fg_is:false,fg_active:0},
        3:{name:"All",fg_is:false,fg_active:0},
        4:{name:"All",fg_is:true,fg_active:0},
        5:{name:"All",fg_is:true,fg_active:0},
        6:{name:"All",fg_is:true,fg_active:0},
        7:{name:"All",fg_is:true,fg_active:0},
        8:{name:"All",fg_is:true,fg_active:0},
        9:{name:"All",fg_is:true,fg_active:0},
        10:{name:"All",fg_is:true,fg_active:0}
      },
      roleArray:[
        {name:'阳光保险'},
        {name:'阳光保险'},
        {name:'阳光保险'},
        {name:'阳光保险'},
        {name:'阳光保险'},
        {name:'阳光保险'},
        {name:'阳光保险'},
        {name:'阳光保险'},
        {name:'阳光保险'},
        {name:'阳光保险'},
      ]
    }
  },
  computed:{
     ...mapState(['userToken']),
  },
  methods:{
    goback(){
      this.$router.go(-1);
    },
    checkd(val){
        this.$router.push({path:'/personalmessage',query:{brand:val.id,brand_name:val.name}});
    },
    chang(item){
        this.ActiveFlag=parseInt(item.key);
        if(item.val.count<1){
            return
        }else {
            this.getBand(item.val.cat);
        }
    },
    getBand(cat){
        this.$http({method:'post',url:'/index.php/index/user/get_brand',data:Object.assign({},this.userToken,{cat:cat})})
            .then(
                res=>{
                    if(res.data.code==200 && JSON.stringify(res.data.data)!=="{}"){
                        this.roleArray=res.data.data.brand_list.map((item,index)=>{
                            return {
                                name:item.name.slice(0,16),
                                id:item.id
                            }
                        })
                    }else {
                        this.$toast(res.data.message?res.data.message:"未知错误")
                    }
                }
            )
    }
  },
  created() {
      this.$http({method:'post',url:'/index.php/index/user/get_brand',data:Object.assign({},this.userToken,{cat:""})})
          .then(res=>{
              if(res.data.code==200 && JSON.stringify(res.data.data)!=="{}"){
                  this.buttonsArry=res.data.data.hot_brand.map((item,index)=>{
                      return {
                          name:item.name.slice(0,4),
                          id:item.id
                      }
                  })
                  this.roleArray=res.data.data.brand_list.map((item,index)=>{
                      return {
                          name:item.name.slice(0,16),
                          id:item.id
                      }
                  })
                 this.moreArray=res.data.data.brand;
              }else {
                  this.$toast(res.data.message?res.data.message:"未知错误")
              }
          })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello{
    p{
      color:#333333;
      font-size: 14px;
    }
    .hot_box{
      padding:0 15px;
      .buttons_box{
        padding: 5px 0px;
        color: #333333;
        span{
          display: inline-block;
          width: 25%;
          height: 35px;
          line-height: 35px;
          box-sizing: border-box;
          padding:0 5px;
          .mint-button--normal{
            padding:0 3px;
          }
          .mint-button{
          width: 100%;
          box-sizing: border-box;
          height: 26px;
          font-size: 0.8rem;
          border-radius: 13px;
          background: #ffffff;
        }
        }
      }
    }
    .more_box{
      padding: 0 15px;
      .more_buttons_box{
        padding:10px 0;
        span{
          display: inline-block;
          width: 16%;
          box-sizing: border-box;
          text-align: center;
          border: 1px solid #dcdada;
          line-height: 30px;
          height: 30px;
          margin-right: 2px;
          margin-bottom: 2px;
          color: #666666;
        }
        .active{
          background:#FA4913;
        }
      }
      .role_list_box{
        padding: 0 10px;
        .role_item{
          height: 30px;
          line-height: 30px;
          color: #333333;
        }
      }
    }
  }
</style>
