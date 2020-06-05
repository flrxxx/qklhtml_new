<template>
  <div class="password">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">忘记密码</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="login_from">
        <div class="phone">
          <div class="images">
            <img src="../../assets/login_phone.png"/>
          </div>
          <div class="text">手机号</div>
        </div>
        <div class="phone_num">
          <input type="number" placeholder="请输入手机号" v-model="phone"/>
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
        </div>
        <div class="phone">
          <div class="images">
            <img src="../../assets/login_pwd.png"/>
          </div>
          <div class="text">新密码</div>
        </div>
        <div class="phone_num">
          <input type="password" placeholder="密码由字母和数字组成(6-18位)" v-model="new_password"/>
        </div>
        <div class="phone">
          <div class="images">
            <img src="../../assets/login_pwd.png"/>
          </div>
          <div class="text">确认新密码</div>
        </div>
        <div class="phone_num">
          <input type="password" placeholder="请输入确认新密码" v-model="re_new_password"/>
        </div>
      </div>
      <div class="submit" @click="submit()">重置密码</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'password',
  data () {
    return {
      getCode: '获取验证码',
      yhsi: true,
      getCode1: '60',
      phone: '',
      phone_code: '',
      new_password: '',
      re_new_password: ''
    }
  },
  mounted () {
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    register () {
      this.$router.push({
        path: `/register`
      })
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
      if (this.phone && this.phone_code && this.new_password && this.re_new_password) {
        if (this.new_password === this.re_new_password) {
          this.$post('/user/forgetPwd', { phone: this.phone, phone_code: this.phone_code, new_password: this.new_password, re_new_password: this.re_new_password })
            .then(res => {
              if (res.status === 0) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                this.$router.push({
                  path: `/`
                })
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
.password{
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
    margin-top: 80px;
    .login_from{
      width: 90%;
      min-height: 260px;
      margin-left: 5%;
      background: url('../../assets/login_rect.png') no-repeat;
      background-size: 100% 100%;
      padding: 20px 27px;
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
        margin-bottom: 8px;
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
          border-bottom: 1px solid rgba(0, 209, 255, 1);;
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
          white-space: nowrap;
          background:rgba(0,243,255,1);
          background: -moz-linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,160,255,1) 100%);
          background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(0,243,255,1)), color-stop(100%,rgba(0,160,255,1)));
          background: -webkit-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
          background: -o-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
          background: -ms-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
          background: linear-gradient(135deg,rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        }
      }
      .reg{
        width: 100%;
        text-align: center;
        height:20px;
        font-size:12px;
        font-weight:400;
        color:rgba(0, 209, 255, 1);;
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
      margin-top: 85px;
      font-size:18px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:45px;
    }
  }
}
</style>
