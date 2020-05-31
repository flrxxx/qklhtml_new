<template>
  <div class="login">
    <div class="header">
      <div class="icon_left" @click="back()">
        <!-- <img src="../../assets/public_back.png" alt="icon"/> -->
      </div>
      <div class="text_con"></div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="logo">
        <img src="../../assets/public_logo.png" />
      </div>
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
        <div class="phone" style="margin-top: 29px;">
          <div class="images">
            <img src="../../assets/login_pwd.png"/>
          </div>
          <div class="text">密码</div>
        </div>
        <div class="phone_num">
          <input type="password" placeholder="密码由字母和数字组成(6-18位)" v-model="password"/>
        </div>
        <div class="reg">
          <span @click="register()">注册账号</span>
          <span style="width: 1px; height: 14px; background: rgba(151, 151, 151, 1);"></span>
          <span @click="password_jump()">忘记密码</span>
          <span style="width: 1px; height: 14px; background: rgba(151, 151, 151, 1);"></span>
          <span @click="appUrl()">下载APP</span>
        </div>
      </div>
      <div class="submit" @click="submit()">登录</div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'login',
  data () {
    return {
      phone: '',
      password: ''
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
    password_jump () {
      this.$router.push({
        path: `/password`
      })
    },
    appUrl () {
      window.location.href = 'https://qkkj.qkipfs.com/download/'
    },
    submit () {
      if (this.phone && this.password) {
        this.$post('/user/login', {phone: this.phone, password: this.password})
          .then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            // 存入cookie：
            if (res.data) {
              Cookies.set('token', res.data.user.user_token)
              this.$router.push({
                path: `/index`
              })
            }
          })
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
.login{
  width: 100%;
  min-height: 100vh;
  background: url('../../assets/login_bg.png') no-repeat;
  background-size: 100% 100%;
  background-color: rgba(1, 16, 29, 1);
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
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(0,0,0,0.85);
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
    // margin-top: 20px;
    .logo{
      width: 174px;
      margin: 0 auto;
      img{
        width: 100%;
        display: block;
      }
    }
    .login_from{
      width: 90%;
      height: 260px;
      margin-top: 43px;
      margin-left: 5%;
      background: url('../../assets/login_rect.png') no-repeat;
      background-size: 100% 100%;
      padding: 39px 27px;
      box-sizing: border-box;
      .phone{
        width: 100%;
        height: 26px;
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
          font-size:18px;
          font-weight:500;
          color:rgba(0,210,214,1);
        }
      }
      .phone_num{
        width: 100%;
        height: 30px;
        border-bottom: 1px solid rgba(0, 210, 214, 1);
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
      .reg{
        width: 100%;
        text-align: center;
        height:20px;
        font-size:12px;
        font-weight:400;
        color:rgba(0,210,214,1);
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
      background:rgba(0,210,214,1);
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
