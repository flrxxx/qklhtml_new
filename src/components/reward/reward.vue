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
          <div class="num" :class="item.num > 0 ? 'num_active' : ''">
            <div class="num_1">团队1</div>
            <div class="num_2">{{ item.num > 0 ? '已达标' : '未达标' }}</div>
          </div>
          <div class="num" :class="item.num > 1 ? 'num_active' : ''">
            <div class="num_1">团队2</div>
            <div class="num_2">{{ item.num > 1 ? '已达标' : '未达标' }}</div>
          </div>
          <div class="num" :class="item.num > 2 ? 'num_active' : ''">
            <div class="num_1">团队3</div>
            <div class="num_2">{{ item.num > 2 ? '已达标' : '未达标' }}</div>
          </div>
          <div class="ylj" v-if="item.get_status == '0'">未达标</div>
          <div class="ylj1" v-if="item.get_status == '1'" @click="reward(item.id)">待领取</div>
          <div class="ylj" v-if="item.get_status == '2'">已领取</div>
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
      this.$post('/grade/standardList')
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
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.init()
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.reward{
  width: 100%;
  min-height: 100vh;
  min-height: 100vh;
  background-color: #01101D;
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(3, 26, 46, 1);
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
      background:rgba(3,26,46,1);
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
      background:rgba(3,26,46,1);
      border-radius:4px;
      padding: 8px 22px;
      box-sizing: border-box;
      margin-bottom: 10px;
      .my_team{
        width:100%;
        height:22px;
        font-size:16px;
        font-weight:500;
        color:rgba(0,210,214,1);
        line-height:22px;
        margin-bottom: 20px;
      }
      .my_team:after{
        content: '';
        display:block;
        width:40px;
        height:2px;
        background:rgba(0,210,214,0.8);
        border-radius:1px;
        margin: 0 auto;
        margin-top: 3px;
      }
      .team_num{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .num{
          width:22%;
          border-radius:4px;
          border:1px solid rgba(0,210,214,1);
          padding: 16px 0;
          .num_1{
            width:100%;
            height:20px;
            font-size:14px;
            font-weight:500;
            color:rgba(0, 210, 214, 1);
            line-height:20px;
          }
          .num_2{
            width:100%;
            height:14px;
            font-size:10px;
            font-weight:400;
            color:rgba(0, 210, 214, 1);
            line-height:14px;
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
          width:22%;
          height:45px;
          line-height: 45px;
          border-radius:4px;
          border:1px solid rgba(0,210,214,1);
          font-size:14px;
          font-weight:400;
          color:rgba(0,210,214,1);
        }
        .ylj1{
          width:22%;
          height:45px;
          line-height: 45px;
          border-radius:4px;
          border:1px solid rgba(0,210,214,1);
          font-size:14px;
          font-weight:400;
          color:rgba(1, 16, 29, 1);
          background:rgba(0,210,214,1);
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
