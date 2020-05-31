<template>
  <div class="share">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">二维码分享</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="logo">
        <img src="../../assets/public_logo.png" />
      </div>
      <!-- <div class="name">{{ name }}</div> -->
      <div class="invita">邀请码：{{ phone }}</div>
      <div class="qr">
        <img :src="qrcodeUrl" alt="二维码" />
      </div>
      <div class="state">长按此页面或截图保存到手机</div>
      <div class="state">发给朋友即可完成注册</div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'share',
  data () {
    return {
      phone: '',
      password: '',
      qrcodeUrl: '',
      qwe: '',
      name: ''
    }
  },
  mounted () {
    this.$post('/user/get/phone')
      .then(res => {
        if (res.status === 10001) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.$router.push({
            path: `/`
          })
        }
        this.phone = res.data.user[0].UID
        this.name = res.data.user[0].user.name
        let dion = window.location.host
        this.qwe = 'https://' + dion + '/register?phone=' + this.phone // 正式服
        // this.qwe = 'http://' + dion + '/register?phone=' + this.phone // 测试服
        // this.qwe = 'https://qkkj.qkipfs.com/register?phone=13600010020'
        this.ewm()
      })
  },
  filters: {
    // *号省略
    hideHokl (val) {
      if (val.length > 0 && val.length <= 1) {
        return val
      } else if (val.length > 1 && val.length <= 2) {
        return `${val.substring(0, 1)}*`
      } else if (val.length > 2) {
        return `${val.substring(0, 1)}*${val.substring(val.length - 1)}`
      }
      // if (val) {
      //   return `${val.substring(0, 1)}*${val.substring(val.length - 3)}`
      // }
    }
  },
  methods: {
    ewm () {
      let self = this
      QRCode.toDataURL(
        this.qwe,
        // { errorCorrectionLevel: 'H', version: 1 },
        function (err, url) {
          if (!err) {
            self.qrcodeUrl = url
            // console.log(self.qwe)
          }
        }
      )
    },
    back () {
      this.$router.go(-1)
    },
    register () {
      this.$router.push({
        path: `/register`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.share{
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
    // margin-top: 20px;
    .logo{
      width: 174px;
      margin: 30px auto;
      img{
        width: 100%;
        display: block;
      }
    }
    .name{
      width:70%;
      max-width: 500px;
      margin: 0 auto;
      margin-bottom: 8px;
      height:25px;
      font-size:18px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:25px;
      text-align: left;
    }
    .invita{
      width:70%;
      text-align: left;
      max-width: 500px;
      margin: 0 auto;
      margin-bottom: 8px;
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:20px;
    }
    .qr{
      width: 70%;
      max-width: 500px;
      margin: 0 auto;
      margin-bottom: 40px;
      img{
        width: 100%;
      }
    }
    .state{
      width:70%;
      margin-left: 15%;
      height:25px;
      font-size:18px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:25px;
      img{
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
