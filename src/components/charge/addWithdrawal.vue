<template>
  <div class="addWithdrawal">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">添加地址</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="back_cv">
        <div class="leuoj">地址信息</div>
        <div class="pasfm">
          <div class="pasfm1">地址标题</div>
          <input type="number" placeholder="如：张三的地址" class="ipt">
        </div>
        <div class="pasfm">
          <div class="pasfm1">提现地址</div>
          <input type="number" placeholder="请输入提现地址" class="ipt">
        </div>
      </div>
      <div class="submit">添加提现地址</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addWithdrawal',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.addWithdrawal{
  width: 100%;
  min-height: 100vh;
  min-height: 100vh;
  background-color: rgba(16,16,16,1);
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(26, 26, 26, 1);
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
    .back_cv{
      width:100%;
      background:rgba(26, 26, 26, 1);
      border-radius:4px;
      padding: 5px 17px;
      margin-bottom: 10px;
      box-sizing: border-box;
      .leuoj{
        width: 100%;
        height:20px;
        font-size:14px;
        font-weight:500;
        color:rgba(0, 209, 255, 1);
        line-height:20px;
        padding-left: 8px;
        border-left: 3px solid rgba(0, 209, 255, 1);
        text-align: left;
        box-sizing: border-box;
        margin-bottom: 20px;
      }
      .pasfm{
        width: 100%;
        height:40px;
        border-radius:4px;
        border:1px solid rgba(0, 209, 255, 1);
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .pasfm1{
          height:40px;
          line-height: 40px;
          background:rgba(0, 209, 255, 1);
          padding: 0 20px;
          border-radius: 4px 0px 0px 4px;
          font-size:14px;
          font-weight:400;
          color:rgba(255,255,255,1);
          white-space: nowrap;
        }
        .ipt{
          flex: 1;
          border: none;
          background-color: rgba(0, 210, 214, 0);
          outline: none;
          line-height: 40px;
          color: rgba(0, 210, 214, 0.5);
          font-size:14px;
          font-weight:400;
          max-width: 100%;
          text-indent: 1em;
        }
      }
    }
    .submit{
      width:90%;
      height:45px;
      background:rgba(0,210,214,1);
      background: -moz-linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,160,255,1) 100%);
      background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(0,243,255,1)), color-stop(100%,rgba(0,160,255,1)));
      background: -webkit-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      background: -o-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      background: -ms-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      background: linear-gradient(135deg,rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      border-radius:23px;
      margin-left: 5%;
      margin-top: 300px;
      text-align: center;
      line-height: 45px;
      font-size:18px;
      font-weight:400;
      color:rgba(255,255,255, 1);
    }
  }
}
</style>
