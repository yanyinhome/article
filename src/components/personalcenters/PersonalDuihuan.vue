<template>
  <div class="hello">
    <mt-header title="积分兑换">
      <span @click="goback" slot="left">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="duihuan_box">
        <p class="title">可兑换数额：<span>{{totalGold}}</span></p>
        <div class="input_box">
            <input type="text" v-model="goldNumber" placeholder="请输入兑换数额">
            <mt-button @click="submitCharge">确定</mt-button>
        </div>
        <p class="info">兑换规则:{{ChargeNumber}}个金币兑换1日</p>
    </div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: 'DuiHuan',
  data () {
    return {
      totalGold:50,
      ChargeNumber:10,
      goldNumber:""
    }
  },
  computed:{
      ...mapState(["userToken"])
  },
  mounted(){
      this.$http({method:"post",url:"/index.php/index/user/vip_index",data:Object.assign({},this.userToken)})
          .then(res=>{
              if(res.data.code==200){
                 this.totalGold=res.data.data.money
                 this.ChargeNumber=res.data.data.price;
              }
          })
  },
  methods:{
    go(path="/"){
      this.$router.push({path:path})
    },
    goback(){
      this.$router.go(-1);
    },
    submitCharge(){
        if(this.goldNumber){
            let DayNum=Math.floor(parseInt(this.goldNumber)/parseInt(this.ChargeNumber))
            this.$http({method:"post",url:"/index.php/index/user/buy_vip",data:Object.assign({},this.userToken,{num:DayNum})})
                .then(
                    res=>{
                        if(res.data.code==200){
                            this.goldNumber=""
                            this.$toast("兑换成功")
                        }else {
                            this.$toast(res.data.msg);
                        }
                    }
                )
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.duihuan_box{
    min-height: 750px;
    padding: 330px 15px 0;
    box-sizing: border-box;
    background: url('../../assets/img/jifenduihuan.png')no-repeat center/100% 100%;
    .input_box{
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        line-height: 40px;
        background: #fff;
        font-size: 14px;
        margin-bottom: 18px;
        input{
            min-width: 70%;
            width: calc(100% - 100px);
            height: 40px;
            line-height: 40px;
            border: none;
            outline: none;
            padding-left: 15px;
            box-sizing: border-box;
            margin-right: 15px;
        }
        .mint-button{
            width: 60px;
            height: 24px;
            line-height: 24px;
            background: #FA4913;
            color: #fff;
            box-sizing: border-box;
            font-size: 14px;
        }
    }
    .title{
        color: #FD3B00;
        font-size: 16px;
        margin-bottom: 18px;
    }
    .info{
        color: #333;
        font-size: 16px;
    }
}
</style>
