<template>
  <div class="team">
    <div class="header">
      <div class="icon_left" @click="back()">
        <!-- <img src="../../assets/tupian/public_back_big.png" alt="icon"/> -->
      </div>
      <div class="text_con">矿机</div>
      <div class="icon_right">
      </div>
    </div>
    <div class="content">
      <div class="userinfo">
        <div class="user_left">
            <img src="../../assets/gear_01_clockwise.png" alt="01" class="img1"/>
            <img src="../../assets/gear_02_anticlockwise.png" alt="01" class="img2"/>
            <img src="../../assets/gear_03_anticlockwise.png" alt="01" class="img3"/>
            <img src="../../assets/gear_04_anticlockwise.png" alt="01" class="img4"/>
            <img src="../../assets/gear_05_anticlockwise.png" alt="01" class="img5"/>
        </div>
        <div class="user_right">
          <div class="name">
            <div class="name1">
              <img src="../../assets/ming_user.png" alt="头像"/>
            </div>
            <div class="name2">{{ name }}</div>
            <!-- <div class="name2">{{ name | hideHokl }}</div> -->
          </div>
          <div class="mascv">
            <div>拥有T数</div>
            <div>{{ hhas }} T</div>
          </div>
          <div class="mascv">
            <div>今日收益</div>
            <div>0 FIL</div>
          </div>
          <div class="mascv">
            <div>累计收益</div>
            <div>0 FIL</div>
          </div>
        </div>
      </div>
      <div class="my_team">收益列表</div>
      <div v-if="list.length > 0">
        <!-- <div class="list">
          <div class="list_left">
            <div class="left_tbm">
              <img src="../../assets/ming_fil.png"/>
            </div>
            <div class="left_text">100 FIL</div>
          </div>
          <div class="list_right">2020-04-20</div>
        </div> -->
      </div>
      <div class="no_data" v-if="list.length == 0">
        <div class="data_tbm">
          <img src="../../assets/public_nodata.png"/>
        </div>
        <div class="data_text">暂无数据</div>
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
          <img src="../../assets/tab_ming_sel.png"/>
        </div>
        <div class="text_a taber_act">矿机</div>
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
      health: '60%',
      name: '',
      phone: '',
      list: [],
      performance: {},
      hhas: ''
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
    }
  },
  methods: {
    init () {
      this.$post('/user/getTNum')
        .then(res => {
          this.hhas = res.data
        })
      this.$post('/user/get/phone')
        .then(res => {
          this.phone = res.data.user[0].user.phone
          this.name = res.data.user[0].UID
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
          this.performance = res.data
        })
    },
    // back () {
    //   this.$router.go(-1)
    // },
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
    background:rgba(26,26,26,1);
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
    padding: 0 9px;
    box-sizing: border-box;
    margin-top: 20px;
    .userinfo{
      width: 100%;
      min-height: 166px;
      background: url('../../assets/ming_info_rect.png') no-repeat;
      background-size: 100% 100%;
      padding: 16px 28px;
      box-sizing: border-box;
      display: flex;
      .user_left{
        width: 50%;
        position: relative;
        margin-right: 10px;
        .img1{
          transform: rotate(360deg);
          animation: rotation 2s linear infinite;
          -moz-animation: rotation 2s linear infinite;
          -webkit-animation: rotation 2s linear infinite;
          -o-animation: rotation 2s linear infinite;
          width: 83px;
          display: block;
          position: absolute;
          bottom: 6px;
        }
        @-webkit-keyframes rotation{
          from {-webkit-transform: rotate(0deg);}
          to {-webkit-transform: rotate(360deg);}
        }
        .img2{
          transform: rotate(360deg);
          animation: sdfg 2s linear infinite;
          -moz-animation: sdfg 2s linear infinite;
          -webkit-animation: sdfg 2s linear infinite;
          -o-animation: sdfg 2s linear infinite;
          width: 65px;
          display: block;
          position: absolute;
          left: 80px;
          bottom: 30px;
        }
        @-webkit-keyframes sdfg{
          from {-webkit-transform: rotate(360deg);}
          to {-webkit-transform: rotate(0deg);}
        }
        .img3{
          transform: rotate(360deg);
          animation: sdfg 2s linear infinite;
          -moz-animation: sdfg 2s linear infinite;
          -webkit-animation: sdfg 2s linear infinite;
          -o-animation: sdfg 2s linear infinite;
          width: 50px;
          display: block;
          position: absolute;
          left: 50px;
          bottom: 77px;
        }
        .img4{
          transform: rotate(360deg);
          animation: sdfg 2s linear infinite;
          -moz-animation: sdfg 2s linear infinite;
          -webkit-animation: sdfg 2s linear infinite;
          -o-animation: sdfg 2s linear infinite;
          width: 36px;
          display: block;
          position: absolute;
          left: 72px;
          bottom: 2px;
        }
        .img5{
          transform: rotate(360deg);
          animation: sdfg 2s linear infinite;
          -moz-animation: sdfg 2s linear infinite;
          -webkit-animation: sdfg 2s linear infinite;
          -o-animation: sdfg 2s linear infinite;
          width: 29px;
          display: block;
          position: absolute;
          left: 21px;
          bottom: 87px;
        }
      }
      .user_right{
        flex: 1;
        .name{
          width: 100%;
          height: 50px;
          line-height: 50px;
          display: flex;
          align-items: center;
          margin-bottom: 6px;
          .name1{
            width: 36px;
            margin-right: 10px;
            img{
              width: 100%;
              display: block;
            }
          }
          .name2{
            font-size:24px;
            font-weight:500;
            color:rgba(0, 209, 255, 1);
          }
        }
        .mascv{
          width: 100%;
          height: 20px;
          line-height: 20px;
          display: flex;
          align-items: center;
          div{
            font-size:12px;
            font-weight:500;
            color:rgba(255,255,255, 1);
            margin-right: 8px;
          }
        }
      }
    }
    .my_team{
      width:100%;
      // border-bottom:2px solid rgba(0,210,214,0.8);
      border-radius:1px;
      margin: 20px auto;
      height:22px;
      font-size:16px;
      font-weight:500;
      color:rgba(0, 209, 255, 1);
      line-height:22px;
      text-align: center;
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
    .list{
      width:100%;
      height:46px;
      background:rgba(26,26,26,1);
      border-radius:4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 17px;
      box-sizing: border-box;
      margin-bottom: 8px;
      .list_left{
        display: flex;
        .left_tbm{
          width: 25px;
          margin-right: 8px;
          img{
            width: 100%;
            display: block;
          }
        }
        .left_text{
          height:22px;
          font-size:16px;
          font-weight:500;
          color:rgba(0, 209, 255, 1);
          line-height:22px;
        }
      }
      .list_right{
        font-size:10px;
        font-weight:400;
        color:rgba(0, 209, 255, 1);
      }
    }
  }
  .footer{
    width: 100%;
    background-color:rgba(26,26,26,1);
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
        color: rgba(0, 209, 255, 1);
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
      color:rgba(0, 209, 255, 1);
      line-height:22px;
      margin-top: 5px;
    }
  }
}
</style>
