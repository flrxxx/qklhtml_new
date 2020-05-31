<template>
  <div class="userinfo">
    <div class="header">
      <div class="icon_left" @click="back()">
        <!-- <img src="../../assets/public_back.png" alt="icon"/> -->
      </div>
      <div class="text_con">个人中心</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="fuon">
        <div class="fuon1" @click="personal()">
          <div class="fun">
            <div class="fun_tbm">
              <img src="../../assets/ming_user.png"/>
            </div>
            <div class="fun_user">
              <div class="user_name">{{ name | hideHokl }}</div>
              <div class="user_phone">UID {{ phone }}</div>
            </div>
          </div>
          <div class="fun_more">
            <img src="../../assets/user_right.png"/>
          </div>
        </div>
        <div class="stati">
          <div class="botuc">
            <div v-if="asset">{{ asset.USDT ? asset.USDT : '0' | hideMiddle }}</div>
            <div v-if="!asset">0.00</div>
            <div>USDT</div>
          </div>
          <div class="botuc">
            <div v-if="asset">{{ asset.FIL ? asset.FIL : '0' | hideMiddle }}</div>
            <div v-if="!asset">0.00</div>
            <div>FIL</div>
          </div>
          <div class="botuc">
            <div>{{ hhas }}T</div>
            <div>矿机</div>
          </div>
          <div class="botuc" style="border:none;">
            <div>{{ down_xj.length }}</div>
            <div>成员</div>
          </div>
        </div>
      </div>
      <div class="notice" @click="notice()">
        <div class="notice_tbm">
          <img src="../../assets/user_notice.png"/>
        </div>
        <div>

        </div>
        <div class="notice_text" v-if="list.content" v-html="list.content"></div>
        <div class="notice_text" v-else>暂无公告</div>
      </div>
      <!-- <div class="list">
        <div class="list_item" @click="myAssets()">
          <div class="item_assets">我的资产</div>
          <div class="item_tbm">
            <img src="../../assets/user_wallet.png"/>
          </div>
        </div>
        <div class="list_item" @click="myOrder()">
          <div class="item_assets">我的订单</div>
          <div class="item_tbm">
            <img src="../../assets/user_order.png"/>
          </div>
        </div>
        <div class="list_item" @click="members()">
          <div class="item_assets">我的团队</div>
          <div class="item_tbm">
            <img src="../../assets/user_team.png"/>
          </div>
        </div>
        <div class="list_item" @click="results()">
          <div class="item_assets">我的业绩</div>
          <div class="item_tbm">
            <img src="../../assets/user_performance.png"/>
          </div>
        </div>
        <div class="list_item" @click="mill()">
          <div class="item_assets">我的矿机</div>
          <div class="item_tbm">
            <img src="../../assets/user_ming.png"/>
          </div>
        </div>
        <div class="list_item" @click="exit()">
          <div class="item_assets">退出登录</div>
          <div class="item_tbm">
            <img src="../../assets/user_logout.png"/>
          </div>
        </div>
      </div> -->
      <div class="new_list">
        <div class="list_item" @click="myAssets()">
          <div class="list_tub">
            <div class="list_tou">
              <img src="../../assets/user_wallet.png"/>
            </div>
            <div class="list_text">我的资产</div>
          </div>
          <div class="more">
            <img src="../../assets/user_right.png"/>
          </div>
        </div>
        <div class="list_item" @click="myOrder()">
          <div class="list_tub">
            <div class="list_tou">
              <img src="../../assets/user_order.png"/>
            </div>
            <div class="list_text">我的订单</div>
          </div>
          <div class="more">
            <img src="../../assets/user_right.png"/>
          </div>
        </div>
        <div class="list_item" @click="members()">
          <div class="list_tub">
            <div class="list_tou">
              <img src="../../assets/user_team.png"/>
            </div>
            <div class="list_text">我的团队</div>
          </div>
          <div class="more">
            <img src="../../assets/user_right.png"/>
          </div>
        </div>
        <div class="list_item" @click="results()">
          <div class="list_tub">
            <div class="list_tou">
              <img src="../../assets/user_performance.png"/>
            </div>
            <div class="list_text">我的业绩</div>
          </div>
          <div class="more">
            <img src="../../assets/user_right.png"/>
          </div>
        </div>
        <div class="list_item" @click="reward()">
          <div class="list_tub">
            <div class="list_tou">
              <img src="../../assets/team_reward.png"/>
            </div>
            <div class="list_text">达标奖励</div>
          </div>
          <div class="more">
            <img src="../../assets/user_right.png"/>
          </div>
        </div>
        <div class="exit" @click="exit()">退出登录</div>
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
          <img src="../../assets/tab_team.png"/>
        </div>
        <div class="text_a">团队</div>
      </div>
      <div class="list" @click="mill()">
        <div class="icon">
          <img src="../../assets/tab_ming.png"/>
        </div>
        <div class="text_a">矿机</div>
      </div>
      <div class="list" @click="userinfo()">
        <div class="icon">
          <img src="../../assets/tab_mine_sel.png"/>
        </div>
        <div class="text_a taber_act">我的</div>
      </div>
    </div>
     <div class="tangj" v-if="tjr" @click.self="close()">
      <div class="desout">
        <div class="tis">提示</div>
        <div class="name">确定要退出登录吗？</div>
        <div class="two">
          <div class="two_left" @click.stop="close()">取消</div>
          <div class="two_right" @click="copyLink()">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'userinfo',
  data () {
    return {
      phone: '',
      name: '',
      asset: [],
      tjr: false,
      list: {},
      down_xj: [],
      userinfoqw: {},
      performance: {},
      hhas: ''
    }
  },
  mounted () {
    this.init()
  },
  filters: {
    // 保留小数后几位
    hideMiddle (value) {
      let realVal = ''
      if (!isNaN(value) && value !== '') {
        // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(2)
      } else {
        realVal = '--'
      }
      return realVal
    },
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
    // back () {
    //   this.$router.go(-1)
    // },
    init () {
      this.$post('/get/performance')
        .then(res => {
          this.performance = res.data
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
      this.$post('/user/getTNum')
        .then(res => {
          this.hhas = res.data
        })
      // this.$post('/image/60')
      //   .then(res => {
      //   })
      this.$post('/user/get/phone')
        .then(res => {
          this.userinfoqw = res.data.user[0]
          // this.phone = res.data.user[0].user.phone
          this.phone = res.data.user[0].UID
          this.name = res.data.user[0].user.name
        })
      this.$post('/user/getasset')
        .then(res => {
          this.asset = res.data.asset
        })
      this.$post('/new/select?pageSize=20')
        .then(res => {
          this.list = res.data.data[0]
        })
      this.$post('/user/invite/team')
        .then(res => {
          if (res.status === 10001) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({
              path: `/`
            })
          } else {
            this.down_xj = res.data
          }
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
    personal () {
      this.$router.push({
        path: `/personal`
      })
    },
    notice () {
      this.$router.push({
        path: `/notice`
      })
    },
    myAssets () {
      this.$router.push({
        path: `/myAssets`
      })
    },
    myOrder () {
      this.$router.push({
        path: `/myOrder/1`
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
    exit () {
      this.tjr = true
    },
    close () {
      this.tjr = false
    },
    copyLink () {
      Cookies.remove('token')
      this.$message({
        message: '退出成功',
        type: 'success'
      })
      this.$router.push({
        path: `/`
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
.userinfo{
  width: 100%;
  min-height: 100vh;
  background-color: #01101D;
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #031A2E;
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
    padding: 0 18px;
    box-sizing: border-box;
    margin-top: 5px;
    .fuon{
      width:100%;
      min-height:133px;
      background:rgba(2,21,38,1);
      border-radius:10px;
      .fuon1{
        width: 100%;
        padding: 16px 12px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .fun{
          flex: 1;
          display: flex;
          align-items: center;
          .fun_tbm{
            width: 40px;
            img{
              width: 100%;
              display: block;
            }
          }
          .fun_user{
            margin-left: 10px;
            text-align: left;
            .user_name{
              height:25px;
              font-size:18px;
              font-weight:500;
              color:rgba(0,210,214,1);
              line-height:25px;
            }
            .user_phone{
              height:20px;
              font-size:14px;
              font-weight:400;
              color:rgba(0,210,214,1);
              line-height:20px;
            }
          }
        }
        .fun_more{
          width: 10px;
          img{
            width: 100%;
            display: block;
          }
        }
      }
      .stati{
        display: flex;
        align-items: center;
        .botuc{
          width: 25%;
          border-right: 1px solid rgba(0, 210, 214, 0.2);
          text-align: center;
          div:nth-child(1){
            width: 100%;
            font-size:16px;
            font-weight:500;
            color:rgba(0, 210, 214, 1);
            line-height:22px;
            word-break: break-all;
            word-wrap: break-word;
          }
          div:nth-child(2){
            width: 100%;
            height:14px;
            font-size:10px;
            font-weight:400;
            color:rgba(0, 210, 214, 1);
            line-height:14px;
            // margin-top: 5px;
          }
        }
      }
    }
    .notice{
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .notice_tbm{
        min-width: 16px;
        max-width: 24px;
        img{
          width: 100%;
          display: block;
        }
      }
      .notice_text{
        max-width: calc(100% - 30px);
        margin-left: 10px;
        font-size:12px;
        font-weight:400;
        color:rgba(0,210,214,1);
        line-height:17px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    .list{
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .list_item{
        width: 48%;
        height:130px;
        background:rgba(2,21,38,1);
        border-radius:10px;
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
        padding: 18px 24px;
        box-sizing: border-box;
        .item_assets{
          width:50%;
          height:66px;
          font-size:24px;
          font-weight:400;
          color:rgba(0,210,214,1);
          line-height:33px;
          align-self: flex-start;
        }
        .item_tbm{
          width: 50px;
          align-self: flex-end;
          img{
            width: 100%;
            display: block;
          }
        }
      }
    }
    .new_list{
      width:100%;
      background:rgba(2,21,38,1);
      border-radius:10px;
      .list_item{
        width: 100%;
        padding: 0 12px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 48px;
        border-bottom: 1px solid rgba(1, 16, 29, 1);
        .list_tub{
          display: flex;
          align-items: center;
          .list_tou{
            width: 20px;
            img{
              width: 100%;
              display: block;
            }
          }
          .list_text{
            height:20px;
            font-size:16px;
            font-weight:500;
            color:rgba(0, 210, 214, 1);
            line-height:20px;
            margin-left: 8px;
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
      .exit{
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size:16px;
        font-weight:400;
        color:rgba(0,210,214,1);
      }
    }
  }
  .footer{
    width: 100%;
    background-color: #031A2E;
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
  .tangj{
    width: 100%;
    height: 100vh;
    background:rgba(0,0,0,0.25);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    .desout{
      width: 70%;
      padding-top: 24px;
      box-sizing: border-box;
      background-color: rgba(3, 26, 46, 1);
      border-radius:10px;
      margin: auto;
      .tis{
        width: 100%;
        height: 22px;
        text-align: center;
        font-size:16px;
        font-weight:500;
        color:rgba(0, 210, 214, 1);
        line-height:22px;
        margin-bottom: 7px;
      }
      .name{
        width: 100%;
        text-align: center;
        height:20px;
        font-size:14px;
        font-weight:400;
        color:rgba(0, 210, 214, 1);
        line-height:20px;
      }
      .two{
        margin-top: 11px;
        width: 100%;
        height:40px;
        display: flex;
        align-items: center;
        border-top: 1px solid rgba(0, 210, 214, 0.1);
        .two_left{
          width: 50%;
          border-right: 1px solid rgba(0, 210, 214, 0.1);
          height: 40px;
          line-height: 40px;
          font-size:16px;
          font-weight:400;
          color:rgba(0, 210, 214, 1);
        }
        .two_right{
          width: 50%;
          height: 40px;
          line-height: 40px;
          font-size:16px;
          font-weight:400;
          color:rgba(0, 210, 214, 1);
        }
      }
    }
  }
}
</style>
