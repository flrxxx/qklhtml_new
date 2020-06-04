<template>
  <div class="chargePayPassword">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">修改支付密码</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="back_cv">
        <div class="leuoj">修改支付密码</div>
        <div class="cflp">
          <div class="pasfm" style="flex: 1;margin-bottom: 0; width: 50%;">
            <div class="pasfm1">&nbsp;&nbsp;验证码&nbsp;</div>
            <input type="number" placeholder="请输入验证码" class="ipt" v-model="phone_code">
          </div>
          <div class="sub_code" @click="code()" v-if="yhsi">获取验证码</div>
          <div v-if="!yhsi" class="sub_code">{{ getCode1 }} s后获取</div>
        </div>
        <div class="pasfm">
          <div class="pasfm1">&nbsp;&nbsp;新密码&nbsp;</div>
          <input type="number" placeholder="交易密码由6位数字组成" class="ipt num_disc" v-model="new_trade_pwd" @blur="ert_six()">
        </div>
        <div class="pasfm">
          <div class="pasfm1">重复密码</div>
          <input type="number" placeholder="请再次输入新支付密码" class="ipt num_disc" v-model="re_new_trade_pwd">
        </div>
      </div>
      <div class="submit" @click="submit()">修改支付密码</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'chargePayPassword',
  data () {
    return {
      getCode: '获取验证码',
      yhsi: true,
      getCode1: '60',
      phone: '',
      phone_code: '',
      new_trade_pwd: '',
      re_new_trade_pwd: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    init () {
      this.$post('/user/get/phone')
        .then(res => {
          this.phone = res.data.user[0].user.phone
        })
    },
    ert_six () {
      if (this.new_trade_pwd.length !== 6) {
        this.$message({
          message: '交易密码必须是6位',
          type: 'success'
        })
        this.new_trade_pwd = ''
      }
    },
    code () {
      this.yhsi = false
      this.$post('/user/sendCode', {phone: this.phone})
        .then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          if (res.status === 0) {
            let that = this
            that.telCode = 60
            var TIME_COUNT = setInterval(() => {
              if (that.telCode > 0) {
                that.yhsi = false
                that.telCode--
                that.getCode = that.telCode
                that.getCode1 = that.telCode
              } else {
                that.yhsi = true
                clearInterval(TIME_COUNT)
              }
            }, 1000)
          } else {
            this.yhsi = true
          }
        })
        .catch(err => {
          console.log(err)
          this.yhsi = true
        })
    },
    submit () {
      if (this.phone && this.phone_code && this.new_trade_pwd && this.re_new_trade_pwd) {
        if (this.new_trade_pwd === this.re_new_trade_pwd) {
          this.$post('/user/forgetTraPwd', { phone: this.phone, phone_code: this.phone_code, new_trade_pwd: this.new_trade_pwd, re_new_trade_pwd: this.re_new_trade_pwd })
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
            message: '两次密码不一致',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '请输入完整',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chargePayPassword{
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
      background-color: rgba(26, 26, 26, 1);
      border-radius:4px;
      padding: 5px 17px;
      margin-bottom: 10px;
      box-sizing: border-box;
      .leuoj{
        width: 100%;
        height:20px;
        font-size:14px;
        font-weight:500;
        color:rgba(0,209,255,1);
        line-height:20px;
        padding-left: 8px;
        border-left: 3px solid rgba(0,209,255,1);
        text-align: left;
        box-sizing: border-box;
        margin-bottom: 10px;
      }
      .pasfm{
        height:40px;
        border-radius:4px;
        border:1px solid rgba(0,210,214,0.8);
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .pasfm1{
          height:40px;
          line-height: 40px;
          background:rgba(0,209,255,1);
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
          color: rgba(255,255,255,1);
          font-size:14px;
          font-weight:400;
          max-width: 100%;
          text-indent: 1em;
        }
        .num_disc{
          -webkit-text-security:disc;
        }
      }
      .cflp{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        .sub_code{
          height:22px;
          font-size:16px;
          font-weight:500;
          color:rgba(0,209,255,1);
          line-height:22px;
          padding: 0 10px;
          box-sizing: border-box;
          white-space: nowrap;
          min-width: 100px;
        }
      }
    }
    .submit{
      width:90%;
      height:45px;
      background:rgba(0,209,255,1);
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
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
  }
}
</style>
