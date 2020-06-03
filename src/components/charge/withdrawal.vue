<template>
  <div class="withdrawal">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">提现</div>
      <div class="icon_right" @click="record()">
        记录
      </div>
    </div>
    <div class="content">
      <div class="back_cv">
        <div class="leuoj" style="margin-bottom: 0;">提现地址</div>
        <div class="dizi" @click="address()">
          <div class="dizi_detail">
            <div>{{ addresstitle }}</div>
            <div>{{addressinfo}}</div>
          </div>
          <div class="more">
            <img src="../../assets/address_right.png"/>
          </div>
        </div>
      </div>
      <div class="back_cv">
        <div class="leuoj">提现信息</div>
        <div class="pasfm">
          <div class="pasfm1">提现数量</div>
          <input type="number" placeholder="请输入提现数量" class="ipt" v-model="number" >
        </div>
        <div class="cflp">
          <div class="pasfm" style="flex: 1;margin-bottom: 0">
            <div class="pasfm1">&nbsp;&nbsp;验证码&nbsp;</div>
            <input type="number" placeholder="请输入验证码" class="ipt" v-model="hio">
          </div>
          <div class="sub_code" @click="code()" v-if="yhsi">获取验证码</div>
          <div v-if="!yhsi" class="sub_code">{{ getCode1 }} s后获取</div>
        </div>
      </div>
      <div class="title">
        <div class="leuoj">提现须知</div>
        1.最小提现数量为{{forward_min}} {{unit}}，最大提币数量{{once_max}} {{unit}}。<br/>
        2.提现每笔手续费为提现数额的{{forward_fee}}，每天最多提币次数{{daily_times_max}}次<br/>
        4.为保障提现顺利，请您认真填写并核对提现地址。<br/>
        5.提交提现订单后，系统将自动审核，审核无误后，提取的{{unit}}将自动存入您填写的提现地址中。
      </div>
    </div>
    <div class="btn" @click="submit()">确定提现</div>
    <diolog :diologinfo="diolog"></diolog>
  </div>
</template>

<script>
  import diolog from '../parts/diolog.vue';
export default {
  name: 'withdrawal',
  components:{diolog},
  data () {
    return {
      getCode: '获取验证码',
      yhsi: true,
      codesend: true,
      getCode1: '60',
      number: '123',
      hio: '',
      phone: '',
      cuty_id: '',
      addresstitle: '暂无地址',
      addressinfo: '点击前往添加一个地址',
      forward_min: '-',
      unit: '',
      once_max: '-',
      forward_fee: '',
      daily_times_max: '',
      diolog: {
        show: false,
        title: "提示",
        text: "",
        btn: [{
          text: "确定",
          callback: function () {}
        }],
      }
    }
  },
  mounted () {
    this.cuty_id = this.$route.params.id // 地址id
    if (this.cuty_id === 1) {
      this.dfg = ''
    }
    this.unit = this.$route.params.unit
    this.init()
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    record () {
      this.$router.push({
        path: `/record/2/${this.unit}`
      })
    },
    address () {
      this.$router.push({
        path: `/withdrawalAddress/${this.unit}`
      })
    },
    init () {
      var that = this
      this.$post('/coin/tibi/info',{unit:that.unit})
        .then(res => {
          that.forward_min = res.data[0].forward_min
          that.once_max = res.data[0].once_max
          that.forward_fee = res.data[0].forward_fee
          that.daily_times_max = res.data[0].daily_times_max
        })
      this.$post('/user/get/phone')
        .then(res => {
          this.phone = res.data.user[0].user.phone
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
    code () {
      if(this.codesend){
        this.codesend = false;
        this.$post('/user/sendCode', {phone: this.phone})
          .then(res => {
            if(res.status == 0){
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.yhsi = false
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
                    this.codesend = true;
                    clearInterval(TIME_COUNT)
                  }
                }, 1000)
              }
            }else{
              this.diolog.text = res.msg;
              this.diolog.show = true;
              this.diolog.btn[0].callback = () => this.diolog.show = false
              this.yhsi = true
              this.codesend = true;
            }
          })
          .catch(err => {
            console.log(err)
            this.yhsi = true
          })
      }
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
.withdrawal{
  width: 100%;
  min-height: 100vh;
  min-height: 100vh;
  background:rgba(16,16,16,1);
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
      background:rgba(26, 26, 26, 1);
      border-radius:4px;
      padding: 5px 17px;
      margin-bottom: 10px;
      box-sizing: border-box;
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
        color:rgba(0, 209, 255, 1);
        line-height:22px;
        padding: 0 10px;
        box-sizing: border-box;
      }
    }
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
    .dizi{
      width: 100%;
      height:64px;
      border-radius:5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .dizi_detail{
        flex: 1;
        text-align: left;
        div:nth-child(1){
          height:22px;
          font-size:16px;
          font-weight:500;
          color:rgba(255,255,255, 1);
          line-height:22px;
          margin-bottom: 3px;
        }
        div:nth-child(2){
          height:17px;
          font-size:12px;
          font-weight:400;
          color:rgba(255,255,255, 0.8);
          line-height:17px;
        }
      }
      .more{
        width: 10px;
        img{
          width: 100%;
          display: block;
        }
      }
    }
    .pasfm{
      width: 100%;
      height:40px;
      border-radius:4px;
      border:1px solid rgba(0, 209, 255, 1);
      display: flex;
      align-items: center;
      margin-bottom: 10px;
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
        background-color: rgba(0,209,255, 0);
        outline: none;
        line-height: 40px;
        color: rgba(0,209,255, 0.5);
        font-size:14px;
        font-weight:400;
        max-width: 100%;
      }
    }
    .skidj{
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(0,209,255, 1);
      line-height:20px;
      text-align: left;
      margin-bottom: 10px;
    }
    .title{
      background:rgba(26, 26, 26, 1);
      width:100%;
      text-align: left;
      font-size:12px;
      font-weight:400;
      color:rgba(255,255,255, 1);
      line-height:24px;
      margin-bottom: 10px;
      padding: 8px 15px;
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
    }
    .coin_wallet{
      width:100%;
      height:40px;
      border-radius:4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      div:nth-child(1){
        font-size:16px;
        font-weight:400;
        color:rgba(0,209,255, 0.8);
        flex: 1;
        overflow: hidden;
      }
      div:nth-child(2){
        font-size:14px;
        font-weight:400;
        color:rgba(0,142,187,1);
        cursor: pointer;
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
      }
    }
    .number{
      width: 100%;
      text-align: left;
      margin-bottom: 10px;
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(0,209,255, 1);
      line-height:20px;
    }
    .giun{
      width: 100px;
      margin: 10px auto;
      img{
        width: 100%;
        display: block;
      }
    }
    .text_bs{
      width: 100%;
      height:40px;
      line-height: 40px;
      border-radius:4px;
      border:1px solid rgba(0,0,0,0.1);
      padding-right: 8px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      input{
        width: 70%;
        border: none;
        outline: none;
        text-indent: 1em;
        font-size: 14px;
      }
      span{
        font-size:12px;
        font-weight:400;
        color:rgba(0,0,0,0.5);
      }
    }
    .avatar-uploader{
      width:100px;
      img{
        width: 100%;
        display: block;
      }
    }
  }
  .ipt{
    outline: none;
    width: 100%;
    text-indent: 1em;
    height:40px;
    line-height: 40px;
    border-radius:4px;
    border:1px solid rgba(0,0,0,0.1);
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,0.7);
  }
  .btn{
    width:90%;
    height:45px;
    background:rgba(0,209,255,0.8);
    background: -moz-linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,160,255,1) 100%);
    background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(0,243,255,1)), color-stop(100%,rgba(0,160,255,1)));
    background: -webkit-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
    background: -o-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
    background: -ms-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
    background: linear-gradient(135deg,rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
    border-radius:23px;
    margin-left: 5%;
    margin-top: 70px;
    text-align: center;
    line-height: 45px;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255, 1);
  }
}
</style>
