<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapState,mapActions} from  'vuex'
export default {
  name: 'App',
  computed:{
      ...mapState(['userToken','userInfo']),
  },
  methods:{
      ...mapActions(['setuserToken']),
      getUsrInfo(userToken){
          this.$http({method:"post",url:'/index.php/index/common/get_user_info',data:userToken}).
          then((res)=>{
              if(res.data.code==200){
                  const userData=res.data.data;
                  this.$store.dispatch('setUserInfo',userData);
                  window.localStorage.userInfo=JSON.stringify(userData);
                  //返回之前的页面
                  if(window.localStorage.nowurl){
                      let oldpath=window.localStorage.nowurl.toString().split("#");
                      if(oldpath[1].split("?").length>=2){
                          let path=oldpath[1].split("?")[0]
                          let ar_id=oldpath[1].split("?")[1].split("=")[1]
                          this.$router.push({path:path,query:{ar_id:ar_id}})
                      }
                      if(oldpath[1].split("?").length<2){
                          let path=oldpath[1].split("?")[0]
                          this.$router.push({path:path})
                      }
                      window.localStorage.removeItem('nowurl');
                  }
              }
          })
      }
  },
  created(){
      //判断用户名信息是否存在，如果存在就跳出，不存在就判断user_token是否存在
      console.log(this.$route.query,"appvue")
      if(this.userInfo.user_name){
          console.log("用户信息已存在")
          return
          }else {
              //如果用户的usertoken存在，直接请求用户信息，如果不存在，跳转到后台服务器获取
              if(JSON.stringify(this.userToken)=="{}"){
                    // 如果是后台返回的链接，获取信息进行访问，如果不是，跳转到后台链接
                  if(!this.$route.query.us_token){
                      let nowUrl=decodeURIComponent(window.location.href);
                      window.localStorage.nowurl=nowUrl;
                      window.location.assign('http://wkht.cadhx.com/index.php/index/home/auto_login')
                      return
                      }else {
                          const userToken=this.$route.query;
                          console.log(userToken,'woshiuserToken')
                          if(userToken.us_token){
                              //储存usertoken
                              this.setuserToken(userToken);
                              window.localStorage.userToken=JSON.stringify(userToken);
                              //请求用户信息
                              this.getUsrInfo(this.userToken)
                          }
                  }
              }else {
                  this.getUsrInfo(this.userToken)
                }
      }
      /*if(this.userToken){
          return
      }else {
          window.localStorage.currentUrl=window.location.href;
          window.location.assign('http://wkht.cadhx.com/index.php/index/home/auto_login')
      }*/


    /*  this.$toast(
       {
        message: "操作成功", //提示内容分
        position: "bottom", //提示框位置
        duration: 5000 , //持续时间（毫秒），若为 -1 则不会自动关闭
        iconClass: 'fa fa-plug' , //icon 图标的类名
        className:"addClass"  //Toast 的类名。可以为其添加样式
        }
      ) */
     //this.$toast("123");
     //this.$confirm(res.data.msg, options)
     //this.$alert(res.data.msg);
     /* this.$messagebox.prompt('请输入密码', {
          inputValidator: (val) => {
              if (val === null) {
                  return true;//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
              }
              return !(val.length < 6 || val.length > 8)
          }, inputErrorMessage: '密码长度必须在6~8位'
      }).then((val) => {
          console.info('confirm,value is' + val.value)
      }, () => {
          console.info('cancel')
      })*/
      }
}
</script>

<style lang='scss'>
@import '../src/assets/css/base.css';
#app {
  font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .mint-header{
    background-color: #fff;
    color: #333333;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
  }
}
</style>
