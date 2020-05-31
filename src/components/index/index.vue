<template>
  <div class="index">
    <div class="header">
      <div class="icon_left" @click="back()">
        <!-- <img src="../../assets/public_back.png" alt="icon"/> -->
      </div>
      <div class="text_con"></div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="logo">
        <img src="../../assets/public_logo.png" />
      </div>
      <div class="buy_left" @click="buyMill()">
        <img src="../../assets/index_buy.png"/>
      </div>
      <div class="buy_right" @click="notice()">
        <img src="../../assets/index_notice.png"/>
      </div>
      <div class="buy_left" @click="members()">
        <img src="../../assets/index_team.png"/>
      </div>
      <div class="buy_right" @click="myAssets()">
        <img src="../../assets/index_wallet.png"/>
      </div>
      <!-- <div class="buy_right" @click="share()">
        <img src="../../assets/index_qr.png"/>
      </div> -->
    </div>
    <div class="footer">
      <div class="list"  @click="index()">
        <div class="icon">
          <img src="../../assets/tab_index_sel.png"/>
        </div>
        <div class="text_a taber_act">首页</div>
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
          <img src="../../assets/tab_mine.png"/>
        </div>
        <div class="text_a">我的</div>
      </div>
    </div>
  </div>
</template>

<script>
// import Cookies from 'js-cookie'
export default {
  name: 'index',
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  mounted () {
  },
  methods: {
    // back () {
    //   this.$router.go(-1)
    // },
    index () {
      this.$router.push({
        path: `/index`
      })
    },
    team () {
      // this.$message({
      //   message: '暂未开放',
      //   type: 'success'
      // })
      this.$router.push({
        path: `/team`
      })
    },
    buyMill () {
      this.$router.push({
        path: `/buyMill`
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
    lock () {
      this.$message({
        message: '暂未开放',
        type: 'success'
      })
    },
    members () {
      this.$router.push({
        path: `/members`
      })
    },
    share () {
      this.$router.push({
        path: `/share`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index{
  width: 100%;
  min-height: 100vh;
  background: url('../../assets/index_earth.png') no-repeat;
  background-size: 100% 100%;
  background-color: rgba(1, 16, 29, 1);
  .header{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #ffffff;
    padding: 0 16px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
      color:rgba(0,0,0,0.85);
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
    // margin-top: 20px;
    .logo{
      width: 240px;
      margin: 0 auto;
      margin-bottom: 55px;
      img{
        width: 100%;
        display: block;
      }
    }
    .buy_left{
      float: left;
      clear: both;
      margin-bottom: 8px;
      img{
        width: 166px;
        display: block;
      }
    }
    .buy_right{
      float: right;
      clear: both;
      margin-bottom: 8px;
      img{
        width: 166px;
        display: block;
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
}
</style>
