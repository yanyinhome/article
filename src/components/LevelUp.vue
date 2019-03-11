<template>
  <div class="hello">
    <mt-header title="开通VIP">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <hr>
    <div class="img_box">
      <div><img src="../assets/img/vip_top.jpg" alt=""></div>
      <div class="button_box">
        <mt-button @click="levUp">立即升级</mt-button>
        <img src="../assets/img/vip_center.jpg" alt="">

      </div>
      <div><img src="../assets/img/vip_bottom.jpg" alt=""></div>
    </div>
    <BottomNav></BottomNav>
  </div>
</template>

<script>
import {mapState} from "vuex"
// import axios from 'axios'
export default {
  name: 'LevelUp',
  data () {
    return {
      flag:true,
    }
  },
  computed:{
      ...mapState(["userToken","userInfo"])
  },
  methods:{
    handleClose(){

    },
    jsApiCall(jsApiParameters){
        let info=JSON.stringify(jsApiParameters);
        let info1=JSON.parse(info);
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            {appId:info1.appId.toString(),
                nonceStr:info1.nonceStr.toString(),
                package:info1.package.toString(),
                paySign:info1.paySign.toString(),
                signType:info1.signType.toString(),
                timeStamp:info1.timeStamp.toString()
            },
            function(res){
                WeixinJSBridge.log(res.err_msg);
                if(res.err_msg=='get_brand_wcpay_request:ok'){
                    this.$toast('支付成功');
                    window.location.href = 'http://wk.cadhx.com/#/levelup';
                    // window.location='/index.php/index/order/index';
                }
            }
        );
    },
    callpay(paySign){
        const _this=this;
        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', _this.jsApiCall, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', _this.jsApiCall);
                document.attachEvent('onWeixinJSBridgeReady', _this.jsApiCall);
            }
        }else{
            this.jsApiCall(paySign);
        }
    },
    levUp(){
        const _this=this;
        this.flag=false;
        this.$http({method:"post",url:"index.php/index/pay/pay",data:{id:this.userToken.id}})
            .then(
                res=>{
                    if(res.data.code=200){
                        _this.flag=true;
                       _this.callpay(res.data.data)
                    }else {
                        this.$toast(res.data.msg)
                    }
                }
            )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello{
  font-size: 0px;
  background: #fbc386;
}
.mint-header{
  background-color: #fff;
  color: #333333;
  font-size: 16px;
}

.img_box{
  img{
    width: 100%;
  }
  .button_box{
    position: relative;
    width: 100%;
    text-align: center;
    .mint-button{
      position: absolute;
      bottom: 40%;
      left: 10%;
      background:#fa4913;
      color: #fff;
      height: 3.5rem;
      font-size: 2rem;
      font-weight: bold;
      border-radius: 1.75rem;
      width: 80%
      }
  }
}
</style>
