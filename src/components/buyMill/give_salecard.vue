<template>
  <div class="sale_card">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">转赠优惠券</div>
      <div class="icon_right"></div>
    </div>
    <div class="card_list">
      <div class="back_cv">
        <div class="leuoj">基本信息</div>
        <div class="pasfm">
          <div class="pasfm1">&nbsp;&nbsp;手机号&nbsp;</div>
          <input type="text" placeholder="请输入被转赠人的手机号" class="ipt" id="idcard" v-model="phone">
        </div>
        <div class="cflp">
          <div class="pasfm" style="flex: 1;margin-bottom: 0">
            <div class="pasfm1">&nbsp;&nbsp;验证码&nbsp;</div>
            <input type="number" placeholder="请输入验证码" class="ipt" v-model="phone_code" >
          </div>
          <div class="sub_code" @click="getcodenow()" v-if="yhsi">获取验证码</div>
          <div v-if="!yhsi" class="sub_code">{{ getCode1 }} s后获取</div>
        </div>
      </div>
    </div>
    <div class="submitbox">
      <div class="submit" @click="submit()">确定转赠</div>
    </div>
    <business ref="business" @submitpassword="submitpassword"></business>
    <loading ref="loading"></loading>
  </div>
</template>

<script>
  import business from "../parts/business.vue";
  import loading from '../parts/loading.vue';
    export default {
      name: "give_salecard",
      components:{business,loading},
      data(){
          return {
            failnum:true,
            getCode: '获取验证码',
            getCode1: '60',
            yhsi: true,
            codesend: true,
            phone:'',
            myphone:'',
            phone_code:'',
            cash_coupon_id:'',
            trade_pwd:'',
            cash_coupon:''
          }
      },
      mounted () {
        if(this.$route.params.id){
          this.cash_coupon_id = this.$route.params.id;
        }else{
          this.$message({
            message: '未找到对应的优惠券',
            type: 'error'
          })
          this.$router.push({
            name:'sale_cardpage'
          })
        }
        this.init();
      },
      methods:{
        back () {
          this.$router.go(-1)
        },
        init(){
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
              this.myphone = res.data.user[0].user.phone
            })
        },
        getcodenow(){
          if(this.codesend){
            this.codesend = false;
            this.$post('/user/sendCode', {phone: this.myphone})
              .then(res => {
                this.codesend = true;
                if (res.status === 10001) {
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
                this.codesend = true;
              })
          }
        },
        submit(){
          if(this.phone == ''){
            this.error('请输入转赠人的手机号');
            return false
          }
          if(this.phone_code == ''){
            this.error('请输入转赠人的手机号');
            return false
          }
          if(this.cash_coupon_id == ''){
            this.$message({
              message: '未找到优惠券,请重新选择',
              type: 'error'
            })
            this.$router.push({
              name:'sale_cardpage'
            })
          }
          this.$refs.business.businessshow();
        },
        error(msg){
          this.$message({
            message: msg,
            type: 'error'
          })
        },
        submitpassword(value){
          this.$refs.loading.loadingshow();
          this.$post('/coupon/transfer',{phone: this.phone, cash_coupon_id: this.cash_coupon_id, phone_code: this.phone_code, trade_pwd: value,cash_coupon:''})
            .then(res => {
              this.$refs.loading.loadinghide();
              if (res.status === 10001) {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
                this.$router.push({
                  path: `/`
                })
              }else{
                if(res.status == 0){
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  })
                  this.$router.push({
                    name:'sale_cardpage'
                  })
                }else{
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  })
                }
              }
            })
        }
      }

    }
</script>

<style scoped lang="scss">
  .sale_card{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    overflow: hidden;
    .scroll_page{
      position: absolute;
      top:2.2rem;
      bottom:0;
      left: 0;
      right: 0;
      overflow-y: auto;
    }
  }
  .header{
    height: 2.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(26,26,26, 1);
    padding: 0 0.8rem;
    box-sizing: border-box;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .icon_left{
      width: 0.55rem;
      height: 1.1rem;
      img{
        width: 100%;
        display: block;
      }
    }
    .text_con{
      font-size:0.8rem;
      font-weight:400;
      color:rgba(255, 255, 255, 1);
    }
    .icon_right{
      width:1.1rem;
      height: 1.1rem;
      img{
        width: 100%;
        display: block;
      }
    }
  }
  .card_list{
    position: absolute;
    top:2.2rem;
    bottom:2.5rem;
    left: 0px;
    right: 0px;
    overflow-y: auto;
    background-color: rgba(16, 16, 16, 1);
    box-sizing: border-box;
    padding: 0.75rem 0.5rem 0;
    .back_cv{
      width:100%;
      background:rgba(26, 26, 26, 1);
      border-radius:4px;
      padding: 5px 17px;
      margin-bottom: 10px;
      box-sizing: border-box;
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
        color:rgba(0, 209, 255, 1);
        line-height:20px;
        padding-left: 8px;
        border-left: 3px solid rgba(0, 209, 255, 1);
        text-align: left;
        box-sizing: border-box;
        margin-bottom: 20px;
      }
      .pasfm{
        width: 100%;
        height:40px;
        border-radius:4px;
        border:1px solid rgba(0, 209, 255, 1);
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        position: relative;
        .rightarrow{
          position: absolute;
          right:0.5rem;
          width: 0.7rem;
          height: .45rem;
          top:50%;
          margin-top: -0.225rem;
          img{
            display: block;
            width: 100%;
          }
        }
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
          background-color: rgba(0, 210, 214, 0);
          outline: none;
          line-height: 40px;
          color: rgba(255,255,255,1);
          font-size:14px;
          font-weight:400;
          max-width: 100%;
          width: 100%;
          text-indent: 1em;
        }
      }
      .zjpicbox{
        display: block;
        border:1px solid rgba(0, 209, 255, 1);
        width: 8rem;
        margin: 0 auto;
        border-radius: 0.25rem;
        overflow: hidden;
        position: relative;
        margin-bottom: 1rem;
        .zjpictext{
          padding: 1rem 0;
          background-color:rgba(0, 209, 255, 1) ;
          color:#fff;
          text-align: center;
          width: 3.5rem;
        }
        .uploadpic_info{
          position: absolute;
          left: 3.5rem;
          right: 0;
          top:0;
          bottom:0;
          padding-top: 1rem;
          .uploadpic_icon{
            width: 1.5rem;
            margin: 0 auto;
            img{
              width: 100%;
            }
          }
          .uploadpic_text{
            font-size: 0.6rem;
            color:rgba(255,255,255,0.8);
          }
        }
        .uploadpic{
          opacity: 0;
          position: absolute;
          top:0;
          left: 0;
        }
      }
    }
  }
  .submitbox{
    position: absolute;
    bottom:0;
    left: 0;
    right: 0;
    height: 2.5rem;
    padding-top: 0.15rem;
    box-sizing: border-box;
    background-color: rgba(26,26,26,1);
    .submit{
      width: 90%;
      margin: 0 auto;
      height:2.2rem;
      line-height: 2.2rem;
      background: rgba(0,243,255,1);
      background: -moz-linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,160,255,1) 100%);
      background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(0,243,255,1)), color-stop(100%,rgba(0,160,255,1)));
      background: -webkit-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      background: -o-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      background: -ms-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      background: linear-gradient(135deg,rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
      border-radius:23px;
      font-size:18px;
      font-weight:400;
      color:#fff;
    }
  }

</style>
