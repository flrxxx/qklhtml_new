<template>
  <div class="reward">
    <div class="header">
      <div class="icon_left" @click="back()">
        <img src="../../assets/public_back.png" alt="icon"/>
      </div>
      <div class="text_con">达标奖励</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="scroll_dom">
      <div class="content">
      <!-- <div class="title">
        <div class="leuoj">奖励说明</div>
        1、此地址为USDT的充值地址,可以重复充值，如地址更改，我们将以官方公告的形式通知<br>
        2、充值需要平台进行确认，确认无误后，您的USDT会自动充值到您的账户中<br>
        3、每次充值都会生成一个交易ID单号，由您使用的转账平台客服查询获取<br>
        4、交易凭证处请上传交易页面USDT转账截图
      </div> -->
      <div class="sjh" v-for="(item, index) in list" :key="index">
        <div class="my_team">{{ item.msg }}</div>
        <div class="team_num">
          <div style="margin-bottom: 15px; width: 100%;">
          <div class="num" >
            <div class="num_1">团队1 <font>{{ item.satisfy - item.standard[0].sum_buy > 0 ? '剩余'+(item.satisfy - item.standard[0].sum_buy) : '已达标' }}</font></div>
            <div class="typenum">
              <div class="num_2"><div class="nowline" :style="{width: ((item.standard[0].sum_buy / item.satisfy) *100) + '%'}"></div></div>
              <div class="nowtext">{{(Math.ceil(((item.standard[0].sum_buy / item.satisfy) *10000)))/100  + '%' }}</div>
            </div>

          </div>
          <div class="num" >
            <div class="num_1">团队2 <font>{{ item.satisfy - item.standard[1].sum_buy > 0 ? '剩余'+(item.satisfy - item.standard[1].sum_buy) : '已达标' }}</font></div>
            <div class="typenum">
              <div class="num_2"><div class="nowline" :style="{width: ((item.standard[1].sum_buy / item.satisfy) *100) + '%'}"></div></div>
              <div class="nowtext">{{(Math.ceil(((item.standard[1].sum_buy / item.satisfy) *10000)))/100  + '%' }}</div>
            </div>
          </div>
          <div class="num" >
            <div class="num_1">团队3 <font>{{ item.satisfy - item.standard[2].sum_buy > 0 ? '剩余'+(item.satisfy - item.standard[2].sum_buy) : '已达标' }}</font></div>
            <div class="typenum">
              <div class="num_2"><div class="nowline" :style="{width: ((item.standard[2].sum_buy / item.satisfy) *100) + '%'}"></div></div>
              <div class="nowtext">{{(Math.ceil(((item.standard[2].sum_buy / item.satisfy) *10000)))/100  + '%' }}</div>
            </div>
          </div>
          </div>
          <div class="ylj" v-if="item.get_status == '0'">{{item.satisfy}}T达标奖励未达标</div>
          <div class="ylj1" v-if="item.get_status == '1'" @click="reward(item.id)">{{item.satisfy}}T达标奖励待领取</div>
          <div class="ylj" v-if="item.get_status == '2'">{{item.satisfy}}T达标奖励已领取</div>
        </div>
      </div>
      <!-- <div class="no_data">
        <div class="data_tbm">
          <img src="../../assets/public_nodata.png"/>
        </div>
        <div class="data_text">暂无数据</div>
      </div> -->
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reward',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$post('/get/standardSum')
        .then(res => {

          this.list = res.data

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
    back () {
      this.$router.go(-1)
    },
    reward (e) {
      this.$post('/grade/getReward', {id: e})
        .then(res => {
          if(res.status == '0'){
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.init()
          }else{
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }


        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.reward{
  width: 100%;
  position: absolute;
  top:0;
  right: 0;
  left: 0;
  bottom:0;
  background-color: rgba(16,16,16,1);
  .scroll_dom{
    position: absolute;
    top:44px;
    bottom:0px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
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
      font-family:PingFangSC-Regular,PingFang SC;
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
    .title{
      background-color: rgba(26, 26, 26, 1);
      width:100%;
      text-align: left;
      font-size:12px;
      font-weight:400;
      color:rgba(0, 210, 214, 1);
      line-height:17px;
      margin-bottom: 10px;
      padding: 8px 15px;
      box-sizing: border-box;
      .leuoj{
        width: 100%;
        height:20px;
        font-size:14px;
        font-weight:500;
        color:rgba(0,210,214,1);
        line-height:20px;
        padding-left: 8px;
        border-left: 3px solid rgba(0,210,214,0.8);
        text-align: left;
        box-sizing: border-box;
        margin-bottom: 10px;
      }
    }
    .sjh{
      width: 100%;
      background-color: rgba(26, 26, 26, 1);
      border-radius:4px;
      padding: 8px 10px;
      box-sizing: border-box;
      margin-bottom: 10px;
      .my_team{
        width:100%;
        height:22px;
        font-size:16px;
        font-weight:500;
        color:rgba(0, 209, 255, 1);
        line-height:22px;
        margin-bottom: 20px;
      }
      .my_team:after{
        content: '';
        display:block;
        width:40px;
        height:2px;
        background:rgba(0, 209, 255, 1);
        border-radius:1px;
        margin: 0 auto;
        margin-top: 3px;
      }
      .team_num{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap:wrap;
        .num{
          width:100%;
          margin-bottom: 10px;
          .num_1{
            width:100%;
            height:20px;
            font-size:14px;
            font-weight:500;
            color:rgba(0, 209, 255, 1);
            line-height:20px;
            text-align: left;
            margin-bottom:10px;
            font{
              color:#fff;
              font-size: 14px;
              margin-left: 5px;
            }
          }

          .typenum{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .num_2{
              height: 24px;
              width: 100%;
              padding: 2px;
              border:1px solid rgba(0, 209, 255, 1);
              box-sizing: border-box;
              border-radius: 5px;
              .nowline{
                width: 0%;
                transition: all 0.3s;
                height: 18px;
                background-color: rgba(0, 209, 255, 1);
                border-radius: 5px;
              }
            }
            .nowtext{
              width: 80px;
              text-align: center;
              font-size: 14px;
              color:#fff;
            }
          }
        }
        .num_active{
          width:22%;
          background:rgba(0,210,214,1);
          border:1px solid rgba(0,210,214,1);
          border-radius:4px;
          padding: 16px 0;
          .num_1{
            width:100%;
            height:20px;
            font-size:14px;
            font-weight:500;
            color:rgba(1, 16, 29, 1);
            line-height:20px;
          }
          .num_2{
            width:100%;
            height:14px;
            font-size:10px;
            font-weight:400;
            color:rgba(1, 16, 29, 1);
            line-height:14px;
          }
        }
        .ylj{
          width:80%;
          margin: 0 auto;
          height:32px;
          line-height: 32px;
          border:1px solid rgba(0, 209, 255, 1);
          font-size:14px;
          font-weight:400;
          color:rgba(255,255,255,1);
          border-radius: 32px;
          margin-bottom: 10px;
        }
        .ylj1{
          width:80%;
          margin: 0 auto;
          height:32px;
          line-height: 32px;
          border:1px solid rgba(0, 209, 255, 1);
          font-size:14px;
          font-weight:400;
          color:rgba(255,255,255,1);
          border-radius: 32px;
          margin-bottom: 10px;
          background:rgba(0,209,255,1);
          background: -moz-linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,160,255,1) 100%);
          background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,rgba(0,243,255,1)), color-stop(100%,rgba(0,160,255,1)));
          background: -webkit-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
          background: -o-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
          background: -ms-linear-gradient(135deg, rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
          background: linear-gradient(135deg,rgba(0,243,255,1) 0%,rgba(0,160,255,1) 100%);
        }
      }
    }
    .no_data{
      width: 100%;
      margin-top: 20px;
      .data_tbm{
        width: 61px;
        margin: 0 auto;
        img{
          width: 100%;
          display: block;
        }
      }
      .data_text{
        width: 100%;
        height:22px;
        font-size:16px;
        font-weight:400;
        color:rgba(0,210,214,1);
        line-height:22px;
        margin-top: 5px;
      }
    }
  }
}
</style>
