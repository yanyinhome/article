
<template>
    <div class="card_box">
        <div class="left">
            <img src="../../assets/img/card_photo.png" alt="">
            <p class="usename">归零</p>
            <p class="small">我是您身边专业的保险人</p>
            <p class="normal">保险让生活更美好</p>
        </div>
        <div class="right">
            <h3>买保险，请放心找我</h3>
            <p><span class="card_tel"></span>手机号码:{{vipstate?'135****':userInfo.phone}}</p>
            <p><span class="card_name"></span>姓名:{{vipstate?userInfo.user_name.slice(0,1)+'***':userInfo.user_name.slice(0,8)}}</p>
            <img v-lazy=userInfo.qrcode alt="">
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import data from "./data";
export default {
  name: 'Card',
  data () {
    return {
    }
  },
  computed:{
      ...mapState(["userInfo"]),
      vipstate:function () {
          if(this.userInfo.vip_time=="已过期"){
              return true
          }
          if(this.userInfo.vip_time<parseInt(new  Date().getTime()/1000)){
             return true
          }
          return false
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card_box{
    border: 1px solid #f1f1f1;
    border-radius: 8px;
    overflow: hidden;
    height: 200px;
    margin: 10px 10px 40px;
    .left{
        height: 200px;
        float: left;
        width: 40%;
        background: #EB7101;
        box-sizing: border-box;
        text-align: center;
        padding-top: 45px;
        img{
            width: 55px;
            height: 55px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
        p{
            color: #fff;
            text-align: center;
            font-size: 14px;
        }
        .small{
            font-size: 10px;
            line-height: 2em;
        }
        .normal{
            font-size: 13px;
        }
    }
    .right{
        position: relative;
        padding: 60px 0px 0px 20px;
        box-sizing: border-box;
        height: 200px;
        float: left;
        width: 60%;
        h3{
            font-size: 1rem;
            line-height: 1.5em;
        }
        p{
            font-size: 12px;
            color: #333;
            line-height: 25px;
            margin-left: -30px;
            vertical-align: middle;
            .card_tel{
                background:url('../../assets/img/card_tel.png') no-repeat center/12px 12px;
                background-color: #F0961D;
            }
            .card_name{
                background:url('../../assets/img/card_name.png') no-repeat center/12px 12px;
                background-color: #F0961D;
            }
            span{
                vertical-align: middle;
                margin-right: 10px;
                box-sizing: border-box;
                display: inline-block;
                width: 20px;
                height: 20px;
                line-height: 25px;
                border-radius: 10px;
            }
        }
      image[lazy=loading] {
        max-width:4rem;
        max-height:4rem;
        overflow: hidden;
      }
        img{
            width: 4rem;
            height: 4rem;
            position: absolute;
            right:1rem;
            bottom: 13px;
        }
    }
}
</style>
