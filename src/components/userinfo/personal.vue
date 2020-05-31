<template>
  <div class="earnings">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">个人信息</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="list" @click="chargePassword()">
        <div class="text">修改密码</div>
        <div class="tbm">
          <img src="../../assets/address_right.png"/>
        </div>
      </div>
      <div class="list" @click="chargePayPassword()">
        <div class="text">修改支付密码</div>
        <div class="tbm">
          <img src="../../assets/address_right.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'earnings',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    chargePassword () {
      this.$router.push({
        path: `/chargePassword`
      })
    },
    chargePayPassword () {
      this.$router.push({
        path: `/chargePayPassword`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.earnings{
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
    box-sizing: border-box;
    margin-top: 10px;
    .list{
      width: 100%;
      height: 44px;
      padding: 0 18px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background:rgba(3,26,46,1);
      .text{
        font-size:14px;
        font-weight:400;
        color:rgba(0,210,214,1);
      }
      .tbm{
        width: 7px;
        img{
          width: 100%;
          display: block;
        }
      }
    }
  }
}
</style>
