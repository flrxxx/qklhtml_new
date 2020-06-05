<template>
    <div class="signin">
      <div class="header">
        <div class="icon_left" @click="back()">
          <img src="../../assets/public_back.png" alt="icon"/>
        </div>
        <div class="text_con">每日签到</div>
        <div class="icon_right"></div>
      </div>
      <div class="page_scoll">
        <div class="signin_head">
          <div class="signin_banner">
            <img src="../../assets/user_sign_bg.png">
          </div>
        </div>
        <div class="signin_body">
          <div class="signin_box first">
            <div class="signin_box_title">已连续签到<font>{{day}}</font>天</div>
            <div class="signin_box_text">每日可获{{dayjf}}积分，连续签到{{daycenter}}、{{fullday}}可获额外积分</div>
            <div class="signin_sizeline">
              <div class="signin_sizeline_bg"></div>
              <div class="signin_sizeline_now" v-if="day > 0 && day != daycenter && day != fullday && day < fullday">
                <div class="signin_now_bg" :style="{width: nowline +'%'}"><div class="line_icon active"></div></div>
              </div>
              <div class="signin_sizeline_center active" v-if="day >= daycenter">
                <div class="signin_sizeline_center_bg" :style="{width: centerline +'%'}"><div class="line_icon active"><div class="line_text">{{daycenter}}天</div></div></div>
              </div>
              <div class="signin_sizeline_center" v-else>
                <div class="signin_sizeline_center_bg" :style="{width: centerline +'%'}"><div class="line_icon"><div class="line_text">{{daycenter}}天</div></div></div>
              </div>

              <div class="signin_sizeline_last active" v-if="day >= fullday">
                <div class="signin_sizeline_last_bg"><div class="line_icon active"><div class="line_text">{{fullday}}天</div></div></div>
              </div>
              <div class="signin_sizeline_last " v-else>
                <div class="signin_sizeline_last_bg"><div class="line_icon"><div class="line_text">{{fullday}}天</div></div></div>
              </div>
            </div>
            <div class="qkl_btn" v-if="today" >今日已签到</div>
            <div class="qkl_btn" v-else @click="todaycheck">立即签到</div>
          </div>
          <div class="signin_box">
            <div class="signin_box_title">已获得积分<font>{{jf}}</font>分</div>
            <div class="signin_box_text">每满{{fullend}}积分，将自动获赠USDT现金券一张</div>
            <div class="signin_sizeline">
            <div class="signin_sizeline_bg"></div>
            <div class="signin_sizeline_now" v-if="jf > 0 && jf != fullend && jf < fullend">
              <div class="signin_now_bg" :style="{width: jfline +'%'}"><div class="line_icon active"></div></div>
            </div>
            <div class="signin_sizeline_last active" v-if="jf >= fullend">
              <div class="signin_sizeline_last_bg"><div class="line_icon active"><div class="line_text">{{fullend}}分</div></div></div>
            </div>
              <div class="signin_sizeline_last" v-else>
                <div class="signin_sizeline_last_bg"><div class="line_icon"><div class="line_text">{{fullend}}分</div></div></div>
              </div>
          </div>
          </div>
          <div class="signin_other_box">
            <div class="signin_box_title">本月签到记录</div>
            <div class="signin_datelist">
              <div class="signin_dateitem" v-for="item in daylist" v-bind:key="item.day" :class="item.active">
                <div class="signin_dateitembox" >
                  <div class="signin_dateitemtitle">{{item.day}}号</div>
                  <div class="signin_dateitemicon "></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <diolog :diologinfo="diolog"></diolog>
    </div>
</template>

<script>
  import diolog from '../parts/diolog.vue';
export default {
  name: 'signin',
  data () {
    return {
      day: '-',
      daynum:false,
      nowline:'-',
      centerline:'-',
      daycenter:'-',
      fullday: '-',
      dayjf: 0,
      jfline:0,
      jf:0,
      end:0,
      fullend:0,
      today:true,
      daylist: [],
      diolog:{
        show:false,
        title:"提示",
        text:"",
        btn:[{
          text:"确定",
          callback:function(){}
        }],
      },
      btnclick : true
    }
  },
  components:{diolog},
  mounted () {
    this.init()
  },
  methods: {
    init(){
      var that = this;
      this.$post('/user/signup/config').then( res => {
        this.dayjf = parseInt(res.data[0].num)
        this.daycenter = parseInt(res.data[1].days)
        this.fullday = parseInt(res.data[2].days)
        this.fullend = parseInt(res.data[3].num)
        that.centerline = that.daycenter / that.fullday * 100
        that.$post('/user/signup/info')
          .then( res => {
            that.day = parseInt(res.data.day)
            that.jf = res.data.jf
            that.today = res.data.today
            that.nowline = that.day > 0 ? that.day < that.fullday ? (that.day / that.fullday) * 100 : 100 : 0
            that.jfline = that.jf > 0 ? that.jf < that.fullend ? (that.jf / that.fullend) * 100  : 100 : 0
            var dayslength =  res.data.days.length;
            that.daylist = [];
            for(var i = 0; i < res.data.end; i++){
              var temp = {};
              temp.day = i + 1;
              if(dayslength){
                for(var j = 0; j < dayslength; j++){
                  if(parseInt(res.data.days[j]) == i+1){
                    temp.active ='active';
                    break;
                  }

                }
              }else{
                temp.active = '';
              }
              that.daylist.push(temp);
            }
          })
      })

    },
    todaycheck(){
      if(this.btnclick){
        this.btnclick = false;
        this.$post('/user/signup/in')
          .then( res => {
              this.btnclick = true
              if(res.msg){
                this.diolog.text = res.msg
                this.diolog.show = true
                this.diolog.btn[0].callback = () =>{
                  this.diolog.show = false
                  this.init();
                }
              }
            }
          )
      }
    },
    back () {
      this.$router.go(-1)
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
  .signin{
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
.signin{
  .page_scoll{
    overflow-y: auto;
    padding-bottom: 1rem;
    top:2rem;
    left: 0;
    right: 0;
    bottom:0;
    z-index: 1;
    position: absolute;
  }
  .signin_head{
    margin-top: -2rem;
    .signin_banner{

      img{
        width: 100%;
      }
    }
  }
  .signin_body{
    padding: 0 0.75rem;
    .signin_box{
      background-color: rgba(26,26,26, 1);
      padding: 0.75rem 1rem;
      border-radius: 0.25rem;
      margin-bottom: 1rem;
      &.first{
        margin-top: -2rem;
        position: relative;
        z-index: 10;
      }
      .signin_box_title{
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        color:#fff;
        margin-bottom: 0.25rem;
        font{
          color:rgba(0, 209, 255, 1);
        }
      }
      .signin_box_text{
        font-size: 0.6rem;
        text-align: center;
        color: rgba(255, 255, 255, 0.5);
        margin-bottom: 1rem;
      }
      .signin_sizeline{
        width: 100%;
        height:2rem;
        position: relative;
        .signin_sizeline_bg{
          height: 0.25rem;
          border-radius: 0.25rem;
          background-color: rgba(174, 174, 174, 1);
        }
        .signin_sizeline_now{
          position: absolute;
          top:0;
          left: 0;
          right: 0;
          z-index: 11;
          .signin_now_bg{
            height: 0.25rem;
            border-radius: 0.25rem;
            background:rgba(0,210,214,0.8);
            background: -moz-linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,160,255,1) 100%);
            background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(0,243,255,1)), color-stop(100%,rgba(0,160,255,1)));
            background: -webkit-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
            background: -o-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
            background: -ms-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
            background: linear-gradient(135deg,rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
            position: relative;
          }
        }
        .signin_sizeline_center{
          position: absolute;
          top:0;
          left: 0;
          right: 0;
          z-index: 11;
          .signin_sizeline_center_bg{
            width: 100%;
            height: 0.25rem;
            position: relative;
          }
          &.active{
            .signin_sizeline_center_bg {
              height: 0.25rem;
              border-radius: 0.25rem;
              background: rgba(0, 210, 214, 0.8);
              background: -moz-linear-gradient(135deg, rgba(0, 243, 255, 1) 0%, rgba(0, 160, 255, 1) 100%);
              background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(0, 243, 255, 1)), color-stop(100%, rgba(0, 160, 255, 1)));
              background: -webkit-linear-gradient(135deg, rgba(0, 243, 255, 1) 0%, rgba(0, 160, 255, 1) 100%);
              background: -o-linear-gradient(135deg, rgba(0, 243, 255, 1) 0%, rgba(0, 160, 255, 1) 100%);
              background: -ms-linear-gradient(135deg, rgba(0, 243, 255, 1) 0%, rgba(0, 160, 255, 1) 100%);
              background: linear-gradient(135deg, rgba(0, 243, 255, 1) 0%, rgba(0, 160, 255, 1) 100%);
              position: relative;
            }
          }
        }
        .signin_sizeline_last{
          position: absolute;
          top:0;
          left: 0;
          right: 0;
          .signin_sizeline_last_bg{
            width: 100%;
            height: 0.25rem;
            position: relative;
          }
          &.active{
            .signin_sizeline_last_bg {
              height: 0.25rem;
              border-radius: 0.25rem;
              background: rgba(0, 210, 214, 0.8);
              background: -moz-linear-gradient(135deg, rgba(0, 243, 255, 1) 0%, rgba(0, 160, 255, 1) 100%);
              background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(0, 243, 255, 1)), color-stop(100%, rgba(0, 160, 255, 1)));
              background: -webkit-linear-gradient(135deg, rgba(0, 243, 255, 1) 0%, rgba(0, 160, 255, 1) 100%);
              background: -o-linear-gradient(135deg, rgba(0, 243, 255, 1) 0%, rgba(0, 160, 255, 1) 100%);
              background: -ms-linear-gradient(135deg, rgba(0, 243, 255, 1) 0%, rgba(0, 160, 255, 1) 100%);
              background: linear-gradient(135deg, rgba(0, 243, 255, 1) 0%, rgba(0, 160, 255, 1) 100%);
              position: relative;
            }
          }
        }
        .line_icon{
          width: 0.8rem;
          height: 0.8rem;
          background-image: url('../../assets/user_sign_progress_notdid.png');
          background-size: 100% auto;
          background-repeat: no-repeat;
          position: absolute;
          right: -0.4rem;
          top: 50%;
          margin-top: -0.4rem;
          &.active{
            background-image: url('../../assets/user_sign_progress_did.png');
          }
          .line_text{
            font-size: 0.6rem;
            color: rgba(255, 255, 255, 1);
            white-space: nowrap;
            width: 3rem;
            text-align: center;
            position: absolute;
            left: 50%;
            margin-left: -1.5rem;
            top:1rem;
          }
        }
      }
      .qkl_btn{
        display: block;
        background:rgba(0,210,214,0.8);
        background: -moz-linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,160,255,1) 100%);
        background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(0,243,255,1)), color-stop(100%,rgba(0,160,255,1)));
        background: -webkit-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        background: -o-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        background: -ms-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        background: linear-gradient(135deg,rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        margin: 0 auto;
        margin-top: 0.5rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 1rem;
        font-size: 0.9rem;
        font-weight: 400;
        color: #fff;
      }
    }
    .signin_other_box{
      .signin_box_title{
        font-size: 0.7rem;
        color: #fff;
        text-align: center;
        margin-bottom: 0.5rem;
      }
      .signin_datelist{
        margin-left: -0.25rem;
        margin-right: -0.25rem;
        .signin_dateitem{
          width: 14.28%;
          padding:0 0.25rem;
          box-sizing: border-box;
          float: left;
          margin-bottom: 0.5rem;
          &.active{
            .signin_dateitembox{
              border:1px solid  rgba(0, 209, 255, 1);
              .signin_dateitemicon{
                background-image: url('../../assets/user_sign_did.png');
              }
              .signin_dateitemtitle{
                background-color:rgba(0, 209, 255, 1);
              }
            }
          }
          .signin_dateitembox{
            border:1px solid rgba(174, 174, 174, 1);
            border-radius: 0.25rem;
            overflow: hidden;
            .signin_dateitemicon{
              background-image: url('../../assets/user_sign_notdid.png');
              background-size: 50% 50%;
              background-position: 50% 50%;
              background-repeat: no-repeat;
              height: 0;
              width: 100%;
              padding-top: 100%;
            }
            .signin_dateitemtitle{
              font-size: 0.6rem;
              color: #fff;
              text-align: center;
              height: 1rem;
              line-height: 1rem;
              background-color:rgba(174, 174, 174, 1);
            }
          }
        }
        &:after{
          content:"";
          display: block;
          clear: both;
        }
      }
    }
  }
}
</style>
