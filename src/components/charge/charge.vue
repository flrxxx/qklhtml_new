<template>
  <div class="charge">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">充值</div>
      <div class="icon_right" @click="record()">
        记录
      </div>
    </div>
    <div class="content">
      <div class="back_cv">
        <div class="leuoj" style="margin-bottom: 0;">USDT汇入地址</div>
        <div class="coin_wallet">
          <div id = "inviteCode" >{{omniAddress}}</div>
          <div @click="copyLink('1')">复制地址</div>

        </div>
        <div class="codebox" v-show="omniUrl">
          <img :src="omniUrl">
        </div>
      </div>
      <div class="back_cv">
        <div class="leuoj" style="margin-bottom: 0;">基于以太网络的ERC20地址</div>
        <div class="coin_wallet">
          <div id = "inviteCode1" >{{ERC20Address}}</div>
          <div @click="copyLink('2')">复制地址</div>
        </div>
        <div class="codebox" v-show="ERC20Url">
          <img :src="ERC20Url">
        </div>
      </div>
      <div class="back_cv">
        <div class="leuoj">充值信息</div>
        <div class="pasfm">
          <div class="pasfm1">充值数量</div>
          <input type="number" placeholder="请输入充值数量" class="ipt" v-model="num">
        </div>
        <div class="pasfm">
          <div class="pasfm1">交易ID号</div>
          <input type="text" placeholder="请输入交易ID号" class="ipt" v-model="address">
        </div>
        <div class="pasfm">
          <div class="pasfm1">交易密码</div>
          <input type="password" placeholder="请输入交易密码" class="ipt" v-model="trade_pwd">
        </div>
        <div class="pasfm">
          <div class="pasfm1">交易凭证</div>
          <!-- <button @click="qqw()">请上传</button> -->
          <input type="file" @change="addimg($event)" id="fileId" class="ipt" style="text-indent: 0em;padding-left: 1em; box-sizing: border-box;">
        </div>
      </div>
      <!-- <div class="number">交易凭证</div>
      <input type="file" @change="addimg($event)" id="fileId"> -->
      <div class="giun">
        <img :src = valueUrl  v-if="valueUrl">
      </div>
      <div class="title">
        <div class="leuoj">充值须知</div>
        1.此地址是您在区块科技中的专属充值地址，可以反复充值<br>
        2.充值需要平台进行确认，确认无误后，您USDT将会自动充值到您的账户中<br>
        3.点击本页右上角的“记录”按钮，可查询当前充值状态及充值历史记录
      </div>
    </div>
    <div class="btn" @click="submit()">提交充值凭证</div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'charge',
  data () {
    return {
      unit: '',
      omniAddress: '',
      ERC20Address:'',
      omniUrl:'',
      ERC20Url:'',
      unkdh: {
        files: []
      },
      valueUrl: '',
      img_id: '',
      num: '',
      address: '',
      trade_pwd: ''
    }
  },
  mounted () {
    this.unit = this.$route.params.unit
    this.init()
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    record () {
      this.$router.push({
        path: `/record/1/${this.unit}`
      })
    },
    init () {
      this.$post('/coin/usdt/address', {unit: this.unit})
        .then(res => {

          if (res.status === 10001) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({
              path: `/`
            })
          }else{
            this.omniAddress = res.data.omniAddress
            this.ERC20Address = res.data.ERC20Address
            this.omniUrl = res.data.omniUrl
            this.ERC20Url = res.data.ERC20Url
          }
        })
    },
    qqw () {
      this.addimg()
    },
    addimg (event) {
      console.log(event.target.files[0])
      this.unkdh.files = event.target.files[0]
      // this.unkdh.files = document.getElementById('fileId').files // 获取文件流
      this.goin = document.getElementById('fileId').files[0] // 获取文件流
      // console.log(this.unkdh.files)
      this.der = event
      let _this = this
      let files = event.target.files[0]
      if (!event || !window.FileReader) return // 看支持不支持FileReader
      let reader = new FileReader()
      reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
      reader.onloadend = function () {
        _this.valueUrl = this.result
        // _this.isShow = true
      }
      let formData = new FormData()
      formData.append('file', this.unkdh.files)
      this.$post('/image/recharge/upload', formData)
        .then(res => {
          if (res > 0) {
            this.img_id = res
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
    },
    submit () {
      if (this.num) {
        if (this.address) {
          if (this.trade_pwd) {
            if (this.img_id) {
              this.$post('/coin/recharge', {num: this.num, address: this.address, trade_pwd: this.trade_pwd, unit: this.unit, recharge_card_id: this.img_id})
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
                message: '请上传交易凭证',
                type: 'error'
              })
            }
          } else {
            this.$message({
              message: '请输入交易密码',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '请输入交易id',
            type: 'error'
          })
        }
      } else {
        this.$message({
          message: '请输入充值数量',
          type: 'error'
        })
      }
    },
    copyLink (type) {
      if(type == '1'){
        var Url2 = document.getElementById('inviteCode').innerText
      }else{
        var Url2 = document.getElementById('inviteCode1').innerText
      }

      var oInput = document.createElement('input')
      oInput.value = Url2
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      this.$message({
        showClose: true,
        message: '复制成功',
        type: 'success'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.charge{
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
      color:rgba(255, 255, 255, 1);
      font-size: 14px;
    }
  }
  .content{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 10px;
    .back_cv{
      width:100%;
      background:rgba(26,26,26,1);
      border-radius:4px;
      padding: 5px 17px;
      margin-bottom: 10px;
      box-sizing: border-box;
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
    .pasfm{
      width: 100%;
      height:40px;
      border-radius:4px;
      border:1px solid rgba(0,209,255,1);
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
        color: rgba(255, 255, 255, 1);
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
      color:rgba(0, 210, 214, 1);
      line-height:20px;
      text-align: left;
      margin-bottom: 10px;
    }
    .title{
      background:rgba(26,26,26,1);
      width:100%;
      text-align: left;
      font-size:12px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:17px;
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
        font-size:12px;
        font-weight:400;
        color:rgba(0, 210, 214, 0.8);
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
      color:rgba(0, 210, 214, 1);
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
    background:rgba(0,209,255,1);
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
    color:rgba(255,255,255,1);
    // background-color: red; /* 不支持线性的时候显示 */
    // background-image: linear-gradient(to bottom right, #00F3FF , #00A0FF);
  }
  .codebox{
    width: 30%;
    margin: 0 auto;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
