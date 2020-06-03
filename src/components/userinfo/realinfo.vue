<template>
  <div class="outerdom">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">实名认证</div>
      <div class="icon_right"></div>
    </div>
    <div class="page_scoll">
      <div class="back_cv">
        <div class="leuoj">基本信息</div>
        <div class="pasfm">
          <div class="pasfm1">证件类型</div>
          <input type="text" readonly  class="ipt" v-model="cardtype" @click="itemselect()">
          <div class="rightarrow"><img src="../../assets/public_down.png"> </div>
        </div>
        <div class="pasfm">
          <div class="pasfm1">真实姓名</div>
          <input type="text" placeholder="请输入真实姓名" class="ipt">
        </div>
        <div class="pasfm">
          <div class="pasfm1">&nbsp;&nbsp;证件号&nbsp;</div>
          <input type="text" placeholder="请输入证件号" class="ipt">
        </div>
        <div class="cflp">
          <div class="pasfm" style="flex: 1;margin-bottom: 0">
            <div class="pasfm1">&nbsp;&nbsp;验证码&nbsp;</div>
            <input type="number" placeholder="请输入验证码" class="ipt" >
          </div>
          <div class="sub_code" @click="getcodenow()" v-if="yhsi">获取验证码</div>
          <div v-if="!yhsi" class="sub_code">{{ getCode1 }} s后获取</div>
        </div>
      </div>
      <div class="back_cv">
        <div class="leuoj">图片信息</div>
        <label class="zjpicbox" for="piczm">
          <div class="zjpictext">证件<br>正面</div>
          <input type="file" class="uploadpic" id="piczm">
          <div class="uploadpic_info">
            <div class="uploadpic_icon">
              <img src="../../assets/update_new.png">
            </div>
            <div class="uploadpic_text">上传凭证图片</div>
          </div>
        </label>
        <label class="zjpicbox" for="picbm">
          <div class="zjpictext">证件<br>背面</div>
          <input type="file" class="uploadpic" id="picbm">
          <div class="uploadpic_info">
            <div class="uploadpic_icon">
              <img src="../../assets/update_new.png">
            </div>
            <div class="uploadpic_text">上传凭证图片</div>
          </div>
        </label>
        <label class="zjpicbox" for="pichand">
          <div class="zjpictext">证件<br>手持</div>
          <input type="file" class="uploadpic" id="pichand">
          <div class="uploadpic_info">
            <div class="uploadpic_icon">
              <img src="../../assets/update_new.png">
            </div>
            <div class="uploadpic_text">上传凭证图片</div>
          </div>
        </label>
      </div>
    </div>
    <div class="footbtn">
      <div class="btn">提交审核</div>
    </div>
    <div class="selectmain" v-if="selectshow">
      <div class="selectbox">
        <div class="selectboxtitle">请选择证件类型</div>
        <div class="selectboxbody">
          <div class="selectboxbody_item" v-for="item in typelist" :key="item.id" @click="selectitem(item)">{{item.name}}</div>
        </div>
      </div>
      <div class="select_bg" @click="closeselect"></div>
    </div>

  </div>
</template>

<script>
    export default {
      name: "realinfo",
      data(){
        return {
          getCode: '获取验证码',
          yhsi: true,
          codesend: true,
          getCode1: '60',
          cardtype:"身份证",
          cardtypeid:"",
          selectshow:false,
          cardpic1:'',
          cardpic2:'',
          cardpic3:'',
          phone:'',
          typelist:[{
            id:1,
            name:'身份证'
          },{
            id:2,
            name:'驾驶证'
          }]
        }
      },
      mounted () {
        this.init()
      },
      methods:{
        init () {
          var that = this
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
              this.phone = res.data.user[0].user.phone
            })
        },
        back () {
          this.$router.back(-1)
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
        selectitem(item){
          this.cardtype = item.name
          this.cardtypeid = item.id
          this.selectshow = false
        },
        itemselect(){
          this.selectshow = true
        },
        closeselect(){
          this.selectshow = false
        }
      }
    }
</script>

<style>
  body,html{
    height: 100%;
    overflow: hidden;
    position: relative;
    font-size: 20px;
  }

  @media screen and (min-width: 320px) {
    html {font-size: 20px;}
  }

  @media screen and (min-width: 360px) {
    html {font-size: 20px;}
  }

  @media screen and (min-width: 400px) {
    html {font-size: 22px;}
  }

  @media screen and (min-width: 440px) {
    html {font-size: 24px;}
  }

  @media screen and (min-width: 480px) {
    html {font-size: 26px;}
  }

  @media screen and (min-width: 640px) {
    html {font-size: 28px;}
  }

  @media screen and (min-width: 750px) {
    html {font-size: 40px;}
  }
  #app{
    height: 100%;
    overflow: hidden;
    position: relative;
  }
</style>
<style scoped lang="scss">
  .outerdom{
    background-color: rgba(16, 16, 16, 1);
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
  }
  .header{
    height: 2.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
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
  .outerdom{
    .footbtn{
      position: absolute;
      bottom:0;
      height: 2.5rem;
      left: 0;
      right: 0;
      z-index: 5;
      padding: 0.25rem 0.75rem 0;
      box-sizing: border-box;
      .btn{
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        background:rgba(0,209,255,0.8);
        background: -moz-linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,160,255,1) 100%);
        background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(0,243,255,1)), color-stop(100%,rgba(0,160,255,1)));
        background: -webkit-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        background: -o-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        background: -ms-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        background: linear-gradient(135deg,rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        font-size: 0.7rem;
        color:#fff;
        border-radius: 0.25rem;
      }
    }
    .page_scoll{
      overflow-y: auto;
      padding: 0.75rem 0.75rem 0rem;
      top:2.2rem;
      left: 0;
      right: 0;
      bottom:2.5rem;
      z-index: 1;
      position: absolute;
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
    .selectmain{
      position: fixed;
      top:0;
      left: 0;
      right: 0;
      bottom:0;
      z-index: 100;
      .selectbox{
        position: absolute;
        width: 80%;
        left: 10%;
        top:20%;
        background-color: #1A1A1A;
        z-index: 2;
        padding:0.5rem 0.75rem;
        box-sizing: border-box;
        .selectboxtitle{
          font-size: 0.7rem;
          color:rgba(0, 209, 255, 1);
          text-align: left;
          padding-left: 0.5rem;
          position: relative;
          height: 32px;
          line-height: 32px;
          margin-bottom: 0.5rem;

          &:before{
            width: 3px;
            background-color:rgba(0, 209, 255, 1) ;
            height: 14px;
            content:"";
            position: absolute;
            left: 0;
            top:50%;
            margin-top: -7px;
          }
        }
        .selectboxbody{
          border-top:1px solid rgba(174,174,174,0.2);
          max-height: 10rem;
          overflow-y:auto;
          .selectboxbody_item{
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            color:#fff;
            font-size: 0.7rem;
            border-bottom:1px solid rgba(174,174,174,0.2)
          }
        }
      }
      .select_bg{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom:0;
        background-color: rgba(0,0,0,0.7);
        z-index: 1;
      }
    }
  }

</style>
<!--<div class="selectmain">-->
  <!--<div class="selectbox">-->
    <!--<div class="selectboxtitle">请选择证件类型</div>-->
    <!--<div class="selectboxbody">-->
      <!--<div class="selectboxbody_item">身份证</div>-->
      <!--<div class="selectboxbody_item">军官证</div>-->
      <!--<div class="selectboxbody_item">主席证</div>-->
    <!--</div>-->
  <!--</div>-->
  <!--<div class="select_bg"></div>-->
<!--</div>-->
