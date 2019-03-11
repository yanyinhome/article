<template>
<div>
    <div class="item">
        <label>城市</label>
        <mt-button @click="viewd('sheng')">{{address_show.sheng}}</mt-button>
        <mt-button @click="viewd('shi')">{{address_show.shi}}</mt-button>
        <mt-button @click="viewd('qu')">{{address_show.qu}}</mt-button>
    </div>
    <div class="radio_box" v-show="view.sheng"  @click="close">
        <mt-radio
          @change="close"
          title=""
          v-model="address.sheng"
          :options="address_region">
        </mt-radio>
    </div>
    <div class="radio_box" v-show="view.shi"  @click="close">
    <mt-radio
        @change="close"
        title=""
        v-model="address.shi"
        :options="address_shi">
    </mt-radio>
    </div>
    <div class="radio_box" v-show="view.qu"  @click="close">
    <mt-radio
        @change="close"
        title=""
        v-model="address.qu"
        :options="address_qu">
    </mt-radio>
    </div>
    </div>
</template>
<script>
import address_data from './data.js'
import {mapState} from 'vuex';
export default {
  name: 'AddressChoice',
  data () {
    return {
      address:{
        sheng:"省市",
        shi:"城市",
        qu:"区县"
      },
      view:{
        sheng:false,
        shi:false,
        qu:false
      },
      address_qu:[],
      address_shi:[],
    }
  },
  computed:{
      ...mapState(['userInfo']),
    address_data:function () {
      return address_data
    },
    address_region:function () {
      let region_arry=this.address_data.map(
          (item,index)=>{
              return {label:item.n, value:item.n}
          }
      )
      region_arry.unshift({label:'省市',value:'省市'})
      return region_arry
    },
    address_show:function () {
      let addressobj={}
      const self=this;
      if(!window.sessionStorage.address){
          for(let item in this.address){
              addressobj[item]=self.address[item].slice(0,3)
          }
          return Object.assign({},addressobj)
      }else {
          this.address=Object.assign({},this.address,JSON.parse(window.sessionStorage.address));
          window.sessionStorage.removeItem('address');
          for(let item in this.address){
              addressobj[item]=self.address[item].slice(0,3)
          }
          return Object.assign({},addressobj)
      }
    }
  },
  watch:{
    address:{
      handler(val){
        this.$emit('addressToParent',val);
        const address_data=this.address_data;
        let sheng=val.sheng;
        let shi=val.shi;
        let shiArry=[];
        let quArry=[];
        let shidata=[];
        if(sheng){
          for (let item of address_data){
            if(item.n==sheng){
              shidata=item;
              shiArry=item.c.map(
                itemlist=>{
                  return itemlist.n
                }
              )
              shiArry.unshift({label:'城市',value:'城市'})
            }
          }
          this.address_shi=shiArry;
        }
        if(shi){
          for (let item of shidata.c){
            if(item.n==shi){
              quArry=item.a.map(
                itemlist=>{
                  return itemlist.n
                }
              )
              quArry.unshift({label:'区县',value:'区县'})
            }
          }
          this.address_qu=quArry;
        }
      },
      deep:true
    }
  },
  methods:{
    close(){
      this.viewd('sheng',false)
      this.viewd('shi',false)
      this.viewd('qu',false)
    },
    //地址展示,关闭事件
    viewd(val,type=true){
      if(val=="sheng" && type){
          if(this.address.shi!=="城市"){
              this.address.shi="城市"
              this.address.qu="区县"
          }
      }
      this.view[val]=type;
    }
  },
  created() {
      if(this.userInfo.city){
          this.address.sheng=this.userInfo.city.split(' ')[0]
          this.address.shi=this.userInfo.city.split(' ')[1]
          this.address.qu=this.userInfo.city.split(' ')[2]
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .item{
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    label{
      width: 36px;
      display: inline-block;
    }
    input{
      margin-left: 15px;
      outline: none;
      border: none;
      font-size: 14px;
    }
    .input{
      margin-left: 15px;
      display: inline-block;
      color: #666666;
      font-size: 14px;
      width: 240px;
      background: url('../../assets/img/go.png') no-repeat right/18px 18px;
    }
    .mint-button{
      width: 4.3rem;
      height: 27px;
      font-size: 12px;
      color: #666666;
      padding:0 1rem 0 0;
      margin-right: 3px;
      background: url('../../assets/img/drop_down.png') no-repeat 47px/18px 18px;
    }
  }
  //三级联动
.radio_box{
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
    height: 70%;
    overflow: auto;
  }
}
</style>
