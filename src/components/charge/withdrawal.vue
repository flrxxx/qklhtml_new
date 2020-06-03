<template>
  <div class="withdrawal" @touchstart="touchstart($event)">
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
        <div class="dizi" @click="addresscheck()">
          <div class="dizi_detail">
            <div>{{ remark }}</div>
            <div>{{address}}</div>
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
          <div class="num_input" :class="[cash.cursorline,cash.inputtips]" :data-id="cash.id" @click="showKeyBroud(cash.id)">
            <font class="numKeyBroud_input_text" style="vertical-align: middle;">{{cash.value}}</font>
            <div class="numKeyBroud_cursor"></div>
          </div>

        </div>
        <div class="cflp">
          <div class="pasfm" style="flex: 1;margin-bottom: 0">
            <div class="pasfm1">&nbsp;&nbsp;验证码&nbsp;</div>
            <!--<input type="number" placeholder="请输入验证码" class="ipt" v-model="hio">-->
            <div class="num_input" :class="[code.cursorline,code.inputtips]" :data-id="code.id" @click="showKeyBroud(code.id)">
              <font class="numKeyBroud_input_text" style="vertical-align: middle;">{{code.value}}</font>
              <div class="numKeyBroud_cursor"></div>
            </div>
          </div>
          <div class="sub_code" @click="getcodenow()" v-if="yhsi">获取验证码</div>
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
    <KeyBrond :KeyBrondinfo="KeyBrond" ref="KeyBrond" @close="close" @checkchange="checkchange" @delval="delval" @Longdel="Longdel" @stopLongdel="stopLongdel" @emptyval="emptyval"></KeyBrond>
    <business ref="business" @submitpassword="submitpassword"></business>
    <loading ref="loading"></loading>
  </div>
</template>

<script>
  import diolog from '../parts/diolog.vue';
  import KeyBrond from "../parts/KeyBrond.vue";
  import business from "../parts/business.vue";
  import loading from '../parts/loading.vue';
export default {
  name: 'withdrawal',
  components:{KeyBrond, diolog,business,loading},
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
      remark: '暂无地址',
      address: '点击前往添加一个地址',
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
      },
      KeyBrond:{
        show:false,
        type:''
      },
      onfocus:'',
      delstill:function(){},

      cash:{
          id:'cash',
          cursorline: '',
          inputtips:'tips',
          value:'请输入提现金额'
        },
      code:{
        id:'code',
        cursorline:'',
        inputtips:'tips',
        value:'请输入验证码'
      }
    }
  },
  mounted () {
    this.cuty_id = this.$route.params.id // 地址id
    if (this.cuty_id === 1) {
      this.dfg = ''
    }
    var addressinfo = JSON.parse(window.localStorage.addressinfo);
    if(addressinfo){
      this.remark = addressinfo.remark;
      this.address = addressinfo.address;
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
    addresscheck () {
      this.$router.push({
        path: `/withdrawalAddress/${this.unit}`
      })
    },
    init () {
      var that = this
      this.$post('/coin/tibi/info',{unit:that.unit})
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
    getcodenow () {
      if(this.codesend){
        this.codesend = false;
        this.$post('/user/sendCode', {phone: this.phone})
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
            this.yhsi = true
          })
      }
    },
    submit () {
      this.phone_code = this.code.value
      this.num = parseInt(this.cash.value)
      if(this.address == ''){
        this.$message({
          message: '请选择地址',
          type: 'error'
        })
        return false
      }
      if(!this.num){
        this.$message({
          message: '请输入提现数量',
          type: 'error'
        })
        return false
      }
      if(this.num < this.forward_min){
        this.$message({
          message: '提现数量不能低于最小提现数量',
          type: 'error'
        })
        return false
      }
      if(this.num > this.once_max){
        this.$message({
          message: '提现数量不能大于最大提现数量',
          type: 'error'
        })
        return false
      }
      if(!this.phone_code){
        this.$message({
          message: '请输入验证码',
          type: 'error'
        })
        return false
      }
      this.$refs.business.businessshow();
    },
    submitpassword(value){
      this.$refs.loading.loadingshow();
      this.$post('/coin/tibi',{address:this.address,unit:this.unit,num:this.num,phone_code:this.phone_code,trade_pwd:value})
        .then(res =>{
          this.$refs.loading.loadinghide();
          if (res.status == 10001) {
            this.$message({
              message: res.msg,
              type: 'error'
            })
            this.$router.push({
              path: `/`
            })
          }
          if(res.status == 0){
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({
              path: `/record/2/${this.unit}`
            })
          }else{
            this.$refs.business.value = '';
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
    },
    touchstart(e){
      var dom = e.target;
      var father = document.getElementById('numtype');
      var inputdom = document.getElementsByClassName('oninput')[0];
      if(inputdom){
        if(dom.isSameNode(father)||father.contains(dom)|| dom.isSameNode(inputdom) || inputdom.contains(dom)){

        }else{
          if(this.onfocus){
            this[this.onfocus].cursorline = '';
          }
          this.$refs.KeyBrond.keybrondhide();
        }
      }
    },

    showKeyBroud(id){
      this[id].cursorline = 'oninput'
      this.onfocus = id;
      this[id].inputtips = '';
      var txt = id === 'code'? '请输入验证码': '请输入提现金额';
      this[id].value = this[id].value === txt ? '' : this[id].value;
      if(id === 'code'){
        this.KeyBrond.type = 'idcard'
      }else{
        this.KeyBrond.type = ''
      }
      setTimeout(()=>{
        this.$refs.KeyBrond.keybrondshow();
      },100)
    },
    close(){
      var txt = this.onfocus === 'code'? '请输入验证码': '请输入提现金额';
      this[this.onfocus].inputtips =  this[this.onfocus].value === '' ? 'tips':'';
      this[this.onfocus].value = this[this.onfocus].inputtips === 'tips' ? txt:this[this.onfocus].value;
    },
    checkchange(val){
      if(this.onfocus == 'cash'){
        if(this[this.onfocus].value.length === 0){
          if(val == '0' || val == '.'){
            return false;
          }
        }
        if(this[this.onfocus].value.indexOf('.')>0){
          if(val == '.'){
            return false;
          }
        }
      }
      this[this.onfocus].value = this[this.onfocus].value + val
    },
    delval(){
      this[this.onfocus].value = this[this.onfocus].value.substr(0,this[this.onfocus].value.length -1);
    },
    Longdel(){
      if(this[this.onfocus].value.length>0){
        this[this.onfocus].value = this[this.onfocus].value.substr(0,this[this.onfocus].value.length -1);
        this.delstill = setTimeout(()=>{
          this.Longdel()
        },50)
      }
    },
    emptyval(){
      this[this.onfocus].value='';
    },
    stopLongdel(){
      clearTimeout(this.delstill)
    },

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
      font-size: 14px;
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
        white-space: nowrap;
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
        color: #fff;
        font-size:14px;
        font-weight:400;
        max-width: 100%;
      }
      .num_input{
        flex: 1;
        border: none;
        background-color: rgba(0,209,255, 0);
        outline: none;
        line-height: 40px;
        color: #fff;
        font-size:0px;
        font-weight:400;
        max-width: 100%;
        overflow-x: auto;
        padding: 0 10px;
        &.tips .numKeyBroud_input_text{
          color:#757575;
        }
        .numKeyBroud_input_text{
          font-size: 14px;
          color:#fff;
          white-space: nowrap;
        }
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
        text-indent: 10px;
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
    text-indent: 10px;
    height:40px;
    line-height: 40px;
    border-radius:4px;
    border:1px solid rgba(0,0,0,0.1);
    font-size:14px;
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
    font-weight:400;
    color:rgba(255,255,255, 1);
  }

  .num_input{
    text-align: left;
  }

  .num_input{
    font-size: 0px;
    text-align: left;
  }
  .num_input .numKeyBroud_cursor{
    display: none;
  }
  .num_input.oninput .numKeyBroud_cursor{
    display: inline-block;
  }
  .num_input .numKeyBroud_input_text{
    font-size:14px;
  }
  .num_input.tips .numKeyBroud_input_text{
    color:#757575;
  }

  .numKeyBroud_cursor{
    width: 1px;
    height: 14px;
    display: inline-block;
    vertical-align: middle;
    background-color: #757575;
    -webkit-animation: 1s van-cursor-flicker infinite;
    animation: 1s van-cursor-flicker infinite;
  }
  @-webkit-keyframes van-cursor-flicker {
    from {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes van-cursor-flicker {
    from {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .numKeyBroud_input .numKeyBroud_cursor{
    display: none;
  }
  .numKeyBroud_input.oninput .numKeyBroud_cursor{
    display:inline-block;
  }
}
</style>
