<template>
  <div class="register">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">用户注册</div>
      <div class="icon_right" @click="back()">
        登录
      </div>
    </div>
    <div class="content">
      <div class="login_from">
        <div class="phone">
          <div class="images">
            <img src="../../assets/login_phone.png" alt="icon"/>
          </div>
          <div class="text">手机号</div>
        </div>
        <div class="phone_num">
          <input type="number" placeholder="请输入手机号" v-model="phone" @blur="verify()"/>
        </div>
        <div class="phone">
          <div class="images">
            <img src="../../assets/login_invite2.png" alt="icon"/>
          </div>
          <div class="text">手机验证码</div>
        </div>
        <div class="code">
          <input type="number" placeholder="请输入手机验证码" v-model="phone_code"/>
          <div class="sub_code" @click="code()" v-if="yhsi">获取验证码</div>
          <div v-if="!yhsi" class="sub_code">{{ getCode1 }} s后获取</div>
          <!-- <div class="sub_code" @click="code()">获取验证码</div> -->
        </div>
        <div class="phone">
          <div class="images">
            <img src="../../assets/login_pwd.png" alt="icon"/>
          </div>
          <div class="text">密码</div>
        </div>
        <div class="phone_num">
          <input type="password" placeholder="密码由字母和数字组成(6-18位)" v-model="password"/>
        </div>
        <div class="phone">
          <div class="images">
            <img src="../../assets/login_pwd.png" alt="icon"/>
          </div>
          <div class="text">确认密码</div>
        </div>
        <div class="phone_num">
          <input type="password" placeholder="请再次输入密码" v-model="repassword"/>
        </div>
        <div class="phone">
          <div class="images">
            <img src="../../assets/login_pwd.png" alt="icon"/>
          </div>
          <div class="text">交易密码</div>
        </div>
        <div class="phone_num">
          <input type="number" placeholder="交易密码由6位数字组成" v-model="trade_pwd" class="num_disc" @blur="ert_six()"/>
        </div>
        <div class="phone">
          <div class="images">
            <img src="../../assets/login_pwd.png" alt="icon"/>
          </div>
          <div class="text">确认交易密码</div>
        </div>
        <div class="phone_num">
          <input type="number" class="num_disc" placeholder="请再次输入交易密码" v-model="retrade_pwd" />
        </div>
        <div class="phone">
          <div class="images">
            <img src="../../assets/login_name.png" alt="icon"/>
          </div>
          <div class="text">姓名</div>
        </div>
        <div class="phone_num">
          <input type="text" placeholder="请输入您的姓名" v-model="name"/>
        </div>
        <div class="phone">
          <div class="images">
            <img src="../../assets/login_invite.png" alt="icon"/>
          </div>
          <div class="text">邀请码</div>
        </div>
        <div class="phone_num" v-if="!fop">
          <input type="text" placeholder="请输入对方UID" v-model="invite_phone"/>
        </div>
        <div class="phone_num" v-if="fop">
          <input type="text" placeholder="请输入对方UID" v-model="invite_phone" readonly/>
        </div>
      </div>
      <div class="submit" @click="submit">注册</div>
    </div>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers'
import Cookies from 'js-cookie'
export default {
  name: 'register',
  data () {
    return {
      getCode: '获取验证码',
      yhsi: true,
      getCode1: '60',
      phone: '',
      phone_code: '',
      password: '',
      repassword: '',
      trade_pwd: '',
      retrade_pwd: '',
      name: '',
      invite_phone: '',
      fop: false
    }
  },
  mounted () {
    let pkloi = this.$route.query.phone
    this.invite_phone = this.$route.query.phone
    if (pkloi) {
      this.fop = true
    }
  },
  methods: {
    back () {
      this.$router.push({
        path: `/`
      })
    },
    ert_six () {
      if (this.trade_pwd.length !== 6) {
        this.$message({
          message: '交易密码必须是6位',
          type: 'success'
        })
        this.trade_pwd = ''
      }
    },
    verify () {
      if (this.phone.legth > 0) {
        this.$post('/check/phone/' + this.phone)
          .then(res => {
            if (res === 0) {
              this.$message({
                message: '手机号已被注册',
                type: 'success'
              })
              this.phone = ''
            }
          })
      }
    },
    code () {
      let mobileReg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (mobileReg.test(this.phone)) {
        this.yhsi = false
        this.$post('/user/sendCode', {phone: this.phone})
          .then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
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
          })
          .catch(err => {
            console.log(err)
            this.yhsi = true
            // this.$message({
            //   message: err.datile,
            //   type: 'error'
            // })
          })
      } else {
        this.$message({
          message: '手机号错误',
          type: 'warning'
        })
      }
    },
    submit () {
      if (this.phone && this.phone_code && this.password && this.repassword && this.trade_pwd && this.retrade_pwd && this.name) {
        if (this.password === this.repassword) {
          if (this.trade_pwd === this.retrade_pwd) {
            if (this.repassword !== this.trade_pwd) {
              if (this.invite_phone) {
                this.$post('/user/sign',
                  {
                    phone: this.phone,
                    phone_code: this.phone_code,
                    password: this.password,
                    repassword: this.repassword,
                    trade_pwd: this.trade_pwd,
                    retrade_pwd: this.retrade_pwd,
                    name: this.name,
                    invite_phone: this.invite_phone
                  })
                  .then(res => {
                    this.$message({
                      message: res.msg,
                      type: 'success'
                    })
                    // 存入cookie：
                    if (res.data) {
                      Cookies.set('token', res.data.user.user_token)
                      // this.$router.push({
                      //   path: `/`
                      // })
                      window.location.href = 'https://qkkj.qkipfs.com/download/'
                      this.$message({
                        message: res.msg,
                        type: 'success'
                      })
                    }
                    // console.log(res.data.user.user_token)
                  })
                  // .catch(err => {
                  //   this.$message({
                  //     message: err.msg,
                  //     type: 'error'
                  //   })
                  // })
              } else {
                this.$message({
                  message: '请输入对方UID',
                  type: 'warning'
                })
              }
            } else {
              this.$message({
                message: '密码和交易密码不能一致',
                type: 'warning'
              })
            }
          } else {
            this.$message({
              message: '两次交易密码不一致',
              type: 'warning'
            })
          }
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
.register{
  width: 100%;
  min-height: 100vh;
  background: url('../../assets/login_bg.png') no-repeat;
  background-size: 100% 100%;
  background-color: rgba(16, 16, 16, 1);
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #ffffff;
    padding: 0 16px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
      font-weight:400;
      color:rgba(255,255,255,1);
     }
    .icon_right{
      width: 22px;
      height: 22px;
      white-space: nowrap;
      font-size: 14px;
      color: #fff;
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
    padding-bottom: 30px;
    // margin-top: 20px;
    .login_from{
      width: 90%;
      min-height: 550px;
      margin-top: 10px;
      margin-left: 5%;
      background: url('../../assets/login_reg_rect.png') no-repeat;
      background-size: 100% 100%;
      padding: 39px 27px;
      box-sizing: border-box;
      .phone{
        width: 100%;
        height: 20px;
        display: flex;
        align-items: center;
        .images{
          width: 20px;
          margin-right: 5px;
          img{
            width: 100%;
            display: block;
          }
        }
        .text{
          font-size:14px;
          font-weight:500;
          color:rgba(0, 209, 255, 1);
        }
      }
      .phone_num{
        width: 100%;
        height: 30px;
        border-bottom: 1px solid rgba(0, 209, 255, 1);
        margin-bottom: 10px;
        input{
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-size:14px;
          font-weight:400;
          color:rgba(255,255,255,1);
          border: none;
          background: none;
          outline: none;
          text-indent: 5px;
        }
        .num_disc{
          -webkit-text-security:disc;
        }
      }
      .code{
        width: 100%;
        height: 30px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        input{
          flex: 1;
          height: 30px;
          line-height: 30px;
          font-size:14px;
          font-weight:400;
          color:rgba(255,255,255,1);
          border: none;
          border-bottom: 1px solid rgba(0, 209, 255, 1);
          background: none;
          outline: none;
          text-indent: 5px;
          max-width: calc(100% - 70px);
        }
        .sub_code{
          height:26px;
          padding: 0 10px;
          line-height: 26px;
          border-radius:23px;

          text-align: center;
          font-size:12px;
          font-weight:400;
          color:rgba(255,255,255,1);
          background:rgba(0,243,255,1);
          background: -moz-linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,160,255,1) 100%);
          background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(0,243,255,1)), color-stop(100%,rgba(0,160,255,1)));
          background: -webkit-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
          background: -o-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
          background: -ms-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
          background: linear-gradient(135deg,rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
          white-space: nowrap;
        }
      }
      .reg{
        width: 100%;
        text-align: center;
        height:20px;
        font-size:12px;
        font-weight:400;
        color:rgba(0, 209, 255, 1);
        line-height:20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 18px;
        span{
          display: inline-block;
          margin-right: 8px;
        }
      }
    }
    .submit{
      width:80%;
      height:45px;
      background:rgba(0,243,255,1);
      background: -moz-linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,160,255,1) 100%);
      background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(0,243,255,1)), color-stop(100%,rgba(0,160,255,1)));
      background: -webkit-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      background: -o-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      background: -ms-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      background: linear-gradient(135deg,rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      border-radius:23px;
      margin-left: 10%;
      margin-top: 40px;
      font-size:18px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:45px;
    }
  }
}
</style>
