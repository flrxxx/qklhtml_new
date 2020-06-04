<template>
  <div class="team">
    <div class="header">
      <div class="icon_left" @click="back()">
        <!-- <img src="../../assets/tupian/public_back_big.png" alt="icon"/> -->
      </div>
      <div class="text_con">团队</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="userinfo">
        <div class="name">
          <span class="name1">UID {{ name }}</span>
          <!-- <span class="name1">{{ name | hideHokl }}</span> -->
          <span class="name2" v-if="invite.grade_id == 0">矿友</span>
          <span class="name2" v-if="invite.grade">{{ invite.grade.title }}</span>
        </div>
        <div class="name" style="margin-bottom: 10px;">
          <span class="results">购买T数</span>
          <span class="results">{{ performance.own_buy }} T</span>
          <span class="results">推广业绩</span>
          <span class="results">{{ performance.kid_buy }} T</span>
        </div>
        <div class="task">距离下一等级还剩 {{ pert.num }} T</div>
        <div class="level">
          <div class="process">
            <div class="bak_ska" :style="{width: health}"></div>
          </div>
          <div class="level_num">{{ health }}</div>
        </div>
      </div>
      <div class="buy" @click="buyMill()">
        <div class="buy_img">
          <img src="../../assets/team_buy.png" />
        </div>
        <div class="buy_text">购买矿机</div>
      </div>
      <div class="list">
        <div class="list_item" @click="serv()">
          <div class="list_img">
            <img src="../../assets/team_sever.png"/>
          </div>
          <div class="list_text">客服中心</div>
        </div>
        <div class="list_item" @click="share()">
          <div class="list_img">
            <img src="../../assets/team_invite.png"/>
          </div>
          <div class="list_text">邀请码</div>
        </div>
        <div class="list_item" @click="members()">
          <div class="list_img">
            <img src="../../assets/team_mum.png"/>
          </div>
          <div class="list_text">团队成员</div>
        </div>
        <div class="list_item" @click="results()">
          <div class="list_img">
            <img src="../../assets/team_performance.png"/>
          </div>
          <div class="list_text">推广业绩</div>
        </div>
        <div class="list_item" @click="reward()">
          <div class="list_img">
            <img src="../../assets/team_reward.png"/>
          </div>
          <div class="list_text">达标奖励</div>
        </div>
        <div class="list_item" @click="myOrder()">
          <div class="list_img">
            <img src="../../assets/team_order.png"/>
          </div>
          <div class="list_text">我的订单</div>
        </div>
      </div>
    </div>
    <div style="width:100%;height:50px;"></div>
    <div class="footer">
      <div class="list"  @click="index()">
        <div class="icon">
          <img src="../../assets/tab_index.png"/>
        </div>
        <div class="text_a">首页</div>
      </div>
      <div class="list" @click="team()">
        <div class="icon">
          <img src="../../assets/tab_team_sel.png"/>
        </div>
        <div class="text_a taber_act">团队</div>
      </div>
      <div class="list" @click="mill()">
        <div class="icon">
          <img src="../../assets/tab_ming.png"/>
        </div>
        <div class="text_a">矿机</div>
      </div>
      <div class="list" @click="userinfo()">
        <div class="icon">
          <img src="../../assets/tab_mine.png"/>
        </div>
        <div class="text_a">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'team',
  data () {
    return {
      health: '',
      name: '',
      invite: {},
      performance: {},
      pert: {}
    }
  },
  mounted () {
    this.init()
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
    init () {
      this.$post('/user/get/phone')
        .then(res => {
          this.name = res.data.user[0].UID
          this.invite = res.data.user[0]
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
      this.$post('/get/performance')
        .then(res => {
          this.pert = res
          this.performance = res.data
          this.health = res.percent + '%'
        })
    },
    // back () {
    //   this.$router.go(-1)
    // },
    buyMill () {
      this.$router.push({
        path: `/buyMill`
      })
    },
    serv () {
      this.$router.push({
        path: `/serv`
      })
    },
    share () {
      this.$router.push({
        path: `/share`
      })
    },
    members () {
      this.$router.push({
        path: `/members`
      })
    },
    results () {
      this.$router.push({
        path: `/results`
      })
    },
    index () {
      this.$router.push({
        path: `/index`
      })
    },
    team () {
      this.$router.push({
        path: `/team`
      })
    },
    mill () {
      this.$router.push({
        path: `/mill`
      })
    },
    userinfo () {
      this.$router.push({
        path: `/userinfo`
      })
    },
    myOrder () {
      this.$router.push({
        path: `/myOrder/1`
      })
    },
    myAssets () {
      this.$router.push({
        path: `/myAssets`
      })
    },
    reward () {
      this.$router.push({
        path: `/reward`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.team{
  width: 100%;
  min-height: 100vh;
  background-color: rgba(16,16,16,1);
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #ffffff;
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
    padding: 0 22px;
    box-sizing: border-box;
    .userinfo{
      width: 100%;
      min-height: 140px;
      background: url('../../assets/team_user_rect.png') no-repeat;
      background-size: 100% 100%;
      padding: 10px 20px;
      box-sizing: border-box;
      .name{
        width: 100%;
        text-align: left;
        height: 30px;
        line-height: 30px;
        .name1{
          font-size:21px;
          font-weight:500;
          color:#00D1FF;
          line-height:22px;
          display: inline-block;
          margin-right: 10px;
        }
        .name2{
          border-radius:9px;
          font-size:24px;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:14px;
          display: inline-block;
          float:right;
          padding-top: 15px;
        }
        .results{
          font-size:14px;
          font-weight:400;
          color:#fff;
          display: inline-block;
          margin-right: 5px;
        }
      }
      .task{
        width:100%;
        height:14px;
        font-size:10px;
        font-weight:400;
        color:#fff;
        line-height:14px;
        text-align: left;
        margin-bottom: 5px;
      }
      .level{
        display: flex;
        align-items: center;
        .process{
          width:237px;
          height:17px;
          border:1px solid #00D1FF;
          .bak_ska{
            height:17px;
            background:#00D1FF;
          }
        }
        .level_num{
          padding: 0 8px;
          height:17px;
          font-size:12px;
          font-weight:400;
          color:#fff;
          line-height:17px;
        }
      }
    }
    .buy{
      width:100%;
      height:77px;
      background:rgba(26,26,26,1);
      border-radius:8px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 13px 0;
      .buy_img{
        width: 40px;
        margin-right: 16px;
        img{
          width: 100%;
          display: block;
        }
      }
      .buy_text{
        font-size:36px;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
    }
    .list{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-flow: wrap;
      .list_item{
        width: 30%;
        background:rgba(26,26,26,1);
        border-radius: 8px 30px 8px 8px;
        padding: 29px 0;
        margin-bottom: 15px;
        .list_img{
          width: 35px;
          margin: auto;
          img{
            width: 100%;
            display: block;
          }
        }
        .list_text{
          height:17px;
          font-size:12px;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:17px;
          margin-top: 8px;
        }
      }
    }
  }
  .footer{
    width: 100%;
    background:rgba(26,26,26,1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 49px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    .list{
      display: block;
      .icon{
        width: 25px;
        margin: auto;
        img{
          width: 100%;
          display: block;
        }
      }
      .text_a{
        margin-top: 4px;
        width:100%;
        font-size:8px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,0.6);
        line-height:11px;
      }
      .taber_act{
        color: #00D2D6;
      }
    }
  }
}
</style>
