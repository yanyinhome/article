<template>
  <div class="hello">
    <mt-header title="完善您的名片">
      <span @click="goback" slot="left">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="img_upload_box">
      <div class="center_auto">
        <div class="base_bg change_photo">
          <img @click="openinput('photo_input')"  :src="userInfo.head_img" alt="">
          <div class="change_box">
              <label for="user_photo">修改头像</label>
              <input ref="photo_input" type="file" accept="image/png,image/gif,image/jpeg" @change="change(0,$event)" v-show="false" name="user_photo" id="user_photo">
          </div>
        </div>
        <div class="base_bg change_erweim">
          <img @click="openinput('code_input')" v-show="userInfo.qrcode"  :src="userInfo.qrcode" alt="">
          <div class="change_box">
            <label for="qr_code">上传二维码</label>
            <input ref="code_input" type="file" accept="image/png,image/gif,image/jpeg" @change="change(1,$event)" v-show="false" name="qr_code" id="qr_code">
          </div>
          <div @click="toqd()" class="bottom_info">
            如何获取二维码
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="card_edit_box">
      <div class="item">
        <label for="username">姓名*</label><input type="text" id="username" v-model="carSubmit.user_name" :placeholder="userInfo.user_name">
      </div>
      <div class="item">
        <label for="tel">电话*</label><input type="text" id="tel"  v-model="carSubmit.phone" :placeholder="userInfo.phone?userInfo.phone:'请输入您的电话'">
      </div>
      <div class="item">
        <!--<label for="role">品牌</label><span id="role" class="input" @click="toBrand();saveCardSubmit()">阳光保险</span>-->
        <label for="role">品牌</label><span id="role" class="input">阳光保险</span>
      </div>
      <AddressChoice :address="address" @addressToParent="getAddress"></AddressChoice>
    </div>
    <div class="save_box">
      <p>完善名片，让客户主动找你买保险</p>
      <mt-button :disabled="buttonVal" @click="Submit()">保存，并同步到所有保险文章</mt-button>
    </div>
    <BottomCopyright></BottomCopyright>
   <BottomNav></BottomNav>
  </div>
</template>

<script>
import BottomCopyright from '../publicComponents/BottomCopyright'
import AddressChoice from '../publicComponents/AddressChoice'
import {mapState,mapActions} from 'vuex'
import axios from "axios"
export default {
  name: 'PersonalMessage',
  data () {
    return {
      buttonVal:false,
      address: {
        sheng:"省份",
        shi:"城市",
        qu:"区县"
      },
      view: {
        sheng:false,
        shi:false,
        qu:false
      },
      address_qu: [],
      address_shi: [],
      headerImage: '',
      carSubmit:{
          user_name:"",
          phone:"",
          city:'',
          brand:"",
          job:"",
          brand_name:''
      },
      imgurl:null
    }
  },
  computed:{
    ...mapState(['userInfo',"userToken"]),
    address_data: function () {
      return address_data
    },
    address_region:function () {
      return this.address_data.map(
        (item, index) => {
          return item.n
        }
      )
    },
    address_show: function () {
      let addressobj = {}
      const self = this
      for (let item in this.address) {
        addressobj[item]=self.address[item].slice(0,3)
      }
      return Object.assign({},addressobj)
    }
  },
  components:{
    BottomCopyright,
    AddressChoice
  },
  created(){
      //进入时显示之前的地址
      if(this.userInfo.city){
          this.address.sheng=this.userInfo.city.split(' ')[0]
          this.address.shi=this.userInfo.city.split(' ')[1]
          this.address.qu=this.userInfo.city.split(' ')[2]
      }
      //初始化电话号码
      if(this.userInfo.phone){
          this.carSubmit.phone=this.userInfo.phone;
      }
      //如果当前做过更改，显示当前的地址
      if( window.sessionStorage.address){
          this.address= JSON.parse(window.sessionStorage.address);
      }
      //初始化保险品牌和保险id
      if(this.userInfo.brand_name){
          this.carSubmit.brand_name=this.userInfo.brand_name;
          this.carSubmit.brand=this.userInfo.brand;
      }
      //如果跳转了保险品牌选择页面，回来后重新从缓存生成
      if(window.sessionStorage.carSubmit){
          this.carSubmit=JSON.parse(window.sessionStorage.carSubmit)
      }
      //如果从其他页面带过来的保险信息，则覆盖当前的信息
      if(this.$route.query.brand_name){
          console.log("baoxian",this.$route.query)
          this.carSubmit.brand=this.$route.query.brand
          this.carSubmit.brand_name=this.$route.query.brand_name
      }

  },
  mounted(){
      this.imgurl=this.userInfo.head_img
  },
  methods:{
      ...mapActions(['setUserInfo']),
    toqd(){
        this.$router.push({path:'/articledetails',query:{ar_id:10}})
    },
   /* toBrand(){
        this.$router.push('/personalziliao')
    },
    saveCardSubmit(){
          window.sessionStorage.carSubmit=JSON.stringify(this.carSubmit);
          window.sessionStorage.address=JSON.stringify(this.address);
    },*/
    Submit(){
          const _this=this;
          if(!this.carSubmit.user_name){
              this.carSubmit.user_name=this.userInfo.user_name
          }
              this.carSubmit.brand="1";
          if(!this.carSubmit.phone){
              this.$toast("请输入电话号码")
              return
          }else {
              if(!/^1[34578]\d{9}$/.test(this.carSubmit.phone)){
                  this.$toast('号码不正确')
                  return
              }
          }
        if(this.address.sheng=="省市"||this.address.shi=="城市"||this.address.qu=="区县"){
            this.$toast("请选择完整的地址")
            return;
        }else {
            this.carSubmit.city=`${this.address.sheng} ${this.address.shi} ${this.address.qu}`
        }
        console.log(Object.assign({},this.carSubmit,this.userToken))
        this.buttonVal=true;
        this.$http({method:'post',url:"/index.php/index/user/save_user_info",data:Object.assign({},this.carSubmit,this.userToken)})
            .then(res=>{
                if(res.data.code==200){
                    this.buttonVal=false;
                    this.$toast(res.data.msg)
                    this.$http({method:'post',url:"/index.php/index/user/get_user_info",data:_this.userToken})
                        .then(res=>{
                            console.log(res)
                            if(res.data.code==200){
                                this.setUserInfo(res.data.data);
                            }else {
                                this.$toast(res.data.msg)
                            }
                        })
                }else {
                    this.$toast(res.data.msg)
                }
            })
    },
    goback () {
      this.$router.go(-1);
    },
    openinput (ref) {
        // 点击图片代理input点击
        this.$refs[ref].dispatchEvent(new MouseEvent('click'))
    },
    close(){
      this.viewd('sheng',false)
      this.viewd('shi',false)
      this.viewd('qu',false)
    },
    //地址展示关闭事件
    viewd(val,type=true){
      this.view[val]=type;
    },
    getAddress(data){
      this.address=Object.assign({},this.address,data)
    },
    //上传头像事件
    change(type,e){
      const _this=this;
      let file=e.target.files[0];
        console.log(e.target)
      let param=new FormData()//创建form对象
      param.append("img",file);
      param.append("us_token",this.userToken.us_token);
      param.append("id",this.userToken.id);
      //添加请求头
       /* this.$http({method:"post",url:"/index.php/index/common/douploads",headers:"headers:{'Content-Type':'multipart/form-data'}",param})
            .then(res=>{console.log(res)})*/
        axios.post("http://wkht.cadhx.com/index.php/index/common/douploads",param,{headers:{'Content-Type':'multipart/form-data'}})
          .then(res=>{
             if(res.data.code=="200"){
                 const imgurl=res.data.data.imgurl;
                 const img_id=res.data.data.img_id;
                 return {imgurl:imgurl,qrcode:img_id}
             }else {
                 this.$toast(res.data.msg)
             }
          }).then(data=>{
                  if(type==0){
                      _this.$http({method:'post',url:'/index.php/index/user/save_head',data:Object.assign({},_this.userToken,{head_img:data.qrcode})})
                          .then(res=>{
                              if(res.data.code=='200'){
                                  console.log(res)
                                  this.setUserInfo({head_img:data.imgurl})
                              }else {
                                  this.$toast(res.data.msg)
                              }
                          })
                  }
                  if(type==1){
                      _this.$http({method:'post',url:'/index.php/index/user/save_qrcode',data:Object.assign({},_this.userToken,{qrcode:data.qrcode})})
                          .then(res=>{
                              if(res.data.code=='200'){
                                  this.setUserInfo({qrcode:data.imgurl})
                              }else {
                                  this.$toast(res.data.msg)
                              }
                          })
                  }
                  return
              })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.img_upload_box{
  box-sizing: border-box;
  min-height: 200px;
  text-align: center;
    .center_auto{
      padding-top: 20px;
      display: inline-block;
      .change_erweim{
        background: url('../../assets/img/erweima_bg.png') no-repeat center/49px auto;
      }
      .base_bg{
        position: relative;
        width: 132px;
        height: 132px;;
        background-color: #ededed;
        display: inline-block;
        box-sizing: border-box;
        .change_box{
          position: absolute;
          bottom: 0px;
          background: #FD6739;
          height: 35px;
          z-index: 999;
          width: 100%;
          box-sizing: border-box;
          color: #ffffff;
          font-size: 16px;
          line-height: 35px;
          label{
            z-index: 99999;
          }
        }
        .bottom_info{
          color: #FA4913;
          position: absolute;
          text-align: center;
          bottom: -20px;
          font-size: 12px;
          box-sizing: border-box;
          width: 100%;
        }
      }
    .change_photo{
      margin-right: 1.1rem;
      img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .change_erweim{
      img{
        position: absolute;
        top: 0;
        right:0 ;
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }

  }

}
.line{
  background: #F8F8F8;
  height: 10px;
}
.card_edit_box{
  margin: 0 auto;
  height: 15rem;
  background: url('../../assets/img/personal_card.png') no-repeat center center/100% 100%;
  box-sizing: border-box;
  padding:50px 25px 0;
  .item{
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    label{
      width: 36px;
      display: inline-block;
    }
    input{
      margin-left: 0.9rem;
      outline: none;
      border: none;
      font-size: 0.9rem;
    }
    .input{
      margin-left: 0.9rem;
      display: inline-block;
      color: #666666;
      font-size: 0.9rem;
      width: calc(100% - 36px - 0.9rem);
      /*<!--background: url('../../assets/img/go.png') no-repeat right/18px 18px;-->*/
    }
    .mint-button{
      width: 4.3rem;
      height: 27px;
      font-size: 12px;
      color: #666666;
      padding:0 20px 0 0;
      margin-right: 3px;
      background: url('../../assets/img/drop_down.png') no-repeat 47px/18px 18px;
    }
  }
}
.save_box{
  text-align: center;
  p{
    color: #EAB200;
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 12px;
  }
  .mint-button{
    background: #EFC541;
    height: 36px;
    width: 280px;
    box-sizing: border-box;
    border-radius: 18px;
    color: #ffffff;
    font-size: 14px;
  }
}
//三级联动
/* .radio_box{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top:0px;
  background: rgba(0, 0, 0, 0.5);
  padding:50px 20px 0;
  z-index: 9999;
  box-sizing: border-box;
  .mint-radiolist-title{
      font-size: 16px;
      display: block;
      color: #333;
      background-color: #fff;
      text-align: center;
      height: 35px;
      line-height: 35px;
      font-weight: 600;
  }
  .mint-radiolist{
    height: 500px;
    overflow: auto;
  }
} */
</style>
