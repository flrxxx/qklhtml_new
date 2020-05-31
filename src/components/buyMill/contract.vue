<template>
  <div class="contract">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">买家协议</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="images">
        <img src="../../assets/ccpo.jpg" alt="合同"/>
      </div>
      <!-- <div class="images">
        <img src="../../assets/2.jpg" alt="合同"/>
      </div>
      <div class="images">
        <img src="../../assets/3.jpg" alt="合同"/>
      </div>
      <div class="images">
        <img src="../../assets/4.jpg" alt="合同"/>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'contract',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    back () {
      this.$router.go(-1)
      // if (res.status === 0) {
      //   this.$message({
      //     message: res.msg,
      //     type: 'success'
      //   })
      //   this.init()
      // } else {
      //   this.$message({
      //     message: res.msg,
      //     type: 'error'
      //   })
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.contract{
  width: 100%;
  min-height: 100vh;
  min-height: 100vh;
  background-color: #01101D;
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(3, 26, 46, 1);
    padding: 0 16px;
    box-sizing: border-box;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .icon_left{
      width: 11px;
      height: 22px;
      img{
        width: 100%;
        display: block;
      }
    }
    .text_con{
      font-size:16px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255, 255, 255, 1);
     }
    .icon_right{
      width: 22px;
      height: 22px;
      img{
        width: 100%;
        display: block;
      }
    }
  }
  .content{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 10px;
    .images{
      width: 100%;
      img{
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
