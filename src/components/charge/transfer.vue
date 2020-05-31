<template>
  <div class="transfer">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">转账</div>
      <div class="icon_right" @click="record()">
        记录
      </div>
    </div>
    <div class="content">
      <div class="back_cv">
        <div class="leuoj">转账信息</div>
        <div class="pasfm">
          <div class="pasfm1">&nbsp;&nbsp;手机号&nbsp;</div>
          <input type="number" placeholder="请输入被转入人的手机号" class="ipt" v-model="phone" @blur="transfer()">
        </div>
        <div class="pasfm">
          <div class="pasfm1">转账数量</div>
          <input type="number" placeholder="请输入转账数量" class="ipt" v-model="number">
        </div>
        <div class="pasfm">
          <div class="pasfm1">交易密码</div>
          <input type="password" placeholder="请输入交易密码" class="ipt" v-model="password">
        </div>
      </div>
      <div class="title">
        <div class="leuoj">转账须知</div>
        1.请认真核对被转入的手机号码。<br/>
        2.最小转账数额为20 USDT。<br/>
        3.账户与账户之间互转USDT无手续费。<br/>
        4.提交转账订单后，系统将自动审核，审核无误后，将自动到账
      </div>
      <div class="submit" @click="submit()">确定转账</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'transfer',
  data () {
    return {
      phone: '',
      number: '',
      password: '',
      unit: '',
      phone_my: ''
    }
  },
  mounted () {
    this.unit = this.$route.params.unit
    this.init()
  },
  methods: {
    init () {
      // 初始化
      this.$post('/user/get/phone')
        .then(res => {
          this.phone_my = res.data.user[0].user.phone
          if (res.status === 10001) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({
              path: `/`
            })
          }
        })
    },
    back () {
      this.$router.go(-1)
    },
    transfer () {
      if (this.phone.length === 11) {
        let mobileReg = /^1(3|4|5|6|7|8|9)\d{9}$/
        if (mobileReg.test(this.phone)) {
          this.$post('/user/phone/transfer', {phone: this.phone})
            .then(res => {
              if (res.data[0]) {
                this.$message({
                  message: '转给' + res.data[0].UID,
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '未查到该用户',
                  type: 'warning'
                })
                // this.phone = ''
              }
            })
        } else {
          this.$message({
            message: '手机号错误',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '手机号错误',
          type: 'warning'
        })
      }
    },
    record () {
      // let unit = this.unit
      this.$router.push({
        path: `/record/3/${this.unit}`
      })
    },
    submit () {
      if (this.phone !== this.phone_my) {
        if (this.phone && this.number) {
          this.$post('/user/transfer', {phone: this.phone, num: this.number, trade_pwd: this.password, unit: this.unit})
            .then(res => {
              if (res.status === 0) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                this.$router.go(-1)
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              }
            })
        } else {
          this.$message({
            message: '请输入完整',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '不可以给自己转账',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.transfer{
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
      color:rgba(255, 255, 255, 1);
    }
  }
  .content{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 10px;
    .back_cv{
      width:100%;
      background:rgba(3,26,46,1);
      border-radius:4px;
      padding: 5px 17px;
      margin-bottom: 10px;
      box-sizing: border-box;
      .leuoj{
        width: 100%;
        height:20px;
        font-size:14px;
        font-weight:500;
        color:rgba(0,210,214,1);
        line-height:20px;
        padding-left: 8px;
        border-left: 3px solid rgba(0,210,214,0.8);
        text-align: left;
        box-sizing: border-box;
        margin-bottom: 20px;
      }
      .pasfm{
        width: 100%;
        height:40px;
        border-radius:4px;
        border:1px solid rgba(0,210,214,0.8);
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .pasfm1{
          height:40px;
          line-height: 40px;
          background:rgba(0,210,214,0.8);
          padding: 0 20px;
          border-radius: 4px 0px 0px 4px;
          font-size:14px;
          font-weight:400;
          color:rgba(1,16,29,1);
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
    .title{
      background:rgba(3,26,46,1);
      width:100%;
      text-align: left;
      font-size:12px;
      font-weight:400;
      color:rgba(0, 210, 214, 1);
      line-height:17px;
      margin-bottom: 10px;
      padding: 8px 15px;
      box-sizing: border-box;
      .leuoj{
        width: 100%;
        height:20px;
        font-size:14px;
        font-weight:500;
        color:rgba(0,210,214,1);
        line-height:20px;
        padding-left: 8px;
        border-left: 3px solid rgba(0,210,214,0.8);
        text-align: left;
        box-sizing: border-box;
        margin-bottom: 10px;
      }
    }
    .submit{
      width:90%;
      height:45px;
      background:rgba(0,210,214,0.8);
      border-radius:23px;
      margin-left: 5%;
      margin-top: 50px;
      text-align: center;
      line-height: 45px;
      font-size:18px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(1, 16, 29, 1);
    }
  }
}
</style>
