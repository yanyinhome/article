<template>
  <div class="hello">
     <div class="p_box">
        <p>关注阳光文库 | 联系我们</p>
        <p>Copyright 1996-2019 阳光文库.版权所有</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'BottomCopyright',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .p_box{
    font-size: 10px;
    color: #999;
    text-align: center;
    margin-top: 30px;
    padding-bottom: 90px;
    p{
      line-height: 1.5em;
    }
  }
</style>
