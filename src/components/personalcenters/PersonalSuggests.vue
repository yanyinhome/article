<template>
  <div class="hello">
    <mt-header title="意见反馈">
      <span @click="goback" slot="left">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>
    <div class="suggest_box">
      <div class="input_text"><input @focus="clearp($event)" @blur="getp($event)" type="text" placeholder="标题:" v-model="suggests.title"></div>
      <div class="input_text"><input @focus="clearp($event)" @blur="getp($event)" type="text" placeholder="联系方式:" v-model="suggests.phone"></div>
      <div class="input_textarea"><textarea rows="5" cols="20" placeholder="请描述你的问题" v-model="suggests.question" ></textarea></div>
      <mt-button class="upload" @click="submit_suggest()">确认提交</mt-button>
    </div>
    <BottomCopyright></BottomCopyright>
   <BottomNav></BottomNav>
  </div>
</template>

<script>
import BottomCopyright from '../publicComponents/BottomCopyright';
import {mapState}  from 'vuex'
export default {
  name: 'PersonalSuggests',
  data () {
    return {
      suggests:{
        title:"",
        phone:"",
        question:''
      }
    }
  },
  components:{
    BottomCopyright
  },
  computed:{
    ...mapState(["userToken"])
  },
  methods:{
    goback(){
      this.$router.go(-1);
    },
    clearp(e){
        event.target.placeholder=""
    },
    getp(e){
      event.target.placeholder="标题:"
    },
      submit_suggest(){
        if(!this.suggests.title){
            this.$toast('标题不能为空！')
            return;
        }
        if(!this.suggests.phone){
            this.$toast('电话不能为空！')
            return;
        }
        if(!this.suggests.question){
            this.$toast('描述不能为空！')
            return;
        }
        this.$http({method:'post',url:"/index.php/index/user/send_message",data:Object.assign({},this.userToken,this.suggests)})
            .then(
                res=>{
                    if(res.data.code==200){
                        this.$toast("提交成功")
                        this.suggests.question=""
                        this.suggests.title=""
                        this.suggests.phone=""
                    }else {
                        this.$toast(res.data.msg)
                    }
                }
            )
      }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .hello{
    background: #f9f9f9;
    .suggest_box{
      padding: 15px;
      box-sizing: border-box;
      font-size: 14px;
      color: #333333;
      margin-bottom: 210px;
      input{
        outline: none;
        border: none;
        width: 100%;
        box-sizing: border-box;
        padding-left: 10px;
        line-height: 40px;
        height: 40px;
        margin-bottom: 15px;
      }
      textarea{
        outline: none;
        border: none;
        width: 100%;
        box-sizing: border-box;
        line-height: 1.5em;
        padding-left: 10px;
      }
      .upload{
        height: 35px;
        margin: 25px auto 0;
        background: #FA4913;
        line-height: 35px;
        width: 100%;
        text-align: center;
        box-sizing: border-box;
        color: #ffffff;
        font-size: 14px;
        letter-spacing: 10px;
      }
    }
  }
</style>
