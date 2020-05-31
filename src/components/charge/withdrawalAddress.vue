<template>
  <div class="withdrawalAddress">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">提现地址</div>
      <div class="icon_right" @click="addWithdrawal()">
        <img src="../../assets/navi_add.png" alt="icon"/>
      </div>
    </div>
    <div class="content">
      <div class="dizi" @click="fucio(1)">
        <div class="dizi_detail">
          <div>132</div>
          <div>890</div>
        </div>
        <div class="more" @click.stop="degtre(1)">
          <img src="../../assets/address_delete.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'withdrawalAddress',
  data () {
    return {
      unit: ''
    }
  },
  mounted () {
    this.unit = this.$route.params.unit
    this.init()
    console.log(this.unit)
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    addWithdrawal () {
      this.$router.push({
        path: `/addWithdrawal/${this.unit}`
      })
    },
    fucio (e) {
      this.$router.push({
        name: `withdrawal`,
        params: {
          id: e
        }
      })
    },
    degtre () {
      // 删除
    },
    init () {
      this.cn_new = 'erwqerwer'
    },
    code () {
      this.yhsi = false
      this.$post('/user/sendCode', {phone: this.phone})
        .then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          if (res.status === 10001) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({
              path: `/`
            })
          }
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
          }
        })
        .catch(err => {
          console.log(err)
          this.yhsi = true
        })
    },
    submit () {
      this.$message({
        message: '请输入完整',
        type: 'error'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.withdrawalAddress{
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
    .dizi{
      width: 100%;
      min-height:60px;
      background:rgba(26, 26, 26, 1);
      border-radius:5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
      margin-bottom: 5px;
      .dizi_detail{
        flex: 1;
        text-align: left;
        div:nth-child(1){
          height:22px;
          font-size:16px;
          font-weight:500;
          color:rgba(0, 209, 255, 1);
          line-height:22px;
          margin-bottom: 3px;
        }
        div:nth-child(2){
          height:17px;
          font-size:12px;
          font-weight:400;
          color:rgba(255,255,255, 1);
          line-height:17px;
        }
      }
      .more{
        width: 20px;
        img{
          width: 100%;
          display: block;
        }
      }
    }
  }
}
</style>
